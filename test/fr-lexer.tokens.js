
var compendium = require('../dist/compendium-fr.minimal.js'),
    lexer = compendium.lexer;


exports['J\'suis trop heureux d\'être là.'] = function(test){
    test.deepEqual([['J\'', 'suis', 'trop', 'heureux', 'd\'', 'être', 'là', '.']],
                    compendium.lex('J\'suis trop heureux d\'être là.', 'fr'));
    test.done();
};
