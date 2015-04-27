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

// URLs, hashtags... should not account as foreign
exports['jQuery UI 1.6 Book Review - http://cfbloggers.org/?c=30631'] = function(test){
    var analysis = compendium.analyse('jQuery UI 1.6 Book Review - http://cfbloggers.org/?c=30631');

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


exports['where am i'] = function(test) {
    var analysis = compendium.analyse('where am i');
    test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1);
    test.done();
}
exports['when is this'] = function(test) {    
    var analysis = compendium.analyse('when is this');
    test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1);
    test.done();
}
exports['who is he'] = function(test) {    
    var analysis = compendium.analyse('who is he');
    test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1);
    test.done();
}
exports['why so'] = function(test) {    
    var analysis = compendium.analyse('why so');
    test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1);
    test.done();
}
exports['what the fuck'] = function(test) {    
    var analysis = compendium.analyse('what the fuck');
    test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1);
    test.done();
}
exports['whose one'] = function(test) {    
    var analysis = compendium.analyse('whose one');
    test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1);
    test.done();
}
exports['yeah!!!!'] = function(test) {
    var analysis = compendium.analyse('yeah!!!!');
    test.notEqual(analysis[0].profile.types.indexOf('exclamatory'), -1);
    test.done();
}
