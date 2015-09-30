
/**
 * French inflector:
 * - singularization/pluralization
 * - conjugation
 */
(function() {

    /*
        The following singularization/pluralization regexp rules have
        been extracted from https://github.com/Pent/naturali/blob/master/lib/natural/inflectors/fr/noun_inflector.js
        and then improved given test unit results.
    */

    /*
      This is a list of nouns that use the same form for both singular and plural.
      This list should remain entirely in lower case to correctly match Strings.
    */

    var  uncountable_words = [
      'blé', 'lait', 'sable', 'pluie', 'velours','argent'
    ],

    /*
      These rules translate from the singular form of a noun to its plural form.
    */
    plural_rules = [
        [/^(av|b|c|carnav|cérémoni|chac|corr|emment|emmenth|festiv|fut|gavi|gra|narv|p|récit|rég|rit|rorqu|st)al$/gi, '$1als'],
        [/^(aspir|b|cor|ém|ferm|gemm|soupir|trav|vant|vent|vitr)ail$/gi,                                              '$1aux'],
        [/^(bij|caill|ch|gen|hib|jouj|p|rip|chouch)ou$/gi,                                                            '$1oux'],
        [/^(gr|berimb|don|karb|land|pil|rest|sarr|un)au$/gi,                                                          '$1aus'],
        [/^(bl|ém|enf|pn)eu$/gi,                                                                                      '$1eus'],
        [/(au|eau|eu|œu)$/gi,                                                                                         '$1x'],
        [/vieil$/gi,                                                                                                   'vieux'],
        [/al$/gi,                                                                                                     'aux'],
        [/(s|x|z)$/gi,                                                                                                 '$1'],
        [/s$/gi,                                                                                                      's'],
        [/$/gi,                                                                                                       's']

    ],


    /*
      These rules translate from the plural form of a noun to its singular form.
    */
    singular_rules = [
        [/^(aspir|b|cor|ém|ferm|gemm|soupir|trav|vant|vent|vitr)aux$/i, '$1ail'],
        [/^(aloy|b|bouc|boy|burg|conoy|coy|cr|esquim|ét|fabli|flé|flûti|glu|gr|gru|hoy|joy|kérab|matéri|nobli|noy|pré|sen|sén|t|touch|tuss|tuy|v|ypré)aux$/i, '$1au'],
        [/^(bij|caill|ch|gen|hib|jouj|p|rip|chouch)oux$/i,              '$1ou'],
        [/^(bis)?aïeux$/i,                                              '$1aïeul'],
        [/^apparaux$/i,                                                 'appareil'],  // One way transform, don't put on irregular list.
        [/^ciels$/i,                                                    'ciel'],
        [/^vieux$/i,                                                    'vieil'],
        [/^œils$/i,                                                     'œil'],
        [/(eau|eu|œu)x$/i,                                              '$1'],
        [/aux$/i,                                                       'al'],
        [/(.*)s$/i,                                                     '$1'],
    ],


    /*
      This is a helper method that applies rules based replacement to a String
      Signature:
        apply(str, rules, override) == String
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

        for (i = 0, l = rules.length; i < l; i ++) {
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

        for (i = 0, l = rules.length; i < l; i ++) {
            if (str.match(rules[i][0])) {
                return true;
            }
        }
        return false;
    }


    extend(inflector, {
        /**
         * Test if given token (supposed noun) is singular.
         *
         * @memberOf compendium.inflector
         * @param  {String}  str Token to test
         * @return {Boolean}     Value `true` if token is singular, `false` otherwise
         */
        isSingular: function(str) {
            return inflector.isUncountable(str) || match(str, plural_rules);
        },

        /**
         * Test if given token (supposed noun) is plural.
         *
         * @memberOf compendium.inflector
         * @param  {String}  str Token to test
         * @return {Boolean}     Value `true` if token is plural, `false` otherwise
         */
        isPlural: function(str) {
            if (str.match(/([saui]s|[^i]a)$/gi)) {
                return false;
            }
            return match(str, singular_rules);
        },

        /**
         * Test if given token (supposed noun) is uncountable.
         *
         * @memberOf compendium.inflector
         * @param  {String}  str Token to test
         * @return {Boolean}     Value `true` if token is plural, `false` otherwise
         */
        isUncountable: function(str) {
            return uncountable_words.indexOf(str) > -1;
        },

        /**
         * Singularize given noun. Will test if given noun is plural before
         * singularizing it.
         *
         * @memberOf compendium.inflector
         * @param  {String} str Noun to singularize
         * @return {String}     The singularized noun
         */
        singularize: function(str) {
            return inflector.isPlural(str) ? apply(str, singular_rules) : str;
        },

        /**
         * Pluralize given noun. Will test if given noun is singular before
         * pluralizing it.
         *
         * @memberOf compendium.inflector
         * @param  {String} str Noun to singularize
         * @return {String}     The pluralized noun
         */
        pluralize: function(str) {
            return inflector.isSingular(str) ? apply(str, plural_rules) : str;
        },

        /**
         * Conjugate a verb from its infinitive to given tense.
         *
         * @memberOf compendium.inflector
         * @param  {String} vb Infinitive verb
         * @param  {String} to PoS tag to conjugate to (`VBZ` for third-person present, `VBN` for past tense, `VBG` for gerund)
         * @return {String}    The conjugated verb if a rule has been found, `null` otherwise
         */
        conjugate: function(vb, to) {
            return '';
        },


        /**
         * Conjugate a verb from its infinitive to past tense.
         * This function is a shortcut for `compendium.inflector.conjugate(vb, 'VBN');`.
         *
         * @memberOf compendium.inflector
         * @param  {String} vb Infinitive verb
         * @return {String}    The conjugated verb if a rule has been found, `null` otherwise
         */
        toPast: function(vb) {
            return '';
        },


        /**
         * Conjugate a verb from its infinitive to its gerund.
         * This function is a shortcut for `compendium.inflector.conjugate(vb, 'VBG');`.
         *
         * @memberOf compendium.inflector
         * @param  {String} vb Infinitive verb
         * @return {String}    The conjugated verb if a rule has been found, `null` otherwise
         */
        toGerund: function(vb) {
            return '';
        },

        /**
         * Conjugate a verb from its infinitive to the third-person present tense.
         * This function is a shortcut for `compendium.inflector.conjugate(vb, 'VBZ');`.
         *
         * @memberOf compendium.inflector
         * @param  {String} vb Infinitive verb
         * @return {String}    The conjugated verb if a rule has been found, `null` otherwise
         */
        toPresents: function(vb) {
            return '';
        },

        /**
         * Get the infinitive of given verb token.
         * @param  {String} vb lowercased conjugated verb
         * @return {String}    Lowercased infinitive verb if found, `null` otherwise
         */
        infinitive: function(vb) {
            return '';
        }

    });
    compendium.inflector = inflector;

}());
