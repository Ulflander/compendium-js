

[{mode: 'Minimal', path: '../../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - When in Rome, do as the Romans.'] = function(test) {
        var analysis = compendium.analyse('When in Rome, do as the Romans.');

        test.equal(analysis[0].stats.breakpoints, 1);
        test.equal(analysis[0].stats.words, 7);
        test.equal(analysis[0].tokens[0].attr.is_punc, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - :)'] = function(test) {
        var analysis = compendium.analyse(':)');
        test.equal(analysis[0].stats.words, 0);
        test.equal(analysis[0].tokens[0].attr.is_punc, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - je suis le monstre'] = function(test){
        var analysis = compendium.analyse('je suis le monstre');

        test.equal(analysis[0].stats.p_foreign, 50);
        test.equal(analysis[0].stats.avg_length, 3.75);
        test.done();
    };

});
