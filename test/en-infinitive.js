
// A bug was found where full lexicon version (i.e. Node.js version)
// discard the inifinitives when building lexicon.
// This tests ensure it stays fixed.

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - This is good'] = function(test) {
        var analysis = compendium.analyse('This is good')[0];
        test.equal(analysis.tokens[1].attr.infinitive, 'be');
        test.equal(analysis.tokens[1].attr.tense, 'present');
        test.done();
    };

    exports[pkg.mode + ' mode  - tell me a joke'] = function(test) {
        var analysis = compendium.analyse('tell me a joke')[0];
        test.equal(analysis.tokens[0].attr.infinitive, 'tell');
        test.equal(analysis.tokens[0].attr.tense, 'present');
        test.done();
    };


    exports[pkg.mode + ' mode  - he told me a joke'] = function(test) {
        var analysis = compendium.analyse('he told me a joke')[0];
        test.equal(analysis.tokens[1].attr.infinitive, 'tell');
        test.equal(analysis.tokens[1].attr.tense, 'past');
        test.done();
    };

    exports[pkg.mode + ' mode  - it was good'] = function(test) {
        var analysis = compendium.analyse('it was good')[0];
        test.equal(analysis.tokens[1].attr.infinitive, 'be');
        test.equal(analysis.tokens[1].attr.tense, 'past');
        test.done();
    };
    exports[pkg.mode + ' mode  - you were good'] = function(test) {
        var analysis = compendium.analyse('you were good')[0];
        test.equal(analysis.tokens[1].attr.infinitive, 'be');
        test.equal(analysis.tokens[1].attr.tense, 'past');
        test.done();
    };

    exports[pkg.mode + ' mode  - you are good'] = function(test) {
        var analysis = compendium.analyse('you are good')[0];
        test.equal(analysis.tokens[1].attr.infinitive, 'be');
        test.equal(analysis.tokens[1].attr.tense, 'present');
        test.done();
    };

    exports[pkg.mode + ' mode  - you\'re good'] = function(test) {
        var analysis = compendium.analyse('you\'re good')[0];
        test.equal(analysis.tokens[1].attr.infinitive, 'be');
        test.equal(analysis.tokens[1].attr.tense, 'present');
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m good'] = function(test) {
        var analysis = compendium.analyse('I\'m good')[0];
        test.equal(analysis.tokens[1].attr.infinitive, 'be');
        test.equal(analysis.tokens[1].attr.tense, 'present');
        test.done();
    };

    exports[pkg.mode + ' mode  - I am good'] = function(test) {
        var analysis = compendium.analyse('I am good')[0];
        test.equal(analysis.tokens[1].attr.infinitive, 'be');
        test.equal(analysis.tokens[1].attr.tense, 'present');
        test.done();
    };

    exports[pkg.mode + ' mode  - It\'s good'] = function(test) {
        var analysis = compendium.analyse('It\'s good')[0];
        test.equal(analysis.tokens[1].attr.infinitive, 'be');
        test.equal(analysis.tokens[1].attr.tense, 'present');
        test.done();
    };
});
