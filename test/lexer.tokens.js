
var compendium = require('../dist/compendium.minimal.js'),
    lexer = compendium.lexer;


exports['The quick brown fox jumps over the lazy dog.'] = function(test){
    test.deepEqual([['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.']], 
                    lexer.lex('The quick brown fox jumps over the lazy dog.'));
    test.done();
};

exports['It\'s good'] = function(test){
    test.deepEqual([['It', '\'s', 'good']], 
                    lexer.lex('It\'s good'));
    test.done();
};
exports['It\'s good 😋'] = function(test){
    test.deepEqual([['It', '\'s', 'good', '😋']], 
                    lexer.lex('It\'s good 😋'));
    test.done();
};
exports['I\'m good'] = function(test){
    test.deepEqual([['I', '\'m', 'good']], 
                    lexer.lex('I\'m good'));
    test.done();
};

exports['Feeling kind of low...'] = function(test) {
    test.deepEqual(lexer.lex('Feeling kind of low...'), [['Feeling', 'kind', 'of', 'low', '...']]);
    test.done();
};

exports['happy!!!!!!'] = function(test) {
    test.deepEqual(lexer.lex('happy!!!!!!'), [['happy', '!!!!!!']]);
    test.done();
};

exports['It isn\'t good'] = function(test){
    test.deepEqual([['It', 'is', 'n\'t', 'good']], 
                    lexer.lex('It isn\'t good'));
    test.done();
};
exports['It won\'t be good'] = function(test){
    test.deepEqual([['It', 'wo', 'n\'t', 'be', 'good']], 
                    lexer.lex('It won\'t be good'));
    test.done();
};
exports['It can\'t be good'] = function(test){
    test.deepEqual([['It', 'ca', 'n\'t', 'be', 'good']], 
                    lexer.lex('It can\'t be good'));
    test.done();
};
exports['It cannot be good'] = function(test){
    test.deepEqual([['It', 'can', 'not', 'be', 'good']], 
                    lexer.lex('It cannot be good'));
    test.done();
};

exports['Welcome in the U.S. my friend!!'] = function(test){
    test.deepEqual([['Welcome', 'in', 'the', 'U.S.', 'my', 'friend', '!!']], 
                    lexer.lex('Welcome in the U.S. my friend!!'));
    test.done();
};

exports['I shouldn\'t solely work, I should hard work'] = function(test){
    test.deepEqual([['I', 'should', 'n\'t', 'solely', 'work', ',', 'I', 'should', 'hard', 'work']], 
                    lexer.lex('I shouldn\'t solely work, I should hard work'));
    test.done();
};

exports['This will cost you US$589.05, almost 600€ or 400£ - 11100¥'] = function(test){
    test.deepEqual([['This', 'will', 'cost', 'you', 'US', '$', '589.05', ',', 'almost', '600', '€', 'or', '400', '£', '-', '11100', '¥']], 
                    lexer.lex('This will cost you US$589.05, almost 600€ or 400£ - 11100¥'));
    test.done();
};

exports['Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds.! I hope that\'s fine, etc. and you can attend Feb. 8th. Bye'] = function(test){
    test.deepEqual([
        ['Hi', 'there', 'Dr.', 'Joe', ',', 'the', 'price', 'is', '4.59', 'for', 'N.A.S.A.', 'Ph.', 'Ds.', '!'],
        ['I', 'hope', 'that', '\'s', 'fine', ',', 'etc.', 'and', 'you', 'can', 'attend', 'Feb.', '8th', '.'],
        ['Bye']
    ], lexer.lex('Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds.! I hope that\'s fine, etc. and you can attend Feb. 8th. Bye'))
    test.done();
};
