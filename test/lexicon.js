
// The following tests validates that the lexicon is well built.

var compendium = require('../dist/compendium.minimal.js'),
    lexer = compendium.lexer;


exports['Various lexicon checks'] = function(test){

    test.equal(compendium.lexicon.hasOwnProperty('1'), false, 'Lexicon should not contain numeric keys');
    test.equal(compendium.lexicon[')'].pos, ')', 'Closing parenthesis should not be PoS "EM"');
    test.done();
};