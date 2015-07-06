
var compendium = require('../dist/compendium.minimal.js');



exports['I\'m John, I\'m happy'] = function(test){
    var analysis = compendium.analyse('I\'m John, I\'m happy');

    test.equal(analysis[0].tokens[3].profile.breakpoint, true);
    test.done();
};

exports['I\'m John: I\'m happy'] = function(test){
    var analysis = compendium.analyse('I\'m John: I\'m happy');

    test.equal(analysis[0].tokens[3].profile.breakpoint, true);
    test.done();
};

exports['I\'m John; I\'m happy'] = function(test){
    var analysis = compendium.analyse('I\'m John; I\'m happy');

    test.equal(analysis[0].tokens[3].profile.breakpoint, true);
    test.done();
};
