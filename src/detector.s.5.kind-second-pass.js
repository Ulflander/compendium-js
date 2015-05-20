!function() {

    var approval_tokens = Object.keys(cpd.approval);

    // Second pass for type of sentence detection:
    // - Refusal
    // - Approval
    // 
    // Uses sentiment detection in some specific cases,
    // thus why it runs after sentiment analysis detector.
    detectors.add('s', function(sentence, index) {
        var token = sentence.tokens[0],
            arr, i, l,
            profile = sentence.profile,
            governor = sentence.governor,
            words_count = sentence.stats.words,
            types = profile.types;

        // Any interrogative form can't be 
        // a refusal nor an approval
        if (types.indexOf(T_INTERROGATIVE) > -1) {
            return;
        }

        // Approval
        // First token is direct approval token
        if (approval_tokens.indexOf(token.norm) > -1) {
            types.push(T_APPROVAL);
        // One word sentence containing only one positive adjective
        } else if (words_count === 1 && token.pos === 'JJ' && profile.sentiment > 0) {
            types.push(T_APPROVAL);
        // Let's try some cases for short sentences, depends on dependency parsing
        } else if (governor > -1 && words_count <= 3) {
            governor = sentence.tokens[governor];
            // Governor is approval token
            if (approval_tokens.indexOf(governor.norm) > -1) {
                types.push(T_APPROVAL);
            // Imperative and action verbs
            } else if (types.indexOf(T_IMPERATIVE) > -1 && cpd.approval_verbs.indexOf(governor.norm) > -1) {
                types.push(T_APPROVAL);
            // Positive governor dependent interjections
            } else if (governor.pos === 'UH') {
                for (arr = governor.deps.dependencies, i = 0, l = arr.length; i < l; i += 1) {
                    token = sentence.tokens[arr[i]];
                    if (token.pos === 'UH' && approval_tokens.indexOf(token.norm) > -1) {
                        types.push(T_APPROVAL);
                    }
                }
            }
        }
    });

}();