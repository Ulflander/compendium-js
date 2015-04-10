

/**
 * Analyser - High level utility that goes through the full analysis steps 
 * (lexer, PoS, detectors)
 */


(function() {

    var analyser = {};

    analyser.createSentence = function(str) {
        return {
            time: 0,
            confidence: 1,
            length: 0,
            raw: str,
            // type: 'unknown',
            profiling: {
                label: 'neutral',
                sentiment: 0,
                politeness: 0
            },
            has_negation: false,
            entities: [],
            //dependencies: null,
            tokens: [],
            tags: []
        };
    };

    analyser.createToken = function(raw, pos, sentiment) {
        return {
            raw: raw,
            pos: pos || '',
            sentiment: sentiment,
            is_acronym: false,
            is_breakpoint: false,
            is_plural: pos === 'NNS',
            is_negated: false,
            norm: typeof raw === 'string' ? raw.toLowerCase() : raw,
            is_verb: pos.indexOf('VB') === 0
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
        s.length = l;
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
            pos = compendium.tag(sentences[i]);

            // Convert to object
            s = analyser.toObject(sentences[i], pos);
            
            // Apply token level detection
            for (j = 0, m = s.tokens.length; j < m; j += 1) {
                compendium.detect.apply('t', s.tokens[j], j, s);
            }
            
            s.time = Date.now() - d;
            res.push(s);
        }
        // For each sentence
        for (i = 0; i < l; i += 1) {
            compendium.detect.apply('s', res[i], i, res);
        }
        return res;
    };

    compendium.analyse = function(o) {
        if (typeof o === 'string') {
            o = compendium.lex(o);
        }

        var result = analyser.analyse(o);
        compendium.detect.apply('p', result);
        return result;
    };
}());