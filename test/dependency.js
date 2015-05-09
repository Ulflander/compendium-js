
var compendium = require('../dist/compendium.minimal.js');

exports['The quick brown fox jumps over the lazy dog.'] = function(test) {
    var analysis = compendium.analyse('The quick brown fox jumps over the lazy dog.')[0];

    test.equals(analysis.tokens[4].deps.governor, null, '`jumps` should be root');
    test.equals(analysis.tokens[3].deps.governor, 4, '`Fox` should have `jumps` as governor');
    test.equals(analysis.tokens[2].deps.governor, 3, '`brown` should have `fox` as governor');
    test.equals(analysis.tokens[1].deps.governor, 3, '`quick` should have `fox` as governor');
    test.equals(analysis.tokens[0].deps.governor, 3, 'Initial `the` should have `fox` as governor');
    test.equals(analysis.tokens[7].deps.governor, 8, '`lazy` should have `dog` as governor');
    test.equals(analysis.tokens[6].deps.governor, 8, 'Second `the` should have `dog` as governor');
    // test.equals(analysis.tokens[8].deps.governor, 5, '`dog` should have `over` as governor');
    test.equals(analysis.tokens[5].deps.governor, 4, '`over` should have `jumps` as governor');
    // test.equals(analysis.tokens[9].deps.governor, 4, '`.` should have `jumps` as governor');
    test.done();
};