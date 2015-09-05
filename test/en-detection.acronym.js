

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {



        var compendium = require(pkg.path);

    exports[pkg.mode + ' mode  - This is the I.C.U.'] = function(test){
        var expected = true,
            analysis = compendium.analyse('This is the I.C.U.'),
            actual = analysis[0].tokens[3].attr.acronym;

        test.equal(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m from the U.S., this is a great country'] = function(test){
        var expected = true,
            analysis = compendium.analyse('I\'m from the U.S., this is a great country'),
            actual = analysis[0].tokens[4].attr.acronym;

        test.equal(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - I work at HSBC'] = function(test){
        var expected = false,
            analysis = compendium.analyse('I work at HSBC'),
            actual = analysis[0].tokens[3].attr.acronym;

        test.equal(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - This is September.'] = function(test){
        var analysis = compendium.analyse('This is september.');

        test.equal(analysis[0].tokens[2].attr.acronym, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - I live in wisconsin.'] = function(test){
        var analysis = compendium.analyse('I live in wisconsin.');

        test.equal(analysis[0].tokens[3].attr.acronym, false);
        test.done();
    };
});
