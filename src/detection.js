// Tiny detectors manager
!function() {
    // Lists of detectors to run before dependency parsing
    var before = {
            // Detectors that work at a token level
            t: [],
            // Detectors at the sentence level
            s: []
        },
        after = {
            // Detectors that work at a token level
            t: [],
            // Detectors at the sentence level
            s: [],
            // High level detector
            p: []
        },
        // List of function to call in order
        // to initialize the context for each sentence
        initializers = [];

    detectors.init = function(callback) {
        initializers.push(callback);
    };

    // Generate a brand new, initialized context
    detectors.context = function() {
        var context = {},
            i, l = initializers.length;
        for (i = 0; i < l; i += 1) {
            initializers[i](context);
        }
        return context;
    };

    // Add a detector of given type
    detectors.before = function (type, callback) {
        if (before.hasOwnProperty(type)) {
            before[type].push(callback);
        } else {
            console.warn('No detector with type ' + type);
        }
    };
    detectors.add = function (type, callback) {
        console.warn('compendium.detectors.add is a deprecated function - please use compendium.detectors.after');
        return detectors.after(type, callback);
    };
    detectors.after = function (type, callback) {
        if (after.hasOwnProperty(type)) {
            after[type].push(callback);
        } else {
            console.warn('No detector with type ' + type);
        }
    };

    // Apply all detectors of given type on given arguments
    detectors.apply = function (type, isBefore) {
        var i, l,
            args = Array.prototype.slice.call(arguments).slice(2),
            list = isBefore ? before : after;

        if (list.hasOwnProperty(type)) {
            for (i = 0, l = list[type].length; i < l; i ++) {
                list[type][i].apply(null, args);
            }
        }
    };

}();