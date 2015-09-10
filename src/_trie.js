
// @TODO: Trie implementation
(function(){
    var TrieNode = function(key, value) {
        this.k = key || null;
        this.v = value || null;
        this.c = null;
    };
    TrieNode.prototype.put = function(token, meta) {
        if (this.c === null) {
            this.c = {};
        }
        return null;
    };
    TrieNode.prototype.isset = function(token) {
        return this.get(token) !== null;
    };
    TrieNode.prototype.get = function(token) {
        return null;
    };

    var Trie = function() {
        this.root = new TrieNode('');
    }
    Trie.prototype.put = function() {

    };

}());
