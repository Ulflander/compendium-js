var compendium = require('../dist/compendium.minimal.js');

// These tests ensure that the transition to multilingual mode works.

exports['Check that sentiment detector is run if not skipped'] = function(test) {
    var analysis = compendium.analyse('I\'m Xav and i\'m very very unhappy', null, [])[0];

    test.equal(analysis.entities.length, 1);
    test.done();
};
exports['Check that sentiment detector can be skipped'] = function(test) {
    var analysis = compendium.analyse('I\'m Xav and i\'m very very unhappy', null, ['entities'])[0];

    test.equal(analysis.profile.label, 'negative');
    test.equal(analysis.entities.length, 0);
    test.done();
};
exports['Check that sentiment and entities detectors can be skipped'] = function(test) {
    var analysis = compendium.analyse('I\'m Xav and i\'m very very unhappy', 'fr', ['sentiment', 'entities'])[0];

    test.equal(analysis.profile.label, 'neutral');
    test.equal(analysis.entities.length, 0);
    test.done();
};