
var compendium = require('../dist/compendium.minimal.js');

// Test smartquotes replacement + entity detection between quotes

exports['I just started using a package called \"Compendium\" and find that it works quite well.'] = function(test){
    var analysis = compendium.analyse('I just started using a package called \"Compendium\" and find that it works quite well.');

    test.equal(analysis[0].tokens[7].raw, '"');
    test.notEqual(analysis[0].tokens[8].attr.entity, -1);
    test.equal(analysis[0].tokens[9].raw, '"');
    test.done();
};

exports['I just started using a package called “Compendium” and find that it works quite well.'] = function(test){
    var analysis = compendium.analyse('I just started using a package called “Compendium” and find that it works quite well.');

    test.equal(analysis[0].tokens[7].raw, '"');
    test.notEqual(analysis[0].tokens[8].attr.entity, -1);
    test.equal(analysis[0].tokens[9].raw, '"');
    test.done();
};

exports['I just started using a package called ‘Compendium’ and find that it works quite well.'] = function(test){
    var analysis = compendium.analyse('I just started using a package called ‘Compendium’ and find that it works quite well.');

    test.equal(analysis[0].tokens[7].raw, "'");
    test.notEqual(analysis[0].tokens[8].attr.entity, -1);
    test.equal(analysis[0].tokens[9].raw, "'");
    test.done();
};
