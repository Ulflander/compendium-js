!function(){

    var replacements = {
        '2moro': 'tomorrow',
        '2nite': 'tonight',
        'gr8': 'great',
        'l8r': 'later',
        'thx': 'thanks',
        'thks': 'thanks'
    };

    /**
     * Replace some particular slangs in an array of tokens, e.g. tokens 
     * like `2moro` are replaced by regular tokens like `tomorrow`. 
     * This method is run by the analyser after the tokenization, and 
     * before the PoS tagging.
     *
     * @memberOf compendium
     * @param  {Array} arr  A one-dimension array of tokens
     */
    compendium.clean = function(arr) {
        for (var i = 0, l = arr.length; i < l; i += 1) {
            if (replacements.hasOwnProperty(arr[i])) {
                arr[i] = replacements[arr[i]];
            }
        }
    };
}();