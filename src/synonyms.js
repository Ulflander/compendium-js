!function() {
    var s = cpd.synonyms,
        l = s.length;

    compendium.synonym = function(str) {
        var i;
        for (i = 0; i < l; i ++) {
            if (s[i].indexOf(str) > 0) {
                return s[i][0];
            }
        }
        return str;
    };

}();