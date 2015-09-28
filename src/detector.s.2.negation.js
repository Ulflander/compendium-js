!function() {

    var counterNegationTokens = Object.keys(cpd.neg_neg),
        specifics = detectors.specifics,
        counterNegationBigrams = cpd.counter_neg_bigrams || [],
        _isNegationToken = function(norm, tag) {
            var k;
            for (k in cpd.neg) {
                if (cpd.neg.hasOwnProperty(k) && norm === k && cpd.neg[k] === tag) {
                    return true;
                }
            }
            for (k in cpd.refusal) {
                if (cpd.refusal.hasOwnProperty(k) && norm === k && cpd.refusal[k] === tag) {
                    return true;
                }
            }
            return false;
        };



    // Negation detection
    detectors.after('s', function(sentence, index, sentences) {
        var i, l = sentence.length,
            j, m = counterNegationBigrams.length,
            previous,
            next,
            master,
            token,
            negated = false,
            ll = 0,
            n = 0;

        for (i = 0; i < l; i ++) {
            token = sentence.tokens[i];
            next = sentence.tokens[i + 1];
            if (token.profile.breakpoint || token.attr.is_punc) {
                ll = 0;
                negated = false;
            } else if (_isNegationToken(token.norm, token.pos)) {
                if (!negated) {
                    previous = sentence.tokens[i - 1];

                    if (specifics.hasOwnProperty('negatePreviousToken')) {
                        specifics.negatePreviousToken(token, previous);
                    }

                    n ++;
                    negated = true;
                } else {
                    negated = false;
                }
            } else if (negated && counterNegationTokens.indexOf(token.norm) > -1 && ll === 0) {
                sentence.tokens[i - 1].profile.negated = false;
                n --;
                negated = false;
            } else if (!!negated) {
                // Check bigram
                for (j = 0; j < m && i < l - 1; j += 1) {
                    if (token.norm === counterNegationBigrams[j][0] && next.norm === counterNegationBigrams[j][1]) {
                        negated = false;
                        break;
                    }
                }
                if (!!negated) {
                    n ++;
                    ll ++;
                }
            }
            token.profile.negated = negated;
        }

        sentence.profile.negated = n > 0;
    });
}();
