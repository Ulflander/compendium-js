!function() {

    var approval_tokens = Object.keys(cpd.approval),
        refusal_tokens = Object.keys(cpd.refusal);

    // Second pass for type of sentence detection:
    // - Refusal
    // - Approval
    //
    // Uses sentiment detection in some specific cases,
    // thus why it runs after sentiment analysis detector.
    detectors.after('s', 'type', function(sentence, index) {
        var token = sentence.tokens[0],
            token2,
            i, l,
            profile = sentence.profile,
            governor = sentence.governor > -1 ? sentence.tokens[sentence.governor] : null,
            arr = !!governor ? governor.deps.dependencies : null,
            words_count = sentence.stats.words,
            types = profile.types;

        // Any interrogative form can't be
        // a refusal nor an approval
        if (types.indexOf(T_INTERROGATIVE) > -1) {
            return;
        }

        // Refusal
        // First token is direct refusal token
        if (refusal_tokens.indexOf(token.norm) > -1) {
            types.push(T_REFUSAL);
        // One word sentence containing only one negative adjective
        } else if (words_count === 1 && token.pos === 'JJ' && profile.sentiment < 0) {
            types.push(T_REFUSAL);
        // Let's try some cases for short sentences, depends on dependency parsing
        } else if (governor) {

            // Governor is refusal token
            if (refusal_tokens.indexOf(governor.norm) > -1) {
                types.push(T_REFUSAL);
            // Imperative and action verbs
            } else if (types.indexOf(T_IMPERATIVE) > -1 && cpd.approval_verbs.indexOf(governor.norm) > -1 && governor.profile.negated) {
                types.push(T_REFUSAL);
            // Negative governor dependent interjections
            } else if (governor.pos === 'UH') {
                for (i = 0, l = arr.length; i < l; i += 1) {
                    token2 = sentence.tokens[arr[i]];
                    if ((token2.pos === 'UH' || token2.pos === 'RB') && refusal_tokens.indexOf(token2.norm) > -1) {
                        types.push(T_REFUSAL);
                    }
                }
            }
        }

        if (types.indexOf(T_REFUSAL) > -1) {
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
        } else if (!!governor && words_count <= 3) {

            // Governor is approval token
            if (approval_tokens.indexOf(governor.norm) > -1) {
                types.push(T_APPROVAL);
            // Imperative and action verbs
            } else if (types.indexOf(T_IMPERATIVE) > -1 && cpd.approval_verbs.indexOf(governor.norm) > -1) {
                types.push(T_APPROVAL);
            // Positive governor dependent interjections
            } else if (governor.pos === 'UH') {
                for (i = 0; i < l; i += 1) {
                    token2 = sentence.tokens[arr[i]];
                    if (token2.pos === 'UH' && approval_tokens.indexOf(token2.norm) > -1) {
                        types.push(T_APPROVAL);
                    }
                }
            }
        }
    });

}();