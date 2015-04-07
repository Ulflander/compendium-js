
var next = require('../build/next-nlp.minimal.js');

exports['Joe Carter went to the Toronto International Film Festival to go see Inception.'] = function(test) {
    var expectedPoS = [
            ('NNP NNP VBD TO DT NNP NNP NNP NNP TO VB VB NNP .').split(' ')
        ],
        analysis = next.analyse('Joe Carter went to the Toronto International Film Festival to go see Inception.');

    test.deepEqual([analysis[0].tags], expectedPoS);
    test.equal(analysis[0].entities.length, 3);
    test.equal(analysis[0].entities[0].raw, 'Joe Carter');
    test.equal(analysis[0].entities[1].raw, 'Toronto International Film Festival');
    test.equal(analysis[0].entities[2].raw, 'Inception');
    test.equal(analysis[0].profiling.label, 'neutral');
    console.log(analysis);
    test.done();
};