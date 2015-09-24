
[{mode: 'Minimal en', path: '../../dist/compendium.minimal.js'},
 {mode: 'Full en',    path: '../../dist/compendium.js'},
 {mode: 'Minimal fr', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full fr',    path: '../../dist/compendium-fr.js'}].forEach(function(pkg) {
    var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - im lowercased'] = function(test){
        var analysis = compendium.analyse('im lowercased');

        test.equal(analysis[0].stats.p_upper, 0);
        test.equal(analysis[0].stats.p_cap, 0);
        test.done();
    };

    exports[pkg.mode + ' mode  - IM LOWERCASED'] = function(test){
        var analysis = compendium.analyse('IM LOWERCASED');

        test.equal(analysis[0].stats.p_upper, 100);
        test.done();
    };

    exports[pkg.mode + ' mode  - Im Lowercased'] = function(test){
        var analysis = compendium.analyse('Im Lowercased');

        test.equal(Math.floor(analysis[0].stats.p_upper), 0);
        test.equal(analysis[0].stats.p_cap, 100);
        test.equal(analysis[0].stats.words, 2);
        test.done();
    };

    exports[pkg.mode + ' mode  - !!!'] = function(test) {
        var analysis = compendium.analyse('!!!');
        test.equal(analysis[0].stats.words, 0);
        test.equal(analysis[0].tokens[0].attr.is_punc, true);
        test.done();
    };

});
