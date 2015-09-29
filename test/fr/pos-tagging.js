


[{mode: 'Minimal', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium-fr.js',}].forEach(function(pkg) {

    var compendium = require(pkg.path);

    // Comparative PoS result have been generated using the tree tagger from  Helmut Schmid in the TC project at the Institute for Computational Linguistics of the University of Stuttgart,
    // via http://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/
    //

    exports[pkg.mode + ' mode  - :)'] = function(test) {
        test.deepEqual(['EM'], compendium.analyse(':)')[0].tags);
        test.done();
    };
    exports[pkg.mode + ' mode  - :)))'] = function(test) {
        test.deepEqual(['EM'], compendium.analyse(':)))')[0].tags);
        test.done();
    };
    exports[pkg.mode + ' mode  - 😋'] = function(test) {
        test.deepEqual(['EM'], compendium.analyse('😋')[0].tags);
        test.done();
    };


    exports[pkg.mode + ' mode  - pas possible'] = function(test) {
        test.deepEqual(['ADV', 'ADJ'], compendium.analyse('pas possible')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - deux pas'] = function(test) {
        test.deepEqual(['CD', 'NOM'], compendium.analyse('deux pas')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - un pas'] = function(test) {
        test.deepEqual(['ART:ind', 'NOM'], compendium.analyse('un pas')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - le pas'] = function(test) {
        test.deepEqual(['ART:def', 'NOM'], compendium.analyse('le pas')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - ce pas'] = function(test) {
        test.deepEqual(['PRO:dem', 'NOM'], compendium.analyse('ce pas')[0].tags);
        test.done();
    };


    exports[pkg.mode + ' mode  - C\'est quelque chose'] = function(test) {
        test.deepEqual(['PRO:dem', 'VER:ind:pre', 'ADJ:ind', 'NOM'], compendium.analyse('C\'est quelque chose')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Je devrais aller acheter un ordinateur'] = function(test) {
        test.deepEqual(['PRO:per', 'VER:cnd:pre', 'VER:inf', 'VER:inf', 'ART:ind', 'NOM'], compendium.analyse('Je devrais aller acheter un ordinateur')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Bonjour'] = function(test) {
        test.deepEqual('NOM'.split(' '), compendium.analyse('Bonjour')[0].tags);
        test.done();
    };


    exports[pkg.mode + ' mode  - Comment ça va?'] = function(test) {
        test.deepEqual('ADV PRO:dem VER:ind:pre PONC'.split(' '), compendium.analyse('Comment ça va?')[0].tags);
        test.done();
    };



});
