(function() {

    var cpd = compendium.compendium,
        lex = compendium.lexicon;

    // This detector runs on each token
    // and set basic properties (acronyms...)
    compendium.detect.addDetector('t', function(token, index, sentence) {
        var raw = token.raw,
            lc,
            l,
            i;


        // raw can be string or number
        if (typeof raw === 'string') {
            lc = raw.toLowerCase();
            l = lc.length;
         
            // Test abbreviation
            if (l > 1 && raw.indexOf('.') === l - 1 && (i = cpd.abbrs.indexOf(lc.slice(0, l - 1))) > -1) {
                token.attr.abbr = true;
                token.norm = cpd.abbrs_rplt[i];
            // Test acronym
            } else if (raw.match(/^([a-z]{1}\.)+/gi)) {
                token.attr.acronym = true;
            }
        }

        // Sentiment score
        if (lex.hasOwnProperty(token.norm)) {
            i = lex[token.norm];
            if (!i.condition || token.pos === i.condition) {
                token.profile.sentiment = i.sentiment;
            }
        }
        // Emphasis
        if (token.pos === '.') {
            i = raw[0];
            if (i === '!' || i === '?') {
                token.profile.emphasis = raw.length > 1 ? 2 : 1.5;
            } else if (i === '.' && raw[1] === '.') {
                token.profile.emphasis = 1.5;
            }
        } else if (token.pos === 'EM') {
            token.profile.emphasis = 1.2;
        }
    });
}());