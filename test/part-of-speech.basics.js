
var next = require('../build/next-nlp.minimal.js');

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

    test.deepEqual(actual, expected);
    test.done();
};

exports.testWouldLack = function(test) {
    var expected = [
            ('PRP MD VB DT NNS').split(' ')
        ],
        analysis = next.analyse('I would lack some skills'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports.testYourLack = function(test) {
    var expected = [
            ('PRP$ NN IN NNS').split(' ')
        ],
        analysis = next.analyse('Your lack of skills'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports.testYouLack = function(test) {
    var expected = [
            ('PRP VBP NNS').split(' ')
        ],
        analysis = next.analyse('You lack skills'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports.testGonna = function(test) {
    var expected = [
            ('PRP MD TO VB RP').split(' ')
        ],
        analysis = next.analyse('I gonna give up'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports.testWont = function(test) {
    var expected = [
            ('PRP MD RB VB RP').split(' ')
        ],
        analysis = next.analyse('I won\'t give up'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports.testWillContraction = function(test) {
    var expected = [
            ('PRP MD VB RP').split(' ')
        ],
        analysis = next.analyse('I\'ll give up'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports.testWill = function(test) {
    var expected = [
            ('PRP MD VB RP').split(' ')
        ],
        analysis = next.analyse('I will give up'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports.testIsContraction = function(test) {
    var expected = [
            ('PRP VBZ JJ').split(' ')
        ],
        analysis = next.analyse('It\'s good'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};