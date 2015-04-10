// Test that in minimal mode,
// plural nouns (that are expunged from the lexicon) 
// are solved using the inflector

var compendium = require('../dist/compendium.minimal.js');

exports['My heroes are criteria for people.'] = function(test) {
    var expected = [
            ('PRP$ NNS VBP NNS IN NNS .').split(' ')
        ],
        analysis = compendium.analyse('My heroes are criteria for people.'),
        actual = [
            analysis[0].tags
        ];

    test.deepEqual(actual, expected);
    test.done();
};
