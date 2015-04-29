


(function() {

    /*
        The following singularization/pluralization regexp rules have
        been extracted from http://code.google.com/p/inflection-js/ 
        and then improved given test unit results.
     */

    /*
      This is a list of nouns that use the same form for both singular and plural.
      This list should remain entirely in lower case to correctly match Strings.
    */
    var uncountable_words = [
            'tuna', 'trout', 'spacecraft', 'salmon', 'halibut', 'aircraft',
            'equipment', 'information', 'rice', 'money', 'species', 'series',
            'fish', 'sheep', 'moose', 'deer', 'news', 'asbestos'
        ],

        /*
          These rules translate from the singular form of a noun to its plural form.
        */
        plural_rules = [
            [/^index$/gi,                'indices'],
            [/^criterion$/gi,            'criteria'],
            [/dix$/gi,                   'dices'],
            [/(a|o)ch$/gi,               '$1chs'],
            [/(m)an$/gi,                 '$1en'],
            [/(pe)rson$/gi,              '$1ople'],
            [/(child)$/gi,               '$1ren'],
            [/^(ox)$/gi,                 '$1en'],
            [/(ax|test)is$/gi,           '$1es'],
            [/(octop|vir)us$/gi,         '$1i'],
            [/(alias|status)$/gi,        '$1es'],
            [/(bu)s$/gi,                 '$1ses'],
            [/(buffal|tomat|potat|her)o$/gi, '$1oes'],
            [/([ti])um$/gi,              '$1a'],
            [/sis$/gi,                   'ses'],
            [/(?:([^f])fe|([lr])f)$/gi,  '$1$2ves'],
            [/(hive)$/gi,                '$1s'],
            [/([^aeiouy]|qu)y$/gi,       '$1ies'],
            [/(x|ch|ss|sh)$/gi,          '$1es'],
            [/(matr|vert|ind)ix|ex$/gi,  '$1ices'],
            [/([m|l])ouse$/gi,           '$1ice'],
            [/(quiz)$/gi,                '$1zes'],
            [/^gas$/gi,                  'gases'],
            [/s$/gi,                     's'],
            [/$/gi,                      's']
        ],

        /*
          These rules translate from the plural form of a noun to its singular form.
        */
        singular_rules = [
            [/(m)en$/gi,                                                       '$1an'],
            [/(pe)ople$/gi,                                                    '$1rson'],
            [/(child)ren$/gi,                                                  '$1'],
            [/([ti])a$/gi,                                                     '$1um'],
            [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses/gi, '$1$2sis'],
            [/(hive)s$/gi,                                                     '$1'],
            [/(tive)s$/gi,                                                     '$1'],
            [/(curve)s$/gi,                                                    '$1'],
            [/([lr])ves$/gi,                                                   '$1f'],
            [/([^fo])ves$/gi,                                                  '$1fe'],
            [/([^aeiouy]|qu)ies$/gi,                                           '$1y'],
            [/(s)eries$/gi,                                                    '$1eries'],
            [/(m)ovies$/gi,                                                    '$1ovie'],
            [/(x|ch|ss|sh)es$/gi,                                              '$1'],
            [/([m|l])ice$/gi,                                                  '$1ouse'],
            [/(bus)es$/gi,                                                     '$1'],
            [/(o)es$/gi,                                                       '$1'],
            [/(shoe)s$/gi,                                                     '$1'],
            [/(cris|ax|test)es$/gi,                                            '$1is'],
            [/(octop|vir)i$/gi,                                                '$1us'],
            [/(alias|status)es$/gi,                                            '$1'],
            [/^(ox)en/gi,                                                      '$1'],
            [/(vert|ind)ices$/gi,                                              '$1ex'],
            [/(matr)ices$/gi,                                                  '$1ix'],
            [/(quiz)zes$/gi,                                                   '$1'],
            [/s$/gi,                                                           '']
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

    
    /**
     * Test if given token (supposed noun) is singular.
     *
     * @memberOf compendium.inflector
     * @param  {String}  str Token to test
     * @return {Boolean}     Value `true` if token is singular, `false` otherwise
     */
    inflector.isSingular = function(str) {
        return inflector.isUncountable(str) || match(str, plural_rules);
    };

    /**
     * Test if given token (supposed noun) is plural.
     *
     * @memberOf compendium.inflector
     * @param  {String}  str Token to test
     * @return {Boolean}     Value `true` if token is plural, `false` otherwise
     */
    inflector.isPlural = function(str) {
        if (str.match(/([saui]s|[^i]a)$/gi)) {
            return false;
        }
        return match(str, singular_rules);
    };

    /**
     * Test if given token (supposed noun) is uncountable.
     *
     * @memberOf compendium.inflector
     * @param  {String}  str Token to test
     * @return {Boolean}     Value `true` if token is plural, `false` otherwise
     */
    inflector.isUncountable = function(str) {
        return uncountable_words.indexOf(str) > -1;
    };

    inflector.singularize = function(str) {
        return inflector.isPlural(str) ? apply(str, singular_rules) : str;
    };

    inflector.pluralize = function(str) {
        return inflector.isSingular(str) ? apply(str, plural_rules) : str;
    };

    /*
        The following methods are experimental for now.
    */


    var conjugateLongVowelConsonant = function (vb, to) {
        if (to === 'VBZ') {
            return vb + 's';
        } else if (to === 'VBG') {
            return vb + 'ing';
        } else if (to === 'VBN') {
            return vb + 'ed';
        }
        return vb;
    };

    var conjugateShortVowelConsonant = function (vb, to) {
        if (to === 'VBZ') {
            return vb + 's';
        } else if (to === 'VBG') {
            return vb + vb[vb.length - 1] + 'ing';
        } else if (to === 'VBN') {
            return vb + vb[vb.length - 1] + 'ed';
        }
        return vb;
    };

    var conjugateConsonentE = function(vb, to) {
        var base = vb.slice(0, vb.length - 1);
        if (to === 'VBZ') {
            return vb + 's';
        } else if (to === 'VBG') {
            return base + 'ing';
        } else if (to === 'VBN') {
            return base + 'ed';
        }
        return vb;
    };

    var conjugateConsonantY = function(vb, to) {
        var base = vb.slice(0, vb.length - 1);
        if (to === 'VBZ') {
            return base + 'ies';
        } else if (to === 'VBG') {
            return vb + 'ing';
        } else if (to === 'VBN') {
            return base + 'ied';
        }
        return vb;
    };

    var conjugateEe = function(vb, to) {
        if (to === 'VBZ') {
            return vb + 's';
        } else if (to === 'VBG') {
            return vb + 'ing';
        } else if (to === 'VBN') {
            return vb + 'd';
        }
        return vb;
    };
    var conjugateUe = function(vb, to) {
        if (to === 'VBZ') {
            return vb + 's';
        } else if (to === 'VBG') {
            return vb.slice(0, vb.length - 1) + 'ing';
        } else if (to === 'VBN') {
            return vb + 'd';
        }
        return vb;
    };
    var conjugateIe = function(vb, to) {
        if (to === 'VBZ') {
            return vb + 's';
        } else if (to === 'VBG') {
            return vb.slice(0, vb.length - 2) + 'ying';
        } else if (to === 'VBN') {
            return vb + 'd';
        }
        return vb;
    };

    var conjugateSibilant = function(vb, to) {
        if (to === 'VBZ') {
            return vb + 'es';
        } else if (to === 'VBG') {
            return vb + 'ing';
        } else if (to === 'VBN') {
            return vb + 'ed';
        }
        return vb;
    };

    inflector.conjugate = function(vb, to) {
        var l = vb[vb.length - 1];
        if (vb.match(/[^aeiou]y$/gi)) {
            return conjugateConsonantY(vb, to);
        } else if (vb.match(/[^aeiouy]e$/gi)) {
            return conjugateConsonentE(vb, to)
        } else if (vb.match(/([aeiuo][ptlgnm]|ir|cur|[^aeiuo][oua][db])$/gi)) {
            return conjugateShortVowelConsonant(vb, to)
        } else if (vb.match(/([ieao]ss|[aeiouy]zz|[aeiouy]ch|nch|rch|[aeiouy]sh|[iae]tch|ax)$/gi)) {
            return conjugateSibilant(vb, to)
        } else if (vb.match(/(ee)$/gi)) {
            return conjugateEe(vb, to)
        } else if (vb.match(/(ie)$/gi)) {
            return conjugateIe(vb, to)
        } else if (vb.match(/(ue)$/gi)) {
            return conjugateUe(vb, to)
        } else if (vb.match(/([uao]m[pb]|[oa]wn|ey|elp|[ei]gn|ilm|o[uo]r|[oa]ugh|igh|ki|ff|oubt|ount|awl|o[alo]d|[iu]rl|upt|[oa]y|ight|oid|empt|act|aud|e[ea]d|ound|[aeiou][srcln]t|ept|dd|[eia]n[dk]|[ioa][xk]|[oa]rm|[ue]rn|[ao]ng|uin|eam|ai[mr]|[oea]w|[eaoui][rscl]k|[oa]r[nd]|ear|er|it|ll)$/gi)) {
            return conjugateLongVowelConsonant(vb, to)
        }

        return null;
    };

    inflector.toPast = function(vb) {
        return inflector.conjugate(vb, 'VBN');
    };

    inflector.toGerund = function(vb) {
        return inflector.conjugate(vb, 'VBG');
    };

    inflector.toPresents = function(vb) {
        return inflector.conjugate(vb, 'VBZ');
    };

    compendium.inflector = inflector;

}());