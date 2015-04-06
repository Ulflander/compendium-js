

/**
 * Compendium (NLP knowledge base)
 */

(function() {
    var compendium = {

        rules: '@@rules',

        // Negation marks
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

        // Counter negation marks
        neg_neg: {
            'only': 'RB',
            'just': 'RB',
            'solely': 'RB',
            'uniquely': 'RB',
            'exclusively': 'RB'
        },

        // Personal pronouns
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