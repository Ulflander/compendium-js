

/**
 * Compendium (NLP knowledge base)
 */

(function() {
    var compendium = {

        // 
        rules: '@@rules',

        suffixes: '@@suffixes',

        numbers: {
            'zero': 0,
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6,
            'seven': 7,
            'eight': 8,
            'nine': 9,
            'ten': 10,
            'eleven': 11,
            'twelve': 12,
            'thirteen': 13,
            'fourteen': 14,
            'fifteen': 15,
            'sixteen': 16,
            'seventeen': 17,
            'eighteen': 18,
            'nineteen': 19,
            'ninteen': 19,
            'twenty': 20,
            'thirty': 30,
            'forty': 40,
            'fourty': 40,
            'fifty': 50,
            'sixty': 60,
            'seventy': 70,
            'eighty': 80,
            'ninety': 90,
            'hundred': 100,
            'thousand': 1000,
            'million': 1000000,
            'billion': 1000000000,
            'trillion': 1000000000000,
        },

        // Negation marks
        neg: {
            'not': 'RB',
            'n\'t': 'RB',
            '\'t': 'RB',
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