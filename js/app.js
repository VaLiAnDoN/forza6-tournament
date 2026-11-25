/* Сборка render и запуск */
function LGBG(){let p='';for(let i=0;i<46;i++){const w=8+Math.random()*10;p+=`<i class="pt" style="left:${Math.random()*100}%;width:${w}px;height:${w*.75}px;--dx:${(Math.random()-.3)*260}px;--r:${(Math.random()-.5)*1080}deg;animation-delay:-${Math.random()*10}s;animation-duration:${6+Math.random()*6}s"></i>`}return`<div id="lgbg">${p}<div class="ft">Forza <b>Horizon</b> 6</div><div class="fs">日本 · JAPAN</div></div>`}
document.body.insertAdjacentHTML('afterbegin',LGBG());

function WOFBG(){const pt=(a,r)=>[(r*Math.sin(a*Math.PI/180)).toFixed(1),(-r*Math.cos(a*Math.PI/180)).toFixed(1)];let w='',b='',st='',bk='';
for(let k=0;k<20;k++){const a0=k*18,[x0,y0]=pt(a0,160),[x1,y1]=pt(a0+18,160);w+=`<path d="M0 0L${x0} ${y0}A160 160 0 0 1 ${x1} ${y1}Z" fill="${k%2?'#1f7bf0':'#46b8ff'}" stroke="#ffffff55" stroke-width="1.5"/>`}
for(let k=0;k<28;k++){const[x,y]=pt(k*360/28,181);b+=`<circle class="bl" style="animation-delay:${k%2?.3:0}s" cx="${x}" cy="${y}" r="4.4" fill="#fff2a8"/>`}
for(let k=0;k<40;k++)st+=`<circle class="bl" style="animation-duration:${1+Math.random()*2.5}s;animation-delay:${Math.random()*2}s" cx="${(Math.random()*1000-500)|0}" cy="${(Math.random()*900-450)|0}" r="${(1+Math.random()*2.4).toFixed(1)}" fill="#fff"/>`;
for(let k=0;k<14;k++)bk+=`<i class="bk" style="left:${Math.random()*100}%;top:${Math.random()*70}%;width:${30+Math.random()*90}px;height:${30+Math.random()*90}px;animation-delay:-${Math.random()*8}s;animation-duration:${6+Math.random()*6}s"></i>`;
// Fictional night traffic: overhead silhouettes, metallic paint and soft light pools.
const profiles=[
 ['#637b9b', 'M45 29Q29 29 24 40L20 55V85L24 100Q29 111 45 111H173Q190 110 195 98L199 84V56L195 42Q190 29 173 29Z',75,139],
 ['#a49a87','M42 27Q28 27 24 43L21 56V85L25 101Q30 113 43 113H177Q195 111 199 96V44Q195 29 177 27Z',65,137],
 ['#76526a','M45 33Q29 33 24 48L21 70L24 92Q29 107 45 107H171Q191 105 198 88V52Q191 35 171 33Z',83,147],
 ['#87928e','M39 25Q24 25 21 40V100Q24 115 39 115H177Q194 115 199 100V40Q194 25 177 25Z',61,143],
 ['#9a6651','M46 30Q30 30 24 45L20 70L24 95Q30 110 46 110H170Q190 110 198 93V47Q190 30 170 30Z',78,142],
 ['#535e76','M39 29Q25 29 22 42V98Q25 111 39 111H178Q194 111 199 97V43Q194 29 178 29Z',59,133]
];
const cars=profiles.map(([color,body,l,r],i)=>`<symbol id="kfcar${i}" viewBox="0 0 260 140">
<ellipse cx="109" cy="73" rx="93" ry="46" fill="#080619" opacity=".55"/>
<path d="M191 39L260 15V61L191 51ZM191 89L260 79V125L191 101Z" fill="url(#kfbeam)"/>
<path d="M24 42L0 32V57L24 53ZM24 87L0 83V108L24 98Z" fill="url(#kftail)"/>
${[45,166].map(x=>`<rect x="${x}" y="23" width="27" height="94" rx="5" fill="#141321"/>`).join('')}
<path d="${body}" fill="${color}" stroke="#1b1929" stroke-width="2"/><path d="${body}" fill="url(#kfmetal)"/>
<path d="M${l-18} 42L${l} 48V92L${l-18} 98Q${l-28} 70 ${l-18} 42Z" fill="url(#kfglass)" stroke="#b4a6cf" stroke-opacity=".4"/>
<path d="M${r} 48L${r+19} 39Q${r+30} 70 ${r+19} 101L${r} 92Z" fill="url(#kfglass)" stroke="#b4a6cf" stroke-opacity=".4"/>
<path d="M${l} 46L${r} 46L${r-5} 39H${l+5}ZM${l} 94H${r}L${r-5} 101H${l+5}Z" fill="#202333"/>
<rect x="${l+3}" y="49" width="${r-l-6}" height="42" rx="9" fill="${color}"/><rect x="${l+3}" y="49" width="${r-l-6}" height="42" rx="9" fill="url(#kfmetal)"/>
<path d="M${r+22} 43L${r+28} 29M${r+22} 97L${r+28} 111M${l-23} 43L${l-27} 30M${l-23} 97L${l-27} 110" stroke="#181726" stroke-opacity=".65" fill="none"/>
<path d="M${r+3} 34L${r+10} 21L${r+17} 22L${r+16} 34ZM${r+3} 106L${r+10} 119L${r+17} 118L${r+16} 106Z" fill="${color}" stroke="#242233"/>
<path d="M29 39L35 36V50L28 53ZM29 101L35 104V90L28 87Z" fill="#e47a91"/><path d="M184 35L193 42V54L186 50ZM184 105L193 98V86L186 90Z" fill="#e6e4ff"/>
<path d="M39 34H${l-30}M39 106H${l-30}M${r+29} 34H177M${r+29} 106H177" stroke="#fff" stroke-opacity=".23" stroke-width="1.4"/>
${i===2||i===4?'<rect x="36" y="31" width="7" height="78" rx="2" fill="#252333" stroke="#a39ab1" stroke-opacity=".35"/>':''}
</symbol>`).join('');
const shuffled=profiles.map((_,i)=>i);for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]}
const C=shuffled.map((id,i)=>{const lane=i%2,slot=Math.floor(i/2),duration=lane?29:34;return `<svg class="wc kf-lane${lane}" style="--trip:${duration}s;--delay:-${(slot*duration/3+Math.random()*.7).toFixed(2)}s" viewBox="0 0 260 140" aria-hidden="true"><use href="#kfcar${id}" ${lane?'transform="translate(260 140) rotate(180)"':''}/></svg>`}).join('');
return`<div id="wofbg"><div class="rays"></div><svg class="wh" viewBox="-200 -200 400 400"><defs><linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#58c4ff"/><stop offset="1" stop-color="#1a43b8"/></linearGradient><linearGradient id="wsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><circle r="192" fill="url(#wg2)" stroke="#fff" stroke-opacity=".7" stroke-width="3"/><circle r="172" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="14 10"/><g class="wspin">${w}</g>${b}<circle r="46" fill="#3a1d9a" stroke="#fff" stroke-width="4"/><path d="M0-30L8.8-9.3L30-9.3L12.7 3.5L19.4 24.3L0 11.5L-19.4 24.3L-12.7 3.5L-30-9.3L-8.8-9.3Z" fill="#fff"/></svg>${bk}<svg class="sk" viewBox="-500 -450 1000 900" preserveAspectRatio="xMidYMid slice">${st}</svg><svg width="0" height="0" style="position:absolute"><defs><linearGradient id="kfmetal" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e8d9ff" stop-opacity=".45"/><stop offset=".22" stop-color="#fff" stop-opacity=".06"/><stop offset=".5" stop-color="#a8a1cc" stop-opacity=".16"/><stop offset="1" stop-color="#110a28" stop-opacity=".55"/></linearGradient><linearGradient id="kfglass" x2="0" y2="1"><stop stop-color="#77829b"/><stop offset=".35" stop-color="#252b43"/><stop offset="1" stop-color="#101421"/></linearGradient><linearGradient id="kfbeam"><stop stop-color="#e5dcff" stop-opacity=".28"/><stop offset="1" stop-color="#e5dcff" stop-opacity="0"/></linearGradient><linearGradient id="kftail"><stop stop-color="#e74a82" stop-opacity="0"/><stop offset="1" stop-color="#e74a82" stop-opacity=".22"/></linearGradient>${cars}</defs></svg><div class="rdw"></div>${C}</div>`}
document.body.insertAdjacentHTML('afterbegin',WOFBG());
let lk='';const _rd=render;render=function(){const A=document.getElementById('app');document.body.classList.toggle('lg',!me);document.body.classList.toggle('champ-ready',!!me&&view==='champ');{const kk=view+'|'+!!me+'|'+tab+'|'+tkTab;if(kk!=lk){lk=kk;A.classList.remove('sw');void A.offsetWidth;A.classList.add('sw')}}document.body.classList.toggle('fj',!!me&&view=='home');document.body.classList.toggle('vd',!!me&&view=='tachki');document.body.classList.toggle('vy',!!me&&view=='tachki'&&vidOn);document.body.classList.toggle('wf',!!me&&view=='wof');yt();if(view!='champ'&&me){alt(A)}else{_rd();if(me)A.insertAdjacentHTML('afterbegin',nav())}if(me&&view==='champ')paint();window.achProcess&&achProcess();popR();window.chmR&&chmR()};

render();
