
var compendium = require('../dist/compendium.minimal.js');



exports['This is the I.C.U.'] = function(test){
    var expected = false,
        analysis = compendium.analyse('This is the I.C.U.'),
        actual = analysis[0].has_negation;

    test.equal(actual, expected);
    test.done();
};

exports['This is not the I.C.U.'] = function(test){
    var expected = true,
        analysis = compendium.analyse('This is not the I.C.U.'),
        actual = analysis[0].has_negation;

    test.equal(actual, expected);
    test.done();
};

exports['I shouldn\'t work, I should rest'] = function(test){
    var analysis = compendium.analyse('I shouldn\'t work, I should rest');
    test.equal(analysis[0].has_negation, true);
    test.equal(analysis[0].tokens[2].is_negated, true);
    test.equal(analysis[0].tokens[3].is_negated, true);
    test.equal(analysis[0].tokens[4].is_negated, false);
    test.equal(analysis[0].tokens[7].is_negated, false);
    test.done();
};

exports['I shouldn\'t solely work, I should hard work'] = function(test){
    var expected = false,
        analysis = compendium.analyse('I shouldn\'t solely work, I should hard work'),
        actual = analysis[0].has_negation;

    test.equal(actual, expected);
    test.done();
};

exports['I\'m not happy'] = function(test){
    var expected = true,
        analysis = compendium.analyse('I\'m not happy'),
        actual = analysis[0].has_negation;

    test.equal(actual, expected);
    test.equal(analysis[0].tokens[0].is_negated, false);
    test.equal(analysis[0].tokens[1].is_negated, false);
    test.equal(analysis[0].tokens[2].is_negated, true);
    test.equal(analysis[0].tokens[3].is_negated, true);
    test.done();
};


exports['I\'m really not happy'] = function(test){
    var expected = true,
        analysis = compendium.analyse('I\'m really not happy'),
        actual = analysis[0].has_negation;

    test.equal(actual, expected);
    test.done();
};

exports['I\'m not just happy, I\’m amazed'] = function(test){
    var expected = false,
        analysis = compendium.analyse('I\'m not just happy, I\’m amazed'),
        actual = analysis[0].has_negation;

    test.equal(analysis[0].tokens[4].is_negated, false);
    test.equal(analysis[0].tokens[2].is_negated, false);
    test.equal(actual, expected);
    test.done();
};
