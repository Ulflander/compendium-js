### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| _inflector.js | 3 | need to build inflectors on a per language basis
| _stemmer.js | 14 | Evaluate usefulness (not used in Compendiuam as of Sept. 2015) and remove if useless
| _trie.js | 2 | Trie implementation
| compendium-en.js | 233 | rename field + implement NNP for the following tokens + ! - those are multilingual
| lexer.js | 199 | benchmark if word_boundaries.indexOf more perf than str.match(regexp)
| lexer.postprocessor-en.js | 39 | refactor handling of corner case (don't, can\'t...)/MD RB