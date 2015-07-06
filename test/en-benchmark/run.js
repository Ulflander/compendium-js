/*

Run PoS test against penn treebank

JSON file took from nlp_compromise (thanks a bunch!).

It's good to note that some of the Penn Treebank dataset sentences are not perfectly tagged, so measure 
of deviation from Penn Treebank is quite subjective, as Compendium may be good where Penn is wrong 
(in a VERY LITTLE proportion.. 0.1 to 0.3% probably on used test set). Examples of Penn errors:

- Too much money is at stake for program traders to give up. - give/VB up/IN where it should be give/VB up/RP
- Currently, ShareData has about 4.1 million common shares outstanding. Currently/NNP where it should be Currently/RB

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
    Minimal:    90.65% exact tags, 352 exact sentences, 0.72ms av. per sentence
    Full:       92.74% exact tags, 518 exact sentences, 0.36ms av. per sentence

        > would be worth the check why the full mode is a lot more fast - instinct says because
        likely initial lexicon search is successful, so it doesn't search for variations. Trie 
        lexicon will probably make both modes faster.

- April 19th, 1947 sentences: 
    Minimal:    90.68% exact tags, 355 exact sentences, 0.75ms av. per sentence
    Full:       93.14% exact tags, 565 exact sentences, 0.36ms av. per sentence

        > Lexer improvements made an appreciable difference in full mode: +0.4%.

- April 19th: 
    Minimal:    91.74% exact tags, 434/1949 exact sentences, 1.04ms av. per sentence
    Full:       94.35% exact tags, 562/1523 exact sentences, 0.83ms av. per sentence

        > Whole set of new rules and vocabulary in compendium, more granularity on existing 
        rules (verbs inference, less suffixes...)
        > Lighter embedded lexicons in both modes

- April 23th: 
    Minimal:    91.77% exact tags, 435/1949 exact sentences, 1.38ms av. per sentence
    Full:       94.37% exact tags, 564/1523 exact sentences, 1.15ms av. per sentence

- April 29th:
    Minimal:    91.58% exact tags, 431/1949 exact sentences, 1.96ms av. per sentence
    Full:       94.13% exact tags, 551/1523 exact sentences, 1.57ms av. per sentence

        > Slight decrease for the last week, but on the other hand, Compendium gained a lot
        of features (verbs inflection, synonyms...). Will regain a lot on next round of 
        new rules

- May 8th:
    Minimal:    92.32% exact tags, 480/1949 exact sentences, 1.90ms av. per sentence
    Full:       94.37% exact tags, 772/1546 exact sentences, 1.57ms av. per sentence

        > New increase! A 0.80% gain in minimal mode, only by using simpler inferences 
        on composed words. Almost no change in full mode.

- May 10th:
    Minimal:    92.52% exact tags, 506/1949 exact sentences, 1.79ms av. per sentence
    Full:       94.58% exact tags, 611/1546 exact sentences, 2.58ms av. per sentence

        > Ok, contrasted results after insertion of irregular verbs. First a decrease to 91%, 
        then has been hard to reach again the previous score - lot of new rules to solve 
        newly found issues.

        The decrease following addition of verbs was due to the fact that new automated verbs 
        inflections to populate the lexicon replaced some original lexicon terms, whose 
        statistical tag was not a verb-related one, but rather noun or adjective. Here is again 
        a limit of rule-based processors versus machine learning based one.

- May 16th: 
    Minimal:    92.36% exact tags, 499/1949 exact sentences, 1.90ms av. per sentence
    Full:       94.37% exact tags, 586/1546 exact sentences, 2.02ms av. per sentence

    > Yet another slight decrease, due to support of lot of new features in v0.0.11

- May 17th: 
    Minimal:    92.53% exact tags, 477/1822 exact sentences, 2.10ms av. per sentence
    Full:       94.39% exact tags, 584/1546 exact sentences, 2.05ms av. per sentence

    > A slight increase thanks to new rules.

- May 17th:
    Minimal:    92.40% exact tags, 497/1978 exact sentences, 2.08ms av. per sentence
    Full:       94.22% exact tags, 676/1914 exact sentences, 1.99ms av. per sentence

    > Slight decrease but good news! Finally found why so much varying penn test sentences 
    available: due to the way emoticons regexps were applied. Seems liked lexer fix in 
    commit #0e8091 solved the issue, and now a lot more sentences are available for tests, 
    in particular in full mode.

- May 29th:
    Minimal:    92.54% exact tags, 597/2455 exact sentences, 2.10ms av. per sentence
    Full:       94.55% exact tags, 852/2370 exact sentences, 2.39ms av. per sentence

    > Last rounds of improvements were not focused at all on PoS tagging, however 
    new rules introduced for other purpose led to a slight improvement in statistics 
    PoS tagging stats.

*/

var data = require("./penn_treebank").data,
    compendium = require('../../build/compendium.minimal.js'),
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
        txt = txt.split(/[,:;]/g).join('').split('\'s').join('');
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

        // Exceptions where difference between penn / compendium is
        // accepted (different tagging style)
        if ((tags[i] === '$' && penn_pos[i] === 'CD') ||
            (tags[i] === 'SYM' && tk === '%')) {
            cSuccessTags += 1;
        } else 
        if (penn_pos[i] !== tags[i]) {
            failed = true;

            if (i > 0) {
                if (DIFFS.hasOwnProperty(tk)) {
                    DIFFS[tk].c += 1;
                    DIFFS[tk].is += ' ' + tags[i];
                    DIFFS[tk].should_be += ' ' + penn_pos[i];
                    DIFFS[tk].context += ' | ' + cpd_pos.tokens[i-1].raw + '/' + penn_pos[i-1] + ';' + penn_pos[i] + ';' + penn_pos[i+1];
                 } else {
                    DIFFS[tk] = {
                        c: 1,
                        is: tags[i],
                        should_be: penn_pos[i],
                        context: cpd_pos.tokens[i-1].raw + '/' + penn_pos[i-1] + ';' + penn_pos[i] + ';' + penn_pos[i+1]
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
        is: DIFFS[k].is,
        should_be: DIFFS[k].should_be,
        context: DIFFS[k].context
    });

}
// Order by score
diffs_arr.sort(function(a, b) {
    return b.score - a.score;
});

for (i = 0; i < 50; i += 1) {
    if (!!diffs_arr[i]) {
        console.log(diffs_arr[i]);
    }
}


// Final 
console.log('Tags recognized: ', (cSuccessTags * 100 / cTotalTags) + '% on ', cTotal - failures.len ,' sentences (', cSuccess , ' fully good)');
console.log('Average time: ', cTotalTime / cTotal);


