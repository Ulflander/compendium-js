

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path);


    exports[pkg.mode + ' mode  - yes 😋'] = function(test){
        var analysis = compendium.analyse('yes 😋');

        test.equal(analysis[0].profile.label, 'positive');
        test.done();
    };
    exports[pkg.mode + ' mode  - It should fail'] = function(test) {
        var analysis = compendium.analyse('It should fail');
        test.notEqual(analysis[0].tokens[2].profile.sentiment, 0);
        test.done();
    };

    exports[pkg.mode + ' mode  - yes 😟'] = function(test){
        var analysis = compendium.analyse('yes 😟');

        test.equal(analysis[0].profile.label, 'negative');
        test.done();
    };

    exports[pkg.mode + ' mode  - Eating eggplant. Why bother?'] = function(test) {
        var analysis = compendium.analyse('Eating eggplant. Why bother?');

        test.equal(analysis[0].profile.label, 'neutral');
        test.done();
    };

    // Bug fix test: satisfied is in sentiment lexicon, should have
    // positive token score
    exports[pkg.mode + ' mode  - I am very satisfied.'] = function(test) {
        var analysis = compendium.analyse('I am very satisfied.');

        test.notEqual(analysis[0].tokens[3].profile.sentiment, 0, '"satisfied" should have a positive score as it is part of sentiment lexicon');
        test.done();
    };

    // Love is positive, but negated
    // However it's a question. Should be neutral
    exports[pkg.mode + ' mode  - how can you not love Obama?'] = function(test) {
        var analysis = compendium.analyse('how can you not love Obama?');

        test.equal(analysis[0].profile.label, 'neutral');
        test.done();
    };

    exports[pkg.mode + ' mode  - Fuck yeah'] = function(test) {
        var analysis = compendium.analyse('Fuck yeah');

        test.equal(analysis[0].profile.politeness, 0);
        test.notEqual(analysis[0].profile.dirtiness, 0);
        test.done();
    };

    // Amplitude bigger than sentiment, should be mixed
    exports[pkg.mode + ' mode  - pretty crazy movie..'] = function(test) {
        var analysis = compendium.analyse('pretty crazy movie..');

        test.equal(analysis[0].profile.label, 'mixed');
        test.done();
    };

    exports[pkg.mode + ' mode  - Yes please'] = function(test) {
        var analysis = compendium.analyse('Yes please');

        test.notEqual(analysis[0].profile.politeness, 0);
        test.equal(analysis[0].profile.dirtiness, 0);
        test.done();
    };

    exports[pkg.mode + ' mode  - "I like that" vs "It\'s like that".'] = function(test) {
        var a1 = compendium.analyse('I like that'),
            a2 = compendium.analyse('It\'s like that');

        test.equal(a1[0].profile.label, 'positive');
        test.equal(a2[0].profile.label, 'neutral');
        test.done();
    };
    exports[pkg.mode + ' mode  - I\'m happy.'] = function(test) {
        var analysis = compendium.analyse('I\'m happy.');

        test.equal(analysis[0].profile.label, 'positive');
        test.done();
    };


    exports[pkg.mode + ' mode  - "I\'m happy." vs "I\'m happy!" vs "I\'m happy!!!!"'] = function(test) {
        var a1 = compendium.analyse('I\'m happy.'),
            a2 = compendium.analyse('I\'m happy!'),
            a3 = compendium.analyse('I\'m happy!!!!');

        test.ok(a1[0].profile.sentiment < a2[0].profile.sentiment, '1 vs 2');
        test.ok(a1[0].profile.sentiment < a3[0].profile.sentiment, '1 vs 3');
        test.ok(a2[0].profile.sentiment < a3[0].profile.sentiment, '2 vs 3');
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m not sad.'] = function(test) {
        var analysis = compendium.analyse('I\'m not sad.');

        test.notEqual(analysis[0].profile.label, 'negative');
        test.done();
    };


    exports[pkg.mode + ' mode  - I\'m sad.'] = function(test) {
        var analysis = compendium.analyse('I\'m sad.');

        test.equal(analysis[0].profile.label, 'negative');
        test.done();
    };

    exports[pkg.mode + ' mode  - "I hate you" vs "I really hate you"'] = function(test) {
        var a1 = compendium.analyse('I hate you'),
            a2 = compendium.analyse('I really hate you');

        test.ok(a1[0].profile.sentiment > a2[0].profile.sentiment, '"I really hate you" should have a lower score than "I hate you"');
        test.done();
    };

    exports[pkg.mode + ' mode  - "I love you" vs "I really love you"'] = function(test) {
        var a1 = compendium.analyse('I love you'),
            a2 = compendium.analyse('I really love you');

        test.ok(a1[0].profile.sentiment < a2[0].profile.sentiment, '"I really love you" should have a lower score than "I love you"');
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m not happy.'] = function(test) {
        var analysis = compendium.analyse('I\'m not happy.');

        test.equal(analysis[0].profile.label, 'negative');
        test.done();
    };
    exports[pkg.mode + ' mode  - Feeling kind of low...'] = function(test) {
        var analysis = compendium.analyse('Feeling kind of low...');

        test.equal(analysis[0].profile.label, 'negative');
        test.done();
    };
    exports[pkg.mode + ' mode  - Not feeling kind of low...'] = function(test) {
        var analysis = compendium.analyse('Not feeling kind of low...');

        test.notEqual(analysis[0].profile.label, 'positive');
        test.done();
    };
    exports[pkg.mode + ' mode  - OMG, just had a fabulous day!'] = function(test) {
        var analysis = compendium.analyse('OMG, just had a fabulous day!');

        test.equal(analysis[0].profile.label, 'positive');
        test.done();
    };
});
