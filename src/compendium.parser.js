

// Parses the lexicon and augment it using compendium
// Also prepare various fields of compendium: parse brill's rules, suffixes...
!function() {
    var inflector = compendium.inflector,

        // Parses a Next lexicon
        parse = function(lexicon) {
            var d = Date.now(),
                arr = lexicon.split('\t'),
                i, j,
                l,
                lastIndex,
                blocked,
                tmp,
                pt, // PoS tag
                s, // score
                c, // score pos condition
                m,
                // Lexicon
                result = {},

                // We also keep track of emoticons
                emots = [],
                item;

            // Parses lexicon
            for (i = 0, l = arr.length; i < l; i ++) {
                item = arr[i].split(' ');
                blocked = false;

                m = item.length - 1;
                pt = m > 0 ? item[1].trim() : '';

                lastIndex = pt.length - 1;
                if (lastIndex > 0 && pt[lastIndex] === '-') {
                    blocked = true;
                    pt = pt.slice(0, lastIndex);
                }

                s = 0;
                c = null;

                // Sentiment score with PoS tag condition
                if (item[m].match(/^[A-Z]{2,}\/[0-9\-]+$/g)) {
                    c = item[m].split('/')[0];
                    s = item[m].split('/')[1];
                // Simple score
                } else if (item[m].match(/^[0-9\-]+$/g) || item[m].match(/^\-{0,1}[0-4]\.[0-9]$/g)) {
                    s = item[m].indexOf('.') > 0 ? parseFloat(item[m]) : parseInt(item[m], 10);
                }
                if (pt === 'EM' && compendium.punycode.ucs2.decode(item[0]).length > 1) {
                    emots.push(item[0]);
                }

                result[item[0]] = {
                    pos: pt === '-' ? 'NN' : pt,
                    sentiment: s,
                    condition: c,
                    blocked: blocked
                };
            }

            // Loop over compendium content
            // and augment lexicon when possible:
            // works only with objects whose keys are the words
            // and values are either a part of speech tag
            // or an integer (POS tag `CD`)
            for (i in cpd) {
                if (cpd.hasOwnProperty(i) && typeof cpd[i] === 'object' && !iA(cpd[i])) {
                    item = cpd[i];
                    for (l in item) {
                        if (item.hasOwnProperty(l)) {
                            s = 0;
                            // {'word': 'PoS_TAG'}
                            if (typeof item[l] === 'string') {
                                if (result.hasOwnProperty(l)) {
                                    s = result[l].sentiment;
                                }
                                result[l] = {
                                    pos: item[l],
                                    sentiment: s,
                                    condition: null
                                };
                            // {'word': 0}
                            } else if (typeof item[l] === 'number') {
                                result[l] = {
                                    pos: 'CD',
                                    sentiment: s,
                                    value: item[l],
                                    condition: null
                                };
                            }
                        }
                    }
                }
            }


            // Prepopulate lexicon with conjugation of regular verbs
            // Reapply sentiment if base form has a score
            for (i = 0, l = cpd.verbs.length; i < l; i ++, s = 0) {
                item = cpd.verbs[i];
                cpd.infinitives.push(item);

                tmp = inflector.conjugate(item, 'VBZ');
                if (!tmp) {
                    continue;
                }
                if (result.hasOwnProperty(item)) {
                    if (result[item].pos === 'NN') {
                        result[item].pos = 'VB';
                    }
                    blocked = result[item].blocked;
                    s = result[item].sentiment;
                }

                result[tmp] = {
                    pos: 'VBZ',
                    sentiment: s,
                    condition: null,
                    infinitive: item,
                    blocked: blocked
                };

                tmp = inflector.conjugate(item, 'VBN');
                if (!result.hasOwnProperty(tmp)) {
                    result[tmp] = {
                        pos: 'VBN',
                        sentiment: s,
                        condition: null,
                        infinitive: item
                    };
                } else {
                    result[tmp].infinitive = item;
                }

                tmp = inflector.conjugate(item, 'VBG');
                if (!result.hasOwnProperty(tmp)) {
                    result[tmp] = {
                        pos: 'VBG',
                        sentiment: s,
                        condition: null,
                        infinitive: item
                    };
                } else {
                    result[tmp].infinitive = item;
                }
            }

            // Prepopulate lexion with irregular verbs
            for (i = 0, l = cpd.irregular.length; i < l; i ++, s = 0) {
                item = cpd.irregular[i];
                m = item[0];
                if (result.hasOwnProperty(m)) {
                    s = result[m].sentiment;
                    if (result[m].pos !== 'VB') {
                        result[m].pos = 'VB';
                    }
                }
                cpd.infinitives.push(m);

                for (j = 0; j < 5; j ++) {
                    item[j].split('/').map(function(o) {
                        if (!result.hasOwnProperty(o)) {
                            result[o] = {
                                pos: j === 0 ? 'VB' : j === 1 ? 'VBD' : j === 2 ? 'VBN' : j === 3 ? 'VBZ' : 'VBG',
                                sentiment: s,
                                condition: null,
                                infinitive: m
                            }
                        } else if (!result[o].infinitive) {
                            result[o].infinitive = m;
                            result[o].sentiment = s;
                        }
                    });
                }
            }


            // Register emoticons in compendium for further use by lexer
            cpd.emots = emots;

            return result;
        },

        // Parses Brill's condition
        brills = function(raw) {
            raw = raw.split('\t');
            var line,
                result = [],
                secondRun,
                i,
                l = raw.length;

            for (i = 0; i < l; i ++) {
                line = raw[i].split(' ');
                if (line[line.length - 1] === '+') {
                    line.splice(line.length - 1, 1);
                    secondRun = true;
                } else {
                    secondRun = false;
                }
                result.push({
                    from: line[0],
                    to: line[1],
                    type: parseInt(line[2], 10),
                    c1: line[3],
                    c2: line[4],
                    c3: line[5],
                    secondRun: secondRun
                });
            }
            cpd.rules = result;
        },

        // Parse compendium suffixes
        suffixes = function(raw) {
            raw = raw.split('\t');
            var i, l = raw.length, result = [], line;

            for (i = 0; i < l; i ++) {
                line = raw[i].split(' ');
                result.push({
                    regexp: new RegExp('^.{1,}' + line[0].trim() + '$', 'gi'),
                    pos: line[1]
                });
            }
            cpd.suffixes = result;
        },

        // Pluralized dirty words
        dirty = function(raw) {
            var i, l = raw.length;

            for (i = 0; i < l; i ++) {
                raw.push(inflector.pluralize(raw[i]));
            }
        },

        // Take care of abbreviations
        abbrs = function(arr) {
            var i, l = arr.length, res = [], rplt = [];
            for (i = 0; i < l; i ++) {
                if (i % 2 === 0) {
                    res.push(arr[i]);
                } else {
                    rplt.push(arr[i]);
                }
            }
            cpd.abbrs = res;
            cpd.abbrs_rplt = rplt;
        },

        nationalities = function(raw) {
            var i, l, res = {};
            raw = raw.split(' ');
            for (i = 0, l = raw.length; i < l; i ++) {
                res[raw[i]] = 'JJ';
            }
            cpd.nationalities = res;
        },

        synonyms = function(raw) {
            raw = raw.split('\t');
            var i, l = raw.length, result = [];
            for (i = 0; i < l; i ++) {
                result.push(raw[i].split(' '));
            }
            cpd.synonyms = result;
        };

    brills(cpd.rules);
    suffixes(cpd.suffixes);
    abbrs(cpd.abbrs);
    dirty(cpd.dirty);
    synonyms(cpd.synonyms);
    nationalities(cpd.nationalities);
    compendium.lexicon = parse("@@lexicon");
}();
