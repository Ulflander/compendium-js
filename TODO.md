### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| _trie.js | 2 | Trie implementation
| decoder.js | 23 | handle english specifics, decoder shall be multilingual
| lexer.js | 199 | benchmark if word_boundaries.indexOf more perf than str.match(regexp)
| en/_inflector.js | 376 | is english specific!
| en/_stemmer.js | 14 | Evaluate usefulness (not used in Compendiuam as of Sept. 2015) and remove if useless
| en/compendium.js | 233 | rename field + implement NNP for the following tokens + ! - those are multilingual
| en/lexer.postprocessor.js | 39 | refactor handling of corner case (don't, can\'t...)/MD RB
| fr/dependency.js | 3 | v1, remove support of deprecated english parser