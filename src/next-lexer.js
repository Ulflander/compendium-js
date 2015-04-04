(function() {

    var // Thanks to https://github.com/spencermountain/nlp_compromise
        abbreviations = [
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
        
        split_sentence_regexp = /(\S.+?[.\?!])(?=\s+|$|")/g,

        abbrev_regexp = new RegExp("(^| )(" + abbreviations.join("|") + ")[\.!\?] ?$", "i"),

        split_token_regexp = /([\W])/g,

        // namespace
        lexer = {};

    // Parse into sentences
    lexer.sentences =  function(str) {
        // Split with base regexp
        var arr = str.split(split_sentence_regexp),
            i,
            l = arr.length,
            s,
            sentences = [];

        // Loop onto result 
        // - merge forward when necessary
        // - cleanup
        for (i = 0; i < l; i += 1) {
            s = arr[i].trim();
            // If an abreviation or acronym, merge forward
            if (s.match(abbrev_regexp) || s.match(/[ |\.][A-Z]\.?$/)) {
                // If next token is
                if (i < l - 1 && !arr[i + 1].match(/^[A-Z]\s/)) {
                    arr[i + 1] = s + ' ' + arr[i + 1].trim();
                } else {
                    sentences.push(s);
                }
            // If non empty string
            } else if (!!s) {
                sentences.push(s);
            }
        }
        return sentences;
    };

    // Parse each token
    lexer.tokens = function(sentence) {
        // Split with base regexp
        var arr = sentence.split(split_token_regexp), 
            i, 
            l = arr.length, 
            tok,
            in_acronym = false,
            result = [],
            previous = '',
            next = '',
            count = 0;

        // Loop onto result 
        // - cleanup
        // - merge back when necessary:
        //      * Floats
        //      * Acronyms
        //      * Simmilar 
        for (i = 0; i < l; i += 1) {
            // Cleanup
            tok = arr[i].trim();

            if (!tok) {
                in_acronym = false;
                continue;
            }

            if (count > 0) {
                previous = result[count - 1];
            } else {
                previous = '';
            }

            if (i < l - 1) {
                next = arr[i + 1];
            } else {
                next = '';
            }

            // If dot in float
            if (tok === '.' && previous.match(/^[0-9]+$/i) && next.match(/^[0-9]+$/i)) {
                in_acronym = false;
                result[count - 1] += tok;
                continue;
            }
            // If float
            if (tok.match(/^[0-9]+$/i) && previous.match(/^[0-9]+\.$/i)) {
                result[count - 1] += tok;
                continue;
            }

            // If abbreviation, merge back final .
            if (tok === '.' && count > 0 && abbreviations.indexOf(previous.toLowerCase()) > -1) {
                in_acronym = false;
                result[count - 1] += tok;
                continue;
            }

            // If a dot and in acronym, merge back
            if (in_acronym && i < l -1 && tok.length === 1) {
                result[count - 1] += tok;
                continue;
            }

            // If any punc mark or not a letter
            if (tok.match(/^\W+$/gi)) {
                in_acronym = false;
                // If same than previous one, merge back
                if (tok === previous) {
                    result[count - 1] += tok;
                    continue;
                }
            // Else if single letter and in acronym, merge back
            } else if (tok.match(/^[A-Z]{1}$/g) && i < l - 1 && next === '.') {
                in_acronym = true;
            }

            // Default case: add token
            result.push(tok);
            count += 1;
        }
        
        return result;
    };

    // Parse a string into arrays of tokens in an array of sentences.
    lexer.lex = function(str) {
        var sentences = lexer.sentences(str), i, l = sentences.length;
        for (i = 0; i < l; i += 1) {
            sentences[i] = lexer.tokens(sentences[i]);
        }
        return sentences;
    };

    next.lexer = lexer;
    next.lex = lexer.lex;

}());