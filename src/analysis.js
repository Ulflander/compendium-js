

/**
 * Analyser - High level utility that goes through the full analysis steps 
 * (lexer, PoS, detectors) and returns an analysis result object.
 */

!function() {

    analyser.toObject = function(sentence, pos) {
        var s = factory.sentence(sentence.join(' ')),
            i,
            l = sentence.length,
            token;

        s.tags = pos.tags;
        s.stats.confidence = pos.confidence;
        for (i = 0; i < l; i ++) {
            s.tokens.push(factory.token(sentence[i], pos.tags[i]));
        }
        s.length = l;
        return s;
    };

    /**
     * Analyse an array of tokenized sentences.
     *
     * @memberOf compendium.analyser
     * @param  {Array} sentences  Matrix of tokens per sentences
     * @return {Array}            An array of analysis object, one for each sentence
     */
    analyser.analyse = function(sentences) {
        var res = [],
            i,
            l = sentences.length,
            d,
            s,
            pos,
            j,
            m;

        // For each sentence
        for (i = 0; i < l; i ++) {
            d = Date.now();

            // Get part of speech
            pos = compendium.tag(sentences[i]);

            // Convert to object
            s = analyser.toObject(sentences[i], pos);

            // Generate statistics
            compendium.stat(s);

            // Create dependency tree
            dependencies.parse(s);
            
            // Apply token level detection
            for (j = 0, m = s.tokens.length; j < m; j ++) {
                detectors.apply('t', s.tokens[j], j, s);
            }
            
            res.push(s);

            detectors.apply('s', s, i, res);

            s.time = Date.now() - d;
        }
        return res;
    };

    /**
     * Process a text and returns an analysis object.
     *
     * @memberOf compendium
     * @param  {String} o A string that will be tokenized by the lexer
     * @return {Array}    An array of analysis objects, one for each sentence of the given text
     */
    compendium.analyse = function(o) {
        var result = null;

        // If provided a string, let's decode and lex it before analysis
        if (typeof o === 'string') {
            o = compendium.lex(compendium.decode(o));
        }

        if (!iA(o) || !iA(o[0])) {
            throw new Error('Compendium requires a string or a matrix of sentences/tokens as argument.');
        }

        result = analyser.analyse(o);
        detectors.apply('p', result);

        return result;
    };
}();