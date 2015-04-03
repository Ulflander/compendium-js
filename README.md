# Next NLP

Natural Language Processing for Node.js and the browser. Focused on providing a useful and accurate analysis of English text.

Currently in alpha version. Please open some issues for cases that you would like covered by Next NLP and that are currently failing.

Minimal version targeted size for a stable version is ~100k (minified, it's about 70k as of March 31, 2015).

Version 1 milestones:
- ✔ Tokenization
- ✔ Part-of-Speech tagging
- ✔ Inflector (singularization, pluralization)
- ✔ Acronyms detection
- o Negation detection
- o Tense detection
- o Profiling (sentiment, politeness, type of sentence)
- o Dependency parsing (experimental)
- o Example/demo page
- o Date extraction
- o Entities extraction (unsure)
- o Use a trie for lexicon querying on runtime


Version 2 milestones:
- o Dynamic loading of lexicon, w/ versioning and cache using Application Cache
- o Use from a Web Worker (threaded processing)

### About the Part-of-Speech tagging

The Part-of-Speech tagging process is a port of [Mark Watson's FastTag Java library](https://github.com/mark-watson/fasttag_v2). The lexicons are based on the original lexicon from [Eric Brill](http://en.wikipedia.org/wiki/Eric_Brill).

Three lexicons are available:
- Minimal (~6000 terms, targeted size for v1: <100ko minified)
- Balanced (36800 terms, targeted size for v1: <400ko minified)
- Full (90k+ terms, targeted size for v1: ~1300ko minified - seriously)

##### Balanced lexicon

The common is the Eric Brill's one expunged of:
- tokens containing some uppercase letters
- hyphenated tokens.

##### Minimal lexicon

The minimal one is a cross between Eric Brill's one and the list of the 10000 most common English words (+ the list of scored sentiments words). This list is [an extract](https://github.com/first20hours/google-10000-english) from the [Google's Trillion Word Corpus](http://storage.googleapis.com/books/ngrams/books/datasetsv2.html).

Comparative PoS tagging result for testing has been generated using the Stanford PoS tagger via NLTK ([here is an online API](http://textanalysisonline.com/nltk-stanford-postagger)).

## How to use

#### Node.js

    npm install --save next-nlp.js

and then:

    var next = require('next-nlp');
        
    console.log(next.analyse('Hello world'));

#### In the browser

With `bower`:

    bower install --save next-nlp.js

Otherwise clone this repo and copy the `dist/next-nlp.minimal.js` file into your project.

Then:

    <!-- Include the lib with the minimal lexicon -->
    <script type="text/javascript" 
        src="path/to/next-nlp/dist/next-nlp.minimal.js"></script>
     
    <!-- Use it -->
    <script type="text/javascript">
        console.log(next.analyse('Hello world'));
    </script>

## API

##### lex : tokenize a string

Returns a matrix of tokens per sentences.

    next.lex (text)

Example:

    next.lex('My name is Dr. Jekyll. My cat\'s name is Mr. Hyde.');
    //  [
    //      ['My', 'name', 'is', 'Dr.', 'Jekyll', '.'],
    //      ['My', 'cat', '\'', 's', 'name', 'is', 'Mr.', 'Hyde', '.']
    //  ]

##### tag : return Part-of-Speech tags from an array of tokens

Returns an array of tags and a confidence into the tagging.

    next.tag (tokens)

    next.tag(['My', 'name', 'is', 'Dr.', 'Jekyll', '.']);
    //  {
    //      tags: [ 'PRP$', 'NN', 'VBZ', 'NNP', 'NNP', '.' ],
    //      confidence: 1
    //  }

##### analyse : perform a full analysis

    next.analyse('My name is Dr. Jekyll.');
    // [{ 
    //     time: 0,
    //     confidence: 1,
    //     raw: 'My name is Dr. Jekyll .',
    //     tokens:[{ 
    //         raw: 'My',
    //         pos: 'PRP$',
    //         is_acronym: false
    //     }, {
    //         raw: 'name',
    //         pos: 'NN',
    //         is_acronym: false
    //     }, {
    //         raw: 'is',
    //         pos: 'VBZ',
    //         is_acronym: false
    //     }, {
    //         raw: 'Dr.',
    //         pos: 'NNP',
    //         is_acronym: true
    //     }, {
    //         raw: 'Jekyll',
    //         pos: 'NNP',
    //         is_acronym: false
    //     }, {
    //         raw: '.',
    //         pos: '.',
    //         is_acronym: false 
    //     }],
    //     tags: [ 'PRP$', 'NN', 'VBZ', 'NNP', 'NNP', '.']
    // }]

## Development

#### Setup env

    npm install

then, in order to initialize the build process:

    mkdir build && gulp lexicon

#### Build

Next NLP requires `gulp` for the build process. Install it globally using `npm install -g gulp`.

Use `gulp` command to build and watch the source files for changes for live rebuild. Use `gulp -p` 

#### Test

Next NLP uses `nodeunit` for running the tests. Install it with `npm install nodeunit -g`. Use `nodeunit test/*.js` to run the tests.


## Tags definition

    , Comma                     ,
    : Mid-sent punct.           : ; Ñ
    . Sent-final punct          . ! ?
    " quote                     "
    ( Left paren                (
    ) Right paren               )
    # Pound sign                #
    CC Coord Conjuncn           and,but,or
    CD Cardinal number          one,two
    CR Currency sign            $, €, £
    DT Determiner               the,some
    EM Emoticon                 :) :(
    EX Existential there        there
    FW Foreign Word             mon dieu
    IN Preposition              of,in,by
    JJ Adjective                big
    JJR Adj., comparative       bigger
    JJS Adj., superlative       biggest
    LS List item marker         1,One
    MD Modal                    can,should
    NN Noun, sing. or mass      dog
    NNP Proper noun, sing.      Edinburgh
    NNPS Proper noun, plural    Smiths
    NNS Noun, plural            dogs
    PDT Predeterminer           all, both
    POS Possessive ending       Õs
    PP Personal pronoun         I,you,she
    PP$ Possessive pronoun      my,oneÕs
    RB Adverb                   quickly, not
    RBR Adverb, comparative     faster
    RBS Adverb, superlative     fastest
    RP Particle                 up,off
    SYM Symbol                  +,%,&
    TO ÒtoÓ                     to
    UH Interjection             oh, oops
    VB verb, base form          eat
    VBD verb, past tense        ate
    VBG verb, gerund            eating
    VBN verb, past part         eaten
    VBP Verb, present           eat
    VBZ Verb, present           eats
    WDT Wh-determiner           which,that
    WP Wh pronoun               who,what
    WP$ Possessive-Wh           whose
    WRB Wh-adverb               how,where


