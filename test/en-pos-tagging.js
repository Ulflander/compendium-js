


[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {

    var compendium = require(pkg.path);

    // Comparative PoS result have been generated using the Stanford PoS tagger,
    // via http://nlp.stanford.edu:8080/parser/index.jsp
    // and in some case verified (and, rarely, fixed) using this other, purely machine learning based tagger:
    // http://nlpdotnet.com/services/Tagger.aspx
    //

    exports[pkg.mode + ' mode  - this could be something'] = function(test) {
        test.deepEqual(['DT', 'MD', 'VB', 'NN'], compendium.analyse('this could be something')[0].tags);
        test.done();
    };


    exports[pkg.mode + ' mode  - Hi'] = function(test) {
        test.deepEqual(['UH'], compendium.analyse('Hi')[0].tags);
        test.done();
    };

    // Checking unstreak mode with synonyms
    exports[pkg.mode + ' mode  - Hiiiiiiiiii'] = function(test) {
        test.deepEqual(['UH'], compendium.analyse('Hiiiiiiiiii')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - I would go buy a computer.'] = function(test) {
        test.deepEqual(['PRP', 'MD', 'VB', 'VB', 'DT', 'NN', '.'], compendium.analyse('I would go buy a computer.')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - We feel sorry for having caused trouble to society.'] = function(test) {
        test.deepEqual(['PRP', 'VBP', 'JJ', 'IN', 'VBG', 'VBN', 'NN', 'TO', 'NN', '.'], compendium.analyse('We feel sorry for having caused trouble to society.')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - That was a reform instituted after the Great Crash of 1929.'] = function(test) {
        test.deepEqual(['DT', 'VBD', 'DT', 'NN', 'VBN', 'IN', 'DT', 'NNP', 'NNP', 'IN', 'CD', '.'], compendium.analyse('That was a reform instituted after the Great Crash of 1929.')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - These events took place 35 years ago.'] = function(test) {
        // @todo: penn treebank says `ago` is IN, stanford says `RB` in context `32 years ago`. Who is right?
        test.deepEqual(['DT', 'NNS', 'VBD', 'NN', 'CD', 'NNS', 'IN', '.'], compendium.analyse('These events took place 35 years ago.')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - This loan is at a 35% interest.'] = function(test) {
        test.deepEqual(['DT', 'NN', 'VBZ', 'IN', 'DT', 'CD', 'SYM', 'NN', '.'], compendium.analyse('This loan is at a 35% interest.')[0].tags);
        test.done();
    };
    exports[pkg.mode + ' mode  - I don\'t love Compendium.'] = function(test) {
        test.deepEqual(['PRP', 'VBP', 'RB', 'VB', 'NNP', '.'], compendium.analyse('I don\'t love Compendium.')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Negative numbers such as -12 are numbers too'] = function(test) {
        test.deepEqual(['JJ', 'NNS', 'JJ', 'IN', 'CD', 'VBP', 'NNS', 'RB'], compendium.analyse('Negative numbers such as -12 are numbers too')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - None of the money was missing'] = function(test) {
        test.deepEqual(['NN', 'IN', 'DT', 'NN', 'VBD', 'VBG'], compendium.analyse('None of the money was missing')[0].tags);
        test.done();
    };
    exports[pkg.mode + ' mode  - Charles Bradford, an analyst'] = function(test) {
        test.deepEqual(['NNP', 'NNP', ',', 'DT', 'NN'], compendium.analyse('Charles Bradford, an analyst')[0].tags);
        test.done();
    };
    exports[pkg.mode + ' mode  - that\'s what I mean'] = function(test) {
        test.deepEqual(['DT', 'VBZ', 'WP', 'PRP', 'VBP'], compendium.analyse('that\'s what I mean')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - you\'re awesome, that\'s what I mean'] = function(test) {
        test.deepEqual(['PRP', 'VBP', 'JJ', ',', 'IN', 'VBZ', 'WP', 'PRP', 'VBP'], compendium.analyse('you\'re awesome, that\'s what I mean')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are 5,270.87 bucks'] = function(test) {
        test.deepEqual(['RB', 'VBP', 'CD', 'NNS'], compendium.analyse('Here are 5,270.87 bucks')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - I am saudi'] = function(test) {
        test.deepEqual(['PRP', 'VBP', 'JJ'], compendium.analyse('I am saudi')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m saudi'] = function(test) {
        test.deepEqual(['PRP', 'VBP', 'JJ'], compendium.analyse('I\'m saudi')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m "saudi"'] = function(test) {
        test.deepEqual(['PRP', 'VBP', '"', 'JJ', '"'], compendium.analyse('I\'m "saudi"')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m \'saudi\''] = function(test) {
        test.deepEqual(['PRP', 'VBP', '"', 'JJ', '"'], compendium.analyse('I\'m \'saudi\'')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m `saudi`'] = function(test) {
        test.deepEqual(['PRP', 'VBP', '"', 'JJ', '"'], compendium.analyse('I\'m `saudi`')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - this is a really good, freaking awesome day'] = function(test) {
        test.deepEqual('DT VBZ DT RB JJ , JJ JJ NN'.split(' '), compendium.analyse('this is a really good, freaking awesome day')[0].tags);
        test.done();
    };

    // *eed tokens should not be VBN
    // TO try should be VB
    exports[pkg.mode + ' mode  - The most certain way to succeed is always to try just one more time.'] = function(test) {
        test.notEqual('VBN', compendium.analyse('The most certain way to succeed is always to try just one more time.')[0].tags[5]);
        test.deepEqual(['DT', 'RBS', 'JJ', 'NN', 'TO', 'VB', 'VBZ', 'RB', 'TO', 'VB', 'RB', 'CD', 'JJR', 'NN', '.'], compendium.analyse('The most certain way to succeed is always to try just one more time.')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - sh*t was hilarious...LMAO!!!'] = function(test) {
        test.deepEqual(['NN', 'VBD', 'JJ', '.', 'UH', '.'], compendium.analyse('sh*t was hilarious...LMAO!!!')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - ah ahhhhhhh lol looool'] = function(test) {
        test.deepEqual(['UH', 'UH', 'UH', 'UH'], compendium.analyse('ah ahhhhhhh lol looool')[0].tags);
        test.done();
    };

    exports[pkg.mode + ' mode  - She sells seashells by the seashore. the shells she sells are sure seashells.'] = function(test) {
        var expected = [
                ('PRP VBZ NNS IN DT NN .').split(' '),
                ('DT NNS PRP VBZ VBP JJ NNS .').split(' ')
            ],
            analysis = compendium.analyse('She sells seashells by the seashore. the shells she sells are sure seashells.'),
            actual = [
                analysis[0].tags,
                analysis[1].tags
            ];

        test.deepEqual(actual, expected);
        test.done();
    };
    exports[pkg.mode + ' mode  - The quick brown fox jumps over the lazy dog.'] = function(test) {
        var expected = [
                ('DT JJ JJ NN VBZ IN DT JJ NN .').split(' ')
            ],
            analysis = compendium.analyse('The quick brown fox jumps over the lazy dog.'),
            actual = [
                analysis[0].tags
            ];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - A form of asbestos once used to make Kent cigarette filters has caused a high percentage of cancer deaths among a group of workers exposed to it more than 30 years ago, researchers reported.'] = function(test) {
        var expected = [
                ('DT NN IN NN RB VBN TO VB NNP NN NNS VBZ VBN DT JJ NN IN NN NNS IN DT NN IN NNS VBN TO PRP JJR IN CD NNS IN , NNS VBD .').split(' ')
            ],
            analysis = compendium.analyse('A form of asbestos once used to make Kent cigarette filters has caused a high percentage of cancer deaths among a group of workers exposed to it more than 30 years ago, researchers reported.'),
            actual = [
                analysis[0].tags
            ];

        test.deepEqual(actual, expected);
        test.done();
    };


    exports[pkg.mode + ' mode  - the executives joined Mayor William H. Hudnut III for an evening'] = function(test) {
        var expected = [
                ('DT NNS VBD NNP NNP NNP NNP NNP IN DT NN').split(' ')
            ],
            analysis = compendium.analyse('the executives joined Mayor William H. Hudnut III for an evening'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };


    exports[pkg.mode + ' mode  - Chapter IV'] = function(test) {
        var expected = [
                ('NN CD').split(' ')
            ],
            analysis = compendium.analyse('Chapter IV'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };


    exports[pkg.mode + ' mode  - I love my Apple II'] = function(test) {
        var expected = [
                ('PRP VBP PRP$ NNP NNP').split(' ')
            ],
            analysis = compendium.analyse('I love my Apple II'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };


    exports[pkg.mode + ' mode  - 2 -1'] = function(test) {
        var expected = [
                ('CD CD').split(' ')
            ],
            analysis = compendium.analyse('2 -1'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - hell yeah'] = function(test) {
        var expected = [
                ('UH UH').split(' ')
            ],
            analysis = compendium.analyse('hell yeah'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };


    exports[pkg.mode + ' mode  - 300,000 copies'] = function(test) {
        var expected = [
                ('CD NNS').split(' ')
            ],
            analysis = compendium.analyse('300,000 copies'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };


    exports[pkg.mode + ' mode  - two hundred and fifty five'] = function(test) {
        var expected = [
                ('CD CD CC CD CD').split(' ')
            ],
            analysis = compendium.analyse('two hundred and fifty five'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };


    exports[pkg.mode + ' mode  - Feeling kind of low...'] = function(test) {
        var analysis = compendium.analyse('Feeling kind of low...');
        test.deepEqual([analysis[0].tags], [('VBG RB IN JJ .').split(' ')]);
        test.done();
    };

    exports[pkg.mode + ' mode  - happy!!!!!!'] = function(test) {
        var analysis = compendium.analyse('happy !!!!!!');
        test.deepEqual([analysis[0].tags], [('JJ .').split(' ')]);
        test.done();
    };

    exports[pkg.mode + ' mode  - Hey :))))'] = function(test) {
        var analysis = compendium.analyse('Hey :))))');
        test.deepEqual([analysis[0].tags], [('UH EM').split(' ')]);
        test.done();
    };

    exports[pkg.mode + ' mode  - Hey :]]]]'] = function(test) {
        var analysis = compendium.analyse('Hey :]]]]');
        test.deepEqual([analysis[0].tags], [('UH EM').split(' ')]);
        test.done()
    };

    exports[pkg.mode + ' mode  - 😋'] = function(test) {
        var analysis = compendium.analyse('😋');
        test.deepEqual([analysis[0].tags], [('EM').split(' ')]);
        test.done();
    };

    exports[pkg.mode + ' mode  - happy 😋 !!!!!!'] = function(test) {
        var analysis = compendium.analyse('happy 😋 !!!!!!');
        test.deepEqual([analysis[0].tags], [('JJ EM .').split(' ')]);
        test.done();
    };

    exports[pkg.mode + ' mode  - It\'s psychedelic.'] = function(test) {
        var analysis = compendium.analyse('It\'s psychedelic.');
        test.deepEqual([analysis[0].tags], [('PRP VBZ JJ .').split(' ')]);
        test.done();
    };

    exports[pkg.mode + ' mode  - It\'s funkadelic.'] = function(test) {
        var analysis = compendium.analyse('It\'s funkadelic.');
        test.deepEqual([analysis[0].tags], [('PRP VBZ JJ .').split(' ')]);
        test.done();
    };

    exports[pkg.mode + ' mode  - I like you'] = function(test) {
        var expected = [
                ('PRP VBP PRP').split(' ')
            ],
            analysis = compendium.analyse('I like you'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - He likes you'] = function(test) {
        var analysis = compendium.analyse('He likes you');
        test.deepEqual([analysis[0].tags], [('PRP VBZ PRP').split(' ')]);
        test.done();
    };
    exports[pkg.mode + ' mode  - She likes you'] = function(test) {
        var analysis = compendium.analyse('She likes you');
        test.deepEqual([analysis[0].tags], [('PRP VBZ PRP').split(' ')]);
        test.done();
    };

    exports[pkg.mode + ' mode  - We like you'] = function(test) {
        var analysis = compendium.analyse('We like you');
        test.deepEqual([analysis[0].tags], [('PRP VBP PRP').split(' ')]);
        test.done();
    };
    exports[pkg.mode + ' mode  - They like you'] = function(test) {
        var analysis = compendium.analyse('They like you');
        test.deepEqual([analysis[0].tags], [('PRP VBP PRP').split(' ')]);
        test.done();
    };


    exports[pkg.mode + ' mode  - Mark Johns Jr., (sen. Ala.)'] = function(test) {
        var analysis = compendium.analyse('Mark Johns Jr., (sen. Ala.)');
        test.deepEqual([analysis[0].tags], [('NNP NNP NNP , ( NN NNP )').split(' ')]);
        test.done();
    };


    exports[pkg.mode + ' mode  - PaineWebber Inc., for instance, is forecasting growth in S&P 500 dividends'] = function(test) {
        var analysis = compendium.analyse('PaineWebber Inc., for instance, is forecasting growth in S&P 500 dividends');
        test.deepEqual([analysis[0].tags], [('NNP NNP , IN NN , VBZ VBG NN IN NNP CD NNS').split(' ')]);
        test.done();
    };

    exports[pkg.mode + ' mode  - Lots of buzz from IO2009 but how lucky are they, a free G2!'] = function(test) {
        var analysis = compendium.analyse('Lots of buzz from IO2009 but how lucky are they, a free G2!');
        test.deepEqual([analysis[0].tags], [('NNS IN NN IN NNP CC WRB JJ VBP PRP , DT JJ NNP .').split(' ')]);
        test.done();
    };

    exports[pkg.mode + ' mode  - I would lack some skills'] = function(test) {
        var expected = [
                ('PRP MD VB DT NNS').split(' ')
            ],
            analysis = compendium.analyse('I would lack some skills'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - Your lack of skills'] = function(test) {
        var expected = [
                ('PRP$ NN IN NNS').split(' ')
            ],
            analysis = compendium.analyse('Your lack of skills'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - You lack skills'] = function(test) {
        var expected = [
                ('PRP VBP NNS').split(' ')
            ],
            analysis = compendium.analyse('You lack skills'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - I gonna give up'] = function(test) {
        var expected = [
                ('PRP MD TO VB RP').split(' ')
            ],
            analysis = compendium.analyse('I gonna give up'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - I won\'t give up'] = function(test) {
        var expected = [
                ('PRP MD RB VB RP').split(' ')
            ],
            analysis = compendium.analyse('I won\'t give up'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'ll give up'] = function(test) {
        var expected = [
                ('PRP MD VB RP').split(' ')
            ],
            analysis = compendium.analyse('I\'ll give up'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - It will be good'] = function(test) {
        var expected = [
                ('PRP MD VB JJ').split(' ')
            ],
            analysis = compendium.analyse('It will be good'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - Sleepin, rollin, adrenalin, domain'] = function(test) {
        var expected = [
                ('VBG , VBG , NN , NN').split(' ')
            ],
            analysis = compendium.analyse('Sleepin, rollin, adrenalin, domain'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - I will give up'] = function(test) {
        var expected = [
                ('PRP MD VB RP').split(' ')
            ],
            analysis = compendium.analyse('I will give up'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - It\'s good!!!'] = function(test) {
        var expected = [
                ('PRP VBZ JJ .').split(' ')
            ],
            analysis = compendium.analyse('It\'s good!!!'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - This is a great day, I\'ll buy two bottles of beer'] = function(test) {
        var expected = [
                ('DT VBZ DT JJ NN , PRP MD VB CD NNS IN NN').split(' ')
            ],
            analysis = compendium.analyse('This is a great day, I\'ll buy two bottles of beer'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - The bridge has been damaged'] = function(test) {
        var expected = [
                ('DT NN VBZ VBN VBN').split(' ')
            ],
            analysis = compendium.analyse('The bridge has been damaged'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - Show me a trick'] = function(test) {
        var expected = [
                ('VB PRP DT NN').split(' ')
            ],
            analysis = compendium.analyse('Show me a trick'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };
    exports[pkg.mode + ' mode  - store is closed'] = function(test) {
        var expected = [
                ('NN VBZ JJ').split(' ')
            ],
            analysis = compendium.analyse('store is closed'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - you\'re so dumb'] = function(test) {
        var expected = [
                ('PRP VBP RB JJ').split(' ')
            ],
            analysis = compendium.analyse('you\'re so dumb'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - stores are closed'] = function(test) {
        var expected = [
                ('NNS VBP JJ').split(' ')
            ],
            analysis = compendium.analyse('stores are closed'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - Genetically modified food'] = function(test) {
        var expected = [
                ('RB JJ NN').split(' ')
            ],
            analysis = compendium.analyse('Genetically modified food'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - :-)'] = function(test) {
        var expected = [
                ('EM').split(' ')
            ],
            analysis = compendium.analyse(':-)'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    exports[pkg.mode + ' mode  - This is why Mike is an awesome guy'] = function(test) {
        var expected = [
                ('DT VBZ WRB NNP VBZ DT JJ NN').split(' ')
            ],
            analysis = compendium.analyse('This is why Mike is an awesome guy'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };
    exports[pkg.mode + ' mode  - Pierre Vinken, 61 years old, will join the board as a nonexecutive director Nov. 29.'] = function(test) {
        var expected = [
                ('NNP NNP , CD NNS JJ , MD VB DT NN IN DT JJ NN NNP CD .').split(' ')
            ],
            analysis = compendium.analyse('Pierre Vinken, 61 years old, will join the board as a nonexecutive director Nov. 29.'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };

    // 'em is synonym of them, should be PRP
    exports[pkg.mode + ' mode  - If you can\'t beat \'em, join \'em.'] = function(test) {
        var expected = [
                ('IN PRP MD RB VB PRP , VB PRP .').split(' ')
            ],
            analysis = compendium.analyse('If you can\'t beat \'em, join \'em.'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };


    exports[pkg.mode + ' mode  - gah yuck ew eww'] = function(test) {
        var expected = [
                ('UH UH UH UH').split(' ')
            ],
            analysis = compendium.analyse('gah yuck ew eww'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };



    exports[pkg.mode + ' mode  - let\'s go'] = function(test) {
        var expected = [
                ('VB POS VB').split(' ')
            ],
            analysis = compendium.analyse('let\'s go'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };


    exports[pkg.mode + ' mode  - Time Warner\'s HD line up is crap.'] = function(test) {
        var expected = [
                ('NNP NNP POS NNP NN RB VBZ NN .').split(' ')
            ],
            analysis = compendium.analyse('Time Warner\'s HD line up is crap.'),
            actual = [analysis[0].tags];

        test.deepEqual(actual, expected);
        test.done();
    };


    // Test that in minimal mode,
    // plural nouns (that are expunged from the lexicon)
    // are solved using the inflector
    exports[pkg.mode + ' mode  - My heroes are criteria for people.'] = function(test) {
        var expected = [
                ('PRP$ NNS VBP NNS IN NNS .').split(' ')
            ],
            analysis = compendium.analyse('My heroes are criteria for people.'),
            actual = [
                analysis[0].tags
            ];

        test.deepEqual(actual, expected);
        test.done();
    };


});
