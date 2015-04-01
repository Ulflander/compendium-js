(function() {

    var analyser = {};

    analyser.createSentence = function(str) {
        return {
            time: 0,
            confidence: 1,
            raw: str,
            // type: 'unknown',
            // profiling: {
            //     label: 'neutral',
            //     sentiment: 0,
            //     politeness: 0,
            //     confidence: 0
            // },
            //dependencies: null,
            tokens: [],
            tags: []
        };
    };

    analyser.createToken = function(str, pos) {
        return {
            raw: str,
            pos: pos || '',
            is_acronym: false,
            // is_negated: false,
            // is_plural: false,
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

        s.tags = pos[0];
        s.confidence = pos[1];
        for (i = 0; i < l; i += 1) {
            s.tokens.push(analyser.createToken(sentence[i], pos[0][i]));
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
            pos = next.pos.tag(sentences[i]);

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