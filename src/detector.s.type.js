(function() {

    var questions_first_tags = ['WP', 'WP$', 'WRB'];

    // Detect the type of sentence
    compendium.detect.addDetector('s', function(sentence, index) {
        var l = sentence.length, 
            stats = sentence.stats,
            types = sentence.profile.types,
            first = sentence.tokens[0],
            last = sentence.tokens[l - 1];
        
        // First type: foreign sentence
        if ((stats.p_foreign >= 10 || stats.confidence <= 0.2) && l > 3) {
            types.push('foreign');
        }

        // Headline type
        if (stats.p_cap > 75 && stats.p_upper < 50 && l > 10) {
            types.push('headline');
        }
        
        // Question, simple mode
        if (last.norm === '!') {
            types.push('exclamatory');
        } else if (questions_first_tags.indexOf(first.pos) > -1 ||
            last.norm === '?') {
            types.push('interrogative');
        }

    });
}());