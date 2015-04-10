
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
        CURRENTWD = 6,
        PREVBIGRAM = 7,
        WDPREVTAG = 8,
        NEXT1OR2OR3TAG = 9,
        NEXTBIGRAM = 10,
        NEXT2WD = 11,
        WDNEXTTAG = 12,
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
        } else if (type === NEXTTAG) {
            if (tags[index + 1] === rule.c1) {
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
            if (pos.applyRule(rules[i], token, tags[index], index, tokens, tags)) {
            }
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
            sentiment = [],
            token,
            tag,
            i,
            l = sentence.length,
            tl,
            previous,
            suffix,
            confidence = l;

        // Basic tagging based on lexicon and 
        // suffixes
        for (i = 0; i < l; i += 1) {

            token = sentence[i];
            // Attempt to get pos in a case sensitive way
            tag = compendium.lexicon[token];

            // If none, try with lower cased
            if (!tag && token.match(/[A-Z]/g)) {
                tag = compendium.lexicon[token.toLowerCase()];
            }

            // Found in lexicon!
            if (!!tag) {
                tags.push(tag.pos);
                sentiment[i] = tag.sentiment;
                continue;

            }

            // Last chance before rules being applied:
            // test common suffixes.
            tag = pos.testSuffixes(token);
            if (!!tag) {
                confidence -= 0.5;
            }

            // We default to NN if still no tag
            if (!tag) {
                confidence -= 1;
                tag = 'NN';
            }
            tags.push(tag);
            sentiment[i] = 0;
        }

        // Transformational rules
        for (i = 0; i < l; i += 1) {
            if (i > 0) {
                previous = sentence[i - 1].toLowerCase();
            }
            token = sentence[i];
            tl = token.length;
            suffix = tl > 3 ? token.slice(tl - 2) : '';
            tag = tags[i];

            // Float numbers
            if (token !== '.' && token.match(/^[0-9\.]+$/g)) {
                tag = 'CD';
            }

            if (tag.indexOf('N') === 0 && tl > 3) {
                // Convert a noun to a past participle if words.get(i) ends with 'ed'
                if (token.indexOf('ed') === tl - 2) {
                    tag = 'VBN';
                // Convert a common noun to a present participle verb (i.e., a gerand)
                } else if (token.indexOf('ing') === tl - 3) {
                    tag = 'VBG';
                }
            }

            // Infer a proper noun if noun or adjective capitalized
            if ((tag === 'NN' || tag === 'JJ') && token.match(/^[A-Z][a-z\.]+$/g)) {
                tag = 'NNP';
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
            sentiment: sentiment,
            confidence: confidence / l
        };
    };

    compendium.pos = pos;
    compendium.tag = pos.tag;

}());