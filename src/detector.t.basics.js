(function() {

    var lexicon = compendium.lexicon;

    // This detector runs on each token
    // and set basic properties (acronyms...)
    compendium.detect.addDetector('t', function(token, index, sentence) {
        var raw = token.raw,
            norm = token.norm,
            stem = token.stem,
            sentiment = 0,
            emphasis = 1,
            lc,
            l,
            i;

        lc = raw.toLowerCase();
        l = lc.length;
     
        // Test abbreviation
        if (l > 1 && 
            (raw.indexOf('.') === l - 1 && (i = cpd.abbrs.indexOf(lc.slice(0, l - 1))) > -1)) {
            token.attr.abbr = true;
            norm = cpd.abbrs_rplt[i];
        // Test acronym
        } else if (raw.match(/^([a-z]{1}\.)+/gi)) {
            token.attr.acronym = true;
        // Test synonym
        } else {
            norm = compendium.synonym(norm);
        }

        // Emphasis
        if (token.pos === '.') {
            i = raw[0];
            if (i === '!' || i === '?') {
                emphasis = raw.length > 1 ? 2 : i === '?' ? 1 : 1.5;
                if (raw.length > 1) {
                    norm = raw[0];
                }
            } else if (i === '.' && raw[1] === '.') {
                emphasis = 1.2;
                norm = '...';
            }
        } else if (token.pos === 'EM') {
            emphasis = 1.2;
        } else if (token.pos === 'UH') {
            emphasis = 1.1;
        }

        // Sentiment score
        // Only if not NNP or NNPS ("Dick Cheney" is not about a dick)
        if (token.pos !== 'NNP' && token.pos !== 'NNPS') {
            // Get one from lexicon
            if (lexicon.hasOwnProperty(norm)) {
                i = lexicon[norm];
                if (!i.condition || token.pos === i.condition) {
                    sentiment = i.sentiment;
                }
            // If not found, test stem
            } else if (lexicon.hasOwnProperty(stem)) {
                i = lexicon[stem];
                if (!i.condition || token.pos === i.condition) {
                    sentiment = i.sentiment / 2;
                }
            // If not found, check polite/dirty words
            } else if (cpd.dirty.indexOf(norm) > -1) {
                sentiment = -2;
            } else if (cpd.polite.indexOf(norm) > -1) {
                sentiment = 1;
            }
        }

        token.profile.sentiment = sentiment;
        token.profile.emphasis = emphasis;
        token.norm = norm;
    });
}());