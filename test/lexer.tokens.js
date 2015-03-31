
var next = require('../dist/next-nlp.minimal.js'),
    lexer = next.lexer;


exports.oneBasicSentence = function(test){
    test.deepEqual([['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.']], 
                    lexer.lex('The quick brown fox jumps over the lazy dog.'));
    test.done();
};


exports.oneAcronymSentence = function(test){
    test.deepEqual([['Welcome', 'in', 'the', 'U.S.', 'my', 'friend', '!!']], 
                    lexer.lex('Welcome in the U.S. my friend!!'));
    test.done();
};


exports.currenciesAndNumbersSentence = function(test){
    test.deepEqual([['This', 'will', 'cost', 'you', 'US', '$', '589.05', ',', 'almost', '600', '€', 'or', '400', '£', '-', '11100', '¥']], 
                    lexer.lex('This will cost you US$589.05, almost 600€ or 400£ - 11100¥'));
    test.done();
};



exports.tricky = function(test){
    test.deepEqual([
        ['Hi', 'there', 'Dr.', 'Joe', ',', 'the', 'price', 'is', '4.59', 'for', 'N.A.S.A.', 'Ph.', 'Ds.', '!'],
        ['I', 'hope', 'that', '\'', 's', 'fine', ',', 'etc.', 'and', 'you', 'can', 'attend', 'Feb.', '8th', '.'],
        ['Bye']
    ], lexer.lex('Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds.! I hope that\'s fine, etc. and you can attend Feb. 8th. Bye'))
    test.done();
};
