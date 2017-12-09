!function() {

    var isBeforeProperNoun = function (sentence, index) {
            if (index >= sentence.length) {
                return false;
            }
            var next = sentence.tags[index + 1];
            return next === 'NNP' || next == 'NNPS';
        },
        isSuitableToken = function(tag, norm) {
            return (tag === '&' || tag === 'TO') || (tag === 'CC' && norm !== 'or');
        };

    // Entity detection at the sentence level:
    // consolidate NNP and NNPS
    detectors.before('s', 'entities', function(sentence, index, sentences) {
        var i, l = sentence.length,
            stats = sentence.stats,
            tag,
            token,
            norm,
            lastIndex,
            entity;

        // If sentence is mainly uppercased or capitalized, this strategy cant work
        if (stats.p_upper > 75 || stats.p_cap > 85) {
            return;
        }

        for (i = 0; i < l; i ++) {
            tag = sentence.tags[i];
            token = sentence.tokens[i];
            norm = token.norm;
            if (token.attr.entity > - 1) {
                entity = null;
            } else if (tag === 'NN') {
                entity = null;
            } else if (tag === 'NNP' || tag === 'NNPS' ||
                (!!entity && isSuitableToken(tag, norm) && isBeforeProperNoun(sentence, i))) {
                if (!!entity) {
                    entity.raw += ' ' + token.raw,
                    entity.norm += ' ' + token.norm,
                    entity.toIndex = i;
                    token.attr.entity = lastIndex;
                } else {
                    entity = factory.entity(token, i);
                    lastIndex = token.attr.entity = sentence.entities.push(entity) - 1;
                }
            } else {
                entity = null;
            }
        }


    });
}();