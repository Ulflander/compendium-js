// Tiny detectors manager
(function() {
    // Lists of detectors
    var list = {
            // Detectors that work at a token level
            t: [],
            // Detectors at the sentence level
            s: [],
            // High level detector
            p: []
        };

    detectors.add = function (type, callback) {
        if (list.hasOwnProperty(type)) {
            list[type].push(callback);
        } else {
            console.warn('No detector with type ' + type);
        }
    };

    // Apply all detectors of given type on given arguments
    detectors.apply = function (type) {
        var i, l,
            args = Array.prototype.slice.call(arguments).slice(1);

        if (list.hasOwnProperty(type)) {
            for (i = 0, l = list[type].length; i < l; i += 1) {
                list[type][i].apply(null, args);
            }
        }
    };
    
}());