/**
 * This node package compîles the french lexicons in compendium.
 * It is used by the gulp build utility.
 */

var sourcePath = __dirname + '/../dictionaries/fr/',

    fullName = 'lexicon.txt',
    minimalName = 'lexicon_10000.txt',

    full,
    minimal,

    fullCompiled,
    minimalCompiled,

    fs = require('fs');

function _refreshSources () {
    full = fs.readFileSync(sourcePath + fullName).toString()
        .split('\\').join('\\\\')
        .split('\t').join(' ')
        .split('\n');

    minimal = fs.readFileSync(sourcePath + minimalName).toString()
        .split('\\').join('\\\\')
        .split('\t').join(' ')
        .split('\n');
};

function _compileFull() {
    fullCompiled = full.splice(1).join('\t');
}

function _compileMinimal() {
    minimalCompiled = minimal.splice(1).join('\t');
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
