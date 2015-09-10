var gulp = require('gulp'),
    fs = require('fs'),
    nodeunit = require('gulp-nodeunit'),
    concat = require('gulp-concat'),
    insert = require('gulp-insert'),
    todo = require('gulp-todo'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

// Build french lexicon - to be implemented, dummy method for functional
// bilingual build process
function lexicon_fr(level) {
    var lex = fs.readFileSync('src/dictionaries/fr/lexicon.txt').toString();

    fs.writeFileSync('build/fr/lexicon-full.txt', lex);
    fs.writeFileSync('build/fr/lexicon-minimal.txt', lex);
}
// Build english lexicon
function lexicon(level) {

    var lex = fs.readFileSync('src/dictionaries/en/lexicon.txt').toString(),
        sentiments = fs.readFileSync('src/dictionaries/en/sentiments.txt').toString(),
        // Use next compendium to filter lexicon
        compendium = require('./'),
        i,
        l,
        j,
        mini = [],
        maxi = [],
        sts = [],
        idx,
        line,
        token,
        found,
        skipped = 0,
        crosscheck,
        irregularVerbs = compendium.compendium.irregular,
        compendiumTokens = [],
        m;

    if (level === 2) {
        crosscheck = fs.readFileSync('src/dictionaries/en/google-10000.txt').toString().split('\n');
    }

    for (i in compendium.compendium) {
        if (compendium.compendium.hasOwnProperty(i) && !Array.isArray(compendium.compendium[i]) && typeof compendium.compendium[i] === 'object') {
            for (j in compendium.compendium[i]) {
                if (compendium.compendium[i].hasOwnProperty(j)) {
                    compendiumTokens.push(j);
                }
            }
        }
    }


    lex = lex.split('\n');
    sentiments = sentiments.split('\n');

    for (j = 0, m = sentiments.length; j < m; j += 1) {
        sentiments[j] = sentiments[j].split(' ');
        if (sts.indexOf(sentiments[j][0]) === -1) {
            sts.push(sentiments[j][0]);
        } else {
            sts.push('--');
        }
    }


    for (i = 0, l = lex.length; i < l; i += 1) {
        if (!lex[i]) {
            continue;
        }

        line = lex[i].split(' ');
        token = line[0].trim();
        idx = sts.indexOf(token);


        // If no sentiment, and already contained in compendium, skip it
        if (compendiumTokens.indexOf(token) > -1 && (idx === -1 || sts[idx] === '--')) {
            skipped += 1;
            continue;
        }

        sts[idx] = '--';
        lex[i] = token + ' ' + (line[1] || 'NN');

        // If token has a sentiment score, add it
        if (idx > -1) {

            // If is plural
            if (line[1] === 'NNS') {
                skipped += 1;
                continue;
            }

            lex[i] += ' ' + sentiments[idx][1];

        // otherwise check for minimal mode skipped tokens
        } else {

            // Skip tokens with uppercased chars in minimal mode
            if (level > 0 && token.match(/[A-Z]/g)) {
                skipped += 1;
                continue;
            }

            // Is a verb in compendium
            if (level > 0 && line[1] === 'VB') {

                // Regular verb
                if (compendium.compendium.verbs.indexOf(token) > -1) {
                    skipped += 1;
                    continue;
                }
            }

            // All kind of verbs
            if (level > 0 && line[1].indexOf('VB') > -1) {

                // Irregular verbs
                for (found = false, j = 0, m = irregularVerbs.length; j < m; j += 1) {
                    if (irregularVerbs[j].indexOf(token) > -1) {
                        found = true;
                        break;
                    }
                }
                if (!!found) {
                    skipped += 1;
                    continue;
                }

                if (line[1] === 'VBZ' || line[1] === 'VBZ' || line[1] === 'VBD' || line[1] === 'VBG') {
                    //console.log('skipped', token)
                    skipped += 1;
                    continue;
                }
            }

            // Taken in account by a rule
            if (level > 0 && token.length > 3 && token.slice(token.length - 2) === 'ed' && line[1] === 'VBN') {
                skipped += 1;
                continue;
            }

            // Taken in account by a rule
            if (level > 0 && token.length > 3 && token.slice(token.length - 3) === 'ing' && line[1] === 'VBG') {
                skipped += 1;
                continue;
            }

            // This is the default pos tag, no need
            // ONLY if not blocked term
            if (level > 0 && line[1].indexOf('NN') === 0 && line[1].indexOf('-') === -1) {
                skipped += 1;
                continue;
            }

            // Taken in account by suffixes
            // no need either
            if (level > 0 && compendium.pos.testSuffixes(token) === line[1]) {
                skipped += 1;
                continue;
            }

            // Minimal mode: we crosscheck with the 10000 most commons english words
            // and all the nouns
            if (level === 2 && token.match(/[a-z]/g) && token.indexOf('\'') === -1 && crosscheck.indexOf(token) === -1) {
                skipped += 1;
                continue;
            }
        }

        // Minimal mode: we expunge tokens with uppercase letters
        if (level > 0 && token.toLowerCase() === token && (token.indexOf('-') === -1 || line[1] === 'EM')) {
            mini.push(lex[i]);
        } else if (level > 0) {
            skipped += 1;
        // Full mode
        } else {
            maxi.push(lex[i]);
        }
    }
    for (j = 0, m = sentiments.length; j < m; j += 1) {
        if (sts[j] !== '--') {
            maxi.push(sentiments[j][0] + ' - ' + sentiments[j][1]);
            mini.push(sentiments[j][0] + ' - ' + sentiments[j][1]);
        }
    }

    if (level === 0) {
        console.log('Full lexicon contains ' + maxi.length + ' terms, skipped ' + skipped + ' tokens, ' + compendiumTokens.length +' being in compendium.compendium.');
        fs.writeFileSync('build/en/lexicon-full.txt', maxi.join('\t'));
    } else {
        console.log('Mini lexicon contains ' + mini.length + ' terms, skipped ' + skipped + ' tokens, ' + compendiumTokens.length +' being in compendium.compendium.');
        fs.writeFileSync('build/en/lexicon-minimal.txt', mini.join('\t'));
    }
};

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
    l = fs.readFileSync('build/en/lexicon-full.txt').toString().split('\\').join('\\\\')
    s = fs.readFileSync('src/dictionaries/en/suffixes.txt').toString().split('\n').join('\t')
    sy = fs.readFileSync('src/dictionaries/en/synonyms.txt').toString().split('\n').join('\t')
    na = fs.readFileSync('src/dictionaries/en/nationalities.txt').toString().split('\n').join(' ')
    v = fs.readFileSync('src/dictionaries/en/regular-verbs.txt').toString().split('\n').join(' ')
    iv = fs.readFileSync('src/dictionaries/en/irregular-verbs.txt').toString().split('\n').join('\t')
    r = fs.readFileSync('src/dictionaries/en/rules.txt').toString().split('\n').join('\t');
}

