
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
            ['MD'],
        ],

        default_type = 'unknown',
        
        // Left to right rules
        left2right = [
            ['PRP', 'VBZ', 'subj'],
            ['PRP', 'VBP', 'subj'],
            ['PRP', 'VBD', 'subj'],
            ['VBG', 'VBP'],
            ['TO', 'VB'],
            ['DT', 'NN'],
            ['DT', 'NN'],
            ['RB', 'JJ', 'advmod'],
            ['JJ', 'NN', 'amod'],
            ['JJ', 'NNP', 'amod'],
            ['NN', 'VBZ', 'subj'],
            ['NN', 'VBP', 'subj'],
            ['NN', 'VB', 'subj']
        ],
        right2left = [
            ['PRP', 'VBZ', 'obj'],
            ['PRP', 'VBP', 'obj'],
            ['PRP', 'VBD', 'obj'],
            ['IN', 'VBZ'],
            ['IN', 'VBP'],
            ['IN', 'VBD'],
            ['IN', 'VBG'],
            ['JJ', 'VBD', 'acomp'],
            ['JJ', 'VBP', 'acomp'],
            ['JJ', 'VBZ', 'acomp'],
            ['IN', 'VB'],
            ['NN', 'IN', 'obj']
        ];

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
        expand: function(sentence) {
            var i, l = sentence.length,
                j, m = left2right.length,
                tag,
                next,
                master,
                changes = false,
                token;

            // First expand from left to right
            for (i = 0; i < l - 1; i ++) {
                token = sentence.tokens[i];
                if (typeof token.deps.master === 'number') {
                    continue;
                }

                next = sentence.tokens[i + 1];

                // If master already set
                if (token.deps.master === next.deps.master || 
                    // or next master not set
                    typeof next.deps.master !== 'number') {
                    // we skip
                    continue;
                }

                // Gather next token master
                master = sentence.tokens[next.deps.master];
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
            }

            // And do the same backward
            for (i = l - 1, m = right2left.length; i > 0; i --) {
                token = sentence.tokens[i];
                if (typeof token.deps.master === 'number') {
                    continue;
                }

                next = sentence.tokens[i - 1];
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
                changes = true,
                governor = null,
                tag,
                next,
                token;

            // Handle special case of only one token in the sentence
            if (l === 1) {
                token = sentence.tokens[0];
                token.deps.governor = true;
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
                if (governors[0].indexOf(tag) > -1) {
                    // If no governor set, we found one!
                    if (governor === null) {
                        governor = i;
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
            while (changes) {
                changes = this.expand(sentence);
            }

            // If no governor
            if (governor === null) {

                // Otherwise try second ranked governors
                for (i = 0; i < l; i ++) {
                    if (governors[1].indexOf(sentence.tags[i]) > -1) {
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
            for (i = 0; i < l; i ++) {
                token = sentence.tokens[i];
                if (i !== governor && token.deps.master === null) {
                    token.deps.master = governor;
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