

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {

    var compendium = require(pkg.path);

    exports[pkg.mode + ' mode  - The quick brown fox jumps over the lazy dog.'] = function(test) {
        var analysis = compendium.analyse('The quick brown fox jumps over the lazy dog.')[0];

        test.equal(analysis.governor, 4, 'Sentence governor should be `jumps`');
        test.equal(analysis.tokens[4].deps.master, null, '`jumps` should be governor');
        test.equal(analysis.tokens[4].deps.governor, true, '`jumps` should be governor');
        test.deepEqual(analysis.tokens[4].deps.dependencies, [3, 5, 9], '`jumps` should have `fox`, `over` and `.` as direct dependencies');

        test.equal(analysis.tokens[3].deps.master, 4, '`Fox` should have `jumps` as master');
        test.equal(analysis.tokens[3].deps.type, 'subj', '`Fox` should be subject');
        test.notEqual(analysis.deps.subjects.indexOf(3), -1, '`Fox` should be in the subjects array');

        test.equal(analysis.tokens[1].deps.master, 3, '`quick` should have `fox` as master');
        test.equal(analysis.tokens[1].deps.type, 'amod', '`quick` should be an `amod`: adjectival modifier');

        test.equal(analysis.tokens[2].deps.master, 3, '`brown` should have `fox` as master');
        test.equal(analysis.tokens[2].deps.type, 'amod', '`brown` should be an `amod`: adjectival modifier');

        test.equal(analysis.tokens[0].deps.master, 3, 'Initial `the` should have `fox` as master');

        test.equal(analysis.tokens[7].deps.master, 8, '`lazy` should have `dog` as master');
        test.equal(analysis.tokens[7].deps.type, 'amod', '`lazy` should be an `amod`: adjectival modifier');

        test.equal(analysis.tokens[6].deps.master, 8, 'Second `the` should have `dog` as master');

        test.equal(analysis.tokens[8].deps.master, 5, '`dog` should have `over` as master');
        test.equal(analysis.tokens[8].deps.type, 'obj', '`dog` should be object');
        test.notEqual(analysis.deps.objects.indexOf(8), -1, '`dog` should be in the objects array');

        test.equal(analysis.tokens[5].deps.master, 4, '`over` should have `jumps` as master');

        test.equal(analysis.tokens[9].deps.master, 4, '`.` should have `jumps` as master');
        test.done();
    };

    exports[pkg.mode + ' mode  - do you know Eliza?'] = function(test) {
        var analysis = compendium.analyse('do you know Eliza?')[0];

        test.equal(analysis.governor, 2, 'Sentence governor should be `know`');
        test.equal(analysis.tokens[2].deps.master, null, '`know` should be governor');
        test.equal(analysis.tokens[2].deps.governor, true, '`know` should be governor');
        test.done();
    };

    exports[pkg.mode + ' mode  - don\'t you know Eliza?'] = function(test) {
        var analysis = compendium.analyse('don\'t you know Eliza?')[0];

        test.equal(analysis.governor, 3, 'Sentence governor should be `know`');
        test.equal(analysis.tokens[3].deps.master, null, '`know` should be governor');
        test.equal(analysis.tokens[3].deps.governor, true, '`know` should be governor');
        test.done();
    };


    exports[pkg.mode + ' mode  - go'] = function(test) {
        var analysis = compendium.analyse('go')[0];

        test.equal(analysis.governor, 0, 'Sentence governor should be `go`');
        test.equal(analysis.tokens[0].deps.master, null, '`go` should be governor');
        test.equal(analysis.tokens[0].deps.governor, true, '`go` should be governor');
        test.done();
    };

    exports[pkg.mode + ' mode  - well why'] = function(test) {
        var analysis = compendium.analyse('well why')[0];

        test.equal(analysis.governor, 1, 'Sentence governor should be `why`');
        test.equal(analysis.tokens[1].deps.master, null, '`why` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`why` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`why` should be master of `well`');
        test.done();
    };


    exports[pkg.mode + ' mode  - hell no'] = function(test) {
        var analysis = compendium.analyse('hell no')[0];

        test.equal(analysis.governor, 0, 'Sentence governor should be `hell`');
        test.equal(analysis.tokens[0].deps.master, null, '`hell` should be governor');
        test.equal(analysis.tokens[0].deps.governor, true, '`hell` should be governor');
        test.equal(analysis.tokens[1].deps.master, 0, '`hell` should be master of `no`');
        test.done();
    };

    exports[pkg.mode + ' mode  - do something'] = function(test) {
        var analysis = compendium.analyse('do something')[0];

        test.equal(analysis.governor, 0, 'Sentence governor should be `do`');
        test.equal(analysis.tokens[0].deps.master, null, '`do` should be governor');
        test.equal(analysis.tokens[0].deps.governor, true, '`do` should be governor');
        test.equal(analysis.tokens[1].deps.master, 0, '`do` should be master of `something`');
        test.done();
    };
    exports[pkg.mode + ' mode  - this is something'] = function(test) {
        var analysis = compendium.analyse('this is something')[0];

        test.equal(analysis.governor, 1, 'Sentence governor should be `is`');
        test.equal(analysis.tokens[1].deps.master, null, '`is` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`is` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`this` should have `is` as master');
        test.equal(analysis.tokens[0].deps.type, 'subj', '`this` should be subject of `is`');
        test.equal(analysis.tokens[2].deps.master, 1, '`something` should have `is` as master');
        test.done();
    };

    exports[pkg.mode + ' mode  - I love you'] = function(test) {
        var analysis = compendium.analyse('I love you')[0];

        test.equal(analysis.governor, 1, 'Sentence governor should be `love`');
        test.equal(analysis.tokens[1].deps.master, null, '`love` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`love` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`I` should have `love` as master');
        test.equal(analysis.tokens[0].deps.type, 'subj', '`I` should be subject of `love`');
        test.equal(analysis.tokens[2].deps.master, 1, '`you` should have `love` as master');
        test.equal(analysis.tokens[2].deps.type, 'obj', '`you` should be object of `love`');
        test.done();
    };

    exports[pkg.mode + ' mode  - She looks very beautiful'] = function(test) {
        var analysis = compendium.analyse('She looks very beautiful')[0];

        test.equal(analysis.governor, 1, 'Sentence governor should be `looks`');
        test.equal(analysis.tokens[1].deps.master, null, '`looks` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`looks` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`She` should have `looks` as master');
        test.equal(analysis.tokens[0].deps.type, 'subj', '`She` should be subject of `looks`');
        test.equal(analysis.tokens[2].deps.master, 3, '`very` should have `beautiful` as master');
        test.equal(analysis.tokens[3].deps.master, 1, '`beautiful` should have `looks` as master');
        test.done();
    };


    exports[pkg.mode + ' mode  - I changed my mind'] = function(test) {
        var analysis = compendium.analyse('I changed my mind')[0];

        test.equal(analysis.governor, 1, 'Sentence governor should be `changed`');
        test.equal(analysis.tokens[1].deps.master, null, '`changed` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`changed` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`I` should have `changed` as master');
        test.equal(analysis.tokens[0].deps.type, 'subj', '`I` should be subject of `changed`');
        test.equal(analysis.tokens[2].deps.master, 3, '`my` should have `mind` as master');
        test.equal(analysis.tokens[2].deps.type, 'poss', '`my` should be `poss` of `mind`');
        test.equal(analysis.tokens[3].deps.master, 1, '`mind` should have `changed` as master');
        test.done();
    };

    exports[pkg.mode + ' mode  - Genetically modified food'] = function(test) {
        var analysis = compendium.analyse('Genetically modified food')[0];
        test.equal(analysis.governor, 2, 'Sentence governor should be `food`');
        test.equal(analysis.tokens[2].deps.master, null, '`food` should be governor');
        test.equal(analysis.tokens[2].deps.governor, true, '`food` should be governor');
        test.equal(analysis.tokens[1].deps.master, 2, '`food` should be master of `modified`');
        test.equal(analysis.tokens[0].deps.master, 1, '`modified` should be master of `Genetically`');

        test.done();
    };

    exports[pkg.mode + ' mode  - where is the trick'] = function(test) {
        var analysis = compendium.analyse('where is the trick')[0];
        test.equal(analysis.governor, 1, 'Sentence governor should be `is`');
        test.equal(analysis.tokens[1].deps.master, null, '`is` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`is` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`where` should have `is` as master');
        test.equal(analysis.tokens[0].deps.type, 'attr', '`where` should be `attr`');
        test.equal(analysis.tokens[2].deps.master, 3, '`the` should have `trick` as master');
        test.equal(analysis.tokens[3].deps.master, 1, '`trick` should have `is` as master');

        test.done();
    };

    exports[pkg.mode + ' mode  - but where is the trick'] = function(test) {
        var analysis = compendium.analyse('but where is the trick')[0];
        test.equal(analysis.governor, 2, 'Sentence governor should be `is`');
        test.equal(analysis.tokens[2].deps.master, null, '`is` should be governor');
        test.equal(analysis.tokens[2].deps.governor, true, '`is` should be governor');
        test.equal(analysis.tokens[0].deps.master, 2, '`but` should have `is` as master');
        test.equal(analysis.tokens[1].deps.master, 2, '`where` should have `is` as master');
        test.equal(analysis.tokens[1].deps.type, 'attr', '`where` should be `attr`');
        test.equal(analysis.tokens[3].deps.master, 4, '`the` should have `trick` as master');
        test.equal(analysis.tokens[4].deps.master, 2, '`trick` should have `is` as master');

        test.done();
    };

    exports[pkg.mode + ' mode  - this is a good day'] = function(test) {
        var analysis = compendium.analyse('this is a good day')[0];
        test.equal(analysis.governor, 1, 'Sentence governor should be `is`');
        test.equal(analysis.tokens[1].deps.master, null, '`is` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`is` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`this` should have `is` as master');
        test.equal(analysis.tokens[2].deps.master, 4, '`a` should have `day` as master');
        test.equal(analysis.tokens[3].deps.master, 4, '`good` should have `day` as master');
        test.equal(analysis.tokens[4].deps.master, 1, '`day` should have `is` as master');

        test.done();
    };



    exports[pkg.mode + ' mode  - this is a really good day'] = function(test) {
        var analysis = compendium.analyse('this is a really good day')[0];
        test.equal(analysis.governor, 1, 'Sentence governor should be `is`');
        test.equal(analysis.tokens[1].deps.master, null, '`is` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`is` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`this` should have `is` as master');
        test.equal(analysis.tokens[2].deps.master, 5, '`a` should have `day` as master');
        test.equal(analysis.tokens[3].deps.master, 4, '`really` should have `good` as master');
        test.equal(analysis.tokens[4].deps.master, 5, '`good` should have `day` as master');
        test.equal(analysis.tokens[5].deps.master, 1, '`day` should have `is` as master');

        test.done();
    };



    exports[pkg.mode + ' mode  - this is a really really good day'] = function(test) {
        var analysis = compendium.analyse('this is a really really good day')[0];
        test.equal(analysis.governor, 1, 'Sentence governor should be `is`');
        test.equal(analysis.tokens[1].deps.master, null, '`is` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`is` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`this` should have `is` as master');
        test.equal(analysis.tokens[2].deps.master, 6, '`a` should have `day` as master');
        test.equal(analysis.tokens[3].deps.master, 5, '`really` should have `good` as master');
        test.equal(analysis.tokens[4].deps.master, 5, '`really` should have `good` as master');
        test.equal(analysis.tokens[5].deps.master, 6, '`good` should have `day` as master');
        test.equal(analysis.tokens[6].deps.master, 1, '`day` should have `is` as master');

        test.done();
    };


    exports[pkg.mode + ' mode  - this is a really, really good day'] = function(test) {
        var analysis = compendium.analyse('this is a really, really good day')[0];
        test.equal(analysis.governor, 1, 'Sentence governor should be `is`');
        test.equal(analysis.tokens[1].deps.master, null, '`is` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`is` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`this` should have `is` as master');
        test.equal(analysis.tokens[2].deps.master, 7, '`a` should have `day` as master');
        test.equal(analysis.tokens[3].deps.master, 6, '`really` should have `good` as master');
        test.equal(analysis.tokens[4].deps.master, 1, '`,` should have `is` as master');
        test.equal(analysis.tokens[5].deps.master, 6, '`really` should have `good` as master');
        test.equal(analysis.tokens[6].deps.master, 7, '`good` should have `day` as master');
        test.equal(analysis.tokens[7].deps.master, 1, '`day` should have `is` as master');

        test.done();
    };

    exports[pkg.mode + ' mode  - this is a good and awesome day'] = function(test) {
        var analysis = compendium.analyse('this is a good and awesome day')[0];

        test.equal(analysis.governor, 1, 'Sentence governor should be `is`');
        test.equal(analysis.tokens[1].deps.master, null, '`is` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`is` should be governor');
        test.equal(analysis.tokens[0].deps.master, 1, '`this` should have `is` as master');
        test.equal(analysis.tokens[2].deps.master, 6, '`a` should have `day` as master');
        test.equal(analysis.tokens[3].deps.master, 6, '`good` should have `day` as master');
        test.equal(analysis.tokens[4].deps.master, 3, '`and` should have `good` as master');
        test.equal(analysis.tokens[5].deps.master, 6, '`awesome` should have `day` as master');
        test.equal(analysis.tokens[6].deps.master, 1, '`day` should have `is` as master');

        test.done();
    };


    exports[pkg.mode + ' mode  - this is a really good, freaking awesome day'] = function(test) {
        var analysis = compendium.analyse('this is a really good, freaking awesome day')[0];

        test.equal(analysis.governor, 1, 'Sentence governor should be `is`');
        test.equal(analysis.tokens[1].deps.master, null, '`is` should be governor');
        test.equal(analysis.tokens[1].deps.governor, true, '`is` should be governor');

        test.equal(analysis.tokens[0].deps.master, 1, '`this` should have `is` as master');

        test.equal(analysis.tokens[2].deps.master, 8, '`a` should have `day` as master');
        test.equal(analysis.tokens[3].deps.master, 4, '`really` should have `good` as master');
        test.equal(analysis.tokens[4].deps.master, 8, '`good` should have `day` as master');

        // Here is an ambiguous one
        // Freaking is so far in this context tagged as JJ
        // JJ is a direct dependency of NN so day is master.
        // One could argue that freaking is, in this precise example, a dependency of
        // awesome. This corner case is not yet handled by Compendium.
        test.equal(analysis.tokens[6].deps.master, 8, '`freaking` should have `day` as master');

        test.equal(analysis.tokens[7].deps.master, 8, '`awesome` should have `day` as master');
        test.equal(analysis.tokens[8].deps.master, 1, '`day` should have `is` as master');

        test.done();
    };
})
