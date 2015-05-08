!function() {

    var abbreviations = cpd.abbrs,

        split_sentence_regexp = /(\S.+?[….\?!\n])(?=\s+|$|")/g,

        abbrev_regexp = new RegExp("(^| |\\\(|\\\[|\{)(" + abbreviations.join("|") + ")[\.!\?] ?$", "i"),

        word_boundaries = ' !?()[]{}"\'`%•.…:;,$€£¥\\/+=\*_–&',

        contractions = ['s', 'm', 't', 'll', 've', 'd', 'em'],

        encoder = compendium.punycode.ucs2,

        // Use to determinate float parts
        cd = /^-?[0-9]+$/,
        acd = /^[0-9]+$/,
        cdf = /^-?[0-9]+[\.,]$/,

        // Regexps that catch emoticons
        r_emots = {},

        i, l = cpd.emots.length, emot,

        applyRegexps = function(restr, spotted, regexps) {
            var i, re, curr;

            for (i in regexps) {
                if (regexps.hasOwnProperty(i)) {
                    re = new RegExp(regexps[i], 'gi');
                    while ((curr = re.exec(restr)) !== null) {
                        spotted[curr.index] = {
                            content: curr[1],
                            type: i,
                            length: curr[0].length - 1
                        }
                    }
                }
            }
        };

    // Add regexps for emoticons
    for (i = 0; i < l * 2; i += 2) {
        emot = cpd.emots[i / 2];
        r_emots['em_' + i] = '\\s(' + emot.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + '+)';
        r_emots['em_' + (i + 1)] = '[a-z0-9](' + emot.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + '+)';
    }


    extend(compendium.lexer, {
        
        // Entities regexps
        regexps: {
            email: '\\s([^\\s]+@[^\\s]+\.[a-z]+)',
            username: '\\s(@[a-z0-9_]+)',
            html_char: '\\s(&[a-z0-9]{2,4};)',
            hashtag: '\\s(#[a-z0-9_]+)',
            url: '\\s((https?|ftp):\/\/[\-a-z0-9+&@#\/%\?=~_|!:,\.;]*[\-a-z0-9+&@#\/%=~_|])',
            ip: '\\s(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5]))\\s',
            // Political affiliation
            pl: '\\s([rd]-([a-z]+\\.{0,1})+)'
        },

        // Parse into sentences
        sentences:  function(str) {
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
                if (s.match(abbrev_regexp) || s.match(/[ |\.][A-Za-z]\.?$/)) {
                    // If next token is not a letter
                    if (i < l - 1 && !arr[i + 1].match(/^[A-Za-z]\s/)) {
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
        },

        // UTF-8 compliant tokens splitter: parses sentence char by char after having applied general utility 
        // regexps. Will seperate emojis into tokens.
        splitTokens: function(str) {
            var i, 
                l = str.length, 
                curr,
                // result
                res = [], 
                // trick for testing on simpler regexps
                restr = ' ' + str + ' ',
                // trick
                decoded,
                spotted = {},
                xpush = function(w) {
                    if (!w) {
                        return;
                    }
                    decoded = encoder.decode(w);
                    var i, l = decoded.length, curr = '';
                    for (i = 0; i < l; i += 1) {
                        if (decoded[i] >= 0x1f5ff) {
                            if (!!curr) {
                                res.push(curr);
                            }
                            res.push(encoder.encode([decoded[i]]));
                            curr = '';
                        } else {
                            curr += encoder.encode([decoded[i]]);
                        }
                    }
                    if (!!curr) {
                        res.push(curr);
                    }
                },
                push = function(w1, w2) {
                    xpush(w1);
                    xpush(w2);
                    curr = '';
                };

            // First run some general regexps onto the texts and aggregate the indexes
            applyRegexps(restr, spotted, lexer.regexps);
            applyRegexps(restr, spotted, r_emots);

            for (curr = '', i = 0; i < l; i += 1) {
                // If spotted by regexp, simply append result
                if (spotted.hasOwnProperty(i)) {
                    push(curr, spotted[i].content);
                    i += spotted[i].length - 1;
                } else 
                // TODO: benchmark if word_boundaries.indexOf more perf than str.match(regexp)
                if (word_boundaries.indexOf(str[i]) > -1) {
                    push(curr, str[i]);
                } else {
                    curr += str[i];
                }
            }

            push(curr);

            return res;
        },

        // Parse each token
        tokens: function(sentence) {
            var arr = lexer.splitTokens(sentence), 
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
                
                // If dot in float or full float or thousands
                if (((tok === '.' || tok === ',') && previous.match(cd) && next.match(acd)) ||
                    (tok.match(cd) && previous.match(cdf))) {
                    in_acronym = false;
                    result[count - 1] += tok;
                    continue;
                }

                // If abbreviation, merge back .
                // only if . is not last char of the sentence
                if (tok === '.' && i < l - 1 && count > 0 && abbreviations.indexOf(previous.toLowerCase()) > -1) {
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
                    if (tok === previous[0]) {
                        result[count - 1] += tok;
                        continue;
                    }
                // Else if single letter and in acronym, merge back
                } else if (tok.match(/^[A-Za-z]{1}$/g) && i < l - 1 && next === '.') {
                    in_acronym = true;
                }

                // If token is ' check for contraction.
                // If is contraction, merge forward
                if (tok === '\'' && contractions.indexOf(next) > -1) {
                    
                    // If t, check for 'n' in previous
                    if (next === 't' && previous.lastIndexOf('n') === previous.length - 1) {
                        arr[i + 1] = 'n' + tok + next;
                        result[result.length - 1] = previous.slice(0, -1);
                    } else {
                        arr[i + 1] = tok + next;
                    }

                    continue;
                }

                // TODO: refactor
                // Special tokens
                if (tok === 'cant') {
                    // Default case: add token
                    result.push('can', 'n\'t');
                    count += 2;
                } else if (tok === 'cannot') {
                    // Default case: add token
                    result.push('can', 'not');
                    count += 2;
                } else if (tok === 'gonna') {
                    // Default case: add token
                    result.push('gon', 'na');
                    count += 2;
                } else if (!!tok) {
                    result.push(tok);
                    count += 1;
                }
            }
            
            return result;
        },

        // Parse a string into arrays of tokens in an array of sentences.
        lex: function(str) {
            var sentences = lexer.sentences(str), i, l = sentences.length;
            for (i = 0; i < l; i += 1) {
                sentences[i] = lexer.tokens(sentences[i]);
            }
            return sentences;
        }
    });
    
    compendium.lex = lexer.lex;

}();