

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {

    var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - This is the I.C.U.'] = function(test){
        var expected = false,
            analysis = compendium.analyse('This is the I.C.U.'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - This is not the I.C.U.'] = function(test){
        var expected = true,
            analysis = compendium.analyse('This is not the I.C.U.'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - I shouldn\'t work, I should rest'] = function(test){
        var analysis = compendium.analyse('I shouldn\'t work, I should rest');
        test.equal(analysis[0].profile.negated, true);
        test.equal(analysis[0].tokens[0].profile.negated, false);
        test.equal(analysis[0].tokens[1].profile.negated, true);
        test.equal(analysis[0].tokens[2].profile.negated, true);
        test.equal(analysis[0].tokens[3].profile.negated, true);
        test.equal(analysis[0].tokens[4].profile.negated, false);
        test.equal(analysis[0].tokens[5].profile.negated, false);
        test.equal(analysis[0].tokens[6].profile.negated, false);
        test.equal(analysis[0].tokens[7].profile.negated, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - I can\'t say you are not dumb'] = function(test){
        var analysis = compendium.analyse('I can\'t say you are not dumb');
        test.equal(analysis[0].tokens[7].profile.negated, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - I shouldn\'t solely work, I should hard work'] = function(test){
        var expected = false,
            analysis = compendium.analyse('I shouldn\'t solely work, I should hard work'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m not happy.'] = function(test){
        var expected = true,
            analysis = compendium.analyse('I\'m not happy.'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.equal(analysis[0].tokens[0].profile.negated, false, '"I" should not be negated');
        test.equal(analysis[0].tokens[1].profile.negated, true, '"\'m" should be negated');
        test.equal(analysis[0].tokens[2].profile.negated, true, '"not" should be negated');
        test.equal(analysis[0].tokens[3].profile.negated, true, '"happy" should be negated');
        test.equal(analysis[0].tokens[4].profile.negated, false, '"." should not be negated');
        test.done();
    };


    exports[pkg.mode + ' mode  - are you not happy?'] = function(test){
        var expected = true,
            analysis = compendium.analyse('are you not happy?'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.equal(analysis[0].tokens[0].profile.negated, false);
        test.equal(analysis[0].tokens[1].profile.negated, false);
        test.equal(analysis[0].tokens[2].profile.negated, true);
        test.equal(analysis[0].tokens[3].profile.negated, true);
        test.equal(analysis[0].tokens[4].profile.negated, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - no way'] = function(test){
        var expected = true,
            analysis = compendium.analyse('no way'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.equal(analysis[0].tokens[0].profile.negated, true);
        test.equal(analysis[0].tokens[1].profile.negated, true);
        test.done();
    };

    exports[pkg.mode + ' mode  - there is zero chance'] = function(test){
        var expected = true,
            analysis = compendium.analyse('there is zero chance'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.equal(analysis[0].tokens[0].profile.negated, false);
        test.equal(analysis[0].tokens[1].profile.negated, false);
        test.equal(analysis[0].tokens[2].profile.negated, true);
        test.equal(analysis[0].tokens[3].profile.negated, true);
        test.done();
    };

    exports[pkg.mode + ' mode  - well nope!'] = function(test){
        var expected = true,
            analysis = compendium.analyse('well nope!'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.equal(analysis[0].tokens[0].profile.negated, false);
        test.equal(analysis[0].tokens[1].profile.negated, true);
        test.equal(analysis[0].tokens[2].profile.negated, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - can\'t'] = function(test){
        var expected = true,
            analysis = compendium.analyse('can\'t'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.equal(analysis[0].tokens[0].profile.negated, true);
        test.equal(analysis[0].tokens[1].profile.negated, true);
        test.done();
    };


    exports[pkg.mode + ' mode  - I\'m really not happy'] = function(test){
        var expected = true,
            analysis = compendium.analyse('I\'m really not happy'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.done();
    };


    exports[pkg.mode + ' mode  - nothing is good'] = function(test){
        var expected = true,
            analysis = compendium.analyse('nothing is good'),
            actual = analysis[0].profile.negated;

        test.equal(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - remember these are not designed to be speed demons but to be portable.'] = function(test){
        var analysis = compendium.analyse('remember these are not designed to be speed demons but to be portable.');

        test.equal(analysis[0].tokens[0].profile.negated, false);
        test.equal(analysis[0].tokens[1].profile.negated, false);
        test.equal(analysis[0].tokens[2].profile.negated, true);
        test.equal(analysis[0].tokens[3].profile.negated, true);
        test.equal(analysis[0].tokens[6].profile.negated, true);
        test.equal(analysis[0].tokens[10].profile.negated, false);
        test.equal(analysis[0].tokens[11].profile.negated, false);
        test.equal(analysis[0].tokens[12].profile.negated, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m not just happy, I\’m amazed'] = function(test){
        var expected = false,
            analysis = compendium.analyse('I\'m not just happy, I\’m amazed'),
            actual = analysis[0].profile.negated;

        test.equal(analysis[0].tokens[4].profile.negated, false);
        test.equal(analysis[0].tokens[2].profile.negated, false);
        test.equal(actual, expected);
        test.done();
    };
});
