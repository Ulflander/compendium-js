(function() {

    next.detect.addDetector('t', function(token, index, sentence) {
        var raw = token.raw;

        // If acronym
        if (typeof raw === 'string' && raw.match(/([a-z]\.)+/gi)) {
            token.is_acronym = true;
        }
    });
}());