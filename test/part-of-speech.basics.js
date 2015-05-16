
var compendium = require('../dist/compendium.minimal.js');

// Comparative PoS result have been generated using the Stanford PoS tagger,
// via http://nlp.stanford.edu:8080/parser/index.jsp
// and in some case verified (and, rarely, fixed) using this other, purely machine learning based tagger:
// http://nlpdotnet.com/services/Tagger.aspx
// 
exports['None of the money was missing'] = function(test) {
    test.deepEqual(['NN', 'IN', 'DT', 'NN', 'VBD', 'VBG'], compendium.analyse('None of the money was missing')[0].tags);
    test.done();
};
exports['I am saudi'] = function(test) {
    test.deepEqual(['PRP', 'VBP', 'JJ'], compendium.analyse('I am saudi')[0].tags);
    test.done();
};


// *eed tokens should not be VBN
// TO try should be VB
exports['The most certain way to succeed is always to try just one more time.'] = function(test) {
    test.notEqual('VBN', compendium.analyse('The most certain way to succeed is always to try just one more time.')[0].tags[5]);
    test.deepEqual(['DT', 'RBS', 'JJ', 'NN', 'TO', 'VB', 'VBZ', 'RB', 'TO', 'VB', 'RB', 'CD', 'JJR', 'NN', '.'], compendium.analyse('The most certain way to succeed is always to try just one more time.')[0].tags);
    test.done();
};

exports['sh*t was hilarious...LMAO!!!'] = function(test) {
    test.deepEqual(['NN', 'VBD', 'JJ', '.', 'UH', '.'], compendium.analyse('sh*t was hilarious...LMAO!!!')[0].tags);
    test.done();
};

exports['She sells seashells by the seashore. the shells she sells are sure seashells.'] = function(test) {
    var expected = [
            ('PRP VBZ NNS IN DT NN .').split(' '),
            ('DT NNS PRP VBZ VBP JJ NNS .').split(' ')
        ],
        analysis = compendium.analyse('She sells seashells by the seashore. the shells she sells are sure seashells.'),
        actual = [
            analysis[0].tags,
            analysis[1].tags
        ];

    test.deepEqual(actual, expected);
    test.done();
};
exports['The quick brown fox jumps over the lazy dog.'] = function(test) {
    var expected = [
            ('DT JJ JJ NN VBZ IN DT JJ NN .').split(' ')
        ],
        analysis = compendium.analyse('The quick brown fox jumps over the lazy dog.'),
        actual = [
            analysis[0].tags
        ];

    test.deepEqual(actual, expected);
    test.done();
};

exports['A form of asbestos once used to make Kent cigarette filters has caused a high percentage of cancer deaths among a group of workers exposed to it more than 30 years ago, researchers reported.'] = function(test) {
    var expected = [
            ('DT NN IN NN RB VBN TO VB NNP NN NNS VBZ VBN DT JJ NN IN NN NNS IN DT NN IN NNS VBN TO PRP JJR IN CD NNS IN , NNS VBD .').split(' ')
        ],
        analysis = compendium.analyse('A form of asbestos once used to make Kent cigarette filters has caused a high percentage of cancer deaths among a group of workers exposed to it more than 30 years ago, researchers reported.'),
        actual = [
            analysis[0].tags
        ];

    test.deepEqual(actual, expected);
    test.done();
};


