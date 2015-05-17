!function() {

    var questions_first_tags = ['WP', 'WP$', 'WRB'];

    // Detect the type of sentence
    detectors.add('s', function(sentence, index) {
        var l = sentence.length, 
            stats = sentence.stats,
            governor = sentence.governor,
            types = sentence.profile.types,
            first = sentence.tokens[0],
            last = sentence.tokens[l - 1];
        
        // First type: foreign sentence
        // can only work with at least a few tokens
        if (l > 2 &&
            // if more than 10% foreign words and a somewhat low confidence
            ((stats.p_foreign >= 10 && stats.confidence < 0.5) || 
            // or if very low confidence
            stats.confidence <= 0.2)) {
            // then is foreign
            types.push('foreign');
        }

        // Headline type
        if (stats.p_cap > 75 && stats.p_upper < 50 && l > 10) {
            types.push('headline');
        }
        
        // Exclamatory, straightforward
        if (last.norm === '!') {
            types.push('exclamatory');
        } else 
        // Question, obviously with final "?"
        if (last.norm === '?' ||
            // or starting with a particular tag, without breakpoint
            (questions_first_tags.indexOf(first.pos) > -1 && stats.breakpoints === 0)) {
            types.push('interrogative');
        }

        // Only if dependency parsing returned results
        if (governor > -1) {
            // Imperative
            if (sentence.tags[governor] === 'VB') {
                types.push('imperative')
            }
        }

    });
}();