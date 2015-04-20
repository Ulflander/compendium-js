(function() {

    var dirty = compendium.compendium.dirty;

    // Set profile
    compendium.detect.addDetector('s', function(sentence, index, sentences) {
        var i,
            l = sentence.length,
            profile,
            score = 0,
            pos,
            norm,
            emphasis = 1,
            p = sentence.profile;


        for (i = 0; i < l; i += 1) {
            profile = sentence.tokens[i].profile;
            pos = sentence.tokens[i].pos;
            norm = sentence.tokens[i].norm;

            if (profile.negated && pos !== '.' && pos !== 'EM') {
                // If negative but dirty word, doesn't invert score
                if (dirty.indexOf(norm) > -1) {
                    profile.sentiment = profile.sentiment / 2;
                // Normal negation: score inverted and reduced
                } else {
                    profile.sentiment = -profile.sentiment / 2;
                }
            }
            score += profile.sentiment;
            emphasis *= profile.emphasis;
        }

        score *= emphasis;
        score /= l;
        p.sentiment = score;
        p.emphasis = emphasis;
        if (score < -0.2) {
            p.label = 'negative';
        } else if (score > 0.2) {
            p.label = 'positive';
        }
    });
}());