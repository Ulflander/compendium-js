/*

Run PoS test against penn treebank

JSON file took from nlp_compromise (thanks!).

It's good to note that some of the Penn Treebank dataset sentences are not perfectly tagged, so measure 
of deviation from Penn Treebank is quite subjective, as Compendium may be good where Penn is wrong 
(in a VERY little measure). Examples of Penn errors:

Too much money is at stake for program traders to give up. - give/VB up/IN where it should be give/VB up/RP

Result history:
- April 15th: Minimal: 88.76% / Full: 90.13%
- April 15th: Minimal: 89.35% / Full: 90.56%
- April 15th: Minimal: 89.91% / Full: 92.34%
- April 15th: Minimal: 90.59% / Full: 92.29%
     > makes sense but interesting: new brill rules provided a great improvement in minimal
       mode but a slight decline in full mode - this is the limit of rules over a lexicon

- April 17th, 1959 sentences: 
    Minimal:    90.65% exact tags, 352 exact sentences, 0.36ms ave. per sentence
    Full:       92.74% exact tags, 518 exact sentences, 0.72ms ave. per sentence


*/

var data = require("./penn_treebank").data,
    compendium = require('../build/compendium.minimal.js'),
    toPoSArray = function(arr) {
        var res = [], i, l = arr.length;
        for (i = 0; i < l; i += 1) {
            if (arr[i].pos.match(/^[0-9]+$/g)) {
                res.push('CD');
            } else {
                res.push(arr[i].pos);
            }
        }
        res.push('.');
        return res
    }, cleanup = function(txt) {
        txt = txt.split(/[,:;]/g).join('');
        if (txt.indexOf('\'\' ') === 0) {
            txt = txt.slice(3);
        }
        if (txt.indexOf('-- ') === 0) {
            txt = txt.slice(3);
        }
        return txt.trim().replace(/(\s+)/g, ' ');
    },

    DIFFS = {};

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

for (var k in data) {
    cTotal += 1;

    // First reconstruct PoS array from Penn treebank so we can compare easily
    // (also add final punc sign)
    var penn_pos = toPoSArray(data[k].pos),
        text = cleanup(data[k].text),
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
        cTotalTags += 1;
        if (penn_pos[i] !== tags[i]) {
            failed = true;
            var tk = cpd_pos.tokens[i].norm;

            if (tk.length > 6 && penn_pos[i].indexOf('VB') == -1) {
            var d = penn_pos[i] + '/' + tags[i] + ' - ' + tk.slice(-5);

                if (DIFFS.hasOwnProperty(d)) {
                    DIFFS[d] += 1;
                } else {
                    DIFFS[d] = 1;
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
        //console.log(text + '\n' + cpd_pos.raw)
        //console.log(poslog1 + '\n' + poslog2)
    } else {
        cSuccess += 1;
    }
}

// Put diffs in an array
var diffs_arr = [];
for (k in DIFFS) {
    if (DIFFS[k] > 2 && k.indexOf('NN') === -1) {
        diffs_arr.push({
            tags: k,
            score: DIFFS[k]
        });
    }
}
// Order by score
diffs_arr.sort(function(a, b) {
    return b.score - a.score;
});
for (i = 0; i < 10; i += 1) {
    console.log(diffs_arr[i]);
}


// Final 
/*
console.log('Global:');
console.log('Total: ', cTotal);
console.log('Successful: ', cSuccess, '-', (cSuccess * 100 / cTotal) + '%');
console.log('Failed: ', cFailed, ' (Length: ', failures.len, ', tags: ', failures.tags, ')');

console.log('\nTags:');
console.log('Total: ', cTotalTags);
console.log('Successful: ', cSuccessTags, '-', (cSuccessTags * 100 / cTotalTags) + '%');
*/
console.log('Tags recognized: ', (cSuccessTags * 100 / cTotalTags) + '% on ', cTotal - failures.len ,' sentences (', cSuccess , ' fully good)');
console.log('Average time: ', cTotalTime / cTotal);


