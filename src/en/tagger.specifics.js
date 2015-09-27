(function() {


    var isPlural = compendium.inflector.isPlural;

    extend(pos.specifics, {
        DEFAULT_TAG: 'NN',
        EMOT_TAG: 'EM',
        PUNC_TAG: '.',
        SYM_TAG: 'SYM',
        NUM_TAG: 'CD',
        ADVERB_TAG: 'RB',
        ADJECTIVE_TAG: 'JJ',
        getComposedWordTag: function(token, tagObject) {
            // If capitalized, likely NNP
            if (token.match(/^[A-Z]/g)) {
                tagObject.tag = 'NNP';
            // Composed words are very often adjectives
            } else {
                tagObject.tag = 'JJ';
            }
            tagObject.reason = 'composed word';
            tagObject.confidence /= 2;
            return tagObject;

        },
        beforeBrill: function(sentence, tags) {
            var token,
                lexicon = compendium.lexicon,
                tag,
                i,
                l = sentence.length,
                tl,
                lower,
                tmp,
                previous,
                inNNP = false;


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
                        continue;
                    }

                    // First position infinitive verb
                    if ((tag === 'NN' || tag === 'VB') && cpd.infinitives.indexOf(lower) > -1) {
                        tags[i] = 'VB';
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
                    (tag === 'JJ' && cpd.demonyms.hasOwnProperty(lower) === false)) {


                    // All uppercased or an acronym, probably NNP
                    if (token.match(/^[A-Z]+$/g) || token.match(/^([a-z]{1}\.)+/gi)) {
                        tag = 'NNP';
                        inNNP = true;
                    // Capitalized words. First token is skipped for this test
                    } else if (i > 0 && pos.matchPotentialProperNoun(token)) {
                        tag = 'NNP';
                        inNNP = true;

                        // First token handled here, avoiding most false positives
                        // of first word of sentence, that is capitalized.
                        // Put in other words, an initial NN or JJ is converted into NNP
                        // only if second word is also an NNP.
                        tmp = sentence[i - 1];
                        if (i === 1 && (previous === 'NN' || previous === 'NNS' || previous === 'JJ' || previous === 'VB') &&
                            pos.matchPotentialProperNoun(tmp)) {
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
        },
        afterBrill: function(sentence, tags) {
            var i, l = tags.length, token, tag, previous;
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
        }

    })


}());
