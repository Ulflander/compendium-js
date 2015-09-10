

[{mode: 'Minimal', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium-fr.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),
        lexer = compendium.lexer;


    exports['Le vif renard brun saute par-dessus le chien paresseux.'] = function(test){
        test.deepEqual(['Le vif renard brun saute par-dessus le chien paresseux.'],
                        lexer.sentences('Le vif renard brun saute par-dessus le chien paresseux.', 'fr'));
        test.done();
    };

    exports['Ceci est ma première phrase. Ceci est ma seconde phrase.'] = function(test){
        test.deepEqual(['Ceci est ma première phrase.', 'Ceci est ma seconde phrase.'],
                        lexer.sentences('Ceci est ma première phrase. Ceci est ma seconde phrase.', 'fr'));
        test.done();
    };

    exports['Je suis trop content!!! C\'est un super journée!!!?!!'] = function(test){
        test.deepEqual(['Je suis trop content!!!', 'C\'est un super journée!!!?!!'],
                        lexer.sentences('Je suis trop content!!! C\'est un super journée!!!?!!', 'fr'));
        test.done();
    };

    exports['C\'est une première phrase! Est-ce une autre phrase? ' +
            'Ceci est une troisième phrase... Voilà.'] = function(test){
        test.deepEqual(['C\'est une première phrase!',
                        'Est-ce une autre phrase?',
                        'Ceci est une troisième phrase...',
                        'Voilà.'],

            lexer.sentences('C\'est une première phrase! Est-ce une autre phrase? ' +
                            'Ceci est une troisième phrase... Voilà.', 'fr'));
        test.done();
    };

});
