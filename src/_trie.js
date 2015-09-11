
// @TODO: Trie implementation
(function(){

    var TrieNode = function(key) {
        this.key = key || null;
        this.val = null;
        this.tok = null;
    };

    var Trie = function() {
        this.root = new TrieNode('');
    }

    Trie.prototype.put = function(token, value) {
        var node = this.root,
            letter,
            i, l = token.length;

        for (i = 0; i < l; i += 1) {
            letter = token[i];
            node = node[letter] || (node[letter] = new TrieNode(letter));
        }

        node.tok = token;
        node.val = value;
    };

    Trie.prototype.get = function(token) {
        var node = this.root,
            i, l = token.length;

        for (i = 0; i < l; i += 1) {
            if (!(node = node[token[i]])) {
                break;
            }
        }
        if (node && node.tok) {
            return node.val;
        }
        return null;
    };

    Trie.prototype.has = function(token) {
        return this.get(token) !== null;
    };

    compendium.Trie = Trie;
}());
