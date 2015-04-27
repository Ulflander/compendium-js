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

// URLs, hashtags... should not account as foreign
exports['#Canon http://u.mavrev.com/5a3t'] = function(test){
    var analysis = compendium.analyse('#Canon http://u.mavrev.com/5a3t');

    test.equal(analysis[0].profile.types.indexOf('foreign'), -1);
    test.done();
};

exports['Hello world.'] = function(test){
    var analysis = compendium.analyse('Hello world.');

    test.equal(analysis[0].profile.types.indexOf('foreign'), -1);
    test.done();
};

// Should be headline
exports['NVIDIA Names Stanford\'s Bill Dally Chief Scientist, VP Of Research http://bit.ly/Fvvg9'] = function(test){
    var analysis = compendium.analyse('NVIDIA Names Stanford\'s Bill Dally Chief Scientist, VP Of Research http://bit.ly/Fvvg9');

    test.notEqual(analysis[0].profile.types.indexOf('headline'), -1);
    test.done();
};


exports['Who am I? (variations)'] = function(test) {
    var analysis = compendium.analyse('who am i');
    test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1);
    var analysis = compendium.analyse('who am i?');
    test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1);
    var analysis = compendium.analyse('Who I am?');
    test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1);
    test.done();
};
