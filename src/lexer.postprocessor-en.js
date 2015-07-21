!function() {

    var contractions = ['s', 'm', 't', 'll', 've', 'd', 'em', 're'];


    extend(compendium.lexer, {

        // Post process is a the sentence level, is given an array of tokens
        postprocess:  function(tokens, metas) {
            // Split with base regexp
            var i,
                l = tokens.length,
                result = [],
                tok,
                previous,
                next;

            for (i = 0; i < l; i += 1) {
                tok = tokens[i];
                previous = tokens[i - 1] || '';
                next = tokens[i + 1] || '';


                // If token is ' check for contraction.
                // If is contraction, merge forward
                if (tok === '\'' && contractions.indexOf(next) > -1) {
                    // If t, check for 'n' in previous
                    if (next === 't' && previous.lastIndexOf('n') === previous.length - 1) {
                        result[i - 1] = previous.slice(0, -1);
                        result.push('n' + tok + next);
                        i += 1;
                    } else {
                        result.push(tok + next);
                        i += 1;
                    }
                    continue;
                }

                // TODO: refactor
                // Special en tokens, should be handled more elegantly
                if (tok === 'cant') {
                    // Default case: add token
                    result.push('can', 'n\'t');
                    continue;
                }

                if (tok === 'cannot') {
                    // Default case: add token
                    result.push('can', 'not');
                    continue;
                }

                if (tok === 'gonna') {
                    // Default case: add token
                    result.push('gon', 'na');
                    continue;
                }

                result.push(tok);
            }

            return result;
        }
    });


}();