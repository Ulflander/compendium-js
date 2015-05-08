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
        pos = {},
        iA = Array.isArray,
        config = {
            profile: {
                negative_threshold: -0.2,
                positive_threshold: 0.2,
                amplitude_threshold: 0.3,
                polite_threshold: 0.2,
                dirty_threshold: 0.3
            }
        };


    compendium.detect = detectors;
    compendium.dependencies = dependencies;
    compendium.compendium = cpd;
    compendium.lexer = lexer;
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

