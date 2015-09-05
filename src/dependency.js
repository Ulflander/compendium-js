
/*
 * Dependency parsing module.
 *
 * Still experimental, requires a lot of additional rules, but is very
 * promising.
 *
 * Constraint based. Constraints are:
 *
 * - The governor is the head of the sentence (it doesnt have a master)
 * - When possible, the governor is the first conjugated verb of the sentence
 * - All other tokens must have a master
 * - A token can have one and only one master
 * - If no master is found for a token, then its master is the governor
 *
 * Inspired by [Syntex (fr)](http://slideplayer.fr/slide/1150457/).
 *
 */
!function() {

    var governors = [
            // First ranked governors
            ['VBZ', 'VBP', 'VBD', 'VBG'],
            // Second ranked governors
            ['MD', 'VB'],
            // Third rank governors
            ['NNP', 'NNPS', 'NN', 'NNS'],
            // Fourth rank
            ['WP', 'WRB'],
            // Fifth rank
            ['UH']
        ],

        default_type = 'unknown',

        // Left to right rules
        left2right = [
            ['NNP', 'NNP', 'compound'],
            ['PRP', 'VBZ', 'subj'],
            ['PRP', 'VBP', 'subj'],
            ['PRP', 'VBD', 'subj'],
            ['DT', 'VBZ', 'subj'],
            ['DT', 'VBP', 'subj'],
            ['DT', 'VBD', 'subj'],
            ['WRB', 'VBP', 'attr'],
            ['WRB', 'VBZ', 'attr'],
            ['WRB', 'VBD', 'attr'],
            ['VBG', 'VBP'],
            ['TO', 'VB'],
            ['TO', 'NN'],
            ['TO', 'NNS'],
            ['DT', 'NN', 'det'],
            ['DT', 'NNP', 'det'],
            ['PRP$', 'NN', 'poss'],
            ['RB', 'JJ', 'advmod'],
            ['JJ', 'NN', 'amod'],
            ['JJ', 'NNS', 'amod'],
            ['JJ', 'NNP', 'amod'],
            ['VBG', 'JJ'],
            ['NN', 'VBZ', 'subj'],
            ['NN', 'VBP', 'subj'],
            ['NN', 'VBD', 'subj'],
            ['NN', 'VB', 'subj'],
            ['NNP', 'VBZ', 'subj'],
            ['NNP', 'VBP', 'subj'],
            ['NNP', 'VBD', 'subj'],
            ['NNP', 'VB', 'subj']
        ],



        right2left = [
            ['PRP', 'VBZ', 'obj'],
            ['PRP', 'VBP', 'obj'],
            ['PRP', 'VBD', 'obj'],
            ['NN', 'IN', 'obj'],
            ['IN', 'VBZ'],
            ['IN', 'VBP'],
            ['IN', 'VBD'],
            ['IN', 'VBG'],
            ['JJ', 'VBD', 'acomp'],
            ['JJ', 'VBP', 'acomp'],
            ['JJ', 'VBZ', 'acomp'],
            ['IN', 'VB'],
            ['CC', 'JJ'],
            ['NNP', 'VB', 'obj'],
            ['NN', 'VB', 'obj'],
            ['VB', 'VB', 'xcomp']
        ],

        REC_LIMIT = 20;

    extend(dependencies, {

        /**
         * Expand the dependencies using existing ones.
         *
         * For example: `the quick brown fox`. We know from the initial rules that
         * `fox` is a master of `brown`.
         *
         * Then on the first left to right pass:
         * - we consider relationship of `the` to `quick` - `quick` doesn't have
         *   any master so we pass this token
         * - we consider relationship of `quick` to `brown`
         * - `brown` has a master (that is `fox`). We select it and check
         *   if a rule apply to `quick/JJ` and `fox/NN`. Indeed the rule exist (it was
         *   the same that allowed to connect `brown` to `fox`), so we now know that
         *   `quick` is also a dependency of `fox`.
         *
         * Then this pass ends. The function will return `true` (changes have been applied),
         * so we know we must call it again.
         *
         * On the second pass:
         * - we consider relationship of `the` to `quick` - `quick` doesn't have
         *   any master so we pass this token
         *
         *
         * @memberOf compendium.dependencies
         * @param  {Sentence} sentence Sentence object
         * @return {Boolean} Value `true` if some changes have been applied, false
         * otherwise
         */
        expand: function(sentence, diff) {
            var i, l = sentence.length,
                j, m = left2right.length,
                r = 0,
                tag,
                next,
                master,
                changes = false,
                token;

            // First expand from left to right
            for (i = 0; i < l - diff; i ++, r = 0) {
                token = sentence.tokens[i];
                if (typeof token.deps.master === 'number') {
                    continue;
                }

                next = sentence.tokens[i + diff];

                // If master already set
                if (token.deps.master === next.deps.master ||
                    // or next master not set
                    typeof next.deps.master !== 'number') {
                    // we skip
                    continue;
                }

                // Gather next token master
                while ((master = sentence.tokens[next.deps.master]) && next !== master && next.deps.master && token.deps.master !== next.deps.master) {
                    r ++;
                    if (r > REC_LIMIT) {
                        break;
                    }

                    tag = token.pos;

                    // And attempt to apply a rule to this combo (current token + next token master)
                    for (j = 0; j < m; j ++) {
                        if (tag === left2right[j][0] && master.pos === left2right[j][1]) {
                            token.deps.master = next.deps.master;
                            token.deps.type = left2right[j][2] || default_type;
                            // If a change is done, set the flag to true
                            changes = true;
                            break;
                        }
                    }
                    if (changes) {
                        break;
                    }
                    next = master;
                }
            }

            // And do the same backward
            for (i = l - 1, m = right2left.length; i > diff; i --) {
                token = sentence.tokens[i];
                if (typeof token.deps.master === 'number') {
                    continue;
                }

                next = sentence.tokens[i - diff];
                if (typeof next.deps.master !== 'number' || token.deps.master === next.deps.master) {
                    continue;
                }

                master = sentence.tokens[next.deps.master];
                tag = token.pos;

                for (j = 0; j < m; j ++) {
                    if (tag === right2left[j][0] && master.pos === right2left[j][1]) {
                        token.deps.master = next.deps.master;
                        token.deps.type = right2left[j][2] || default_type;
                        changes = true;
                        break;
                    }
                }
            }

            return changes;
        },

        /**
         * Loop over sentence tokens and create the dependency hierarchy.
         *
         * @memberOf compendium.dependencies
         * @param  {Sentence} sentence Sentence object
         */
        parse: function(sentence) {
            var i, l = sentence.length,
                j, m = left2right.length,
                r = 0,
                changes = true,
                governor = null,
                lastFirstRank = null,
                rank = 0,
                tag,
                next,
                compound = 0,
                token;

            // Handle special case of only one token in the sentence
            if (l === 1) {
                token = sentence.tokens[0];
                token.deps.governor = true;
                sentence.governor = 0;
                return;
            }

            // First pass: apply the left to right rules
            // so direct left to right relationships are created.
            // This pass also define the governor.
            for (i = 0; i < l - 1; i ++) {
                token = sentence.tokens[i];
                next = sentence.tags[i + 1];
                tag = token.pos;

                //  Test first ranked governors
                if (governors[rank].indexOf(tag) > -1) {
                    // If no governor set, we found one!
                    if (governor === null) {
                        governor = i;
                        lastFirstRank = i;
                    // Otherwise, governor is master of this token
                    } else {
                        token.deps.master = governor;
                    }
                    continue;
                }

                // We check each left2right rule
                for (j = 0; j < m; j ++) {
                    // And we add master if rule apply
                    if (tag === left2right[j][0] && next === left2right[j][1]) {
                        token.deps.master = i + 1;
                        token.deps.type = left2right[j][2] || default_type;
                        break;
                    }
                }
            }

            // Reinforce compounds
            for (i = l - 1; i >= 0; i --) {
                token = sentence.tokens[i];
                next = sentence.tokens[i + 1];
                if (i !== governor) {
                    // Aggregate compounds, compound means we necessarily have the right token
                    if (token.deps.type === 'compound' || token.deps.type === 'det') {
                        // We found a governor before
                        if (governor !== null && governor < i && typeof next.deps.master !== 'number') {
                            next.deps.master = governor;
                            next.deps.type = 'obj';
                        }
                        compound += 1;
                        if (compound > 1) {
                            token.deps.master = next.deps.master;
                        }
                    } else {
                        compound = 0;
                    }
                }
            }

            // Second pass: apply the right to left rules
            // so direct right to left relationships are created
            // Same process than left to right but starting from the end
            for (i = l - 1, m = right2left.length; i > 0; i --) {
                token = sentence.tokens[i];
                if (typeof token.deps.master === 'number') {
                    continue;
                }
                next = sentence.tags[i - 1];
                tag = token.pos;
                for (j = 0; j < m; j ++) {
                    if (tag === right2left[j][0] && next === right2left[j][1]) {
                        token.deps.master = i - 1;
                        token.deps.type = right2left[j][2] || default_type;
                        break;
                    }
                }
            }

            // Third pass, expand the relationships,
            // given the existing masters,
            // both from left to right and right to left.
            while (changes && r < REC_LIMIT) {
                changes = false;
                for (i = 1; i < 5; i += 1) {
                    changes = this.expand(sentence, i) || changes;
                }
                r += 1;
            }

            // If no governor,
            // loop over ranks and attempt to find one
            m = governors.length - 1;
            while (governor === null && rank < m) {
                rank ++;
                // Otherwise try second ranked governors
                for (i = 0; i < l; i ++) {
                    if (governors[rank].indexOf(sentence.tags[i]) > -1) {
                        governor = i;
                        break;
                    }
                }
            }

            if (governor !== null) {
                sentence.governor = governor;
                sentence.tokens[governor].deps.governor = true;
            }

            // Fourth pass, right to left reconnection, skipping
            // governed tokens
            this.reconnect(sentence);

            // Last pass, any token that has no master
            // gets the governor as its master (i.e. any
            // dependency issue should be solved BEFORE here)
            //
            // This pass also creates the `dependencies` array
            // for each token and collect subjects/objects...
            for (i = 0; i < l; i ++) {
                token = sentence.tokens[i];
                if (i !== governor) {
                    if (token.deps.master === null || token.deps.master === i) {
                        token.deps.master = governor;
                    }
                    if (token.deps.master !== null) {
                        sentence.tokens[token.deps.master].deps.dependencies.push(i);
                    }
                    if (token.deps.type === 'subj') {
                        sentence.deps.subjects.push(i);
                    } else if (token.deps.type === 'obj') {
                        sentence.deps.objects.push(i);
                    }
                }
            }


        },

        /**
         * This function creates relationships over existing one, from right to left.
         *
         * @memberOf compendium.dependencies
         * @param  {Sentence} sentence Sentence object
         */
        reconnect: function(sentence) {
            var i, l = sentence.length,
                j, m = right2left.length,
                k,
                tag,
                next,
                master,
                token;

            for (i = l - 1; i >= 0; i --) {
                token = sentence.tokens[i];

                // Skip if already set
                if (token.deps.governor === true || typeof token.deps.master === 'number') {
                    continue;
                }

                // Here is the trick
                // we go backward the tokens
                // until we find one that is not governed
                // by the current one
                k = i;
                master = i;
                while (master === i) {
                    k --;
                    if (k === -1) {
                        break;
                    }

                    master = sentence.tokens[k].deps.master;
                }

                // Didn't find any, skip
                if (k === -1) {
                    continue;
                }

                // Found a token! Test the right 2 left rules
                next = sentence.tags[k];
                tag = token.pos;

                for (j = 0; j < m; j ++) {
                    if (tag === right2left[j][0] && next === right2left[j][1]) {
                        token.deps.master = k;
                        token.deps.type = right2left[j][2] || default_type;
                        break;
                    }
                }
            }
        }
    });
}();
