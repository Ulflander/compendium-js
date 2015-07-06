
var compendium = require('../dist/compendium.minimal.js'),
    lexer = compendium.lexer;


exports['The quick brown fox jumps over the lazy dog.'] = function(test){
    test.deepEqual([['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.']],
                    lexer.lex('The quick brown fox jumps over the lazy dog.', 'en'));
    test.done();
};

exports['If you can\'t beat \'em, join \'em.'] = function(test) {
    test.deepEqual([['If', 'you', 'ca', 'n\'t', 'beat', '\'em', ',', 'join', '\'em', '.']],
                    lexer.lex('If you can\'t beat \'em, join \'em.', 'en'));
    test.done();
};

exports['It\'s good'] = function(test){
    test.deepEqual([['It', '\'s', 'good']],
                    lexer.lex('It\'s good', 'en'));
    test.done();
};

exports['I\'m good'] = function(test){
    test.deepEqual([['I', '\'m', 'good']],
                    lexer.lex('I\'m good', 'en'));
    test.done();
};

exports['Feeling kind of low...'] = function(test) {
    test.deepEqual(lexer.lex('Feeling kind of low...', 'en'), [['Feeling', 'kind', 'of', 'low', '...']]);
    test.done();
};

exports['happy!!!!!!'] = function(test) {
    test.deepEqual(lexer.lex('happy!!!!!!', 'en'), [['happy', '!!!!!!']]);
    test.done();
};

exports['It isn\'t good'] = function(test){
    test.deepEqual([['It', 'is', 'n\'t', 'good']],
                    lexer.lex('It isn\'t good', 'en'));
    test.done();
};
exports['It won\'t be good'] = function(test){
    test.deepEqual([['It', 'wo', 'n\'t', 'be', 'good']],
                    lexer.lex('It won\'t be good', 'en'));
    test.done();
};
exports['It can\'t be good'] = function(test){
    test.deepEqual([['It', 'ca', 'n\'t', 'be', 'good']],
                    lexer.lex('It can\'t be good', 'en'));
    test.done();
};
exports['It cannot be good'] = function(test){
    test.deepEqual([['It', 'can', 'not', 'be', 'good']],
                    lexer.lex('It cannot be good', 'en'));
    test.done();
};

exports['This newspaper sells more than 170,000'] = function(test) {
    test.deepEqual([['This', 'newspaper', 'sells', 'more', 'than', '170,000']],
                    lexer.lex('This newspaper sells more than 170,000', 'en'));
    test.done();
};

exports['Welcome in the U.S. my friend!!'] = function(test){
    test.deepEqual([['Welcome', 'in', 'the', 'U.S.', 'my', 'friend', '!!']],
                    lexer.lex('Welcome in the U.S. my friend!!', 'en'));
    test.done();
};

exports['I shouldn\'t solely work, I should hard work'] = function(test){
    test.deepEqual([['I', 'should', 'n\'t', 'solely', 'work', ',', 'I', 'should', 'hard', 'work']],
                    lexer.lex('I shouldn\'t solely work, I should hard work', 'en'));
    test.done();
};

exports['This will cost you US$589.05, almost 600€ or 400£ - 11100¥'] = function(test){
    test.deepEqual([['This', 'will', 'cost', 'you', 'US', '$', '589.05', ',', 'almost', '600', '€', 'or', '400', '£', '-', '11100', '¥']],
                    lexer.lex('This will cost you US$589.05, almost 600€ or 400£ - 11100¥', 'en'));
    test.done();
};

exports['Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds.! I hope that\'s fine, etc. and you can attend Feb. 8th. Bye'] = function(test){
    test.deepEqual([
        ['Hi', 'there', 'Dr.', 'Joe', ',', 'the', 'price', 'is', '4.59', 'for', 'N.A.S.A.', 'Ph.', 'Ds.', '!'],
        ['I', 'hope', 'that', '\'s', 'fine', ',', 'etc.', 'and', 'you', 'can', 'attend', 'Feb.', '8th', '.'],
        ['Bye']
    ], lexer.lex('Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds.! I hope that\'s fine, etc. and you can attend Feb. 8th. Bye', 'en'))
    test.done();
};

exports['I\'m \'saudi\''] = function(test) {
    test.deepEqual([['I', '\'m', '\'', 'saudi', '\'']], lexer.lex('I\'m \'saudi\'', 'en'));
    test.done();
};

// Test smartquotes replacement + entity detection between quotes
// https://github.com/Ulflander/compendium-js/issues/1
exports['I just started using a package called \"Compendium\" and find that it works quite well.'] = function(test){
    var analysis = compendium.analyse('I just started using a package called \"Compendium\" and find that it works quite well.', 'en');

    test.equal(analysis[0].tokens[7].raw, '"');
    test.notEqual(analysis[0].tokens[8].attr.entity, -1);
    test.equal(analysis[0].tokens[9].raw, '"');
    test.done();
};
exports['I just started using a package called “Compendium” and find that it works quite well.'] = function(test){
    var analysis = compendium.analyse('I just started using a package called “Compendium” and find that it works quite well.', 'en');

    test.equal(analysis[0].tokens[7].raw, '"');
    test.notEqual(analysis[0].tokens[8].attr.entity, -1);
    test.equal(analysis[0].tokens[9].raw, '"');
    test.done();
};
exports['I just started using a package called ‘Compendium’ and find that it works quite well.'] = function(test){
    var analysis = compendium.analyse('I just started using a package called ‘Compendium’ and find that it works quite well.', 'en');

    test.equal(analysis[0].tokens[7].raw, "'");
    test.notEqual(analysis[0].tokens[8].attr.entity, -1);
    test.equal(analysis[0].tokens[9].raw, "'");
    test.done();
};


// ill is at the end of the sentence, it's not an abbr
exports['He was ill.'] = function(test) {
    var analysis = compendium.analyse('He was ill.', 'en');
    test.equal(analysis[0].tokens[2].norm, 'ill');
    test.equal(analysis[0].tokens[3].pos, '.');
    test.done();
};