refreshEnCoreFiles();

gulp.task('init', function() {
    fs.mkdirSync('./build');
    fs.mkdirSync('./build/en');
    fs.mkdirSync('./build/fr');
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
gulp.task('build_full', function() {
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
            .pipe(replace('@@nationalities', na))
            .pipe(replace('@@verbs', v))
            .pipe(replace('@@iverbs', iv))
            .pipe(replace('@@rules', r))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});

// Minimal english version
gulp.task('build_minimal', function() {
    var l = fs.readFileSync('build/en/lexicon-minimal.txt').toString().split('\\').join('\\\\')
    return gulp.src([
                'src/en/*.js',
                'src/*.js',
            ])
            .pipe(concat('compendium.minimal.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', l))
            .pipe(replace('@@suffixes', s))
            .pipe(replace('@@synonyms', sy))
            .pipe(replace('@@nationalities', na))
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
        l = fs.readFileSync('build/fr/lexicon-full.txt').toString().split('\\').join('\\\\'),
        s = '',
        sy = '',
        na = '',
        v = '',
        iv = '',
        r = '';

    return gulp.src([
                'src/fr/*.js',
                'src/*.js',
            ])
            .pipe(concat('compendium-fr.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', l))
            .pipe(replace('@@suffixes', s))
            .pipe(replace('@@synonyms', sy))
            .pipe(replace('@@nationalities', na))
            .pipe(replace('@@verbs', v))
            .pipe(replace('@@iverbs', iv))
            .pipe(replace('@@rules', r))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});

// Minimal english version
gulp.task('build_minimal_fr', function() {
    var h = fs.readFileSync('src/build/header.js'),
        f = fs.readFileSync('src/build/footer.js'),
        l = fs.readFileSync('build/fr/lexicon-minimal.txt').toString().split('\\').join('\\\\'),
        s = '',
        sy = '',
        na = '',
        v = '',
        iv = '',
        r = '';

    return gulp.src([
                'src/fr/*.js',
                'src/*.js',
            ])
            .pipe(concat('compendium-fr.minimal.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', l))
            .pipe(replace('@@suffixes', s))
            .pipe(replace('@@synonyms', sy))
            .pipe(replace('@@nationalities', na))
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
            'test/multilingual.js'
        ])
        .pipe(nodeunit({
            reporterOptions: {
                output: 'test'
            }
        }));
});
gulp.task('test_en', ['build_minimal', 'build_full'], function() {
    return gulp.src([
            'test/en/*.js',
            'test/multilingual.js'
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
            'test/multilingual.js'
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
            'test/multilingual.js'
        ])
        .pipe(nodeunit({
            reporterOptions: {
                output: 'test'
            }
        }));
});

