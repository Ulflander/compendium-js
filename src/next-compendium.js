

// Parses the lexicon and uses the compendium
// to build the in memory lexicon

(function() {
    var compendium = {

        neg: {
            'not': 'RB',
            'n\'t': 'RB',
            '\'t': 'VB',
            'no': ['RB', 'DT'],
            'neither': ['DT', 'CC'],
            'nor': ['DT', 'CC'],
            'never': 'RB',
            'without': 'IN',
            'except': 'IN',
            'absent': ['JJ', 'VB'],
            'unlike': ['IN', 'JJ'],
            'unable': 'JJ',
            'unremarkable': 'JJ',
            'unlikely': 'JJ',
            'negative': 'JJ',
            'hardly': 'RB',
            'deny': ['VB', 'VBP'],
            'fail': ['VB', 'VBP', 'NN'],
            'exclude': ['VB', 'VBP'],
            'lack': ['NN', 'VB', 'VBP'],
            'absence': '',
            'none': ''
        },

        neg_neg: {
            'only': ['RB', 'IN', 'JJ'],
            'just': ['RB', 'JJ', 'RP'],
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