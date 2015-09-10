!function() {


    var apostrophes = ['\'', '’', 'ʼ'];

    extend(compendium.lexer, {

        // Post process is a the sentence level, is given an array of tokens
        //
        postprocess:  function(tokens) {
            // Split with base regexp
            var i,
                l = tokens.length,
                tok,
                result = [];

            for (i = 0; i < l; i += 1) {
                tok = tokens[i];

                // Handle + normalize apostrophes
                if (apostrophes.indexOf(tok) > -1) {
                    result[result.length - 1] += '\'';
                } else {
                    result.push(tok);
                }
            }

            return result;
        }
    });


}();