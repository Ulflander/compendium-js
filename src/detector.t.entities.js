!function() {


    // Flag entities at the token level
    // Reuse same regexps than lexer, so for further optimisation
    // lexer should return the result of the detection along with the tokens
    // and this detector would just create entities objects and link them
    // to the tokens.
    detectors.before('t', 'entities', function(token, index, sentence) {
        var regexps = compendium.lexer.regexps, k, entity,
            raw = ' ' + token.norm + ' ',
            norm,
            i,
            l,
            pl;

        for (k in regexps) {
            if (regexps.hasOwnProperty(k) && raw.match(regexps[k])) {
                entity = factory.entity(token, index, k);
                token.attr.entity = sentence.entities.push(entity) - 1;
                if (entity.type === 'username' || k === 'composite') {
                    token.pos = 'NNP';
                    sentence.tags[index] = 'NNP';
                }

                // Correct sentence confidence
                sentence.stats.confidence += 1 / sentence.length;

                // Let's be kind and normalize this journo thingie
                if (k === 'pl') {
                    entity.type = 'political_affiliation';
                    norm = token.norm.split('-');
                    l = norm[1].length;
                    if (norm[0] === 'd') {
                        entity.meta.party = 'democrat';
                    } else {
                        entity.meta.party = 'republican';
                    }

                    if (norm[1][l - 1] === '.') {
                        i = cpd.abbrs.indexOf(norm[1].slice(0, l-1));
                    } else {
                        i = cpd.abbrs.indexOf(norm[1]);
                    }

                    if (i > -1) {
                        norm[1] = cpd.abbrs_rplt[i];
                    }
                    token.norm = entity.meta.party + ', ' + norm[1];
                }
            }
        }
    });
}();
