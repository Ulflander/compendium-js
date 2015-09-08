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
                tree = createNode('ROOT'),
                i, k, l = sentence.length,
                stop = 0;

            var nodes = [];
            // First create a node for every token
            // of the sentence
            for (i = 0; i < l; i += 1) {
                nodes[i] = createNode(tags[i], i, i);
            }

            // First we create the chunks to assign
            // a partial structure of the sentence.
            // In Compendium, chunks are one node.
            //
            // The following will aggregate the nodes
            // that match the chunks signatures.
            //
            // The nodes array will be reduced so it
            // contains only the chunks (and the nodes)
            // that didn't match any chunk.
            buildChunks(nodes);

            // We now run the parser that
            // build the relationships until
            // we have only one node (parsing successful)
            // or we reach the recursion limit.
            //
            // The parser will populate the left and right
            // properties of each node with all their subnodes.
            // It should remain only one node, that is the ROOT.
            while (stop < 10 && nodes.length > 1) {
                buildRelationships(nodes, stop);
                stop += 1;
            }

            // At last we repair the parsing for a few
            // corner case and make it usable for the user.
            repair(nodes, tags, sentence);


            //tmp, should only have one master in all cases
            sentence.root = nodes[0];
            sentence.root.label = 'ROOT';
            if (nodes.length > 1) {
                // console.log('Failed parsing: ' + sentence.raw, nodes);
            }
        },

        connect: function(analysis) {

        }

    });

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

    function buildChunk(chunkId, chunkTags, nodes) {
        var left,
            right,
            leftNode,
            rightNode,
            isUnique = typeof chunkTags === 'string',
            l = nodes.length - (isUnique ? 1 : 2);

        for(l; l >= 0; l -= 1) {
            leftNode = nodes[l];

            if (!isUnique) {
                rightNode = nodes[l + 1];
                left = chunkTags.indexOf(leftNode.type);
                right = chunkTags.indexOf(rightNode.tags[0]);

                if (left > -1 && right > -1 && left <= right) {
                    leftNode.type = chunkId;
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
            buildChunk(chunks[i][0], chunks[i][1], nodes);
        }
    }

    function testNodes(leftType, rightType, run) {
        var i, l = relationships.length, left, right;
        for (i = 0; i < l; i += 1) {
            left = relationships[i][0];
            right = relationships[i][1];

            // Dont tests some of the rules before being at given
            // Kind of repair before repair
            if (relationships[i].length > 4 && run < relationships[i][4]) {
                continue;
            }

            // If match, send back the direction of the
            // relationship and its label.
            if (left === leftType && right === rightType) {
                return [relationships[i][2], relationships[i][3]];
            }
        }
        return -1;
    }

    function buildRelationships(nodes, run) {
        var i, l, last = -1, res, leftNode, rightNode;
        for(l = nodes.length - 2; l >= 0; l -= 1) {
            leftNode = nodes[l];
            rightNode = nodes[l + 1];
            res = testNodes(leftNode.type, rightNode.type, run);

            if (res[0] === 0) {
                leftNode.right.push(rightNode);
                nodes.splice(l + 1, 1);
                rightNode.label = res[1];

            } else if (res[0] === 1) {
                if (res[1] === 'NSUBJ' && findByIs('NSUBJ', rightNode.left)) {
                    continue;
                }
                rightNode.left.push(leftNode);
                nodes.splice(l, 1);
                leftNode.label = res[1];
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

        if (tmpRoot.type === 'VP' && !findByIs('NSUBJ', tmpRoot.left) && !findByIs('NSUBJ', tmpRoot.right)) {
            var res = findByIs('DOBJ', nodes[0].right);
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

    function findByIs(is, nodes) {
        for (var i = 0, l = nodes.length; i < l; i += 1) {
            if (nodes[i].label === is) {
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
            type: type,
            is: null,
        }
    };

}());
