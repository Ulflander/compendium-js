var compendium = require('../dist/compendium.minimal.js');

// These tests ensure that the transition to multilingual mode works.

exports['Check that default language is english'] = function(test) {
    var analysis = compendium.analyse('Check that default language is english')[0];

    test.equal(analysis.language, 'en');
    test.done();
};

exports['Check that french language can be called'] = function(test) {
    var analysis = compendium.analyse('Ceci est un texte en français.', 'fr')[0];

    test.equal(analysis.language, 'fr');
    test.done();
};

exports['Check that analysis supports "constructor" for english language'] = function(test) {
    var analysis = compendium.analyse('I\'m a constructor.', 'en')[0];

    test.equal(analysis.language, 'en');
    test.done();
};

exports['Check that analysis supports "constructor" for french language'] = function(test) {
    var analysis = compendium.analyse('Je suis un super bon constructor.', 'fr')[0];
    test.equal(analysis.language, 'fr');
    test.done();
};

exports['Check that analysis supports "prototype" for english language'] = function(test) {
    var analysis = compendium.analyse('A constructor is not a prototype.', 'en')[0];

    test.equal(analysis.language, 'en');
    test.done();
};
