

[{mode: 'Minimal', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium-fr.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),
        lexer = compendium.lexer;


    exports['je suis pas content.'] = function(test){
        var analysis = compendium.analyse('Je suis pas content.')[0];
        test.equal(analysis.tokens[3].profile.negated, true, "Content should be negated");
        test.equal(analysis.tokens[0].profile.negated, false, "je should not be negated");
        test.done();
    };

    exports['je fais quelques pas ce matin.'] = function(test){
        var analysis = compendium.analyse('je fais quelques pas ce matin')[0];
        test.equal(analysis.tokens[5].profile.negated, false, "matin should not be negated");
        test.equal(analysis.tokens[0].profile.negated, false, "je should not be negated");
        test.done();
    };

});
