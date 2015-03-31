


(function() {

    /*
        The following regexp rules have been extracted from
        http://code.google.com/p/inflection-js/
     */

    /*
      This is a list of nouns that use the same form for both singular and plural.
      This list should remain entirely in lower case to correctly match Strings.
    */
    var uncountable_words = [
            'tuna', 'trout', 'spacecraft', 'salmon', 'halibut', 'aircraft',
            'equipment', 'information', 'rice', 'money', 'species', 'series',
            'fish', 'sheep', 'moose', 'deer', 'news'
        ],

        /*
          These rules translate from the singular form of a noun to its plural form.
        */
        plural_rules = [
            [new RegExp('^index$', 'gi'),                'indices'],
            [new RegExp('^criterion$', 'gi'),            'criteria'],
            [new RegExp('dix$', 'gi'),                   'dices'],
            [new RegExp('(a|o)ch$', 'gi'),               '$1chs'],
            [new RegExp('(m)an$', 'gi'),                 '$1en'],
            [new RegExp('(pe)rson$', 'gi'),              '$1ople'],
            [new RegExp('(child)$', 'gi'),               '$1ren'],
            [new RegExp('^(ox)$', 'gi'),                 '$1en'],
            [new RegExp('(ax|test)is$', 'gi'),           '$1es'],
            [new RegExp('(octop|vir)us$', 'gi'),         '$1i'],
            [new RegExp('(alias|status)$', 'gi'),        '$1es'],
            [new RegExp('(bu)s$', 'gi'),                 '$1ses'],
            [new RegExp('(buffal|tomat|potat|her)o$', 'gi'), '$1oes'],
            [new RegExp('([ti])um$', 'gi'),              '$1a'],
            [new RegExp('sis$', 'gi'),                   'ses'],
            [new RegExp('(?:([^f])fe|([lr])f)$', 'gi'),  '$1$2ves'],
            [new RegExp('(hive)$', 'gi'),                '$1s'],
            [new RegExp('([^aeiouy]|qu)y$', 'gi'),       '$1ies'],
            [new RegExp('(x|ch|ss|sh)$', 'gi'),          '$1es'],
            [new RegExp('(matr|vert|ind)ix|ex$', 'gi'),  '$1ices'],
            [new RegExp('([m|l])ouse$', 'gi'),           '$1ice'],
            [new RegExp('(quiz)$', 'gi'),                '$1zes'],
            [new RegExp('^gas$', 'gi'),                  'gases'],
            [new RegExp('s$', 'gi'),                     's'],
            [new RegExp('$', 'gi'),                      's']
        ],

        /*
          These rules translate from the plural form of a noun to its singular form.
        */
        singular_rules = [
            [new RegExp('(m)en$', 'gi'),                                                       '$1an'],
            [new RegExp('(pe)ople$', 'gi'),                                                    '$1rson'],
            [new RegExp('(child)ren$', 'gi'),                                                  '$1'],
            [new RegExp('([ti])a$', 'gi'),                                                     '$1um'],
            [new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi'), '$1$2sis'],
            [new RegExp('(hive)s$', 'gi'),                                                     '$1'],
            [new RegExp('(tive)s$', 'gi'),                                                     '$1'],
            [new RegExp('(curve)s$', 'gi'),                                                    '$1'],
            [new RegExp('([lr])ves$', 'gi'),                                                   '$1f'],
            [new RegExp('([^fo])ves$', 'gi'),                                                  '$1fe'],
            [new RegExp('([^aeiouy]|qu)ies$', 'gi'),                                           '$1y'],
            [new RegExp('(s)eries$', 'gi'),                                                    '$1eries'],
            [new RegExp('(m)ovies$', 'gi'),                                                    '$1ovie'],
            [new RegExp('(x|ch|ss|sh)es$', 'gi'),                                              '$1'],
            [new RegExp('([m|l])ice$', 'gi'),                                                  '$1ouse'],
            [new RegExp('(bus)es$', 'gi'),                                                     '$1'],
            [new RegExp('(o)es$', 'gi'),                                                       '$1'],
            [new RegExp('(shoe)s$', 'gi'),                                                     '$1'],
            [new RegExp('(cris|ax|test)es$', 'gi'),                                            '$1is'],
            [new RegExp('(octop|vir)i$', 'gi'),                                                '$1us'],
            [new RegExp('(alias|status)es$', 'gi'),                                            '$1'],
            [new RegExp('^(ox)en', 'gi'),                                                      '$1'],
            [new RegExp('(vert|ind)ices$', 'gi'),                                              '$1ex'],
            [new RegExp('(matr)ices$', 'gi'),                                                  '$1ix'],
            [new RegExp('(quiz)zes$', 'gi'),                                                   '$1'],
            [new RegExp('s$', 'gi'),                                                           '']
        ],

        inflector = {},

        /*
          This is a helper method that applies rules based replacement to a String
          Signature:
            apply(str, rules, skip, override) == String
          Arguments:
            str - String - String to modify and return based on the passed rules
            rules - Array: [RegExp, String] - Regexp to match paired with String to use for replacement
            override - String (optional) - String to return as though this method succeeded (used to conform to APIs)
          Returns:
            String - passed String modified by passed rules
          Examples:
            apply("cows", singular_rules) === 'cow'
        */
        apply =  function(str, rules, override) {
            var i,
                l;

            if (uncountable_words.indexOf(str.toLowerCase()) > -1) {
                return str;
            }

            for (i = 0, l = rules.length; i < l; i += 1) {
                if (str.match(rules[i][0])) {
                    str = str.replace(rules[i][0], rules[i][1]);
                    break;
                }
            }
            return str;
        },

        match = function(str, rules) {
            var i,
                l;

            if (uncountable_words.indexOf(str.toLowerCase()) > -1) {
                return false;
            }

            for (i = 0, l = rules.length; i < l; i += 1) {
                if (str.match(rules[i][0])) {
                    return true;
                }
            }
            return false;
        };

    inflector.isSingular = function(str) {
        return match(str, plural_rules);
    };

    inflector.isPlural = function(str) {
        return match(str, singular_rules);
    };

    inflector.isUncountable = function(str) {
        return uncountable_words.indexOf(str) > -1;
    };

    inflector.singularize = function(str) {
        return apply(str, singular_rules);
    };

    inflector.pluralize = function(str) {
        return apply(str, plural_rules);
    };

    next.inflector = inflector;

}());