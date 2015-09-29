var gulp = require('gulp'),
    fs = require('fs'),
    nodeunit = require('gulp-nodeunit'),
    concat = require('gulp-concat'),
    insert = require('gulp-insert'),
    todo = require('gulp-todo'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),

    // French lexicon builder
    lexiconFrCompiler = require(__dirname + '/src/build/lexicon-fr.js'),
    lexiconEnCompiler = require(__dirname + '/src/build/lexicon-en.js');

var h,
    f,
    l,
    s,
    sy,
    na,
    v,
    iv,
    r;

function refreshEnCoreFiles () {
    h = fs.readFileSync('src/build/header.js')
    f = fs.readFileSync('src/build/footer.js')
    l = lexiconEnCompiler.getFullCompiled();
    s = fs.readFileSync('src/dictionaries/en/suffixes.txt').toString().split('\n').join('\t')
    sy = fs.readFileSync('src/dictionaries/en/synonyms.txt').toString().split('\n').join('\t')
    na = fs.readFileSync('src/dictionaries/en/demonyms.txt').toString().split('\n').join(' ')
    v = fs.readFileSync('src/dictionaries/en/regular-verbs.txt').toString().split('\n').join(' ')
    iv = fs.readFileSync('src/dictionaries/en/irregular-verbs.txt').toString().split('\n').join('\t')
    r = fs.readFileSync('src/dictionaries/en/rules.txt').toString().split('\n').join('\t');
}



gulp.task('init', function() {
  var f = ['./build', './build/fr', './build/en'],
      i,
      n;

  for(var i in f){
    n = f[i];
    if( !fs.existsSync(n) ){
      fs.mkdirSync(n);
    }
  }
});

gulp.task('todo', function() {
    gulp.src([
        'src/*.js',
        'src/**/*.js',
    ])
    .pipe(todo())
    .pipe(gulp.dest('./'));
});

gulp.task('refreshEnCoreFiles', function() {
    refreshEnCoreFiles();
});

// Build english version
gulp.task('build_full_en', function() {
    refreshEnCoreFiles();
    return gulp.src([
                'src/en/*.js',
                'src/*.js',
            ])
            .pipe(concat('compendium.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', l))
            .pipe(replace('@@suffixes', s))
            .pipe(replace('@@synonyms', sy))
            .pipe(replace('@@demonyms', na))
            .pipe(replace('@@verbs', v))
            .pipe(replace('@@iverbs', iv))
            .pipe(replace('@@rules', r))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});

// Minimal english version
gulp.task('build_minimal_en', function() {
    refreshEnCoreFiles();
    return gulp.src([
                'src/en/*.js',
                'src/*.js',
            ])
            .pipe(concat('compendium.minimal.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', lexiconEnCompiler.getMinimalCompiled()))
            .pipe(replace('@@suffixes', s))
            .pipe(replace('@@synonyms', sy))
            .pipe(replace('@@demonyms', na))
            .pipe(replace('@@rules', r))
            .pipe(replace('@@verbs', v))
            .pipe(replace('@@iverbs', iv))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});

// Build french version
gulp.task('build_full_fr', function() {
    var h = fs.readFileSync('src/build/header.js'),
        f = fs.readFileSync('src/build/footer.js'),
        s = '',
        sy = '',
        na = '',
        v = '',
        iv = '',
        r = fs.readFileSync('src/dictionaries/fr/rules.txt').toString().split('\n').join('\t');

    return gulp.src([
                'src/fr/*.js',
                'src/*.js',
            ])
            .pipe(concat('compendium-fr.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', lexiconFrCompiler.getFullCompiled()))
            .pipe(replace('@@suffixes', s))
            .pipe(replace('@@synonyms', sy))
            .pipe(replace('@@demonyms', na))
            .pipe(replace('@@verbs', v))
            .pipe(replace('@@iverbs', iv))
            .pipe(replace('@@rules', r))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});

