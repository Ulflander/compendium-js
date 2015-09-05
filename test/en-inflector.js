

[{mode: 'Minimal', path: '../dist/compendium.minimal.js'},
 {mode: 'Full',    path: '../dist/compendium.js',}].forEach(function(pkg) {
    var compendium = require(pkg.path),

    inflector = compendium.inflector;



    exports.Singularize = function(test){
        /*
        test.equals('cow', inflector.singularize('cows'));
        test.equals('person', inflector.singularize('people'));
        test.equals('snake', inflector.singularize('snakes'));
        test.equals('ski', inflector.singularize('skis'));
        test.equals('Barrymore', inflector.singularize('Barrymores'));
        test.equals('witch', inflector.singularize('witches'));
        test.equals('box', inflector.singularize('boxes'));
        test.equals('gas', inflector.singularize('gases'));
        test.equals('kiss', inflector.singularize('kisses'));
        test.equals('index', inflector.singularize('indices'));
        test.equals('appendix', inflector.singularize('appendices'));
        test.equals('criterion', inflector.singularize('criteria'));
        test.equals('berry', inflector.singularize('berries'));
        test.equals('activity', inflector.singularize('activities'));
        test.equals('daisy', inflector.singularize('daisies'));
        test.equals('church', inflector.singularize('churches'));
        test.equals('fox', inflector.singularize('foxes'));
        test.equals('stomach', inflector.singularize('stomachs'));
        test.equals('epoch', inflector.singularize('epochs'));
        test.equals('knife', inflector.singularize('knives'));
        test.equals('half', inflector.singularize('halves'));
        test.equals('scarf', inflector.singularize('scarves'));
        test.equals('chief', inflector.singularize('chiefs'));
        test.equals('spoof', inflector.singularize('spoofs'));
        test.equals('solo', inflector.singularize('solos'));
        test.equals('zero', inflector.singularize('zeros'));
        test.equals('avocado', inflector.singularize('avocados'));
        test.equals('studio', inflector.singularize('studios'));
        test.equals('zoo', inflector.singularize('zoos'));
        test.equals('embryo', inflector.singularize('embryos'));

        test.equals('hero', inflector.singularize('heroes'));
        test.equals('banjo', inflector.singularize('banjos'));
        test.equals('cargo', inflector.singularize('cargos'));
        test.equals('flamingo', inflector.singularize('flamingos'));
        test.equals('fresco', inflector.singularize('frescos'));
        test.equals('ghetto', inflector.singularize('ghettos'));
        test.equals('halo', inflector.singularize('halos'));
        test.equals('mango', inflector.singularize('mangos'));
        test.equals('memento', inflector.singularize('mementos'));
        test.equals('motto', inflector.singularize('mottos'));
        test.equals('tornado', inflector.singularize('tornados'));
        test.equals('tuxedo', inflector.singularize('tuxedos'));
        test.equals('volcano', inflector.singularize('volcanos'));
        test.equals('bus', inflector.singularize('buses'));
        test.equals('crisis', inflector.singularize('crises'));
        test.equals('analysis', inflector.singularize('analyses'));
        test.equals('neurosis', inflector.singularize('neuroses'));
        test.equals('aircraft', inflector.singularize('aircraft'));
        test.equals('halibut', inflector.singularize('halibut'));
        test.equals('moose', inflector.singularize('moose'));
        test.equals('salmon', inflector.singularize('salmon'));
        test.equals('sheep', inflector.singularize('sheep'));
        test.equals('spacecraft', inflector.singularize('spacecraft'));
        test.equals('tuna', inflector.singularize('tuna'));
        test.equals('trout', inflector.singularize('trout'));
        test.equals('armadillo', inflector.singularize('armadillos'));
        test.equals('auto', inflector.singularize('autos'));
        test.equals('bravo', inflector.singularize('bravos'));
        test.equals('bronco', inflector.singularize('broncos'));
        test.equals('casino', inflector.singularize('casinos'));
        test.equals('combo', inflector.singularize('combos'));
        test.equals('gazebo', inflector.singularize('gazebos'));
        */
        test.done();
    };

    exports[pkg.mode + ' mode  - Singular test'] = function(test){
        test.ok(inflector.isSingular('cow'), '"cow" should be considered as singular');
        test.ok(inflector.isSingular('person'), '"person" should be considered as singular');
        test.ok(inflector.isSingular('snake'), '"snake" should be considered as singular');
        test.ok(inflector.isSingular('ski'), '"ski" should be considered as singular');
        test.ok(inflector.isSingular('Barrymore'), '"Barrymore" should be considered as singular');
        test.ok(inflector.isSingular('witch'), '"witch" should be considered as singular');
        test.ok(inflector.isSingular('box'), '"box" should be considered as singular');
        test.ok(inflector.isSingular('gas'), '"gas" should be considered as singular');
        test.ok(inflector.isSingular('kiss'), '"kiss" should be considered as singular');
        test.ok(inflector.isSingular('index'), '"index" should be considered as singular');
        test.ok(inflector.isSingular('appendix'), '"appendix" should be considered as singular');
        test.ok(inflector.isSingular('criterion'), '"criterion" should be considered as singular');
        test.ok(inflector.isSingular('berry'), '"berry" should be considered as singular');
        test.ok(inflector.isSingular('activity'), '"activity" should be considered as singular');
        test.ok(inflector.isSingular('daisy'), '"daisy" should be considered as singular');
        test.ok(inflector.isSingular('church'), '"church" should be considered as singular');
        test.ok(inflector.isSingular('fox'), '"fox" should be considered as singular');
        test.ok(inflector.isSingular('stomach'), '"stomach" should be considered as singular');
        test.ok(inflector.isSingular('epoch'), '"epoch" should be considered as singular');
        test.ok(inflector.isSingular('knife'), '"knife" should be considered as singular');
        test.ok(inflector.isSingular('half'), '"half" should be considered as singular');
        test.ok(inflector.isSingular('scarf'), '"scarf" should be considered as singular');
        test.ok(inflector.isSingular('chief'), '"chief" should be considered as singular');
        test.ok(inflector.isSingular('spoof'), '"spoof" should be considered as singular');
        test.ok(inflector.isSingular('solo'), '"solo" should be considered as singular');
        test.ok(inflector.isSingular('zero'), '"zero" should be considered as singular');
        test.ok(inflector.isSingular('avocado'), '"avocado" should be considered as singular');
        test.ok(inflector.isSingular('studio'), '"studio" should be considered as singular');
        test.ok(inflector.isSingular('zoo'), '"zoo" should be considered as singular');
        test.ok(inflector.isSingular('embryo'), '"embryo" should be considered as singular');
        test.ok(inflector.isSingular('hero'), '"hero" should be considered as singular');
        test.ok(inflector.isSingular('banjo'), '"banjo" should be considered as singular');
        test.ok(inflector.isSingular('cargo'), '"cargo" should be considered as singular');
        test.ok(inflector.isSingular('flamingo'), '"flamingo" should be considered as singular');
        test.ok(inflector.isSingular('fresco'), '"fresco" should be considered as singular');
        test.ok(inflector.isSingular('ghetto'), '"ghetto" should be considered as singular');
        test.ok(inflector.isSingular('halo'), '"halo" should be considered as singular');
        test.ok(inflector.isSingular('mango'), '"mango" should be considered as singular');
        test.ok(inflector.isSingular('memento'), '"memento" should be considered as singular');
        test.ok(inflector.isSingular('motto'), '"motto" should be considered as singular');
        test.ok(inflector.isSingular('tornado'), '"tornado" should be considered as singular');
        test.ok(inflector.isSingular('tuxedo'), '"tuxedo" should be considered as singular');
        test.ok(inflector.isSingular('volcano'), '"volcano" should be considered as singular');
        test.ok(inflector.isSingular('bus'), '"bus" should be considered as singular');
        test.ok(inflector.isSingular('crisis'), '"crisis" should be considered as singular');
        test.ok(inflector.isSingular('analysis'), '"analysis" should be considered as singular');
        test.ok(inflector.isSingular('neurosis'), '"neurosis" should be considered as singular');
        test.ok(inflector.isSingular('aircraft'), '"aircraft" should be considered as singular');
        test.ok(inflector.isSingular('halibut'), '"halibut" should be considered as singular');
        test.ok(inflector.isSingular('moose'), '"moose" should be considered as singular');
        test.ok(inflector.isSingular('salmon'), '"salmon" should be considered as singular');
        test.ok(inflector.isSingular('sheep'), '"sheep" should be considered as singular');
        test.ok(inflector.isSingular('spacecraft'), '"spacecraft" should be considered as singular');
        test.ok(inflector.isSingular('tuna'), '"tuna" should be considered as singular');
        test.ok(inflector.isSingular('trout'), '"trout" should be considered as singular');
        test.ok(inflector.isSingular('armadillo'), '"armadillo" should be considered as singular');
        test.ok(inflector.isSingular('auto'), '"auto" should be considered as singular');
        test.ok(inflector.isSingular('bravo'), '"bravo" should be considered as singular');
        test.ok(inflector.isSingular('bronco'), '"bronco" should be considered as singular');
        test.ok(inflector.isSingular('casino'), '"casino" should be considered as singular');
        test.ok(inflector.isSingular('combo'), '"combo" should be considered as singular');
        test.ok(inflector.isSingular('gazebo'), '"gazebo" should be considered as singular');
        test.done();
    };

    exports.Pluralize = function(test){
        test.equals('cows', inflector.pluralize('cow'));
        test.equals('people', inflector.pluralize('person'));
        test.equals('snakes', inflector.pluralize('snake'));
        test.equals('skis', inflector.pluralize('ski'));
        test.equals('Barrymores', inflector.pluralize('Barrymore'));
        test.equals('witches', inflector.pluralize('witch'));
        test.equals('boxes', inflector.pluralize('box'));
        test.equals('gases', inflector.pluralize('gas'));
        test.equals('kisses', inflector.pluralize('kiss'));
        test.equals('indices', inflector.pluralize('index'));
        test.equals('appendices', inflector.pluralize('appendix'));
        test.equals('criteria', inflector.pluralize('criterion'));
        test.equals('berries', inflector.pluralize('berry'));
        test.equals('activities', inflector.pluralize('activity'));
        test.equals('daisies', inflector.pluralize('daisy'));
        test.equals('churches', inflector.pluralize('church'));
        test.equals('foxes', inflector.pluralize('fox'));
        test.equals('stomachs', inflector.pluralize('stomach'));
        test.equals('epochs', inflector.pluralize('epoch'));
        test.equals('knives', inflector.pluralize('knife'));
        test.equals('halves', inflector.pluralize('half'));
        test.equals('scarves', inflector.pluralize('scarf'));
        test.equals('chiefs', inflector.pluralize('chief'));
        test.equals('spoofs', inflector.pluralize('spoof'));
        test.equals('solos', inflector.pluralize('solo'));
        test.equals('zeros', inflector.pluralize('zero'));
        test.equals('avocados', inflector.pluralize('avocado'));
        test.equals('studios', inflector.pluralize('studio'));
        test.equals('zoos', inflector.pluralize('zoo'));
        test.equals('embryos', inflector.pluralize('embryo'));
        test.equals('heroes', inflector.pluralize('hero'));
        test.equals('banjos', inflector.pluralize('banjo'));
        test.equals('cargos', inflector.pluralize('cargo'));
        test.equals('flamingos', inflector.pluralize('flamingo'));
        test.equals('frescos', inflector.pluralize('fresco'));
        test.equals('ghettos', inflector.pluralize('ghetto'));
        test.equals('halos', inflector.pluralize('halo'));
        test.equals('mangos', inflector.pluralize('mango'));
        test.equals('mementos', inflector.pluralize('memento'));
        test.equals('mottos', inflector.pluralize('motto'));
        test.equals('tornados', inflector.pluralize('tornado'));
        test.equals('tuxedos', inflector.pluralize('tuxedo'));
        test.equals('volcanos', inflector.pluralize('volcano'));
        test.equals('buses', inflector.pluralize('bus'));
        test.equals('crises', inflector.pluralize('crisis'));
        test.equals('analyses', inflector.pluralize('analysis'));
        test.equals('neuroses', inflector.pluralize('neurosis'));
        test.equals('aircraft', inflector.pluralize('aircraft'));
        test.equals('halibut', inflector.pluralize('halibut'));
        test.equals('moose', inflector.pluralize('moose'));
        test.equals('salmon', inflector.pluralize('salmon'));
        test.equals('sheep', inflector.pluralize('sheep'));
        test.equals('spacecraft', inflector.pluralize('spacecraft'));
        test.equals('tuna', inflector.pluralize('tuna'));
        test.equals('trout', inflector.pluralize('trout'));
        test.equals('armadillos', inflector.pluralize('armadillo'));
        test.equals('autos', inflector.pluralize('auto'));
        test.equals('bravos', inflector.pluralize('bravo'));
        test.equals('broncos', inflector.pluralize('bronco'));
        test.equals('casinos', inflector.pluralize('casino'));
        test.equals('combos', inflector.pluralize('combo'));
        test.equals('gazebos', inflector.pluralize('gazebo'));
        test.done();
    };

    exports[pkg.mode + ' mode  - Plural test'] = function(test){

        test.done();
    };


    exports[pkg.mode + ' mode  - Conjugation'] = function(test){
        test.equals('chopped', inflector.toPast('chop'));
        test.equals('worried', inflector.toPast('worry'));
        test.equals('worries', inflector.toPresents('worry'));
        test.equals('worrying', inflector.toGerund('worry'));
        test.equals('agreed', inflector.toPast('agree'));
        test.equals('agrees', inflector.toPresents('agree'));
        test.equals('agreeing', inflector.toGerund('agree'));
        test.equals('argued', inflector.toPast('argue'));
        test.equals('argues', inflector.toPresents('argue'));
        test.equals('arguing', inflector.toGerund('argue'));
        test.equals('lunched', inflector.toPast('lunch'));
        test.equals('lunches', inflector.toPresents('lunch'));
        test.equals('lunching', inflector.toGerund('lunch'));
        test.equals('banned', inflector.toPast('ban'));
        test.equals('bans', inflector.toPresents('ban'));
        test.equals('banning', inflector.toGerund('ban'));
        test.equals('begged', inflector.toPast('beg'));
        test.equals('begs', inflector.toPresents('beg'));
        test.equals('begging', inflector.toGerund('beg'));
        test.equals('lied', inflector.toPast('lie'));
        test.equals('lies', inflector.toPresents('lie'));
        test.equals('lying', inflector.toGerund('lie'));
        test.done();
    };


    exports[pkg.mode + ' mode  - Infinitive'] = function(test) {
        test.equals(inflector.infinitive('went'), 'go');
        test.equals(inflector.infinitive('spoken'), 'speak');
        test.equals(inflector.infinitive('awoken'), 'awake');
        test.equals(inflector.infinitive('arrived'), 'arrive');
        test.equals(inflector.infinitive('arriving'), 'arrive');
        test.equals(inflector.infinitive('arrives'), 'arrive');
        test.done();
    };



});
