(function(compendium){
    'use strict';

    // Prepare namespace
    // Global shortcuts
    var cpd = {},
        lexer = {},
        factory = {},
        analyser = {},
        detectors = {},
        dependencies = {},
        // dependency parsing v2
        parser = {},
        inflector = {},
        pos = {},
        iA = Array.isArray,
        config = {
            profile: {
                negative_threshold: -0.3,
                positive_threshold: 0.3,
                amplitude_threshold: 0.3,
                polite_threshold: 0.2,
                dirty_threshold: 0.3
            },
            parser: ['v1', 'v2']
        },

        // Various types
        T_FOREIGN = 'foreign',
        T_INTERROGATIVE = 'interrogative',
        T_EXCLAMATORY = 'exclamatory',
        T_HEADLINE = 'headline',
        T_IMPERATIVE = 'imperative',
        T_APPROVAL = 'approval',
        T_REFUSAL = 'refusal';


    compendium.detect = detectors;
    compendium.dependencies = dependencies;
    compendium.inflector = inflector;
    compendium.compendium = cpd;
    compendium.lexer = lexer;
    compendium.parser = parser;
    compendium.factory = factory;
    compendium.pos = pos;
    compendium.config = config;

    function extend(target, object) {
        var k;
        for (k in object) {
            if (object.hasOwnProperty(k)) {
                target[k] = object[k];
            }
        };
    };

    // escape regexp specific chars from a string
    function regexpEscape(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }

