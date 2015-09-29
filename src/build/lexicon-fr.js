/**
 * This node package compîles the french lexicons in compendium.
 * It is used by the gulp build utility.
 */

var sourcePath = __dirname + '/../dictionaries/fr/',
    commonsSourcePath = __dirname + '/../dictionaries/commons/',

    outputPath = __dirname + '/../../build/fr/',

    lexiconName = 'lexicon.txt',
    manualName = 'lexicon_manual.txt',
    sentimentsName = 'sentiments.txt',

    outputFullName = 'lexicon-full.txt',
    outputMinimalName = 'lexicon-minimal.txt',

    lexicon,
    sentiments,
    lexicon_commons,
    lexicon_manual,

    fullCompiled,
    minimalCompiled,

    fs = require('fs');

function _addSentimentScores(a) {
    var i = 0, l = a.length, token, pos;
    for (; i < l; i += 1) {
        token = a[i].split(' ')[0];
        pos = a[i].split(' ')[1];
        // Exclude adverbs (pas, vraiment...)
        if (pos !== 'ADV' && sentiments.hasOwnProperty(token)) {
            a[i] += ' ' + sentiments[token];
        }
    }
    return a;
};

function _refreshSources () {
    var commons = fs.readFileSync(commonsSourcePath + lexiconName).toString().split('\n');
    var commonsSentiments = fs.readFileSync(commonsSourcePath + sentimentsName).toString().split('\n');

    lexicon = _filter(fs.readFileSync(sourcePath + lexiconName).toString()
        .split('\\').join('\\\\')
        .split('\t').join(' ')
        .split('\n'), 1);

    lexicon_commons = commons;
    lexicon = _compile(lexicon, 0);

    var sentimentsArray = fs.readFileSync(sourcePath + sentimentsName).toString()
        .split('\n')
        .concat(commonsSentiments)
        .map(function(v) {
            return v.split(' ');
        });

    sentiments = {};
    sentimentsArray.forEach(function(v) {
        sentiments[v[0]] = v[1];
    })

    var manual = _filter(fs.readFileSync(sourcePath + manualName).toString()
        .split('\\').join('\\\\')
        .split('\t').join(' ')
        .split('\n'), 0);

    lexicon = _addSentimentScores(lexicon);
    lexicon_manual = _addSentimentScores(manual);
    lexicon_commons = _addSentimentScores(lexicon_commons);

};

// keep only most frequent words
function _filter(a, startIndex) {
    var i = startIndex, l = a.length, line, index = {}, res = [];

    for (; i < l; i += 1) {
        line = a[i].split(' ');

        if (line.length < 2) {
            continue;
        }

        if (!index.hasOwnProperty(line[0])) {
            index[line[0]] = 1;
            res.push(a[i]);
        }
    }

    return res;
}


// adapt lines to fit needs
function _compile(a, startIndex) {
    var i = startIndex, l=a.length, line, line_compiled = [], res = [], infover, ver_found=0, ver_compiled=0;

    for (; i < l; i += 1) {
      line = a[i].split(' ');

      //compile 11_infover
      infover = line[10];
      if(!!infover && infover != '-') {

          //if infover contains multiple forms of mod:tmp:pers
          if(infover.split(';').length>1){

              //inf > ind:pres
              if(infover.match(/inf/)){
                infover = 'inf'
              }

              //ind:pres > imp:pres
              else if(infover.match(/ind:pres?/)){
                infover = 'ind:pre'
                ver_compiled += 1;
              }

              //ind:imp > cnd:pres
              else if(infover.match(/imp:pre/)){
                infover = 'ind:imp'
                ver_compiled += 1;
              }

              //take the first one
              else {
                infover = infover.split(';')[0];
                ver_compiled += 1;
              }
          }

          //store only mod and tmp
          if(infover.split(':').length>2){
            infover = infover.split(':').slice(0,2).join(':');
          }

          ver_found+=1;
          line[3]+= ':'+infover;
      }
      line_compiled=[];
      // add 1_ortho
      line_compiled.push(line[0])
      // add 4_cgram
      line_compiled.push(line[3])
      // add 5_genre
      line_compiled.push(line[4])

      res.push(line_compiled.join(' '));
    }

    console.log("found "+ver_found+ " verbs and reduced "+ ver_compiled+" verbs");
    return res;
}

function _compileFull() {
    fullCompiled = lexicon
      .concat(lexicon_commons)
      .concat(lexicon_manual)
      .join('\t');
    fs.writeFileSync(outputPath + outputFullName, fullCompiled);
}

function _compileMinimal() {
    minimalCompiled = lexicon.slice(0,1000)
      .concat(lexicon_commons)
      .concat(lexicon_manual)
      .join('\t');
    fs.writeFileSync(outputPath + outputMinimalName, minimalCompiled);
}


exports.compile = function(refreshSources) {
    if (!!refreshSources) {
        _refreshSources();
    }

    _compileFull();
    _compileMinimal();
};

exports.getFullCompiled = function() {
    return fullCompiled;
};

exports.getMinimalCompiled = function() {
    return minimalCompiled;
};

_refreshSources()
_compileFull()
_compileMinimal()
