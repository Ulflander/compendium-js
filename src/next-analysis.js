(function() {

    var analyser = {};

    analyser.createSentence = function(str) {
        return {
            time: 0,
            confidence: 1,
            raw: str,
            // type: 'unknown',
            profiling: {
                label: 'neutral',
                sentiment: 0,
                politeness: 0
            },
            //dependencies: null,
            tokens: [],
            tags: []
        };
    };

    analyser.createToken = function(str, pos, sentiment) {
        return {
            raw: str,
            pos: pos || '',
            sentiment: sentiment,
            is_acronym: false,
            is_plural: pos === 'NNS',
            // is_negated: false,
            // is_verb: false,
            // qualified_by: [],
            // applies_to: []
        };
    };


    analyser.toObject = function(sentence, pos) {
        var s = this.createSentence(sentence.join(' ')),
            i,
            l = sentence.length,
            token;

        s.tags = pos.tags;
        s.confidence = pos.confidence;
        for (i = 0; i < l; i += 1) {
            s.tokens.push(analyser.createToken(sentence[i], pos.tags[i], pos.sentiment[i]));
        }
        return s;
    };

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
        for (i = 0; i < l; i += 1) {
            d = Date.now();

            // Get part of speech
            pos = next.tag(sentences[i]);

            // Convert to object
            s = analyser.toObject(sentences[i], pos);
            
            // Apply token level detection
            for (j = 0, m = s.tokens.length; j < m; j += 1) {
                next.detect.apply('token', s.tokens[j], j, s);
            }
            
            s.time = Date.now() - d;
            res.push(s);
        }
        // For each sentence
        for (i = 0; i < l; i += 1) {
            next.detect.apply('sentence', res[i], i, res);
        }
        return res;
    };

    next.analyse = function(o) {
        if (typeof o === 'string') {
            o = next.lex(o);
        }

        var result = analyser.analyse(o);
        next.detect.apply('text', result);
        return result;
    };
}());