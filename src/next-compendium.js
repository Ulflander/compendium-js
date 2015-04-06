

// Parses the lexicon and uses the compendium
// to build the in memory lexicon

(function() {
    var compendium = {

        neg: {
            'not': 'RB',
            'n\'t': 'RB',
            '\'t': 'VB',
            'no': 'RB',
            'neither': 'DT',
            'nor': 'DT',
            'never': 'RB',
            'without': 'IN',
            'except': 'IN',
            'absent': 'JJ',
            'unlike': 'IN',
            'unable': 'JJ',
            'unremarkable': 'JJ',
            'unlikely': 'JJ',
            'negative': 'JJ',
            'hardly': 'RB',
            'deny': 'VB',
            'fail': 'VB',
            'exclude': 'VB',
            'lack': 'NN',
            'absence': '',
            'none': ''
        },

        neg_neg: {
            'only': 'RB',
            'just': 'RB',
            'solely': 'RB',
            'uniquely': 'RB',
            'exclusively': 'RB'
        },

        pps: {
            'i': 'PRP',
            'you': 'PRP'
        },

        // Abbreviations
        abbrs: {

        }

    };


    next.compendium = compendium;
}());