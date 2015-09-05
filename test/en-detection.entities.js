

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - My invalid IP is 2222.22.22.999'] = function(test) {
        var analysis = compendium.analyse('My invalid IP is 2222.22.22.999');

        test.equal(analysis[0].tokens[4].attr.entity, -1);
        test.done();
    };

    exports[pkg.mode + ' mode  - My invalid IP is 222.22.22.199'] = function(test) {
        var analysis = compendium.analyse('My invalid IP is 222.22.22.199');

        test.notEqual(analysis[0].tokens[4].attr.entity, -1);
        test.done();
    };

    exports[pkg.mode + ' mode  - My email is example@example.com'] = function(test) {
        var analysis = compendium.analyse('My email is example@example.com');

        test.notEqual(analysis[0].tokens[3].attr.entity, -1);
        test.equal(analysis[0].entities[0].norm, 'example@example.com');
        test.equal(analysis[0].entities[0].type, 'email');
        test.done();
    };

    exports[pkg.mode + ' mode  - My email is example@example'] = function(test) {
        var analysis = compendium.analyse('My email is example@example');

        test.equal(analysis[0].tokens[3].attr.entity, -1);
        test.equal(analysis[0].entities[0], undefined);
        test.done();
    };

    exports[pkg.mode + ' mode  - Jean-Claud Van Damme or Steven Segal'] = function(test) {
        var analysis = compendium.analyse('Jean-Claud Van Damme or Steven Segal');

        test.notEqual(analysis[0].tokens[0].attr.entity, -1);
        test.equals(analysis[0].tokens[3].attr.entity, -1);
        test.notEqual(analysis[0].tokens[4].attr.entity, -1);
        test.notEqual(analysis[0].tokens[0].attr.entity, analysis[0].tokens[4].attr.entity);
        test.done();
    };
    exports[pkg.mode + ' mode  - Jean Van Damme or Steven Segal'] = function(test) {
        var analysis = compendium.analyse('Jean Van Damme or Steven Segal');

        test.notEqual(analysis[0].tokens[0].attr.entity, -1);
        test.equals(analysis[0].tokens[3].attr.entity, -1);
        test.notEqual(analysis[0].tokens[4].attr.entity, -1);
        test.notEqual(analysis[0].tokens[0].attr.entity, analysis[0].tokens[4].attr.entity);
        test.done();
    };

    exports[pkg.mode + ' mode  - The machines are coming for your job @zeynep @nytimes http://www.nytimes.com/2015/04/19/opinion/sunday/the-machines-are-coming.html?ref=opinion&_r=0… #RiseoftheRobots'] = function(test){
        var analysis = compendium.analyse('The machines are coming for your job @zeynep @nytimes http://www.nytimes.com/2015/04/19/opinion/sunday/the-machines-are-coming.html?ref=opinion&_r=0… #RiseoftheRobots');

        test.equal(analysis[0].tokens[7].attr.entity, 0);
        test.equal(analysis[0].tokens[8].attr.entity, 1);
        test.equal(analysis[0].tokens[9].attr.entity, 2);
        test.equal(analysis[1].tokens[0].attr.entity, 0);
        test.done();
    };
});