// Minimal french version
gulp.task('build_minimal_fr', function() {
    var h = fs.readFileSync('src/build/header.js'),
        f = fs.readFileSync('src/build/footer.js'),
        s = '',
        sy = '',
        na = '',
        v = '',
        iv = '',
        r = fs.readFileSync('src/dictionaries/fr/rules.txt').toString().split('\n').join('\t');

    return gulp.src([
                'src/fr/*.js',
                'src/*.js',
            ])
            .pipe(concat('compendium-fr.minimal.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', lexiconFrCompiler.getMinimalCompiled()))
            .pipe(replace('@@suffixes', s))
            .pipe(replace('@@synonyms', sy))
            .pipe(replace('@@demonyms', na))
            .pipe(replace('@@rules', r))
            .pipe(replace('@@verbs', v))
            .pipe(replace('@@iverbs', iv))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});


gulp.task('test_en_no_build', function() {
    return gulp.src([
            'test/en/*.js',
            'test/multilingual/*.js',
            'test/common/*.js'
        ])
        .pipe(nodeunit({
            reporterOptions: {
                output: 'test'
            }
        }));
});
gulp.task('test_en', ['build_minimal_en', 'build_full_en'], function() {
    return gulp.src([
            'test/en/*.js',
            'test/multilingual/*.js',
            'test/common/*.js'
        ])
        .pipe(nodeunit({
            reporterOptions: {
                output: 'test'
            }
        }));
});

gulp.task('test_fr_no_build', function() {
    return gulp.src([
            'test/fr/*.js',
            'test/multilingual/*.js',
            'test/common/*.js'
        ])
        .pipe(nodeunit({
            reporterOptions: {
                output: 'test'
            }
        }));
});

gulp.task('test_fr', ['build_minimal_fr', 'build_full_fr'], function() {
    return gulp.src([
            'test/fr/*.js',
            'test/multilingual/*.js',
            'test/common/*.js'
        ])
        .pipe(nodeunit({
            reporterOptions: {
                output: 'test'
            }
        }));
});

gulp.task('test', ['test_en', 'test_fr']);
gulp.task('test_no_build', ['test_en_no_build', 'test_fr_no_build']);

gulp.task('build', ['build_minimal_en', 'build_full_en', 'build_minimal_fr', 'build_full_fr']);
gulp.task('build_en', ['build_minimal_en', 'build_full_en']);
gulp.task('build_fr', ['build_minimal_fr', 'build_full_fr']);
gulp.task('lexicon', ['lexicon_en', 'lexicon_fr']);

gulp.task('node_entrypoint', function() {
    return gulp.src('src/build/node-entrypoint.js')
        .pipe(gulp.dest('dist/'))
})

gulp.task('lexicon_fr', function(cb) {
    lexiconFrCompiler.compile(true);
    cb();
});

gulp.task('lexicon_en', function(cb) {
    lexiconEnCompiler.compile(true);
    cb();
});


gulp.task('default', ['init', 'lexicon', 'build'], function() {
    gulp.watch([
        'src/dictionaries/en/*.txt',
        '!src/dictionaries/en/sentiments.txt',
        '!src/dictionaries/en/google-10000.txt',
        '!src/dictionaries/en/lexicon.txt',
    ], ['refreshEnCoreFiles', 'build_en', 'test_en']);

    gulp.watch([
        'src/dictionaries/fr/*.txt',
        '!src/dictionaries/fr/lexicon.txt',
        '!src/dictionaries/fr/sentiments.txt'
    ], ['build_fr', 'test_fr']);

    gulp.watch([
        'src/*.js',
        'src/build/*.js'
    ], ['node_entrypoint', 'build', 'test']);

    gulp.watch([
        'src/en/*.js'
    ], ['build_en', 'test_en']);

    gulp.watch([
        'src/fr/*.js'
    ], ['build_fr', 'test_fr']);

    gulp.watch(['test/multilingual/*.js'], ['test_no_build']);
    gulp.watch(['test/common/*.js'], ['test_no_build']);
    gulp.watch(['test/en/*.js'], ['test_en_no_build']);
    gulp.watch(['test/fr/*.js'], ['test_fr_no_build']);

    gulp.watch([
        'src/dictionaries/en/lexicon.txt',
        'src/dictionaries/en/sentiments.txt',
        'src/dictionaries/en/google-10000.txt',
    ], ['lexicon_en']);

    gulp.watch([
        'src/dictionaries/fr/lexicon.txt',
        'src/dictionaries/fr/sentiments.txt',
    ], ['lexicon_fr']);
});
