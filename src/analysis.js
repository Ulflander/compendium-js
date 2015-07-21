

/**
 * Analyser - High level utility that goes through the full analysis steps
 * (lexer, PoS, detectors) and returns an analysis result object.
 */

!function() {

    var SUPPORTED_LANGUAGES = ['en', 'fr'];

    analyser.toObject = function(sentence, language) {
        return ;
    };

    analyser.applyPOS = function(s, language) {
        var i,
            l,
            pos,
            lexed,
            token;

        // Get lexed sentence
        lexed = compendium.lexer.tokens(s.raw, language);

        // Get part of speech
        pos = compendium.tag(lexed, language);

        s.tags = pos.tags;
        s.stats.confidence = pos.confidence;
        for (i = 0, l = lexed.length; i < l; i ++) {
            s.tokens.push(factory.token(lexed[i], pos.norms[i], pos.tags[i]));
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
    analyser.analyse = function(sentences, language) {
        var res = [],
            i,
            l = sentences.length,
            d,
            s,
            pos,
            j,
            context,
            m;

        // For each sentence
        for (i = 0; i < l; i ++) {
            d = Date.now();

            // Convert to object
            s = factory.sentence(sentences[i], language);

            // Apply POS to sentence object
            analyser.applyPOS(s, language);

            // Generate statistics
            compendium.stat(s);


            // Apply token level detection before dep parsing
            for (j = 0, m = s.tokens.length; j < m; j ++) {
                detectors.apply('t', true, s.tokens[j], j, s, context);
            }

            detectors.apply('s', true, s, i, res, context);

            // Create dependency tree
            dependencies.parse(s);

            context = detectors.context();

            // Apply token level detection
            for (j = 0, m = s.tokens.length; j < m; j ++) {
                detectors.apply('t', false, s.tokens[j], j, s, context);
            }

            res.push(s);

            detectors.apply('s', false, s, i, res, context);

            s.time = Date.now() - d;
        }
        return res;
    };

    /**
     * Process a text and returns an analysis object.
     *
     * @memberOf compendium
     * @param  {String} o A string that will be tokenized by the lexer
     * @param {String} language Language of given text
     * @return {Array}    An array of analysis objects, one for each sentence of the given text
     */
    compendium.analyse = function(o, language) {
        var result = null;

        // If provided a string, let's decode and lex it into sentences before analysis
        if (typeof o === 'string') {
            o = compendium.lex(compendium.decode(o), language, true);
        }

        if (!iA(o)) {
            throw new Error('Compendium requires a string or an array of strings as argument.');
        }

        language = language || 'en';
        if (SUPPORTED_LANGUAGES.indexOf(language) === -1) {
            throw new Error('Compendium supports only the following languages: ' + SUPPORTED_LANGUAGES.join(', '));
        }

        result = analyser.analyse(o, language);
        detectors.apply('p', false, result);

        return result;
    };
}();