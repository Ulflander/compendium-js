var compendium = require('../dist/compendium.minimal.js');

exports['Filter *ed verbs'] = function(test){
    var expected = true,
        analysis = compendium.analyse('This is the I.C.U.'),
        actual = analysis[0].tokens[3].is_acronym;

    test.equal(compendium.lexicon.hasOwnProperty('entered'), false);
    test.done();
};