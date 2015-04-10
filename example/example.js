(function() {
    function buildHtml(sentences, container) {
        var i, j, l, m,
            token,

            d = document,
            p = d.createElement('p'),
            sentenceSpan,
            tokenSpan,
            span;

        for (i = 0, l = sentences.length; i < l; i += 1) {
            sentenceSpan = d.createElement('span');
            sentenceSpan.setAttribute('class', 'sentent');

            for (j = 0, m = sentences[i].tokens.length; j < m; j += 1) {
                token = sentences[i].tokens[j];

                tokenSpan = d.createElement('span');
                tokenSpan.setAttribute('class', 'token');
                
                span = d.createElement('span');
                span.setAttribute('class', 'raw');
                span.innerText = token.raw;
                tokenSpan.appendChild(span);

                span = d.createElement('span');
                span.setAttribute('class', 'sentiment');
                span.innerText = token.sentiment;
                tokenSpan.appendChild(span);

                span = d.createElement('span');
                span.setAttribute('class', 'pos');
                span.innerText = token.pos;
                tokenSpan.appendChild(span);

                sentenceSpan.appendChild(tokenSpan);
            }
            p.appendChild(sentenceSpan);
        }

        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        container.appendChild(p);
        return p;
    };


    var $ = document.querySelector;

    var analysis = compendium.analyse(document.querySelector('#pos-demo-input').value),
        p = buildHtml(analysis, document.querySelector('#pos-demo-result'));


}());