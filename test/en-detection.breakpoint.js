

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - I\'m John, I\'m happy'] = function(test){
        var analysis = compendium.analyse('I\'m John, I\'m happy');

        test.equal(analysis[0].tokens[3].profile.breakpoint, true);
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m John: I\'m happy'] = function(test){
        var analysis = compendium.analyse('I\'m John: I\'m happy');

        test.equal(analysis[0].tokens[3].profile.breakpoint, true);
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m John; I\'m happy'] = function(test){
        var analysis = compendium.analyse('I\'m John; I\'m happy');

        test.equal(analysis[0].tokens[3].profile.breakpoint, true);
        test.done();
    };
});
