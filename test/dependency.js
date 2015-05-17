
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


exports['do something'] = function(test) {
    var analysis = compendium.analyse('do something')[0];

    test.equals(analysis.governor, 0, 'Sentence governor should be `do`');
    test.equals(analysis.tokens[0].deps.master, null, '`do` should be governor');
    test.equals(analysis.tokens[0].deps.governor, true, '`do` should be governor');
    test.equals(analysis.tokens[1].deps.master, 0, '`do` should be master of `something`');
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


exports['I changed my mind'] = function(test) {
    var analysis = compendium.analyse('I changed my mind')[0];

    test.equals(analysis.governor, 1, 'Sentence governor should be `changed`');
    test.equals(analysis.tokens[1].deps.master, null, '`changed` should be governor');
    test.equals(analysis.tokens[1].deps.governor, true, '`changed` should be governor');
    test.equals(analysis.tokens[0].deps.master, 1, '`I` should have `changed` as master');
    test.equals(analysis.tokens[0].deps.type, 'subj', '`I` should be subject of `changed`');
    test.equals(analysis.tokens[2].deps.master, 3, '`my` should have `mind` as master');
    test.equals(analysis.tokens[2].deps.type, 'poss', '`my` should be `poss` of `mind`');
    test.equals(analysis.tokens[3].deps.master, 1, '`mind` should have `changed` as master');
    test.done();
};

exports['Genetically modified food'] = function(test) {
    var analysis = compendium.analyse('Genetically modified food')[0];
    test.equals(analysis.governor, 2, 'Sentence governor should be `food`');
    test.equals(analysis.tokens[2].deps.master, null, '`food` should be governor');
    test.equals(analysis.tokens[2].deps.governor, true, '`food` should be governor');
    test.equals(analysis.tokens[1].deps.master, 2, '`food` should be master of `modified`');
    test.equals(analysis.tokens[0].deps.master, 1, '`modified` should be master of `Genetically`');

    test.done();
};

exports['where is the trick'] = function(test) {
    var analysis = compendium.analyse('where is the trick')[0];
    test.equals(analysis.governor, 1, 'Sentence governor should be `is`');
    test.equals(analysis.tokens[1].deps.master, null, '`is` should be governor');
    test.equals(analysis.tokens[1].deps.governor, true, '`is` should be governor');
    test.equals(analysis.tokens[0].deps.master, 1, '`where` should have `is` as master');
    test.equals(analysis.tokens[0].deps.type, 'attr', '`where` should be `attr`');
    test.equals(analysis.tokens[2].deps.master, 3, '`the` should have `trick` as master');
    test.equals(analysis.tokens[3].deps.master, 1, '`trick` should have `is` as master');

    test.done();
};

exports['but where is the trick'] = function(test) {
    var analysis = compendium.analyse('but where is the trick')[0];
    test.equals(analysis.governor, 2, 'Sentence governor should be `is`');
    test.equals(analysis.tokens[2].deps.master, null, '`is` should be governor');
    test.equals(analysis.tokens[2].deps.governor, true, '`is` should be governor');
    test.equals(analysis.tokens[0].deps.master, 2, '`but` should have `is` as master');
    test.equals(analysis.tokens[1].deps.master, 2, '`where` should have `is` as master');
    test.equals(analysis.tokens[1].deps.type, 'attr', '`where` should be `attr`');
    test.equals(analysis.tokens[3].deps.master, 4, '`the` should have `trick` as master');
    test.equals(analysis.tokens[4].deps.master, 2, '`trick` should have `is` as master');

    test.done();
};






