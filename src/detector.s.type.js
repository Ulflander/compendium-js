(function() {

    // Detect the type of sentence
    compendium.detect.addDetector('s', function(sentence, index) {
        var l = sentence.length, 
            stats = sentence.stats,
            types = sentence.profile.types;
        
        // First type: foreign sentence
        if (stats.p_foreign >= 50 || stats.confidence <= 0.2) {
            types.push('foreign');
        }

        // Headline type
        if (stats.p_cap > 75 && stats.p_upper < 25 && l > 10) {
            types.push('headline');
        }
        
    });
}());