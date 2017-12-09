!function() {

    var dirty = cpd.dirty,
        polite = cpd.polite,
        emphasis_adverbs = cpd.emphasis,

        future_modals = ['wo', '\'ll', 'will'],

        // Recursive function that takes all the dependencies scores and
        // compute a token final score
        scoreDependencies = function (sentence, token) {
            var deps = token.deps.dependencies, i, l = deps.length, s = 0, t;
            // If no dependencies
            if (l === 0) {
                return;
            }

            // Loop over dependencies
            for (i = 0; i < l; i += 1) {
                t = sentence.tokens[deps[i]];
                // First recursively score their own dependencies
                scoreDependencies(sentence, t);
                // Add score
                s += t.profile.sentiment;
            }

            // Score is divided by the number of dependencies
            token.profile.sentiment += parseInt((s / l) * 100) / 100;
        };

    // Set profile
    detectors.after('s', 'sentiment', function(sentence, index, sentences) {
        var i,
            l = sentence.length,
            profile,
            score = 0,
            token,
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
            gov = sentence.governor,
            p = sentence.profile;

        // First take in account negation for token scoring
        for (i = 0; i < l; i ++) {
            profile = sentence.tokens[i].profile;
            pos = sentence.tokens[i].pos;
            norm = sentence.tokens[i].norm;
            isDirty = dirty.indexOf(norm) > -1;
            isPolite = polite.indexOf(norm) > -1;

            if (isDirty) {
                dirtiness ++;
            } else if (isPolite) {
                politeness ++;
            }

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
        }


        // Main tense + experimental dependency scoring
        if (gov > -1) {
            token = sentence.tokens[gov];
            // Experimental recursive dependency scoring
            scoreDependencies(sentence, token);

            // Main tense detection
            pos = token.pos;
            if (token.attr.is_verb) {
                p.main_tense = (pos === 'VBD' ? 'past' : 'present');
            } else if (pos === 'MD' && future_modals.indexOf(token.norm) > -1) {
                p.main_tense = 'future';
            }
        }

        // Sentiment analysis calculation

        // If moslty uppercased, give an emphasis bonus
        if (sentence.stats.p_upper > 70) {
            emphasis = 1.2;
        }

        // Loop on tokens
        // and set emphasis
        // and initial score
        for (i = 0; i < l; i ++) {
            profile = sentence.tokens[i].profile;
            pos = sentence.tokens[i].pos;
            norm = sentence.tokens[i].norm;

            // Get token base emphasis and multiply it with global emphasis
            emphasis *= profile.emphasis;

            // Check if token is a local emphasis
            // Note: local emphasis is NOT used by the final sentence sentiment score,
            // but only to compute the score of individuals tokens.
            if (pos === 'JJS' || (pos === 'RB' && emphasis_adverbs.indexOf(norm) > -1)) {
                if (profile.negated) {
                    local_emphasis += 2;
                } else {
                    local_emphasis += 5;
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
                local_emphasis --;
            }
        }

        if (l < 5) {
            l *= 2;
        } else if (l > 10) {
            l /= 2;
        }

        amplitude = (max + (-min)) / l;
        score *= emphasis;
        score /= l;
        if (p.types.indexOf(T_INTERROGATIVE) > -1) {
            score /= 2;
        }
        p.sentiment = score;
        p.emphasis = emphasis;
        p.amplitude = amplitude;
        p.dirtiness = dirtiness / l;
        p.politeness = politeness / l;
        if (Math.abs(amplitude) > 0.5 && Math.abs(score) < 0.5 && Math.abs(amplitude) > Math.abs(score)) {
            p.label = 'mixed';
        } else if (score <= config.profile.negative_threshold) {
            p.label = 'negative';
        } else if (score >= config.profile.positive_threshold) {
            p.label = 'positive';
        } else if (amplitude >= config.profile.amplitude_threshold) {
            p.label = 'mixed';
        }
    });
}();