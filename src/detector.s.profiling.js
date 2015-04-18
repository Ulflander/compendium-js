(function() {

    // Set profile
    compendium.detect.addDetector('s', function(sentence, index, sentences) {
        var i,
            profile,
            score = 0,
            pos,
            emphasis = 1,
            p = sentence.profile;


        for (i = 0; i < sentence.length; i += 1) {
            profile = sentence.tokens[i].profile;
            pos = sentence.tokens[i].pos;
            if (profile.negated && pos !== '.' && pos !== 'EM') {
                profile.sentiment = -profile.sentiment;
            }
            score += profile.sentiment;
            emphasis *= profile.emphasis;
        }
        
        score *= emphasis;
        p.sentiment = score;
        if (score < -0.5) {
            p.label = 'negative';
        } else if (score > 0.5) {
            p.label = 'positive';
        }
    });
}());