
var compendium = require('../dist/compendium.minimal.js');

exports['yes 😋'] = function(test){
    var analysis = compendium.analyse('yes 😋');

    test.equal(analysis[0].profile.label, 'positive');
    test.done();
};

exports['yes 😟'] = function(test){
    var analysis = compendium.analyse('yes 😟');

    test.equal(analysis[0].profile.label, 'negative');
    test.done();
};

exports['Eating eggplant. Why bother?'] = function(test) {
    var analysis = compendium.analyse('Eating eggplant. Why bother?');

    test.equal(analysis[0].profile.label, 'neutral');
    test.done();
};

exports['I\'m happy.'] = function(test) {
    var analysis = compendium.analyse('I\'m happy.');

    test.equal(analysis[0].profile.label, 'positive');
    test.done();
};


exports['"I\'m happy." vs "I\'m happy!" vs "I\'m happy!!!!"'] = function(test) {
    var a1 = compendium.analyse('I\'m happy.'),
        a2 = compendium.analyse('I\'m happy!'),
        a3 = compendium.analyse('I\'m happy!!!!');

    test.ok(a1[0].profile.sentiment < a2[0].profile.sentiment, '1 vs 2');
    test.ok(a1[0].profile.sentiment < a3[0].profile.sentiment, '1 vs 3');
    test.ok(a2[0].profile.sentiment < a3[0].profile.sentiment, '2 vs 3');
    test.done();
};

exports['I\'m not sad.'] = function(test) {
    var analysis = compendium.analyse('I\'m not sad.');

    test.notEqual(analysis[0].profile.label, 'negative');
    test.done();
};

exports['I\'m sad.'] = function(test) {
    var analysis = compendium.analyse('I\'m sad.');

    test.equal(analysis[0].profile.label, 'negative');
    test.done();
};

exports['I\'m not happy.'] = function(test) {
    var analysis = compendium.analyse('I\'m not happy.');

    test.equal(analysis[0].profile.label, 'negative');
    test.done();
};
exports['Feeling kind of low...'] = function(test) {
    var analysis = compendium.analyse('Feeling kind of low...');

    test.equal(analysis[0].profile.label, 'negative');
    test.done();
};
exports['Not feeling kind of low...'] = function(test) {
    var analysis = compendium.analyse('Not feeling kind of low...');

    test.notEqual(analysis[0].profile.label, 'positive');
    test.done();
};
exports['OMG, just had a fabulous day!'] = function(test) {
    var analysis = compendium.analyse('OMG, just had a fabulous day!');

    test.equal(analysis[0].profile.label, 'positive');
    test.done();
};