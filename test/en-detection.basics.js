

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {

        var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - Three millions'] = function(test){
        var analysis = compendium.analyse('Three millions');

        test.equal(analysis[0].tokens[1].attr.singular, 'million');
        test.done();
    };
    exports[pkg.mode + ' mode  - One checkpoint'] = function(test){
        var analysis = compendium.analyse('One checkpoint');

        test.equal(analysis[0].tokens[1].attr.singular, 'checkpoint');
        test.done();
    };
    exports[pkg.mode + ' mode  - One million'] = function(test){
        var analysis = compendium.analyse('One million');

        test.equal(analysis[0].tokens[1].attr.singular, 'million');
        test.done();
    };
});
