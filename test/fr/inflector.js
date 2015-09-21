

[{mode: 'Minimal', path: '../../dist/compendium-fr.minimal.js'},
 {mode: 'Full',    path: '../../dist/compendium-fr.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),

    inflector = compendium.inflector;


    exports[pkg.mode + ' mode  - Singular test'] = function(test){
      test.equals('vache', inflector.singularize('vaches'));
      test.equals('vitrail', inflector.singularize('vitraux'));
      test.equals('portail', inflector.singularize('portails'));
      test.equals('vieil', inflector.singularize('vieux'));
      test.equals('gaz', inflector.singularize('gaz'));
      test.equals('nez', inflector.singularize('nez'));
      test.equals('prix', inflector.singularize('prix'));
      test.equals('brebis', inflector.singularize('brebis'));
      test.done();
    }

     exports[pkg.mode + ' mode  - pluralize test']  = function(test){
      test.equals('vaches', inflector.pluralize('vache'));

      test.equals('vitraux', inflector.pluralize('vitrail'));
      test.equals('portails', inflector.pluralize('portail'));
      test.equals('vieux', inflector.pluralize('vieil'));
      test.equals('gaz', inflector.pluralize('gaz'));
      test.equals('nez', inflector.pluralize('nez'));
      test.equals('prix', inflector.pluralize('prix'));
      test.equals('brebis', inflector.pluralize('brebis'));
      test.equals('feux', inflector.pluralize('feu'));
      test.equals('voix', inflector.pluralize('voix'));


      test.done();
    }



});
