!function(e){"use strict";function n(e,n){var t;for(t in n)n.hasOwnProperty(t)&&(e[t]=n[t])}var t={},i={},s={},o={},r={},a={},l={},u={},f=Array.isArray,p={profile:{negative_threshold:-.3,positive_threshold:.3,amplitude_threshold:.3,polite_threshold:.2,dirty_threshold:.3}},c="foreign",d="interrogative",g="exclamatory",m="headline",h="imperative",v="approval",y="refusal";e.detect=r,e.dependencies=a,e.inflector=l,e.compendium=t,e.lexer=i,e.factory=s,e.pos=u,e.config=p,!function(){var t=["tuna","trout","spacecraft","salmon","halibut","aircraft","equipment","information","rice","money","species","series","fish","sheep","moose","deer","news","asbestos"],i=[[/^index$/gi,"indices"],[/^criterion$/gi,"criteria"],[/dix$/gi,"dices"],[/(a|o)ch$/gi,"$1chs"],[/(m)an$/gi,"$1en"],[/(pe)rson$/gi,"$1ople"],[/(child)$/gi,"$1ren"],[/^(ox)$/gi,"$1en"],[/(ax|test)is$/gi,"$1es"],[/(octop|vir)us$/gi,"$1i"],[/(alias|status)$/gi,"$1es"],[/(bu)s$/gi,"$1ses"],[/(buffal|tomat|potat|her)o$/gi,"$1oes"],[/([ti])um$/gi,"$1a"],[/sis$/gi,"ses"],[/(?:([^f])fe|([lr])f)$/gi,"$1$2ves"],[/(hive)$/gi,"$1s"],[/([^aeiouy]|qu)y$/gi,"$1ies"],[/(x|ch|ss|sh)$/gi,"$1es"],[/(matr|vert|ind)ix|ex$/gi,"$1ices"],[/([m|l])ouse$/gi,"$1ice"],[/(quiz)$/gi,"$1zes"],[/^gas$/gi,"gases"],[/s$/gi,"s"],[/$/gi,"s"]],s=[[/(m)en$/gi,"$1an"],[/(pe)ople$/gi,"$1rson"],[/(child)ren$/gi,"$1"],[/([ti])a$/gi,"$1um"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses/gi,"$1$2sis"],[/(hive)s$/gi,"$1"],[/(tive)s$/gi,"$1"],[/(curve)s$/gi,"$1"],[/([lr])ves$/gi,"$1f"],[/([^fo])ves$/gi,"$1fe"],[/([^aeiouy]|qu)ies$/gi,"$1y"],[/(s)eries$/gi,"$1eries"],[/(m)ovies$/gi,"$1ovie"],[/(x|ch|ss|sh)es$/gi,"$1"],[/([m|l])ice$/gi,"$1ouse"],[/(bus)es$/gi,"$1"],[/(o)es$/gi,"$1"],[/(shoe)s$/gi,"$1"],[/(cris|ax|test)es$/gi,"$1is"],[/(octop|vir)i$/gi,"$1us"],[/(alias|status)es$/gi,"$1"],[/^(ox)en/gi,"$1"],[/(vert|ind)ices$/gi,"$1ex"],[/(matr)ices$/gi,"$1ix"],[/(quiz)zes$/gi,"$1"],[/s$/gi,""]],o=function(e,n,i){var s,o;if(t.indexOf(e.toLowerCase())>-1)return e;for(s=0,o=n.length;o>s;s++)if(e.match(n[s][0])){e=e.replace(n[s][0],n[s][1]);break}return e},r=function(e,n){var i,s;if(t.indexOf(e.toLowerCase())>-1)return!1;for(i=0,s=n.length;s>i;i++)if(e.match(n[i][0]))return!0;return!1},a="VBZ",u="VBG",f="VBN",p=function(e,n){return n===a?e+"s":n===u?e+"ing":n===f?e+"ed":e},c=function(e,n){return n===a?e+"s":n===u?e+e[e.length-1]+"ing":n===f?e+e[e.length-1]+"ed":e},d=function(e,n){var t=e.slice(0,e.length-1);return n===a?e+"s":n===u?t+"ing":n===f?t+"ed":e},g=function(e,n){var t=e.slice(0,e.length-1);return n===a?t+"ies":n===u?e+"ing":n===f?t+"ied":e},m=function(e,n){return n===a?e+"s":n===u?e+"ing":n===f?e+"d":e},h=function(e,n){return n===a?e+"s":n===u?e.slice(0,e.length-1)+"ing":n===f?e+"d":e},v=function(e,n){return n===a?e+"s":n===u?e.slice(0,e.length-2)+"ying":n===f?e+"d":e},y=function(e,n){return n===a?e+"es":n===u?e+"ing":n===f?e+"ed":e};n(l,{isSingular:function(e){return l.isUncountable(e)||r(e,i)},isPlural:function(e){return e.match(/([saui]s|[^i]a)$/gi)?!1:r(e,s)},isUncountable:function(e){return t.indexOf(e)>-1},singularize:function(e){return l.isPlural(e)?o(e,s):e},pluralize:function(e){return l.isSingular(e)?o(e,i):e},conjugate:function(e,n){e[e.length-1];return e.match(/[^aeiou]y$/gi)?g(e,n):e.match(/[^aeiouy]e$/gi)?d(e,n):e.match(/([aeiuo][ptlgnm]|ir|cur|[^aeiuo][oua][db])$/gi)?c(e,n):e.match(/([ieao]ss|[aeiouy]zz|[aeiouy]ch|nch|rch|[aeiouy]sh|[iae]tch|ax)$/gi)?y(e,n):e.match(/(ee)$/gi)?m(e,n):e.match(/(ie)$/gi)?v(e,n):e.match(/(ue)$/gi)?h(e,n):e.match(/([uao]m[pb]|[oa]wn|ey|elp|[ei]gn|ilm|o[uo]r|[oa]ugh|igh|ki|ff|oubt|ount|awl|o[alo]d|[iu]rl|upt|[oa]y|ight|oid|empt|act|aud|e[ea]d|ound|[aeiou][srcln]t|ept|dd|[eia]n[dk]|[ioa][xk]|[oa]rm|[ue]rn|[ao]ng|uin|eam|ai[mr]|[oea]w|[eaoui][rscl]k|[oa]r[nd]|ear|er|it|ll)$/gi)?p(e,n):null},toPast:function(e){return l.conjugate(e,f)},toGerund:function(e){return l.conjugate(e,u)},toPresents:function(e){return l.conjugate(e,a)},infinitive:function(n){var t=e.lexicon[n];return t&&t.hasOwnProperty("infinitive")?t.infinitive:"are"===n||"am"===n||"'s"===n?"be":null}}),e.inflector=l}(),!function(){function n(e){throw new RangeError(B[e])}function t(e,n){for(var t=e.length,i=[];t--;)i[t]=n(e[t]);return i}function i(e,n){var i=e.split("@"),s="";i.length>1&&(s=i[0]+"@",e=i[1]),e=e.replace(O,".");var o=e.split("."),r=t(o,n).join(".");return s+r}function s(e){for(var n,t,i=[],s=0,o=e.length;o>s;)n=e.charCodeAt(s++),n>=55296&&56319>=n&&o>s?(t=e.charCodeAt(s++),56320==(64512&t)?i.push(((1023&n)<<10)+(1023&t)+65536):(i.push(n),s--)):i.push(n);return i}function o(e){return t(e,function(e){var n="";return e>65535&&(e-=65536,n+=j(e>>>10&1023|55296),e=56320|1023&e),n+=j(e)}).join("")}function r(e){return 10>e-48?e-22:26>e-65?e-65:26>e-97?e-97:m}function a(e,n){return e+22+75*(26>e)-((0!=n)<<5)}function l(e,n,t){var i=0;for(e=t?V(e/x):e>>1,e+=V(e/n);e>P*v>>1;i+=m)e=V(e/P);return V(i+(P+1)*e/(e+y))}function u(e){var t,i,s,a,u,f,p,c,d,y,x=[],N=e.length,k=0,O=b,B=$;for(i=e.lastIndexOf(w),0>i&&(i=0),s=0;i>s;++s)e.charCodeAt(s)>=128&&n("not-basic"),x.push(e.charCodeAt(s));for(a=i>0?i+1:0;N>a;){for(u=k,f=1,p=m;a>=N&&n("invalid-input"),c=r(e.charCodeAt(a++)),(c>=m||c>V((g-k)/f))&&n("overflow"),k+=c*f,d=B>=p?h:p>=B+v?v:p-B,!(d>c);p+=m)y=m-d,f>V(g/y)&&n("overflow"),f*=y;t=x.length+1,B=l(k-u,t,0==u),V(k/t)>g-O&&n("overflow"),O+=V(k/t),k%=t,x.splice(k++,0,O)}return o(x)}function f(e){var t,i,o,r,u,f,p,c,d,y,x,N,k,O,B,P=[];for(e=s(e),N=e.length,t=b,i=0,u=$,f=0;N>f;++f)x=e[f],128>x&&P.push(j(x));for(o=r=P.length,r&&P.push(w);N>o;){for(p=g,f=0;N>f;++f)x=e[f],x>=t&&p>x&&(p=x);for(k=o+1,p-t>V((g-i)/k)&&n("overflow"),i+=(p-t)*k,t=p,f=0;N>f;++f)if(x=e[f],t>x&&++i>g&&n("overflow"),x==t){for(c=i,d=m;y=u>=d?h:d>=u+v?v:d-u,!(y>c);d+=m)B=c-y,O=m-y,P.push(j(a(y+B%O,0))),c=V(B/O);P.push(j(a(c,0))),u=l(i,k,o==r),i=0,++o}++i,++t}return P.join("")}function p(e){return i(e,function(e){return N.test(e)?u(e.slice(4).toLowerCase()):e})}function c(e){return i(e,function(e){return k.test(e)?"xn--"+f(e):e})}var d,g=2147483647,m=36,h=1,v=26,y=38,x=700,$=72,b=128,w="-",N=/^xn--/,k=/[^\x20-\x7E]/,O=/[\x2E\u3002\uFF0E\uFF61]/g,B={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},P=m-h,V=Math.floor,j=String.fromCharCode;d={version:"1.3.2",ucs2:{decode:s,encode:o},decode:u,encode:f,toASCII:c,toUnicode:p},e.punycode=d}(),!function(){var n={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},t={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},i="[^aeiou]",s="[aeiouy]",o=i+"[^aeiouy]*",r=s+"[aeiou]*",a="^("+o+")?"+r+o,l="^("+o+")?"+r+o+"("+r+")?$",u="^("+o+")?"+r+o+r+o,f="^("+o+")?"+s,p=function(e){var i,r,p,c,d,g,m,h;return e.length<3?e:(p=e.substr(0,1),"y"==p&&(e=p.toUpperCase()+e.substr(1)),d=/^(.+?)(ss|i)es$/,g=/^(.+?)([^s])s$/,d.test(e)?e=e.replace(d,"$1$2"):g.test(e)&&(e=e.replace(g,"$1$2")),d=/^(.+?)eed$/,g=/^(.+?)(ed|ing)$/,d.test(e)?(c=d.exec(e),d=new RegExp(a),d.test(c[1])&&(d=/.$/,e=e.replace(d,""))):g.test(e)&&(c=g.exec(e),i=c[1],g=new RegExp(f),g.test(i)&&(e=i,g=/(at|bl|iz)$/,m=new RegExp("([^aeiouylsz])\\1$"),h=new RegExp("^"+o+s+"[^aeiouwxy]$"),g.test(e)?e+="e":m.test(e)?(d=/.$/,e=e.replace(d,"")):h.test(e)&&(e+="e"))),d=/^(.+?)y$/,d.test(e)&&(c=d.exec(e),i=c[1],d=new RegExp(f),d.test(i)&&(e=i+"i")),d=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,d.test(e)&&(c=d.exec(e),i=c[1],r=c[2],d=new RegExp(a),d.test(i)&&(e=i+n[r])),d=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,d.test(e)&&(c=d.exec(e),i=c[1],r=c[2],d=new RegExp(a),d.test(i)&&(e=i+t[r])),d=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,g=/^(.+?)(s|t)(ion)$/,d.test(e)?(c=d.exec(e),i=c[1],d=new RegExp(u),d.test(i)&&(e=i)):g.test(e)&&(c=g.exec(e),i=c[1]+c[2],g=new RegExp(u),g.test(i)&&(e=i)),d=/^(.+?)e$/,d.test(e)&&(c=d.exec(e),i=c[1],d=new RegExp(u),g=new RegExp(l),m=new RegExp("^"+o+s+"[^aeiouwxy]$"),(d.test(i)||g.test(i)&&!m.test(i))&&(e=i)),d=/ll$/,g=new RegExp(u),d.test(e)&&g.test(e)&&(d=/.$/,e=e.replace(d,"")),"y"==p&&(e=p.toLowerCase()+e.substr(1)),e)};e.stemmer=p}(),!function(){var e=function(){this.t_={}};e.prototype.add=function(e,n){throw new Error("Not implmented")},e.prototype.isset=function(e){return null!==this.get(e)},e.prototype.get=function(e){throw new Error("Not implmented")}}(),!function(){var n=["en","fr"];o.toObject=function(e,n){},o.applyPOS=function(n,t){var i,o,r,a;for(a=e.lexer.tokens(n.raw,t),r=e.tag(a,t),n.tags=r.tags,n.stats.confidence=r.confidence,i=0,o=a.length;o>i;i++)n.tokens.push(s.token(a[i],r.norms[i],r.tags[i]));return n.length=o,n},o.analyse=function(n,t){var i,l,u,f,p,c=[],d=n.length;for(i=0;d>i;i++){for(l=Date.now(),u=s.sentence(n[i],t),o.applyPOS(u,t),e.stat(u),a.parse(u),f=0,p=u.tokens.length;p>f;f++)r.apply("t",u.tokens[f],f,u);c.push(u),r.apply("s",u,i,c),u.time=Date.now()-l}return c},e.analyse=function(t,i){var s=null;if("string"==typeof t&&(t=e.lex(e.decode(t),i,!0)),!f(t))throw new Error("Compendium requires a string or an array of strings as argument.");if(i=i||"en",-1===n.indexOf(i))throw new Error("Compendium supports only the following languages: "+n.join(", "));return s=o.analyse(t,i),r.apply("p",s),s}}(),!function(){n(t,{verbs:"".split(" "),irregular:"".split("	").map(function(e){return e.split(" ")}),ing_excpt:[],ing_test:[],emphasis:[],abbrs:["jr","junior","mr","mister","mrs","missus","ms","miss","dr","doctor","prof","professor","pr","professor","sr","senior","sen","senator","sens","senators","corp","corporation","rep","","gov","","atty","attorney","supt","superintendent","det","detective","rev","","col","colonel","gen","general","lt","lieutenant","cmdr","commander","adm","administrative","capt","captain","sgt","sergent","cpl","caporal","maj","","esq","esquire","phd","","adj","adjective","adv","adverb","asst","assistant","bldg","building","brig","brigade","hon","","messrs","messeurs","mlle","mademoiselle","mme","madame","op","","ord","order","pvt","private","reps","","res","","sens","","sfc","","surg","surgeon","ph","","ds","","arc","","al","","ave","avenue","blvd","boulevard","cl","","ct","","cres","","exp","","rd","road","st","street","dist","","mt","mount","ft","","fy","","hwy","highway","la","","pd","","pl","","plz","","tce","","vs","","etc","","esp","","llb","","md","","bl","","ma","","ba","","lit","","fl","","ex","example","eg","","ala","alabama","ariz","arizona","ark","arkansas","cal","california","calif","california","col","coloradoa","colo","colorado","conn","connecticut","del","delaware","fed","federal","fla","florida","ga","georgia","ida","idaho","id","idaho","ill","illinois","ind","indiana","ia","iowa","kan","kansas","kans","kansas","ken","kentuky","ky","kentuky","la","","me","","md","","mass","massachussets","mich","michigan","minn","minnesota","miss","mississippi","mo","missouri","mont","montana","neb","nebraska","nebr","nebraska","nev","nevada","mex","mexico","okla","oklahoma","ok","oklahoma","ore","oregon","penna","pennsylvania","penn","pennsylvania","pa","pennsylvania","dak","dakota","tenn","tennessee","tex","texas","ut","utah","vt","vermont","va","virginia","wash","washington","wis","wisconsin","wisc","wisconsin","wy","wyoming","wyo","wyoming","alta","alberta","ont","ontario","que","quebec","sask","saskatchewan","yuk","yukon","jan","january","feb","february","mar","march","apr","april","jun","june","jul","july","aug","august","sep","september","oct","october","nov","november","dec","december","sept","september","dept","department","univ","university","assn","association","bros","brothers","inc","incorported","ltd","limited","co",""],synonyms:"",abbrs_rplt:[],exclamations:["yahoo","joomla","jeopardy"],rules:"",suffixes:"",emots:[],numbers:{zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,ninteen:19,twenty:20,thirty:30,forty:40,fourty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100,thousand:1e3,million:1e6,billion:1e9,trillion:1e12},nationalities:"",neg:{},neg_neg:{},refusal:{},approval:{},approval_verbs:[],breakpoints:{},citations:{'"':'"',"'":'"',"`":'"'},p:{},months:{},days:{},indicators:{},dirty:"".split(" "),polite:"".split(" ")})}(),!function(){var n=e.inflector,i=function(i){var s,o,r,a,l,u,p,c,d,g=(Date.now(),i.split("	")),m={},h=[];for(s=0,r=g.length;r>s;s++)d=g[s].split(" "),c=d.length-1,l=c>0?d[1].trim():"",u=0,p=null,d[c].match(/^[A-Z]{2,}\/[0-9\-]+$/g)?(p=d[c].split("/")[0],u=d[c].split("/")[1]):(d[c].match(/^[0-9\-]+$/g)||d[c].match(/^\-{0,1}[0-4]\.[0-9]$/g))&&(u=d[c].indexOf(".")>0?parseFloat(d[c]):parseInt(d[c],10)),"EM"===l&&e.punycode.ucs2.decode(d[0]).length>1&&h.push(d[0]),m[d[0]]={pos:"-"===l?"NN":l,sentiment:u,condition:p};for(s in t)if(t.hasOwnProperty(s)&&"object"==typeof t[s]&&!f(t[s])){d=t[s];for(r in d)d.hasOwnProperty(r)&&(u=0,"string"==typeof d[r]?(m.hasOwnProperty(r)&&(u=m[r].sentiment),m[r]={pos:d[r],sentiment:u,condition:null}):"number"==typeof d[r]&&(m[r]={pos:"CD",sentiment:u,value:d[r],condition:null}))}for(s=0,r=t.verbs.length;r>s;s++,u=0)d=t.verbs[s],a=n.conjugate(d,"VBZ"),a&&(m.hasOwnProperty(d)&&(u=m[d].sentiment),m[a]={pos:"VBZ",sentiment:u,condition:null,infinitive:d},a=n.conjugate(d,"VBN"),m.hasOwnProperty(a)?m[a].infinitive=d:m[a]={pos:"VBN",sentiment:u,condition:null,infinitive:d},a=n.conjugate(d,"VBG"),m.hasOwnProperty(a)?m[a].infinitive=d:m[a]={pos:"VBG",sentiment:u,condition:null,infinitive:d});for(s=0,r=t.irregular.length;r>s;s++,u=0)for(d=t.irregular[s],m.hasOwnProperty(d)&&(u=m[d].sentiment),c=d[0],o=0;5>o;o++)d[o].split("/").map(function(e){m.hasOwnProperty(e)?m[e].infinitive||(m[e].infinitive=c,m[e].sentiment=u):m[e]={pos:0===o?"VB":1===o?"VBD":2===o?"VBN":3===o?"VBZ":"VBG",sentiment:u,condition:null,infinitive:c}});return t.emots=h,m},s=function(e){e=e.split("	");var n,i,s=[],o=e.length;for(i=0;o>i;i++)n=e[i].split(" "),s.push({from:n[0],to:n[1],type:parseInt(n[2],10),c1:n[3],c2:n[4]});t.rules=s},o=function(e){e=e.split("	");var n,i,s=e.length,o=[];for(n=0;s>n;n++)i=e[n].split(" "),o.push({regexp:new RegExp("^.{1,}"+i[0].trim()+"$","gi"),pos:i[1]});t.suffixes=o},r=function(e){var t,i=e.length;for(t=0;i>t;t++)e.push(n.pluralize(e[t]))},a=function(e){var n,i=e.length,s=[],o=[];for(n=0;i>n;n++)n%2===0?s.push(e[n]):o.push(e[n]);t.abbrs=s,t.abbrs_rplt=o},l=function(e){var n,i,s={};for(e=e.split(" "),n=0,i=e.length;i>n;n++)s[e[n]]="JJ";t.nationalities=s},u=function(e){e=e.split("	");var n,i=e.length,s=[];for(n=0;i>n;n++)s.push(e[n].split(" "));t.synonyms=s};s(t.rules),o(t.suffixes),a(t.abbrs),r(t.dirty),u(t.synonyms),l(t.nationalities),e.lexicon=i("")}(),!function(){var n={'"':/(&quot;|\u201C|\u201D)/gi,"&":/&amp;/gi,"'":/(&#x27;|\u2018|\u2019)/gi,"<":/&lt;/gi,">":/&gt;/gi,"`":/&#x60/gi,shit:/(s\&\^t|sh\*t)/gi,fuck:/(f\*ck)/gi,"just kidding":"j/k",without:/w\/[to]/g,"with":"w/"," out of ":/\soutta\s/gi};e.decode=function(e){var t;for(t in n)n.hasOwnProperty(t)&&(e=e.replace(n[t],t));return e}}(),!function(){var e=[["VBZ","VBP","VBD","VBG"],["MD","VB"],["NNP","NNPS","NN","NNS"],["WP","WRB"],["UH"]],t="unknown",i=[["NNP","NNP","compound"],["PRP","VBZ","subj"],["PRP","VBP","subj"],["PRP","VBD","subj"],["DT","VBZ","subj"],["DT","VBP","subj"],["DT","VBD","subj"],["WRB","VBP","attr"],["WRB","VBZ","attr"],["WRB","VBD","attr"],["VBG","VBP"],["TO","VB"],["TO","NN"],["TO","NNS"],["DT","NN","det"],["DT","NNP","det"],["PRP$","NN","poss"],["RB","JJ","advmod"],["JJ","NN","amod"],["JJ","NNS","amod"],["JJ","NNP","amod"],["VBG","JJ"],["NN","VBZ","subj"],["NN","VBP","subj"],["NN","VBD","subj"],["NN","VB","subj"],["NNP","VBZ","subj"],["NNP","VBP","subj"],["NNP","VBD","subj"],["NNP","VB","subj"]],s=[["PRP","VBZ","obj"],["PRP","VBP","obj"],["PRP","VBD","obj"],["NN","IN","obj"],["IN","VBZ"],["IN","VBP"],["IN","VBD"],["IN","VBG"],["JJ","VBD","acomp"],["JJ","VBP","acomp"],["JJ","VBZ","acomp"],["IN","VB"],["CC","JJ"],["NNP","VB","obj"],["NN","VB","obj"],["VB","VB","xcomp"]],o=20;n(a,{expand:function(e,n){var r,a,l,u,f,p,c=e.length,d=i.length,g=0,m=!1;for(r=0;c-n>r;r++,g=0)if(p=e.tokens[r],"number"!=typeof p.deps.master&&(u=e.tokens[r+n],p.deps.master!==u.deps.master&&"number"==typeof u.deps.master))for(;(f=e.tokens[u.deps.master])&&u!==f&&u.deps.master&&p.deps.master!==u.deps.master&&(g++,!(g>o));){for(l=p.pos,a=0;d>a;a++)if(l===i[a][0]&&f.pos===i[a][1]){p.deps.master=u.deps.master,p.deps.type=i[a][2]||t,m=!0;break}if(m)break;u=f}for(r=c-1,d=s.length;r>n;r--)if(p=e.tokens[r],"number"!=typeof p.deps.master&&(u=e.tokens[r-n],"number"==typeof u.deps.master&&p.deps.master!==u.deps.master))for(f=e.tokens[u.deps.master],l=p.pos,a=0;d>a;a++)if(l===s[a][0]&&f.pos===s[a][1]){p.deps.master=u.deps.master,p.deps.type=s[a][2]||t,m=!0;break}return m},parse:function(n){var r,a,l,u,f,p=n.length,c=i.length,d=0,g=!0,m=null,h=null,v=0,y=0;if(1===p)return f=n.tokens[0],f.deps.governor=!0,void(n.governor=0);for(r=0;p-1>r;r++)if(f=n.tokens[r],u=n.tags[r+1],l=f.pos,e[v].indexOf(l)>-1)null===m?(m=r,h=r):f.deps.master=m;else for(a=0;c>a;a++)if(l===i[a][0]&&u===i[a][1]){f.deps.master=r+1,f.deps.type=i[a][2]||t;break}for(r=p-1;r>=0;r--)f=n.tokens[r],u=n.tokens[r+1],r!==m&&("compound"===f.deps.type||"det"===f.deps.type?(null!==m&&r>m&&"number"!=typeof u.deps.master&&(u.deps.master=m,u.deps.type="obj"),y+=1,y>1&&(f.deps.master=u.deps.master)):y=0);for(r=p-1,c=s.length;r>0;r--)if(f=n.tokens[r],"number"!=typeof f.deps.master)for(u=n.tags[r-1],l=f.pos,a=0;c>a;a++)if(l===s[a][0]&&u===s[a][1]){f.deps.master=r-1,f.deps.type=s[a][2]||t;break}for(;g&&o>d;){for(g=!1,r=1;5>r;r+=1)g=this.expand(n,r)||g;d+=1}for(c=e.length-1;null===m&&c>v;)for(v++,r=0;p>r;r++)if(e[v].indexOf(n.tags[r])>-1){m=r;break}for(null!==m&&(n.governor=m,n.tokens[m].deps.governor=!0),this.reconnect(n),r=0;p>r;r++)f=n.tokens[r],r!==m&&((null===f.deps.master||f.deps.master===r)&&(f.deps.master=m),null!==f.deps.master&&n.tokens[f.deps.master].deps.dependencies.push(r),"subj"===f.deps.type?n.deps.subjects.push(r):"obj"===f.deps.type&&n.deps.objects.push(r))},reconnect:function(e){var n,i,o,r,a,l,u,f=e.length,p=s.length;for(n=f-1;n>=0;n--)if(u=e.tokens[n],u.deps.governor!==!0&&"number"!=typeof u.deps.master){for(o=n,l=n;l===n&&(o--,-1!==o);)l=e.tokens[o].deps.master;if(-1!==o)for(a=e.tags[o],r=u.pos,i=0;p>i;i++)if(r===s[i][0]&&a===s[i][1]){u.deps.master=o,u.deps.type=s[i][2]||t;break}}}})}(),!function(){var e={t:[],s:[],p:[]};r.add=function(n,t){e.hasOwnProperty(n)?e[n].push(t):console.warn("No detector with type "+n)},r.apply=function(n){var t,i,s=Array.prototype.slice.call(arguments).slice(1);if(e.hasOwnProperty(n))for(t=0,i=e[n].length;i>t;t++)e[n][t].apply(null,s)}}(),!function(){var e=function(e,n){if(n>=e.length)return!1;var t=e.tags[n+1];return"NNP"===t||"NNPS"==t},n=function(e,n){return"&"===e||"TO"===e||"CC"===e&&"or"!==n};r.add("s",function(t,i,o){var r,a,l,u,f,p,c=t.length,d=t.stats;if(!(d.p_upper>75||d.p_cap>85))for(r=0;c>r;r++)a=t.tags[r],l=t.tokens[r],u=l.norm,l.attr.entity>-1?p=null:"NN"===a?p=null:"NNP"===a||"NNPS"===a||p&&n(a,u)&&e(t,r)?p?(p.raw+=" "+l.raw,p.norm+=" "+l.norm,p.toIndex=r,l.attr.entity=f):(p=s.entity(l,r),f=l.attr.entity=t.entities.push(p)-1):p=null})}(),!function(){var e=Object.keys(t.neg).concat(Object.keys(t.refusal)),n=Object.keys(t.neg_neg),i=[["but","to"]];r.add("s",function(t,s,o){var r,a,l,u,f,p=t.length,c=i.length,d=!1,g=0,m=0;for(r=0;p>r;r++){if(f=t.tokens[r],u=t.tokens[r+1],f.profile.breakpoint||f.attr.is_punc)g=0,d=!1;else if(e.indexOf(f.norm)>-1)d?d=!1:(l=t.tokens[r-1],"RB"===f.pos&&l&&(l.attr.is_verb||"MD"===l.pos)&&(l.profile.negated=!0),m++,d=!0);else if(d&&n.indexOf(f.norm)>-1&&0===g)t.tokens[r-1].profile.negated=!1,m--,d=!1;else if(d){for(a=0;c>a&&p-1>r;a+=1)if(f.norm===i[a][0]&&u.norm===i[a][1]){d=!1;break}d&&(m++,g++)}f.profile.negated=d}t.profile.negated=m>0})}(),!function(){var e=["WP","WP$","WRB"];r.add("s",function(n,t){var i,s,o,r,a=n.length,l=n.stats,u=n.governor,f=n.profile.types,p=n.tokens[0],v=n.tokens[a-1];if(a>2&&(l.p_foreign>=10&&l.confidence<.5||l.confidence<=.2)&&f.push(c),l.p_cap>75&&l.p_upper<50&&a>10&&f.push(m),"!"===v.norm)f.push(g);else if("?"===v.norm||e.indexOf(p.pos)>-1&&0===l.breakpoints)f.push(d);else if(u>-1)if(i=n.tags[u],e.indexOf(i)>-1)f.push(d);else if("."!==v.pos&&0===i.indexOf("VB"))for(s=n.tokens[u].deps.dependencies,o=0,r=s.length;r>o;o++)e.indexOf(n.tags[s[o]])>-1&&f.push(d);u>-1&&-1===f.indexOf(d)&&"VB"===n.tags[u]&&f.push(h)})}(),!function(){var e=t.dirty,n=t.polite,i=t.emphasis,s=["wo","'ll","will"],o=function(e,n){var t,i,s=n.deps.dependencies,r=s.length,a=0;if(0!==r){for(t=0;r>t;t+=1)i=e.tokens[s[t]],o(e,i),a+=i.profile.sentiment;n.profile.sentiment+=parseInt(a/r*100)/100}};r.add("s",function(t,r,a){var l,u,f,c,g,m,h,v=t.length,y=0,x=1,$=0,b=0,w=0,N=0,k=0,O=0,B=0,P=t.governor,V=t.profile;for(l=0;v>l;l++)u=t.tokens[l].profile,c=t.tokens[l].pos,g=t.tokens[l].norm,h=e.indexOf(g)>-1,m=n.indexOf(g)>-1,h?k++:m&&N++,u.negated&&"."!==c&&"EM"!==c&&(u.sentiment=h?u.sentiment/2:-u.sentiment/2);for(P>-1&&(f=t.tokens[P],o(t,f),c=f.pos,f.attr.is_verb?V.main_tense="VBD"===c?"past":"present":"MD"===c&&s.indexOf(f.norm)>-1&&(V.main_tense="future")),t.stats.p_upper>70&&(x=1.2),l=0;v>l;l++)u=t.tokens[l].profile,c=t.tokens[l].pos,g=t.tokens[l].norm,x*=u.emphasis,("JJS"===c||"RB"===c&&i.indexOf(g)>-1)&&(w+=u.negated?2:5),$=u.sentiment*(1+w/10),y+=$,$>B?B=$:O>$&&(O=$),u.emphasis*=1+w/10,w>0&&-1===["DT","POS","IN"].indexOf(c)&&w--;5>v?v*=2:v>10&&(v/=2),b=(B+-O)/v,y*=x,y/=v,V.types.indexOf(d)>-1&&(y/=2),V.sentiment=y,V.emphasis=x,V.amplitude=b,V.dirtiness=k/v,V.politeness=N/v,Math.abs(b)>.5&&Math.abs(y)<.5&&Math.abs(b)>Math.abs(y)?V.label="mixed":y<=p.profile.negative_threshold?V.label="negative":y>=p.profile.positive_threshold?V.label="positive":b>=p.profile.amplitude_threshold&&(V.label="mixed")})}(),!function(){var e=Object.keys(t.approval),n=Object.keys(t.refusal);r.add("s",function(i,s){var o,r,a,l=i.tokens[0],u=i.profile,f=i.governor>-1?i.tokens[i.governor]:null,p=f?f.deps.dependencies:null,c=i.stats.words,g=u.types;if(!(g.indexOf(d)>-1)){if(n.indexOf(l.norm)>-1)g.push(y);else if(1===c&&"JJ"===l.pos&&u.sentiment<0)g.push(y);else if(f)if(n.indexOf(f.norm)>-1)g.push(y);else if(g.indexOf(h)>-1&&t.approval_verbs.indexOf(f.norm)>-1&&f.profile.negated)g.push(y);else if("UH"===f.pos)for(r=0,a=p.length;a>r;r+=1)o=i.tokens[p[r]],("UH"===o.pos||"RB"===o.pos)&&n.indexOf(o.norm)>-1&&g.push(y);if(!(g.indexOf(y)>-1))if(e.indexOf(l.norm)>-1)g.push(v);else if(1===c&&"JJ"===l.pos&&u.sentiment>0)g.push(v);else if(f&&3>=c)if(e.indexOf(f.norm)>-1)g.push(v);else if(g.indexOf(h)>-1&&t.approval_verbs.indexOf(f.norm)>-1)g.push(v);else if("UH"===f.pos)for(r=0;a>r;r+=1)o=i.tokens[p[r]],"UH"===o.pos&&e.indexOf(o.norm)>-1&&g.push(v)}})}(),!function(){var n=e.lexicon;r.add("t",function(i,s,o){var r,a,u,f=i.raw,p=i.norm,c=i.stem,d=i.pos,g=0,m=1;r=f.toLowerCase(),a=r.length,a>1&&f.indexOf(".")===a-1&&(u=t.abbrs.indexOf(r.slice(0,a-1)))>-1?(i.attr.abbr=!0,p=t.abbrs_rplt[u]):f.match(/^([a-z]{1}\.)+/gi)?i.attr.acronym=!0:p=e.synonym(p),"."===d?(u=f[0],"!"===u||"?"===u?(m=f.length>1?2:"?"===u?1:1.5,f.length>1&&(p=f[0])):"."===u&&"."===f[1]&&(m=1.2,p="...")):"EM"===d?m=1.2:"UH"===d?m=1.1:0===d.indexOf("VB")&&(i.attr.infinitive=l.infinitive(p)),"NNP"!==d&&"NNPS"!==d&&"IN"!==d&&(n.hasOwnProperty(p)?(u=n[p],u.condition&&i.pos!==u.condition||(g=u.sentiment)):"NNS"===d&&n.hasOwnProperty(l.singularize(p))?(u=n[l.singularize(p)],u.condition&&d!==u.condition||(g=u.sentiment/2)):n.hasOwnProperty(c)?(u=n[c],u.condition&&d!==u.condition||(g=u.sentiment/2)):t.dirty.indexOf(p)>-1?g=-2:t.polite.indexOf(p)>-1&&(g=1)),i.profile.sentiment=g,i.profile.emphasis=m,i.norm=p})}(),!function(){var e=[",",":",";","("],n=["-","—","/"];r.add("t",function(t,i,s){var o=t.raw,r=t.pos;(e.indexOf(r)>-1||n.indexOf(o)>-1)&&(t.profile.breakpoint=!0,s.stats.breakpoints++)})}(),!function(){r.add("t",function(n,i,o){var r,a,l,u,f,p=e.lexer.regexps,c=" "+n.norm+" ";for(r in p)p.hasOwnProperty(r)&&c.match(p[r])&&(a=s.entity(n,i,r),n.attr.entity=o.entities.push(a)-1,"username"===a.type&&(n.pos="NNP",o.tags[i]="NNP"),o.stats.confidence+=1/o.length,"pl"===r&&(a.type="political_affiliation",l=n.norm.split("-"),f=l[1].length,a.meta.party="d"===l[0]?"democrat":"republican","."===l[1][f-1]&&(u=t.abbrs.indexOf(l[1].slice(0,f-1)),u>-1&&(l[1]=t.abbrs_rplt[u])),n.norm=a.meta.party+", "+l[1]))})}(),!function(){var t=[",",".",":",'"',"(",")"];n(s,{entity:function(e,n,t){return{raw:e.raw,norm:e.norm,fromIndex:n,toIndex:n,type:t||null,meta:{}}},sentence:function(e,n){return{language:n,time:0,length:0,governor:-1,raw:e,stats:{words:0,confidence:0,p_foreign:0,p_upper:0,p_cap:0,avg_length:0,breakpoints:0},profile:{label:"neutral",sentiment:0,emphasis:1,amplitude:0,politeness:0,dirtiness:0,types:[],main_tense:"present"},has_negation:!1,entities:[],deps:{subjects:[],objects:[]},tokens:[],tags:[]}},token:function(n,i,s){var o=null,r=0===s.indexOf("VB");return i=i.toLowerCase(),o="VBD"===s||"VBN"===s?"past":"VBG"===s?"gerund":"present",{raw:n,norm:i,stem:e.stemmer(i),pos:s||"",profile:{sentiment:0,emphasis:1,negated:!1,breakpoint:!1},attr:{acronym:!1,abbr:!1,is_verb:r,tense:o,infinitive:null,is_noun:0===s.indexOf("NN"),plural:null,singular:null,entity:-1,is_punc:t.indexOf(s)>-1},deps:{master:null,governor:!1,type:"unknown",dependencies:[]}}},tag:function(e,n,t){return{tag:e||"NN",norm:t,confidence:n||0}}})}(),!function(){var s,o,r=t.abbrs,a=/(\S.+?[….\?!\n])(?=\s+|$|")/g,l=new RegExp("(^| |\\(|\\[|{)("+r.join("|")+")[.!?] ?$","i"),u=" !?()[]{}\"'`%•.…:;,$€£¥\\/+=*_–&",f=e.punycode.ucs2,p=/^-?[0-9]+$/,c=/^[0-9]+$/,d=/^-?[0-9]+[\.,]$/,g={},m=t.emots.length,h=function(e,n,t){var i,s,o,r;for(i in t)if(t.hasOwnProperty(i))for(o=new RegExp(t[i],"gi");null!==(r=o.exec(e));)s=r[0].length,n[r.index]={content:r[1],type:i,length:s-(s-r[1].length)}};for(s=0;2*m>s;s+=2)o=t.emots[s/2],g["em_"+s]="\\s("+o.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")+"+)[^a-z]",g["em_"+(s+1)]="[a-z0-9]("+o.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")+"+)[^a-z]";n(e.lexer,{regexps:{email:"\\s([^\\s]+@[^\\s]+.[a-z]+)",username:"\\s(@[a-z0-9_]+)",html_char:"\\s(&[a-z0-9]{2,4};)",hashtag:"\\s(#[a-z0-9_]+)",url:"\\s((https?|ftp)://[-a-z0-9+&@#/%?=~_|!:,.;]*[-a-z0-9+&@#/%=~_|])",ip:"\\s(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5]))\\s",pl:"\\s([rd]-([a-z]+\\.{0,1})+)"},sentences:function(e){var n,t,i=e.split(a),s=i.length,o=[];for(n=0;s>n;n++)t=i[n].trim(),t.match(l)||t.match(/[ |\.][A-Za-z]\.?$/)?s-1>n&&!i[n+1].match(/^[A-Za-z]\s/)?i[n+1]=t+" "+i[n+1].trim():o.push(t):t&&o.push(t);return o},splitTokens:function(e){var n,t,s,o=e.length,r=[],a=" "+e+" ",l={},p=function(e){if(e){s=f.decode(e);var n,t=s.length,i="";for(n=0;t>n;n++)s[n]>=128511?(i&&r.push(i),r.push(f.encode([s[n]])),i=""):i+=f.encode([s[n]]);i&&r.push(i)}},c=function(e,n){p(e),p(n),t=""};for(h(a,l,i.regexps),h(a,l,g),t="",n=0;o>n;n++)l.hasOwnProperty(n)?(c(t,l[n].content),n+=l[n].length-1):u.indexOf(e[n])>-1?c(t,e[n]):t+=e[n];return c(t),r},tokens:function(e,n){var t,s,o=i.splitTokens(e),a=o.length,l=!1,u=[],f="",g="",m=0;for(t=0;a>t;t++)if(s=o[t].trim())if(f=m>0?u[m-1]:"",g=a-1>t?o[t+1]:"",("."===s||","===s)&&f.match(p)&&g.match(c)||s.match(p)&&f.match(d))l=!1,u[m-1]+=s;else if("."===s&&a-1>t&&m>0&&r.indexOf(f.toLowerCase())>-1)l=!1,u[m-1]+=s;else if(l&&a-1>t&&1===s.length)u[m-1]+=s;else{if(s.match(/^\W+$/gi)){if(l=!1,s===f[f.length-1]){u[m-1]+=s;continue}}else s.match(/^[A-Za-z]{1}$/g)&&a-1>t&&"."===g&&(l=!0);s&&(u.push(s),m++)}else l=!1;return i.postprocess(u)},lex:function(e,n,t){var s,o=i.sentences(e),r=o.length;if(t)return o;for(s=0;r>s;s++)o[s]=i.tokens(o[s],n);return o}}),e.lex=i.lex}(),!function(){var t=["'","’","ʼ"];n(e.lexer,{postprocess:function(e){var n,i,s=e.length,o=[];for(n=0;s>n;n+=1)i=e[n],t.indexOf(i)>-1?o[o.length-1]+="'":o.push(i);return o}})}(),!function(){var i=e.inflector.isPlural,o=0,r=1,a=2,l=3,f=4,p=41,c=5,d=51,g=6,m=8,h=81,v=9,y=11,x=12,$=121,b=13,w=14,N=15,k=16,O=17,B=171,P=18,V=19,j=21,_=e.lexicon,z=t.emots,C=t.rules,J=C.length,R=t.suffixes,D=R.length,E=function(n){var t=n.replace(/(.)\1{2,}/g,"$1$1");return e.lexicon.hasOwnProperty(t)?t:(t=n.replace(/(.)\1{1,}/g,"$1"),e.lexicon.hasOwnProperty(t)?t:null)};n(u,{applyRule:function(e,n,t,i,s,u){if(e.from!==t)return 0;var _,z,C=e.type;{if(C!==o){if(n=n.toLowerCase(),C===a){if(i>0&&u[i-1]===e.c1)return void(u[i]=e.to)}else if(C===d){if(_=s[i-1]||"",u[i-1]===e.c2&&_.toLowerCase()===e.c1)return void(u[i]=e.to)}else if(C===l){if(u[i+1]===e.c1)return void(u[i]=e.to)}else if(C===f){if(u[i+2]===e.c1)return void(u[i]=e.to)}else if(C===p){if(u[i-2]===e.c1)return void(u[i]=e.to)}else if(C===r){if(u[i-1]===e.c1||u[i-2]===e.c1)return void(u[i]=e.to)}else if(C===c){if(_=s[i-1]||"",_.toLowerCase()===e.c1)return void(u[i]=e.to)}else if(C===g){if(n===e.c1)return void(u[i]=e.to)}else if(C===m){if(n===e.c2&&u[i-1]===e.c1)return void(u[i]=e.to)}else if(C===h){if(_=s[i-1]||"",n===e.c2&&_.toLowerCase()===e.c1)return void(u[i]=e.to)}else if(C===v){if(u[i+1]===e.c1||u[i+2]===e.c1||u[i+3]===e.c1)return void(u[i]=e.to)}else if(C===y){if(_=s[i+2]||"",_.toLowerCase()===e.c1)return void(u[i]=e.to)}else if(C===$){if(_=s[i+1]||"",n===e.c1&&_.toLowerCase()===e.c2)return void(u[i]=e.to)}else if(C===x){if(n===e.c1&&u[i+1]===e.c2)return void(u[i]=e.to)}else if(C===b){if(u[i-1]===e.c1||u[i-2]===e.c1||u[i-3]===e.c1)return void(u[i]=e.to)}else if(C===w){if(u[i-1]===e.c1&&u[i+1]===e.c2)return void(u[i]=e.to)}else if(C===N){if(_=s[i+1]||"",_.toLowerCase()===e.c1)return void(u[i]=e.to)}else if(C===k){if(u[i+1]===e.c1||u[i+2]===e.c1)return void(u[i]=e.to)}else if(C===O){if(u[i-2]===e.c1&&u[i-1]===e.c2)return void(u[i]=e.to)}else if(C===B){if(u[i+1]===e.c1&&u[i+2]===e.c2)return void(u[i]=e.to)}else if(C===P){if(_=s[i+1]||"",z=s[i+2]||"",_.toLowerCase()===e.c1||z.toLowerCase()===e.c1)return void(u[i]=e.to)}else if(C===V){if(z=s[i-2]||"",z.toLowerCase()===e.c1)return void(u[i]=e.to)}else if(C===j){if(_=s[i-1]||"",z=s[i-2]||"",_.toLowerCase()===e.c1||z.toLowerCase()===e.c1)return void(u[i]=e.to)}else if(C===r&&(_=u[i-1]||"",z=u[i-2]||"",_===e.c1||z===e.c1))return void(u[i]=e.to);return 0}if(0===i&&n===e.c1)return void(u[i]=e.to)}},applyRules:function(e,n,t,i){var s;for(s=0;J>s;s++)u.applyRule(C[s],e,i[n],n,t,i)},apply:function(e,n){var t,i=e.length;for(t=0;i>t;t++)this.applyRules(e[t],t,e,n);return n},testSuffixes:function(e){var n;for(n=0;D>n;n++)if(e.match(R[n].regexp))return R[n].pos;return null},getTag:function(n){var t,i,o,r,a,l=s.tag();if(l.norm=n,n.length>1)for(t=null,i=0,o=z.length;o>i;i++)if(0===n.indexOf(z[i]))return l.tag="EM",l.confidence=1,l;return t=e.lexicon[n],t&&"-"!==t?(l.tag=t,l.confidence=1,l):(r=n.toLowerCase(),"string"==typeof n&&n.match(/[A-Z]/g)&&(t=e.lexicon[r],t&&"-"!==t)?(l.tag=t,l.confidence=.8,l):r.match(/(\w)\1+/g)&&(a=E(r))?(l.norm=a,t=e.lexicon[a],l.tag=t,l.confidence=.7,l):(a=e.synonym(r),a!==r&&(t=e.lexicon[a])?(l.tag=t,l.confidence=.5,l):(t=u.testSuffixes(n),t?(l.tag=t,l.confidence=.25,l):n.indexOf("-")>-1?(l.tag=n.match(/^[A-Z]/g)?"NNP":"JJ",l.confidence/=2,l):l)))},tag:function(e){var n,s,o,r,a,l,f,p=[],c=[],d=e.length,g=!1,m=0,h=function(e,n){e="object"==typeof e?e.pos:e,p.push("-"===e?"NN":e),m+=n};for(o=0;d>o;o++)n=e[o],c[o]=n,n.match(/^[%\+\-\/@]$/g)?h("SYM",1):n.match(/^(\?|\!|\.){1,}$/g)?h(".",1):n.match(/^-?[0-9]+([\.,][0-9]+)?$/g)||n.match(/^([0-9]{2}|[0-9]{4})s$/g)||n.match(/^[0-9]{2,4}-[0-9]{2,4}$/g)?h("CD",1):(l=u.getTag(e[o]),h(l.tag,l.confidence),c[o]=l.norm);for(o=0;d>o;o++)if(s=p[o],"SYM"!==s&&"."!==s){if(n=e[o],
a=n.toLowerCase(),r=n.length,f=0===o?"":p[o-1],0===o){if("that"===a){p[o]="DT",m++;continue}if("NN"===s&&t.verbs.indexOf(a)>-1){p[o]="VB",m++;continue}}!(r>3&&n.match(/[^e]ed$/gi)&&0===s.indexOf("N"))||0!==o&&n.match(/^[A-Z][a-z]+/g)?!(r>4&&n.lastIndexOf("ing")===r-3&&-1===t.ing_excpt.indexOf(a))||0!==s.indexOf("N")&&"MD"!==s||0!==o&&n.match(/^[A-Z][a-z]+/g)||"NN"===f||"JJ"===f||"DT"===f||"VBG"===f?r>4&&a.lastIndexOf("in")===r-2&&"NN"===s&&(0===o||!n.match(/^[A-Z][a-z]+/g))&&"NN"!==f&&"JJ"!==f&&"DT"!==f&&"VBG"!==f&&(l=_[a+"g"],l&&"VBG"===l.pos)?p[o]="VBG":(t.verbs.indexOf(a)>-1&&"TO"===f&&(s="VB"),"DT"!==f&&n.match(/^[IVXLCDM]+$/g)&&"I"!==n&&(s="CD"),"NN"===s||"VB"===s||"JJ"===s&&t.nationalities.hasOwnProperty(a)===!1?n.match(/^[A-Z]+$/g)||n.match(/^([a-z]{1}\.)+/gi)?(s="NNP",g=!0):o>0&&n.match(/^[A-Z][a-z\.]+$/g)?(s="NNP",g=!0,1!==o||"NN"!==f&&"NNS"!==f&&"JJ"!==f&&"VB"!==f||!e[o-1].match(/^[A-Z][a-z\.]+$/g)||(p[o-1]="NNP")):g=!1:g&&("CD"===s&&n.match(/^[IVXLCDM]+$/g)||"I"===n)?s="NNP":g=!1,"NN"===s&&i(n)&&(s="NNS"),p[o]=s):p[o]="VBG":p[o]="VBN"}for(u.apply(e,p),o=0;d>o;o++)n=e[o],s=p[o],f=p[o-1]||"",n.match(/ed$/g)&&("JJ"!==s||"VBZ"!==f&&"VBP"!==f||"TO"!==p[o+1]||(p[o]="VBN"));return{tags:p,norms:c,confidence:m/d}}}),e.tag=u.tag}(),!function(){var n=["#","SYM","CR","EM"];e.stat=function(e){var t,i,s,o,r=e.length,a=r,l=e.stats,u=0,f=0,p=0,c=0,d=0;for(t=0;r>t;t++)i=e.tokens[t],s=i.raw,u+=s.length,o=e.tags[t],i.attr.is_punc||n.indexOf(o)>-1?a--:(c+=1,s.match(/^[A-Z][a-zA-Z]+$/g)&&d++,s.match(/[A-Z]+/)&&!s.match(/[a-z]/)&&p++,"FW"===o&&f++);0===a&&(a=1),l.words=c,l.p_foreign=100*f/a,l.p_upper=100*p/a,l.p_cap=100*d/a,l.avg_length=u/a}}(),!function(){var n=t.synonyms,i=n.length;e.synonym=function(e){var t;for(t=0;i>t;t++)if(n[t].indexOf(e)>0)return n[t][0];return e}}()}("undefined"==typeof exports?this.compendium={}:exports);