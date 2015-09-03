/**
 * Compendium (NLP knowledge base)
 */

!function() {
    extend(cpd, {

        // Regular verbs
        // Conjugated and expanded in compendium.parser.js
        verbs: '@@verbs'.split(' '),

        // Irregular verbs
        irregular: '@@iverbs'.split('\t').map(function(o){return o.split(' ')}),

        // Irregular infinitives
        // Populated in compendium.parser.js using `verbs` array and `irregular` matrix
        infinitives: [],

        // Common exceptions to the words ending with "ing"
        // but that are not the gerund of a verb
        ing_excpt: [
        ],

        // All verbs ending
        ing_test: [],

        // Adverbs
        emphasis: [
        ],

        // Thanks to https://github.com/spencermountain/nlp_compromise
        // for initial abbreviations list.
        // Odd entries are abbreviations, even entries are replacement.
        // Potentially ambiguous abbrvs have no replacement.
        // Replacements are extracted from this array and
        // added in `abbrs_rplt` when lexicon is parsed (see lexicon.js).
        abbrs: [
            //honourifics
            'jr', 'junior',
            'mr', 'mister',
            'mrs', 'missus',
            'ms', 'miss',
            'dr', 'doctor',
            'prof', 'professor',
            'pr', 'professor',
            'sr', 'senior',
            'sen', 'senator',
            'sens', 'senators',
            'corp', 'corporation',
            'rep', '',
            'gov', '',
            'atty', 'attorney',
            'supt', 'superintendent',
            'det', 'detective',
            'rev', '',
            'col', 'colonel',
            'gen', 'general',
            'lt', 'lieutenant',
            'cmdr', 'commander',
            'adm', 'administrative',
            'capt', 'captain',
            'sgt', 'sergent',
            'cpl', 'caporal',
            'maj', '',
            'esq', 'esquire',
            'phd', '',
            'adj', 'adjective',
            'adv', 'adverb',
            'asst', 'assistant',
            'bldg', 'building',
            'brig', 'brigade',
            'hon', '',
            'messrs', 'messeurs',
            'mlle', 'mademoiselle',
            'mme', 'madame',
            'op', '',
            'ord', 'order',
            'pvt', 'private',
            'reps', '',
            'res', '',
            'sens', '',
            'sfc', '',
            'surg', 'surgeon',
            'ph', '',
            'ds', '',
            //common abbreviations
            'arc', '',
            'al', '',
            'ave', 'avenue',
            'blvd', 'boulevard',
            'cl', '',
            'ct', '',
            'cres', '',
            'exp', '',
            'rd', 'road',
            'st', 'street',
            'dist', '',
            'mt', 'mount',
            'ft', '',
            'fy', '',
            'hwy', 'highway',
            'la', '',
            'pd', '',
            'pl', '',
            'plz', '',
            'tce', '',
            'vs', '',
            'etc', '',
            'esp', '',
            'llb', '',
            'md', '',
            'bl', '',
            'ma', '',
            'ba', '',
            'lit', '',
            'fl', '',
            'ex', 'example',
            'eg', '',
            //place abbrevs
            'ala', 'alabama',
            'ariz', 'arizona',
            'ark', 'arkansas',
            'cal', 'california',
            'calif', 'california',
            'col', 'coloradoa',
            'colo', 'colorado',
            'conn', 'connecticut',
            'del', 'delaware',
            'fed', 'federal',
            'fla', 'florida',
            'ga', 'georgia',
            'ida', 'idaho',
            'id', 'idaho',
            'ill', 'illinois',
            'ind', 'indiana',
            'ia', 'iowa',
            'kan', 'kansas',
            'kans', 'kansas',
            'ken', 'kentuky',
            'ky', 'kentuky',
            'la', '',
            'me', '',
            'md', '',
            'mass', 'massachussets',
            'mich', 'michigan',
            'minn', 'minnesota',
            'miss', 'mississippi',
            'mo', 'missouri',
            'mont', 'montana',
            'neb', 'nebraska',
            'nebr', 'nebraska',
            'nev', 'nevada',
            'mex', 'mexico',
            'okla', 'oklahoma',
            'ok', 'oklahoma',
            'ore', 'oregon',
            'penna', 'pennsylvania',
            'penn', 'pennsylvania',
            'pa', 'pennsylvania',
            'dak', 'dakota',
            'tenn', 'tennessee',
            'tex', 'texas',
            'ut', 'utah',
            'vt', 'vermont',
            'va', 'virginia',
            'wash', 'washington',
            'wis', 'wisconsin',
            'wisc', 'wisconsin',
            'wy', 'wyoming',
            'wyo', 'wyoming',
            'alta', 'alberta',
            'ont', 'ontario',
            'que', 'quebec',
            'sask', 'saskatchewan',
            'yuk', 'yukon',
            //date abbrevs
            'jan', 'january',
            'feb', 'february',
            'mar', 'march',
            'apr', 'april',
            'jun', 'june',
            'jul', 'july',
            'aug', 'august',
            'sep', 'september',
            'oct', 'october',
            'nov', 'november',
            'dec', 'december',
            'sept', 'september',
            //org abbrevs
            'dept', 'department',
            'univ', 'university',
            'assn', 'association',
            'bros', 'brothers',
            'inc', 'incorported',
            'ltd', 'limited',
            'co', ''
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

        nationalities: '@@nationalities',

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
