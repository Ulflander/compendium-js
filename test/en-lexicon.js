
// The following tests validates that the lexicon is well built.


[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),

    lexer = compendium.lexer;


    exports[pkg.mode + ' mode  - Various lexicon checks'] = function(test){

        test.equal(compendium.lexicon.hasOwnProperty('1'), false, 'Lexicon should not contain numeric keys');
        test.equal(compendium.lexicon[')'].pos, ')', 'Closing parenthesis should not be PoS "EM"');
        test.equal(compendium.lexicon['satisfied'].sentiment, 2, 'Lexicon "satisfied" should have a 2 sentiment score');
        //test.equal(compendium.lexicon['...'].sentiment, -0.5, 'Lexicon "..." should have a -0.5 sentiment score');
        test.ok(Array.isArray(compendium.compendium.synonyms), 'Synonyms should be an array');
        test.ok(Array.isArray(compendium.compendium.verbs), 'Verbs should be an array');
        test.ok(typeof compendium.compendium.nationalities === 'object', 'Nationalities should be an object');
        test.ok(Array.isArray(compendium.compendium.synonyms[0]), 'Synonyms entries should be arrays');

        test.done();
    };
});
