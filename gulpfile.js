
var gulp = require('gulp'),
    fs = require('fs'),
    concat = require('gulp-concat'),
    insert = require('gulp-insert'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');


function lexicon(level) {

    var lex = fs.readFileSync('src/data/lexicon.txt').toString(),
        sentiments = fs.readFileSync('src/data/sentiments.txt').toString(),
        // Use next compendium to filter lexicon
        next = require('./'),
        i,
        l,
        j,
        mini = [],
        sts = [],
        idx,
        line,
        token,
        skipped = 0,
        crosscheck,
        compendium = [],
        m;

    if (level === 2) {
        crosscheck = fs.readFileSync('src/data/google-10000.txt').toString().split('\n');
    }

    for (i in next.compendium) {
        if (next.compendium.hasOwnProperty(i)) {
            for (j in next.compendium[i]) {
                if (next.compendium[i].hasOwnProperty(j)) {
                    compendium.push(j);
                }
            }
        }
    }


    lex = lex.split('\n');
    sentiments = sentiments.split('\n');
    
    for (j = 0, m = sentiments.length; j < m; j += 1) {
        sentiments[j] = sentiments[j].split(' ');
        sts.push(sentiments[j][0]);
    }

    for (i = 0, l = lex.length; i < l; i += 1) {
        line = lex[i].split(' ');
        token = line[0];
        idx = sts.indexOf(token);

        if (compendium.indexOf(token) > -1) {
            continue;
        }


        lex[i] = line[0] + ' ' + line[1];
        if (idx > -1) {
            lex[i] += ' ' + sentiments[idx][1];
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

        // Minimal mode: we crosscheck with the 10000 most commons english words
        // and all the nouns
        if (level === 2 && idx === -1 && 
            (token.match(/[a-z]/g) && crosscheck.indexOf(token) === -1) || 
            line[1] === 'NN') {
            skipped += 1;
            continue;
        }

        // Common mode: we expunge tokens with uppercase letters
        if (level > 0 && lex[i][0].toLowerCase() === lex[i][0] && lex[i].indexOf('-') === -1) {
            mini.push(lex[i]);
        } else if (level > 0) {
            skipped += 1;
        }

    }


    if (level === 0) {
        console.log('Full lexicon contains ' + lex.length + ' terms.');
        fs.writeFileSync('build/lexicon-full.txt', lex.join('\t'));
    } else if (level === 1) {
        console.log('Common lexicon contains ' + mini.length + ' terms, skipped ' + skipped + ' tokens.');
        fs.writeFileSync('build/lexicon-common.txt', mini.join('\t'));
    } else {
        console.log('Mini lexicon contains ' + mini.length + ' terms, skipped ' + skipped + ' tokens.');
        fs.writeFileSync('build/lexicon-minimal.txt', mini.join('\t'));
    }
};


gulp.task('build_full', function() {
    var h = fs.readFileSync('src/build/header.js'),
        f = fs.readFileSync('src/build/footer.js'),
        l = fs.readFileSync('build/lexicon-full.txt');

    return gulp.src('src/*.js')
            .pipe(concat('next-nlp.full.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', l))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});

gulp.task('build_common', function() {
    var h = fs.readFileSync('src/build/header.js'),
        f = fs.readFileSync('src/build/footer.js'),
        l = fs.readFileSync('build/lexicon-common.txt');

    return gulp.src('src/*.js')
            .pipe(concat('next-nlp.common.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', l))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});


gulp.task('build_minimal', function() {
    var h = fs.readFileSync('src/build/header.js'),
        f = fs.readFileSync('src/build/footer.js'),
        l = fs.readFileSync('build/lexicon-minimal.txt');

    return gulp.src('src/*.js')
            .pipe(concat('next-nlp.minimal.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', l))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['build_minimal', 'build_common', 'build_full']);
gulp.task('lexicon', ['minimal_lexicon', 'common_lexicon', 'full_lexicon']);

gulp.task('full_lexicon', function(cb) {
    lexicon(0);
    cb();
});

gulp.task('minimal_lexicon', function(cb) {
    lexicon(2);
    cb();
});

gulp.task('common_lexicon', function(cb) {
    lexicon(1);
    cb();
});

gulp.task('default', ['build'], function() {
    gulp.watch('src/*.js', ['build']);
    gulp.watch('src/data/*.txt', ['full_lexicon', 'common_lexicon', 'minimal_lexicon']);
});