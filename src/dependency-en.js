/**
 * Dependency parsing v2.
 */
(function() {

    function getBranch(type, from, to, tags) {
        return {
            meta: {},
            left: [],
            right: [],
            tags: tags || [type],
            from: from,
            to: to,
            raw: null,
            norm: null,
            type: type,
            is: null,
        }
    };

    var chunks = [
        ['NP', ['NNP', 'CD', 'NNS']],
        ['NP', ['DT', 'PRP$', 'JJ', 'JJS', '$', 'CD', '$', 'NN', 'NNS']],
        ['NP', ['DT', 'PRP$', 'JJ', 'JJS', '$', 'CD', '$', 'NNP', 'NNPS']],
        ['VP', ['MD', 'VBP', 'VB']],
        ['VP', ['MD', 'VBD']],
        ['VP', ['VBZ', 'VBG']],
        ['NP', ['NNP', 'NNPS']],
        ['ADV', ['RB', 'RB']],
        ['ADJP', ['RB', 'JJ']],
        ['PP', 'IN'],
        ['PRT', 'RP'],
        ['NP', 'PRP'],
        ['NP', 'NNP'],
        ['NP', 'NNPS'],
        ['NP', 'NN'],
        ['NP', 'DT'],
        ['ADJ', 'JJ'],
        ['NP', 'NNS'],
        ['VAUX', ['VB', 'RB']],
        ['VAUX', ['VBP', 'RB']],
        ['VP', 'VBZ'],
        ['VP', 'VBP'],
        ['VP', 'VBD'],
        ['ADV', 'WRB'],
        ['ADV', 'RB'],
        ['PUNCT', '.'],
        ['PUNCT', ','],
        ['SP', ['PP', 'NP']],
    ];

    var relationships = [
        ['NP', 'VP', 1, 'NSUBJ'],
        ['VP', 'NP', 0, 'DOBJ'],
        ['VB', 'NP', 0, 'DOBJ'],
        ['PP', 'NP', 0, 'POBJ'],
        ['NP', 'PP', 0, 'PREP'],
        ['VP', 'PP', 0, 'PREP'],
        ['VB', 'PP', 0, 'PREP'],
        ['VP', 'VP', 0, 'CCOMP'],
        ['VP', 'ADV', 0, 'ADVMOD'],
        ['VB', 'ADV', 0, 'ADVMOD'],
        ['ADV', 'PP', 0, 'PREP'],
        ['PP', 'VP', 1, 'PREP'],
        ['VP', 'ADJ', 0, 'ACOMP'],
        ['VB', 'ADJ', 0, 'ACOMP'],
        ['VB', 'VP', 1, 'AUX'],
        ['VAUX', 'VP', 1, 'AUX'],
        ['VAUX', 'VB', 1, 'AUX'],
        ['VP', 'PUNCT', 0, 'PUNCT', 1],
        ['VB', 'PUNCT', 0, 'PUNCT', 1],
        ['PUNCT', 'VP', 1, 'PUNCT', 1],
        ['PUNCT', 'VB', 1, 'PUNCT', 1],
        ['ADV', 'VP', 1, 'ADVMOD', 2],
        ['ADV', 'VB', 1, 'ADVMOD', 2],
        ['ADV', 'ADV', 1, 'ADVMOD', 2],
    ];

    function chunkFilter(chunkId, chunkTags, sections) {
        var left,
            right,
            leftSection,
            rightSection,
            isUnique = typeof chunkTags === 'string',
            l = sections.length - (isUnique ? 1 : 2);

        for(l; l >= 0; l -= 1) {
            leftSection = sections[l];

            if (!isUnique) {
                rightSection = sections[l + 1];
                left = chunkTags.indexOf(leftSection.type);
                right = chunkTags.indexOf(rightSection.tags[0]);

                if (left > -1 && right > -1 && left <= right) {
                    leftSection.type = chunkId;
                    leftSection.to = rightSection.to;
                    leftSection.tags = leftSection.tags.concat(rightSection.tags);
                    sections.splice(l + 1, 1);
                }

            } else if (chunkTags === leftSection.type) {
                leftSection.type = chunkId;
            }
        }
    }

    function chunkFilters(sections) {
        var i, l = chunks.length;
        for (i = 0; i < l; i += 1) {
            chunkFilter(chunks[i][0], chunks[i][1], sections);
        }
    }

    function testSections(leftType, rightType, run) {
        var i, l = relationships.length, left, right;
        for (i = 0; i < l; i += 1) {
            left = relationships[i][0];
            right = relationships[i][1];

            // Dont tests some of the rules before being at given
            // Kind of repair before repair
            if (relationships[i].length > 4 && run < relationships[i][4]) {
                continue;
            }

            if (left === leftType && right === rightType) {
                return [relationships[i][2], relationships[i][3]];
            }
        }
        return -1;
    }

    function clauseFilters(sections, run) {
        var i, l, last = -1, res, leftSection, rightSection;
        for(l = sections.length - 2; l >= 0; l -= 1) {
            leftSection = sections[l];
            rightSection = sections[l + 1];
            res = testSections(leftSection.type, rightSection.type, run);

            if (res[0] === 0) {
                leftSection.right.push(rightSection);
                sections.splice(l + 1, 1);
                rightSection.label = res[1];

            } else if (res[0] === 1) {
                if (res[1] === 'NSUBJ' && findByIs('NSUBJ', rightSection.left)) {
                    continue;
                }
                rightSection.left.push(leftSection);
                sections.splice(l, 1);
                leftSection.label = res[1];
            }
        }
    }

    function findByType(type, sections) {
        for (var i = 0, l = sections.length; i < l; i += 1) {
            if (sections[i].type === type) {
                return sections[i];
            }
        }
        return null;
    }

    function findByIs(is, sections) {
        for (var i = 0, l = sections.length; i < l; i += 1) {
            if (sections[i].label === is) {
                return sections[i];
            }
        }
        return null;
    }

    function repair(sections) {
        // If VP root,
        // no subject,
        // and one right NP,
        // then this NP become NSUBJ rather than DOBJ
        var tmpRoot = sections[0],
            l = sections.length;

        if (tmpRoot.type === 'VP' && !findByIs('NSUBJ', tmpRoot.left) && !findByIs('NSUBJ', tmpRoot.right)) {
            var res = findByIs('DOBJ', sections[0].right);
            if (!!res) {
                res.label = 'NSUBJ';
            }
        }

        // If sections last is punc and index is 1,
        // set it parent of 0
        if (l === 2 && sections[1].type === 'PUNCT') {
            tmpRoot.right.push(sections[1]);
            sections[1].label = 'PUNCT';
            sections.splice(1, 1);
        }
    }

    /**
     * Recursively loop onto sections in order to
     * set the raw and norm properties.
     */
    function reconstruct(sections, tags, sentence) {
        var i = 0, l = sections.length,
            section,
            j, m,
            raw,
            norm;
        for (i; i < l;  i += 1) {
            section = sections[i];
            raw = '';
            norm = '';
            for (j = section.from; j <= section.to; j += 1) {
                raw += ' ' + sentence.tokens[j].raw;
                norm += ' ' +sentence.tokens[j].norm;
            }
            section.raw = raw.slice(1);
            section.norm = norm.slice(1);
            reconstruct(section.left, tags, sentence);
            reconstruct(section.right, tags, sentence);
            section.left.sort(function(a, b) {return a.from - b.from;})
            section.right.sort(function(a, b) {return a.from - b.from;})
        }
    }

    extend(parser, {
        parse: function(sentence) {
            var tags = sentence.tags,
                tree = getBranch('ROOT'),
                i, k, l = sentence.length,
                stop = 0;

            var sections = [];
            // initialize headlist with index of tokens
            for (i = 0; i < l; i += 1) {
                sections[i] = getBranch(tags[i], i, i);
            }

            // First pass: non recursive chuncks
            chunkFilters(sections);
            while (stop < 10 && sections.length > 1) {
                clauseFilters(sections, stop);
                stop += 1;
            }

            repair(sections);

            reconstruct(sections, tags, sentence);
            //tmp, should only have one master in all cases
            sentence.root = sections[0];
            sentence.root.label = 'ROOT';
            if (sections.length > 1) {
                // console.log('Failed parsing: ' + sentence.raw, sections);
            }
        }

    });
}());
