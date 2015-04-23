var compendium = require('../dist/compendium.minimal.js');

// Should be foreign because of low confidence
exports['La terminal norte es para los vuelos internacionales.'] = function(test){
    var analysis = compendium.analyse('La terminal norte es para los vuelos internacionales.');

    test.notEqual(analysis[0].profile.types.indexOf('foreign'), -1);
    test.done();
};

// Should be foreign because percentage of foreign words
exports['Je suis un garçon'] = function(test){
    var analysis = compendium.analyse('Je suis un garçon');

    test.notEqual(analysis[0].profile.types.indexOf('foreign'), -1);
    test.done();
};

// Should not be foreign
exports['Hello world.'] = function(test){
    var analysis = compendium.analyse('Hello world.');

    test.equal(analysis[0].profile.types.indexOf('foreign'), -1);
    test.done();
};