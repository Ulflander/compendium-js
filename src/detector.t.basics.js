!function() {

    var lexicon = compendium.lexicon;

    // This detector runs on each token
    // and set basic properties (acronyms...)
    detectors.before('t', 'basics', function(token, index, sentence) {
        var raw = token.raw,
            norm = token.norm,
            stem = token.stem,
            pos = token.pos,
            sentiment = 0,
            emphasis = 1,
            singular,
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
        if (pos === '.') {
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
        } else if (pos === 'EM') {
            emphasis = 1.2;
        } else if (pos === 'UH') {
            emphasis = 1.1;

        // Verbs infinitive forms
        } else if (pos.indexOf('VB') === 0) {
            token.attr.infinitive = inflector.infinitive(norm);

        // Singularization
        } else if (pos === 'NNS' || pos === 'CD') {
           singular = inflector.singularize(norm);
           token.attr.singular = singular;
        } else if (pos === 'NN') {
           token.attr.singular = norm;
        }

        // Sentiment score
        // Only if not NNP or NNPS ("Dick Cheney" is not about a dick)
        // also not if preposition ("it's like I can" - like is IN, no sentiment attached)
        if (pos !== 'NNP' && pos !== 'NNPS' && pos !== 'IN') {
            // Get one from lexicon
            if (lexicon.hasOwnProperty(norm)) {
                i = lexicon[norm];
                if (!i.condition || token.pos === i.condition) {
                    sentiment = i.sentiment;
                }
            // If not found, test singular
            } else if (pos === 'NNS' && lexicon.hasOwnProperty(singular)) {
                i = lexicon[singular];
                if (!i.condition || pos === i.condition) {
                    sentiment = i.sentiment / 2;
                }
            // If not found, test stem
            } else if (lexicon.hasOwnProperty(stem)) {
                i = lexicon[stem];
                if (!i.condition || pos === i.condition) {
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
}();