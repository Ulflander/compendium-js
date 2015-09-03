
var compendium = require('../dist/compendium.minimal.js');

exports['Three millions'] = function(test){
    var analysis = compendium.analyse('Three millions');

    test.equal(analysis[0].tokens[1].attr.singular, 'million');
    test.done();
};
exports['One checkpoint'] = function(test){
    var analysis = compendium.analyse('One checkpoint');

    test.equal(analysis[0].tokens[1].attr.singular, 'checkpoint');
    test.done();
};
exports['One million'] = function(test){
    var analysis = compendium.analyse('One million');

    test.equal(analysis[0].tokens[1].attr.singular, 'million');
    test.done();
};