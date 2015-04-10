(function() {
    var detectors = {
            // Detectors that work at a token level
            t: [],
            // Detectors at the sentence level
            s: [],
            // High level detector
            p: []
        },
        detect = {};

    detect.addDetector = function (type, callback) {
        if (detectors.hasOwnProperty(type)) {
            detectors[type].push(callback);
        } else {
            console.warn('No detector with type ' + type);
        }
    };

    detect.apply = function (type) {
        var i, l,
            args = Array.prototype.slice.call(arguments).slice(1);

        if (detectors.hasOwnProperty(type)) {
            for (i = 0, l = detectors[type].length; i < l; i += 1) {
                detectors[type][i].apply(null, args);
            }
        }
    };

    compendium.detect = detect;
    
}());