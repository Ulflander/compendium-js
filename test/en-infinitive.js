
// A bug was found where full lexicon version (i.e. Node.js version)
// discard the inifinitives when building lexicon.
// This tests ensure it stays fixed.
var compendium = require('../dist/compendium.js');

exports['This is good'] = function(test) {
    var analysis = compendium.analyse('This is good')[0];
    test.equal(analysis.tokens[1].attr.infinitive, 'be');
    test.done();
};

exports['tell me a joke'] = function(test) {
    var analysis = compendium.analyse('tell me a joke')[0];
    test.equal(analysis.tokens[0].attr.infinitive, 'tell');
    test.done();
};
