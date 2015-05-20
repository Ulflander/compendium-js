

var compendium = require('../dist/compendium.minimal.js');

exports['im lowercased'] = function(test){
    var analysis = compendium.analyse('im lowercased');

    test.equal(analysis[0].stats.p_upper, 0);
    test.equal(analysis[0].stats.p_cap, 0);
    test.done();
};

exports['IM LOWERCASED'] = function(test){
    var analysis = compendium.analyse('IM LOWERCASED');

    test.equal(analysis[0].stats.p_upper, 100);
    test.done();
};

exports['Im Lowercased'] = function(test){
    var analysis = compendium.analyse('Im Lowercased');

    test.equal(Math.floor(analysis[0].stats.p_upper), 0);
    test.equal(analysis[0].stats.p_cap, 100);
    test.equal(analysis[0].stats.words, 2);
    test.done();
};
exports['je suis le monstre'] = function(test){
    var analysis = compendium.analyse('je suis le monstre');

    test.equal(analysis[0].stats.p_foreign, 50);
    test.equal(analysis[0].stats.avg_length, 3.75);
    test.done();
};
exports['When in Rome, do as the Romans.'] = function(test) {
    var analysis = compendium.analyse('When in Rome, do as the Romans.');

    test.equal(analysis[0].stats.breakpoints, 1);
    test.equal(analysis[0].stats.words, 7);
    test.equal(analysis[0].tokens[0].attr.is_punc, false);
    test.done();
};

exports['!!!'] = function(test) {
    var analysis = compendium.analyse('!!!');
    test.equal(analysis[0].stats.words, 0);
    test.equal(analysis[0].tokens[0].attr.is_punc, true);
    test.done();
};

exports[':)'] = function(test) {
    var analysis = compendium.analyse(':)');
    test.equal(analysis[0].stats.words, 0);
    test.equal(analysis[0].tokens[0].attr.is_punc, false);
    test.done();
};