(function() {
    // Factory for analysis objects
    extend(factory, {
        entity: function(token, index, type) {
            return {
                raw: token.raw,
                norm: token.norm,
                fromIndex: index,
                toIndex: index,
                type: type || null,
                meta: {}
            };
        },
        sentence: function(str) {
            return {
                time: 0,
                length: 0,
                raw: str,
                // Those statistics are used by the 
                // detectors (entity detection, quality evalution)
                stats: {
                    // Confidence in PoS tagging
                    // - Can be used to spot foreign text as well as estimate text quality
                    confidence: 0,
                    // Percentage of foreign tokens accross all tokens
                    // - Can be used to spot foreign text
                    p_foreign: 0,
                    // Percentage of uppercased tokens
                    p_upper: 0,
                    // Percentage of tokens capitalized
                    // - Will allow to define headline sentence type
                    // - May disable entity recognition based on capitalization
                    p_cap: 0,
                    // Average token length
                    // - Can be used as indicator for text quality
                    avg_length: 0
                },
                // type: 'unknown',
                profile: {
                    label: 'neutral',
                    sentiment: 0,
                    emphasis: 1,
                    amplitude: 0,
                    politeness: 0,
                    // Types. A sentence can have many types:
                    // (e.g. `imperative` + `refusal` for `don't do it` or
                    // `foreign` + `interrogative` for `Suis-je le monstre?`)
                    // `imperative`, 
                    // `declarative`, 
                    // `approval`, 
                    // `refusal`, 
                    // `interrogative`, 
                    // `headline`
                    // `foreign`
                    types: []
                },
                has_negation: false,
                entities: [],
                //dependencies: null,
                tokens: [],
                tags: []
            };
        }, 
        token: function(raw, pos) {
            var norm = raw.toLowerCase();
            return {
                raw: raw,
                norm: norm,
                stem: compendium.stemmer(norm),
                pos: pos || '',
                profile: {
                    sentiment: 0,
                    emphasis: 1,
                    negated: false,
                    breakpoint: false
                },
                attr: {
                    acronym: false,
                    plural: false,
                    abbr: false,
                    verb: pos.indexOf('VB') === 0,
                    entity: -1
                }
                // qualified_by: [],
                // applies_to: []
            };
        }
    });
}());