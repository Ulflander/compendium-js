(function() {

    var isPlural = compendium.inflector.isPlural,

    removeAccents = function(r){
            r = r.replace(new RegExp(/\s/g),"");
            r = r.replace(new RegExp(/[àáâãäå]/g),"a");
            r = r.replace(new RegExp(/æ/g),"ae");
            r = r.replace(new RegExp(/ç/g),"c");
            r = r.replace(new RegExp(/[èéêë]/g),"e");
            r = r.replace(new RegExp(/[ìíîï]/g),"i");
            r = r.replace(new RegExp(/ñ/g),"n");
            r = r.replace(new RegExp(/[òóôõö]/g),"o");
            r = r.replace(new RegExp(/œ/g),"oe");
            r = r.replace(new RegExp(/[ùúûü]/g),"u");
            r = r.replace(new RegExp(/[ýÿ]/g),"y");
            r = r.replace(new RegExp(/\W/g),"");
            return r;
        };

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
                withoutAccent,
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
                withoutAccent = removeAccents(token)
                tl = token.length;
                previous = (i === 0 ? '' : tags[i - 1]);

                // Proper noun inference
                if (tag === 'NC') {

                    // All uppercased or an acronym, probably NNP
                    if (token.match(/^[A-Z]+$/g) || token.match(/^([a-z]{1}\.)+/gi)) {
                        tag = 'NP';
                        inNP = true;
                    // Capitalized words. First token is skipped for this test
                    // remove accents in french to match Proper Nouns regexps
                    } else if (i > 0 && pos.matchPotentialProperNoun( withoutAccent )) {
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
