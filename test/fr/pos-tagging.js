


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
        test.deepEqual(['CD', 'NC'], compendium.analyse('deux pas')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - un pas'] = function(test) {
        test.deepEqual(['ART:ind', 'NC'], compendium.analyse('un pas')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - le pas'] = function(test) {
        test.deepEqual(['ART:def', 'NC'], compendium.analyse('le pas')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - ce pas'] = function(test) {
        test.deepEqual(['PRO:dem', 'NC'], compendium.analyse('ce pas')[0].tags);
        test.done();
    };


    exports[pkg.mode + ' mode  - C\'est quelque chose'] = function(test) {
        test.deepEqual(['PRO:dem', 'VER:ind:pre', 'ADJ:ind', 'NC'], compendium.analyse('C\'est quelque chose')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Je devrais aller acheter un ordinateur'] = function(test) {
        test.deepEqual(['PRO:per', 'VER:cnd:pre', 'VER:inf', 'VER:inf', 'ART:ind', 'NC'], compendium.analyse('Je devrais aller acheter un ordinateur')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Bonjour'] = function(test) {
        test.deepEqual('NC'.split(' '), compendium.analyse('Bonjour')[0].tags);
        test.done();
    };


    exports[pkg.mode + ' mode  - Comment ça va?'] = function(test) {
        test.deepEqual('ADV PRO:dem VER:ind:pre PONC'.split(' '), compendium.analyse('Comment ça va?')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Il est dans le parti'] = function(test) {
        test.deepEqual('PRO:per VER:ind:pre PRE ART:def NC'.split(' '), compendium.analyse('Il est dans le parti')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - en vue du'] = function(test) {
        test.deepEqual('PRE NC ART:def'.split(' '), compendium.analyse('en vue du')[0].tags);
        test.done();
    };


});

//Test only for full lexicon
[{mode: 'Full',    path: '../../dist/compendium-fr.js',}].forEach(function(pkg) {

    var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - Il a affirmé / test change.txt'] = function(test) {
        test.deepEqual('PRO:per AUX:ind:pre VER:par:pas'.split(' '), compendium.analyse('Il a affirmé')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Il a promis de fournir'] = function(test) {
        test.deepEqual('PRO:per AUX:ind:pre VER:par:pas PRE VER:inf'.split(' '), compendium.analyse('Il a promis de fournir')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  -il n\'a pas commis'] = function(test) {
        test.deepEqual('PRO:per ADV AUX:ind:pre ADV VER:par:pas'.split(' '), compendium.analyse('il n\'a pas commis')[0].tags);
        test.done();
    };




});
