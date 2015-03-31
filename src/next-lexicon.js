
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
            item;

        for (i = 0; i < l; i += 1) {
            item = arr[i].split(' ');
            m = item.length - 1;

            result[item[0]] = {
                pos: item[1],
                sentiment: item[m].match(/^[0-9\-]+$/g) ? parseInt(item[m], 10) : 0
            };
        }

        return result;
    };

    next.parser = parser;
    next.lexicon = parser.parse(raw);
    
}());