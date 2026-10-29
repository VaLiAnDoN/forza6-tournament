/* Меню, главная, колесо фортуны, переключение разделов */
const dord=()=>{const a=(S.dorder||[]).filter(n=>CP().some(p=>p.n==n));CP().forEach(p=>{if(!a.includes(p.n))a.push(p.n)});return a};
let mo=false,pop=null;
const nav=()=>`<div style="position:fixed;left:12px;top:calc(env(safe-area-inset-top,0px) + 12px);z-index:8"><button class="btn" data-a="mn">☰ Меню</button>${mo?`<div class="card" style="position:absolute;z-index:6;left:0;top:44px;width:250px"><button class="btn" data-a="v" data-k="home" style="width:100%;margin:3px 0">🏠 Главная</button><button class="btn" data-a="pop" data-k="cars" style="width:100%;margin:3px 0">🚗 Список машин</button><button class="btn" data-a="pop" data-k="ach" style="width:100%;margin:3px 0">🏆 Достижения</button><button class="btn" data-a="pop" data-k="me" style="width:100%;margin:3px 0">👤 Личная статистика</button>${adm()?'<button class="btn" data-a="pop" data-k="set" style="width:100%;margin:3px 0">⚙️ Настройки</button>':''}</div>`:''}</div>`;
const PLR=()=>`<h2 style="margin-top:4px">Игроки и коды</h2><div class="card">${S.players.map(p=>`<div class="row"><b class="sp">${e(p.n)}</b><code>${p.c}</code></div>`).join('')}<div class="row" style="margin-top:8px"><input id="np" placeholder="Новый игрок" class="sp"><button class="btn" data-a="addp">Добавить</button></div></div>`;
const CF={'Австралия':'au','Австрия':'at','Канада':'ca','Китай':'cn','Хорватия':'hr','Дания':'dk','Франция':'fr','Германия':'de','Италия':'it','Япония':'jp','Корея':'kr','Швеция':'se','Великобритания':'gb','США':'us'};

