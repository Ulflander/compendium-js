(function(){

    var replacements = {
        '2moro': 'tomorrow',
        '2nite': 'tonight',
        'gr8': 'great',
        'l8r': 'later',
        'n\'t': 'not',
        'thx': 'thanks',
        'thks': 'thanks'
    };

    // Takes a one-d array of token (so sentence per sentence)
    // and cleanup some tokens.
    // This method is run before the PoS tagging and it actually 
    // replaces some tokens by a signifiant alternative.
    compendium.clean = function(arr) {
        for (var i = 0, l = arr.length; i < l; i += 1) {
            if (replacements.hasOwnProperty(arr[i])) {
                arr[i] = replacements[arr[i]];
            }
        }
    };
}());