gulp.task('test', ['test_en', 'test_fr']);
gulp.task('test_no_build', ['test_en_no_build', 'test_fr_no_build']);

gulp.task('build', ['build_minimal', 'build_full', 'build_minimal_fr', 'build_full_fr']);
gulp.task('build_en', ['build_minimal', 'build_full']);
gulp.task('build_fr', ['build_minimal_fr', 'build_full_fr']);
gulp.task('lexicon', ['minimal_lexicon', 'full_lexicon', 'fr_lexicon']);

gulp.task('fr_lexicon', function(cb) {
    lexicon_fr(0);
    cb();
});

gulp.task('full_lexicon', function(cb) {
    lexicon(0);
    cb();
});

gulp.task('minimal_lexicon', function(cb) {
    lexicon(2);
    cb();
});

gulp.task('default', ['build'], function() {
    gulp.watch([
        'src/dictionaries/en/*.txt',
        '!src/dictionaries/en/sentiments.txt',
        '!src/dictionaries/en/google-10000.txt',
        '!src/dictionaries/en/lexicon.txt',
    ], ['refreshEnCoreFiles', 'build_en', 'test_en']);

    gulp.watch([
        'src/dictionaries/fr/*.txt',
        '!src/dictionaries/fr/lexicon.txt'
    ], ['build_fr', 'test_fr']);

    gulp.watch([
        'src/*.js',
        'src/build/*.js'
    ], ['build', 'test']);

    gulp.watch([
        'src/en/*.js'
    ], ['build_en', 'test_en']);

    gulp.watch(['test/multilingual.js'], ['test_no_build']);
    gulp.watch(['test/en/*.js'], ['test_en_no_build']);
    gulp.watch(['test/fr/*.js'], ['test_fr_no_build']);

    gulp.watch([
        'src/dictionaries/en/lexicon.txt',
        'src/dictionaries/en/sentiments.txt',
        'src/dictionaries/en/google-10000.txt',
    ], ['full_lexicon', 'minimal_lexicon']);

    gulp.watch([
        'src/dictionaries/fr/lexicon.txt'
    ], ['fr_lexicon']);
});
