
var compendium = require('../dist/compendium.minimal.js');



exports['I\'m John, I\'m happy'] = function(test){
    var analysis = compendium.analyse('I\'m John, I\'m happy');

    test.equal(analysis[0].tokens[3].is_breakpoint, true);
    test.done();
};


exports['I\'m John but I\'m not happy'] = function(test){
    var analysis = compendium.analyse('I\'m John but I\'m not happy');

    test.equal(analysis[0].tokens[3].is_breakpoint, true);
    test.done();
};


exports['I\'m happy but not today'] = function(test){
    var analysis = compendium.analyse('I\'m John but I\'m not happy');

    test.equal(analysis[0].tokens[3].is_breakpoint, false);
    test.done();
};



