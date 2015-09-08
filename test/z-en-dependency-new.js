

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {

    var compendium = require(pkg.path);

    exports[pkg.mode + ' mode  - Test new dependency toolkit object'] = function(test) {
        test.notEqual(compendium.parser, undefined, 'New "parser" object exists')
        test.equal(typeof compendium.parser.parse, 'function', 'New "parser.parse" function exists')
        test.done();
    };


    exports[pkg.mode + ' mode  - The quick brown fox jumps over the lazy dog.'] = function(test) {
        var analysis = compendium.analyse('The quick brown fox jumps over the lazy dog.')[0],
            root = analysis.root;

        test.equal(analysis.hasOwnProperty('root'), true, 'Parsing sentence property should exist');

        // test tree
        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'jumps', 'Sentence root should be `jumps`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'is');
        test.equal(root.left[0].type, 'NP', 'type');
        test.equal(root.left[0].raw, 'The quick brown fox', 'raw');

        test.equal(root.right[0].label, 'PREP', 'is');
        test.equal(root.right[0].type, 'PP', 'type');
        test.equal(root.right[0].raw, 'over', 'raw');

        test.equal(root.right[0].right[0].label, 'POBJ', 'is');
        test.equal(root.right[0].right[0].type, 'NP', 'type');
        test.equal(root.right[0].right[0].raw, 'the lazy dog', 'raw');

        test.done();
    };

    exports[pkg.mode + ' mode  - do you know Eliza?'] = function(test) {
        var analysis = compendium.analyse('do you know Eliza?')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'know', 'Sentence root should be `know`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[1].label, 'NSUBJ', 'Subject is');
        test.equal(root.left[1].type, 'NP', 'Subject type');
        test.equal(root.left[1].raw, 'you', 'Subject raw');

        test.equal(root.left[0].label, 'AUX', 'Aux is');
        test.equal(root.left[0].type, 'VB', 'Aux type');
        test.equal(root.left[0].raw, 'do', 'Aux raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj is');
        test.equal(root.right[0].type, 'NP', 'Dobj type');
        test.equal(root.right[0].raw, 'Eliza', 'Dobj raw');

        test.equal(root.right[1].label, 'PUNCT', '? is');
        test.equal(root.right[1].type, 'PUNCT', '? type');
        test.equal(root.right[1].raw, '?', '? raw');

        test.done();
    };

    exports[pkg.mode + ' mode  - don\'t you know Eliza?'] = function(test) {
        var analysis = compendium.analyse('don\'t you know Eliza?')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'know', 'Sentence root should be `know`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[1].label, 'NSUBJ', 'Subject is');
        test.equal(root.left[1].type, 'NP', 'Subject type');
        test.equal(root.left[1].raw, 'you', 'Subject raw');

        test.equal(root.left[0].label, 'AUX', 'Aux is');
        test.equal(root.left[0].type, 'VAUX', 'Aux type');
        test.equal(root.left[0].raw, 'do n\'t', 'Aux raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj is');
        test.equal(root.right[0].type, 'NP', 'Dobj type');
        test.equal(root.right[0].raw, 'Eliza', 'Dobj raw');

        test.equal(root.right[1].label, 'PUNCT', '? is');
        test.equal(root.right[1].type, 'PUNCT', '? type');
        test.equal(root.right[1].raw, '?', '? raw');
        test.done();
    };


    exports[pkg.mode + ' mode  - go'] = function(test) {
        var analysis = compendium.analyse('go')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'go', 'Sentence root should be `go`');
        test.equal(root.type, 'VB', 'Sentence root should be types `VB`');
        test.done();
    };

    exports[pkg.mode + ' mode  - Why are you happy?'] = function(test) {
        var analysis = compendium.analyse('Why are you happy?')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'are', 'Sentence root should be `are`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VB`');

        test.equal(root.left[0].label, 'ADVMOD', 'Advmod is');
        test.equal(root.left[0].type, 'ADV', 'Adv type');
        test.equal(root.left[0].raw, 'Why', 'Adv raw');

        test.equal(root.right[0].label, 'NSUBJ', 'Subj is');
        test.equal(root.right[0].type, 'NP', 'Subj type');
        test.equal(root.right[0].raw, 'you', 'Subj raw');

        test.equal(root.right[1].label, 'ACOMP', 'Obj is');
        test.equal(root.right[1].type, 'ADJ', 'Obj type');
        test.equal(root.right[1].raw, 'happy', 'Obj raw');

        test.done();
    };

    exports[pkg.mode + ' mode  - well why'] = function(test) {
        var analysis = compendium.analyse('well why')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'why', 'Sentence root should be `why`');
        test.equal(root.type, 'ADV', 'Sentence root should be types `ADV`');

        test.equal(root.left[0].label, 'ADVMOD', 'Advmod is');
        test.equal(root.left[0].type, 'ADV', 'Adv type');
        test.equal(root.left[0].raw, 'well', 'Adv raw');

        test.done();
    };



    exports[pkg.mode + ' mode  - do a thing'] = function(test) {
        var analysis = compendium.analyse('do a thing')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'do', 'Sentence root should be `do`');
        test.equal(root.type, 'VB', 'Sentence root should be types `VB`');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj is');
        test.equal(root.right[0].type, 'NP', 'NP type');
        test.equal(root.right[0].raw, 'a thing', 'a thing raw');
        test.done();
    };

    exports[pkg.mode + ' mode  - this is a thing'] = function(test) {
        var analysis = compendium.analyse('this is a thing')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is', 'Sentence root should be `is`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj is');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj is');
        test.equal(root.right[0].type, 'NP', 'NP type');
        test.equal(root.right[0].raw, 'a thing', 'a thing raw');
        test.done();
    };

    exports[pkg.mode + ' mode  - this was a thing'] = function(test) {
        var analysis = compendium.analyse('this was a thing')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'was', 'Sentence root should be `was`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj is');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj is');
        test.equal(root.right[0].type, 'NP', 'NP type');
        test.equal(root.right[0].raw, 'a thing', 'a thing raw');
        test.done();
    };

    exports[pkg.mode + ' mode  - this will be a thing'] = function(test) {
        var analysis = compendium.analyse('this will be a thing')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'will be', 'Sentence root should be `will be`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj is');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj is');
        test.equal(root.right[0].type, 'NP', 'NP type');
        test.equal(root.right[0].raw, 'a thing', 'a thing raw');
        test.done();
    };


    exports[pkg.mode + ' mode  - this could be a thing'] = function(test) {
        var analysis = compendium.analyse('this could be a thing')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'could be', 'Sentence root should be `could be`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj is');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj is');
        test.equal(root.right[0].type, 'NP', 'NP type');
        test.equal(root.right[0].raw, 'a thing', 'a thing raw');
        test.done();
    };


    exports[pkg.mode + ' mode  - this should be something '] = function(test) {
        var analysis = compendium.analyse('this should be something')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'should be', 'Sentence root should be `should be`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj is');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj is');
        test.equal(root.right[0].type, 'NP', 'NP type');
        test.equal(root.right[0].raw, 'something', 'something raw');
        test.done();
    };

    exports[pkg.mode + ' mode  - I would die now'] = function(test) {
        var analysis = compendium.analyse('I would die now')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'would die', 'Sentence root should be `would die`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj is');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.right[0].label, 'ADVMOD', 'ADVMOD now is');
        test.equal(root.right[0].type, 'ADV', 'ADV now type');
        test.equal(root.right[0].raw, 'now', 'now raw');
        test.done();
    };




    exports[pkg.mode + ' mode  - When in Rome, do as the Romans.'] = function(test) {
        var analysis = compendium.analyse('When in Rome, do as the Romans.')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'do', 'Sentence root should be `do`');
        test.equal(root.type, 'VB', 'Sentence root should be types `VB`');

        test.equal(root.left[0].label, 'ADVMOD', 'when is');
        test.equal(root.left[0].type, 'ADV', 'when type');
        test.equal(root.left[0].raw, 'When', 'when raw');

        test.equal(root.left[0].right[0].label, 'PREP', 'in is');
        test.equal(root.left[0].right[0].type, 'PP', 'in type');
        test.equal(root.left[0].right[0].raw, 'in', 'in raw');

        test.equal(root.left[0].right[0].right[0].label, 'POBJ', 'Rome is');
        test.equal(root.left[0].right[0].right[0].type, 'NP', 'Rome type');
        test.equal(root.left[0].right[0].right[0].raw, 'Rome', 'Rome raw');

        test.equal(root.left[1].label, 'PUNCT', ', is');
        test.equal(root.left[1].type, 'PUNCT', ', type');
        test.equal(root.left[1].raw, ',', ', raw');

        test.equal(root.right[0].label, 'PREP', 'as is');
        test.equal(root.right[0].type, 'PP', 'as type');
        test.equal(root.right[0].raw, 'as', 'as raw');

        test.equal(root.right[0].right[0].label, 'POBJ', 'the Romans is');
        test.equal(root.right[0].right[0].type, 'NP', 'the Romans type');
        test.equal(root.right[0].right[0].raw, 'the Romans', 'the Romans raw');

        test.equal(root.right[1].label, 'PUNCT', '. is');
        test.equal(root.right[1].type, 'PUNCT', '. type');
        test.equal(root.right[1].raw, '.', '. raw');

        test.done();
    };

    exports[pkg.mode + ' mode  - I don\'t want.'] = function(test) {
        var analysis = compendium.analyse('I don\'t want.')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'want', 'Sentence root should be `want`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'I is');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.left[1].label, 'AUX', 'don\'t is');
        test.equal(root.left[1].type, 'VAUX', 'don\'t type');
        test.equal(root.left[1].raw, 'do n\'t', 'don\'t raw');

        test.equal(root.right[0].label, 'PUNCT', '. is');
        test.equal(root.right[0].type, 'PUNCT', '. type');
        test.equal(root.right[0].raw, '.', '. raw');
        test.done();
    }
    exports[pkg.mode + ' mode  - I respectfully disagree.'] = function(test) {
        var analysis = compendium.analyse('I respectfully disagree.')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'disagree', 'Sentence root should be `disagree`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'I is');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.left[1].label, 'ADVMOD', 'respectfully is');
        test.equal(root.left[1].type, 'ADV', 'respectfully type');
        test.equal(root.left[1].raw, 'respectfully', 'respectfully raw');

        test.equal(root.right[0].label, 'PUNCT', '. is');
        test.equal(root.right[0].type, 'PUNCT', '. type');
        test.equal(root.right[0].raw, '.', '. raw');
        test.done();
    }
    exports[pkg.mode + ' mode  - I love you'] = function(test) {
        var analysis = compendium.analyse('I love you')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'love', 'Sentence root should be `love`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'I is');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.right[0].label, 'DOBJ', 'you is');
        test.equal(root.right[0].type, 'NP', 'you type');
        test.equal(root.right[0].raw, 'you', 'you raw');

        test.done()
    };
    exports[pkg.mode + ' mode  - yes?'] = function(test) {
        var analysis = compendium.analyse('yes?')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'yes', 'Sentence root should be `yes`');
        test.equal(root.type, 'UH', 'Sentence root should be types `UH`');

        test.equal(root.right[0].label, 'PUNCT', '? is');
        test.equal(root.right[0].type, 'PUNCT', '? type');
        test.equal(root.right[0].raw, '?', '? raw');

        test.done()
    };

    exports[pkg.mode + ' mode  - I love you so much it\'s insane'] = function(test) {
        var analysis = compendium.analyse('I love you so much it\'s insane')[0],
            root = analysis.root;

        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'love', 'Sentence root should be `love`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'I is');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.right[0].label, 'DOBJ', 'you is');
        test.equal(root.right[0].type, 'NP', 'you type');
        test.equal(root.right[0].raw, 'you', 'you raw');

        test.equal(root.right[1].label, 'ADVMOD', 'so much is');
        test.equal(root.right[1].type, 'ADV', 'so much type');
        test.equal(root.right[1].raw, 'so much', 'so much raw');

        test.equal(root.right[2].label, 'CCOMP', 'is is');
        test.equal(root.right[2].type, 'VP', 'is type');
        test.equal(root.right[2].raw, '\'s', 'is raw');

        test.equal(root.right[2].left[0].label, 'NSUBJ', 'it is');
        test.equal(root.right[2].left[0].type, 'NP', 'it type');
        test.equal(root.right[2].left[0].raw, 'it', 'it raw');

        test.equal(root.right[2].right[0].label, 'ACOMP', 'insane is');
        test.equal(root.right[2].right[0].type, 'ADJ', 'insane type');
        test.equal(root.right[2].right[0].raw, 'insane', 'insane raw');

        test.done();
    }

    exports[pkg.mode + ' mode  - PaineWebber Inc., for instance, is forecasting growth in S&P 500 dividends!'] = function(test) {
        var analysis = compendium.analyse('PaineWebber Inc., for instance, is forecasting growth in S&P 500 dividends!')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is forecasting', 'Sentence root should be `is forecasting`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');


        test.equal(root.left[0].label, 'NSUBJ', 'PaineWebber Inc. is');
        test.equal(root.left[0].type, 'NP', 'PaineWebber Inc. type');
        test.equal(root.left[0].raw, 'PaineWebber Inc.', 'PaineWebber Inc. raw');

        test.equal(root.left[1].label, 'PUNCT', ', is');
        test.equal(root.left[1].type, 'PUNCT', ', type');
        test.equal(root.left[1].raw, ',', ', raw');

        test.equal(root.left[2].label, 'PREP', 'for is');
        test.equal(root.left[2].type, 'PP', 'for type');
        test.equal(root.left[2].raw, 'for', 'for raw');

        test.equal(root.left[2].right[0].label, 'POBJ', 'instance is');
        test.equal(root.left[2].right[0].type, 'NP', 'instance type');
        test.equal(root.left[2].right[0].raw, 'instance', 'instance raw');

        test.equal(root.left[3].label, 'PUNCT', ', is');
        test.equal(root.left[3].type, 'PUNCT', ', type');
        test.equal(root.left[3].raw, ',', ', raw');

        test.equal(root.right[0].label, 'DOBJ', 'growth is');
        test.equal(root.right[0].type, 'NP', 'growth type');
        test.equal(root.right[0].raw, 'growth', 'growth raw');

        test.equal(root.right[0].right[0].label, 'PREP', 'in is');
        test.equal(root.right[0].right[0].type, 'PP', 'in type');
        test.equal(root.right[0].right[0].raw, 'in', 'in raw');

        test.equal(root.right[0].right[0].right[0].label, 'POBJ', 'S&P is');
        test.equal(root.right[0].right[0].right[0].type, 'NP', 'S&P type');
        test.equal(root.right[0].right[0].right[0].raw, 'S&P 500 dividends', 'S&P raw');

        test.done()
    };

    exports[pkg.mode + ' mode  - don\'t do it!'] = function(test) {
        var analysis = compendium.analyse('don\'t do it!')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'do', 'Sentence root should be `do`');
        test.equal(root.type, 'VB', 'Sentence root should be types `VB`');

        test.equal(root.left[0].label, 'AUX', 'don\'t is');
        test.equal(root.left[0].type, 'VAUX', 'dont type');
        test.equal(root.left[0].raw, 'do n\'t', 'don\'t raw');

        test.equal(root.right[0].label, 'DOBJ', 'it is');
        test.equal(root.right[0].type, 'NP', 'it type');
        test.equal(root.right[0].raw, 'it', 'it raw');

        test.equal(root.right[1].label, 'PUNCT', '! is');
        test.equal(root.right[1].type, 'PUNCT', '! type');
        test.equal(root.right[1].raw, '!', '! raw');
        test.done();
    };

    // exports[pkg.mode + ' mode  - hell no'] = function(test) {
    //     var analysis = compendium.analyse('hell no')[0],
    //         root = analysis.root;


    //     test.equal(root.label, 'ROOT', 'Root is root');
    //     test.equal(root.raw, 'hell', 'Sentence root should be `hell`');
    //     test.equal(root.type, 'UH', 'Sentence root should be types `UH`');

    //     test.equal(root.right[0].label, 'DOBJ', 'it is');
    //     test.equal(root.right[0].type, 'ADV', 'it type');
    //     test.equal(root.right[0].raw, 'it', 'it raw');
    // };


    // exports[pkg.mode + ' mode  - I <3 Compendium!'] = function(test) {
    //     var analysis = compendium.analyse('I <3 Compendium!')[0],
    //         root = analysis.root;

    //     test.equal(root.label, 'ROOT', 'Root is root');
    //     test.equal(root.raw, '<3', 'Sentence root should be `<3`');
    //     test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

    //     test.equal(root.left[0].label, 'NSUBJ', 'I is');
    //     test.equal(root.left[0].type, 'NP', 'I type');
    //     test.equal(root.left[0].raw, 'I', 'I raw');

    //     test.equal(root.right[0].label, 'DOBJ', 'Compendium is');
    //     test.equal(root.right[0].type, 'NP', 'Compendium type');
    //     test.equal(root.right[0].raw, 'Compendium', 'Compendium raw');

    //     test.equal(root.right[1].label, 'PUNCT', '! is');
    //     test.equal(root.right[1].type, 'PUNCT', '! type');
    //     test.equal(root.right[1].raw, '!', '! raw');

    //     test.done()
    // };
});
