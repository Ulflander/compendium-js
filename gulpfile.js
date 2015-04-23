
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
        skipped = 0,
        crosscheck,
        compendiumTokens = [],
        m;

    if (level === 2) {
        crosscheck = fs.readFileSync('src/data/google-10000.txt').toString().split('\n');
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
        sts.push(sentiments[j][0]);
    }


    for (i = 0, l = lex.length; i < l; i += 1) {
        line = lex[i].split(' ');
        token = line[0].trim();
        idx = sts.indexOf(token);
        sts[idx] = '--';

        // If no sentiment, and already contained in compendium, skip it
        if (compendiumTokens.indexOf(token) > -1 && idx === -1) {
            skipped += 1;
            continue;
        }


        lex[i] = line[0] + ' ' + (line[1] || 'NN');

        // If token has a sentiment score, add it
        if (idx > -1) {
            lex[i] += ' ' + sentiments[idx][1];

        // otherwise check for minimal mode skipped tokens
        } else {

            // Skip tokens with uppercased chars in minimal mode
            if (level > 0 && token.match(/[A-Z]/g)) {
                skipped += 1;
                continue;
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
            if (level > 0 && line[1].indexOf('NN') === 0) {
                skipped += 1;
                continue;   
            }

            // Taken in account by suffixes
            // no need either, whatever the build
            if (compendium.pos.testSuffixes(token) === line[1]) {
                skipped += 1;
                continue;  
            }

            // Minimal mode: we crosscheck with the 10000 most commons english words
            // and all the nouns
            if (level === 2 && idx === -1 && token.match(/[a-z]/g) && token.indexOf('\'') === -1 && crosscheck.indexOf(token) === -1) {
                skipped += 1;
                continue;
            }
        }

        // Minimal mode: we expunge tokens with uppercase letters
        if (level > 0 && token.toLowerCase() === token && token.indexOf('-') === -1) {
            mini.push(lex[i]);
        } else if (level > 0) {
            skipped += 1;
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
        fs.writeFileSync('build/lexicon-full.txt', maxi.join('\t'));
    } else {
        console.log('Mini lexicon contains ' + mini.length + ' terms, skipped ' + skipped + ' tokens, ' + compendiumTokens.length +' being in compendium.compendium.');
        fs.writeFileSync('build/lexicon-minimal.txt', mini.join('\t'));
    }
};


gulp.task('build_full', function() {
    var h = fs.readFileSync('src/build/header.js'),
        f = fs.readFileSync('src/build/footer.js'),
        l = fs.readFileSync('build/lexicon-full.txt').toString().split('\\').join('\\\\'),
        s = fs.readFileSync('src/suffixes.txt').toString().split('\n').join('\t'),
        r = fs.readFileSync('src/rules.txt').toString().split('\n').join('\t');

    return gulp.src('src/*.js')
            .pipe(concat('compendium.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', l))
            .pipe(replace('@@suffixes', s))
            .pipe(replace('@@rules', r))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});

gulp.task('build_minimal', function() {
    var h = fs.readFileSync('src/build/header.js'),
        f = fs.readFileSync('src/build/footer.js'),
        l = fs.readFileSync('build/lexicon-minimal.txt').toString().split('\\').join('\\\\'),
        s = fs.readFileSync('src/suffixes.txt').toString().split('\n').join('\t'),
        r = fs.readFileSync('src/rules.txt').toString().split('\n').join('\t');

    return gulp.src('src/*.js')
            .pipe(concat('compendium.minimal.js'))
            .pipe(insert.prepend(h))
            .pipe(insert.append(f))
            .pipe(replace('@@lexicon', l))
            .pipe(replace('@@suffixes', s))
            .pipe(replace('@@rules', r))
            .pipe(gulp.dest('build/'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['build_minimal', 'build_full']);
gulp.task('lexicon', ['minimal_lexicon', 'full_lexicon']);

gulp.task('full_lexicon', function(cb) {
    lexicon(0);
    cb();
});

gulp.task('minimal_lexicon', function(cb) {
    lexicon(2);
    cb();
});

gulp.task('default', ['build'], function() {
    gulp.watch(['src/*.js', 'src/*.txt'], ['build']);
    gulp.watch('src/data/*.txt', ['full_lexicon', 'minimal_lexicon']);
});