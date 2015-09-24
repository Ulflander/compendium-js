/**
 * Dependency parsing v2.
 */
(function() {



    extend(parser, {
        /**
         * Parse grammar dependencies of a sentence object and
         * set the root property of the sentence.
         *
         * @param  {Sentence} sentence The sentence to be parsed.
         */
        parse: function(sentence) {
            var tags = sentence.tags,
                i, l = sentence.length,
                incr = 0,
                nodes = [];

            // First create a node for every token
            // of the sentence.
            for (i = 0; i < l; i += 1) {
                nodes.push(createNode(tags[i], i, i));
            }

            // First we create the chunks to assign
            // a partial structure of the sentence.
            // In Compendium, chunks are one node.
            //
            //
            // The following will aggregate the nodes
            // that match the chunks signatures.
            //
            // The nodes array will be reduced so it
            // contains only the chunks (and the nodes)
            // that didn't match any chunk.
            buildChunks(nodes);

            // While building chunks, some nodes may have
            // ended as NPT (Temporary NP) or as VPT
            // (Temporary VP). Revert that back to NP and VP.
            nodes.forEach(function(node) {
                if (node.type === 'NPT') {
                    node.type = 'NP';
                } else if (node.type === 'VPT') {
                    node.type = 'VP';
                }
            });

            // From there we add a first layer of
            // recursion by building the fragments.
            buildFragments(nodes);

            // We now run the parser that
            // build the full relationships tree until
            // we have only one node (parsing successful)
            // or we reach the recursion limit.
            //
            // The parser will populate the left and right
            // properties of each node with all their subnodes.
            // It should remain only one node, that is the ROOT.
            //
            // Each time parser run, we'll also attempt to find
            // the sub clauses
            while (incr < 10 && nodes.length > 1) {
                buildRelationships(nodes, incr);
                findSbar(nodes);
                incr += 1;
            }

            // At last we repair the parsing for a few
            // corner case and make it usable for the user.
            repair(nodes, tags, sentence);


            //tmp, should only have one master in all cases
            sentence.root = nodes[0];
            sentence.root.label = 'ROOT';
            sentence.parsed = (nodes.length === 1);

            // @todo: to be handled in a better way
            if (!sentence.parsed) {
                //console.log('Failed parsing: ' + sentence.raw, nodes);
            }
        },

        connect: function(analysis) {

        }

    });

    var chunks = [
        // [ CHUNK_TYPE, [TAGS IN ORDER], STRICT_CHUNK, STRICT_CHUNK_SILENT_MERGE_WITH ]
        ['VPT',     ['RB', 'VBN'], true],
        ['MARK',    ['TO', 'VB', 'RP'], true],
        ['NPT',     ['DT', 'JJ'], true],
        ['NP',      ['NNP', 'CD', 'NNS']],
        ['NP',      ['DT', 'PRP$', 'JJ', 'JJS', '$', 'CD', '$', 'NN', 'NNS']],
        ['NP',      ['DT', 'PRP$', 'JJ', 'JJS', '$', 'CD', '$', 'NNP', 'NNPS']],
        ['NP',      ['CD', 'NNS', 'JJ']],
        ['NPT',     ['DT', 'RB'], true],
        ['VP',      ['MD', 'VBP', 'VB', 'RP']],
        ['VP',      ['MD', 'VBD', 'RP']],
        ['VPT',     ['VBN', 'VPT'], true],
        ['VP',      ['VBZ', 'VPT'], true],
        ['VP',      ['VBZ', 'VBG', 'RP']],
        ['VP',      ['VBP', 'VBG', 'RP']],
        ['VP',      ['VBZ', 'VBN', 'RP']],
        ['NP',      ['NNP', 'NNPS']],
        ['ADJP',    ['RB', 'JJ'], true, ['NP', 'NPT']],
        ['NPT',     ['RB', 'DT'], true, ['NP', 'NPT']],
        ['NP',      ['DT', 'NP']],
        ['ADV',     ['RB', 'RB']],
        ['PP',      'IN'],
        ['PRT',     'RP'],
        ['NP',      'PRP'],
        ['NP',      'NNP'],
        ['NP',      'NNPS'],
        ['NP',      'NN'],
        ['UH',      ['UH', 'UH']],
        ['NP',      'DT'],
        ['ADJ',     'JJ'],
        ['NP',      'NNS'],
        ['NPT',     ['NPT', 'JJ'], true, ['NPT']],
        ['NPT',     ['NPT', ','], true, ['NPT']],
        ['NPT',     ['NPT', 'CC'], true, ['NPT']],
        ['NPT',     ['NPT', 'NPT'], true],
        ['NP',      ['NPT', 'NP'], true, ['NP']],
        ['VAUX',    ['VB', 'RB']],
        ['VAUX',    ['VBP', 'RB'], false, null, ['VBP', 'VB']],
        ['VP',      ['VBP', 'RB', 'VBG'], true],
        ['VAUX',    'MD'],
        ['VP',      'VBZ'],
        ['VP',      'VBP'],
        ['VP',      'VBD'],
        ['VP',      'VBG'],
        ['ADV',     'WRB'],
        ['ADV',     'RB'],
        ['PUNCT',   '.'],
        ['PUNCT',   ','],
        ['PUNCT',   'EM'],
        ['PUNCT',   'SYM'],
        ['SP',      ['PP', 'NP']],
        ['NP',      'CD']
    ];

    var relationships = [
        ['NP', 'SBAR', 0, 'XCOMP'],
        ['VP', 'SBAR', 0, 'XCOMP'],
        ['NP', 'VP', 1, 'NSUBJ'],
        ['NP', 'VB', 1, 'NSUBJ'],
        ['WP', 'VP', 1, 'ATTR'],
        ['VP', 'MARK', 0, 'XCOMP'],
        ['VAUX', 'MARK', 1, 'AUX'],
        ['NP', 'CC', 0, 'CC'],
        ['CC', 'NP', 0, 'CONJ'],
        ['NP', 'NP', 0, 'CONJ'],
        ['VP', 'NP', 0, 'DOBJ'],
        ['VB', 'NP', 0, 'DOBJ'],
        ['PP', 'NP', 0, 'POBJ'],
        ['NP', 'PP', 0, 'PREP'],
        ['VP', 'PP', 0, 'PREP'],
        ['VB', 'PP', 0, 'PREP'],
        ['VP', 'VP', 0, 'CCOMP'],
        ['VB', 'VB', 0, 'CCOMP'],
        ['VP', 'ADV', 0, 'ADVMOD'],
        ['VB', 'ADV', 0, 'ADVMOD'],
        ['ADV', 'PP', 0, 'PREP'],
        ['PP', 'VP', 1, 'PREP'],
        ['UH', 'NP', 1, 'INTJ'],
        ['UH', 'VP', 1, 'INTJ'],
        ['UH', 'VB', 1, 'INTJ'],
        ['UH', 'SBAR', 1, 'INTJ'],
        ['VP', 'ADJ', 0, 'ACOMP'],
        ['VB', 'ADJ', 0, 'ACOMP'],
        ['VB', 'VP', 1, 'AUX'],
        ['VAUX', 'VP', 1, 'AUX'],
        ['VAUX', 'VB', 1, 'AUX'],
        ['VP', 'UH', 0, 'INTJ'],
        ['POS', 'NP', 0, 'COMPOUND'],
        ['NP', 'POS', 0, 'POSS'],
        ['ADV/WRB', 'VP', 1, 'ADVMOD', 0],
        ['VB', 'UH', 0, 'INTJ', 1],
        ['VP', 'PUNCT', 0, 'PUNCT', 1],
        ['VB', 'PUNCT', 0, 'PUNCT', 1],
        ['PUNCT', 'VP', 1, 'PUNCT', 1],
        ['PUNCT', 'VB', 1, 'PUNCT', 1],
        ['CC', 'VP', 1, 'CC', 2],
        ['VP', 'ADJP', 0, 'ACOMP', 2],
        ['ADJP', 'NP', 1, 'ADVMOD', 2],
        ['ADV', 'VP', 1, 'ADVMOD', 2],
        ['ADV', 'VB', 1, 'ADVMOD', 2],
        ['ADV', 'ADV', 1, 'ADVMOD', 2],
        ['VBG', 'ADV', 0, 'ADVMOD', 2],
        ['UH', 'ADV', 0, 'ADVMOD', 2],
        ['NP', 'WDT', 0, 'DOBJ', 2],
        ['NP', 'MARK', 1, 'NSUBJ', 2],
        ['ADV', 'NP', 1, 'ADVMOD', 2],
        ['ADV', 'UH', 1, 'ADVMOD', 2],
        ['ADV', 'UH', 1, 'ADVMOD', 2],
        ['WP$', 'NP', 1, 'ADVMOD', 2],
        ['WP', 'NP', 1, 'ADVMOD', 2],
        ['NP', 'PUNCT', 0, 'PUNCT', 2],
        ['PUNCT', 'NP', 1, 'PUNCT', 2],
    ];

    function buildChunk(chunkId, chunkTags, chunkStrict, silentMergeWith, followedBy, nodes) {
        var left,
            right,
            leftNode,
            rightNode,
            rightNextNode,
            isUnique = typeof chunkTags === 'string',
            l = nodes.length - (isUnique ? 1 : 2);

        for(l; l >= 0; l -= 1) {
            leftNode = nodes[l];


            if (!isUnique) {
                rightNode = nodes[l + 1];
                left = chunkTags.indexOf(leftNode.type);
                right = chunkTags.indexOf(chunkId === chunkTags[1] ? rightNode.type : rightNode.tags[0]);
                if (left > -1 && right > -1 && left <= right) {
                    // Strict chunk: requires left and right to be different
                    // and requires leftNode tags to not have left chunk tag
                    // and same for right node
                    if (chunkStrict) {
                        if (left === right && (rightNode.tags.indexOf(chunkTags[1]) === -1 || leftNode.tags.indexOf(chunkTags[0]) === -1)) {
                            continue;
                        }
                    }

                    rightNextNode = nodes[l + 2];

                    // Check previous node and skip if followedBy
                    // contains it
                    if (followedBy && (!rightNextNode || followedBy.indexOf(rightNextNode.tags[0]) === -1)) {
                        continue;
                    }

                    // in some cases we want to merge silently
                    // with right node, i.e. keep the type of
                    // the right node
                    if (!!silentMergeWith && silentMergeWith.indexOf(rightNode.type) > -1) {
                        leftNode.type = rightNode.type;
                    } else {
                        leftNode.type = chunkId;
                    }
                    leftNode.to = rightNode.to;
                    leftNode.tags = leftNode.tags.concat(rightNode.tags);
                    nodes.splice(l + 1, 1);
                }


            } else if (chunkTags === leftNode.type) {
                leftNode.type = chunkId;
            }
        }
    }

    function buildChunks(nodes) {
        var i, l = chunks.length;
        for (i = 0; i < l; i += 1) {
            buildChunk(chunks[i][0], chunks[i][1], chunks[i][2], chunks[i][3],  chunks[i][4], nodes);
        }
        //console.log(nodes)
    }

    function testNodes(leftNode, rightNode, run) {
        var i, l = relationships.length, left, right, tag, index;
        for (i = 0; i < l; i += 1) {
            left = relationships[i][0];
            right = relationships[i][1];
            index = left.indexOf('/');
            tag = null;
            if (index > -1) {
                tag = left.slice(index + 1);
                left = left.slice(0, index);
            }

            // Dont tests some of the rules before being at given
            // Kind of repair before repair
            if (relationships[i].length > 4 && run < relationships[i][4]) {
                continue;
            }

            // If match, send back the direction of the
            // relationship and its label.
            if (left === leftNode.type && right === rightNode.type && (tag === null || tag === leftNode.tags[0])) {
                return [relationships[i][2], relationships[i][3]];
            }
        }
        return -1;
    }

    function buildRelationships(nodes, run) {
        var l, res, leftNode, rightNode;
        for(l = nodes.length - 2; l >= 0; l -= 1) {
            leftNode = nodes[l];
            rightNode = nodes[l + 1];
            res = testNodes(leftNode, rightNode, run);

            if (res[0] === 0) {
                leftNode.right.push(rightNode);
                nodes.splice(l + 1, 1);
                rightNode.label = res[1];

            } else if (res[0] === 1) {
                if (res[1] === 'NSUBJ' && findByRelationship('NSUBJ', rightNode.left)) {
                    continue;
                }
                rightNode.left.push(leftNode);
                nodes.splice(l, 1);
                leftNode.label = res[1];
            }
        }
    }


    function findSbar(nodes) {
        var l = nodes.length - 1, node, newNode;
        for(; l >= 1; l -= 1) {
            node = nodes[l];
            if (node.type === 'VP' && findByRelationship('NSUBJ', node.left)) {
                newNode = createNode('SBAR');
                newNode.right.push(node);
                node.label = 'ROOT';
                nodes[l] = newNode;
            }
        }
    }

    function buildFragments(nodes) {
        var i = 0,
        l = nodes.length,
            node,
            newNode,
            currFrag = null,
            recursionControl = 0,
            hasRecursion = false;

        for (; i < l; i += 1) {
            node = nodes[i];
            if (!node) {
                break;
            }

            // Enter a fragment
            if (node.type === '(') {
                // A fragment is already open,
                if (currFrag !== null) {
                    hasRecursion = true;
                    recursionControl += 1;
                } else {
                    currFrag = i;
                }
            } else
            // Out of a fragment
            if (node.type === ')' && currFrag !== null) {
                // Closing recursive fragment
                if (recursionControl > 0) {
                    recursionControl -= 1;
                } else {
                    newNode = createNode('FRAG');
                    newNode.right = nodes.splice(currFrag + 1, i - currFrag - 1);
                    i -= i - currFrag;
                    l -= i - currFrag;
                    nodes[i] = newNode;
                    nodes.splice(i + 1, 1);
                    currFrag = null;
                }
            }
        }
    }

    function repair(nodes, tags, sentence) {
        // If VP root,
        // no subject,
        // and one right NP,
        // then this NP become NSUBJ rather than DOBJ
        var tmpRoot = nodes[0],
            l = nodes.length;

        if (tmpRoot.type === 'VP' && !findByRelationship('NSUBJ', tmpRoot.left) && !findByRelationship('NSUBJ', tmpRoot.right)) {
            var res = findByRelationship('DOBJ', nodes[0].right);
            if (!!res) {
                res.label = 'NSUBJ';
            }
        }

        // If nodes last is punc and index is 1,
        // set its parent to 0
        if (l === 2 && nodes[1].type === 'PUNCT') {
            tmpRoot.right.push(nodes[1]);
            nodes[1].label = 'PUNCT';
            nodes.splice(1, 1);
        }

        // Recursively loop onto nodes in order to
        // set the raw and norm properties, make sure
        // also to reorder the children branches.
        reconstruct(nodes, tags, sentence);
    }

    function reconstruct(nodes, tags, sentence) {
        var i = 0, l = nodes.length,
            node,
            j, m,
            raw,
            norm;

        for (i; i < l;  i += 1) {
            node = nodes[i];
            raw = '';
            norm = '';
            for (j = node.from; j <= node.to; j += 1) {
                raw += ' ' + sentence.tokens[j].raw;
                norm += ' ' +sentence.tokens[j].norm;
            }
            node.raw = raw.slice(1);
            node.norm = norm.slice(1);
            reconstruct(node.left, tags, sentence);
            reconstruct(node.right, tags, sentence);
            node.left.sort(function(a, b) {return a.from - b.from;})
            node.right.sort(function(a, b) {return a.from - b.from;})
        }
    }

    function findByType(type, nodes) {
        for (var i = 0, l = nodes.length; i < l; i += 1) {
            if (nodes[i].type === type) {
                return nodes[i];
            }
        }
        return null;
    }

    function findByRelationship(relationship, nodes) {
        for (var i = 0, l = nodes.length; i < l; i += 1) {
            if (nodes[i].label === relationship) {
                return nodes[i];
            }
        }
        return null;
    }

    function createNode(type, from, to, tags) {
        return {
            meta: {},
            left: [],
            right: [],
            tags: tags || [type],
            from: from,
            to: to,
            raw: null,
            norm: null,
            type: type
        }
    };

}());
