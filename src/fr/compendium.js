/**
 * Compendium (NLP knowledge base)
 */

!function() {
    extend(cpd, {

        decode: [],

        // Regular verbs
        // Conjugated and expanded in compendium.parser.js
        verbs: '@@verbs'.split(' '),

        // Irregular verbs
        irregular: '@@iverbs'.split('\t').map(function(o){return o.split(' ')}),

        // Irregular and regular infinitives
        // Populated in compendium.parser.js using `verbs` array and `irregular` matrix
        infinitives: [],

        // Adverbs
        emphasis: [],

        // Odd entries are abbreviations, even entries are replacement.
        // Potentially ambiguous abbrvs have no replacement.
        // Replacements are extracted from this array and
        // added in `abbrs_rplt` when lexicon is parsed (see lexicon.js).
        abbrs: [
          //abbrs for streets
          'ave',      'avenue',
          'blvd',     'boulevard',
          //abbrs for gender
          'm',        'monsieur',
          'mme',      'madame',
          'mlle',     'madamoiselle'

        ],

        synonyms: '@@synonyms',

        // Abbreviation replacements
        // (populated by parser)
        abbrs_rplt: [],

        //proper nouns with exclamation marks
        exclamations: [
            'yahoo',
            'joomla',
            'jeopardy'
        ],

        // Rules from `rules.txt`,
        // populated by gulpfile and parsed by compendium.parser.js
        rules: '@@rules',

        // Suffixes from `suffixes.txt`
        // populated by gulpfile and parsed by compendium.parser.js
        suffixes: '@@suffixes',

        // Raw emoticons, populated by compendium.parser.js
        emots: [],

        // Float char
        floatChar: ',',
        // Thousands char
        thousandChar: '.',

        multipliers: ['cent', 'mille', 'million', 'milliard', 'billion'],

        // Numbers and their value
        // (PoS tag `CD`)
        numbers: {
            zero: 0,
            un: 1,
            deux: 2,
            trois: 3,
            quatre: 4,
            cinq: 5,
            six: 6,
            sept: 7,
            huit: 8,
            neuf: 9,
            dix: 10,
            onze: 11,
            douze: 12,
            treize: 13,
            quatorze: 14,
            quinze: 15,
            seize: 16,
            'dix-sept': 17,
            'dix-huit': 18,
            'dix-neuf': 19,
            vingt: 20,
            trente: 30,
            quarante: 40,
            cinquante: 50,
            soixante: 60,
            'soixante-dix': 70,
            'quatre-vingts': 80,
            'quatre-vingts dix': 90,
            cent: 100,
            mille: 1e3,
            million: 1e6,
            milliard: 1e9,
            billion: 1e12
        },

        demonyms: '@@demonyms',

        // Negation marks
        neg: {
        },

        // Counter negation marks
        neg_neg: {
        },

        // Refusal keywords, also use as negation marks
        refusal: {
        },

        // Approval keyword
        approval: {
            oui: 'UH',
            yes : 'UH',
            ok: 'NN',
            'd\'accord': 'VBN',
            agree: 'VBP',
            affirmatif: 'JJ',
            approuvé: 'VBN',
            sûr: 'JJ',
            'en-effet': 'RB',
            vrai: 'ADJ',
            //alright: 'JJ'
        },

        approval_verbs: [
        ],

        // Breakpoints words
        breakpoints: {

        },

        citations: {
            '"': '"',
            '\'': '"',
            '`': '"'
        },

        // Personal pronouns
        // filtered in lexicon (y?)
        p: {
        },

        // For date recognition
        months: {
            janvier: 'NOM',
            février: 'NOM',
            mars: 'NOM',
            avril: 'NOM',
            mai: 'NOM',
            juin: 'NOM',
            juillet: 'NOM',
            août: 'NOM',
            septembre: 'NOM',
            octobre: 'NOM',
            novembre: 'NOM',
            decembre: 'NOM'
        },

        days: {
            lundi: 'NOM',
            mardi: 'NOM',
            mercredi: 'NOM',
            jeudi: 'NOM',
            vendredi: 'NOM',
            samedi: 'NOM',
            dimanche: 'NOM'
        },

        indicators: {
            premier: 'ADJ:num',
            second: 'ADJ:num',
            deuxième: 'ADJ:num',
            troisième: 'ADJ:num',
            dernier: 'ADJ:num',
            précédent: 'ADJ:num',
            suivant: 'ADJ:num'
        },

        // Profiling
        dirty: ''.split(' '),

        polite: ''.split(' ')
    });
}();
