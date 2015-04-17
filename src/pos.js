
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

        rules = compendium.compendium.rules,
        rulesLength = rules.length,
        suffixes = compendium.compendium.suffixes,
        suffixesLength = suffixes.length;

    pos.applyRule = function(rule, token, tag, index, tokens, tags) {
        if (rule.from !== tag) {
            return 0;
        }
        var type = rule.type,
            tmp,
            tmp2;
        
        if (type === PREVTAG) {
            if (index > 0 && tags[index - 1] === rule.c1) {
                tags[index] = rule.to;
                return;
            }
        } else if (type === PREVWORDPREVTAG) {
            if (index > 0 && tags[index - 1] === rule.c2 && tokens[index - 1] === rule.c1) {
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
            if (token.toLowerCase() === rule.c1) {
                tags[index] = rule.to;
                return;
            }
        } else if (type === WDPREVTAG) {
            if (token.toLowerCase() === rule.c2 && tags[index - 1] === rule.c1) {
                tags[index] = rule.to;
                return;
            }
        } else if (type === WDPREVWD) {
            tmp = tokens[index - 1] || '';
            if (token.toLowerCase() === rule.c2 && tmp.toLowerCase() === rule.c1) {
                tags[index] = rule.to;
                return;
            }
        } else if (type === NEXT1OR2OR3TAG) {
            if (tags[index + 1] === rule.c1 || tags[index + 2] === rule.c1 || tags[index + 3] === rule.c1) {
                tags[index] = rule.to;
                return;
            }
        } else if (type === NEXT2WD) {
            if (tokens[index + 2] === rule.c1) {
                tags[index] = rule.to;
                return;
            }
        } else if (type === WDNEXTWD) {
            if (token === rule.c1 && tokens[index + 1] === rule.c2) {
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
            if (tags[index - 2] === rule.c1) {
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
            if (suffixes[i].regexp.test(token)) {
                return suffixes[i].pos;
            }
        }

        return null;
    };

    pos.tag = function(sentence) {
        var tags = [],
            token,
            tag,
            i,
            l = sentence.length,
            tl,
            suffix,
            previous,
            confidence = l;

        // Basic tagging based on lexicon and 
        // suffixes
        for (i = 0; i < l; i += 1) {
            token = sentence[i];
            // Attempt to get pos in a case sensitive way
            tag = compendium.lexicon[token];

            // If none, try with lower cased
            if (!tag && typeof token === 'string' && token.match(/[A-Z]/g)) {
                tag = compendium.lexicon[token.toLowerCase()];
            }

            // Found in lexicon!
            if (!!tag) {
                tags.push(tag.pos);
                continue;
            }

            // If no tag, check composed words
            if (token.indexOf('-') > -1) {
                suffix = token.split('-')[1];
                tag = compendium.lexicon[suffix.toLowerCase()];
                if (!!tag) {
                    tags.push(tag.pos);
                    continue;
                }

                suffix = token.split('-')[0];
                tag = compendium.lexicon[suffix.toLowerCase()];
                if (!!tag) {
                    tags.push(tag.pos);
                    continue;
                }
            }

            // Last chance before rules being applied:
            // test common suffixes.
            tag = pos.testSuffixes(token);
            if (!!tag) {
                confidence -= 0.5;
                tags.push(tag);
                continue;
            }


            // We default to NN if still no tag
            if (!tag) {
                confidence -= 1;
                tag = 'NN';
            }
            tags.push(tag);
        }

        // Transformational rules
        for (i = 0; i < l; i += 1) {
            token = sentence[i];
            tl = token.length;
            suffix = tl > 3 ? token.slice(tl - 2) : '';
            tag = tags[i];
            previous = (i === 0 ? '' : tags[i - 1]);

            // Float numbers
            if (token.match(/^[0-9]+(\.[0-9]+)?$/g)) {
                tags[i] = 'CD';
                continue;
            }

            // Punc signs
            if (token.match(/^(\?|\!|\.){1,}$/)) {
                tags[i] = '.';
                continue;
            }

            // Convert a common noun to a present participle verb (i.e., a gerand)
            if (tl > 4 && (tag.indexOf('N') === 0 || tag === 'MD') && token.lastIndexOf('ing') === tl - 3) {
                tags[i] = 'VBG';
                continue;
            } else
            // Convert a noun to a past participle if words.get(i) ends with 'ed'
            if (tl > 3 && tag.indexOf('N') === 0 && token.lastIndexOf('ed') === tl - 2) {
                tags[i] = 'VBN';
                continue;
            }

            // Proper noun inference
            if (tag === 'NN' || tag === 'JJ') {
                // All uppercased or an acronym, probably NNP
                if (token.match(/^[A-Z]+$/g) || token.match(/^([a-z]{1}\.)+/gi)) {
                    tag = 'NNP';

                // Capitalized words. First sentence is skipped here
                } else if (i > 0 && token.match(/^[A-Z][a-z\.]+$/g)) {
                    // And handled here, avoiding most false positives 
                    // of first word of sentence, that is capitalized.
                    // Put in other words, an initial NN or JJ is converted into NNP
                    // only if second word is also an NNP.
                    if (i === 1 && (previous === 'NN' || previous === 'JJ') && sentence[i - 1].match(/^[A-Z][a-z\.]+$/g)) {
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

        pos.apply(sentence, tags);

        return {
            tags: tags,
            confidence: confidence / l
        };
    };

    compendium.pos = pos;
    compendium.tag = pos.tag;

}());