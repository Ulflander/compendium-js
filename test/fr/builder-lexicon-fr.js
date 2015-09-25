
// The following tests validates that the lexicon builder works.


[{mode:'Build', path: '../../src/build/lexicon-fr.js'}].forEach(function(pkg) {
    var Builder = require(pkg.path);


    exports[pkg.mode + ' mode  - Lexicon builder checks'] = function(test){
        test.equal(!!Builder.getFullCompiled(), true, 'Full lexicon canno\'t be empty');
        test.equal(!!Builder.getMinimalCompiled(), true, 'Full lexicon canno\'t be empty');
        test.done();
    };
});
