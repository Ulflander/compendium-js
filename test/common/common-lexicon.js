
// The following tests validates that the lexicon is well built.


[{mode: 'Minimal en', path: '../../dist/compendium.minimal.js'},
 {mode: 'Full en',    path: '../../dist/compendium.js'},
 {mode: 'Minimal fr', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full fr',    path: '../../dist/compendium-fr.js'}].forEach(function(pkg) {
    var compendium = require(pkg.path),

    lexer = compendium.lexer;

    exports[pkg.mode + ' mode  - Various lexicon checks'] = function(test){

        test.equal(compendium.lexicon.hasOwnProperty('1'), false, 'Lexicon should not contain numeric keys');
        test.ok(Array.isArray(compendium.compendium.synonyms), 'Synonyms should be an array');
        test.ok(Array.isArray(compendium.compendium.verbs), 'Verbs should be an array');
        test.ok(typeof compendium.compendium.demonyms === 'object', 'Demonyms should be an object');
        test.ok(Array.isArray(compendium.compendium.synonyms[0]), 'Synonyms entries should be arrays');

        test.done();
    };
});
