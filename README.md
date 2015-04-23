# Compendium

Rule-Based English Natural Language Processing for Node.js and the browser.

90k only for the browser package.

Scores 91% on the Penn Treebank dataset with the browser version, 94% with the node version.

MIT licensed.

[![Compendium demo screenshot](http://laumonier.co/compendium-js/example/compendium.png)](http://laumonier.co/compendium-js/example/example.html).

- [Demo](http://laumonier.co/compendium-js/example/example.html)
- [How to use](#how-to-use)
- [API](#api)
- [Analysis process](#analysis-process)
    - [Decoding](#decoding)
    - [Part-of-speech tagging](#part-of-speech-tagging)
    - [Analysis](#analysis)
    - [Lexicons](#lexicons)
- [Development](#development)
- [Milestones](#milestones)
- [PoS tags definition](#tags-definition)

## How to use

#### In the browser

With `bower`:

    bower install --save compendium

Otherwise clone this repo and copy the `dist/compendium.minimal.js` file into your project.

Then:

    <!-- Include the lib with the minimal lexicon -->
    <script type="text/javascript" 
        src="path/to/compendium/dist/compendium.minimal.js"></script>
     
    <!-- Use it -->
    <script type="text/javascript">
        console.log(compendium.analyse('Hello world'));
    </script>

In order to ensure that Compendium will work as intended, you must specify the encoding of the HTML page as UTF-8.

#### Node.js

    npm install --save compendium-js

and then:

    var compendium = require('compendium-js');
        
    console.log(compendium.analyse('Hello world'));

## API

##### analyse : perform a full analysis

The only function to be called. Take a string as parameter and returns an array containing an analysis for each sentence.

    compendium.analyse('My name is Dr. Jekyll.');

will return an object like:

    [ { time: 9,                        // Time of processing, in ms
        length: 6,                      // Count of tokens
        raw: 'My name is Dr. Jekyll .', // Raw string
        stats:
         { confidence: 0.4583,          // PoS tagging confidence
           p_foreign: 0,                // Percentage of foreign PoS tags, e.g. `FW`
           p_upper: 0,                  // Percentage of uppercased tokens, e.g. `HELLO`
           p_cap: 50,                   // Percentage of capitalized tokens, e.g. `Hello`
           avg_length: 3 },             // Average token length
        profile:                        
         { label: 'neutral',            // Sentiment: `negative`, `neutral`, `positive`, `mixed`
           sentiment: 0,                // Sentiment score
           amplitude: 0,                // Sentiment amplitude
           types: [],                   // Types ('tags') of sentence
           politeness: 0,               // Politeness score (coming soon)
           dirtiness: 0,                // Dirtiness score (coming soon)
           negated: false },            // Is sentence mainly negated
        entities: [ {                   // List of entities
            raw: 'Dr. Jekyll',          // Raw reconstructed entity
            norm: 'doctor jekyll',      // Normalized entity
            fromIndex: 3,               // Start token index
            toIndex: 4,                 // End token index
            type: null } ],             // Type of entity: null for unknown, `ip`, `email`...
        tags:                           // Array of PoS tags
         [ 'PRP$', 'NN', 'VBZ', 'NNP', 'NNP', '.' ],
        tokens:                         // Tokens details
         [ { raw: 'My',                 // Raw token
            norm: 'my',                 // Normalized
            pos: 'PRP$',                // PoS tag
            profile:                    
             { sentiment: 0,            // Sentiment score
               emphasis: 1,             // Emphasis multiplier
               negated: false,          // Is negated
               breakpoint: false },     // Is breakpoint
            attr:
             { acronym: false,          // Is acronym
               plural: false,           // Is plural
               abbr: false,             // Is an abbreviation
               verb: false,             // Is a verb
               entity: -1 } },          // Entity index, `-1` if no entity
            //
            // ... Other tokens
            //
       ] } ]

## Analysis process

#### Decoding

Handles normalization of HTML entities, and replace some particular slangs.

#### Lexer

No good PoS tagging is possible without a good lexer. A lot of efforts have been put into Compendium's lexer, so it provides the right tokens to be analysed. Currently the lexer is a combination of 4 passes:

- A first pass split the text into sentences
- A second one applies some regular expressions to extract specific portions of the sentences (URLs, emails, emoticons...)
- The third pass is a char by char parser that split tokens, and that relies on [Punycode.js](https://github.com/bestiejs/punycode.js/) to properly handle emojis
- The final pass consolidates things like acronyms, abbreviations, contractions..., and handle a few exceptions

#### Part-of-speech tagging

Tagging is performed using a [Brill tagger](http://en.wikipedia.org/wiki/Eric_Brill) (i.e. a base lexicon and some set of rules), with the addition of some inflexion-based rules.

It takes inspiration from the following projects that are worth being checked out:
- Eric Brill tagger: latest implementation published under MIT license is available for download on Plymouth University [at this link (direct download)](http://www.tech.plym.ac.uk/soc/staff/guidbugm/software/RULE_BASED_TAGGER_V.1.14.tar.Z).
- [Mark Watson's FastTag Java library](https://github.com/mark-watson/fasttag_v2), one of the implementation of Brill's tagger.
- [NLP Compromise](https://github.com/spencermountain/nlp_compromise), another great JS NLP toolkit, with an interesting inflection-based approach

PoS tagging tests are performed both against the [Penn Treebank](http://www.cis.upenn.edu/~treebank/) dataset, and against results generated by the [Stanford PoS tagger](http://nlp.stanford.edu/software/tagger.shtml) ([here is an online API](nlp.stanford.edu:8080/parser/index.jsp)), double checked with common sense and [another](http://nlpdotnet.com/services/Tagger.aspx) tagger fully machine-learning oriented.

#### Analysis

Starting from here various processors will handle further analysis of the text. Processors can work at three different levels:

- the token level
- the sentence level
- the text (global) level

Token level processors add attributes to each token (sentiment and emphasis scores, normalized token...).

Sentence level processors work accross many tokens (negation detection, entity recognition, sentiment analysis...).

Global level processors (there are none yet) are supposed to provide a global analysis of the whole text: topics, global sentiment labelling...

### Lexicons

Full version for Node.js uses the lexicon from Mark Watson's FastTag (around 90 000 terms).

Minimal version for the browser contains only a few thousands terms extracted from the full version, and filtered using:

- the list of the 10000 most common English words [an extract](https://github.com/first20hours/google-10000-english) from the [Google's Trillion Word Corpus](http://storage.googleapis.com/books/ngrams/books/datasetsv2.html)
- the list of scored sentiments words
- Compendium suffixes detector
- Compendium embedded knowledge

## Development

#### Setup env

    npm install

then, in order to initialize the build process:

    mkdir build && gulp lexicon

#### Build

Compendium requires `gulp` for the build process. Install it globally using `npm install -g gulp`.

Use `gulp` command to build and watch the source files for changes for live rebuild.

#### Test

Compendium uses `nodeunit` for running the tests. 
Install it with `npm install nodeunit -g`. Use `nodeunit test/*.js` to run the tests.

#### Run Penn Treebank benchmark

`node benchmark/run.js` will run Compendium against a selection of the Penn Treebank dataset.

## Milestones

#### Version 1

- ✔ Tokenization
- ✔ Part-of-Speech tagging
- ✔ Inflector (singularization, pluralization)
- ✔ Acronyms detection
- ✔ Negation detection
- o Profiling (sentiment, politeness, type of sentence)
    + ✔ Token scoring
    + ✔ Scoring consolidation
    + o Politeness
    + o Type of sentence
- o Tense detection
- o Dependency parsing
- ✔ Example/demo page
- o Date extraction
- ✔ Entities extraction
    - ✔ Proper nouns
    - ✔ Hashtags
    - ✔ @usernames, 
    - ✔ IPs 
    - ✔ Email address
    - ✔ URL
- o Use a trie for lexicon querying on runtime

#### Version 2

- o Dynamic loading of lexicon, w/ versioning and cache using Application Cache
- o Use from a Web Worker (threaded processing)


### Tags definition

    , Comma                     ,
    : Mid-sent punct.           : ;
    . Sent-final punct          . ! ?
    " quote                     "
    ( Left paren                (
    ) Right paren               )
    # Pound sign                #
    CC Coord Conjuncn           and,but,or
    CD Cardinal number          one,two,1,2
    CR Currency sign            $,€,£
    DT Determiner               the,some
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
    POS Possessive ending       's
    PP Personal pronoun         I,you,she
    PRP$ Possessive pronoun     my,one's
    RB Adverb                   quickly, not
    RBR Adverb, comparative     faster
    RBS Adverb, superlative     fastest
    RP Particle                 up,off
    SYM Symbol                  +,%,&
    TO 'to'                     to
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

Compendium also includes the following new tag:

    EM Emoticon                 :) :(
