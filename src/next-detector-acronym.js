(function() {

    next.detect.addDetector('token', function(token, index, sentence) {
        var raw = token.raw;
        if (typeof raw === 'string' && raw.match(/([a-z]\.)+/gi)) {
            token.is_acronym = true;
        }
    });
}());