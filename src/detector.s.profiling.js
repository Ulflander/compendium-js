(function() {

    // Set profile
    compendium.detect.addDetector('s', function(sentence, index, sentences) {
        var i,
            token,
            score = 0,
            p = sentence.profiling;


        for (i = 0; i < sentence.length; i += 1) {
            token = sentence.tokens[i];
            if (token.is_negated) {
                token.sentiment = -token.sentiment;
            }
            score += token.sentiment;
        }

        p.sentiment = score;
        if (score < 0) {
            p.label = 'negative';
        } else if (score > 0) {
            p.label = 'positive';
        }
    });
}());