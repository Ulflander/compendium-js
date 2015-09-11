var compendium = require('../../build/compendium.minimal.js'),
    trie = new compendium.Trie(),
    obj = {
        'abcedefghij': {}
    },
    tests = 100000,
    i,
    key = 'abcedefghij',
    now,
    v,
    results = {
        trie_total: 0,
        trie_per_call: 0,
        obj_total: 0,
        obj_per_call: 0
    };

trie.put('key', {})

// Building some dic

for(i = 0; i < 100000; i += 1) {
    v = makeid();
    if (v != key) {
        obj[v] = {};
        trie.put(v, {});
    }
    if (Math.random() < 0.1) {
        key = v;
    }
}
console.log(key)

console.log('Running tests for trie');
now = Date.now();
for (i = 0; i < tests; i += 1) {
    v = trie.get(key)
    v = trie.get(makeid())
}
results.trie_total = Date.now() - now;
results.trie_per_call = results.trie_total / tests;

console.log('Running tests for obj');
now = Date.now();
for (i = 0; i < tests; i += 1) {
    v = obj[key];
    v = obj[makeid()];
}
results.obj_total = Date.now() - now;
results.obj_per_call = results.obj_total / tests;



console.log(results);

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var l = Math.ceil(Math.random() * 20) + 1;
    for (var i=0; i < l; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
