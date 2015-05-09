
/*
 * Dependency parsing module.
 *
 * Inspired by Syntex (http://slideplayer.fr/slide/1150457/ [fr])
 */
!function() {
    var left2right = [
        ['VBZ', 'R'],
        ['VBP', 'R'],
        ['VBD', 'R'],
        ['VBG', 'VBP'],
        ['VB', 'R'],
        ['TO', 'VB'],
        ['DT', 'NN'],
        ['DT', 'NN'],
        ['JJ', 'NN'],
        ['JJ', 'NNP'],
        ['NN', 'VBZ'],
        ['NN', 'VBP'],
        ['NN', 'VB']
    ],
    right2left = [
        ['IN', 'VBZ'],
        ['IN', 'VBP'],
        ['IN', 'VBD'],
        ['IN', 'VBG'],
        ['IN', 'VB'],
        ['NN', 'IN']
    ];

    extend(dependencies, {

        // Second pass: use right/left handed existing governors
        reparse: function(sentence) {
            var i, l = sentence.length,
                j, m = left2right.length,
                tag,
                next,
                governor,
                changes = false,
                token;

            for (i = 0; i < l - 1; i += 1) {
                token = sentence.tokens[i];
                next = sentence.tokens[i + 1];
                if (typeof next.deps.governor !== 'number' || token.deps.governor === next.deps.governor) {
                    continue;
                }

                governor = sentence.tokens[next.deps.governor];
                tag = token.pos;

                for (j = 0; j < m; j += 1) {
                    if (tag === left2right[j][0] && governor.pos === left2right[j][1]) {
                        token.deps.governor = next.deps.governor;
                        changes = true;
                    }
                }
            }

            m = right2left.length;

            for (i = l - 1; i > 0; i -= 1) {
                token = sentence.tokens[i];
                next = sentence.tokens[i - 1];
                if (typeof next.deps.governor !== 'number' || token.deps.governor === next.deps.governor) {
                    continue;
                }

                governor = sentence.tokens[next.deps.governor];
                tag = token.pos;

                for (j = 0; j < m; j += 1) {
                    if (tag === left2right[j][0] && governor.pos === left2right[j][1]) {
                        token.deps.governor = next.deps.governor;
                        changes = true;
                    }
                }
            }

            return changes;
        },

        // Loop onto sentence
        // First apply rules
        parse: function(sentence) {
            var i, l = sentence.length,
                j, m = left2right.length,
                changes = true,
                tag,
                next,
                governor,
                token;

            // First pass: check the left 2 right rules
            for (i = 0; i < l - 1; i += 1) {
                token = sentence.tokens[i];
                next = sentence.tags[i + 1];
                tag = token.pos;
                for (j = 0; j < m; j += 1) {
                    if (tag === left2right[j][0] && next === left2right[j][1]) {
                        token.deps.governor = i + 1;
                    }
                }
            }

            m = right2left.length;

            // Second pass: check the left 2 right rules
            for (i = l - 1; i > 0; i -= 1) {
                token = sentence.tokens[i];
                next = sentence.tags[i - 1];
                tag = token.pos;
                for (j = 0; j < m; j += 1) {
                    // console.log(right2left[j], token.raw, tag, next)
                    if (tag === right2left[j][0] && next === right2left[j][1]) {
                        // console.log('Found');
                        token.deps.governor = i - 1;
                    }
                }
            }

            while (changes) {
                changes = this.reparse(sentence);
            }
        }
    });
}();