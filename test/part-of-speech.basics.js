
var next = require('../dist/next-nlp.minimal.js');

// Comparative PoS result have been generated using the Stanford PoS tagger,
// via http://textanalysisonline.com/nltk-stanford-postagger

exports.partOfSpeech = function(test) {
    var expected = [
            ('PRP VBZ NNS IN DT NN .').split(' '),
            ('DT NNS PRP VBZ VBP JJ NNS .').split(' ')
        ],
        analysis = next.analyse('She sells seashells by the seashore. the shells she sells are sure seashells.'),
        actual = [
            analysis[0].tags,
            analysis[1].tags
        ];

    test.deepEqual(actual, expected);
    test.done();
};

exports.testNumeric = function(test) {
    var expected = [
            ('CD CD CC CD CD').split(' ')
        ],
        analysis = next.analyse('two hundred and fifty five'),
        actual = [analysis[0].tags];

    //test.deepEqual(actual, expected);
    test.done();
};