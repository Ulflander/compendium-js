!function() {

    var interrogative_tags = ['WP', 'WP$', 'WRB'];

    // First pass to detect the type of sentence
    // Types detected in this pass may be used by
    // sentiment analysis detector.
    detectors.after('s', 'type', function(sentence, index) {
        var l = sentence.length,
            stats = sentence.stats,
            governor = sentence.governor,
            types = sentence.profile.types,
            first = sentence.tokens[0],
            last = sentence.tokens[l - 1],
            tag,
            deps,
            i, m;

        // First type: foreign sentence
        // can only work with at least a few tokens
        if (l > 2 &&
            // if more than 10% foreign words and a somewhat low confidence
            ((stats.p_foreign >= 10 && stats.confidence < 0.5) ||
            // or if very low confidence
            stats.confidence <= 0.35)) {
            // then is foreign
            types.push(T_FOREIGN);
        }

        // Headline type: use statistics
        if (stats.p_cap > 75 && stats.p_upper < 50 && l > 10) {
            types.push(T_HEADLINE);
        }

        // Exclamatory, straightforward
        if (last.norm === '!') {
            types.push(T_EXCLAMATORY);
        } else
        // Question, obviously with final "?"
        if (last.norm === '?' ||
            // or starting with a particular tag, without breakpoint
            (interrogative_tags.indexOf(first.pos) > -1 && stats.breakpoints === 0)) {
            types.push(T_INTERROGATIVE);
        } else

        // Only if dependency parsing returned results
        if (governor > -1) {
            tag = sentence.tags[governor];
            // Interrogative
            // Governor is an interrogative tag
            if (interrogative_tags.indexOf(tag) > -1) {
                types.push(T_INTERROGATIVE);
            } else
            // Loop onto governor dependencies
            // Requires VB governor + no final `.`
            if (last.pos !== '.' && tag.indexOf('VB') === 0) {
                // check for "do i do" or "are you going"
                if (sentence.tags[governor + 1] === 'PRP' && (sentence.tags[governor + 2] || '').indexOf('VB') === 0) {
                    types.push(T_INTERROGATIVE);
                } if (governor > 1 && sentence.tags[governor - 1] === 'PRP' && sentence.tags[governor - 2].indexOf('VB') === 0) {
                    types.push(T_INTERROGATIVE);
                // check for "can i go"
                } else if (sentence.tags[governor - 1] === 'PRP' && sentence.tags[governor - 2] === 'MD') {
                    types.push(T_INTERROGATIVE);
                } else {

                    for (deps = sentence.tokens[governor].deps.dependencies, i = 0, m = deps.length; i < m; i ++) {
                        // check for left dependent interrogative tags
                        // Is interrogative tag
                        if (interrogative_tags.indexOf(sentence.tags[deps[i]]) > -1 &&
                            // AND no verb right before ("this is why" is not a question)
                            (sentence.tags[deps[i] - 1] || '').indexOf('VB') < 0) {
                            types.push(T_INTERROGATIVE);
                        }
                    }
                }
            }
        }

        if (governor > -1 && types.indexOf(T_INTERROGATIVE) === -1) {
            // Imperative
            if (sentence.tags[governor] === 'VB') {
                types.push(T_IMPERATIVE);
            }
        }

    });
}();
