
var next = require('../dist/next-nlp.minimal.js'),
    inflector = next.inflector;



exports.singularize = function(test){
    test.done();
};

exports['is singular'] = function(test){
    test.done();
};

exports.pluralize = function(test){
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

exports['is plural'] = function(test){
    test.done();
};