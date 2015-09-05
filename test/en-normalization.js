

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - Nah, I dunno'] = function(test) {
        var analysis = compendium.analyse('Nah, I dunno');
        test.equal(analysis[0].tokens[0].norm, 'no');
        test.done();
    };

    exports[pkg.mode + ' mode  - This is the I.C.U.'] = function(test){
        var analysis = compendium.analyse('This is the I.C.U.');

        test.equal(analysis[0].tokens[0].norm, 'this');
        test.done();
    };

    exports[pkg.mode + ' mode  - Meeting is on Sep. 26th'] = function(test){
        var analysis = compendium.analyse('Meeting is on Sep. 26th');

        test.equal(analysis[0].tokens[3].norm, 'september');
        test.done();
    };

    exports[pkg.mode + ' mode  - Hello Mr. Hide.'] = function(test){
        var analysis = compendium.analyse('Hello Mr. Hide.');

        test.equal(analysis[0].tokens[1].norm, 'mister');
        test.done();
    };

    exports[pkg.mode + ' mode  - Mark Johns Jr., (sen. Ala.) against John Doe Sr. (atty. Wis.)'] = function(test){
        var analysis = compendium.analyse('Mark Johns Jr., (sen. Ala.) against John Doe Sr. (atty. Wis.)');

        test.equal(analysis[0].tokens[2].norm, 'junior');
        test.equal(analysis[0].tokens[5].norm, 'senator');
        test.equal(analysis[0].tokens[6].norm, 'alabama');
        test.equal(analysis[0].tokens[11].norm, 'senior');
        test.equal(analysis[0].tokens[13].norm, 'attorney');
        test.equal(analysis[0].tokens[14].norm, 'wisconsin');
        test.done();
    };


    exports[pkg.mode + ' mode  - Mark Johns Jr., (Sen. R-Ala.) against John Doe Sr. (Gov. D-Texas)'] = function(test){
        var analysis = compendium.analyse('Mark Johns Jr., (Sen. R-Ala.) against John Doe Sr. (Gov. D-Texas)');
        test.equal(analysis[0].tokens[6].norm, 'republican, alabama');
        test.equal(analysis[0].tokens[15].norm, 'democrat, texas');
        test.done();
    };

});
