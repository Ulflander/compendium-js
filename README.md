[![Build Status](https://travis-ci.org/Ulflander/compendium-js.svg?branch=master)](https://travis-ci.org/Ulflander/compendium-js) [![npm version](https://badge.fury.io/js/compendium-js.svg)](http://badge.fury.io/js/compendium-js)
[![Project chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Ulflander/compendium-js)

# Compendium

English NLP for Node.js and the browser.

35k gzipped, Part-of-Speech tagging (92% on Penn treebank), entity recognition, sentiment analysis and more, MIT licensed.

##### Summary

- [Client-side install](#client-side-install)
- [Node.js install](#nodejs-install)
- [How to use](#api)
- [PoS tags](#part-of-speech-tags-definition)
- Wiki
  - [Changelog](https://github.com/Ulflander/compendium-js/wiki/Changelog)
  - [Milestones](https://github.com/Ulflander/compendium-js/wiki/Milestones)
  - [Analysis process](https://github.com/Ulflander/compendium-js/wiki/Analysis-process)

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

    CR Currency sign            $,€,£
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

