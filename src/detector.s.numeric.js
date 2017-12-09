!function() {

    var floatChar = cpd.floatChar,
        thousandChar = cpd.thousandChar,

        reHasNumericChar = /[0-9]/,
        reInteger = /^-?[0-9]+$/,
        reFloat = new RegExp('^-?[0-9]*\\' + floatChar + '[0-9]+$'),
        reThousands = new RegExp('^-?[0-9]+([\\' + thousandChar + '][0-9]+){1,}$'),
        // following regexp also used in lexer. share it?
        reThousandsFloat = new RegExp('^-?[0-9]+([\\' + thousandChar + '][0-9]+){1,}(\\' + floatChar + '[0-9]+)$'),
        replaceThousands = new RegExp('\\' + thousandChar, 'g'),

        numWords = cpd.numbers,
        multipliers = cpd.multipliers,

        getSingleValue = function(token) {
            var norm = token.norm;

            // If value has at least one numeric char
            if (norm.match(reHasNumericChar)) {
                if (norm.match(reInteger)) {
                    return parseInt(norm, 10);
                }
                if (norm.match(reFloat)) {
                    return parseFloat(norm);
                }
                if (norm.match(reThousandsFloat)) {
                    return parseFloat(norm.replace(replaceThousands, ''));
                }
                if (norm.match(reThousands)) {
                    return parseInt(norm.replace(replaceThousands, ''), 10);
                }
            }

            norm = token.attr.singular;
            if (numWords.hasOwnProperty(norm)) {
                return numWords[norm];
            }

            return null;
        },

        getSectionValue = function(sentence, section) {
            var token,
                tokens = section[2],
                i,
                l = section[1],
                value = 0,
                single;

            // Only one token for this section
            if (section[1] === 1) {
                token = tokens[0];
                return getSingleValue(token);
            // Many tokens, loop and attempt to solve
            } else {
                for (i = 0; i < l; i += 1) {
                    token = tokens[i];
                    single = getSingleValue(token);
                    if (single === null) {
                        return null;
                    }

                    if (multipliers.indexOf(token.attr.singular) > -1) {
                        value *= single;
                    } else {
                        value += single;
                    }
                }

                return value;
            }

            return null;
        },

        applySectionValue = function(section, value) {
            var tokens = section[2], i, l = tokens.length;
            for (i = 0; i < l; i += 1) {
                tokens[i].attr.value = value;
            }
        };

    // This detector goes accross all numeric sections
    // defined by numeric token detector and attempt
    // to set the final value of the numeric section
    detectors.before('s', 'numeric', function(sentence, index, sentences, context) {
        var sections = context.numericSections, i, l = sections.length, value;
        for (var i = 0; i < l; i += 1) {
            value = getSectionValue(sentence, sections[i]);
            if (value !== null) {
                applySectionValue(sections[i], value);
            }
        }

    });

}();