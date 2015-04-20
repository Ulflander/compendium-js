

// Parses the lexicon and augment it using compendium
// Also prepare various fields of compendium: parse brill's rules, suffixes...
(function() {
    var cpd = compendium.compendium,
        inflector = compendium.inflector,

        // Parses a Next lexicon
        parse = function(lexicon) {
            var d = Date.now(),
                arr = lexicon.split('\t'),
                i,
                l,
                pt, // PoS tag
                s, // score
                c, // score pos condition
                m,
                // Lexicon
                result = {},

                // We also keep track of emoticons
                emots = [],
                item;


            // Prepopulate lexicon with conjugation of regular verbs
            for (i = 0, l = cpd.verbs.length; i < l; i += 1) {
                item = cpd.verbs[i];
                console.log(item);

                result[item] = {
                    pos: 'VBP',
                    sentiment: 0,
                    condition: null
                };

                result[inflector.conjugate(item, 'VBZ')] = {
                    pos: 'VBZ',
                    sentiment: 0,
                    condition: null
                };
                result[inflector.conjugate(item, 'VBG')] = {
                    pos: 'VBG',
                    sentiment: 0,
                    condition: null
                };
                result[inflector.conjugate(item, 'VBN')] = {
                    pos: 'VBN',
                    sentiment: 0,
                    condition: null
                };
            }

            // Parses lexicon
            for (i = 0, l = arr.length; i < l; i += 1) {
                item = arr[i].split(' ');
                m = item.length - 1;
                pt = item[1].trim(),
                s = 0;
                c = null;

                // Sentiment score with PoS tag condition
                if (item[m].match(/^[A-Z]{2,}\/[0-9\-]+$/g)) {
                    c = item[m].split('/')[0];
                    s = item[m].split('/')[1];
                // Simple score
                } else if (item[m].match(/^[0-9\-]+$/g)) {
                    s = parseInt(item[m], 10);
                }
                if (pt === 'EM' && compendium.punycode.ucs2.decode(item[0]).length > 1) {
                    emots.push(item[0]);
                }
                //console.log(item[0])
                result[item[0]] = {
                    pos: pt,
                    sentiment: s,
                    condition: c
                };
            }

            // Loop over compendium content 
            // and augment lexicon when possible:
            // works only with objects whose keys are the words 
            // and values are either a part of speech tag
            // or an integer (POS tag `CD`)
            for (i in cpd) {
                if (cpd.hasOwnProperty(i) && typeof cpd[i] === 'object' && !Array.isArray(cpd[i])) {
                    item = cpd[i];
                    for (l in item) {
                        if (item.hasOwnProperty(l)) {
                            // {'word': 'PoS_TAG'}
                            if (typeof item[l] === 'string') {
                                result[l] = {
                                    pos: item[l],
                                    sentiment: 0,
                                    condition: null
                                };
                            // {'word': 0}
                            } else if (typeof item[l] === 'number') {
                                result[l] = {
                                    pos: 'CD',
                                    sentiment: 0,
                                    value: item[l],
                                    condition: null
                                };
                            }
                        }
                    }
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
                i,
                l = raw.length;

            for (i = 0; i < l; i += 1) {
                line = raw[i].split(' ');
                result.push({
                    from: line[0],
                    to: line[1],
                    type: parseInt(line[2], 10),
                    c1: line[3],
                    c2: line[4],
                });
            }
            cpd.rules = result;
        },

        // Parse compendium suffixes
        suffixes = function(raw) {
            raw = raw.split('\t');
            var i, l = raw.length, result = [], line;

            for (i = 0; i < l; i += 1) {
                line = raw[i].split(' ');
                result.push({
                    regexp: new RegExp('^.+' + line[0] + '$', 'gi'),
                    pos: line[1]
                });
            }
            cpd.suffixes = result;
        },

        // Take care of abbreviations
        abbrs = function(arr) {
            var i, l = arr.length, res = [], rplt = [];
            for (i = 0; i < l; i += 1) {
                if (i % 2 === 0) {
                    res.push(arr[i]);
                } else {
                    rplt.push(arr[i]);
                } 
            }
            cpd.abbrs = res;
            cpd.abbrs_rplt = rplt;
        };

    compendium.lexicon = parse("@@lexicon");    
    brills(cpd.rules);
    suffixes(cpd.suffixes);
    abbrs(cpd.abbrs);
}());