(function() {

    var isPlural = compendium.inflector.isPlural;

    extend(pos.specifics, {
        DEFAULT_TAG: 'NC',
        EMOT_TAG: 'EM',
        PUNC_TAG: 'PONC',
        SYM_TAG: 'SYM',
        NUM_TAG: 'CD',
        ADVERB_TAG: 'ADV',
        ADJECTIVE_TAG: 'ADJ',
        beforeBrill: function(sentence, tags, blocked) {
            var token,
                tag,
                i,
                l = sentence.length,
                tl,
                lower,
                tmp,
                previous,
                inNP = false;

            for (i = 0; i < l; i ++) {
                tag = tags[i];

                if (blocked[i] || tag === 'SYM' || tag === '.') {
                    continue;
                }

                token = sentence[i];
                lower = token.toLowerCase();
                tl = token.length;
                previous = (i === 0 ? '' : tags[i - 1]);

                // Proper noun inference
                if (tag === 'NC') {


                    // All uppercased or an acronym, probably NNP
                    if (token.match(/^[A-Z]+$/g) || token.match(/^([a-z]{1}\.)+/gi)) {
                        tag = 'NP';
                        inNP = true;
                    // Capitalized words. First token is skipped for this test
                    } else if (i > 0 && pos.matchPotentialProperNoun(token)) {
                        tag = 'NP';
                        inNP = true;
                        /*
                        // First token handled here, avoiding most false positives
                        // of first word of sentence, that is capitalized.
                        // Put in other words, an initial NN or JJ is converted into NNP
                        // only if second word is also an NNP.
                        tmp = sentence[i - 1];
                        if (i === 1 && (previous === 'NN' || previous === 'NNS' || previous === 'JJ' || previous === 'VB') &&
                            pos.matchPotentialProperNoun(tmp)) {
                            tags[i - 1] = 'NNP';
                        }
                        */
                    } else {
                        inNP = false;
                    }
                tags[i] = tag;
            }
            }

        }

      })

}());
