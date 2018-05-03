!function() {


    var isPlural = compendium.inflector.isPlural,

        // Brill's conditions
        STARTWORD = 0,
        PREV1OR2TAG = 1,
        PREVTAG = 2,
        NEXTTAG = 3,
        NEXTTAG2 = 4,
        PREVTAG2 = 41,
        PREVWORD = 5,
        PREVWORDPREVTAG = 51,
        CURRENTWD = 6,
        WDPREVTAG = 8,
        WDPREVWD = 81,
        NEXT1OR2OR3TAG = 9,
        NEXTBIGRAM = 10,
        NEXT2WD = 11,
        WDNEXTTAG = 12,
        WDNEXTWD = 121,
        PREV1OR2OR3TAG = 13,
        SURROUNDTAG = 14,
        SURROUNDTAGWD = 141,
        NEXTWD = 15,
        NEXT1OR2TAG = 16,
        PREV2TAG = 17,
        NEXT2TAG = 171,
        PREV2TAGNEXTTAG = 172,
        NEXT1OR2WD = 18,
        PREV2WD = 19,
        RBIGRAM = 20,
        PREV1OR2WD = 21,

        lexicon = compendium.lexicon,
        emots = cpd.emots,
        rules = cpd.rules,
        rulesLength = rules.length,
        suffixes = cpd.suffixes,
        suffixesLength = suffixes.length,

        complexFloat = new RegExp('^-?[0-9]+([\\' + cpd.thousandChar + '][0-9]+){1,}(\\' + cpd.floatChar + '[0-9]+)$'),

        jsKeywords = ['constructor'],

        removeRepetitiveChars = function(token) {
            var str = token.replace(/(.)\1{2,}/g, "$1$1"), s;
            if (compendium.lexicon.hasOwnProperty(str)) {
                return str;
            }
            s = compendium.synonym(str);
            if (s !== str) {
                return s;
            }
            str = token.replace(/(.)\1{1,}/g, "$1");
            if (compendium.lexicon.hasOwnProperty(str)) {
                return str;
            }
            s = compendium.synonym(str);
            if (s !== str) {
                return s;
            }

            return null;
        },

        matchPotentialProperNoun = function(token) {
            return token.match(/^[A-Z][a-z\.]+$/g) || token.match(/^[A-Z]+[0-9]+$/g) || token.match(/^[A-Z][a-z]+[A-Z][a-z]+$/g);
        };

    extend(pos, {


        applyRule: function(rule, token, tag, index, tokens, tags, run) {
            if (rule.from !== tag || (rule.secondRun && run === 0)) {
                return;
            }
            var type = rule.type,
                tmp,
                tmp2;
            // Start word rule is case sensitive
            if (type === STARTWORD) {
                if (index === 0 && token === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
                return;
            }


            token = token.toLowerCase();
            if (type === PREVTAG) {
                if (index > 0 && tags[index - 1] === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === PREVWORDPREVTAG) {
                tmp = tokens[index - 1] || '';
                if (tags[index - 1] === rule.c2 && tmp.toLowerCase() === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === NEXTTAG) {
                if (tags[index + 1] === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === NEXTTAG2) {
                if (tags[index + 2] === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === PREVTAG2) {
                if (tags[index - 2] === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === PREV1OR2TAG) {
                if (tags[index - 1] === rule.c1 || tags[index - 2] === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === PREVWORD) {
                tmp = tokens[index - 1] || '';
                if (tmp.toLowerCase() === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === CURRENTWD) {
                if (token === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === WDPREVTAG) {
                if (token === rule.c2 && tags[index - 1] === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === WDPREVWD) {
                tmp = tokens[index - 1] || '';
                if (token === rule.c2 && tmp.toLowerCase() === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === NEXT1OR2OR3TAG) {
                if (tags[index + 1] === rule.c1 || tags[index + 2] === rule.c1 || tags[index + 3] === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === NEXT2WD) {
                tmp = tokens[index + 2] || '';
                if (tmp.toLowerCase() === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === WDNEXTWD) {
                tmp = tokens[index + 1] || '';
                if (token === rule.c1 && tmp.toLowerCase() === rule.c2) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === WDNEXTTAG) {
                if (token === rule.c1 && tags[index + 1] === rule.c2) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === PREV1OR2OR3TAG) {
                if (tags[index - 1] === rule.c1 || tags[index - 2] === rule.c1 || tags[index - 3] === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === SURROUNDTAG) {
                if (tags[index - 1] === rule.c1 && tags[index + 1] === rule.c2) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === SURROUNDTAGWD) {
                if (token === rule.c1 && tags[index - 1] === rule.c2 && tags[index + 1] === rule.c3) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === NEXTWD) {
                tmp = tokens[index + 1] || '';
                if (tmp.toLowerCase() === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === NEXT1OR2TAG) {
                if (tags[index + 1] === rule.c1 || tags[index + 2] === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === PREV2TAG) {
                if (tags[index - 2] === rule.c1 && tags[index - 1] === rule.c2) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === PREV2TAGNEXTTAG) {
                if (tags[index - 2] === rule.c1 && tags[index - 1] === rule.c2 && tags[index + 1] === rule.c3) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === NEXT2TAG) {
                if (tags[index + 1] === rule.c1 && tags[index + 2] === rule.c2) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === NEXT1OR2WD) {
                tmp = tokens[index + 1] || '';
                tmp2 = tokens[index + 2] || '';
                if (tmp.toLowerCase() === rule.c1 || tmp2.toLowerCase() === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === PREV2WD) {
                tmp2 = tokens[index - 2] || '';
                if (tmp2.toLowerCase() === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === PREV1OR2WD) {
                tmp = tokens[index - 1] || '';
                tmp2 = tokens[index - 2] || '';
                if (tmp.toLowerCase() === rule.c1 || tmp2.toLowerCase() === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            } else if (type === PREV1OR2TAG) {
                tmp = tags[index - 1] || '';
                tmp2 = tags[index - 2] || '';
                if (tmp === rule.c1 || tmp2 === rule.c1) {
                    tags[index] = rule.to;
                    return;
                }
            }

            return;
        },

        // Apply all rules on given token/tag combo
        applyRules: function(token, index, tokens, tags, run) {
            var i;
            for (i = 0; i < rulesLength; i ++) {
                pos.applyRule(rules[i], token, tags[index], index, tokens, tags, run);
            }
        },

        // Apply all rules twice on given arrays of tokens and tags
        apply: function(tokens, tags, blocked) {
            var i, l = tokens.length, j = 0;
            while (j < 2) {
                for (i = 0; i < l; i ++) {
                    if (blocked[i] !== true) {
                        this.applyRules(tokens[i], i, tokens, tags, j);
                    }
                }
                j ++;
            }
            return tags;
        },

        testSuffixes: function(token) {
            var i;
            for (i = 0; i < suffixesLength; i ++) {
                if (token.match(suffixes[i].regexp)) {
                    return suffixes[i].pos;
                }
            }

            return null;
        },

        getTag: function(token) {
            var tag,
                tagObject = factory.tag(),
                j,
                tl,
                lower,
                tmp;

            tagObject.norm = token;

            if (token.length > 1) {
                tag = null;
                for (j = 0, tl = emots.length; j < tl; j ++) {
                    if (token.indexOf(emots[j]) === 0) {
                        tagObject.tag = 'EM';
                        tagObject.blocked = true;
                        tagObject.confidence = 1;
                        return tagObject;
                    }
                }
            }

            // Attempt to get pos in a case sensitive way
            tag = compendium.lexicon[jsKeywords.indexOf(token) > -1 ? '_' + token : token];

            if (!!tag && tag !== '-') {
                tagObject.tag = tag;
                tagObject.blocked = tag.blocked;
                tagObject.confidence = 1;
                return tagObject;
            }

            lower = token.toLowerCase();

            // Test synonyms
            tmp = compendium.synonym(lower);
            if (tmp !== lower) {
                tag = compendium.lexicon[tmp];

                if (!!tag) {
                    tagObject.tag = tag;
                    tagObject.confidence = 1;
                    return tagObject;
                }
            }

            // Test chars streak
            if (lower.match(/(\w)\1+/g)) {
                tmp = removeRepetitiveChars(lower);
                if (!!tmp) {
                    tagObject.norm = tmp;
                    tag = compendium.lexicon[tmp];

                    tagObject.tag = tag;
                    tagObject.confidence = 0.8;
                    return tagObject;
                }
            }

            // If none, try with lower cased
            if (typeof token === 'string' && token.match(/[A-Z]/g)) {
                tag = compendium.lexicon[lower];

                if (!!tag && tag !== '-') {
                    tagObject.tag = tag;
                    tagObject.confidence = 0.75;
                    return tagObject;
                }
            }

            // Test common suffixes.
            tag = pos.testSuffixes(token);
            if (!!tag) {
                tagObject.tag = tag;
                tagObject.confidence = 0.25;
                return tagObject;
            }

            // If no tag, check composed words
            if (token.indexOf('-') > -1) {
                // If capitalized, likely NNP
                if (token.match(/^[A-Z]/g)) {
                    tagObject.tag = 'NNP';
                // Composed words are very often adjectives
                } else {
                    tagObject.tag = 'JJ';
                }
                tagObject.confidence /= 2;
                return tagObject;
            }

            // We default to NN if still no tag
            return tagObject;
        },

        // Tag a tokenized sentence.
        // Apply three passes:
        // 1. Guess a tag based on lexicon + prefixes (see `suffixes.txt`)
        // 2. Manual tranformation rules
        // 3. Apply Brill's conditions from `rules.txt`
        tag: function(sentence) {
            var tags = [],
                blocked = [],
                norms = [],
                token,
                tag,
                i,
                j,
                l = sentence.length,
                tl,
                lower,
                tmp,
                previous,
                inNNP = false,
                confidence = 0,

                append = function(tag, c, b) {
                    tag = typeof tag === 'object' ? tag.pos : tag;
                    tags.push(tag === '-' ? 'NN' : tag);
                    blocked.push(typeof b === 'boolean' ? b : false);
                    confidence += c;
                };

            // Basic tagging based on lexicon and
            // suffixes
            for (i = 0; i < l; i ++) {
                token = sentence[i];
                norms[i] = token;

                // Symbols
                if (token.match(/^[%\+\-\/@]$/g)) {
                    append('SYM', 1, true);
                    continue;
                }

                // Punc signs
                if (token.match(/^(\?|\!|\.){1,}$/g)) {
                    append('.', 1, true);
                    continue;
                }

                // Numbers
                if (token.match(/^-?[0-9]+([\.,][0-9]+)?$/g) ||
                    token.match(complexFloat) ||
                    // years
                    token.match(/^([0-9]{2}|[0-9]{4})s$/g) ||
                    //range
                    token.match(/^[0-9]{2,4}-[0-9]{2,4}$/g)) {
                    append('CD', 1, true);
                    continue;
                }


                tmp = pos.getTag(sentence[i]);
                append(tmp.tag, tmp.confidence, tmp.blocked);
                norms[i] = tmp.norm;
            }

            // Manual transformational rules
            for (i = 0; i < l; i ++) {
                tag = tags[i];

                if (tag === 'SYM' || tag === '.') {
                    continue;
                }



                token = sentence[i];
                lower = token.toLowerCase();
                tl = token.length;
                previous = (i === 0 ? '' : tags[i - 1]);

                // First position rules
                if (i === 0) {
                    // Special case extracted form penn treebank testin
                    if (lower === 'that') {
                        tags[i] = 'DT';
                        confidence ++;
                        continue;
                    }

                    // First position infinitive verb
                    if ((tag === 'NN' || tag === 'VB') && cpd.infinitives.indexOf(lower) > -1) {
                        tags[i] = 'VB';
                        confidence ++;
                        continue;
                    }
                }

                // Convert a noun to a past participle if token ends with 'ed'
                if (tl > 3 && token.match(/[^e]ed$/gi) &&
                    (tag.indexOf('N') === 0) &&
                    (i === 0 || !token.match(/^[A-Z][a-z]+/g))) {
                    tags[i] = 'VBN';
                    continue;
                }

                // Convert a common noun to a present participle verb (i.e., a gerund)
                if (tl > 4 && token.lastIndexOf('ing') === tl - 3 &&
                    cpd.ing_excpt.indexOf(lower) === -1 &&
                    (tag.indexOf('N') === 0 || tag === 'MD') &&
                    (i === 0 || !token.match(/^[A-Z][a-z]+/g)) &&
                    previous !== 'NN' && previous !== 'JJ' && previous !== 'DT' && previous !== 'VBG') {
                    tags[i] = 'VBG';
                    continue;
                }

                // in(g) gerund inference with missing 'g'
                // - 0.002% on Penn Treebank, but VERY useful for
                // casual language
                if (tl > 4 && lower.lastIndexOf('in') === tl - 2 && tag === 'NN' &&
                    (i === 0 || !token.match(/^[A-Z][a-z]+/g)) &&
                    previous !== 'NN' && previous !== 'JJ' && previous !== 'DT' && previous !== 'VBG') {
                    tmp = lexicon[lower + 'g'];
                    if (!!tmp && tmp.pos === 'VBG') {
                        tags[i] = 'VBG';
                        continue;
                    }
                }

                // Check if word could be an infinitive verb
                // + 0.18% on Penn Treebank
                if (previous === 'TO' && cpd.infinitives.indexOf(lower) > -1) {
                    tag = 'VB';
                }

                // Roman numerals, except for I (handled by some brill rules)
                if (previous !== 'DT' && token.match(/^[IVXLCDM]+$/g) && token !== 'I') {
                    tag = 'CD';
                }

                // Proper noun inference
                if (tag === 'NN' ||
                    tag === 'VB' ||
                    (tag === 'JJ' && cpd.nationalities.hasOwnProperty(lower) === false)) {


                    // All uppercased or an acronym, probably NNP
                    if (token.match(/^[A-Z]+$/g) || token.match(/^([a-z]{1}\.)+/gi)) {
                        tag = 'NNP';
                        inNNP = true;
                    // Capitalized words. First token is skipped for this test
                    } else if (i > 0 && matchPotentialProperNoun(token)) {
                        tag = 'NNP';
                        inNNP = true;

                        // First token handled here, avoiding most false positives
                        // of first word of sentence, that is capitalized.
                        // Put in other words, an initial NN or JJ is converted into NNP
                        // only if second word is also an NNP.
                        tmp = sentence[i - 1];
                        if (i === 1 && (previous === 'NN' || previous === 'NNS' || previous === 'JJ' || previous === 'VB') &&
                            matchPotentialProperNoun(tmp)) {
                            tags[i - 1] = 'NNP';
                        }
                    } else {
                        inNNP = false;
                    }

                // Add Roman numeral to proper nouns if we're currently in an NNP
                } else if (inNNP && ((tag === 'CD' && token.match(/^[IVXLCDM]+$/g)) || token === 'I')) {
                    tag = 'NNP';
                } else {
                    inNNP = tag === 'NNP' || tag === 'NNPS';
                }

                // Use inflector to detect plural nouns
                if (tag === 'NN' && isPlural(token)) {
                    tag = 'NNS';
                }

                tags[i] = tag;
            }

            // Finally apply Brill's rules
            pos.apply(sentence, tags, blocked);

            // Last round of manual transformational rules
            for (i = 0; i < l; i ++) {
                token = sentence[i];
                tag = tags[i];
                previous = tags[i - 1] || '';
                if (token.match(/ed$/g)) {
                    if (tag === 'JJ' && (previous === 'VBZ' || previous === 'VBP') && tags[i + 1] === 'TO') {
                        tag = 'VBN';
                    }
                }

                tags[i] = tag;
            }
            return {
                tags: tags,
                norms: norms,
                confidence: confidence / l
            };
        }

    });

    compendium.tag = pos.tag;

}();