const DE=d=>/Шоссе/.test(d)?'🛣️':/Грунт/.test(d)?'🏜️':/Автокросс/.test(d)?'🌿':d=='Тогэ'?'⛰️':'🏙️';
const HOME=()=>`<h2 style="color:#fff;text-shadow:0 2px 8px #000">Чемпионаты</h2><div class="plate" data-a="v" data-k="champ" style="padding:30px 44px"><img src="img/champ5-emblem.png" alt="Эмблема чемпионата 5" width="84" height="84" style="display:block;width:84px;height:84px;object-fit:contain;margin:0 auto 8px"><div style="font-size:12px;letter-spacing:4px">日本 · NATIONS CUP</div><div style="font-size:36px;letter-spacing:3px;margin:6px 0">5 · СТРАНЫ</div><div style="font-size:12px">ЧЕМПИОНАТ ПО FORZA · ДРАФТ СТРАН</div></div><div class="plate" data-a="v" data-k="tachki" style="padding:30px 44px"><img src="img/tachki/cars-logo.png" alt="Эмблема Тачек" style="display:block;width:auto;max-width:200px;max-height:80px;object-fit:contain;margin:0 auto 8px"><div style="font-size:12px;letter-spacing:4px">TOURNAMENT</div><div style="font-size:36px;letter-spacing:3px;margin:6px 0">ТАЧКИ</div><div style="font-size:12px">ТУРНИР · ТАБЛИЦА · ГОНКИ</div></div><div class="plate" data-a="v" data-k="wof" style="padding:30px 44px"><div style="font-size:12px;letter-spacing:4px">WHEEL</div><div style="font-size:30px;letter-spacing:2px;margin:6px 0">КОЛЕСО ФОРТУНЫ</div><div style="font-size:12px">КРУТИ · ВЫБИРАЙ · СПОРЬ</div></div><div class="plate lk" style="padding:26px 44px"><div style="font-size:14px;letter-spacing:4px">🔒</div><div style="font-size:30px;letter-spacing:2px;margin:6px 0">ЧЕМПИОНАТ 6</div><div style="font-size:12px">СКОРО</div></div>`;
/* Колесо Фортуны: игры. Драфт-исключение дисциплин → таблицы гонок → очки. Рулетка машин. */
let wgOpen={},wgDel=null,cwS=null,cwT=0;
const DEM=['','🌿','🥊','🧭','⛰️','🏜️','🔁','🌄','🏁','🚦','🌃','📡','🛫','💥','💨','⚡','👑'],DGC=['#3ecf4a','#ff8a1f','#3b9cff','#a35cff'],
WT={1:'time',5:'time',6:'time',8:'time',9:'time',10:'time',15:'time',2:'rank',4:'rank',13:'rank',16:'rank',3:'rev',11:'sum',12:'sum',14:'score',7:'toge'},
WTL={time:'по времени',rank:'по местам',rev:'время · больше = лучше',sum:'сумма двух результатов',score:'очки · больше = лучше',toge:'круговой турнир'},
WL={11:['Радар, км/ч','Скоростной участок, км/ч'],12:['Прыжок, м','Макс. скорость, км/ч']},
pv=s=>{s=String(s||'').trim().replace(',','.');if(!s)return;if(/^(н\/?ф|dnf|nf)$/i.test(s))return null;const m=s.match(/^(\d+):(\d{1,2})(?:\.(\d{1,3}))?$/);if(m)return +m[1]*60+ +m[2]+(m[3]?+('0.'+m[3]):0);const x=parseFloat(s);return isNaN(x)?undefined:x},
wgPool=g=>DISC.map((d,i)=>i).filter(i=>i&&!(g.ex||[]).includes(i)),
wgPhase=g=>!g.st?0:wgPool(g).length<=g.k?2:1,
wgTurn=g=>{const n=g.ord.length,k=(g.rm||[]).length;if(wgPhase(g)!=1||!n)return null;const r=Math.floor(k/n),i=k%n;return g.ord[g.sn&&r%2?n-1-i:i]},
wgList=()=>Object.values(S.wg||{}).sort((a,b)=>b.t-a.t),
wgIsOpen=(g,L)=>wgOpen[g.id]!==undefined?wgOpen[g.id]:!!L[0]&&L[0].id==g.id,
wgMy=g=>((g.cr||{})[me]||[]).map(k=>CARS.find(c=>c[1]+' '+c[2]==k)).filter(Boolean);
/* подсказки мини-ИИ: зелёный — оставлять, жёлтый — убирать (видит только сам игрок) */
function wgHints(g){if(!me||!g.pl.includes(me))return null;const my=wgMy(g),pool=wgPool(g);if(!my.length||pool.length<2)return null;const sc={},bc={};
pool.forEach(d=>{let b=-1,bcar=null;my.forEach(c=>{const s=suit(c,d);if(s>b){b=s;bcar=c}});sc[d]=b;bc[d]=bcar});
const ord=[...pool].sort((a,b)=>sc[b]-sc[a]),K=Math.min(g.k,ord.length),R=ord.length-K,green=new Set(),yellow=new Set();
ord.forEach((d,i)=>{if(i<K&&sc[d]>=55)green.add(d);if(R>0&&i>=K)yellow.add(d);if(sc[d]<35)yellow.add(d)});
const worst=[...yellow].sort((a,b)=>sc[a]-sc[b])[0];return{sc,bc,green,yellow,worst}}
/* результаты */
function wgVal(g,d,p){const r=(g.rc||{})[d]||{},t=WT[d],v=(r.v||{})[p],v2=(r.v2||{})[p];
if(t=='time')return ms(v);
if(t=='rank'){const x=parseInt((r.pl||{})[p]);return isNaN(x)?undefined:x}
if(t=='sum'){const a=pv(v),b=pv(v2);if(a===null||b===null)return null;if(a===undefined||b===undefined)return;return a+b}
return pv(v)}
function wgRank(g,d){const P=g.pl,n=P.length,t=WT[d],low=t=='time'||t=='rank',V={},res={};P.forEach(p=>V[p]=wgVal(g,d,p));
const done=P.every(p=>V[p]!==undefined);
P.forEach(p=>{const v=V[p];let place=null,pts=null;if(done){if(v===null)pts=0;else{place=1+P.filter(q=>V[q]!==null&&(low?V[q]<v:V[q]>v)).length;pts=n-place+1}}res[p]={v,place,pts}});
return{done,res}}
function wgToge(g){const P=g.pl,r=((g.rc||{})[7])||{},M=[],pts={},best={};P.forEach(p=>{pts[p]=0;best[p]=Infinity});
for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++)M.push([P[i],P[j]]);
let done=M.length>0;
M.forEach(([a,b],i)=>{const m=(r.m||{})[i]||{},ta=ms(m.a),tb=ms(m.b);[[a,ta],[b,tb]].forEach(([p,t])=>{if(typeof t=='number'&&t<best[p])best[p]=t});
if(ta===undefined||tb===undefined){done=false;return}
const fa=ta!==null,fb=tb!==null;let pa,pb;if(!fa&&!fb)pa=pb=0;else if(fa&&!fb){pa=2;pb=0}else if(!fa&&fb){pa=0;pb=2}else if(ta<tb){pa=2;pb=1}else if(tb<ta){pa=1;pb=2}else pa=pb=1.5;
pts[a]+=pa;pts[b]+=pb});
const order=[...P].sort((x,y)=>pts[y]-pts[x]||(best[x]===best[y]?0:best[x]-best[y])),res={};
order.forEach((p,i)=>{res[p]={tp:pts[p],best:best[p],place:i+1,pts:done?(best[p]!==Infinity?P.length-i:0):null}});
return{M,done,res,order}}
const wgRes=(g,d)=>WT[d]=='toge'?wgToge(g):wgRank(g,d);
function wgTotals(g){const D=wgPool(g),tot={};g.pl.forEach(p=>tot[p]=0);const cols=D.map(d=>{const r=wgRes(g,d);g.pl.forEach(p=>{if(r.done&&r.res[p]&&r.res[p].pts!=null)tot[p]+=r.res[p].pts});return[d,r]});return{cols,tot}}
/* действия */
function wgAct(a,el){const d=el.dataset,g=(S.wg||{})[d.g],A=adm();
if(a=='wgrx'){clearTimeout(cwT);const o=document.getElementById('cw');if(o)o.remove();return}
if(a=='wgnew'&&A){const id='g'+Date.now().toString(36)+rnd(1e4);S.wg=S.wg||{};S.wg[id]={id,n:'Игра '+(Object.keys(S.wg).length+1),t:Date.now(),pl:[],ord:[],sn:0,ex:[],rm:[],k:8,st:0,cr:{},rc:{}};wgOpen[id]=true;return}
if(!g)return;
if(a=='wgt'){wgOpen[d.g]=!wgIsOpen(g,wgList());return}
if(a=='wgdel'&&A){if(wgDel==d.g){delete S.wg[d.g];wgDel=null}else wgDel=d.g;return}
if(a=='wgadd'&&A&&!g.st){const i=document.getElementById('wgp_'+g.id),n=(d.p||(i?i.value:'')).trim();if(!n)return;if(g.pl.includes(n))return alert('Такой участник уже есть');g.pl.push(n);g.ord.push(n);if(i)i.value='';return}
if(a=='wgrm'&&A&&!g.st){g.pl=g.pl.filter(n=>n!=d.p);g.ord=g.ord.filter(n=>n!=d.p);return}
if((a=='wgup'||a=='wgdn')&&A&&!g.st){const i=+d.i,j=a=='wgup'?i-1:i+1;if(g.ord[j])[g.ord[i],g.ord[j]]=[g.ord[j],g.ord[i]];return}
if(a=='wgsh'&&A&&!g.st){g.ord=[...g.ord].sort(()=>Math.random()-.5);return}
if(a=='wgstart'&&A&&!g.st){if(g.pl.length<2)return alert('Нужно минимум 2 участника');if(wgPool(g).length<=g.k)return alert('Дисциплин должно быть больше, чем гонок, которые останутся');g.st=1;g.rm=[];g.rc={};return}
if(a=='wgpick'){const c=wgTurn(g),k=+d.k;if(c&&(me==c||A)&&wgPool(g).includes(k)){g.ex=g.ex||[];g.ex.push(k);(g.rm=g.rm||[]).push({d:k,by:c})}return}
if(a=='wgundo'&&A){const r=(g.rm||[]).pop();if(r)g.ex=g.ex.filter(x=>x!=r.d);return}
if(a=='wgreset'&&A){g.ex=(g.ex||[]).filter(x=>!(g.rm||[]).some(r=>r.d==x));g.rm=[];g.st=0;g.rc={};return}
if(a=='wgcar'&&me&&g.pl.includes(me)){const i=document.getElementById('wgc_'+g.id),v=i?i.value.trim():'';if(!CARS.some(c=>c[1]+' '+c[2]==v))return alert('Выберите машину из списка подсказок');g.cr=g.cr||{};(g.cr[me]=g.cr[me]||[]).push(v);if(i)i.value='';return}
if(a=='wgcrm'&&me&&g.cr&&g.cr[me]){g.cr[me].splice(+d.i,1);return}
if(a=='wgrop'&&me&&g.pl.includes(me)){cwS={g:g.id,pend:(cwS&&cwS.g==g.id&&cwS.pend)||null};cwStep();return}
if(a=='wgryes'&&cwS&&cwS.pend&&me){const k=cwS.pend.car[1]+' '+cwS.pend.car[2];g.cr=g.cr||{};const L=g.cr[me]=g.cr[me]||[];if(!L.includes(k))L.push(k);cwS.pend=null;cwStep();return}
if(a=='wgrno'&&cwS&&cwS.pend){cwS.pend=null;cwStep()}}
/* рулетка машин */
const TIERS=[['l','Легендарная',5,'#ff9f1a'],['x','Особенная',10,'#ff4dd8'],['e','Эпическая',20,'#c084fc'],['r','Редкая',30,'#38bdf8'],['c','Обычная',35,'#4ade80']],
tierOf=c=>({l:'l',e:'e',r:'r',c:'c',f:'x',t:'x',b:'x'})[c[8]]||null;
function cwPick(g){const have=new Set((g.cr&&g.cr[me])||[]),by={};CARS.forEach(c=>{const t=tierOf(c);if(t&&!have.has(c[1]+' '+c[2]))(by[t]=by[t]||[]).push(c)});
const av=TIERS.filter(t=>by[t[0]]);if(!av.length)return null;const sum=av.reduce((s,t)=>s+t[2],0),items=[];
av.forEach(t=>{const L=by[t[0]],a=360*t[2]/sum/L.length;L.forEach(c=>items.push({c,t:t[0],a}))});
for(let i=items.length-1;i>0;i--){const j=rnd(i+1);[items[i],items[j]]=[items[j],items[i]]}
let s=0;items.forEach(it=>{it.a0=s;s+=it.a});const x=Math.random()*360,it=items.find(i=>x>=i.a0&&x<i.a0+i.a)||items[items.length-1];
return{t:it.t,car:it.c,items,ang:it.a0+it.a*(.2+Math.random()*.6)}}
function cwEl(h){let o=document.getElementById('cw');if(!o){document.body.insertAdjacentHTML('beforeend','<div id="cw"></div>');o=document.getElementById('cw')}o.innerHTML=`<button class="btn cwx" data-a="wgrx" title="Закрыть (результаты сохраняются)">✕</button><div class="cwb">${h}</div>`}
function cwStrip(items){const col={};TIERS.forEach(t=>col[t[0]]=t[3]);const rounds=7,all=[];
for(let r=0;r<rounds;r++)items.forEach((it,i)=>all.push(`<div class="cwcard" data-ci="${i}" style="--tc:${col[it.t]}"><span>${TIERS.find(t=>t[0]==it.t)[1]}</span><b>${it.c[1]} ${e(it.c[2])}</b><small>${it.c[5]} ${it.c[4]} · ${e(it.c[3])}</small></div>`));
return`<div class="cwline"><div class="cwp">▼</div><div class="cwtrack"><div id="cwg" class="cwstrip">${all.join('')}</div></div></div>`}
function cwStep(){const g=(S.wg||{})[cwS&&cwS.g];if(!g||!me)return;const n=((g.cr||{})[me]||[]).length;
if(n>=g.k){cwEl(`<h2 style="margin-top:0">Готово!</h2><div class="big">${n}/${g.k}</div><div class="mut" style="margin:6px 0 12px">Все машины собраны</div><button class="btn pri" data-a="wgrx">Закрыть</button>`);return}
if(cwS.pend){cwRes(g,n);return}
const p=cwPick(g);if(!p){cwEl('<div class="mut">В рулетке не осталось машин.</div>');return}
cwS.pend=p;const pick=p.items.findIndex(x=>x.c===p.car&&x.t===p.t);
cwEl(`<div class="mut">Машина ${n+1} из ${g.k}</div>${cwStrip(p.items)}<div id="cwnow" class="cwnow"><div class="cwn0">Рулетка разгоняется…</div></div><div class="mut" style="font-size:12px">${TIERS.map(t=>`<span style="color:${t[3]}">${t[1]} ${t[2]}%</span>`).join(' · ')}</div>`);
const w=document.getElementById('cwg'),track=w&&w.parentElement;if(!w||!track)return;
const card=w.querySelector('.cwcard'),gap=parseFloat(getComputedStyle(w).gap)||10,stride=(card?card.getBoundingClientRect().width:174)+gap;
/* Победитель выбирается случайно в cwPick(). Быстрый этап скрывает большую часть ленты,
   затем последние пять карточек проходят под стрелкой почти по одной в секунду. */
const target=p.items.length*4+pick,end=target*stride-(track.clientWidth/2-stride/2);
const FAST=1500,SLOW=6000,slowDistance=Math.min(end,5*stride),fastDistance=Math.max(0,end-slowDistance),TOTAL=FAST+SLOW;
w.style.transition='none';w.style.transform='translate3d(0,0,0)';
const box=document.getElementById('cwnow'),col={};TIERS.forEach(t=>col[t[0]]=t[3]);let last=-1,slowShown=false;
const show=x=>{const i=((Math.round((track.clientWidth/2-x-stride/2)/stride)%p.items.length)+p.items.length)%p.items.length;if(i!==last){last=i;const it=p.items[i],title=it.c[1]+' '+it.c[2];if(box){box.style.setProperty('--tc',col[it.t]);box.innerHTML=`<div class="cwn0">${e(title)}</div>`}}};
const t0=performance.now();
const frame=now=>{const strip=document.getElementById('cwg');if(!strip||!strip.isConnected||!cwS||cwS.pend!==p)return;const elapsed=now-t0;let x;
if(elapsed<FAST){const t=elapsed/FAST;x=fastDistance*(t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2)}
else if(elapsed<TOTAL){const t=(elapsed-FAST)/SLOW;/* скорость плавно падает: первая карточка ~0,9 с, последняя ~1,2 с */const eased=t+.16*t*(1-t);x=fastDistance+slowDistance*eased;if(!slowShown){slowShown=true;if(box)box.innerHTML='<div class="cwn0">Медленный выбор…</div>'}}
else{x=end;strip.style.transform=`translate3d(${-x}px,0,0)`;show(x);return}
strip.style.transform=`translate3d(${-x}px,0,0)`;show(x);requestAnimationFrame(frame)};
requestAnimationFrame(frame);clearTimeout(cwT);cwT=setTimeout(()=>{if(document.getElementById('cw')&&cwS&&cwS.pend===p)cwRes(g,n)},TOTAL+220)}
function cwRes(g,n){const p=cwS.pend,c=p.car,T=TIERS.find(t=>t[0]==p.t);
cwEl(`<div class="mut">Машина ${n+1} из ${g.k}</div><div class="chip" style="color:${T[3]};border-color:${T[3]};margin:8px 0">${T[1]}</div><div class="big" style="margin:6px 0">${c[1]} ${e(c[2])}</div><div><span class="cl cl-${c[5]}">${c[5]}</span> <b class="pi">${c[4]}</b> <span class="mut">· ${c[7]||'—'} · ${e(c[3])}</span></div><div style="margin:8px 0">${c[9]?`<span class="pr pr-${c[8]}">${priceF(c[9])} CR</span>`:''}</div><div class="cwbt"><button class="btn cwno" data-a="wgrno" data-g="${g.id}">Нет такой машины в гараже</button><button class="btn pri" data-a="wgryes" data-g="${g.id}">Есть машина в гараже</button></div>`)}
const wgActive=()=>wgList().find(g=>me&&g.st&&g.k&&g.pl.includes(me)&&((g.cr||{})[me]||[]).length<g.k),
wgFab=()=>{const g=view=='wof'&&wgActive();return g?`<button class="btn wfab" data-a="wgrop" data-g="${g.id}" title="Рулетка машин"><span>🎡</span><b>${((g.cr||{})[me]||[]).length}/${g.k}</b></button>`:''};
/* интерфейс */
function wgWheel(g,H){const t=wgTurn(g),A=adm(),pool=wgPool(g),can=i=>t&&(me==t||A)&&pool.includes(i),pt=(a,r)=>[(r*Math.sin(a*Math.PI/180)).toFixed(1),(-r*Math.cos(a*Math.PI/180)).toFixed(1)];let base='',top='',bl='';
for(let i=1;i<=16;i++){const a0=(i-1)*22.5,a1=i*22.5,[x0,y0]=pt(a0,150),[x1,y1]=pt(a1,150),[u0,v0]=pt(a0,50),[u1,v1]=pt(a1,50),[tx,ty]=pt(a0+11.25,106),out=!pool.includes(i),gr=H&&H.green.has(i),ye=H&&H.yellow.has(i);
const ck=can(i)?` data-a="wgpick" data-g="${g.id}" data-k="${i}" style="cursor:pointer"`:'';
const el=`<g${ck}><path d="M${u0} ${v0}L${x0} ${y0}A150 150 0 0 1 ${x1} ${y1}L${u1} ${v1}A50 50 0 0 0 ${u0} ${v0}Z" fill="${out?'#171a24':DGC[DGI(i)]}" fill-opacity="${out?.9:.85}" stroke="${gr?'#46ffa8':ye?'#ffd25a':'#07080b'}" stroke-width="${gr||ye?5:1.5}"><title>${i}. ${e(DISC[i][0])}</title></path><text x="${tx}" y="${+ty-2}" text-anchor="middle" font-size="19">${out?'✕':DEM[i]}</text><text x="${tx}" y="${+ty+15}" text-anchor="middle" font-size="12" font-weight="800" fill="${out?'#555b70':'#07080b'}">${i}</text></g>`;
if(gr||ye)top+=el;else base+=el}
for(let k=0;k<32;k++){const[x,y]=pt(k*11.25,163);bl+=`<circle class="bl" cx="${x}" cy="${y}" r="3.2" fill="#ffd25a"/>`}
const nm=t?(t.length>9?t.slice(0,8)+'…':t):'✓';
return`<svg viewBox="-176 -176 352 352" style="width:min(100%,440px);height:auto;display:block;margin:0 auto"><circle r="170" fill="#12141b" stroke="#7c5cff" stroke-width="3"/><circle r="156" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-dasharray="8 7"/>${bl}${base}${top}<circle r="48" fill="#0c0e14" stroke="#7c5cff" stroke-width="3"/><text y="-14" text-anchor="middle" font-size="9" fill="#8a90a3">${t?'ХОД':'ГОТОВО'}</text><text y="4" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">${e(nm)}</text><text y="21" text-anchor="middle" font-size="11" fill="#19e3c3">${pool.length} → ${g.k}</text></svg>`}
function wgSetup(g){const A=adm(),id=g.id,ex=g.ex||[];let b=`<h2 style="margin-top:12px">Участники</h2><div class="row">${g.pl.map(n=>`<span class="chip">${e(n)}${A?`<button class="btn" data-a="wgrm" data-g="${id}" data-p="${e(n)}" style="padding:0 6px;margin-left:6px">✕</button>`:''}</span>`).join('')||'<span class="mut">пока никого</span>'}</div>`;
if(!A)return b+'<p class="mut">Драфт ещё не начат. Админ выберет порядок, дисциплины и количество гонок.</p>';
const sp=S.players.map(p=>p.n).filter(n=>!g.pl.includes(n));
return b+`<div class="row" style="margin-top:8px"><input id="wgp_${id}" placeholder="Имя участника" class="sp"><button class="btn" data-a="wgadd" data-g="${id}">Добавить</button>${sp.map(n=>`<button class="btn" data-a="wgadd" data-g="${id}" data-p="${e(n)}">+ ${e(n)}</button>`).join('')}</div>
<h2>Порядок драфта</h2>${g.ord.map((n,i)=>`<div class="row"><b class="sp">${i+1}. ${e(n)}</b><button class="btn" data-a="wgup" data-g="${id}" data-i="${i}">▲</button><button class="btn" data-a="wgdn" data-g="${id}" data-i="${i}">▼</button></div>`).join('')}<div class="row" style="margin-top:8px"><label><input type="checkbox" data-wgs="${id}" style="width:18px;height:18px;padding:0" ${g.sn?'checked':''}> Змейка</label><button class="btn" data-a="wgsh" data-g="${id}">Перемешать</button></div>
<h2>Сколько гонок должно остаться</h2><div class="row"><input data-wgk="${id}" type="number" min="1" max="16" value="${g.k}" style="width:90px"><span class="mut sp" style="min-width:240px">Игроки по очереди убирают дисциплины, пока не останется столько. Столько же машин каждый соберёт в рулетке.</span></div>
<h2>Дисциплины (сними галочку, чтобы убрать с самого начала)</h2>${DG.map((gn,gi)=>`<div class="mut" style="margin:10px 0 2px">${gn}</div>`+DISC.map((d,i)=>i&&DGI(i)==gi?`<label class="lane"><input type="checkbox" data-wgx="${id}|${i}" ${ex.includes(i)?'':'checked'} style="width:18px;height:18px;padding:0"><b>${i}. ${e(d[0])}</b><span class="mut sp" style="font-size:12px;min-width:220px">${e(d[1])}</span></label>`:'').join('')).join('')}<button class="btn pri" data-a="wgstart" data-g="${id}" style="margin-top:12px">Начать драфт</button>`}
function wgDraft(g){const A=adm(),id=g.id,ph=wgPhase(g),t=wgTurn(g),pool=wgPool(g),H=null,mine=me&&g.pl.includes(me),rm={};(g.rm||[]).forEach(r=>rm[r.d]=r.by);
let adv='';
const side=`<div class="card"><div class="row"><span class="sp">${ph==2?`<b class="ok">Драфт завершён — осталось ${pool.length} гонок</b>`:`${me==t?'<b class="ok">Твой ход!</b> ':''}Ход: <b class="ok">${e(t)}</b><br><span class="mut">убрать ещё ${pool.length-g.k} · порядок: ${g.ord.map(e).join(' → ')}${g.sn?' (змейка)':''}</span>`}</span></div>${adv?`<div style="margin-top:8px">${adv}</div>`:''}${A?`<div class="row" style="margin-top:8px"><button class="btn" data-a="wgundo" data-g="${id}">↶ Отменить</button><button class="btn" data-a="wgreset" data-g="${id}">Сбросить драфт</button></div>`:''}</div>`;
const cards=DISC.map((d,i)=>{if(!i)return'';const out=!pool.includes(i),cls=(H&&H.green.has(i)?' hg':H&&H.yellow.has(i)?' hy':''),can=!out&&t&&(me==t||A);return`<div class="card tm${out?' x':''}${cls}" ${can?`data-a="wgpick" data-g="${id}" data-k="${i}"`:''}><b>${DEM[i]} ${i}. ${e(d[0])}</b>${out?`<div class="mut" style="font-size:12px">${rm[i]?'убрал: '+e(rm[i]):'убрано'}</div>`:`<div class="mut" style="font-size:12px">${e(d[1])}</div>${H&&H.sc[i]!==undefined?`<div style="font-size:12px;margin-top:3px">${e(H.bc[i][2])} · <b>${H.sc[i]}</b></div>`:''}`}</div>`}).join('');
return`<div class="wgi" style="margin-top:10px">${side}</div><div class="grid" style="margin-top:6px">${cards}</div>`}
function wgRaces(g){const id=g.id,P=g.pl,TT=wgTotals(g),ord=[...P].sort((a,b)=>TT.tot[b]-TT.tot[a]);
let dl='';P.forEach((p,pi)=>{if(me==p)dl+=`<datalist id="wgl_${id}_${pi}">${wgMy(g).map(c=>`<option value="${e(c[1]+' '+c[2])}">`).join('')}</datalist>`});
let h=`${dl}<h2>Итоги игры</h2><div class="card tbl"><table><tr><th>Игрок</th>${TT.cols.map(([d])=>`<th style="white-space:normal;min-width:84px;max-width:130px">${e(DISC[d][0])}</th>`).join('')}<th>Σ</th></tr>${ord.map(p=>`<tr><td>${e(p)}</td>${TT.cols.map(([d,r])=>`<td>${r.done&&r.res[p]&&r.res[p].pts!=null?r.res[p].pts:'—'}</td>`).join('')}<td><b class="ok">${TT.tot[p]}</b></td></tr>`).join('')}</table><p class="mut" style="font-size:12px">Очки: последнее место — 1, каждое следующее на 1 больше, не финишировал — 0.</p></div><h2>Гонки</h2>`;
return h+TT.cols.map(([d])=>wgRaceCard(g,d)).join('')}
function wgRaceCard(g,d){const id=g.id,A=adm(),P=g.pl,t=WT[d],r=((g.rc||{})[d])||{},head=`<div class="row"><b class="sp">${DEM[d]} ${d}. ${e(DISC[d][0])}</b><span class="chip">${WTL[t]}</span></div><div class="mut" style="font-size:12px;margin-bottom:6px">${e(DISC[d][1])}</div>`;
const carIn=(p,pi)=>`<input data-wr="${id}|${d}|${pi}|c" list="${me==p?'wgl_'+id+'_'+pi:'carl'}" placeholder="Машина" value="${e((r.c||{})[p]||'')}" ${me==p||A?'':'disabled'} style="width:220px">`;
if(t=='toge'){const T=wgToge(g),m7=r.m||{};
return`<div class="card">${head}${P.map((p,pi)=>`<div class="lane"><b style="min-width:90px">${e(p)}</b>${carIn(p,pi)}<span class="mut" style="font-size:12px">одна машина на весь Тогэ</span></div>`).join('')}<h2 style="margin:12px 0 4px">Календарь</h2>${T.M.map(([a,b],i)=>{const m=m7[i]||{};return`<div class="lane"><span style="min-width:200px"><b>${e(a)}</b> <span class="mut" style="font-size:12px">${e((r.c||{})[a]||'—')}</span> <span class="mut">vs</span> <b>${e(b)}</b> <span class="mut" style="font-size:12px">${e((r.c||{})[b]||'—')}</span></span><input data-wm="${id}|${i}|a" placeholder="${e(a)}: м:сс,ммм / НФ" value="${e(m.a||'')}" ${me==a||A?'':'disabled'} style="width:150px"><input data-wm="${id}|${i}|b" placeholder="${e(b)}: м:сс,ммм / НФ" value="${e(m.b||'')}" ${me==b||A?'':'disabled'} style="width:150px"></div>`}).join('')}<h2 style="margin:12px 0 4px">Таблица Тогэ</h2><div class="tbl"><table><tr><th>#</th><th>Игрок</th><th>Машина</th><th>Очки</th><th>Лучшее время</th><th>В зачёт</th></tr>${T.order.map(p=>{const x=T.res[p];return`<tr><td>${x.place}</td><td>${e(p)}</td><td>${e((r.c||{})[p]||'—')}</td><td>${x.tp}</td><td>${x.best===Infinity?'—':(x.best/1000).toFixed(3)+' с'}</td><td><b class="${x.pts!=null?'ok':'mut'}">${x.pts!=null?'+'+x.pts:'—'}</b></td></tr>`}).join('')}</table></div><p class="mut" style="font-size:12px">В каждом заезде: 2 очка — первое место, 1 — второе, 0 — не финишировал. При равенстве очков решает лучшее время за весь Тогэ.</p></div>`}
const R=wgRank(g,d),wl=WL[d];
return`<div class="card">${head}${P.map((p,pi)=>{const can=me==p||A,x=R.res[p];let v;
if(t=='rank')v=`<select data-wr="${id}|${d}|${pi}|pl" ${A?'':'disabled'}><option value="">место</option>${P.map((_,k)=>`<option ${(r.pl||{})[p]==k+1?'selected':''}>${k+1}</option>`).join('')}</select>`;
else if(t=='sum')v=`<input data-wr="${id}|${d}|${pi}|v" placeholder="${wl[0]}" value="${e((r.v||{})[p]||'')}" ${can?'':'disabled'} style="width:120px"><input data-wr="${id}|${d}|${pi}|v2" placeholder="${wl[1]}" value="${e((r.v2||{})[p]||'')}" ${can?'':'disabled'} style="width:120px">`;
else v=`<input data-wr="${id}|${d}|${pi}|v" placeholder="${t=='time'?'м:сс,ммм или НФ':t=='rev'?'м:сс,ммм или сек':'очки'}" value="${e((r.v||{})[p]||'')}" ${can?'':'disabled'} style="width:150px">`;
return`<div class="lane"><b style="min-width:90px">${e(p)}</b>${carIn(p,pi)}${v}<span class="sp"></span>${x.place?`<span class="mut">#${x.place}</span>`:''}<b class="${x.pts!=null?'ok':'mut'}" style="width:48px;text-align:right">${x.pts!=null?'+'+x.pts:'—'}</b></div>`}).join('')}${t=='rank'?'<div class="mut" style="font-size:12px;margin-top:4px">Места распределяет админ — не финишировать нельзя.</div>':''}</div>`}
function wgCars(g){const my=wgMy(g),all=(g.cr||{})[me]||[],done=wgPool(g).length,pool=wgPool(g),ph=wgPhase(g);
return`<h2>Мои машины <span style="text-transform:none;letter-spacing:0">· видите только вы</span> <span class="chip">${all.length}${g.st?'/'+g.k:''}</span></h2><div class="card"><div class="row"><input id="wgc_${g.id}" list="carl" placeholder="Добавить выпавшую машину вручную…" class="sp"><button class="btn" data-a="wgcar" data-g="${g.id}">Добавить</button></div>${all.map((n,i)=>{const c=CARS.find(c=>c[1]+' '+c[2]==n);return`<div class="lane" style="align-items:flex-start"><div class="sp hv" tabindex="0"><b>${e(n)}</b>${c?`<span class="cl cl-${c[5]}" style="margin-left:8px">${c[5]}</span> <b class="pi">${c[4]}</b> <span class="mut">${c[7]||''}</span> ${c[9]?`<span class="pr pr-${c[8]}">${priceF(c[9])}</span>`:''}<div class="hvp"><span class="mut">Подходит для:</span> ${bestD(c).map(([d,s])=>`<span class="chip" style="${g.st&&!pool.includes(d)?'opacity:.35;text-decoration:line-through':''}">${DEM[d]} ${e(DISC[d][0])} · ${s}</span>`).join(' ')}</div>`:''}</div><button class="btn" data-a="wgcrm" data-g="${g.id}" data-i="${i}">✕</button></div>`}).join('')||'<div class="mut" style="margin-top:8px">Пока пусто. Крути рулетку 🎡 справа.</div>'}${all.length?`<div class="mut" style="font-size:12px;margin-top:6px">Наведи на машину (или нажми на неё), чтобы увидеть, для каких дисциплин она подходит.${g.st?' Зачёркнутые дисциплины уже убраны из игры. Оценка — от 0 до 100.':''}</div>`:''}</div>`}
function WGAME(g,L){const A=adm(),o=wgIsOpen(g,L),ph=wgPhase(g),id=g.id,mine=me&&g.pl.includes(me),
hd=`<div class="row"><button class="btn" data-a="wgt" data-g="${id}">${o?'▾':'▸'}</button>${A&&o?`<input data-wgn="${id}" value="${e(g.n)}" class="sp" style="font-weight:700">`:`<b class="sp">${e(g.n)}</b>`}<span class="chip">${['настройка','драфт идёт','гонки'][ph]}</span><span class="mut">${g.pl.length} уч.</span>${A?`<button class="btn" data-a="wgdel" data-g="${id}">${wgDel==id?'Точно удалить?':'🗑'}</button>`:''}</div>`;
if(!o)return`<div class="card wg">${hd}</div>`;
let b=ph==0?wgSetup(g):wgDraft(g)+(ph==2?wgRaces(g):'');
if(mine)b+=wgCars(g);
return`<div class="card wg">${hd}${b}</div>`}
const WOF=()=>{const L=wgList();return`<div class="wfh"><div class="h1">Forza Horizon 6</div><div class="h2">Колесо</div><div class="h3">Фортуны</div></div>${adm()?'<div class="card row"><button class="btn pri" data-a="wgnew">➕ Новая игра</button><span class="mut">Каждая игра — отдельный драфт дисциплин. Игры можно сворачивать и удалять.</span></div>':''}${L.length?L.map(g=>WGAME(g,L)).join(''):`<div class="card mut">Игр пока нет.${adm()?'':' Админ создаст новую игру.'}</div>`}`};
function alt(A){let b='';
if(view=='home')b=`<h2>Чемпионаты</h2><div class="card" data-a="v" data-k="champ" style="cursor:pointer;padding:30px;border-color:var(--a)"><div class="big">🏆 Чемпионат 5 · Страны</div><div class="mut">Nations Cup — драфт стран, расписание гонок, таблица</div></div><div class="grid"><div class="card" style="opacity:.5;text-align:center;padding:24px">🔒<br>Скоро</div><div class="card" style="opacity:.5;text-align:center;padding:24px">🔒<br>Скоро</div></div>`;
if(view=='home')b=HOME();
if(view=='cars')b=carsView();
if(view=='tachki')b=TACHKI2();
if(view=='wof')b=WOF();
if(view=='me')b=(stats()||'<h2>Личная статистика</h2><div class="card mut">Пока нет результатов.</div>')+'<div class="card mut">Статистика по машинам и маркам появится после загрузки списка машин и подключения общей базы.</div>';
const hd=view=='tachki'?`<header><div class="fh6"><div class="st"><div class="fz">Forza</div><div class="hz">Horizon</div></div><div class="n6">6</div></div><img class="tkl" src="img/tachki/cars-logo.png" alt="Тачки"><div class="sp"></div><button class="btn" data-a="out">Выйти</button></header>`:`<header><div class="sp"></div><button class="btn" data-a="out">Выйти</button></header>`;
A.innerHTML=nav()+hd+b+wgFab()}
