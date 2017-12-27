

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
            'anything',
            'spring',
            'something',
            'thing',
            'king',
            'nothing'
        ],

        // All verbs ending
        ing_test: [],

        // Adverbs
        emphasis: [
            'totally',
            'fully',
            'really',
            'surprisingly',
            'absolutely',
            'actively',
            'clearly',
            'crazily',
            'greatly',
            'happily',
            'notably',
            'severly',
            'particularly',
            'highly',
            'quite',
            'pretty',
            'seriously',
            'very',
            'horribly',
            'even',
            'overly',
            'extremely'
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
            'gov', 'governor',
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
            // 'op', '',
            'ord', 'order',
            'pvt', 'private',
            'reps', '',
            'res', '',
            // 'sens', '',
            'sfc', '',
            'surg', 'surgeon',
            'ph', '',
            'ds', '',
            //common abbreviations
            // 'arc', '',
            'ave', 'avenue',
            'blvd', 'boulevard',
            'cl', '',
            'ct', '',
            'cres', '',
            'exp', '',
            'rd', 'road',
            'st', 'street',
            // 'dist', '',
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
            'al', 'alabama',
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
            // 'me', '',
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
        floatChar: '.',
        // Thousands char
        thousandChar: ',',

        multipliers: ['hundred', 'thousand', 'million', 'billion', 'trillion'],

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
            zero: 'CD',
            without: 'IN',
            except: 'IN',
            absent: 'JJ',
            unlike: 'IN',
            unable: 'JJ',
            unremarkable: 'JJ',
            unlikely: 'JJ',
            negative: 'JJ',
            hardly: 'RB',
            deny: 'VB',
            fail: 'VB',
            exclude: 'VB',
            lack: 'NN',
            absence: 'NN',
            none: 'NN',
            nothing: 'NN'
        },

        // Counter negation marks
        neg_neg: {
            only: 'RB',
            just: 'RB',
            solely: 'RB',
            uniquely: 'RB',
            exclusively: 'RB'
        },

        // Refusal keywords, also use as negation marks
        refusal: {
            not: 'RB',
            'n\'t':  'RB',
            '\'t':  'RB',
            no: 'RB',
            neither: 'DT',
            nor: 'DT',
            never: 'RB'
        },

        // Approval keyword
        approval: {
            yes: 'UH',
            ok: 'NN',
            agreed: 'VBN',
            agree: 'VBP',
            affirmative: 'JJ',
            approved: 'VBN',
            sure: 'JJ',
            roger: 'NN',
            indeed: 'RB',
            right: 'NN',
            alright: 'JJ'
        },

        approval_verbs: [
            'go', 'do'
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
            i: 'PRP',
            you: 'PRP'
        },

        // For date recognition
        months: {
            january: 'NNP',
            february: 'NNP',
            march: 'NNP',
            april: 'NNP',
            may: 'NNP',
            june: 'NNP',
            july: 'NNP',
            august: 'NNP',
            september: 'NNP',
            october: 'NNP',
            november: 'NNP',
            december: 'NNP'
        },
        days: {
            monday: 'NNP',
            tuesday: 'NNP',
            wednesday: 'NNP',
            thursday: 'NNP',
            friday: 'NNP',
            saturday: 'NNP',
            sunday: 'NNP'
        },

        indicators: {
            first: 'JJ',
            both: 'DT',
            second: 'JJ',
            third: 'JJ',
            last: 'JJ',
            previous: 'JJ',
            next: 'JJ',
            latest: 'JJ',
            earliest: 'JJ'
        },

        // Profiling
        dirty: 'anal anus arse ass asshole ballsack bastard bitch biatch bloody blowjob bollock bollok boner boob bugger bum butt buttplug clitoris cock coon crap cunt damn dick dildo dyke fag feck fellate fellatio felching fuck fucking fudgepacker fudgepacker flange homo jerk jizz knobend knobend labia lmfao muff nigger nigga penis piss poop prick pube pussy queer scrotum sex shit sh1t slut smegma spunk tit tosser turd twat vagina wank whore crappy'.split(' '),

        polite: 'thanks thank please excuse pardon welcome sorry might ought'.split(' ')
    });
}();
