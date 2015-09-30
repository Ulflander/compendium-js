
// The following tests validates that the lexicon is well built.


[{mode: 'Minimal', path: '../../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),

    lexer = compendium.lexer;


    exports[pkg.mode + ' mode  - Various lexicon checks'] = function(test){

        test.equal(compendium.lexicon[')'].pos, ')', 'Closing parenthesis should be PoS ")"');
        test.equal(compendium.lexicon['satisfied'].sentiment, 2, 'Lexicon "satisfied" should have a 2 sentiment score');

        test.done();
    };
});
