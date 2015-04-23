(function() {

    var dirty = cpd.dirty,
        emphasis_adverbs = cpd.emphasis;

    // Set profile
    compendium.detect.addDetector('s', function(sentence, index, sentences) {
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

            // Local emphasis
            if (pos === 'RB' && emphasis_adverbs.indexOf(norm) > -1) {
                if (profile.negated) {
                    local_emphasis = 2;
                } else {
                    local_emphasis = 4;
                }
            }

            // Handles negation
            if (profile.negated && pos !== '.' && pos !== 'EM') {
                // If negative but dirty word, doesn't invert score
                if (dirty.indexOf(norm) > -1) {
                    profile.sentiment = profile.sentiment / 2;
                // Normal negation: score inverted and reduced
                } else {
                    profile.sentiment = -profile.sentiment / 2;
                }
            }

            // Get the score
            token_score = profile.sentiment;
            score += token_score;
            // For amplitude
            if (token_score > max) {
                max = token_score;
            } else if (token_score < min) {
                min = token_score;
            }

            // Set emphasis 
            profile.emphasis *= 1 + (local_emphasis / 10);
            emphasis *= profile.emphasis;
            if (local_emphasis > 0) {
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
        if (score < config.profile.negative_threshold) {
            p.label = 'negative';
        } else if (score > config.profile.positive_threshold) {
            p.label = 'positive';
        } else if (amplitude > config.profile.amplitude_threshold) {
            p.label = 'mixed';
        }
    });
}());