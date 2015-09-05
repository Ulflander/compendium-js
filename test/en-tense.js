

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path);



    exports[pkg.mode + ' mode  - I\'m good'] = function(test) {
        var analysis = compendium.analyse('I\'m good')[0];
        test.equal(analysis.profile.main_tense, 'present');
        test.done();
    };
    exports[pkg.mode + ' mode  - I was good'] = function(test) {
        var analysis = compendium.analyse('I was good')[0];
        test.equal(analysis.profile.main_tense, 'past');
        test.done();
    };
    exports[pkg.mode + ' mode  - It will be good'] = function(test) {
        var analysis = compendium.analyse('It will be good')[0];
        test.equal(analysis.profile.main_tense, 'future');
        test.done();
    };
    // exports[pkg.mode + ' mode  - It\'s been good'] = function(test) {
    //     var analysis = compendium.analyse('It\'s been good')[0];
    //     test.equal(analysis.profile.main_tense, 'past');
    //     test.done();
    // };
});