exports['2 -1'] = function(test) {
    var expected = [
            ('CD CD').split(' ')
        ],
        analysis = compendium.analyse('2 -1'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};


exports['300,000 copies'] = function(test) {
    var expected = [
            ('CD NNS').split(' ')
        ],
        analysis = compendium.analyse('300,000 copies'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};


exports['two hundred and fifty five'] = function(test) {
    var expected = [
            ('CD CD CC CD CD').split(' ')
        ],
        analysis = compendium.analyse('two hundred and fifty five'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};


exports['Feeling kind of low...'] = function(test) {
    var analysis = compendium.analyse('Feeling kind of low...');
    test.deepEqual([analysis[0].tags], [('VBG RB IN JJ .').split(' ')]);
    test.done();
};

exports['happy!!!!!!'] = function(test) {
    var analysis = compendium.analyse('happy !!!!!!');
    test.deepEqual([analysis[0].tags], [('JJ .').split(' ')]);
    test.done();
};

exports['Hey :))))'] = function(test) {
    var analysis = compendium.analyse('Hey :))))');
    test.deepEqual([analysis[0].tags], [('UH EM').split(' ')]);
    test.done();
};

exports['Hey :]]]]'] = function(test) {
    var analysis = compendium.analyse('Hey :]]]]');
    test.deepEqual([analysis[0].tags], [('UH EM').split(' ')]);
    test.done()
};

exports['😋'] = function(test) {
    var analysis = compendium.analyse('😋');
    test.deepEqual([analysis[0].tags], [('EM').split(' ')]);
    test.done();
};

exports['happy 😋 !!!!!!'] = function(test) {
    var analysis = compendium.analyse('happy 😋 !!!!!!');
    test.deepEqual([analysis[0].tags], [('JJ EM .').split(' ')]);
    test.done();
};

exports['It\'s psychedelic.'] = function(test) {
    var analysis = compendium.analyse('It\'s psychedelic.');
    test.deepEqual([analysis[0].tags], [('PRP VBZ JJ .').split(' ')]);
    test.done();
};

exports['It\'s funkadelic.'] = function(test) {
    var analysis = compendium.analyse('It\'s funkadelic.');
    test.deepEqual([analysis[0].tags], [('PRP VBZ JJ .').split(' ')]);
    test.done();
};

exports['I like you'] = function(test) {
    var expected = [
            ('PRP VBP PRP').split(' ')
        ],
        analysis = compendium.analyse('I like you'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['He likes you'] = function(test) {
    var analysis = compendium.analyse('He likes you');
    test.deepEqual([analysis[0].tags], [('PRP VBZ PRP').split(' ')]);
    test.done();
};
exports['She likes you'] = function(test) {
    var analysis = compendium.analyse('She likes you');
    test.deepEqual([analysis[0].tags], [('PRP VBZ PRP').split(' ')]);
    test.done();
};

exports['We like you'] = function(test) {
    var analysis = compendium.analyse('We like you');
    test.deepEqual([analysis[0].tags], [('PRP VBP PRP').split(' ')]);
    test.done();
};
exports['They like you'] = function(test) {
    var analysis = compendium.analyse('They like you');
    test.deepEqual([analysis[0].tags], [('PRP VBP PRP').split(' ')]);
    test.done();
};


exports['Mark Johns Jr., (sen. Al.)'] = function(test) {
    var analysis = compendium.analyse('Mark Johns Jr., (sen. Al.)');
    test.deepEqual([analysis[0].tags], [('NNP NNP NNP , ( NN NNP )').split(' ')]);
    test.done();
};

exports['I would lack some skills'] = function(test) {
    var expected = [
            ('PRP MD VB DT NNS').split(' ')
        ],
        analysis = compendium.analyse('I would lack some skills'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['Your lack of skills'] = function(test) {
    var expected = [
            ('PRP$ NN IN NNS').split(' ')
        ],
        analysis = compendium.analyse('Your lack of skills'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['You lack skills'] = function(test) {
    var expected = [
            ('PRP VBP NNS').split(' ')
        ],
        analysis = compendium.analyse('You lack skills'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['I gonna give up'] = function(test) {
    var expected = [
            ('PRP MD TO VB RP').split(' ')
        ],
        analysis = compendium.analyse('I gonna give up'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['I won\'t give up'] = function(test) {
    var expected = [
            ('PRP MD RB VB RP').split(' ')
        ],
        analysis = compendium.analyse('I won\'t give up'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['I\'ll give up'] = function(test) {
    var expected = [
            ('PRP MD VB RP').split(' ')
        ],
        analysis = compendium.analyse('I\'ll give up'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['It will be good'] = function(test) {
    var expected = [
            ('PRP MD VB JJ').split(' ')
        ],
        analysis = compendium.analyse('It will be good'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['Sleepin, rollin, adrenalin, domain'] = function(test) {
    var expected = [
            ('VBG , VBG , NN , NN').split(' ')
        ],
        analysis = compendium.analyse('Sleepin, rollin, adrenalin, domain'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['I will give up'] = function(test) {
    var expected = [
            ('PRP MD VB RP').split(' ')
        ],
        analysis = compendium.analyse('I will give up'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['It\'s good!!!'] = function(test) {
    var expected = [
            ('PRP VBZ JJ .').split(' ')
        ],
        analysis = compendium.analyse('It\'s good!!!'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['This is a great day, I\'ll buy two bottles of beer'] = function(test) {
    var expected = [
            ('DT VBZ DT JJ NN , PRP MD VB CD NNS IN NN').split(' ')
        ],
        analysis = compendium.analyse('This is a great day, I\'ll buy two bottles of beer'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['The bridge has been damaged'] = function(test) {
    var expected = [
            ('DT NN VBZ VBN VBN').split(' ')
        ],
        analysis = compendium.analyse('The bridge has been damaged'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['Show me a trick'] = function(test) {
    var expected = [
            ('VB PRP DT NN').split(' ')
        ],
        analysis = compendium.analyse('Show me a trick'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};
exports['store is closed'] = function(test) {
    var expected = [
            ('NN VBZ JJ').split(' ')
        ],
        analysis = compendium.analyse('store is closed'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['stores are closed'] = function(test) {
    var expected = [
            ('NNS VBP JJ').split(' ')
        ],
        analysis = compendium.analyse('stores are closed'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports[':-)'] = function(test) {
    var expected = [
            ('EM').split(' ')
        ],
        analysis = compendium.analyse(':-)'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

exports['This is why Mike is an awesome guy'] = function(test) {
    var expected = [
            ('DT VBZ WRB NNP VBZ DT JJ NN').split(' ')
        ],
        analysis = compendium.analyse('This is why Mike is an awesome guy'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};
exports['Pierre Vinken, 61 years old, will join the board as a nonexecutive director Nov. 29.'] = function(test) {
    var expected = [
            ('NNP NNP , CD NNS JJ , MD VB DT NN IN DT JJ NN NNP CD .').split(' ')
        ],
        analysis = compendium.analyse('Pierre Vinken, 61 years old, will join the board as a nonexecutive director Nov. 29.'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};

// 'em is synonym of them, should be PRP
exports['If you can\'t beat \'em, join \'em.'] = function(test) {
    var expected = [
            ('IN PRP MD RB VB PRP , VB PRP .').split(' ')
        ],
        analysis = compendium.analyse('If you can\'t beat \'em, join \'em.'),
        actual = [analysis[0].tags];

    test.deepEqual(actual, expected);
    test.done();
};


