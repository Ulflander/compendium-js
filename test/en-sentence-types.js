

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path);




    exports[pkg.mode + ' mode  - Various foreign test cases'] = function(test) {
        var cases = [
            // Should be foreign because of low confidence
            'La terminal norte es para los vuelos internacionales.',
            // Should be foreign because percentage of foreign words
            'Je suis un garçon',
            // Should be foreign because of confidence === 0 and more than 2 tokens
            'fdsfj nlsflsdfndj lsdfjn'
        ], i, l, analysis;

        for (i = 0, l = cases.length; i < l; i += 1) {
            analysis = compendium.analyse(cases[i]);
            test.notEqual(analysis[0].profile.types.indexOf('foreign'), -1, '"' + cases[i] + '" should be typed `foreign`');
        }

        test.done();
    };

    exports[pkg.mode + ' mode  - Various non foreign test cases'] = function(test) {
        var cases = [
            'Hello world.',
            // A sentence with one foreign word but good confidence
            // in PoS tagging should not account as foreign
            'I hate aig and their non loan given asses.',
            // URLs, hashtags... should not account as foreign
            '#Canon http://u.mavrev.com/5a3t',
            'jQuery UI 1.6 Book Review - http://cfbloggers.org/?c=30631'
        ], i, l, analysis;

        for (i = 0, l = cases.length; i < l; i += 1) {
            analysis = compendium.analyse(cases[i]);
            test.equal(analysis[0].profile.types.indexOf('foreign'), -1, '"' + cases[i] + '" should not be typed `foreign`');
        }

        test.done();
    };

    exports[pkg.mode + ' mode  - Various headline test cases'] = function(test) {
        var cases = [
            'NVIDIA Names Stanford\'s Bill Dally Chief Scientist, VP Of Research http://bit.ly/Fvvg9'
        ], i, l, analysis;

        for (i = 0, l = cases.length; i < l; i += 1) {
            analysis = compendium.analyse(cases[i]);
            test.notEqual(analysis[0].profile.types.indexOf('headline'), -1, '"' + cases[i] + '" should be typed `headline`');
        }

        test.done();
    };


    exports[pkg.mode + ' mode  - Various interrogative test cases'] = function(test) {
        var cases = [
            'uh?',
            'who am i?', 'Who I am?',
            // All the following should pass because of:
            // - WP, WP$, WRB as first token
            // - no breakpoint
            'why so', 'who is he', 'where am i', 'who am i',
            'whose one', 'what the fuck', 'when is this',
            'how do you do', 'whom is this one',
            // thanks to dependency analysis,
            // `why` being left dependency of master `are`
            // it should be interrogative
            'but why are you',
            'well why',
            // [be|do|MD] PRP [VB]
            'are you going',
            'do i do well',
            'can you go please'
        ], i, l, analysis;

        for (i = 0, l = cases.length; i < l; i += 1) {
            analysis = compendium.analyse(cases[i]);
            test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1, '"' + cases[i] + '" should be typed `interrogative`');
        }

        test.done();
    };

    exports[pkg.mode + ' mode  - Various exclamatory test cases'] = function(test) {
        var cases = [
            'do it!', 'yeah!!!'
        ], i, l, analysis;

        for (i = 0, l = cases.length; i < l; i += 1) {
            analysis = compendium.analyse(cases[i]);
            test.notEqual(analysis[0].profile.types.indexOf('exclamatory'), -1, '"' + cases[i] + '" should be typed `exclamatory`');
        }

        test.done();
    };



    exports[pkg.mode + ' mode  - Various non interrogative test cases'] = function(test) {
        var cases = [
            // Following should fail because of a breakpoint and no "?"
            'When in Rome, do as the Romans.',
            'you\'re awesome, that\'s what I mean :)',
            'I sue you'
        ], i, l, analysis;

        for (i = 0, l = cases.length; i < l; i += 1) {
            analysis = compendium.analyse(cases[i]);
            test.equal(analysis[0].profile.types.indexOf('interrogative'), -1, '"' + cases[i] + '" should not be typed `interrogative`');
        }

        test.done();
    };

    exports[pkg.mode + ' mode  - Various imperative test cases'] = function(test) {
        var cases = [
            'do it', 'let\'s have a beer', 'go', 'let\'s go', 'go on'
        ], i, l, analysis;

        for (i = 0, l = cases.length; i < l; i += 1) {
            analysis = compendium.analyse(cases[i]);
            test.notEqual(analysis[0].profile.types.indexOf('imperative'), -1, '"' + cases[i] + '" should be typed `imperative`');
            analysis = compendium.analyse(cases[i] + '!');
            test.notEqual(analysis[0].profile.types.indexOf('imperative'), -1, '"' + cases[i] + '!" should be typed `imperative`');
        }

        test.done();
    };



    exports[pkg.mode + ' mode  - Various approval test cases'] = function(test) {
        var cases = [
            'yes', 'yeah', 'yep', 'sure', 'ok', 'go', 'aye',
            'do it', 'awesome', 'perfect', 'well yup',
            'roger that', 'indeed', 'hell yeah', '(y)',
            'sure thing', 'oki doki', 'alright', 'all right',
            'affirmative', 'sure', 'mh yes', 'ah ok', 'ah okay',
            'agreed'
        ], i, l, analysis;

        for (i = 0, l = cases.length; i < l; i += 1) {
            analysis = compendium.analyse(cases[i]);
            test.notEqual(analysis[0].profile.types.indexOf('approval'), -1, '"' + cases[i] + '" should be typed `approval`');
            analysis = compendium.analyse(cases[i] + '!');
            test.notEqual(analysis[0].profile.types.indexOf('approval'), -1, '"' + cases[i] + '!" should be typed `approval`');
        }

        test.done();
    };


    exports[pkg.mode + ' mode  - Various non approval test cases'] = function(test) {
        var cases = [
            'yes?', 'perfect?', 'mh', 'nope'
        ], i, l, analysis;

        for (i = 0, l = cases.length; i < l; i += 1) {
            analysis = compendium.analyse(cases[i]);
            test.equal(analysis[0].profile.types.indexOf('approval'), -1, '"' + cases[i] + '" should not be typed `approval`');
        }

        test.done();
    };

    exports[pkg.mode + ' mode  - Various refusal test cases'] = function(test) {
        var cases = [
            'no', 'nah', 'nope', 'n',
            'no way', 'don\'t do it',
            'don\'t', 'do not',
            'hell no'
        ], i, l, analysis;

        for (i = 0, l = cases.length; i < l; i += 1) {
            analysis = compendium.analyse(cases[i]);
            test.notEqual(analysis[0].profile.types.indexOf('refusal'), -1, '"' + cases[i] + '" should be typed `refusal`');
            analysis = compendium.analyse(cases[i] + '!');
            test.notEqual(analysis[0].profile.types.indexOf('refusal'), -1, '"' + cases[i] + '!" should be typed `refusal`');
        }

        test.done();
    };

    // exports[pkg.mode + ' mode  - Various non refusal test cases'] = function(test) {
    //     var cases = [
    //         'nope?', 'mh', 'yes'
    //     ], i, l, analysis;

    //     for (i = 0, l = cases.length; i < l; i += 1) {
    //         analysis = compendium.analyse(cases[i]);
    //         test.equal(analysis[0].profile.types.indexOf('refusal'), -1, '"' + cases[i] + '" should not be typed `approval`');
    //     }

    //     test.done();
    // };



});
