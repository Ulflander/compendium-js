(function() {

    var negations = Object.keys(compendium.compendium.neg),
        cancelNegations = Object.keys(compendium.compendium.neg_neg);

    compendium.detect.addDetector('s', function(sentence, index, sentences) {
        var i, l = sentence.length,
            token,
            negated = false,
            ll = 0,
            n = 0;

        for (i = 0; i < l; i += 1) {
            token = sentence.tokens[i];
            if (token.is_breakpoint) {
                ll = 0;
                negated = false;
            } else if (negations.indexOf(token.norm) > -1) {
                n += 1;
                token.is_negated = true;
                negated = true;
            } else if (negated && cancelNegations.indexOf(token.norm) > -1 && ll === 0) {
                sentence.tokens[i - 1].is_negated = false;
                n -= 1;
                negated = false;
            } else if (!!negated) {
                n += 1;
                ll += 1;
                token.is_negated = true;
            }
        }

        sentence.has_negation = n > 0;
    });
}());