
var next = require('../dist/next-nlp.minimal.js');



exports.acronym = function(test){
    var expected = true,
        analysis = next.analyse('This is the I.C.U.'),
        actual = analysis[0].tokens[3].is_acronym;

    test.equal(actual, expected);


    test.done();
};