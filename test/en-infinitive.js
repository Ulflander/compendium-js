
// A bug was found where full lexicon version (i.e. Node.js version)
// discard the inifinitives when building lexicon.
// This tests ensure it stays fixed.
var compendium = require('../dist/compendium.js');

exports['This is good'] = function(test) {
    var analysis = compendium.analyse('This is good')[0];
    test.equal(analysis.tokens[1].attr.infinitive, 'be');
    test.equal(analysis.tokens[1].attr.tense, 'present');
    test.done();
};

exports['tell me a joke'] = function(test) {
    var analysis = compendium.analyse('tell me a joke')[0];
    test.equal(analysis.tokens[0].attr.infinitive, 'tell');
    test.equal(analysis.tokens[0].attr.tense, 'present');
    test.done();
};


exports['he told me a joke'] = function(test) {
    var analysis = compendium.analyse('he told me a joke')[0];
    test.equal(analysis.tokens[1].attr.infinitive, 'tell');
    test.equal(analysis.tokens[1].attr.tense, 'past');
    test.done();
};

exports['it was good'] = function(test) {
    var analysis = compendium.analyse('it was good')[0];
    test.equal(analysis.tokens[1].attr.infinitive, 'be');
    test.equal(analysis.tokens[1].attr.tense, 'past');
    test.done();
};
exports['you were good'] = function(test) {
    var analysis = compendium.analyse('you were good')[0];
    test.equal(analysis.tokens[1].attr.infinitive, 'be');
    test.equal(analysis.tokens[1].attr.tense, 'past');
    test.done();
};

exports['you are good'] = function(test) {
    var analysis = compendium.analyse('you are good')[0];
    test.equal(analysis.tokens[1].attr.infinitive, 'be');
    test.equal(analysis.tokens[1].attr.tense, 'present');
    test.done();
};

exports['you\'re good'] = function(test) {
    var analysis = compendium.analyse('you\'re good')[0];
    test.equal(analysis.tokens[1].attr.infinitive, 'be');
    test.equal(analysis.tokens[1].attr.tense, 'present');
    test.done();
};

exports['I\'m good'] = function(test) {
    var analysis = compendium.analyse('I\'m good')[0];
    test.equal(analysis.tokens[1].attr.infinitive, 'be');
    test.equal(analysis.tokens[1].attr.tense, 'present');
    test.done();
};

exports['I am good'] = function(test) {
    var analysis = compendium.analyse('I am good')[0];
    test.equal(analysis.tokens[1].attr.infinitive, 'be');
    test.equal(analysis.tokens[1].attr.tense, 'present');
    test.done();
};

exports['It\'s good'] = function(test) {
    var analysis = compendium.analyse('It\'s good')[0];
    test.equal(analysis.tokens[1].attr.infinitive, 'be');
    test.equal(analysis.tokens[1].attr.tense, 'present');
    test.done();
};
