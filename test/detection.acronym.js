
var compendium = require('../dist/compendium.minimal.js');



exports['This is the I.C.U.'] = function(test){
    var expected = true,
        analysis = compendium.analyse('This is the I.C.U.'),
        actual = analysis[0].tokens[3].is_acronym;

    test.equal(actual, expected);
    test.done();
};

exports['I\'m from the U.S., this is a great country'] = function(test){
    var expected = true,
        analysis = compendium.analyse('I\'m from the U.S., this is a great country'),
        actual = analysis[0].tokens[4].is_acronym;

    test.equal(actual, expected);
    test.done();
};

exports['I work at HSBC'] = function(test){
    var expected = false,
        analysis = compendium.analyse('I work at HSBC'),
        actual = analysis[0].tokens[3].is_acronym;

    test.equal(actual, expected);
    test.done();
};
