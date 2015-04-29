
(function() {

    var pos = {},

        // Shortcuts
        isPlural = compendium.inflector.isPlural,

        // Brill's conditions
        PREV1OR2TAG = 1,
        PREVTAG = 2,
        NEXTTAG = 3,
        NEXTTAG2 = 4,
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
        NEXTWD = 15,
        NEXT1OR2TAG = 16,
        PREV2TAG = 17,
        NEXT1OR2WD = 18,
        PREV2WD = 19,
        RBIGRAM = 20,
        PREV1OR2WD = 21,

        cpd = compendium.compendium,
        emots = cpd.emots,
        rules = cpd.rules,
        rulesLength = rules.length,
        suffixes = cpd.suffixes,
        suffixesLength = suffixes.length;

    pos.applyRule = function(rule, token, tag, index, tokens, tags) {
        if (rule.from !== tag) {
            return 0;
        }
        var type = rule.type,
            tmp,
            tmp2;

        token = token.toLowerCase();
        
        if (type === PREVTAG) {
            if (index > 0 && tags[index - 1] === rule.c1) {
                tags[index] = rule.to;
                return;
            }
        } else if (type === PREVWORDPREVTAG) {
            tmp = tokens[index - 1] || '';
            if (index > 0 && tags[index - 1] === rule.c2 && tmp.toLowerCase() === rule.c1) {
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
        }

        return 0;
    };

    // Apply all rules on given token/tag combo
    pos.applyRules = function(token, index, tokens, tags) {
        var i;
        for (i = 0; i < rulesLength; i += 1) {
            pos.applyRule(rules[i], token, tags[index], index, tokens, tags);
        }
    };

    // Apply all rules on given arrays of tokens and tags
    pos.apply = function(tokens, tags) {
        var i, l = tokens.length;
        for (i = 0; i < l; i += 1) {
            this.applyRules(tokens[i], i, tokens, tags);
        }
        return tags;
    };

    pos.testSuffixes = function(token) {
        var i;
        for (i = 0; i < suffixesLength; i += 1) {
            if (token.match(suffixes[i].regexp)) {
                return suffixes[i].pos;
            }
        }

        return null;
    };

    // Tag a tokenized sentence.
    // Apply three passes:
    // 1. Guess a tag based on lexicon + prefixes (see `suffixes.txt`)
    // 2. Manual tranformation rules
    // 3. Apply Brill's conditions from `rules.txt`
    pos.tag = function(sentence) {
        var tags = [],
            token,
            tag,
            i,
            l = sentence.length,
            tl,
            lower,
            tmp,
            previous,
            confidence = 0,

            append = function(tag, c) {
                tag = typeof tag === 'object' ? tag.pos : tag;
                tags.push(tag === '-' ? 'NN' : tag);
                confidence += c;
            };

        // Basic tagging based on lexicon and 
        // suffixes
        for (i = 0; i < l; i += 1) {
            token = sentence[i];
            
            if (emots.indexOf(token) > -1) {
                append('EM', 1);
                continue;
            }

            // Attempt to get pos in a case sensitive way
            tag = compendium.lexicon[token];

            if (!!tag && tag !== '-') {
                append(tag, 1);
                continue;
            }

            lower = token.toLowerCase();

            // If none, try with lower cased
            if (typeof token === 'string' && token.match(/[A-Z]/g)) {
                tag = compendium.lexicon[lower];

                if (!!tag && tag !== '-') {
                    append(tag, 0.75);
                    continue;
                }
            }

            // If no tag, check composed words
            if (token.indexOf('-') > -1) {
                // tmp is second part of composed word
                tmp = token.split('-')[1];
                tag = compendium.lexicon[tmp.toLowerCase()];
                if (!!tag && tag !== '-') {
                    append(tag, 0.5);
                    continue;
                }

                // tmp is first part of composed word
                tmp = token.split('-')[0];
                tag = compendium.lexicon[tmp.toLowerCase()];
                if (!!tag && tag !== '-') {
                    append(tag, 0.5);
                    continue;
                }
            }

            // Test common suffixes.
            tag = pos.testSuffixes(token);
            if (!!tag) {
                append(tag, 0.25);
                continue;
            }

            // Test synonyms
            tmp = compendium.synonym(lower);
            if (tmp !== lower) {
                tag = compendium.lexicon[tmp];

                if (!!tag) {
                    append(tag, 0.50);
                    continue;
                }

            }

            // We default to NN if still no tag
            append('NN', 0);
        }

        // Manual transformational rules
        for (i = 0; i < l; i += 1) {
            token = sentence[i];
            lower = token.toLowerCase();
            tl = token.length;
            tag = tags[i];
            previous = (i === 0 ? '' : tags[i - 1]);

            // Special case extracted form penn treebank testin
            if (i === 0 && lower === 'that') {
                tags[i] = 'DT';
                continue;
            }

            // Numbers
            if (token.match(/^-?[0-9]+([\.,][0-9]+)?$/g) ||
                // years
                token.match(/^([0-9]{2}|[0-9]{4})s$/g) ||
                //range
                token.match(/^[0-9]{2,4}-[0-9]{2,4}$/g)) {
                tags[i] = 'CD';
                confidence += 1;
                continue;
            }

            // Symbols
            if (token.match(/^[%\+\-\/@]$/g)) {
                confidence += 1;
                tags[i] = 'SYM';
                continue;
            }

            // Punc signs
            if (token.match(/^(\?|\!|\.){1,}$/g)) {
                confidence += 1;
                tags[i] = '.';
                continue;
            }
            
            // Convert a common noun to a present participle verb (i.e., a gerand)
            if (tl > 4 && token.lastIndexOf('ing') === tl - 3 && 
                cpd.ing_excpt.indexOf(lower) === -1 &&
                (tag.indexOf('N') === 0 || tag === 'MD' || tag === '-') && 
                (i === 0 || !token.match(/^[A-Z][a-z]+/g)) &&
                previous !== 'NN' && previous !== 'JJ' && previous !== 'DT' && previous !== 'VBG') {
                tags[i] = 'VBG';
                continue;
            }

            // Convert a noun to a past participle if token ends with 'ed'
            if (tl > 3 && token.match(/[^e]ed$/gi) && 
                (tag.indexOf('N') === 0 || tag === '-') &&
                (i === 0 || !token.match(/^[A-Z][a-z]+/g))) {
                tags[i] = 'VBN';
                continue;
            }

            // Check if word could be an infinitive verb
            if (cpd.verbs.indexOf(lower) > -1 && (previous === 'TO')) {
                tag = 'VB';
            }

            // Proper noun inference
            if (tag === 'NN' || 
                    tag === 'VB' || 
                    (tag === 'JJ' && cpd.nationalities.hasOwnProperty(lower) === false)) {
                // All uppercased or an acronym, probably NNP
                if (token.match(/^[A-Z]+$/g) || token.match(/^([a-z]{1}\.)+/gi)) {
                    tag = 'NNP';

                // Capitalized words. First sentence is skipped here
                } else if (i > 0 && token.match(/^[A-Z][a-z\.]+$/g)) {
                    // And handled here, avoiding most false positives 
                    // of first word of sentence, that is capitalized.
                    // Put in other words, an initial NN or JJ is converted into NNP
                    // only if second word is also an NNP.
                    if (i === 1 && (previous === 'NN' || previous === 'JJ' || previous === 'VB') && sentence[i - 1].match(/^[A-Z][a-z\.]+$/g)) {
                        tags[i - 1] = 'NNP';
                    }
                    tag = 'NNP';
                }
            }

            // Use inflector to detect plural nouns
            if (tag === 'NN' && isPlural(token)) {
                tag = 'NNS';
            }
            
            tags[i] = tag;
        }

        // Finally 
        pos.apply(sentence, tags);
        pos.apply(sentence, tags);

        return {
            tags: tags,
            confidence: confidence / l
        };
    };

    compendium.pos = pos;
    compendium.tag = pos.tag;

}());