(function() {
    extend(detectors.specifics, {
        negatePreviousToken: function(token, previous) {
            if (token.pos === 'RB' && previous && (previous.attr.is_verb || previous.pos === 'MD')) {
                previous.profile.negated = true;
            }
        }
    });
} ());
