(function() {

    // @TODO: v1, remove support of deprecated english parser
    extend(dependencies, {
        parse: function(sentence) {}
    });

    extend(parser, {
        /**
         * Parse grammar dependencies of a sentence object and
         * set the root property of the sentence.
         *
         * @param  {Sentence} sentence The sentence to be parsed.
         */
        parse: function(sentence) {
        }
    });
}());
