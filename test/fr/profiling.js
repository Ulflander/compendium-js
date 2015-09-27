
[{mode: 'Minimal', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium-fr.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),
        lexer = compendium.lexer;


    exports[pkg.mode + ' mode  - Je suis content'] = function(test){
        test.equal(compendium.analyse('Je suis content')[0].profile.label, 'positive');
        test.done();
    };

    exports[pkg.mode + ' mode  - Je suis content vs je suis vraiment content'] = function(test){
        test.ok(compendium.analyse('Je suis content')[0].profile.sentiment < compendium.analyse('Je suis vraiment content')[0].profile.sentiment, 'Je suis vraiment content should have a greater sentiment score than je suis content.');
        test.done();
    };


    exports[pkg.mode + ' mode  - Je suis pas content'] = function(test){
        test.equal(compendium.analyse('Je suis pas content')[0].profile.label, 'negative');
        test.done();
    };

});
