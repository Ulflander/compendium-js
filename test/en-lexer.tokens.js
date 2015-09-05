

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),

    lexer = compendium.lexer;


    exports[pkg.mode + ' mode  - The quick brown fox jumps over the lazy dog.'] = function(test){
        test.deepEqual([['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', '.']],
                        lexer.lex('The quick brown fox jumps over the lazy dog.', 'en'));
        test.done();
    };

    exports[pkg.mode + ' mode  - If you can\'t beat \'em, join \'em.'] = function(test) {
        test.deepEqual([['If', 'you', 'ca', 'n\'t', 'beat', '\'em', ',', 'join', '\'em', '.']],
                        lexer.lex('If you can\'t beat \'em, join \'em.', 'en'));
        test.done();
    };

    exports[pkg.mode + ' mode  - Here are 5,270.87 bucks'] = function(test){
        test.deepEqual([['Here', 'are', '5,270.87', 'bucks']],
                        lexer.lex('Here are 5,270.87 bucks', 'en'));
        test.done();
    };

    exports[pkg.mode + ' mode  - It\'s good'] = function(test){
        test.deepEqual([['It', '\'s', 'good']],
                        lexer.lex('It\'s good', 'en'));
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m good'] = function(test){
        test.deepEqual([['I', '\'m', 'good']],
                        lexer.lex('I\'m good', 'en'));
        test.done();
    };

    exports[pkg.mode + ' mode  - Feeling kind of low...'] = function(test) {
        test.deepEqual(lexer.lex('Feeling kind of low...', 'en'), [['Feeling', 'kind', 'of', 'low', '...']]);
        test.done();
    };

    exports[pkg.mode + ' mode  - happy!!!!!!'] = function(test) {
        test.deepEqual(lexer.lex('happy!!!!!!', 'en'), [['happy', '!!!!!!']]);
        test.done();
    };

    exports[pkg.mode + ' mode  - It isn\'t good'] = function(test){
        test.deepEqual([['It', 'is', 'n\'t', 'good']],
                        lexer.lex('It isn\'t good', 'en'));
        test.done();
    };
    exports[pkg.mode + ' mode  - It won\'t be good'] = function(test){
        test.deepEqual([['It', 'wo', 'n\'t', 'be', 'good']],
                        lexer.lex('It won\'t be good', 'en'));
        test.done();
    };
    exports[pkg.mode + ' mode  - It can\'t be good'] = function(test){
        test.deepEqual([['It', 'ca', 'n\'t', 'be', 'good']],
                        lexer.lex('It can\'t be good', 'en'));
        test.done();
    };
    exports[pkg.mode + ' mode  - It cannot be good'] = function(test){
        test.deepEqual([['It', 'can', 'not', 'be', 'good']],
                        lexer.lex('It cannot be good', 'en'));
        test.done();
    };

    exports[pkg.mode + ' mode  - This newspaper sells more than 170,000'] = function(test) {
        test.deepEqual([['This', 'newspaper', 'sells', 'more', 'than', '170,000']],
                        lexer.lex('This newspaper sells more than 170,000', 'en'));
        test.done();
    };

    exports[pkg.mode + ' mode  - Welcome in the U.S. my friend!!'] = function(test){
        test.deepEqual([['Welcome', 'in', 'the', 'U.S.', 'my', 'friend', '!!']],
                        lexer.lex('Welcome in the U.S. my friend!!', 'en'));
        test.done();
    };

    exports[pkg.mode + ' mode  - I shouldn\'t solely work, I should hard work'] = function(test){
        test.deepEqual([['I', 'should', 'n\'t', 'solely', 'work', ',', 'I', 'should', 'hard', 'work']],
                        lexer.lex('I shouldn\'t solely work, I should hard work', 'en'));
        test.done();
    };

    exports[pkg.mode + ' mode  - This will cost you US$589.05, almost 600€ or 400£ - 11100¥'] = function(test){
        test.deepEqual([['This', 'will', 'cost', 'you', 'US', '$', '589.05', ',', 'almost', '600', '€', 'or', '400', '£', '-', '11100', '¥']],
                        lexer.lex('This will cost you US$589.05, almost 600€ or 400£ - 11100¥', 'en'));
        test.done();
    };

    exports[pkg.mode + ' mode  - Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds.! I hope that\'s fine, etc. and you can attend Feb. 8th. Bye'] = function(test){
        test.deepEqual([
            ['Hi', 'there', 'Dr.', 'Joe', ',', 'the', 'price', 'is', '4.59', 'for', 'N.A.S.A.', 'Ph.', 'Ds.', '!'],
            ['I', 'hope', 'that', '\'s', 'fine', ',', 'etc.', 'and', 'you', 'can', 'attend', 'Feb.', '8th', '.'],
            ['Bye']
        ], lexer.lex('Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds.! I hope that\'s fine, etc. and you can attend Feb. 8th. Bye', 'en'))
        test.done();
    };

    exports[pkg.mode + ' mode  - I\'m \'saudi\''] = function(test) {
        test.deepEqual([['I', '\'m', '\'', 'saudi', '\'']], lexer.lex('I\'m \'saudi\'', 'en'));
        test.done();
    };

    // Test smartquotes replacement + entity detection between quotes
    // https://github.com/Ulflander/compendium-js/issues/1
    exports[pkg.mode + ' mode  - I just started using a package called \"Compendium\" and find that it works quite well.'] = function(test){
        var analysis = compendium.analyse('I just started using a package called \"Compendium\" and find that it works quite well.', 'en');

        test.equal(analysis[0].tokens[7].raw, '"');
        test.notEqual(analysis[0].tokens[8].attr.entity, -1);
        test.equal(analysis[0].tokens[9].raw, '"');
        test.done();
    };
    exports[pkg.mode + ' mode  - I just started using a package called “Compendium” and find that it works quite well.'] = function(test){
        var analysis = compendium.analyse('I just started using a package called “Compendium” and find that it works quite well.', 'en');

        test.equal(analysis[0].tokens[7].raw, '"');
        test.notEqual(analysis[0].tokens[8].attr.entity, -1);
        test.equal(analysis[0].tokens[9].raw, '"');
        test.done();
    };
    exports[pkg.mode + ' mode  - I just started using a package called ‘Compendium’ and find that it works quite well.'] = function(test){
        var analysis = compendium.analyse('I just started using a package called ‘Compendium’ and find that it works quite well.', 'en');

        test.equal(analysis[0].tokens[7].raw, "'");
        test.notEqual(analysis[0].tokens[8].attr.entity, -1);
        test.equal(analysis[0].tokens[9].raw, "'");
        test.done();
    };


    // ill is at the end of the sentence, it's not an abbr
    exports[pkg.mode + ' mode  - He was ill.'] = function(test) {
        var analysis = compendium.analyse('He was ill.', 'en');
        test.equal(analysis[0].tokens[2].norm, 'ill');
        test.equal(analysis[0].tokens[3].pos, '.');
        test.done();
    };


    exports[pkg.mode + ' mode  - It\'s good 😋 cc @plop #goodfeeling'] = function(test){
        test.deepEqual([['It', '\'s', 'good', '😋', 'cc', '@plop', '#goodfeeling']],
                        lexer.lex('It\'s good 😋 cc @plop #goodfeeling'));
        test.done();
    };

    exports[pkg.mode + ' mode  - My email is something@ggmail.com (i.e. my email) good?'] = function(test){
        test.deepEqual([['My', 'email', 'is', 'something@ggmail.com', '(', 'i.e.', 'my', 'email', ')', 'good', '?']],
                        lexer.lex('My email is something@ggmail.com (i.e. my email) good?'));
        test.done();
    };

    exports[pkg.mode + ' mode  - It\'s good 😋 at 255.255.255.0'] = function(test){
        test.deepEqual([['It', '\'s', 'good', '😋', 'at', '255.255.255.0']],
                        lexer.lex('It\'s good 😋 at 255.255.255.0'));
        test.done();
    };

    exports[pkg.mode + ' mode  - I don\'t want to get into inter-sport debate'] = function(test) {
        test.deepEqual([['I', 'do', 'n\'t', 'want', 'to', 'get', 'into', 'inter-sport', 'debate']],
                lexer.lex('I don\'t want to get into inter-sport debate'));
        test.done();
    };

    exports[pkg.mode + ' mode  - S&P 500'] = function(test) {
        test.deepEqual([['S&P', '500']],
                        lexer.lex('S&P 500'))
        test.done()
    };

    exports[pkg.mode + ' mode  - Hey :))))'] = function(test) {
        test.deepEqual([['Hey', ':))))']],
                        lexer.lex('Hey :))))'))
        test.done()
    };

    exports[pkg.mode + ' mode  - Hey :]]]]'] = function(test) {
        test.deepEqual([['Hey', ':]]]]']],
                        lexer.lex('Hey :]]]]'))
        test.done()
    };

    exports[pkg.mode + ' mode  - 124.2.2.2'] = function(test){
        test.deepEqual([['124.2.2.2']],
                        lexer.lex('124.2.2.2'));
        test.done();
    };

    exports[pkg.mode + ' mode  - My ip is 192.168.0.1 good:)?'] = function(test){
        test.deepEqual([['My', 'ip', 'is', '192.168.0.1', 'good', ':)', '?']],
                        lexer.lex('My ip is 192.168.0.1 good:)?'));
        test.done();
    };

    exports[pkg.mode + ' mode  - The machines are coming for your job @zeynep @nytimes http://www.nytimes.com/2015/04/19/opinion/sunday/the-machines-are-coming.html?ref=opinion&_r=0… #RiseoftheRobots'] = function(test){
        test.deepEqual([['The', 'machines', 'are', 'coming', 'for', 'your', 'job', '@zeynep', '@nytimes', 'http://www.nytimes.com/2015/04/19/opinion/sunday/the-machines-are-coming.html?ref=opinion&_r=0', '…'], ['#RiseoftheRobots']],
                        lexer.lex('The machines are coming for your job @zeynep @nytimes http://www.nytimes.com/2015/04/19/opinion/sunday/the-machines-are-coming.html?ref=opinion&_r=0… #RiseoftheRobots'));
        test.done();
    };

    // Test decoding through decoder
    exports[pkg.mode + ' mode  - [compendium.decode] I &lt;3 Procter &amp; Gamble&#x27;s'] = function(test) {
        test.deepEqual('I <3 Procter & Gamble\'s', compendium.decode('I &lt;3 Procter &amp; Gamble&#x27;s'));
        test.done();
    };

    // Test decoder through global analysis
    exports[pkg.mode + ' mode  - [compendium.analysis] I &lt;3 Procter &amp; Gamble&#x27;s'] = function(test) {
        for (var analysis = compendium.analyse('I &lt;3 Procter &amp; Gamble&#x27;s')[0], i = 0, res = []; i < analysis.length; i += 1) {
            res.push(analysis.tokens[i].raw);
        }
        test.deepEqual(['I', '<3', 'Procter', '&', 'Gamble', '\'s'], res);
        test.done();
    };

});
