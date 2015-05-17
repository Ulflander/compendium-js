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


// Should be foreign because of confidence === 0 and more than 2 tokens
exports['fdsfj nlsflsdfndj lsdfjn'] = function(test){
    var analysis = compendium.analyse('fdsfj nlsflsdfndj lsdfjn');

    test.notEqual(analysis[0].profile.types.indexOf('foreign'), -1);
    test.done();
};

// URLs, hashtags... should not account as foreign
exports['#Canon http://u.mavrev.com/5a3t'] = function(test){
    var analysis = compendium.analyse('#Canon http://u.mavrev.com/5a3t');

    test.equal(analysis[0].profile.types.indexOf('foreign'), -1);
    test.done();
};
// A sentence with one foreign word but good confidence 
// in PoS tagging should not account as foreign
exports['I hate aig and their non loan given asses.'] = function(test){
    var analysis = compendium.analyse('I hate aig and their non loan given asses.');

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

// All the following should pass because of:
// - WP, WP$, WRB as first token
// - no breakpoint
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
};
// thanks to dependency analysis,
// `why` being left dependency of master `are`
// it should be interrogative
exports['but why are you'] = function(test) {
    var analysis = compendium.analyse('but why are you');
    test.notEqual(analysis[0].profile.types.indexOf('interrogative'), -1);
    test.done();
};
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
// Thanks to dependency parsing, `do` should be governor,
// leading to consider sentence as imperative
exports['do something'] = function(test) {    
    var analysis = compendium.analyse('do something');
    test.notEqual(analysis[0].profile.types.indexOf('imperative'), -1);
    test.done();
}
exports['yeah!!!!'] = function(test) {
    var analysis = compendium.analyse('yeah!!!!');
    test.notEqual(analysis[0].profile.types.indexOf('exclamatory'), -1);
    test.done();
}
// Following should fail because of a breakpoint and no "?"
exports['When in Rome, do as the Romans.'] = function(test) {
    var analysis = compendium.analyse('When in Rome, do as the Romans.');
    test.equal(analysis[0].profile.types.indexOf('interrogative'), -1);
    test.done();
}

