


[{mode: 'Minimal', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium-fr.js',}].forEach(function(pkg) {

    var compendium = require(pkg.path);

    // Comparative PoS result have been generated using the tree tagger from  Helmut Schmid in the TC project at the Institute for Computational Linguistics of the University of Stuttgart,
    // via http://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/
    //

    exports[pkg.mode + ' mode  - C\'est quelque chose'] = function(test) {
        test.deepEqual(['PRO:DEM', 'VER', 'PRO:IND', 'NOM'], compendium.analyse('C\'est quelque chose')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Je devrais aller acheter un ordinateur'] = function(test) {
        test.deepEqual(['PRO:PER', 'VER:cond', 'VER:infi', 'VER:infi', 'DET:ART', 'NOM'], compendium.analyse('Je devrais aller acheter un ordinateur')[0].tags);
        test.done();
    };


});
