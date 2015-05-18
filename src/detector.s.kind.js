!function() {

    var interrogative_tags = ['WP', 'WP$', 'WRB'];

    // Detect the type of sentence
    detectors.add('s', function(sentence, index) {
        var l = sentence.length, 
            stats = sentence.stats,
            governor = sentence.governor,
            types = sentence.profile.types,
            first = sentence.tokens[0],
            last = sentence.tokens[l - 1],
            deps,
            i, m;
        
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
            (interrogative_tags.indexOf(first.pos) > -1 && stats.breakpoints === 0)) {
            types.push('interrogative');
        } else

        // Only if dependency parsing returned results
        if (governor > -1) {
            // Interrogative
            // Loop onto governor dependencies and check for 
            // left dependent interrogative tags
            // Requires VB governor + no final `.`
            if (last.pos !== '.' && sentence.tags[governor].indexOf('VB') === 0) {
                for (deps = sentence.tokens[governor].deps.dependencies, i = 0, m = deps.length; i < m; i ++) {
                    if (interrogative_tags.indexOf(sentence.tags[deps[i]]) > -1) {
                        types.push('interrogative');
                    }
                }
            }
            
            // Imperative
            if (sentence.tags[governor] === 'VB') {
                types.push('imperative');
            }
        }

    });
}();