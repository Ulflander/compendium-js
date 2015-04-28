
var compendium = require('../dist/compendium.minimal.js');

exports['Joe Carter went to the Toronto International Film Festival to go see Inception.'] = function(test) {
    var expectedPoS = [
            ('NNP NNP VBD TO DT NNP NNP NNP NNP TO VB VB NNP .').split(' ')
        ],
        analysis = compendium.analyse('Joe Carter went to the Toronto International Film Festival to go see Inception.');

    // Check tokenization + PoS
    test.equal(analysis[0].length, 14);
    test.deepEqual([analysis[0].tags], expectedPoS);
    
    // Check token flags
    test.equal(analysis[0].tokens[1].attr.verb, false);
    test.equal(analysis[0].tokens[2].attr.verb, true);

    // Check profiling
    test.equal(analysis[0].profile.negated, false);
    test.equal(analysis[0].profile.label, 'neutral');
    test.equal(analysis[0].profile.politeness, 0);
    test.equal(analysis[0].profile.dirtiness, 0);
    
    // Check entity details
    test.equal(analysis[0].entities.length, 3);
    test.equal(analysis[0].entities[0].raw, 'Joe Carter');
    test.equal(analysis[0].entities[0].fromIndex, 0);
    test.equal(analysis[0].entities[0].toIndex, 1);
    test.equal(analysis[0].tokens[0].attr.entity,  0);
    test.equal(analysis[0].tokens[1].attr.entity,  0);

    test.equal(analysis[0].entities[1].raw, 'Toronto International Film Festival');
    test.equal(analysis[0].entities[1].fromIndex, 5);
    test.equal(analysis[0].entities[1].toIndex, 8);
    test.equal(analysis[0].tokens[5].attr.entity, 1);
    test.equal(analysis[0].tokens[6].attr.entity,  1);
    test.equal(analysis[0].tokens[7].attr.entity,  1);
    test.equal(analysis[0].tokens[8].attr.entity, 1);

    test.equal(analysis[0].entities[2].raw, 'Inception');
    test.equal(analysis[0].entities[2].fromIndex, 12);
    test.equal(analysis[0].entities[2].toIndex, 12);
    test.equal(analysis[0].tokens[12].attr.entity, 2);
    test.done();
};