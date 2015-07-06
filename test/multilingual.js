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