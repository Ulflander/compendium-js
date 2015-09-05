

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - Negative numbers like -12 are numbers too'] = function(test) {
        var analysis = compendium.analyse('Negative numbers like -12 are numbers too');
        test.equal(analysis[0].tokens[3].attr.value, -12);
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are 5 bucks'] = function(test) {
        var analysis = compendium.analyse('Here are 5 bucks');
        test.equal(analysis[0].tokens[2].attr.value, 5);
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are five bucks'] = function(test) {
        var analysis = compendium.analyse('Here are five bucks');
        test.equal(analysis[0].tokens[2].attr.value, 5);
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are 5.27 bucks'] = function(test) {
        var analysis = compendium.analyse('Here are 5.27 bucks');
        test.equal(analysis[0].tokens[2].attr.value, 5.27);
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are 5,270 bucks'] = function(test) {
        var analysis = compendium.analyse('Here are 5,270 bucks');
        test.equal(analysis[0].tokens[2].attr.value, 5270);
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are 5,270,970.87 bucks'] = function(test) {
        var analysis = compendium.analyse('Here are 5,270,970.87 bucks');
        test.equal(analysis[0].tokens[2].attr.value, 5270970.87);
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are one million bucks'] = function(test) {
        var analysis = compendium.analyse('Here are one million');
        test.equal(analysis[0].tokens[2].attr.value, 1000000);
        test.equal(analysis[0].tokens[3].attr.value, 1000000);
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are two millions bucks'] = function(test) {
        var analysis = compendium.analyse('Here are two millions');
        test.equal(analysis[0].tokens[2].attr.value, 2000000);
        test.equal(analysis[0].tokens[3].attr.value, 2000000);
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are 2 millions bucks'] = function(test) {
        var analysis = compendium.analyse('Here are 2 millions');
        test.equal(analysis[0].tokens[2].attr.value, 2000000);
        test.equal(analysis[0].tokens[3].attr.value, 2000000);
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are 3.5 hundred bucks'] = function(test) {
        var analysis = compendium.analyse('Here are 3.5 hundred');
        test.equal(analysis[0].tokens[2].attr.value, 350);
        test.equal(analysis[0].tokens[3].attr.value, 350);
        test.done();
    };
    exports[pkg.mode + ' mode  - Here is one hundred thousand bucks'] = function(test) {
        var analysis = compendium.analyse('Here is one hundred thousand bucks');
        test.equal(analysis[0].tokens[2].attr.value, 100000);
        test.equal(analysis[0].tokens[3].attr.value, 100000);
        test.equal(analysis[0].tokens[4].attr.value, 100000);
        test.done();
    };
})
