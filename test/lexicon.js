
// The following tests validates that the lexicon is well built.

var compendium = require('../dist/compendium.minimal.js'),
    lexer = compendium.lexer;


exports['Various lexicon checks'] = function(test){

    test.equal(compendium.lexicon.hasOwnProperty('1'), false, 'Lexicon should not contain numeric keys');
    test.equal(compendium.lexicon[')'].pos, ')', 'Closing parenthesis should not be PoS "EM"');
    test.ok(Array.isArray(compendium.compendium.synonyms), 'Synonyms should be an array');
    test.ok(Array.isArray(compendium.compendium.verbs), 'Verbs should be an array');
    test.ok(typeof compendium.compendium.nationalities === 'object', 'Nationalities should be an object');
    test.ok(Array.isArray(compendium.compendium.synonyms[0]), 'Synonyms entries should be arrays');
    test.done();
};