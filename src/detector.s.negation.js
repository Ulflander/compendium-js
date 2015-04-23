(function() {

    var negations = Object.keys(cpd.neg),
        cancelNegations = Object.keys(cpd.neg_neg);

    // Negation detection
    compendium.detect.addDetector('s', function(sentence, index, sentences) {
        var i, l = sentence.length,
            token,
            negated = false,
            ll = 0,
            n = 0;

        for (i = 0; i < l; i += 1) {
            token = sentence.tokens[i];
            if (token.profile.breakpoint) {
                ll = 0;
                negated = false;
            } else if (negations.indexOf(token.norm) > -1) {
                if (!negated) {
                    n += 1;
                    negated = true;
                } else {
                    negated = false;
                }
            } else if (negated && cancelNegations.indexOf(token.norm) > -1 && ll === 0) {
                sentence.tokens[i - 1].profile.negated = false;
                n -= 1;
                negated = false;
            } else if (!!negated) {
                n += 1;
                ll += 1;
            }
            token.profile.negated = negated;
        }

        sentence.profile.negated = n > 0;
    });
}());