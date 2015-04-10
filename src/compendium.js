

/**
 * Compendium (NLP knowledge base)
 */

(function() {
    var cpd = {

        // Thanks to https://github.com/spencermountain/nlp_compromise
        abbrs: [
            //honourifics
            "jr", "mr", "mrs", "ms", "dr", "prof", "sr", "sen", "corp", "rep", 
            "gov", "atty", "supt", "det", "rev", "col", "gen", "lt", 
            "cmdr", "adm", "capt", "sgt", "cpl", "maj", "miss", "misses", 
            "mister", "sir", "esq", "mstr", "phd", "adj", "adv", "asst", "bldg", 
            "brig", "comdr", "hon", "messrs", "mlle", "mme", "op", "ord", "pvt", 
            "reps", "res", "sens", "sfc", "surg", "ph", "ds",
            //common abbreviations
            "arc", "al", "ave", "blvd", "cl", "ct", "cres", "exp", "rd", "st", 
            "dist", "mt", "ft", "fy", "hwy", "la", "pd", "pl", "plz", "tce", 
            "vs", "etc", "esp", "llb", "md", "bl", "ma", "ba", "lit", "fl", 
            "ex", "eg",
            //place abbrevs
            "ala", "ariz", "ark", "cal", "calif", "col", "colo", "conn", "del", 
            "fed", "fla", "ga", "ida", "id", "ill", "ind", "ia", "kan", "kans", 
            "ken", "ky", "la", "me", "md", "mass", "mich", "minn", "miss", "mo", 
            "mont", "neb", "nebr", "nev", "mex", "okla", "ok", "ore", "penna", 
            "penn", "pa", "dak", "tenn", "tex", "ut", "vt", "va", "wash", "wis", 
            "wisc", "wy", "wyo", "usafa", "alta", "ont", "que", "sask", "yuk",
            //date abbrevs
            "jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "sept", "sep",
            //org abbrevs
            "dept", "univ", "assn", "bros", "inc", "ltd", "co", "corp",
            //proper nouns with exclamation marks
            "yahoo", "joomla", "jeopardy"
        ],

        // Abbreviations replacement
        abbrs_rpl: [
            "junior",
            "mister",
            "",
            "miss",
            "doctor",
            "professor",
            "senior",
            "senator",
            "corporation",
            "republican",
            "governor",
            "", // attorney
            "", // supt
            "", // det
            "", // rev
            "colonel",
            "general",
            "lieutenant",
            "", // cmdr

        ],

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

        breakpoints: {
            
        },

        // Personal pronouns
        pps: {
            'i': 'PRP',
            'you': 'PRP'
        }

    };


    compendium.compendium = cpd;
}());