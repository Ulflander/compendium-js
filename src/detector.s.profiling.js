!function() {

    var dirty = cpd.dirty,
        polite = cpd.polite,
        emphasis_adverbs = cpd.emphasis;

    // Set profile
    detectors.add('s', function(sentence, index, sentences) {
        var i,
            l = sentence.length,
            profile,
            score = 0,
            pos,
            norm,
            emphasis = 1,
            token_score = 0,
            amplitude = 0,
            local_emphasis = 0,
            politeness = 0,
            isPolite,
            dirtiness = 0,
            isDirty,
            min = 0,
            max = 0,
            p = sentence.profile;

        // If moslty uppercased, give an emphasis bonus
        if (sentence.stats.p_upper > 70) {
            emphasis = 1.2;
        }

        // Loop on tokens
        for (i = 0; i < l; i += 1) {
            profile = sentence.tokens[i].profile;
            pos = sentence.tokens[i].pos;
            norm = sentence.tokens[i].norm;
            isDirty = dirty.indexOf(norm) > -1;
            isPolite = polite.indexOf(norm) > -1;

            if (isDirty) {
                dirtiness += 1;
            } else if (isPolite) {
                politeness += 1;
            }

            // Get token base emphasis and multiply it with global emphasis
            emphasis *= profile.emphasis;

            // Handles negation, update token profile with according sentiment score
            if (profile.negated && pos !== '.' && pos !== 'EM') {
                // If negative but dirty word, doesn't invert score
                if (isDirty) {
                    profile.sentiment = profile.sentiment / 2;
                // Normal negation: score inverted and reduced
                } else {
                    profile.sentiment = -profile.sentiment / 2;
                }
            }

            // Check if token is a local emphasis 
            // Note: local emphasis is NOT used by the final sentence sentiment score,
            // but only to compute the score of individuals tokens.
            if (pos === 'JJS' || (pos === 'RB' && emphasis_adverbs.indexOf(norm) > -1)) {
                if (profile.negated) {
                    local_emphasis += 2;
                } else {
                    local_emphasis += 4;
                }
            }

            // Get the score using local emphasis
            token_score = profile.sentiment * (1 + (local_emphasis / 10));
            score += token_score;

            // Keep track of token min/max scores for amplitude
            if (token_score > max) {
                max = token_score;
            } else if (token_score < min) {
                min = token_score;
            }

            // Update token emphasis using local emphasis for user consumption
            profile.emphasis *= 1 + (local_emphasis / 10);

            // Update local emphasis
            if (local_emphasis > 0 && ['DT', 'POS', 'IN'].indexOf(pos) === -1) {
                local_emphasis -= 1;
            }
        }

        if (l < 5) {
            l *= 2;
        }
        amplitude = (max + (-min)) / l;
        score *= emphasis;
        score /= l;
        p.sentiment = score;
        p.emphasis = emphasis;
        p.amplitude = amplitude;
        p.dirtiness = dirtiness / l;
        p.politeness = politeness / l;
        if (score < config.profile.negative_threshold) {
            p.label = 'negative';
        } else if (score > config.profile.positive_threshold) {
            p.label = 'positive';
        } else if (amplitude > config.profile.amplitude_threshold) {
            p.label = 'mixed';
        }
    });
}();