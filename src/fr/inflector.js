
/**
 * French inflector:
 * - singularization/pluralization
 * - conjugation
 */
(function() {

    extend(inflector, {
        /**
         * Test if given token (supposed noun) is singular.
         *
         * @memberOf compendium.inflector
         * @param  {String}  str Token to test
         * @return {Boolean}     Value `true` if token is singular, `false` otherwise
         */
        isSingular: function(str) {
            return '';
        },

        /**
         * Test if given token (supposed noun) is plural.
         *
         * @memberOf compendium.inflector
         * @param  {String}  str Token to test
         * @return {Boolean}     Value `true` if token is plural, `false` otherwise
         */
        isPlural: function(str) {
            return '';
        },

        /**
         * Test if given token (supposed noun) is uncountable.
         *
         * @memberOf compendium.inflector
         * @param  {String}  str Token to test
         * @return {Boolean}     Value `true` if token is plural, `false` otherwise
         */
        isUncountable: function(str) {
            return '';
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
            return '';
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
            return '';
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
