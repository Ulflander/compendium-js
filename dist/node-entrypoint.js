

var d = __dirname + '/',
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

exports.full = function(language) {
    return _requirePackage(_filepath(language, false));
};

exports.get = exports.full;

exports.minimal = function(language) {
    return _requirePackage(_filepath(language, false));
};
