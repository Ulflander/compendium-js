
// The following tests validates that the lexicon is well built.


[{mode: 'Minimal', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium-fr.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),

    lexer = compendium.lexer;


    exports[pkg.mode + ' mode  - Various lexicon checks'] = function(test){

        test.equal(compendium.lexicon.hasOwnProperty('1'), false, 'Lexicon should not contain numeric keys');
        //test.equal(compendium.lexicon[')'].pos, ')', 'Closing parenthesis should be PoS ")"');
        test.equal(compendium.lexicon.hasOwnProperty('je'), true, 'Lexicon should contain must used french words');
        //test.equal(compendium.lexicon['...'].sentiment, -0.5, 'Lexicon "..." should have a -0.5 sentiment score');
        //test.ok(Array.isArray(compendium.compendium.synonyms), 'Synonyms should be an array');
        //test.ok(Array.isArray(compendium.compendium.verbs), 'Verbs should be an array');
        //test.ok(typeof compendium.compendium.demonyms === 'object', 'Demonyms should be an object');
        //test.ok(Array.isArray(compendium.compendium.synonyms[0]), 'Synonyms entries should be arrays');
        test.done();
    };
});
