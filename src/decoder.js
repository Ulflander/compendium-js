!function() {
    
    var unescapes = {
            // Borrowed from https://github.com/mathiasbynens/he/blob/master/src/he.js for
            // the HTML entities, and smartquotes from GitHub issue
            // https://github.com/Ulflander/compendium-js/issues/1
            '"': /(&quot;|\u201C|\u201D)/gi,
            '&': /&amp;/gi,
            '\'': /(&#x27;|\u2018|\u2019)/gi,
            '<': /&lt;/gi,
            // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
            // following is not strictly necessary unless it’s part of a tag or an
            // unquoted attribute value. We’re only escaping it to support those
            // situations, and for XML support.
            '>': /&gt;/gi,
            // In Internet Explorer ≤ 8, the backtick character can be used
            // to break out of (un)quoted attribute values or HTML comments.
            // See http://html5sec.org/#102, http://html5sec.org/#108, and
            // http://html5sec.org/#133.
            '`': /&#x60/gi,

            // Damn generation-y and millenials, damn impoliteness
            'shit': /(s\&\^t|sh\*t)/gi,
            'fuck': /(f\*ck)/gi,
            'just kidding': 'j/k',
            'without': /w\/[to]/g,
            'with': 'w/',
            ' out of ': /\soutta\s/gi
        };

    /**
     * Decode a string: replace some HTML entities (such as `&amp;` to `&`) and some 
     * slangs that include some punctuation chars (such as `w/` to `with`). This function
     * is called by the analyser **before** tokenization.
     *
     * @memberOf compendium
     * @param  {String} txt String to decode
     * @return {String}     Decoded string
     */
    compendium.decode = function(txt) {
        var k;
        for (k in unescapes) {
            if (unescapes.hasOwnProperty(k)) {
                txt = txt.replace(unescapes[k], k);
            }
        }
        return txt;
    };
}();