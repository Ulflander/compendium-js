

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),

    lexer = compendium.lexer;


    exports[pkg.mode + ' mode  - The quick brown fox jumps over the lazy dog.'] = function(test){
        test.deepEqual(['The quick brown fox jumps over the lazy dog.'],
                        lexer.sentences('The quick brown fox jumps over the lazy dog.'));
        test.done();
    };

    exports[pkg.mode + ' mode  - This is my sentence. This is another sentence.'] = function(test){
        test.deepEqual(['This is my sentence.', 'This is another sentence.'],
                        lexer.sentences('This is my sentence. This is another sentence.'));
        test.done();
    };

    exports[pkg.mode + ' mode  - I am so happy!!! This is an awesome day!!!?!!'] = function(test){
        test.deepEqual(['I am so happy!!!', 'This is an awesome day!!!?!!'],
                        lexer.sentences('I am so happy!!! This is an awesome day!!!?!!'));
        test.done();
    };

    exports[pkg.mode + ' mode  - This is my sentence! This is another sentence? ' +
            'This is a third sentence... And fourth one.'] = function(test){
        test.deepEqual(['This is my sentence!',
                        'This is another sentence?',
                        'This is a third sentence...',
                        'And fourth one.'],

            lexer.sentences('This is my sentence! This is another sentence? ' +
                            'This is a third sentence... And fourth one.'));
        test.done();
    };


    exports[pkg.mode + ' mode  - You love me. But do you love her?? '] = function(test){
        test.deepEqual(['You love me.',
                        'But do you love her?'],

            lexer.sentences('You love me. But do you love her?'));
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m Dr. Jekyll'] = function(test){
        test.deepEqual(['I\'m Dr. Jekyll'],
                        lexer.sentences('I\'m Dr. Jekyll'));
        test.done();
    };

    exports[pkg.mode + ' mode  - Mark Johns Jr., (sen. Al.)'] = function(test){
        test.deepEqual([['Mark', 'Johns', 'Jr.', ',', '(', 'sen.', 'Al.', ')']],
                        lexer.lex('Mark Johns Jr., (sen. Al.)'));
        test.done();
    };


    exports[pkg.mode + ' mode  - Another ex-Golden Stater, Paul [...]'] = function(test){
        test.deepEqual(['Another ex-Golden Stater, Paul Stankowski from Oxnard, is contending for a berth on the U.S. Ryder Cup team after winning his first PGA Tour event last year and staying within three strokes of the lead through three rounds of last month\'s U.S. Open.',
                'H.J. Heinz Company said it completed the sale of its Ore-Ida frozen-food business catering to the service industry to McCain Foods Ltd. for about $500 million.',
                'It\'s the first group action of its kind in Britain and one of only a handful of lawsuits against tobacco companies outside the U.S.',
                'A Paris lawyer last year sued France\'s Seita SA on behalf of two cancer-stricken smokers.',
                'Japan Tobacco Inc. faces a suit from five smokers who accuse the government-owned company of hooking them on an addictive product.'
            ],
            lexer.sentences('Another ex-Golden Stater, Paul Stankowski from Oxnard, is contending for a berth on the U.S. Ryder Cup team after winning his first PGA Tour event last year and staying within three strokes of the lead through three rounds of last month\'s U.S. Open. H.J. Heinz Company said it completed the sale of its Ore-Ida frozen-food business catering to the service industry to McCain Foods Ltd. for about $500 million. ' +
                    'It\'s the first group action of its kind in Britain and one of only a handful of lawsuits against tobacco companies outside the U.S. A Paris lawyer last year sued France\'s Seita SA on behalf of two cancer-stricken smokers. Japan Tobacco Inc. faces a suit from five smokers who accuse the government-owned company of hooking them on an addictive product.'));
        test.done();
    };

    exports[pkg.mode + ' mode  - Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that\'s fine, etc. and you can attend Feb. 8th. Bye'] = function(test) {
        test.deepEqual([
            'Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds.',
            'I hope that\'s fine, etc. and you can attend Feb. 8th.',
            'Bye'
        ], lexer.sentences('Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that\'s fine, etc. and you can attend Feb. 8th. Bye'))
        test.done();
    };

    // Sentences composed of emoticons only should be merged with the
    // previous one if exists
    exports[pkg.mode + ' mode  - It\'s good! 😋'] = function(test){
        test.deepEqual([['It', '\'s', 'good', '!', '😋']],
                        lexer.advanced('It\'s good! 😋').sentences);
        test.done();
    };

    exports[pkg.mode + ' mode  - It\'s good! 😋 :))))'] = function(test){
        test.deepEqual([['It', '\'s', 'good', '!', '😋', ':))))']],
                        lexer.advanced('It\'s good! 😋 :))))').sentences);
        test.done();
    };

});
