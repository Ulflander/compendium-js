
var compendium = require('../build/compendium.minimal.js');



exports['This is the I.C.U.'] = function(test){
    var analysis = compendium.analyse('This is the I.C.U.');

    test.equal(analysis[0].tokens[0].norm, 'this');
    test.done();
};


exports['Meeting is on Sep. 26th'] = function(test){
    var analysis = compendium.analyse('Meeting is on Sep. 26th');

    test.equal(analysis[0].tokens[3].norm, 'september');
    test.done();
};
