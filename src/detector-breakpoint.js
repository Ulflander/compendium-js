(function() {

    compendium.detect.addDetector('t', function(token, index, sentence) {
        var raw = token.raw,
            pos = token.pos;

        if (pos === ',') {
            token.is_breakpoint = true;
        }
    });
}());