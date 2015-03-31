// Test that in minimal mode,
// plural nouns (that are expunged from the lexicon) 
// are solved using the inflector

var next = require('../dist/next-nlp.minimal.js');

exports.variousPlurals = function(test) {
    var expected = [
            ('PRP$ NNS VBP NNS IN NNS .').split(' ')
        ],
        analysis = next.analyse('My heroes are criteria for people.'),
        actual = [
            analysis[0].tags
        ];

    test.deepEqual(actual, expected);
    test.done();
};
