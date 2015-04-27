(function(){

    compendium.stat = function(sentence) {
        var i,
            token,
            raw,
            l = sentence.length,
            ln = l, // Normalized length
            stats = sentence.stats,
            tokens_length = 0,
            foreign = 0,
            uppercased = 0,
            capitalized = 0;

        for (i = 0; i < l; i += 1) {
            token = sentence.tokens[i];
            raw = token.raw;
            tokens_length += raw.length;

            if (!raw.match(/[a-z]/gi)) {
                ln -= 1;
                continue;
            }

            if (raw.match(/^[A-Z][a-zA-Z]+$/g)) {
                capitalized += 1;
            }
            if (raw.match(/[A-Z]+/) && !raw.match(/[a-z]/)) {
                uppercased += 1;
            }

            if (sentence.tags[i] === 'FW') {
                foreign += 1;
            }
        }

        if (ln === 0) {
            ln = 1;
        }

        stats.p_foreign = foreign * 100 / ln;
        stats.p_upper = uppercased * 100 / ln;
        stats.p_cap = capitalized * 100 / ln;
        stats.avg_length = tokens_length / ln;
    };
}());