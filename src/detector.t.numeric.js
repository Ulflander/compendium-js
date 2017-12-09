!function() {

    var numbers = cpd.numbers;

    detectors.init(function(context) {
        context.numericSections = [];
        context.inNumericSection = false;
    });

    // This detector flags numeric values and build an array of
    // potential numeric values as sections
    //
    // Sections are arrays containing at following indices:
    // - 0: section start index
    // - 1: length of section
    // - 2: array of tokens references for all the section
    detectors.before('t', 'numeric', function(token, index, sentence, context) {
        var pos = token.pos,
            sections = context.numericSections;

        if (pos === 'CD' || (pos === 'NNS' && numbers.hasOwnProperty(token.attr.singular))) {
            if (!context.inNumericSection) {
                context.numericSections.push([index, 1, [token]]);
                context.inNumericSection = true;
            } else {
                sections[sections.length - 1][1] += 1;
                sections[sections.length - 1][2].push(token);
            }
        } else if (context.inNumericSection) {
            context.inNumericSection = false;
        }
    });
}();