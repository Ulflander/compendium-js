
var next = require('../dist/next-nlp.minimal.js'),
    lexer = next.lexer;


exports.oneBasicSentence = function(test){
    test.deepEqual([['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.']], 
                    lexer.lex('The quick brown fox jumps over the lazy dog.'));
    test.done();
};

exports.isContractionSentence = function(test){
    test.deepEqual([['It', '\'s', 'good']], 
                    lexer.lex('It\'s good'));
    test.done();
};

exports.isntContractionSentence = function(test){
    test.deepEqual([['It', 'is', 'n\'t', 'good']], 
                    lexer.lex('It isn\'t good'));
    test.done();
};
exports.wontContractionSentence = function(test){
    test.deepEqual([['It', 'wo', 'n\'t', 'be', 'good']], 
                    lexer.lex('It won\'t be good'));
    test.done();
};
exports.cantContractionSentence = function(test){
    test.deepEqual([['It', 'ca', 'n\'t', 'be', 'good']], 
                    lexer.lex('It can\'t be good'));
    test.done();
};
exports.cannotSentence = function(test){
    test.deepEqual([['It', 'can', 'not', 'be', 'good']], 
                    lexer.lex('It cannot be good'));
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
        ['I', 'hope', 'that', '\'s', 'fine', ',', 'etc.', 'and', 'you', 'can', 'attend', 'Feb.', '8th', '.'],
        ['Bye']
    ], lexer.lex('Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds.! I hope that\'s fine, etc. and you can attend Feb. 8th. Bye'))
    test.done();
};
