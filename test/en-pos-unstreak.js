var compendium = require('../dist/compendium.minimal.js');

exports['gooood'] = function(test) {
    var analysis = compendium.analyse('gooood')[0];
    test.deepEqual(['JJ'], analysis.tags);
    test.deepEqual('good', analysis.tokens[0].norm);
    test.deepEqual('gooood', analysis.tokens[0].raw);
    test.deepEqual(['JJ'], compendium.analyse('goooooooood')[0].tags);
    test.done();
};
exports['nooooooo'] = function(test) {
    var analysis = compendium.analyse('noo')[0];

    test.deepEqual(['RB'], analysis.tags);
    test.deepEqual('no', analysis.tokens[0].norm);
    test.deepEqual('noo', analysis.tokens[0].raw);
    test.deepEqual(['RB'], compendium.analyse('nooo')[0].tags);
    test.deepEqual(['RB'], compendium.analyse('noooo')[0].tags);
    test.deepEqual(['RB'], compendium.analyse('nooooo')[0].tags);
    test.done();
};