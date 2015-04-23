(function() {

    // Detect the type of sentence
    compendium.detect.addDetector('s', function(sentence, index) {
        var stats = sentence.stats,
            types = sentence.profile.types;
        
        // First type: foreign sentence
        if (stats.p_foreign >= 50 || stats.confidence <= 0.2) {
            types.push('foreign');
        }
        
    });
}());