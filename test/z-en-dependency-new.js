

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

        test.equal(root.left[1].label, 'NSUBJ', 'Subject relationship label');
        test.equal(root.left[1].type, 'NP', 'Subject type');
        test.equal(root.left[1].raw, 'you', 'Subject raw');

        test.equal(root.left[0].label, 'AUX', 'Aux relationship label');
        test.equal(root.left[0].type, 'VB', 'Aux type');
        test.equal(root.left[0].raw, 'do', 'Aux raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj relationship label');
        test.equal(root.right[0].type, 'NP', 'Dobj type');
        test.equal(root.right[0].raw, 'Eliza', 'Dobj raw');

        test.equal(root.right[1].label, 'PUNCT', '? relationship label');
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

        test.equal(root.left[1].label, 'NSUBJ', 'Subject relationship label');
        test.equal(root.left[1].type, 'NP', 'Subject type');
        test.equal(root.left[1].raw, 'you', 'Subject raw');

        test.equal(root.left[0].label, 'AUX', 'Aux relationship label');
        test.equal(root.left[0].type, 'VAUX', 'Aux type');
        test.equal(root.left[0].raw, 'do n\'t', 'Aux raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj relationship label');
        test.equal(root.right[0].type, 'NP', 'Dobj type');
        test.equal(root.right[0].raw, 'Eliza', 'Dobj raw');

        test.equal(root.right[1].label, 'PUNCT', '? relationship label');
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

        test.equal(root.left[0].label, 'ADVMOD', 'Advmod relationship label');
        test.equal(root.left[0].type, 'ADV', 'Adv type');
        test.equal(root.left[0].raw, 'Why', 'Adv raw');

        test.equal(root.right[0].label, 'NSUBJ', 'Subj relationship label');
        test.equal(root.right[0].type, 'NP', 'Subj type');
        test.equal(root.right[0].raw, 'you', 'Subj raw');

        test.equal(root.right[1].label, 'ACOMP', 'Obj relationship label');
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

        test.equal(root.left[0].label, 'ADVMOD', 'Advmod relationship label');
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

        test.equal(root.right[0].label, 'DOBJ', 'Dobj relationship label');
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

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj relationship label');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj relationship label');
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

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj relationship label');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj relationship label');
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

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj relationship label');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj relationship label');
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

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj relationship label');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj relationship label');
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

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj relationship label');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'Dobj relationship label');
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

        test.equal(root.left[0].label, 'NSUBJ', 'Nsubj relationship label');
        test.equal(root.left[0].type, 'NP', 'NP type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.right[0].label, 'ADVMOD', 'ADVMOD now relationship label');
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

        test.equal(root.left[0].label, 'ADVMOD', 'when relationship label');
        test.equal(root.left[0].type, 'ADV', 'when type');
        test.equal(root.left[0].raw, 'When', 'when raw');

        test.equal(root.left[0].right[0].label, 'PREP', 'in relationship label');
        test.equal(root.left[0].right[0].type, 'PP', 'in type');
        test.equal(root.left[0].right[0].raw, 'in', 'in raw');

        test.equal(root.left[0].right[0].right[0].label, 'POBJ', 'Rome relationship label');
        test.equal(root.left[0].right[0].right[0].type, 'NP', 'Rome type');
        test.equal(root.left[0].right[0].right[0].raw, 'Rome', 'Rome raw');

        test.equal(root.left[1].label, 'PUNCT', ', relationship label');
        test.equal(root.left[1].type, 'PUNCT', ', type');
        test.equal(root.left[1].raw, ',', ', raw');

        test.equal(root.right[0].label, 'PREP', 'as relationship label');
        test.equal(root.right[0].type, 'PP', 'as type');
        test.equal(root.right[0].raw, 'as', 'as raw');

        test.equal(root.right[0].right[0].label, 'POBJ', 'the Romans relationship label');
        test.equal(root.right[0].right[0].type, 'NP', 'the Romans type');
        test.equal(root.right[0].right[0].raw, 'the Romans', 'the Romans raw');

        test.equal(root.right[1].label, 'PUNCT', '. relationship label');
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

        test.equal(root.left[0].label, 'NSUBJ', 'I relationship label');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.left[1].label, 'AUX', 'don\'t relationship label');
        test.equal(root.left[1].type, 'VAUX', 'don\'t type');
        test.equal(root.left[1].raw, 'do n\'t', 'don\'t raw');

        test.equal(root.right[0].label, 'PUNCT', '. relationship label');
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

        test.equal(root.left[0].label, 'NSUBJ', 'I relationship label');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.left[1].label, 'ADVMOD', 'respectfully relationship label');
        test.equal(root.left[1].type, 'ADV', 'respectfully type');
        test.equal(root.left[1].raw, 'respectfully', 'respectfully raw');

        test.equal(root.right[0].label, 'PUNCT', '. relationship label');
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

        test.equal(root.left[0].label, 'NSUBJ', 'I relationship label');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.right[0].label, 'DOBJ', 'you relationship label');
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

        test.equal(root.right[0].label, 'PUNCT', '? relationship label');
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

        test.equal(root.left[0].label, 'NSUBJ', 'I relationship label');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.right[0].label, 'DOBJ', 'you relationship label');
        test.equal(root.right[0].type, 'NP', 'you type');
        test.equal(root.right[0].raw, 'you', 'you raw');

        test.equal(root.right[1].label, 'ADVMOD', 'so much relationship label');
        test.equal(root.right[1].type, 'ADV', 'so much type');
        test.equal(root.right[1].raw, 'so much', 'so much raw');

        test.equal(root.right[2].label, 'XCOMP', 'its insane relationship label');
        test.equal(root.right[2].type, 'SBAR', 'its insane type');
        test.equal(root.right[2].raw, '', 'its insane raw');

        test.equal(root.right[2].right[0].label, 'ROOT', 'is relationship label');
        test.equal(root.right[2].right[0].type, 'VP', 'is type');
        test.equal(root.right[2].right[0].raw, '\'s', 'is raw');

        test.equal(root.right[2].right[0].left[0].label, 'NSUBJ', 'it relationship label');
        test.equal(root.right[2].right[0].left[0].type, 'NP', 'it type');
        test.equal(root.right[2].right[0].left[0].raw, 'it', 'it raw');

        test.equal(root.right[2].right[0].right[0].label, 'ACOMP', 'insane relationship label');
        test.equal(root.right[2].right[0].right[0].type, 'ADJ', 'insane type');
        test.equal(root.right[2].right[0].right[0].raw, 'insane', 'insane raw');

        test.done();
    }

    exports[pkg.mode + ' mode  - PaineWebber Inc., for instance, is forecasting growth in S&P 500 dividends!'] = function(test) {
        var analysis = compendium.analyse('PaineWebber Inc., for instance, is forecasting growth in S&P 500 dividends!')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is forecasting', 'Sentence root should be `is forecasting`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');


        test.equal(root.left[0].label, 'NSUBJ', 'PaineWebber Inc. relationship label');
        test.equal(root.left[0].type, 'NP', 'PaineWebber Inc. type');
        test.equal(root.left[0].raw, 'PaineWebber Inc.', 'PaineWebber Inc. raw');

        test.equal(root.left[1].label, 'PUNCT', ', relationship label');
        test.equal(root.left[1].type, 'PUNCT', ', type');
        test.equal(root.left[1].raw, ',', ', raw');

        test.equal(root.left[2].label, 'PREP', 'for relationship label');
        test.equal(root.left[2].type, 'PP', 'for type');
        test.equal(root.left[2].raw, 'for', 'for raw');

        test.equal(root.left[2].right[0].label, 'POBJ', 'instance relationship label');
        test.equal(root.left[2].right[0].type, 'NP', 'instance type');
        test.equal(root.left[2].right[0].raw, 'instance', 'instance raw');

        test.equal(root.left[3].label, 'PUNCT', ', relationship label');
        test.equal(root.left[3].type, 'PUNCT', ', type');
        test.equal(root.left[3].raw, ',', ', raw');

        test.equal(root.right[0].label, 'DOBJ', 'growth relationship label');
        test.equal(root.right[0].type, 'NP', 'growth type');
        test.equal(root.right[0].raw, 'growth', 'growth raw');

        test.equal(root.right[0].right[0].label, 'PREP', 'in relationship label');
        test.equal(root.right[0].right[0].type, 'PP', 'in type');
        test.equal(root.right[0].right[0].raw, 'in', 'in raw');

        test.equal(root.right[0].right[0].right[0].label, 'POBJ', 'S&P relationship label');
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

        test.equal(root.left[0].label, 'AUX', 'don\'t relationship label');
        test.equal(root.left[0].type, 'VAUX', 'dont type');
        test.equal(root.left[0].raw, 'do n\'t', 'don\'t raw');

        test.equal(root.right[0].label, 'DOBJ', 'it relationship label');
        test.equal(root.right[0].type, 'NP', 'it type');
        test.equal(root.right[0].raw, 'it', 'it raw');

        test.equal(root.right[1].label, 'PUNCT', '! relationship label');
        test.equal(root.right[1].type, 'PUNCT', '! type');
        test.equal(root.right[1].raw, '!', '! raw');
        test.done();
    };

    exports[pkg.mode + ' mode  - hell no'] = function(test) {
        var analysis = compendium.analyse('hell no')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'hell', 'Sentence root should be `hell`');
        test.equal(root.type, 'UH', 'Sentence root should be types `UH`');

        test.equal(root.right[0].label, 'ADVMOD', 'no relationship label');
        test.equal(root.right[0].type, 'ADV', 'no type');
        test.equal(root.right[0].raw, 'no', 'no raw');

        test.done();
    };

    exports[pkg.mode + ' mode  - what is the weather and the time'] = function(test) {
        var analysis = compendium.analyse('what is the weather and the time')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is', 'Sentence root should be `is`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'ATTR', 'what relationship label');
        test.equal(root.left[0].type, 'WP', 'what type');
        test.equal(root.left[0].raw, 'what', 'what raw');

        test.equal(root.right[0].label, 'NSUBJ', 'the weather relationship label');
        test.equal(root.right[0].type, 'NP', 'the weather type');
        test.equal(root.right[0].raw, 'the weather', 'the weather raw');

        test.equal(root.right[0].right[0].label, 'CC', 'and relationship label');
        test.equal(root.right[0].right[0].type, 'CC', 'and type');
        test.equal(root.right[0].right[0].raw, 'and', 'and raw');

        test.equal(root.right[0].right[0].right[0].label, 'CONJ', 'the time relationship label');
        test.equal(root.right[0].right[0].right[0].type, 'NP', 'the time type');
        test.equal(root.right[0].right[0].right[0].raw, 'the time', 'the time raw');

        test.done();
    };

    exports[pkg.mode + ' mode  - who is Xav the magician'] = function(test) {
        var analysis = compendium.analyse('who is Xav the magician')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is', 'Sentence root should be `is`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'ATTR', 'who relationship label');
        test.equal(root.left[0].type, 'WP', 'who type');
        test.equal(root.left[0].raw, 'who', 'who raw');

        test.equal(root.right[0].label, 'NSUBJ', 'Xav relationship label');
        test.equal(root.right[0].type, 'NP', 'Xav type');
        test.equal(root.right[0].raw, 'Xav', 'Xav raw');

        test.equal(root.right[0].right[0].label, 'CONJ', 'the magician relationship label');
        test.equal(root.right[0].right[0].type, 'NP', 'the magician type');
        test.equal(root.right[0].right[0].raw, 'the magician', 'the magician raw');

        test.done();
    };


    exports[pkg.mode + ' mode  - do something'] = function(test) {
        var analysis = compendium.analyse('do something')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'do', 'Sentence root should be `do`');
        test.equal(root.type, 'VB', 'Sentence root should be types `VB`');

        test.equal(root.right[0].label, 'DOBJ', 'something relationship label');
        test.equal(root.right[0].type, 'NP', 'something type');
        test.equal(root.right[0].raw, 'something', 'something raw');

        test.done();
    };

    exports[pkg.mode + ' mode  - She looks very beautiful'] = function(test) {
        var analysis = compendium.analyse('She looks very beautiful')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'looks', 'Sentence root should be `looks`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'She relationship label');
        test.equal(root.left[0].type, 'NP', 'She type');
        test.equal(root.left[0].raw, 'She', 'She raw');

        test.equal(root.right[0].label, 'ACOMP', 'very beautiful relationship label');
        test.equal(root.right[0].type, 'ADJP', 'very beautiful type');
        test.equal(root.right[0].raw, 'very beautiful', 'very beautiful raw');


        test.done();
    };

    exports[pkg.mode + ' mode  - She looks very very beautiful'] = function(test) {
        var analysis = compendium.analyse('She looks very very beautiful')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'looks', 'Sentence root should be `looks`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'She relationship label');
        test.equal(root.left[0].type, 'NP', 'She type');
        test.equal(root.left[0].raw, 'She', 'She raw');

        test.equal(root.right[0].label, 'ACOMP', 'very very beautiful relationship label');
        test.equal(root.right[0].type, 'ADJP', 'very very beautiful type');
        test.equal(root.right[0].raw, 'very very beautiful', 'very very beautiful raw');


        test.done();
    };

    exports[pkg.mode + ' mode  - I changed my mind'] = function(test) {
        var analysis = compendium.analyse('I changed my mind')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'changed', 'Sentence root should be `changed`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'I relationship label');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.right[0].label, 'DOBJ', 'my mind relationship label');
        test.equal(root.right[0].type, 'NP', 'my mind type');
        test.equal(root.right[0].raw, 'my mind', 'my mind raw');

        test.done();
    };


    exports[pkg.mode + ' mode  - Genetically modified food'] = function(test) {
        var analysis = compendium.analyse('Genetically modified food')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'Genetically modified food', 'Sentence root should be `Genetically modified food`');
        test.equal(root.type, 'NP', 'Sentence root should be types `NP`');

        test.done();
    };

    exports[pkg.mode + ' mode  - where is the trick'] = function(test) {
        var analysis = compendium.analyse('where is the trick')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is', 'Sentence root should be `is`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'ADVMOD', 'where relationship label');
        test.equal(root.left[0].type, 'ADV', 'where type');
        test.equal(root.left[0].raw, 'where', 'where raw');

        test.equal(root.right[0].label, 'NSUBJ', 'the trick relationship label');
        test.equal(root.right[0].type, 'NP', 'the trick type');
        test.equal(root.right[0].raw, 'the trick', 'the trick raw');

        test.done();
    };
    exports[pkg.mode + ' mode  - but where is the trick'] = function(test) {
        var analysis = compendium.analyse('but where is the trick')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is', 'Sentence root should be `is`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'CC', 'but relationship label');
        test.equal(root.left[0].type, 'CC', 'but type');
        test.equal(root.left[0].raw, 'but', 'but raw');

        test.equal(root.left[1].label, 'ADVMOD', 'where relationship label');
        test.equal(root.left[1].type, 'ADV', 'where type');
        test.equal(root.left[1].raw, 'where', 'where raw');

        test.equal(root.right[0].label, 'NSUBJ', 'the trick relationship label');
        test.equal(root.right[0].type, 'NP', 'the trick type');
        test.equal(root.right[0].raw, 'the trick', 'the trick raw');

        test.done();
    };
    exports[pkg.mode + ' mode  - this is quite a good day'] = function(test) {
        var analysis = compendium.analyse('this is quite a good day')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is', 'Sentence root should be `is`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'This relationship label');
        test.equal(root.left[0].type, 'NP', 'This type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'quite a good day relationship label');
        test.equal(root.right[0].type, 'NP', 'quite a good day type');
        test.equal(root.right[0].raw, 'quite a good day', 'quite a good day raw');


        test.done();
    };
    exports[pkg.mode + ' mode  - this is a really good day'] = function(test) {
        var analysis = compendium.analyse('this is a really good day')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is', 'Sentence root should be `is`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'This relationship label');
        test.equal(root.left[0].type, 'NP', 'This type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'a really good day relationship label');
        test.equal(root.right[0].type, 'NP', 'a really good day type');
        test.equal(root.right[0].raw, 'a really good day', 'a really good day raw');


        test.done();
    };

    exports[pkg.mode + ' mode  - this is a really really good day'] = function(test) {
        var analysis = compendium.analyse('this is a really really good day')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is', 'Sentence root should be `is`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'This relationship label');
        test.equal(root.left[0].type, 'NP', 'This type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'a really really good day relationship label');
        test.equal(root.right[0].type, 'NP', 'a really really good day type');
        test.equal(root.right[0].raw, 'a really really good day', 'a really good day raw');


        test.done();
    };


    exports[pkg.mode + ' mode  - this is a good and awesome day'] = function(test) {
        var analysis = compendium.analyse('this is a good and awesome day')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is', 'Sentence root should be `is`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'This relationship label');
        test.equal(root.left[0].type, 'NP', 'This type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'a good and awesome day relationship label');
        test.equal(root.right[0].type, 'NP', 'a good and awesome day type');
        test.equal(root.right[0].raw, 'a good and awesome day', 'a good and awesome day');


        test.done();
    };


    exports[pkg.mode + ' mode  - this is a really good, freaking awesome day'] = function(test) {
        var analysis = compendium.analyse('this is a really good, freaking awesome day')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'is', 'Sentence root should be `is`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'This relationship label');
        test.equal(root.left[0].type, 'NP', 'This type');
        test.equal(root.left[0].raw, 'this', 'This raw');

        test.equal(root.right[0].label, 'DOBJ', 'a really good, freaking awesome day relationship label');
        test.equal(root.right[0].type, 'NP', 'a really good, freaking awesome day type');
        test.equal(root.right[0].raw, 'a really good , freaking awesome day', 'a really good, freaking awesome day');


        test.done();
    };
    exports[pkg.mode + ' mode  - I\'m doing well'] = function(test) {
        var analysis = compendium.analyse('I\'m doing well')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, '\'m doing', 'Sentence root should be `\'m doing`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'I relationship label');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.right[0].label, 'ADVMOD', 'well relationship label');
        test.equal(root.right[0].type, 'ADV', 'well type');
        test.equal(root.right[0].raw, 'well', 'well raw');


        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m seriously doing well'] = function(test) {
        var analysis = compendium.analyse('I\'m seriously doing well')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, '\'m seriously doing', 'Sentence root should be `\'m seriously doing`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'I relationship label');
        test.equal(root.left[0].type, 'NP', 'I type');
        test.equal(root.left[0].raw, 'I', 'I raw');

        test.equal(root.right[0].label, 'ADVMOD', 'well relationship label');
        test.equal(root.right[0].type, 'ADV', 'well type');
        test.equal(root.right[0].raw, 'well', 'well raw');


        test.done();
    };

    exports[pkg.mode + ' mode  - The car has been sold'] = function(test) {
        var analysis = compendium.analyse('The car has been sold')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'has been sold', 'Sentence root should be `has been sold`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'The car relationship label');
        test.equal(root.left[0].type, 'NP', 'The car type');
        test.equal(root.left[0].raw, 'The car', 'The car raw');

        test.done();
    };

    exports[pkg.mode + ' mode  - The car has been quickly sold'] = function(test) {
        var analysis = compendium.analyse('The car has been quickly sold')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'has been quickly sold', 'Sentence root should be `has been sold`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'The car relationship label');
        test.equal(root.left[0].type, 'NP', 'The car type');
        test.equal(root.left[0].raw, 'The car', 'The car raw');

        test.done();
    };

    exports[pkg.mode + ' mode  - The car John wanted to buy has been quickly sold'] = function(test) {
        var analysis = compendium.analyse('The car John wanted to buy has been quickly sold')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'has been quickly sold', 'Sentence root should be `has been sold`');
        test.equal(root.type, 'VP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'NSUBJ', 'The car relationship label');
        test.equal(root.left[0].type, 'NP', 'The car type');
        test.equal(root.left[0].raw, 'The car', 'The car raw');

        test.equal(root.left[0].right[0].label, 'XCOMP', 'John wanted to buy relationship label');
        test.equal(root.left[0].right[0].type, 'SBAR', 'John wanted to buy type');
        test.equal(root.left[0].right[0].raw, '', 'John wanted to buy raw');

        test.equal(root.left[0].right[0].right[0].label, 'ROOT', 'wanted relationship label');
        test.equal(root.left[0].right[0].right[0].type, 'VP', 'wanted type');
        test.equal(root.left[0].right[0].right[0].raw, 'wanted', 'wanted raw');

        test.equal(root.left[0].right[0].right[0].left[0].label, 'NSUBJ', 'John relationship label');
        test.equal(root.left[0].right[0].right[0].left[0].type, 'NP', 'John type');
        test.equal(root.left[0].right[0].right[0].left[0].raw, 'John', 'John raw');

        test.equal(root.left[0].right[0].right[0].right[0].label, 'XCOMP', 'to buy relationship label');
        test.equal(root.left[0].right[0].right[0].right[0].type, 'MARK', 'to buy type');
        test.equal(root.left[0].right[0].right[0].right[0].raw, 'to buy', 'to buy raw');


        test.done();
    };

    exports[pkg.mode + ' mode  - no way!'] = function(test) {
        var analysis = compendium.analyse('no way!')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'way', 'Sentence root should be `way`');
        test.equal(root.type, 'NP', 'Sentence root should be types `VP`');

        test.equal(root.left[0].label, 'ADVMOD', 'no relationship label');
        test.equal(root.left[0].type, 'ADV', 'no type');
        test.equal(root.left[0].raw, 'no', 'no raw');

        test.done();
    };

    exports[pkg.mode + ' mode  - ah ok!'] = function(test) {
        var analysis = compendium.analyse('ah ok!')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'ok', 'Sentence root should be `ok`');
        test.equal(root.type, 'NP', 'Sentence root should be types `NP`');

        test.equal(root.left[0].label, 'INTJ', 'ah relationship label');
        test.equal(root.left[0].type, 'UH', 'ah type');
        test.equal(root.left[0].raw, 'ah', 'ah raw');

        test.equal(root.right[0].label, 'PUNCT', '! relationship label');
        test.equal(root.right[0].type, 'PUNCT', '! type');
        test.equal(root.right[0].raw, '!', '! raw');

        test.done();
    };


    exports[pkg.mode + ' mode  - ah ah!'] = function(test) {
        var analysis = compendium.analyse('ah ah!')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, 'ah ah', 'Sentence root should be `ah`');
        test.equal(root.type, 'UH', 'Sentence root should be types `UH`');

        test.equal(root.right[0].label, 'PUNCT', '! relationship label');
        test.equal(root.right[0].type, 'PUNCT', '! type');
        test.equal(root.right[0].raw, '!', '! raw');

        test.done();
    };


    exports[pkg.mode + ' mode  - (y)!'] = function(test) {
        var analysis = compendium.analyse('(y)!')[0],
            root = analysis.root;


        test.equal(root.label, 'ROOT', 'Root is root');
        test.equal(root.raw, '', 'Sentence root should be a fragment');
        test.equal(root.type, 'FRAG', 'Sentence root should be types `FRAG`');

        test.equal(root.right[0].type, 'UH', 'y type');
        test.equal(root.right[0].raw, 'y', 'y raw');

        test.equal(root.right[1].label, 'PUNCT', '! relationship label');
        test.equal(root.right[1].type, 'PUNCT', '! type');
        test.equal(root.right[1].raw, '!', '! raw');

        test.done();
    };


});
