
var sourcePath = __dirname + '/../dictionaries/en/',

    outputPath = __dirname + '/../../build/en/',

    fullName = 'lexicon.txt',
    google10000Name = 'google-10000.txt',
    sentimentsName = 'sentiments.txt',

    outputFullName = 'lexicon-full.txt',
    outputMinimalName = 'lexicon-minimal.txt',

    full,
    minimal,
    sentiments,
    crosscheck,

    fullCompiled,
    minimalCompiled,

    fs = require('fs');


function _refreshSources() {
    var j, m;

    full = fs.readFileSync(sourcePath + fullName).toString().split('\n')
    sentiments = fs.readFileSync(sourcePath + sentimentsName).toString().split('\n');

    for (j = 0, m = sentiments.length; j < m; j += 1) {
        sentiments[j] = sentiments[j].split(' ');
    }

    crosscheck = fs.readFileSync(sourcePath + google10000Name).toString().split('\n');
}

function _write() {
    fs.writeFileSync(outputPath + outputMinimalName, minimalCompiled);
    fs.writeFileSync(outputPath + outputFullName, fullCompiled);
}

function _compile() {
    minimalCompiled = [];
    fullCompiled = [];

    var // Use next compendium to filter lexicon
        compendium = require(__dirname + '/../../'),
        i,
        l,
        j,
        sts = [],
        idx,
        line,
        token,
        found,
        skipped = 0,
        skipForMinimal,
        irregularVerbs = compendium.compendium.irregular,
        compendiumTokens = [],
        m;


    for (i in compendium.compendium) {
        if (compendium.compendium.hasOwnProperty(i) && !Array.isArray(compendium.compendium[i]) && typeof compendium.compendium[i] === 'object') {
            for (j in compendium.compendium[i]) {
                if (compendium.compendium[i].hasOwnProperty(j)) {
                    compendiumTokens.push(j);
                }
            }
        }
    }

    for (j = 0, m = sentiments.length; j < m; j += 1) {
        if (sts.indexOf(sentiments[j][0]) === -1) {
            sts.push(sentiments[j][0]);
        } else {
            sts.push('--');
        }
    }

    for (i = 0, l = full.length; i < l; i += 1) {
        if (!full[i]) {
            continue;
        }

        skipForMinimal = false;
        line = full[i].split(' ');
        token = line[0].trim();
        idx = sts.indexOf(token);


        // If no sentiment, and already contained in compendium, skip it
        if (compendiumTokens.indexOf(token) > -1 && (idx === -1 || sts[idx] === '--')) {
            skipped += 1;
            continue;
        }



        // If token has a sentiment score, add it
        if (idx > -1) {
            sts[idx] = '--';

            // If is plural
            if (line[1] === 'NNS') {
                skipped += 1;
                continue;
            }

            line.push(sentiments[idx][1]);

        // otherwise check for minimal mode skipped tokens
        } else {

            // Skip tokens with uppercased chars in minimal mode
            if (token.match(/[A-Z]/g)) {
                skipped += 1;
                skipForMinimal = true;
            }

            // Is a verb in compendium
            if (!skipForMinimal && line[1] === 'VB') {

                // Regular verb
                if (compendium.compendium.verbs.indexOf(token) > -1) {
                    skipped += 1;
                    skipForMinimal = true;
                }
            }

            // All kind of verbs
            if (!skipForMinimal && line[1].indexOf('VB') > -1) {

                // Irregular verbs
                for (found = false, j = 0, m = irregularVerbs.length; j < m; j += 1) {
                    if (irregularVerbs[j].indexOf(token) > -1) {
                        found = true;
                        break;
                    }
                }
                if (!!found) {
                    skipped += 1;
                    skipForMinimal = true;
                }

                if (!skipForMinimal && line[1] === 'VBZ' || line[1] === 'VBZ' || line[1] === 'VBD' || line[1] === 'VBG') {
                    //console.log('skipped', token)
                    skipped += 1;
                    skipForMinimal = true;
                }
            }

            // Taken in account by a rule
            if (!skipForMinimal && token.length > 3 && token.slice(token.length - 2) === 'ed' && line[1] === 'VBN') {
                skipped += 1;
                skipForMinimal = true;
            }

            // Taken in account by a rule
            if (!skipForMinimal && token.length > 3 && token.slice(token.length - 3) === 'ing' && line[1] === 'VBG') {
                skipped += 1;
                skipForMinimal = true;
            }

            // This is the default pos tag, no need
            // ONLY if not blocked term
            if (!skipForMinimal && line[1].indexOf('NN') === 0 && line[1].indexOf('-') === -1) {
                skipped += 1;
                skipForMinimal = true;
            }

            // Taken in account by suffixes
            // no need either
            if (!skipForMinimal && compendium.pos.testSuffixes(token) === line[1]) {
                skipped += 1;
                skipForMinimal = true;
            }

            // Minimal mode: we crosscheck with the 10000 most commons english words
            // and all the nouns
            if (!skipForMinimal && token.match(/[a-z]/g) && token.indexOf('\'') === -1 && crosscheck.indexOf(token) === -1) {
                skipped += 1;
                skipForMinimal = true;
            }
        }

        // Minimal mode: we expunge tokens with uppercase letters
        if (!skipForMinimal && token.toLowerCase() === token && (token.indexOf('-') === -1 || line[1] === 'EM')) {
            minimalCompiled.push(line.join(' '));
        }

        fullCompiled.push(line.join(' '));
    }

    for (j = 0, m = sentiments.length; j < m; j += 1) {
        if (sts[j] !== '--') {
            fullCompiled.push(sentiments[j][0] + ' - ' + sentiments[j][1]);
            minimalCompiled.push(sentiments[j][0] + ' - ' + sentiments[j][1]);
        }
    }

    fullCompiled = fullCompiled.join('\t').split('\\').join('\\\\');
    minimalCompiled = minimalCompiled.join('\t').split('\\').join('\\\\');
}


_refreshSources();

exports.compile = function(refreshSources) {
    if (!!refreshSources) {
        _refreshSources();
    }

    _compile();
    _write();
};

exports.getFullCompiled = function() {
    return fullCompiled;
};

exports.getMinimalCompiled = function() {
    return minimalCompiled;
};
