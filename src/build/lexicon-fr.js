/**
 * This node package compîles the french lexicons in compendium.
 * It is used by the gulp build utility.
 */

var sourcePath = __dirname + '/../dictionaries/fr/',

    outputPath = __dirname + '/../../build/fr/',

    fullName = 'lexicon.txt',
    minimalName = 'lexicon_10000.txt',
    manualName = 'lexicon_manual.txt',
    sentimentsName = 'sentiments.txt',

    outputFullName = 'lexicon-full.txt',
    outputMinimalName = 'lexicon-minimal.txt',

    full,
    minimal,
    sentiments,

    fullCompiled,
    minimalCompiled,

    fs = require('fs');

function _addSentimentScores(a) {
    var i = 0, l = a.length, token, pos;
    for (; i < l; i += 1) {
        token = a[i].split(' ')[0];
        pos = a[i].split(' ')[1];
        // Exclude adverbs (pas, vraiment...)
        if (pos !== 'ADV' && sentiments.hasOwnProperty(token)) {
            a[i] += ' ' + sentiments[token];
        }
    }
    return a;
};

function _refreshSources () {
    full = _filter(fs.readFileSync(sourcePath + fullName).toString()
        .split('\\').join('\\\\')
        .split('\t').join(' ')
        .split('\n'), 1);

    minimal = _filter(fs.readFileSync(sourcePath + minimalName).toString()
        .split('\\').join('\\\\')
        .split('\t').join(' ')
        .split('\n'), 1);

    var sentimentsArray = fs.readFileSync(sourcePath + sentimentsName).toString()
        .split('\n')
        .map(function(v) {
            return v.split(' ');
        });

    sentiments = {};
    sentimentsArray.forEach(function(v) {
        sentiments[v[0]] = v[1];
    })

    var common = _filter(fs.readFileSync(sourcePath + manualName).toString()
        .split('\\').join('\\\\')
        .split('\t').join(' ')
        .split('\n'), 0);

    full = _addSentimentScores(full.concat(common));
    minimal = _addSentimentScores(minimal.concat(common));
};

// keep only most frequent words
function _filter(a, startIndex) {
    var i = startIndex, l = a.length, line, index = {}, res = [];

    for (; i < l; i += 1) {
        line = a[i].split(' ');

        if (line.length < 2) {
            continue;
        }

        if (!index.hasOwnProperty(line[0])) {
            index[line[0]] = 1;
            res.push(_adapt(a[i]));
        }
    }

    return res;
}

// adapt lines to fit needs
function _adapt(a) {
    var line = a.split(' '), t, first, attr;

    //concatenate 4_cgram and 11_infover for verbs
    //line 11_infover contains
    //mode:temp:pers
    //in some cases, it can be composed of several mode:temp:pers;mode:temp:pers
    //We only keep in the lexicon the two first instance of mode and temp

    if(line[1] == 'VER'){
      attr = [];
      all = line[2].split(';');
      first = all[0].split(':');
      //save mode
      attr.push(first[0]);
      //save temp
      attr.push(first[1])
      line[1]+=':'+attr.join(':');
    }
    //remove 11_infover
    line[2] = line[3];
    line.pop();

    return line.join(' ');
}

function _compileFull() {
    fullCompiled = full.join('\t');
    fs.writeFileSync(outputPath + outputFullName, fullCompiled);
}

function _compileMinimal() {
    minimalCompiled = minimal.join('\t');
    fs.writeFileSync(outputPath + outputMinimalName, minimalCompiled);
}


exports.compile = function(refreshSources) {
    if (!!refreshSources) {
        _refreshSources();
    }

    _compileFull();
    _compileMinimal();
};

exports.getFullCompiled = function() {
    return fullCompiled;
};

exports.getMinimalCompiled = function() {
    return minimalCompiled;
};

_refreshSources()
_compileFull()
_compileMinimal()
