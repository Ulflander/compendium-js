var compendium = require('../../dist/compendium.minimal.js');

exports['Trie object should be available in Compendium'] = function(test) {
    test.notEqual(compendium.Trie, undefined, 'Trie constructor should be defined');
    test.done();
};

exports['Test basic trie use'] = function(test) {
    var trie = new compendium.Trie();

    trie.put('hello', {});
    test.equal(trie.has('hello'), true, 'When token "hello" is put in the trie then trie should have keep it')
    test.equal(trie.has('hell'), false, 'When token "hello" is put in the trie then trie should not have "hell"')
    test.equal(typeof trie.get('hello'), 'object', 'Trie get returns an object, not a string')

    test.done();
};

exports['Test trie use with meta'] = function(test) {
    var trie = new compendium.Trie(),
        meta = {pos: 'UH', sentiment: ''};

    trie.put('hello', meta);
    test.deepEqual(trie.get('hello'), meta, 'When token "hello" is put in the trie, then getting it should return meta')

    test.done();
};


exports['Test trie use with utf-8 char and meta'] = function(test) {
    var trie = new compendium.Trie(),
        meta = {pos: 'UH', sentiment: ''};

    trie.put('éé', meta);
    test.deepEqual(trie.get('éé'), meta, 'When token "éé" is put in the trie, then getting it should return meta')

    test.done();
};

exports['Test trie use with 😊  char and meta'] = function(test) {
    var trie = new compendium.Trie(),
        meta = {pos: 'UH', sentiment: ''};

    trie.put('😊', meta);
    test.deepEqual(trie.get('😊'), meta, 'When token "😊" is put in the trie, then getting it should return meta')

    test.done();
};
