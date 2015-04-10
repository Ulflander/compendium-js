

// Parses the lexicon and augment it using compendium
(function() {
    var raw = "@@lexicon",
        parser = {};

    // Parses a Next lexicon
    parser.parse = function(lexicon) {
        var d = Date.now(),
            arr = lexicon.split('\t'),
            i,
            l = arr.length,
            m,
            result = {},
            cpd = compendium.compendium,
            item;

        for (i = 0; i < l; i += 1) {
            item = arr[i].split(' ');
            m = item.length - 1;

            result[item[0]] = {
                pos: item[1],
                sentiment: item[m].match(/^[0-9\-]+$/g) ? parseInt(item[m], 10) : 0
            };
        }

        for (i in cpd) {
            if (cpd.hasOwnProperty(i) && typeof cpd[i] === 'object') {
                item = cpd[i];
                for (l in item) {
                    if (item.hasOwnProperty(l)) {
                        if (typeof item[l] === 'string') {
                            result[l] = {
                                pos: item[l],
                                sentiment: 0
                            };
                        } else if (typeof item[l] === 'number') {
                            result[l] = {
                                pos: 'CD',
                                sentiment: 0,
                                value: item[l]
                            };
                        }
                    }
                }
            }
        }

        return result;
    };

    // Parses Brill's condition
    parser.brills = function(raw) {
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
        return result;
    };

    // Parse suffixes
    parser.suffixes = function(raw) {
        raw = raw.split('\t');
        var i, l = raw.length, result = [], line;

        for (i = 0; i < l; i += 1) {
            line = raw[i].split(' ');
            result.push({
                regexp: new RegExp('^.+' + line[0] + '$', 'gi'),
                pos: line[1]
            });
        }
        return result;
    };

    compendium.parser = parser;
    compendium.lexicon = parser.parse(raw);
    
    compendium.compendium.rules = parser.brills(compendium.compendium.rules);
    compendium.compendium.suffixes = parser.suffixes(compendium.compendium.suffixes);
}());