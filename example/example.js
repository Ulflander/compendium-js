(function() {

    var examples = [
        'Hello world!',
        'I\'m happy :)',
        'Yo nigga!'
    ];

    var input = document.querySelector('#pos-demo-input'),
        lastTotal = 0,
        analyse = function(txt) {
            var n = Date.now(),
                analysis = compendium.analyse(txt);
            lastTotal = Date.now() - n;
            return analysis;
        };


    function buildHtml(sentences, container) {
        var i, j, l, m,
            token,

            d = document,
            p = d.createElement('p'),
            sentenceSpan,
            tokenSpan,
            classe,
            span;

        for (i = 0, l = sentences.length; i < l; i += 1) {
            sentenceSpan = d.createElement('div');
            sentenceSpan.setAttribute('class', 'sentence');
            
            classe = sentences[i].profile.label;
            span = d.createElement('div'),
            span.setAttribute('class', 'meta');
            span.innerHTML = "<span>Confidence: " + sentences[i].confidence  + "</span>" +
                            "<span>Sentiment score: " + sentences[i].profile.sentiment + "/" + sentences[i].profile.emphasis  + "</span>" +
                            "<span>Label: <span class=" + classe + ">" + sentences[i].profile.label  + "</span></span>" +
                            "<span>Time (ms): " + sentences[i].time + "</span>" ;

            sentenceSpan.appendChild(span);

            for (j = 0, m = sentences[i].tokens.length; j < m; j += 1) {
                token = sentences[i].tokens[j];

                tokenSpan = d.createElement('div');
                tokenSpan.setAttribute('class', 'token');
                
                span = d.createElement('div');
                span.setAttribute('class', 'raw');
                span.innerText = token.raw;
                tokenSpan.appendChild(span);
                if (token.profile.sentiment > 0) {
                    span.setAttribute('class', 'raw positive');
                } else if (token.profile.sentiment < 0) {
                    span.setAttribute('class', 'raw negative');
                } else {
                    span.setAttribute('class', 'raw');
                }

                span = d.createElement('div');
                span.setAttribute('class', 'norm');
                span.innerText = token.norm;
                tokenSpan.appendChild(span);

                span = d.createElement('div');
                span.setAttribute('class', 'sentiment');
                span.innerText = token.profile.sentiment + '/' + token.profile.emphasis;
                tokenSpan.appendChild(span);

                span = d.createElement('div');
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
        document.querySelector('#time').innerText = lastTotal;
        container.appendChild(p);
        return p;
    };


    buildHtml(analyse(input.value), document.querySelector('#pos-demo-result'));

    input.addEventListener('keyup', function() {
        var v = input.value;
        if (!v) {return;}
        buildHtml(analyse(input.value), document.querySelector('#pos-demo-result'));
    });

    input.focus();
    input.setSelectionRange(0, input.value.length);

}());