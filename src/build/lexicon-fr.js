/**
 * This node package compîles the french lexicons in compendium.
 * It is used by the gulp build utility.
 */

var sourcePath = __dirname + '/../dictionaries/fr/',

    outputPath = __dirname + '/../../build/fr/',

    fullName = 'lexicon.txt',
    minimalName = 'lexicon_10000.txt',

    outputFullName = 'lexicon-full.txt',
    outputMinimalName = 'lexicon-minimal.txt',

    full,
    minimal,

    fullCompiled,
    minimalCompiled,

    fs = require('fs');

function _refreshSources () {
    full = _filter(fs.readFileSync(sourcePath + fullName).toString()
        .split('\\').join('\\\\')
        .split('\t').join(' ')
        .split('\n'));

    minimal = _filter(fs.readFileSync(sourcePath + minimalName).toString()
        .split('\\').join('\\\\')
        .split('\t').join(' ')
        .split('\n'));
};

// keep only most frequent words
function _filter(a) {
    var i = 1, l = a.length, line, index = {}, res = [];

    for (; i < l; i += 1) {
        line = a[i].split(' ');
        if (!index.hasOwnProperty(line[0])) {
            index[line[0]] = 1;
            res.push(a[i]);
        }
    }

    return res;
}

function _compileFull() {
    fullCompiled = full.join('\t');
    fs.writeFileSync(outputPath + outputFullName, fullCompiled);
}

function _compileMinimal() {
    minimalCompiled = minimal.join('\t');
    fs.writeFileSync(outputPath + outputMinimalName, minimalCompiled);
}

_refreshSources();
_compileMinimal();
_compileFull();

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
