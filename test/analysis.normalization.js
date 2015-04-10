
var compendium = require('../build/compendium.minimal.js');



exports['This is the I.C.U.'] = function(test){
    var expected = 'this',
        analysis = compendium.analyse('This is the I.C.U.'),
        actual = analysis[0].tokens[0].norm;

    test.equal(actual, expected);
    test.done();
};
