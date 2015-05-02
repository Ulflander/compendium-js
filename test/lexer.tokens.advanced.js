
var compendium = require('../dist/compendium.minimal.js'),
    lexer = compendium.lexer;


exports['It\'s good 😋 cc @plop #goodfeeling'] = function(test){
    test.deepEqual([['It', '\'s', 'good', '😋', 'cc', '@plop', '#goodfeeling']], 
                    lexer.lex('It\'s good 😋 cc @plop #goodfeeling'));
    test.done();
};

exports['My email is something@ggmail.com (i.e. my email) good?'] = function(test){
    test.deepEqual([['My', 'email', 'is', 'something@ggmail.com', '(', 'i.e.', 'my', 'email', ')', 'good', '?']], 
                    lexer.lex('My email is something@ggmail.com (i.e. my email) good?'));
    test.done();
};

exports['It\'s good 😋 at 255.255.255.0'] = function(test){
    test.deepEqual([['It', '\'s', 'good', '😋', 'at', '255.255.255.0']], 
                    lexer.lex('It\'s good 😋 at 255.255.255.0'));
    test.done();
};

exports['Hey :))))'] = function(test) {
    test.deepEqual([['Hey', ':))))']],
                    lexer.lex('Hey :))))'))
    test.done()
};

exports['Hey :]]]]'] = function(test) {
    test.deepEqual([['Hey', ':]]]]']],
                    lexer.lex('Hey :]]]]'))
    test.done()
};

exports['124.2.2.2'] = function(test){
    test.deepEqual([['124.2.2.2']], 
                    lexer.lex('124.2.2.2'));
    test.done();
};

exports['My ip is 192.168.0.1 good:)?'] = function(test){
    test.deepEqual([['My', 'ip', 'is', '192.168.0.1', 'good', ':)', '?']], 
                    lexer.lex('My ip is 192.168.0.1 good:)?'));
    test.done();
};

exports['The machines are coming for your job @zeynep @nytimes http://www.nytimes.com/2015/04/19/opinion/sunday/the-machines-are-coming.html?ref=opinion&_r=0… #RiseoftheRobots'] = function(test){
    test.deepEqual([['The', 'machines', 'are', 'coming', 'for', 'your', 'job', '@zeynep', '@nytimes', 'http://www.nytimes.com/2015/04/19/opinion/sunday/the-machines-are-coming.html?ref=opinion&_r=0', '…'], ['#RiseoftheRobots']], 
                    lexer.lex('The machines are coming for your job @zeynep @nytimes http://www.nytimes.com/2015/04/19/opinion/sunday/the-machines-are-coming.html?ref=opinion&_r=0… #RiseoftheRobots'));
    test.done();
};

// Test decoding through decoder
exports['[compendium.decode] I &lt;3 Procter &amp; Gamble&#x27;s'] = function(test) {
    test.deepEqual('I <3 Procter & Gamble\'s', compendium.decode('I &lt;3 Procter &amp; Gamble&#x27;s'));
    test.done();
};

// Test decoder through global analysis
exports['[compendium.analysis] I &lt;3 Procter &amp; Gamble&#x27;s'] = function(test) {
    for (var analysis = compendium.analyse('I &lt;3 Procter &amp; Gamble&#x27;s')[0], i = 0, res = []; i < analysis.length; i += 1) {
        res.push(analysis.tokens[i].raw);
    }
    test.deepEqual(['I', '<3', 'Procter', '&', 'Gamble', '\'s'], res);
    test.done();
};
