/* Фон с Фудзи и переход с сакурой */
function FUJI(){let bl='';for(let k=0;k<50;k++){const t=Math.random(),x=1000-t*270+(Math.random()-.5)*30,y=34+t*78+(Math.random()-.5)*50,r=3+Math.random()*5;bl+=`<circle cx="${x|0}" cy="${y|0}" r="${r.toFixed(1)}" fill="${Math.random()<.5?'#ffc1d6':'#ff9fbf'}" opacity=".92"/>`}
const FP='M60 400C210 392 330 330 430 252C460 228 490 208 520 205C550 208 585 232 620 262C720 340 840 392 980 400Z',SN='M440 246C470 224 495 209 520 205C548 208 575 228 604 252L588 258L580 284L562 262L550 300L534 268L520 312L505 270L488 296L478 262L462 282L452 258Z';
return`<svg id="fuji" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice"><defs>
<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d0b25"/><stop offset=".45" stop-color="#34204f"/><stop offset=".75" stop-color="#9a4366"/><stop offset=".92" stop-color="#ff7f5c"/><stop offset="1" stop-color="#ffbf80"/></linearGradient>
<radialGradient id="gl" cx="800" cy="370" r="320" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffd08a" stop-opacity=".95"/><stop offset=".3" stop-color="#ff8458" stop-opacity=".4"/><stop offset="1" stop-color="#ff6450" stop-opacity="0"/></radialGradient>
<linearGradient id="fb" x1="0" y1="205" x2="0" y2="400" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7a78ad"/><stop offset=".4" stop-color="#454080"/><stop offset="1" stop-color="#241f4c"/></linearGradient>
<linearGradient id="fl" x1="520" y1="0" x2="980" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff9064" stop-opacity="0"/><stop offset="1" stop-color="#ff9a68" stop-opacity=".6"/></linearGradient>
<linearGradient id="hz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffaa82" stop-opacity="0"/><stop offset="1" stop-color="#ffaf87" stop-opacity=".65"/></linearGradient>
<linearGradient id="lk" x1="0" y1="400" x2="0" y2="600" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff9a6e"/><stop offset=".25" stop-color="#b24d6a"/><stop offset="1" stop-color="#120c26"/></linearGradient>
<linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
<mask id="cm"><rect y="60" width="1000" height="300" fill="url(#cg)"/></mask>
<filter id="cl" x="0" y="60" width="1000" height="300" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency=".006 .018" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 .72 0 0 0 0 .62 0 0 0 2.2 -.95"/></filter>
<filter id="bl"><feGaussianBlur stdDeviation="2.2"/></filter><filter id="b2"><feGaussianBlur stdDeviation="1.5"/></filter>
<filter id="gr"><feTurbulence baseFrequency=".9" numOctaves="2"/><feColorMatrix type="saturate" values="0"/></filter>
<clipPath id="fc"><path d="${FP}"/></clipPath><clipPath id="lc"><rect y="400" width="1000" height="200"/></clipPath>
<path id="pn" d="M0-72L12-44L6-44L16-18L8-18L20 12L-20 12L-8-18L-16-18L-6-44L-12-44Z"/>
<g id="fj"><path d="${FP}" fill="url(#fb)"/><path d="${FP}" fill="url(#fl)"/><g clip-path="url(#fc)" stroke="#1a1540" stroke-opacity=".4" stroke-linecap="round" fill="none" filter="url(#b2)"><path d="M505 270L470 400" stroke-width="5"/><path d="M534 268L560 400" stroke-width="6"/><path d="M488 296L430 400" stroke-width="4"/><path d="M562 262L640 400" stroke-width="5"/><path d="M462 282L380 400" stroke-width="3"/></g><path d="${SN}" fill="#f4eef7"/><path d="${SN}" fill="url(#fl)"/></g></defs>
<rect width="1000" height="400" fill="url(#sk)"/><rect width="1000" height="400" fill="url(#gl)"/>
<g fill="#fff" opacity=".6"><circle cx="90" cy="50" r="1.3"/><circle cx="210" cy="110" r="1"/><circle cx="330" cy="36" r="1.4"/><circle cx="560" cy="64" r="1.1"/><circle cx="880" cy="46" r="1.3"/><circle cx="640" cy="120" r="1"/><circle cx="150" cy="170" r="1"/></g>
<circle cx="800" cy="362" r="34" fill="#fff0cc"/>
<rect y="60" width="1000" height="300" filter="url(#cl)" mask="url(#cm)" opacity=".7"/>
<path d="M0 400V356C70 340 130 352 200 366S320 350 380 372V400Z" fill="#4b3b72" opacity=".75"/><path d="M640 400V372C700 352 770 362 840 346S950 356 1000 342V400Z" fill="#4b3b72" opacity=".85"/>
<use href="#fj"/><rect y="330" width="1000" height="70" fill="url(#hz)"/>
<path d="M0 400V384C100 372 200 388 300 392V400Z" fill="#2d2350"/><path d="M700 400V388C800 376 900 386 1000 380V400Z" fill="#2d2350"/>
<rect y="400" width="1000" height="200" fill="url(#lk)"/>
<g clip-path="url(#lc)" opacity=".42" filter="url(#bl)"><g transform="translate(0 800) scale(1 -1)"><use href="#fj"/></g></g>
<g fill="#ffe2a8"><rect x="770" y="410" width="60" height="2.5" opacity=".7"/><rect x="778" y="422" width="44" height="2.5" opacity=".55"/><rect x="784" y="436" width="32" height="2" opacity=".45"/><rect x="788" y="452" width="24" height="2" opacity=".35"/></g>
<g stroke="#fff" stroke-opacity=".12" stroke-dasharray="40 30 90 20" fill="none"><path d="M0 430H1000M0 470H1000M0 520H1000"/></g>
<path d="M0 600V545C80 522 160 532 240 550L300 600Z" fill="#0a0716"/><path d="M1000 600V538C920 516 840 532 760 554L700 600Z" fill="#0a0716"/>
<g fill="#0a0716"><use href="#pn" transform="translate(50 540) scale(1.7)"/><use href="#pn" transform="translate(120 548) scale(1.3)"/><use href="#pn" transform="translate(940 534) scale(1.8)"/><use href="#pn" transform="translate(870 546) scale(1.3)"/></g>
<path d="M1000 30C940 50 880 60 810 108M900 56C880 40 860 36 840 44" stroke="#2a1218" stroke-width="4" fill="none" stroke-linecap="round"/>${bl}
<rect width="1000" height="600" filter="url(#gr)" opacity=".07" style="mix-blend-mode:overlay"/></svg>`}
document.body.insertAdjacentHTML('afterbegin',FUJI());

function wipe(){document.querySelectorAll('#wipe').forEach(x=>x.remove());const d=document.createElement('div');d.id='wipe';let p='';for(let i=0;i<46;i++){const w=8+Math.random()*10;p+=`<i class="pt" style="left:${Math.random()*100}%;width:${w}px;height:${w*.75}px;--dx:${(Math.random()-.3)*260}px;--r:${(Math.random()-.5)*1080}deg;animation-delay:${Math.random()*.45}s;animation-duration:${.8+Math.random()*.6}s"></i>`}d.innerHTML=p+'<div class="ft">Forza <b>Horizon</b> 6</div><div class="fs">日本 · JAPAN</div>';document.body.appendChild(d);setTimeout(()=>d.remove(),1250)}
