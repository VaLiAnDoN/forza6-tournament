/* Колесо рулетки, погода/сезон/цвета дисциплин */
const WE={'Ясно':'☀️','Облачно после дождя':'⛅','Дождь':'🌧️','Туман':'🌫️','Ночь':'🌙'},SE={'Весна':'🌸','Зима':'❄️','Лето':'☀️','Осень':'🍂'},DC=d=>/Шоссе/.test(d)?'#3b9cff':/Грунт/.test(d)?'#ff8a1f':/Автокросс/.test(d)?'#3ecf4a':d=='Тогэ'?'#19e3c3':'#a35cff',TH=d=>/Шоссе/.test(d)?'ro':/Грунт/.test(d)?'di':/Автокросс/.test(d)?'au':d=='Тогэ'?'to':'st',TP={ro:['#16324f','#0f2236'],di:['#6b4a2b','#4a3220','#8a5a2b'],au:['#2f7d32','#1f5a28','#4caf50'],to:['#0b1a1f','#14222a'],st:['#d62839','#1f4fd8']},TX={ro:'#fff',di:'#fff',au:'#fff',to:'#19e3c3',st:'#fff'};
function spin2(i,k){const r=S.races[i];let its,ti,cb=[];
if(k=='t'){its=S.tracks[r.d].filter(n=>{const x=TD[r.d][n];return!x||((!x.cl||x.cl.includes(r.c))&&(!CIRC(r.d)||lapsFor(x.km,r.c).length))});ti='Трасса'}
if(k=='ws'){const WL=['Ясно','Облачно после дождя','Дождь','Туман','Ночь'],SL=['Весна','Зима','Лето','Осень'];SL.forEach(s=>WL.forEach(w=>cb.push([s,w])));its=cb.map(([s,w])=>s+' · '+(w=='Облачно после дождя'?'После дождя':w));ti='Сезон и погода'}
const x=(TD[r.d]||{})[r.track];
if(k=='l'){const o=x?lapsFor(x.km,r.c):[];its=o.map(v=>v+' кр. · '+(+(v*x.km).toFixed(1))+' км');ti='Круги'}
if(!its||!its.length)return alert('Нет подходящих вариантов');
wheel(its,{t:'a',ws:'e',l:'d'}[k],`${ti} · #${i+1} ${r.d} · ${r.c}`,w=>{
if(k=='t'){r.track=its[w];r.laps=0;const m=TD[r.d][r.track];r.km=m&&!CIRC(r.d)?m.km:0;return'🏁 '+its[w]+(r.km?' · '+r.km+' км':'')}
if(k=='ws'){const[s,wt]=cb[w];r.s=s;r.w=wt;return SE[s]+' '+s+' · '+WE[wt]+' '+wt}
const v=lapsFor(x.km,r.c)[w];r.laps=v;r.km=+(v*x.km).toFixed(1);return'🔁 '+v+' кр. = '+r.km+' км'},k=='t'?TH(r.d):'',null,true)}
/* трансляция кручения остальным игрокам, у кого открыт чемпионат */
let liveSeen='';
function liveCheck(L,first){if(!L||!L.id||L.id===liveSeen)return;liveSeen=L.id;if(first||!me||view!='champ'||L.by===me)return;wheel(L.its,L.st,L.ti,null,L.th||'',L)}
function wheel(its,st,ti,done,th,rep,bc){if(document.getElementById('ov'))return;const n=its.length,sg=360/n,w=rep?rep.w:rnd(n),rot=rep?rep.rot:2160-(w+.5)*sg-(Math.random()-.5)*sg*.7,[ri,ro,du0]={a:[0,140,5.2],b:[44,138,4.6],c:[66,140,4],d:[32,140,4.2],e:[30,140,4.4]}[st],du=rep?Math.max(2.2,du0-1.5):du0,
pal=(st=='a'&&TP[th])||{a:['#19e3c3','#ff3d81','#7c5cff','#ffb020'],b:['#262d4a','#1b2036'],c:['#5fd35f','#6cc4ff','#ffd25a','#ff8a3d'],d:['#19e3c3','#12b6ff','#ff3d81'],e:['#5fd35f','#6cc4ff','#ffd25a','#ff8a3d']}[st],pt=(a,q)=>[q*Math.sin(a*Math.PI/180),-q*Math.cos(a*Math.PI/180)],dk=st=='b'?'#fff':(st=='a'&&TX[th])||'#07080b';
let sl='',d0='',hi='',ho='';
for(let k=0;k<n;k++){const a0=k*sg,[x0,y0]=pt(a0,ro),[x1,y1]=pt(a0+sg,ro),[u0,v0]=pt(a0,ri),[u1,v1]=pt(a0+sg,ri),fs=Math.max(5,Math.min(st=='b'?9:11,160/n)),col=(k==n-1&&n>1&&k%pal.length==0)?pal[1]:pal[k%pal.length],lg=sg>180?1:0;
sl+=(n==1?`<circle r="${ro}" fill="${col}"/>`:`<path d="M${u0} ${v0}L${x0} ${y0}A${ro} ${ro} 0 ${lg} 1 ${x1} ${y1}L${u1} ${v1}A${ri} ${ri} 0 ${lg} 0 ${u0} ${v0}Z" fill="${col}" fill-opacity=".9" stroke="#07080b" stroke-width="${st=='b'?5:1.5}"/>`)+`<text transform="rotate(${(k+.5)*sg-90})" x="${ro-8}" y="${fs/3}" text-anchor="end" font-size="${fs}" font-weight="700" fill="${dk}">${e(its[k].slice(0,26))}</text>`}
if(st=='a'){for(let k=0;k<24;k++){const[x,y]=pt(k*15,148);d0+=`<circle class="bl" cx="${x}" cy="${y}" r="3" fill="#ffd25a"/>`}ho='<circle r="16" fill="#07080b" stroke="#ffffff44"/>'}
if(st=='a'&&th){const rim={ro:'#3b9cff',di:'#8a5a2b',au:'#3ecf4a',to:'#19e3c3',st:'#ff3d81'}[th];d0=`<circle r="150" fill="#0c0e14" stroke="${rim}" stroke-width="4"/>`;ho=`<circle r="16" fill="#07080b" stroke="${rim}" stroke-width="2"/>`;
if(th=='ro'){let tk='';for(let k=0;k<60;k++){const L=k%5?3:8,[a,b]=pt(k*6,148),[c,d]=pt(k*6,148-L);tk+=`M${a} ${b}L${c} ${d}`}d0+=`<path d="${tk}" stroke="#9fd0ff" stroke-width="1.5"/>`;ho+='<text text-anchor="middle" y="3" font-size="7" fill="#9fd0ff">км/ч</text>'}
if(th=='di'){for(let k=0;k<28;k++){const[x,y]=pt(rnd(360),rnd(130)+8);hi+=`<circle cx="${x}" cy="${y}" r="${3+rnd(8)}" fill="#2b1b0e" fill-opacity=".55"/>`}}
if(th=='au'){for(let k=0;k<20;k++)d0+=`<ellipse rx="9" ry="3.5" fill="#2e9e3a" transform="rotate(${k*18}) translate(0 -148) rotate(${k%2?35:-35})"/>`}
if(th=='to')d0+='<circle r="143" fill="none" stroke="#19e3c3" stroke-width="1" stroke-opacity=".7"/><circle r="157" fill="none" stroke="#ff3d81" stroke-width="1" stroke-opacity=".6"/>';
if(th=='st'){for(let k=0;k<24;k++){const[x,y]=pt(k*15,148);d0+=`<circle class="bl" style="animation-duration:.25s;animation-delay:${k%2?.25:0}s" cx="${x}" cy="${y}" r="4" fill="${k%2?'#ff2b3d':'#2f6bff'}"/>`}}}
if(st=='b'){let tp='';for(let k=0;k<36;k++){const[a,b]=pt(k*10,143),[c,d]=pt(k*10,150);tp+=`M${a} ${b}L${c} ${d}`}d0=`<circle r="150" fill="#0a0a0f" stroke="#3a3f55" stroke-width="2"/><path d="${tp}" stroke="#3a3f55" stroke-width="3"/>`;hi=`<circle r="${ri}" fill="#10131c" stroke="#8a90a3" stroke-width="3"/>`+[0,1,2,3,4].map(k=>{const[x,y]=pt(k*72,ri*.6);return`<circle cx="${x}" cy="${y}" r="4" fill="#8a90a3"/>`}).join('')}
if(st=='c'||st=='e'){d0='<circle r="147" fill="none" stroke="#ffffff22" stroke-width="4" stroke-dasharray="2 6"/>';ho=`<circle r="${ri-6}" fill="#0c0e14" stroke="#19e3c3" stroke-width="2"/><text text-anchor="middle" y="8" font-size="22">🌍</text>`}
if(st=='d'){d0='<circle r="148" fill="none" stroke="#ff3d81" stroke-width="5" stroke-dasharray="1 7"/>';ho=`<circle r="${ri}" fill="#0c0e14" stroke="#ff3d81" stroke-width="2"/><text text-anchor="middle" y="7" font-size="18">🏁</text>`}
if(bc&&!rep){S.live={id:Date.now()+'-'+rnd(1e6),by:me,its,st,ti,th:th||'',w,rot};liveSeen=S.live.id;save()}
document.body.insertAdjacentHTML('beforeend',`<div id="ov"><b style="font-size:18px;text-align:center">${e(ti)}</b><svg viewBox="-160 -172 320 332"><circle r="154" fill="#12141b" stroke="#252a38" stroke-width="2"/>${d0}<g id="wh" style="transform:rotate(0deg);transform-origin:0 0;transition:transform ${du}s cubic-bezier(.12,.65,.1,1)">${sl}${hi}</g>${ho}<path d="M-11 -170L11 -170L0 -142Z" fill="#fff" stroke="#ff3d81" stroke-width="2"/></svg><div id="res" class="big" style="min-height:48px;text-align:center"></div></div>`);
const g=document.getElementById('wh');g.getBoundingClientRect();g.style.transform=`rotate(${rot}deg)`;
setTimeout(()=>{const t=rep?'🎯 '+its[w]:done(w);if(!rep){save();render()}const q=document.getElementById('res');if(q)q.innerHTML=`${e(t)}<br><button class="btn pri" data-a="cl">Готово</button>`},du*1000+300)}

function info(r,i){const A=adm(),b=(k,t)=>A?`<button class="btn" data-a="spin" data-i="${i}" data-k="${k}">${t}</button>`:'<span class="mut">—</span>',circ=CIRC(r.d)&&!r.fin;
return`<div class="row" style="margin:6px 0">${r.fin?'<span class="chip">ФИНАЛ</span>':''}${r.track?`<span>${DE(r.d)} <b>${e(r.track)}</b></span>`:b('t','🗺️ Трасса')}${circ&&r.track?(r.laps?`<span>🔁 ${r.laps} кр.</span>`:b('l','🔁 Круги')):''}${r.km?`<span class="ok">🏁 ${r.km} км</span>`:''}${r.w?`<span>${WE[r.w]||'🌦'} ${e(r.w)}</span>`:''}${r.s?`<span>${SE[r.s]||'🍂'} ${e(r.s)}</span>`:''}${r.w&&r.s?'':b('ws','🌦 Погода и сезон')}<input data-code="${i}" placeholder="Код трассы" value="${e(r.code||'')}" ${A?'':'disabled'} style="width:150px;padding:4px 8px"></div>`}
