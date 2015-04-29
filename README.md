# Compendium

English NLP in the browser. 90k only, MIT licensed.

[![Build Status](https://travis-ci.org/Ulflander/compendium-js.svg?branch=master)](https://travis-ci.org/Ulflander/compendium-js) [![npm version](https://badge.fury.io/js/compendium-js.svg)](http://badge.fury.io/js/compendium-js) 
[![Project chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Ulflander/compendium-js)

[![Compendium demo](http://laumonier.co/compendium-js/example/compendium.png)](http://laumonier.co/compendium-js/example/example.html)

## How to use

##### Step 1: get the lib

Install it with [bower](http://bower.io/):

    bower install --save compendium

Or clone this repo and copy the `dist/compendium.minimal.js` file into your project.

Check [here](https://github.com/Ulflander/compendium-js/wiki/Node.js) for instructions related to Node.js.

##### Step 2: include the lib in your HTML page

    <script type="text/javascript" 
        src="path/to/compendium/dist/compendium.minimal.js"></script>

In order to ensure that Compendium will work as intended, you must specify the encoding of the HTML page as UTF-8.

##### Step 3: enjoy     

Call the `compendium.analyse` function with a string as parameter, and get a complete analysis of the text.

    console.log(compendium.analyse('Hello world'));

## API

##### analyse

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
