(function() {
    
    // Entity detection: 
    // consolidate NNP and NNPS 
    compendium.detect.addDetector('s', function(sentence, index, sentences) {
        var i, l = sentence.length,
            entity;

        for (i = 0; i < l; i += 1) {
            if (sentence.tags[i] === 'NNP' || sentence.tags[i] === 'NNPS') {
                if (!!entity) {
                    entity.raw += ' ' + sentence.tokens[i].raw,
                    entity.norm += ' ' + sentence.tokens[i].norm,
                    entity.toIndex = i;
                } else {
                    entity = {
                        raw: sentence.tokens[i].raw,
                        norm: sentence.tokens[i].norm,
                        fromIndex: i,
                        toIndex: i,
                        type: null
                    };
                    sentence.entities.push(entity);
                }
            } else if (!!entity) {
                entity = null;
            }
        }


    });
}());