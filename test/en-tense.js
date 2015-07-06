
var compendium = require('../dist/compendium.minimal.js');


exports['I\'m good'] = function(test) {
    var analysis = compendium.analyse('I\'m good')[0];
    test.equal(analysis.profile.main_tense, 'present');
    test.done();
};
exports['I was good'] = function(test) {
    var analysis = compendium.analyse('I was good')[0];
    test.equal(analysis.profile.main_tense, 'past');
    test.done();
};
exports['It will be good'] = function(test) {
    var analysis = compendium.analyse('It will be good')[0];
    test.equal(analysis.profile.main_tense, 'future');
    test.done();
};
// exports['It\'s been good'] = function(test) {
//     var analysis = compendium.analyse('It\'s been good')[0];
//     test.equal(analysis.profile.main_tense, 'past');
//     test.done();
// };