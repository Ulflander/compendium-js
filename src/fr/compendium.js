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

        // Irregular infinitives
        // Populated in compendium.parser.js using `verbs` array and `irregular` matrix
        infinitives: [],

        // Not used in french
        ing_excpt: [],

        // Adverbs
        emphasis: [],

        // Odd entries are abbreviations, even entries are replacement.
        // Potentially ambiguous abbrvs have no replacement.
        // Replacements are extracted from this array and
        // added in `abbrs_rplt` when lexicon is parsed (see lexicon.js).
        abbrs: [
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
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
            eleven: 11,
            twelve: 12,
            thirteen: 13,
            fourteen: 14,
            fifteen: 15,
            sixteen: 16,
            seventeen: 17,
            eighteen: 18,
            nineteen: 19,
            ninteen: 19,
            twenty: 20,
            thirty: 30,
            forty: 40,
            fourty: 40,
            fifty: 50,
            sixty: 60,
            seventy: 70,
            eighty: 80,
            ninety: 90,
            hundred: 100,
            thousand: 1e3,
            million: 1e6,
            billion: 1e9,
            trillion: 1e12
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
        },
        days: {
        },

        indicators: {
        },

        // Profiling
        dirty: ''.split(' '),

        polite: ''.split(' ')
    });
}();
