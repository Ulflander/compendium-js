
(function() {

    var pos = {},
        // Shortcuts
        isPlural = next.inflector.isPlural,

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

        rules = next.compendium.rules,
        rulesLength = rules.length

    pos.applyRule = function(rule, token, tag, index, tokens, tags) {
        if (rule.from !== tag) {
            return 0;
        }
        var type = rule.type,
            tmp,
            tmp2;
        
        if (type === PREVTAG) {
            if (index > 0 && tags[index - 1] === rule.c1) {
                console.log(token, rule.from, ' > ', rule.to, type)
                tags[index] = rule.to;
                return 1;
            }
        } else if (type === NEXTTAG) {
            if (tags[index + 1] === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === PREV1OR2TAG) {
            if (tags[index - 1] === rule.c1 || tags[index - 2] === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === PREVWORD) {
            tmp = tokens[index - 1] || '';
            if (tmp.toLowerCase() === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === CURRENTWD) {
            if (token.toLowerCase() === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === WDPREVTAG) {
            if (token.toLowerCase() === rule.c2 && tags[index - 1] === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === NEXT1OR2OR3TAG) {
            if (tags[index + 1] === rule.c1 || tags[index + 2] === rule.c1 || tags[index + 3] === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === NEXT2WD) {
            if (tokens[index + 2] === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === WDNEXTTAG) {
            if (token === rule.c1 && tags[index + 1] === rule.c2) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === PREV1OR2OR3TAG) {
            if (tags[index - 1] === rule.c1 || tags[index - 2] === rule.c1 || tags[index - 3] === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === SURROUNDTAG) {
            if (tags[index - 1] === rule.c1 && tags[index + 1] === rule.c2) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === NEXTWD) {
            tmp = tokens[index + 1] || '';
            if (tmp.toLowerCase() === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === NEXT1OR2TAG) {
            if (tags[index + 1] === rule.c1 || tags[index + 2] === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === PREV2TAG) {
            if (tags[index - 2] === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === NEXT1OR2WD) {
            tmp = tokens[index + 1] || '';
            tmp2 = tokens[index + 2] || '';
            if (tmp.toLowerCase() === rule.c1 || tmp2.toLowerCase() === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === PREV2WD) {
            tmp2 = tokens[index - 2] || '';
            if (tmp2.toLowerCase() === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        } else if (type === PREV1OR2WD) {
            tmp = tokens[index - 1] || '';
            tmp2 = tokens[index - 2] || '';
            if (tmp.toLowerCase() === rule.c1 || tmp2.toLowerCase() === rule.c1) {
                tags[index] = rule.to;
                console.log(token, rule.from, ' > ', rule.to, type)
                return 1;
            }
        }

        return 0;
    };

    // Apply all rules on given token/tag combo
    pos.applyRules = function(token, tag, index, tokens, tags) {
        var i;
        for (i = 0; i < rulesLength; i += 1) {
            if (pos.applyRule(rules[i], token, tag, index, tokens, tags)) {
                return;
            }
        }
    };

    // Apply all rules on given arrays of tokens and tags
    pos.apply = function(tokens, tags) {
        var i, l = tokens.length;
        for (i = 0; i < l; i += 1) {
            this.applyRules(tokens[i], 
                                    tags[i], 
                                    i, 
                                    tokens, 
                                    tags);
        }
        return tags;
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

        // Basic tags
        for (i = 0; i < l; i += 1) {
            token = sentence[i];
            // Attempt to get pos in a case sensitive way
            tag = next.lexicon[token];

            // If none, try with lower cased
            if (!tag && token.match(/[A-Z]/g)) {
                tag = next.lexicon[token.toLowerCase()];
            }

            if (!!tag) {
                tags.push(tag.pos);
                sentiment[i] = tag.sentiment;
            } else {
                tags.push('NN');
                confidence -= 1;
                sentiment[i] = 0;
            }
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

            // rule 1: DT, {VBD | VBP} --> DT, NN
            if (i > 0 && tags[i - 1] === 'DT' && (tag === 'VBD' || tag === 'VBP' || tag === 'VB')) {
                tag = 'NN';
            }
            // rule 2: convert anything to a number (CD) if token matches a number
            if (token !== '.' && token.match(/^[0-9\.]+$/g)) {
                tag = 'CD';
            }
            // rule 3: convert a noun to a past participle if words.get(i) ends with 'ed'
            if (tag.indexOf('N') === 0 && tl > 3 && token.indexOf('ed') === tl - 2) {
                tag = 'VBN';
                confidence += 1;
            }

            // rule 4: convert any type to adverb if it ends in 'ly';
            if (suffix === 'ly') {
                tag = 'RB';
            }

            // rule 5: convert a common noun (NN or NNS) to a adjective if it ends with 'al'
            if (tag.indexOf('NN') === 0 && suffix === 'al') {
                tag = 'JJ';
            }

            // rule 6: convert a noun to a verb if the preceeding word is 'would'
            if (tag.indexOf('NN') === 0 && (previous === 'would' || previous === 'could')) {
                tag = 'VB';
            }

            // rule 7: if a word has been categorized as a common noun and it ends with 's',
            // then set its type to plural common noun (NNS)
            if (tag.indexOf('NN') === 0 && isPlural(token)) {
                tag = 'NNS';
            }

            // rule 8: convert a common noun to a present participle verb (i.e., a gerand)
            if (tag.indexOf('NN') === 0 && tl > 3 && token.indexOf('ing') === tl - 3) {
                tag = 'VBG';
            }

            // rule 9: convert a common noun to  verb if a personal pronoun before
            if (tag.indexOf('NN') === 0 && i > 0 && tags[i - 1] === 'PRP') {
                tag = 'VBG';
            }

            tags[i] = tag;
            console.log(token, tags[i]);
        }

        // Apply Brill's rules
        pos.apply(sentence, tags);

        for (i = 0; i < l; i += 1) {
            console.log(sentence[i], tags[i]);
        }
        return {
            tags: tags,
            sentiment: sentiment,
            confidence: confidence / l
        };
    };

    next.pos = pos;
    next.tag = pos.tag;

}());