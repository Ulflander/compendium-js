
(function() {

    var pos = {},
        // Shortcuts
        isPlural = next.inflector.isPlural;

    pos.tag = function(sentence) {
        var tags = [],
            sentiment = [],
            token,
            tag,
            i,
            l = sentence.length,
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
            token = sentence[i];
            suffix = token.length > 3 ? token.slice(token.length - 2) : '';
            tag = tags[i];

            // rule 1: DT, {VBD | VBP} --> DT, NN
            if (i > 0 && tags[i - 1] === 'DT' && (tag === 'VBD' || tag === 'VBP' || tag === 'VB')) {
                tags[i] = 'NN';
            }
            // rule 2: convert anything to a number (CD) if token matches a number
            if (token !== '.' && token.match(/^[0-9\.]+$/g)) {
                tags[i] = 'CD';
            }
            // rule 3: convert a noun to a past participle if words.get(i) ends with 'ed'
            if (tag.indexOf('N') === 0 && token.indexOf('ed') === token.length - 2) {
                tags[i] = 'VBN';
                confidence += 1;
            }

            // rule 4: convert any type to adverb if it ends in 'ly';
            if (suffix === 'ly') {
                tags[i] = 'RB';
            }

            // rule 5: convert a common noun (NN or NNS) to a adjective if it ends with 'al'
            if (tag.indexOf('NN') === 0 && suffix === 'al') {
                tags[i] = 'JJ';
            }

            // rule 6: convert a noun to a verb if the preceeding word is 'would'
            console.log(token, sentence[i - 1]);
            if (i > 0 && tag.indexOf('NN') === 0 && sentence[i - 1].toLowerCase() === 'would') {
                tags[i] = 'VB';
            }

            // rule 7: if a word has been categorized as a common noun and it ends with 's',
            // then set its type to plural common noun (NNS)
            if (tag.indexOf('NN') === 0 && isPlural(token)) {
                tags[i] = 'NNS';
            }

            // rule 8: convert a common noun to a present participle verb (i.e., a gerand)
            if (tag.indexOf('NN') === 0 && token.length > 3 && token.indexOf('ing') === token.length - 3) {
                tags[i] = 'VBG';
            }
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