/*

Run PoS test against penn treebank

JSON file took from nlp_compromise (thanks a bunch!).

It's good to note that some of the Penn Treebank dataset sentences are not perfectly tagged, so measure 
of deviation from Penn Treebank is quite subjective, as Compendium may be good where Penn is wrong 
(in a VERY LITTLE proportion.. 0.1 to 0.3% probably on used test set). Examples of Penn errors:

Too much money is at stake for program traders to give up. - give/VB up/IN where it should be give/VB up/RP

I still don't know where these errors (if it's proved they are) come from, as I don't have access to raw
original version of the dataset.

Result history:
- April 15th: Minimal: 88.76% / Full: 90.13%
- April 15th: Minimal: 89.35% / Full: 90.56%
- April 15th: Minimal: 89.91% / Full: 92.34%
- April 15th: Minimal: 90.59% / Full: 92.29%
        > makes sense but interesting: new brill rules provided a great improvement in minimal
        mode but a slight decline in full mode - this is the limit of rules over a lexicon

- April 17th, 1959 sentences: 
    Minimal:    90.65% exact tags, 352 exact sentences, 0.72ms ave. per sentence
    Full:       92.74% exact tags, 518 exact sentences, 0.36ms ave. per sentence

        > would be worth the check why the full mode is a lot more fast - instinct says because
        likely initial lexicon search is successful, so it doesn't search for variations. Trie 
        lexicon will probably make both modes faster.

- April 19th, 1947 sentences: 
    Minimal:    90.68% exact tags, 355 exact sentences, 0.75ms ave. per sentence
    Full:       93.14% exact tags, 565 exact sentences, 0.36ms ave. per sentence

        > Lexer improvements made an appreciable difference in full mode: +0.4%.

- April 19th: 
    Minimal:    91.74% exact tags, 434/1949 exact sentences, 1.04ms ave. per sentence
    Full:       94.35% exact tags, 562/1523 exact sentences, 0.83ms ave. per sentence

        > Whole set of new rules and vocabulary in compendium, more granularity on existing 
        rules (verbs inference, less suffixes...)
        > Lighter embedded lexicons in both modes

- April 23th: 
    Minimal:    91.77% exact tags, 435/1949 exact sentences, 1.38ms ave. per sentence
    Full:       94.37% exact tags, 564/1523 exact sentences, 1.15ms ave. per sentence

        > Whole set of new rules and vocabulary in compendium, more granularity on existing 
        rules (verbs inference, less suffixes...)
        > Lighter embedded lexicons in both modes
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
        var tk = cpd_pos.tokens[i].raw;
        cTotalTags += 1;

        // Exceptions where difference between penn / compendium is
        // accepted (different tagging style)
        if ((tags[i] === '$' && penn_pos[i] === 'CD') ||
            (tags[i] === 'SYM' && tk === '%')) {
            cSuccessTags += 1;
        } else 
        if (penn_pos[i] !== tags[i]) {
            failed = true;

            if (i > 1 && penn_pos[i] === 'NNS' && tags[i] === 'VBZ') {
                var d = penn_pos[i] + ' << ' + tk + ' << ' + tags[i] ;

                if (DIFFS.hasOwnProperty(d)) {
                    DIFFS[d].c += 1;
                    DIFFS[d].prev.push(penn_pos[i - 1]);

                } else {
                    DIFFS[d] = {c: 1, prev: [penn_pos[i - 1]]};
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
        // console.log(text)
        // console.log(poslog1 + '\n' + poslog2)
    } else {
        cSuccess += 1;
    }
}

// Put diffs in an array
var diffs_arr = [];
for (k in DIFFS) {

    diffs_arr.push({
        key: k,
        score: DIFFS[k].c,
        prev: DIFFS[k].prev
    });

}
// Order by score
diffs_arr.sort(function(a, b) {
    return b.score - a.score;
});

for (i = 0; i < 20; i += 1) {
    if (!!diffs_arr[i]) {
        console.log(diffs_arr[i]);
    }
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


