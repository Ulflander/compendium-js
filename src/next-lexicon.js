

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
            compendium = next.compendium,
            item;

        for (i = 0; i < l; i += 1) {
            item = arr[i].split(' ');
            m = item.length - 1;

            result[item[0]] = {
                pos: item[1],
                sentiment: item[m].match(/^[0-9\-]+$/g) ? parseInt(item[m], 10) : 0
            };
        }

        for (i in compendium) {
            if (compendium.hasOwnProperty(i) && typeof compendium[i] === 'object') {
                item = compendium[i];
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

    next.parser = parser;
    next.lexicon = parser.parse(raw);
    
    next.compendium.rules = parser.brills(next.compendium.rules);
    next.compendium.suffixes = parser.suffixes(next.compendium.suffixes);
}());