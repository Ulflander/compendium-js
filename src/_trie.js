!function(){
    var Trie = function() {
        this.t_ = {};
    };
    Trie.prototype.add = function(token, meta) {
        throw new Error('Not implmented');
    };
    Trie.prototype.isset = function(token) {
        return this.get(token) !== null;
    };
    Trie.prototype.get = function(token) {
        throw new Error('Not implmented');
    };
}();
