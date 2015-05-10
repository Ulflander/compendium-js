
var compendium = require('../dist/compendium.minimal.js');

exports['The quick brown fox jumps over the lazy dog.'] = function(test) {
    var analysis = compendium.analyse('The quick brown fox jumps over the lazy dog.')[0];

    test.equals(analysis.governor, 4, 'Sentence governor should be `jumps`');
    test.equals(analysis.tokens[4].deps.master, null, '`jumps` should be governor');
    test.equals(analysis.tokens[4].deps.governor, true, '`jumps` should be governor');
    test.equals(analysis.tokens[3].deps.master, 4, '`Fox` should have `jumps` as master');
    test.equals(analysis.tokens[3].deps.type, 'subj', '`Fox` should be subject');
    test.equals(analysis.tokens[1].deps.master, 3, '`quick` should have `fox` as master');
    test.equals(analysis.tokens[1].deps.type, 'amod', '`quick` should be an `amod`: adjectival modifier');
    test.equals(analysis.tokens[2].deps.master, 3, '`brown` should have `fox` as master');
    test.equals(analysis.tokens[2].deps.type, 'amod', '`brown` should be an `amod`: adjectival modifier');
    test.equals(analysis.tokens[0].deps.master, 3, 'Initial `the` should have `fox` as master');
    test.equals(analysis.tokens[7].deps.master, 8, '`lazy` should have `dog` as master');
    test.equals(analysis.tokens[7].deps.type, 'amod', '`lazy` should be an `amod`: adjectival modifier');
    test.equals(analysis.tokens[6].deps.master, 8, 'Second `the` should have `dog` as master');
    test.equals(analysis.tokens[8].deps.master, 5, '`dog` should have `over` as master');
    test.equals(analysis.tokens[8].deps.type, 'obj', '`dog` should be object');
    test.equals(analysis.tokens[5].deps.master, 4, '`over` should have `jumps` as master');
    test.equals(analysis.tokens[9].deps.master, 4, '`.` should have `jumps` as master');
    test.done();
};


exports['I love you'] = function(test) {
    var analysis = compendium.analyse('I love you')[0];

    test.equals(analysis.governor, 1, 'Sentence governor should be `love`');
    test.equals(analysis.tokens[1].deps.master, null, '`love` should be governor');
    test.equals(analysis.tokens[1].deps.governor, true, '`love` should be governor');
    test.equals(analysis.tokens[0].deps.master, 1, '`I` should have `love` as master');
    test.equals(analysis.tokens[0].deps.type, 'subj', '`I` should be subject of `love`');
    test.equals(analysis.tokens[2].deps.master, 1, '`you` should have `love` as master');
    test.equals(analysis.tokens[2].deps.type, 'obj', '`you` should be object of `love`');
    test.done();
};

exports['She looks very beautiful'] = function(test) {
    var analysis = compendium.analyse('She looks very beautiful')[0];

    test.equals(analysis.governor, 1, 'Sentence governor should be `looks`');
    test.equals(analysis.tokens[1].deps.master, null, '`looks` should be governor');
    test.equals(analysis.tokens[1].deps.governor, true, '`looks` should be governor');
    test.equals(analysis.tokens[0].deps.master, 1, '`She` should have `looks` as master');
    test.equals(analysis.tokens[0].deps.type, 'subj', '`She` should be subject of `looks`');
    test.equals(analysis.tokens[2].deps.master, 3, '`very` should have `beautiful` as master');
    test.equals(analysis.tokens[3].deps.master, 1, '`beautiful` should have `looks` as master');
    test.done();
};







