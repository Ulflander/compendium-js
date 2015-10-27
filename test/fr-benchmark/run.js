/*

Run PoS test against nicolas hernandez french tree bank

Result history:
- October 20th: Full: 84.28%

- October 27th: Full: 76.65%
Reduce size of corpus to first 5000 entries



*/

var data = require("./corpus.json"),
    compendium = require(__dirname + '/../../build/compendium-fr.js'),
    toPoSArray = function(arr) {
        var res = [], i, l = arr.length;
        for (i = 0; i < l; i += 1) {
            if (arr[i] && arr[i].pos.match(/^[0-9]+$/g)) {
                res.push('CD');
            } else {
                res.push(arr[i].pos);
            }
        }
        //res.push('.');
        return res
    }, cleanup = function(txt) {
        txt = txt.split(/[,:;]/g).join('').split('\'s').join('');
        if (txt.indexOf('\'\' ') === 0) {
            txt = txt.slice(3);
        }
        if (txt.indexOf('-- ') === 0) {
            txt = txt.slice(3);
        }
        return txt.trim().replace(/(\s+)/g, ' ');
    },

    errors = {};

// Counters
var cTotal = 0;
var cFailed = 0;
var cSuccess = 0;
var cTotalConfidence = 0;
var cTotalTime = 0;
var failures = {
    len: 0,
    tags: 0
};
var cTotalTags = 0;
var cSuccessTags = 0;
var tokensPos = {};

for (var k in data) {

    //if( k==1000) break;
    cTotal += 1;
    // First reconstruct PoS array from Penn treebank so we can compare easily
    // (also add final punc sign)
    var penn_pos = toPoSArray(data[k].pos),
        //text = cleanup(data[k].text),
        text = data[k].text,
        cpd_pos;
    //console.log(text);
    cpd_pos = compendium.analyse(text)[0];
    cTotalConfidence += cpd_pos.confidence;
    cTotalTime += cpd_pos.time;

    var i, j, m = penn_pos.length, tags = cpd_pos.tags, n = tags.length, failed = false;


    if (m !== n) {
        cFailed += 1;
        failures.len += 1;

        continue;
    }
    var poslog1 = '',
        poslog2 = '';

    for (i = 0; i < m; i += 1) {
        var tk = cpd_pos.tokens[i].raw;
        cTotalTags += 1;

        if (!tokensPos.hasOwnProperty(tk)) {
            tokensPos[tk] = [penn_pos[i]];
        } else if (tokensPos[tk].indexOf(penn_pos[i]) === -1) {
            tokensPos[tk].push(penn_pos[i]);
        }

        // Exceptions where difference between penn / compendium is
        // accepted (different tagging style)
        if ((tags[i] === '$' && penn_pos[i] === 'CD') ||
            (tags[i] === 'SYM' && tk === '%') ||
            (tags[i] === 'ADJ:dem' && penn_pos[i] === "ART") ||
            (tags[i] === 'PRO:per' && penn_pos[i] === "CLS") ||
            (tags[i].match(/^ADJ/) && penn_pos[i] === "ADJ") ||
            (tags[i].match(/^ART/) && penn_pos[i] === "ART") ||
            (tags[i].match(/:pos$/) && penn_pos[i] === "ART") ||
            (tags[i].match(/^VER:/) && penn_pos[i] === "V") ||
            (tags[i].match(/^AUX:/) && penn_pos[i] === "VPR") ||
            (tags[i].match(/^AUX:/) && penn_pos[i] === "V") ||
            (tags[i].match(/^PRO:/) && penn_pos[i] === "PRO") ||
            (tags[i].match(/^AUX:par:pas/) && penn_pos[i] === "VPP") ||
            (tags[i].match(/^VER:par:pas/) && penn_pos[i] === "VPP") ||
            (tags[i].match(/^AUX:par:pres/) && penn_pos[i] === "VPR") ||
            (tags[i].match(/^VER:par:pres/) && penn_pos[i] === "VPR") ||
            (tags[i].match(/^PRO:per/) && penn_pos[i] === "CLR") ||
            (tags[i].match(/:/) && penn_pos[i] === "PONC") ||
            (tags[i].match(/;/) && penn_pos[i] === "PONC")

            // skip NP and NC debate
            //(tags[i] === "NP" && penn_pos[i] === "NC")
            ) {
            cSuccessTags += 1;
        } else
        if (penn_pos[i] !== tags[i]) {
            failed = true;

            if (i > 2 && i < m - 2) {
                tk = cpd_pos.tokens[i].raw + ':' + tags[i] + '>' + penn_pos[i];
                var contextExample = cpd_pos.tokens[i - 2].raw + ' ' + cpd_pos.tokens[i - 1].raw + ' ' + cpd_pos.tokens[i].raw + ' ' + cpd_pos.tokens[i + 1].raw + ' ' + cpd_pos.tokens[i + 2].raw;
                if (errors.hasOwnProperty(tk)) {
                    errors[tk].c += 1;
                    if (errors[tk].context.length < 100 || Math.random() < 0.1) {
                        errors[tk].context += ' | ' + contextExample;
                        errors[tk].should_be += ' | ' + penn_pos[i];
                    }
                 } else {
                    errors[tk] = {
                        token: cpd_pos.tokens[i].raw,
                        c: 1,
                        context: contextExample,
                        should_be: penn_pos[i]
                    };
                }
            }
        } else {
            cSuccessTags += 1;
        }
        poslog1 += penn_pos[i] + ' ';
        poslog2 += tags[i] + ' ';
    }

    if (failed) {
        cFailed += 1;
        failures.tags += 1;
    } else {
        cSuccess += 1;
    }
}

// Put errors in an array
var errors_arr = [];
for (k in errors) {
    if (tokensPos[errors[k].token].length === 1) {
        errors_arr.push({
            tags: tokensPos[errors[k].token],
            key: k,
            score: errors[k].c,
            context: errors[k].context,
            should_be: errors[k].should_be,
        });
    }
}
// Order by score
errors_arr.sort(function(a, b) {
    return b.score - a.score;
});

// Display five more common errors
for (i = 0; i < 20; i += 1) {
    if (!!errors_arr[i]) {
        console.log(errors_arr[i]);
    }
}

// Final
console.log('Tags recognized: ', (cSuccessTags * 100 / cTotalTags) + '% on ', cTotal - failures.len ,' sentences (', cSuccess , ' fully good)');
console.log('Average time: ', cTotalTime / cTotal);


