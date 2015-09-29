

var d = __dirname + '/',
    fs = require('fs'),
    packages = {};

function _filepath(language, isMinimal) {
    return d + 'compendium' + (language === 'en' ? '' : '-' + language) + (isMinimal ? '.minimal' : '') + '.js';
};

function _requirePackage(filepath) {
    if (!packages.hasOwnProperty(filepath)) {
        packages[filepath] = require(filepath);
    }
    return packages[filepath];
};

function _load(dataset, cb) {
    fs.readFile(d + 'data/' + dataset + '.txt', 'utf8', cb);
};

exports.augment = function(compendium, cb) {
    _load('places', function(err, data) {
        if (err) {
            console.warn(err);
            return;
        }
        var i = 0;
        data.split('\n').forEach(function(p) {
            if (p.indexOf(' ') > -1 || !compendium.lexicon.hasOwnProperty(p)) {
                compendium.register(p, 'NNP');
                i += 1;
            }
        });
        console.log(i, 'places registered')
        if (!!cb) {
            cb()
        }
    })
    return compendium;
}

exports.full = function(language) {
    return _requirePackage(_filepath(language, false));
};

exports.get = exports.full;

exports.minimal = function(language) {
    return _requirePackage(_filepath(language, false));
};
