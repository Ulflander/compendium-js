(function() {

    var isBeforeProperNoun = function (sentence, index) {
        if (index >= sentence.length) {
            return false;
        }
        var next = sentence.tags[index + 1];
        return next === 'NNP' || next == 'NNPS';
    };

    // Entity detection at the sentence level: 
    // consolidate NNP and NNPS 
    compendium.detect.addDetector('s', function(sentence, index, sentences) {
        var i, l = sentence.length,
            stats = sentence.stats,
            tag,
            token,
            lastIndex,
            entity;

        // If sentence is mainly uppercased or capitalized, this strategy cant work
        if (stats.p_upper > 75 || stats.p_cap > 75) {
            return;
        }

        for (i = 0; i < l; i += 1) {
            tag = sentence.tags[i];
            token = sentence.tokens[i];
            if (token.attr.entity > - 1) {
                entity = null;
            } else if (tag === 'NN') {
                entity = null;
            } else if (tag === 'NNP' || tag === 'NNPS' || 
                (!!entity && (tag === '&' || tag === 'CC' || tag === 'TO') && isBeforeProperNoun(sentence, i))) {
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
}());