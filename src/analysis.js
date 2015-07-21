

/**
 * Analyser - High level utility that goes through the full analysis steps
 * (lexer, PoS, detectors) and returns an analysis result object.
 */

!function() {

    var SUPPORTED_LANGUAGES = ['en', 'fr'];

    analyser.toObject = function(sentence, language) {
        return ;
    };

    analyser.applyPOS = function(s, tokens, language) {
        var i,
            l,
            pos,
            token;

        // Get part of speech
        pos = compendium.tag(tokens, language);

        s.tags = pos.tags;
        s.stats.confidence = pos.confidence;
        for (i = 0, l = tokens.length; i < l; i ++) {
            s.tokens.push(factory.token(tokens[i], pos.norms[i], pos.tags[i]));
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
    analyser.analyse = function(raw, language) {
        var res = [],
            i,
            lexed,
            sentences,
            l,
            d,
            s,
            pos,
            j,
            context,
            m;


        // If provided a string, let's decode and lex it into sentences before analysis
        lexed = lexer.advanced(compendium.decode(raw), language);
        sentences = lexed.sentences;

        // For each sentence
        for (i = 0, l = sentences.length; i < l; i ++) {
            d = Date.now();

            // Convert to object
            s = factory.sentence(lexed.raws[i], language);

            // Apply POS to sentence object
            analyser.applyPOS(s, sentences[i], language);

            // Generate statistics
            compendium.stat(s);

            // Create detectors context
            context = detectors.context();

            // Apply token level detection before dep parsing
            for (j = 0, m = s.tokens.length; j < m; j ++) {
                detectors.apply('t', true, s.tokens[j], j, s, context);
            }

            detectors.apply('s', true, s, i, res, context);

            // Create dependency tree
            dependencies.parse(s);

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

        language = language || 'en';
        if (SUPPORTED_LANGUAGES.indexOf(language) === -1) {
            throw new Error('Compendium supports only the following languages: ' + SUPPORTED_LANGUAGES.join(', '));
        }

        result = analyser.analyse(o, language);
        detectors.apply('p', false, result);

        return result;
    };
}();