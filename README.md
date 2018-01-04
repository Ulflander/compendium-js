# Compendium

English NLP for Node.js and the browser. [Try it in your browser](http://ulflander.github.io/compendium-js/)!

35k gzipped, Part-of-Speech tagging (92% on Penn treebank), entity recognition, sentiment analysis and more, MIT licensed.

[![Build Status](https://travis-ci.org/Ulflander/compendium-js.svg?branch=master)](https://travis-ci.org/Ulflander/compendium-js) [![npm version](https://badge.fury.io/js/compendium-js.svg)](http://badge.fury.io/js/compendium-js)
[![Project chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Ulflander/compendium-js)

##### Summary

- [Node.js install](#nodejs-install)
- [Client-side install](#client-side-install)
- [How to use](#api)
- [Processing overview](#processing-overview)
- [PoS tags](#part-of-speech-tags-definition)
- Wiki
    - [Changelog](https://github.com/Ulflander/compendium-js/wiki/Changelog)
    - [Milestones](https://github.com/Ulflander/compendium-js/wiki/Milestones)

## Client-side install

##### Step 1: get the lib

Install it with [bower](http://bower.io/):

    bower install --save compendium

Or clone this repo and copy the `dist/compendium.minimal.js` file into your project.

##### Step 2: include the lib in your HTML page

    <script type="text/javascript"
        src="path/to/compendium/dist/compendium.minimal.js"></script>

**In order to ensure that Compendium will work as intended, you must specify the encoding of the HTML page as UTF-8.**

##### Step 3: enjoy

Call the `compendium.analyse` function with a string as parameter, and get a complete analysis of the text.

    console.log( compendium.analyse('Hello world :)') );

## Node.js install

##### Step 1: get the lib

    npm install --save compendium-js

##### Step 2: enjoy

    var compendium = require('compendium-js');

    console.log(compendium.analyse('Hello world :)'));


## API

The main function to call is `analyse`.

It takes a string as unique argument, and returns an array containing an analysis for each sentence. For example, calling:

    compendium.analyse('My name is Dr. Jekyll.');

will return an array like this one:

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
           politeness: 0,               // Politeness score
           dirtiness: 0,                // Dirtiness score
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

### Skipping detectors

From version 0.0.26, in order to speed up the analyse, one can use the skipDetectors argument of the analyse function to skip some specific detectors.

Skippable detectors are the following:
- `sentiment`: Sentiment analysis
- `entities`: Entity extraction
- `negation`: Negation detection
- `type`: Type detection (declarative, interrogative...)
- `numeric`: Numeric values extraction

For example, the following call to analyse won't run the entity extraction detector, meaning that `Dr. Jekyll` won't appear in the `entities` section of the analysis result:

    compendium.analyse('My name is Dr. Jekyll.', null, ['entities']);





## Processing overview

1. [Decoding](#decoding)
2. [Lexer](#lexer)
3. [Cleaner](#cleaner)
4. [Part-of-speech tagging](#part-of-speech-tagging)
5. [Dependency parsing](#dependency-parsing)
6. [Detectors](#detectors)

See also:

- [Lexicons](#lexicons)

#### Decoding

Handles decoding of HTML entities (e.g. `&amp;` to `&`), and normalization of some abbreviations that involve breakpoints chars (e.g. `w/` to `with`).

#### Lexer

No good part-of-speech tagging is possible without a good [lexer](http://en.wikipedia.org/wiki/Lexical_analysis). A lot of efforts has been put into the Compendium's lexer, so it provides the right tokens to be processed. Currently the lexer is a combination of four passes:

- A first pass splits the text into sentences
- A second one applies some regular expressions to extract specific parts of the sentences (URLs, emails, emoticons...)
- The third pass is a char by char parser that splits tokens in a sentence, relying on [Punycode.js](https://github.com/bestiejs/punycode.js/) to properly handle emojis
- The final pass consolidates tokens such as acronyms, abbreviations, contractions..., and handles a few exceptions

#### Cleaner

This very little piece runs after the lexer, and is in charge to normalize a few other slangs (e.g. `gr8` to `great`).

#### Part-of-speech tagging

Tagging is performed using a [Brill tagger](http://en.wikipedia.org/wiki/Eric_Brill) (i.e. a base lexicon and a set of rules), with the addition of some inflection-based rules.

It's been inspired by the following projects that are worth being checked out:
- Eric Brill tagger: latest implementation published under MIT license is available for download on the Plymouth University website [at this link (direct download)](http://www.tech.plym.ac.uk/soc/staff/guidbugm/software/RULE_BASED_TAGGER_V.1.14.tar.Z).
- [Mark Watson's FastTag Java library](https://github.com/mark-watson/fasttag_v2), a very simple implementation of the Brill's tagger.
- [NLP Compromise](https://github.com/spencermountain/nlp_compromise), another great JS NLP toolkit, with an interesting inflection-based approach

PoS tagging is tested a set of unit tests generated with the [Stanford PoS tagger](http://nlp.stanford.edu:8080/parser/index.jsp), double checked with common sense and [another](http://nlpdotnet.com/services/Tagger.aspx) machine-learning oriented tagger, and is then evaluated using the [Penn Treebank](http://www.cis.upenn.edu/~treebank/) dataset.

In September 2015, Compendium PoS tagging score on Penn Treebank was 92.76% tags recognized for the browser version, and 94.31% for the Node.js version.

#### Dependency parsing

**Warning**: the following process has been proved hardly extensible, and isn't powerful enough given the amount of code already. It's being replaced in v1.0 by another one currently in development [September 5th, 2015].

Dependency parsing module. Still experimental, and requires a lot of additional rules, but promising.

Inspired in some extent by Syntex from Didier Bourigault [ref. (fr)](http://slideplayer.fr/slide/1150457/).

Constraint based. Constraints are:

- The governor is the head of the sentence (it doesnt have a master)
- When possible, the governor is the first conjugated verb of the sentence
- All other tokens must have a master
- A token can have one and only one master
- A master can have one or many dependencies
- If no master is found for a token, then its master is the governor

Parsing is done through several passes:

1. First pass define direct dependencies from left to right
2. Second pass define direct dependencies from right to left
3. Third pass consolidate linked indirect dependencies using existing masters
4. Final pass consolidate unlinked indirect dependencies

#### Detectors

Starting from here, some detectors handle further analysis of the text. They're in charge to add some metadata to the analysis, such as the sentiment score and label.

These detectors can work at three different levels:

- the token level
- the sentence level
- the text (global) level

Token level detectors add attributes to each token (sentiment and emphasis scores, normalized token...).

Sentence level detectors work accross many tokens (negation detection, entity recognition, sentiment analysis...).

Global level detectors (there are none yet) are supposed to provide a global analysis of the whole text: topics, global sentiment labelling...

## Lexicons

The full lexicon for Node.js is based on the lexicon from Mark Watson's FastTag (around 90 000 terms, itself being imported from the Penn Treebank).

The minimal lexicon for the browser contains only a few thousands terms extracted from the full lexicon, and filtered using:

- the list of the 10000 most common English words, [an extract](https://github.com/first20hours/google-10000-english) from the [Google's Trillion Word Corpus](http://storage.googleapis.com/books/ngrams/books/datasetsv2.html)
- the list of scored sentiments words
- Compendium suffixes detector
- Compendium embedded knowledge


## Part-of-Speech tags definition

Here is the list of Part-of-Speech tags used by Compendium. See at the bottom newly introduced tags.

    , Comma                     ,
    : Mid-sent punct.           : ;
    . Sent-final punct          . ! ?
    " quote                     "
    ( Left paren                (
    ) Right paren               )
    # Pound sign                #
    CC Coord Conjuncn           and,but,or
    CD Cardinal number          one,two,1,2
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

## Development

Go to the [wiki](https://github.com/Ulflander/compendium-js/wiki) to get more details about the project.

## License

The MIT License (MIT)

Copyright (c) 2015 Ulflander

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

