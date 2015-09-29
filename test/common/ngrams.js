
// The following tests validates that the lexicon is well built.


[{mode: 'Minimal en', path: '../../dist/compendium.minimal.js'},
 {mode: 'Full en',    path: '../../dist/compendium.js'}].forEach(function(pkg) {
    var compendium = require(pkg.path);
    compendium.register('United States of America', ['NNP', 'NNPS', 'IN', 'NNP']);
    compendium.register('United Airlines', 'NNP');


    exports[pkg.mode + ' mode  - Test ngram lexicon simple PoS tagging'] = function(test){
        test.deepEqual(compendium.analyse('united airlines is great')[0].tags, ['NNP', 'NNP', 'VBZ', 'JJ'],
            'When registering ngrams, corresponding PoS tags should be applied');

        test.done();
    };

    exports[pkg.mode + ' mode  - Test ngram lexicon complex PoS tagging'] = function(test){
        test.deepEqual(compendium.analyse('united states of america')[0].tags, ['NNP', 'NNPS', 'IN', 'NNP'],
            'When registering ngrams, corresponding PoS tags should be applied');

        test.done();
    };

});
