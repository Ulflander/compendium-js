
var next = require('../dist/next-nlp.minimal.js'),
    lexer = next.lexer;


exports.oneBasicSentence = function(test){
    test.deepEqual(['The quick brown fox jumps over the lazy dog.'], 
                    lexer.sentences('The quick brown fox jumps over the lazy dog.'));
    test.done();
};

exports.twoBasicSentences = function(test){
    test.deepEqual(['This is my sentence.', 'This is another sentence.'], 
                    lexer.sentences('This is my sentence. This is another sentence.'));
    test.done();
};

exports.commonSentenceSeparators = function(test){
    test.deepEqual(['This is my sentence!', 
                    'This is another sentence?', 
                    'This is a third sentence...', 
                    'And fourth one.'], 

        lexer.sentences('This is my sentence! This is another sentence? ' +
                        'This is a third sentence... And fourth one.'));
    test.done();
};

exports.basicAbbrevationOneSentence = function(test){
    test.deepEqual(['I\'m Dr. Jekyll'], 
                    lexer.sentences('I\'m Dr. Jekyll'));
    test.done();
};

exports.stanfordNlpExample = function(test){
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

exports.trickyOne = function(test) {
    test.deepEqual([
        'Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds.',
        'I hope that\'s fine, etc. and you can attend Feb. 8th.',
        'Bye'
    ], lexer.sentences('Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that\'s fine, etc. and you can attend Feb. 8th. Bye'))
    test.done();
}