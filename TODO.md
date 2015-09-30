### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| compendium.parser.js | 38 | alert; the '-' token is used in fr lexicon to skip
| detector.s.4.sentiment.js | 118 | this detector should be multilingual, use JJS through pos.specifics
| detector.s.4.sentiment.js | 143 | ['DT', 'POS', 'IN'] is language specific, should be handled differently
| factory.js | 95 | Move tense detection into some detector or the like
| factory.js | 123 | Move noun detection into some detector
| factory.js | 128 | Move pun detection into some detector
| lexer.js | 199 | benchmark if word_boundaries.indexOf more perf than str.match(regexp)
| en/compendium.js | 245 | rename field + implement NNP for the following tokens + ! - those are multilingual
| en/dependency.v2.js | 82 | to be handled in a better way
| en/inflector.js | 376 | is english specific!
| en/lexer.postprocessor.js | 39 | refactor handling of corner case (don't, can\'t...)/MD RB
| en/stemmer.js | 14 | Evaluate usefulness (not used in Compendiuam as of Sept. 2015) and remove if useless
| fr/dependency.js | 3 | v1, remove support of deprecated english parser