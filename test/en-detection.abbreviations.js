

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {

        var compendium = require(pkg.path);

    exports[pkg.mode + ' mode  - Hello Mr. Hide.'] = function(test){
        var analysis = compendium.analyse('Hello Mr. Hide.');

        test.equal(analysis[0].tokens[1].attr.abbr, true);
        test.equal(analysis[0].tokens[3].attr.abbr, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - This is september 2014'] = function(test){
        var analysis = compendium.analyse('This is september');

        test.equal(analysis[0].tokens[2].attr.abbr, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - This is September. 2014'] = function(test){
        var analysis = compendium.analyse('This is September.');

        test.equal(analysis[0].tokens[2].attr.abbr, false);
        test.done();
    };

    exports[pkg.mode + ' mode  - This is Sept. 2014'] = function(test){
        var analysis = compendium.analyse('This is Sept. 2014');

        test.equal(analysis[0].tokens[2].attr.abbr, true);
        test.done();
    };

    exports[pkg.mode + ' mode  - I live in wisconsin. and I love it'] = function(test){
        var analysis = compendium.analyse('I live in wisconsin. and I love it');

        test.equal(analysis[0].tokens[3].attr.abbr, false);
        test.done();
    };
    exports[pkg.mode + ' mode  - I live in wisc. and I love it'] = function(test){
        var analysis = compendium.analyse('I live in wisc. and I love it');

        test.equal(analysis[0].tokens[3].attr.abbr, true);
        test.done();
    };
});
