!function() {

    var abbreviations = cpd.abbrs,

        split_sentence_regexp = /(\S.+?[….\?!\n])(?=\s+|$|")/g,

        abbrev_regexp = new RegExp("(^| |\\\(|\\\[|\{)(" + abbreviations.join("|") + ")[\.!\?] ?$", "i"),

        word_boundaries = ' !?()[]{}"\'`%•.…:;,$€£¥\\/+=\*_–',

        contractions = ['s', 'm', 't', 'll', 've', 'd', 'em', 're'],

        encoder = compendium.punycode.ucs2,

        floatChar = cpd.floatChar,

        thousandChar = cpd.thousandChar,

        // Use to determinate float parts
        cd = /^-?[0-9]+$/,
        acd = /^[0-9]+$/,
        cdf = new RegExp('^-?[0-9]+[\.,]$'),

        // Regexps that catcj complex floats,
        numbers = {
            complexFloat: '\\s(-?[0-9]+([\\' + thousandChar + '][0-9]+){1,}(\\' + floatChar + '[0-9]+))',
        },

        // Regexps that catch emoticons
        r_emots = {},

        i, l = cpd.emots.length, emot,

        isOnlyEmots = function(meta) {
            var i = 0, l = meta.length;
            for (i = 0; i < l; i += 1) {
                if (meta[i] === null || meta[i].group !== 'emoticon') {
                    return false;
                }
            }
            return true;
        },

        applyRegexps = function(restr, spotted, regexps, groupName) {
            var i, l, re, curr;

            for (i in regexps) {
                if (regexps.hasOwnProperty(i)) {
                    re = new RegExp(regexps[i], 'g');
                    while ((curr = re.exec(restr)) !== null) {
                        l = curr[0].length;
                        spotted[curr.index] = {
                            content: curr[1],
                            type: i,
                            group: groupName,
                            length: l - (l - curr[1].length)
                        }
                    }
                }
            }
        };

    // Add regexps for emoticons
    for (i = 0; i < l * 2; i += 2) {
        emot = cpd.emots[i / 2];
        r_emots['em_' + i] = '\\s(' + regexpEscape(emot) + '+)[^a-z]';
        if (!emot.match(/^[a-zA-Z]/)) {
            r_emots['em_' + (i + 1)] = '[a-zA-Z](' + regexpEscape(emot) + '+)[^a-z]';
        }
    }


    extend(compendium.lexer, {

        // Entities regexps
        regexps: {
            email: '\\s([^\\s]+@[^\\s]+(\\.[^\\s\\)\\]]+){1,})',
            composite: '\\s([a-zA-Z]&[a-zA-Z])',
            username: '\\s(@[a-zA-Z0-9_]+)',
            html_char: '\\s(&[a-zA-Z0-9]{2,4};)',
            hashtag: '\\s(#[a-zA-Z0-9_]+)',
            url: '\\s((https?|ftp):\\/\\/[\\-a-z0-9+&@#\\/%\\?=~_|!:,\\.;]*[\\-a-z0-9+&@#\\/%=~_|])',
            ip: '\\s(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5]))\\s',
            // Political affiliation, english only
            pl: '\\s([rd]-([a-z]+\\.{0,1})+)'
        },

        // Consolidate sentences:
        // merge back sentences containing only emoticons
        consolidate: function(sentences, meta,  raws) {
            for (var i = 1, l = sentences.length; i < l; i += 1) {
                if (isOnlyEmots(meta[i])) {
                    sentences[i - 1] = sentences[i - 1].concat(sentences[i]);
                    raws[i - 1] += ' ' + raws[i];
                    sentences.splice(i, 1);
                    meta.splice(i, 1);
                    raws.splice(i, 1);
                    i -= 1;
                    l -= 1;
                }
            }
            return sentences;
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
            for (i = 0; i < l; i ++) {
                s = arr[i].trim();

                // If an abreviation or acronym, merge forward
                if (s.match(abbrev_regexp) || s.match(/[ |\.][A-Za-z]\.?$/)) {
                    // If next token is not a letter
                    if (i < l - 1 && !arr[i + 1].match(/^[A-Za-z]\s/)) {
                        //console.log(s, arr[i + 1]);
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
                // meta
                meta = [],
                metaObject = null,
                // trick for testing on simpler regexps
                restr = ' ' + str + ' ',
                // trick
                decoded,
                spotted = {},
                xpush = function(w) {
                    if (!w) {
                        return;
                    }
                    if (typeof w === 'object') {
                        metaObject = w;
                        w = w.content;
                    }
                    decoded = encoder.decode(w);
                    var i, l = decoded.length, curr = '';
                    for (i = 0; i < l; i ++) {
                        if (decoded[i] >= 0x1f5ff) {
                            if (!!curr) {
                                meta.push(metaObject);
                                res.push(curr);
                            }
                            meta.push({
                                group: 'emoticon'
                            });
                            res.push(encoder.encode([decoded[i]]));
                            curr = '';
                        } else {
                            curr += encoder.encode([decoded[i]]);
                        }
                    }
                    if (!!curr) {
                        meta.push(metaObject);
                        res.push(curr);
                    }
                },
                push = function(w1, w2) {
                    xpush(w1);
                    xpush(w2);
                    curr = '';
                };

            // First run some general regexps onto the texts and aggregate the indexes
            applyRegexps(restr, spotted, lexer.regexps, 'entity');
            applyRegexps(restr, spotted, r_emots, 'emoticon');
            applyRegexps(restr, spotted, numbers, 'number');

            for (curr = '', i = 0; i < l; i ++) {
                // If spotted by regexp, simply append result
                if (spotted.hasOwnProperty(i)) {
                    push(curr, spotted[i]);
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

            return {
                tokens: res,
                meta: meta
            }
        },

        // Parse each token
        tokens: function(sentence, language) {
            var split = lexer.splitTokens(sentence),
                arr = split.tokens,
                meta = split.meta,
                i,
                l = arr.length,
                tok,
                in_acronym = false,
                result = [],
                metaResult = [],
                previous = '',
                next = '',
                count = 0;

            // Loop onto result
            // - cleanup
            // - merge back when necessary:
            //      * Floats
            //      * Acronyms
            //      * Simmilar
            for (i = 0; i < l; i ++) {
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

                // If dot in float or full float or thousands - multilingual
                if (((tok === '.' || tok === ',') && previous.match(cd) && next.match(acd)) ||
                    (tok.match(cd) && previous.match(cdf))) {
                    in_acronym = false;
                    result[count - 1] += tok;
                    continue;
                }

                // If abbreviation, merge back .
                // only if . is not last char of the sentence - multilingual (form compendium.compendium)
                if (tok === '.' && i < l - 1 && count > 0 && abbreviations.indexOf(previous.toLowerCase()) > -1) {
                    in_acronym = false;
                    result[count - 1] += tok;
                    continue;
                }

                // If a dot and in acronym, merge back - multilingual
                if (in_acronym && i < l -1 && tok.length === 1) {
                    result[count - 1] += tok;
                    continue;
                }

                // If any punc mark or not a letter - multilingual
                if (tok.match(/^\W+$/gi)) {
                    in_acronym = false;
                    // If same than previous one, merge back
                    if (tok === previous[previous.length - 1]) {
                        result[count - 1] += tok;
                        continue;
                    }
                // Else if single letter and in acronym, merge back - multilingual
                } else if (tok.match(/^[A-Za-z]{1}$/g) && i < l - 1 && next === '.') {
                    in_acronym = true;
                }

                if (!!tok) {
                    result.push(tok);
                    metaResult.push(meta[i]);
                    count ++;
                }
            }

            // Post process result before returning it
            return {
                result: lexer.postprocess(result, metaResult),
                meta: metaResult
            };
        },

        /**
         * Parse a string into a matrix of tokens per sentences.
         *
         * @memberOf compendium.lexer
         * @param  {String} str A string to be tokenized
         * @param  {String} language Language to be used
         * @param  {Boolean} sentenceOnly If `true`, won't lex tokens
         * @return {Array}      A matrix of tokens per sentences.
         */
        advanced: function(str, language, sentenceOnly) {
            var sentences = lexer.sentences(str), i, l = sentences.length, lexed, meta = [], raws = [];

            if (!!sentenceOnly) {
                return {
                    sentences: sentences,
                    raws: null,
                    meta: null
                };
            }

            for (i = 0; i < l; i ++) {
                raws.push(sentences[i]);
                lexed = lexer.tokens(sentences[i], language);
                meta[i] = lexed.meta;
                sentences[i] = lexed.result;
            }
            lexer.consolidate(sentences, meta, raws);
            return {
                raws: raws,
                sentences: sentences,
                meta: meta
            };
        },

        lex: function(str, language, sentenceOnly) {
            return lexer.advanced(str, language, sentenceOnly).sentences;
        }

    });


    /**
     * Parse a string into a matrix of tokens per sentences. Alias of {@link compendium.lexer.lex}.
     *
     * @function lex
     * @memberOf compendium
     * @param  {String} str A string to be tokenized
     * @return {Array}      A matrix of tokens per sentences.
     */
    compendium.lex = lexer.lex;

}();
