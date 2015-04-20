
var compendium = require('../dist/compendium.minimal.js');



exports['This is the I.C.U.'] = function(test){
    var expected = false,
        analysis = compendium.analyse('This is the I.C.U.'),
        actual = analysis[0].profile.negated;

    test.equal(actual, expected);
    test.done();
};

exports['This is not the I.C.U.'] = function(test){
    var expected = true,
        analysis = compendium.analyse('This is not the I.C.U.'),
        actual = analysis[0].profile.negated;

    test.equal(actual, expected);
    test.done();
};

exports['I shouldn\'t work, I should rest'] = function(test){
    var analysis = compendium.analyse('I shouldn\'t work, I should rest');
    test.equal(analysis[0].profile.negated, true);
    test.equal(analysis[0].tokens[2].profile.negated, true);
    test.equal(analysis[0].tokens[3].profile.negated, true);
    test.equal(analysis[0].tokens[4].profile.negated, false);
    test.equal(analysis[0].tokens[7].profile.negated, false);
    test.done();
};

exports['I can\'t say you are not dumb'] = function(test){
    var analysis = compendium.analyse('I can\'t say you are not dumb');
    test.equal(analysis[0].tokens[7].profile.negated, false);
    test.done();
};

exports['I shouldn\'t solely work, I should hard work'] = function(test){
    var expected = false,
        analysis = compendium.analyse('I shouldn\'t solely work, I should hard work'),
        actual = analysis[0].profile.negated;

    test.equal(actual, expected);
    test.done();
};

exports['I\'m not happy'] = function(test){
    var expected = true,
        analysis = compendium.analyse('I\'m not happy'),
        actual = analysis[0].profile.negated;

    test.equal(actual, expected);
    test.equal(analysis[0].tokens[0].profile.negated, false);
    test.equal(analysis[0].tokens[1].profile.negated, false);
    test.equal(analysis[0].tokens[2].profile.negated, true);
    test.equal(analysis[0].tokens[3].profile.negated, true);
    test.done();
};


exports['I\'m really not happy'] = function(test){
    var expected = true,
        analysis = compendium.analyse('I\'m really not happy'),
        actual = analysis[0].profile.negated;

    test.equal(actual, expected);
    test.done();
};

exports['I\'m not just happy, I\’m amazed'] = function(test){
    var expected = false,
        analysis = compendium.analyse('I\'m not just happy, I\’m amazed'),
        actual = analysis[0].profile.negated;

    test.equal(analysis[0].tokens[4].profile.negated, false);
    test.equal(analysis[0].tokens[2].profile.negated, false);
    test.equal(actual, expected);
    test.done();
};
