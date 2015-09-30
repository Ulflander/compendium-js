
[{mode: 'Minimal', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium-fr.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),
        lexer = compendium.lexer;


    exports[pkg.mode + ' mode  - J\'suis trop heureux d\'être là.'] = function(test){
        test.deepEqual([['J\'', 'suis', 'trop', 'heureux', 'd\'', 'être', 'là', '.']],
                        compendium.lex('J\'suis trop heureux d\'être là.', 'fr'));
        test.done();
    };

});
