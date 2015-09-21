


[{mode: 'Minimal', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium-fr.js',}].forEach(function(pkg) {

    var compendium = require(pkg.path);

    // Comparative PoS result have been generated using the tree tagger from  Helmut Schmid in the TC project at the Institute for Computational Linguistics of the University of Stuttgart,
    // via http://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/
    //

    exports[pkg.mode + ' mode  - C\'est quelque chose'] = function(test) {
        test.deepEqual(['PRO:dem', 'VER', 'ADJ:ind', 'NOM'], compendium.analyse('C\'est quelque chose')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Je devrais aller acheter un ordinateur'] = function(test) {
        test.deepEqual(['PRO:per', 'VER', 'VER', 'VER', 'ART:ind', 'NOM'], compendium.analyse('Je devrais aller acheter un ordinateur')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Bonjour'] = function(test) {
        test.deepEqual('NOM'.split(' '), compendium.analyse('Bonjour')[0].tags);
        test.done();
    };


    exports[pkg.mode + ' mode  - Comment ça va?'] = function(test) {
        test.deepEqual('ADV PRO:dem VER:pres PONC'.split(' '), compendium.analyse('Comment ça va?')[0].tags);
        test.done();
    };


});
