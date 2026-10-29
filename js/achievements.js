/* Достижения: выводятся из текущих данных проекта; никаких новых обязательных полей. */
(function(){
const ACH=[
{id:'first_win',n:'Ka-chow!',d:'Одержать первую победу в гонке.',r:'common',ico:'🏁'},
{id:'streak',n:'Серия побед',d:'Победить подряд в 3, 5 и 10 гонках.',r:'common',th:[3,5,10],ico:'🔥',names:['Боже, его не остановить','Боже, его не остановить','Я — Макс Ферстаппен']},
{id:'champion',n:'В чём счастье, брат?',d:'Занять первое место по итоговым очкам завершённого турнира.',r:'rare',ico:'🏆'},
{id:'hattrick',n:'Опять он?!',d:'Трижды стать чемпионом турнира.',r:'legendary',th:[3],ico:'👑'},
{id:'sniper',n:'Саша, ты Ювелир!',d:'Победить с отрывом менее 1 секунды.',r:'rare',ico:'🎯'},
{id:'crush',n:'Пока вы там чай пили',d:'Победить с отрывом более 30 секунд.',r:'rare',ico:'💨'},
{id:'comeback',n:'Чёрт, это Брайан!',d:'Победить в гонке сразу после Н/Ф.',r:'common',ico:'↩️'},
{id:'eternal_second',n:'Первый среди проигравших',d:'Занять второе место 5 раз, не одержав ни одной победы.',r:'common',th:[5],ico:'🥈'},
{id:'photofinish',n:'Повтор будет!?',d:'Финишировать с разницей менее 0,1 секунды с соперником.',r:'legendary',ico:'⚡'},
{id:'iron',n:'Неубиваемый',d:'Провести 30 гонок подряд без Н/Ф.',r:'legendary',th:[30],ico:'🛡️'},
{id:'tank',n:'Семья одобряет',d:'Финишировать во всех гонках турнира (не менее 5 гонок).',r:'rare',ico:'✅'},
{id:'marathon',n:'Дальнобойщик',d:'Проехать за турнир 100, 250 и 500 км.',r:'rare',th:[100,250,500],ico:'🛣️'},
{id:'world',n:'Объехал планету (почти)',d:'Проехать 1000 км в завершённых заездах.',r:'legendary',th:[1000],ico:'🌍'},
{id:'drifter',n:'Дрифтер',d:'Набрать 5 000 000 очков дрифта в сумме.',r:'rare',th:[5000000],ico:'🌀'},
{id:'drift_king',n:'Король дрифта',d:'Набрать 10 000 000 очков дрифта в сумме.',r:'legendary',th:[10000000],ico:'👑'},
{id:'universal',n:'Швец, жнец и гонщик',d:'Побеждать в шоссе, грунте, автокроссе, улице и тогэ.',r:'rare',th:[5],ico:'🧭'},
{id:'seasons',n:'Сезонный доминатор',d:'Победить весной, зимой, летом и осенью.',r:'rare',th:[4],ico:'🌦️'},
{id:'classic',n:'Путь самурая',d:'Победить в классах D, C, B, A, S1 и S2.',r:'legendary',th:[6],ico:'⚔️'},
{id:'garage',n:'Ты это всё припарковал?',d:'Использовать в гонках 5, 15 и 30 разных машин.',r:'rare',th:[5,15,30],ico:'🚘'},
{id:'brand_fan',n:'Брат за бренд',d:'Провести 5 гонок на машинах одной марки.',r:'common',th:[5],ico:'🏭'},
{id:'brand_collector',n:'Я всё ещё не определился',d:'Собрать 10 разных марок машин в заездах.',r:'rare',th:[10],ico:'🧰'},
{id:'patriot',n:'Ще не вмерла',d:'Одержать 5 побед на машинах одной страны.',r:'common',th:[5],ico:'🇺🇦'},
{id:'wheel_pick',n:'Удача на колёсах',d:'Получить машину в «Колесе Фортуны».',r:'common',ico:'🎡'},
{id:'tachki_win',n:'Чемпион Тачек',d:'Победить в заезде турнира «Тачки».',r:'rare',ico:'🏎️'},
{id:'tachki_points',n:'Очковый запас',d:'Набрать 100 очков в турнире «Тачки».',r:'rare',th:[100],ico:'📊'}
];
const fm=n=>(+Number(n).toFixed(1)).toLocaleString('ru-RU');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ===== История чемпионатов в достижениях ===== */
const HIST_VER='h3';
function hInfo(name){const x=((window.HISTORY_EXTRA||{}).cinfo||{})[name];if(!x||!x[0])return null;const r=[];r[0]=x[0];r[6]=x[1]||'';return r}
function hCars(e){const o=(((window.HISTORY_EXTRA||{}).cars||{})[e.ti]||{})[e.ri];return o?Object.assign({},o):{}}
/* Имя в архиве -> имя на сайте. Если Даня и Женя — один человек, раскомментируйте: {'Даня':'Женя'} */
const HIST_ALIAS={};
const hAlias=n=>HIST_ALIAS[n]||n;
const hClean=s=>String(s==null?'':s).replace(/\s+/g,' ').trim();
const hTime=s=>{s=hClean(s).replace(';',':');return s?ms(s):undefined};
const hNorm=c=>hClean(c).replace(/[\[\]]/g,'').replace(/\u0421/g,'C').replace(/\u0410/g,'A').replace(/\u0412/g,'B');
/* Время Влада в последней гонке чемпионата 3, если в данных истории оно ещё пустое */
const HIST_FIX=[{ti:2,theme:'Электромобили',player:'Влад',time:'4:00,000'}];
let hCache=null;
function hParse(){const D=window.HISTORY_DATA;if(!Array.isArray(D))return[];if(hCache&&hCache.src===D)return hCache.list;const list=[];
D.forEach((h,ti)=>{const sec=h&&h.sections&&h.sections[0];if(!sec)return;const hd=sec.headers.map(hClean),tcols=[];
hd.forEach((t,i)=>{const m=t.match(/^Время (.+)$/);if(m)tcols.push([i,hAlias(m[1])])});
const iC=hd.indexOf('Кл.'),iT=hd.indexOf('Тип Гонки'),iS=hd.indexOf('Сезон'),iG=hd.indexOf('Гонка'),iTh=hd.indexOf('Тема'),types={},sch=h.sections[1],si=sch?sch.headers.map(hClean).indexOf('Тип Гонки'):-1;
if(iTh>=0&&sch&&si>=0)sch.rows.forEach(r=>{types[hClean(r[1])]=hClean(r[si])});
sec.rows.forEach((row,ri)=>{const t={};tcols.forEach(([i,n])=>{let raw=row[i];HIST_FIX.forEach(f=>{if(f.ti===ti&&iTh>=0&&hClean(row[iTh])===f.theme&&hAlias(f.player)===n&&!hClean(raw))raw=f.time});const v=hTime(raw);if(v!==undefined)t[n]=v});
const type=iT>=0?hClean(row[iT]):(iG>=0&&ti===1?hClean(row[iG]):(iTh>=0?(types[hClean(row[iTh])]||''):''));
if(Object.keys(t).length<2||/дрифт/i.test(type))return;
const cls=hNorm(iC>=0?row[iC]:(iG>=0?hClean(row[iG]).split(' ')[0]:'')),season=iS>=0?hClean(row[iS]).replace(/\(.*\)/,''):'';
const EXx=window.HISTORY_EXTRA||{};list.push({ti,ri,t,type,cls,season,ord:((EXx.ord||{})[ti]||{})[ri]!=null?EXx.ord[ti][ri]:ri,km:((EXx.km||{})[ti]||{})[ri]||0})})});list.sort((a,b)=>a.ti-b.ti||a.ord-b.ord);
hCache={src:D,list};return list}
/* Порядок гонок 2-го чемпионата в таблице не совпадает с расписанием, поэтому он не участвует в «подряд» */
function histRaces(p){return hParse().filter(e=>p in e.t).map(e=>{const t=e.t,fin=Object.keys(t).filter(n=>t[n]!==null).sort((a,b)=>t[a]-t[b]);return{r:{d:e.type,c:e.cls,s:e.season,cars:hCars(e)},t,z:null,fin,win:fin[0]===p,dnf:t[p]===null,km:t[p]===null?0:e.km,hist:true,grp:'h'+e.ti}})}
function histTitles(p){const D=window.HISTORY_DATA;if(!Array.isArray(D))return 0;return D.reduce((n,h)=>n+((h&&h.standings&&h.standings[0]&&hAlias(h.standings[0][0])===p)?1:0),0)}
function tankOk(rs){const g={};rs.forEach(x=>{const k=x.grp||'cur';(g[k]=g[k]||[]).push(x)});return Object.values(g).some(a=>a.length>=5&&a.every(x=>!x.dnf))}
function calc(p){let races=[];try{(S.races||[]).forEach(r=>{if(!r.lanes||!(p in r.lanes))return;let z=pts(r);if(!z)return;let t={};Object.keys(r.lanes).forEach(n=>t[n]=ms(r.times[n]));let fin=Object.keys(t).filter(n=>t[n]!==null).sort((a,b)=>t[a]-t[b]);races.push({r,t,z,fin,win:fin[0]===p,dnf:t[p]===null,km:t[p]===null?0:+r.km||0})})}catch(_){}
races=histRaces(p).concat(races);let drift=0;(((window.HISTORY_EXTRA||{}).drift)||[]).forEach(d=>{drift+=+((d.pts||{})[p])||0});const histT=histTitles(p);const wins=races.filter(x=>x.win),seconds=races.filter(x=>!x.dnf&&!x.win&&x.fin[1]===p),longest=()=>{let n=0,m=0;for(const x of races){if(x.unord){n=0;continue}n=x.win?n+1:0;m=Math.max(m,n)}return m};
let cmps=[];if(races.some(x=>!x.hist)&&(S.races||[]).length&&S.races.every(r=>{try{return !!pts(r)}catch(_){return false}})){const sums={};S.players.forEach(x=>sums[x.n]=0);S.races.forEach(r=>{let z=pts(r);Object.keys(z||{}).forEach(n=>sums[n]=(sums[n]||0)+z[n])});let max=Math.max(...Object.values(sums));if((sums[p]||0)===max)cmps.push(1)}
let cars=[],carNames=[],marks={},countries={},bySeason=new Set(),byClass=new Set(),byType=new Set(),winsByMark={},wheel=[];
function carInfo(name){if(!name)return null;let c=CARS.find(c=>(c[1]+' '+c[2]).toLowerCase()===String(name).trim().toLowerCase());return c||hInfo(name)}
races.forEach(x=>{let name=(x.r.cars||{})[p];if(name){carNames.push(name);let c=carInfo(name);if(c){marks[c[0]]=(marks[c[0]]||0)+1;countries[c[6]]=(countries[c[6]]||0);if(x.win&&c[6])winsByMark[c[6]]=(winsByMark[c[6]]||0)+1}}if(x.win){let d=x.r.d||'';byType.add(/шоссе/i.test(d)?'Шоссе':/грунт/i.test(d)?'Грунт':/автокросс/i.test(d)?'Автокросс':/улиц/i.test(d)?'Улица':/тогэ/i.test(d)?'Тогэ':'');if(x.r.s)bySeason.add(String(x.r.s).toLowerCase());if(x.r.c)byClass.add(x.r.c)} });
try{(TK().races||[]).forEach(r=>{let name=(r.c||{})[p];if(name){carNames.push(name);let c=carInfo(name);if(c)marks[c[0]]=(marks[c[0]]||0)+1}})}catch(_){}
try{Object.values(S.wg||{}).forEach(g=>{(g.cr&&g.cr[p]||[]).forEach(name=>{wheel.push(name);carNames.push(name);let c=carInfo(name);if(c)marks[c[0]]=(marks[c[0]]||0)+1})})}catch(_){}
let km=races.reduce((a,x)=>a+x.km,0),maxStreak=longest(),iron=0,seq=0;for(const x of races){if(x.unord){seq=0;continue}seq=x.dnf?0:seq+1;iron=Math.max(iron,seq)}
let secondNoWin=wins.length===0?seconds.length:0, close=races.some(x=>x.fin.some(n=>n!==p&&x.t[n]!==null&&Math.abs(x.t[n]-x.t[p])<100));let prev=false,comeback=false;races.forEach(x=>{if(x.unord){prev=false;return}if(x.win&&prev)comeback=true;prev=x.dnf});
let types=['Шоссе','Грунт','Автокросс','Улица','Тогэ'].filter(x=>byType.has(x)).length,seas=['весна','зима','лето','осень'].filter(x=>[...bySeason].some(y=>y.includes(x))).length,classes=['D','C','B','A','S1','S2'].filter(x=>byClass.has(x)).length;
let allCarNames=[...new Set(carNames)],brands=Object.keys(marks).length,brandMax=Math.max(0,...Object.values(marks)),countryMax=Math.max(0,...Object.values(winsByMark));
let tkWins=0,tkPts=0;try{(TK().races||[]).forEach(r=>{let t=ms((r.tm||{})[p]);let all=Object.keys(r.tm||{}).map(n=>[n,ms(r.tm[n])]).filter(x=>x[1]!==undefined&&x[1]!==null).sort((a,b)=>a[1]-b[1]);if(all.length&&all[0][0]===p)tkWins++;tkPts+=+(r.p||{})[p]||0})}catch(_){}
let wheelCount=wheel.length;return {first_win:wins.length?1:0,streak:maxStreak,champion:cmps.length+histT,hattrick:cmps.length+histT,sniper:wins.some(x=>x.fin[1]&&x.t[x.fin[1]]-x.t[p]<1000)?1:0,crush:wins.some(x=>x.fin[1]&&x.t[x.fin[1]]-x.t[p]>30000)?1:0,comeback:comeback?1:0,eternal_second:secondNoWin,photofinish:close?1:0,iron,tank:tankOk(races)?1:0,marathon:km,world:km,universal:types,seasons:seas,classic:classes,garage:allCarNames.length,brand_fan:brandMax,brand_collector:brands,patriot:countryMax,wheel_pick:wheelCount,tachki_win:tkWins,tachki_points:tkPts,drifter:drift,drift_king:drift};}
const tiered=a=>!!(a.th&&a.th.length>1);
function levels(val,a){const ts=a.th||[];if(!ts.length)return val?1:0;return ts.reduce((n,t)=>n+(val>=t?1:0),0)}
let toastQ=[],toastBusy=false;
function process(){if(!S||!S.players)return;const hv=Array.isArray(window.HISTORY_DATA);if(!hv&&document.readyState!=='complete')return;let changed=!S.ach;S.ach=S.ach||{};let newOnes=[],seen={};try{seen=JSON.parse(localStorage.getItem('ach_seen')||'{}')}catch(_){}
S.players.forEach(pl=>{let p=pl.n,hadEntry=!!S.ach[p],old=S.ach[p]||{},vals=calc(p),entry={...old,lv:{...(old.lv||{})},at:{...(old.at||{})},pin:Array.isArray(old.pin)?old.pin.slice(0,3):[]};
ACH.forEach(a=>{let lv=Math.min(3,levels(vals[a.id]||0,a)),prev=+(entry.lv[a.id]||0);if(lv>prev){changed=true;for(let k=prev+1;k<=lv;k++){entry.at[k]=entry.at[k]||Date.now();if(hadEntry&&(!hv||old.hv===HIST_VER)&&p===me)newOnes.push({p,a,k})}entry.lv[a.id]=lv}});
if(hv&&old.hv!==HIST_VER){entry.hv=HIST_VER;changed=true}if(!hadEntry)changed=true;S.ach[p]=entry});
newOnes.forEach(x=>{let key=x.p+'|'+x.a.id+'|'+x.k;if(!seen[key]){seen[key]=1;toastQ.push(x)}});
if(toastQ.length){try{localStorage.setItem('ach_seen',JSON.stringify(seen))}catch(_){}nextToast()}
if(changed)save()}
function nextToast(){if(toastBusy||!toastQ.length)return;toastBusy=true;let x=toastQ.shift(),nm=x.a.names?x.a.names[Math.min(x.k-1,2)]:x.a.n;toast(nm);setTimeout(()=>{toastBusy=false;nextToast()},4600)}
function toast(name){let box=document.getElementById('ach-toast');if(!box){box=document.createElement('div');box.id='ach-toast';document.body.appendChild(box)}box.innerHTML='<b>ДОСТИЖЕНИЕ ПОЛУЧЕНО</b><span>'+esc(name)+'</span>';box.classList.remove('show');void box.offsetWidth;box.classList.add('show');clearTimeout(window._achTimer);window._achTimer=setTimeout(()=>box.classList.remove('show'),4200)}
window.achProcess=function(){try{process()}catch(e){console.error(e)}};
function score(p){let ob=S.ach&&S.ach[p]||{},n=0;ACH.forEach(a=>{let l=+(ob.lv||{})[a.id]||0;if(tiered(a))n+=({1:10,2:25,3:60}[l]||0);else if(l)n+=({common:10,rare:25,legendary:60}[a.r]||10)});return n}
function title(n){return n>=700?'Легенда':n>=350?'Профи':n>=100?'Гонщик':'Новичок'}
function page(){let current=window.achPlayer||me||((S.players[0]||{}).n),ob=S.ach&&S.ach[current]||{lv:{},at:{},pin:[]},sc=score(current),next=sc<100?100:sc<350?350:sc<700?700:1080,prev=sc<100?0:sc<350?100:sc<700?350:700;
let sel=adm()?'<label class="ach-select">Игрок <select data-ach-player>'+S.players.map(p=>'<option '+(p.n===current?'selected':'')+'>'+esc(p.n)+'</option>').join('')+'</select></label>':'';
let allVals=calc(current),cards=ACH.map(a=>{let lv=+(ob.lv||{})[a.id]||0,val=allVals[a.id]||0,th=a.th||[1],target=th[th.length-1],pct=Math.min(100,Math.floor(val/(tiered(a)&&lv<3?th[lv]:target)*100)),owned=Object.values(S.ach||{}).filter(x=>(x.lv||{})[a.id]>0).length,dt=lv&&ob.at&&ob.at[lv]?new Date(ob.at[lv]).toLocaleDateString('ru-RU'):'',name=a.names&&lv?a.names[Math.min(lv-1,2)]:a.n;
return '<article class="ach-card '+(lv?'earned':'locked')+' '+a.r+'" title="'+esc(a.d)+'"><div class="ach-top"><span class="ach-ico">'+a.ico+'</span><span class="ach-rarity">'+({common:'Обычная',rare:'Редкая',legendary:'Легендарная'}[a.r])+'</span></div><b>'+esc(name)+'</b><p>'+esc(a.d)+'</p><div class="ach-levels">'+(tiered(a)?[1,2,3]:[1]).map(i=>'<span class="'+(lv>=i?'on l'+i:'')+'" title="'+(tiered(a)?['','Бронза','Серебро','Золото'][i]:'Получено')+'">'+(tiered(a)?['','🥉','🥈','🥇'][i]:'✅')+'</span>').join('')+'</div>'+(lv&&!(tiered(a)&&lv<3)?'<small>Получено: '+dt+'</small>':(lv?'<small>Уровень '+lv+' получен: '+dt+'</small>':'')+'<div class="ach-bar"><i style="width:'+pct+'%"></i></div><small>'+pct+'% · '+fm(val)+(a.th?' / '+fm(tiered(a)?th[lv]:target):'')+'</small>')+'<small class="ach-count">Есть у '+owned+' из '+S.players.length+'</small><button class="ach-pin" data-ach-pin="'+a.id+'">'+(ob.pin.includes(a.id)?'★ Закреплено':'☆ Закрепить')+'</button></article>'}).join('');
return '<div class="ach-wrap"><div class="ach-head"><div><h2>🏆 Достижения</h2><p>Игрок: <b>'+esc(current)+'</b></p></div>'+sel+'</div><div class="ach-rank"><b>'+title(sc)+'</b><span>'+sc+' очков</span><div class="ach-bar"><i style="width:'+Math.min(100,Math.max(0,(sc-prev)/(next-prev)*100))+'%"></i></div><small>До следующего звания: '+Math.max(0,next-sc)+' очков</small></div><div class="ach-grid">'+cards+'</div></div>'}

const oldPop=window.popR;if(oldPop)window.popR=function(){if(pop!=='ach')return oldPop();let o=document.getElementById('pop'),html='<div id="pop"><div class="pw"><div class="row"><b class="sp" style="font-size:18px">🏆 Достижения</b><button class="btn" data-a="pc">✕ Закрыть</button></div>'+page()+'</div></div>';if(o)o.outerHTML=html;else document.body.insertAdjacentHTML('beforeend',html)};
document.addEventListener('change',ev=>{if(ev.target.matches('[data-ach-player]')){window.achPlayer=ev.target.value;popR()}});
document.addEventListener('click',ev=>{let b=ev.target.closest('[data-ach-pin]');if(b){let p=window.achPlayer||me,ob=S.ach[p]||(S.ach[p]={lv:{},at:{},pin:[]}),id=b.dataset.achPin,ix=ob.pin.indexOf(id);if(ix>=0)ob.pin.splice(ix,1);else if(ob.pin.length<3)ob.pin.push(id);else{toast('Можно закрепить не более 3 достижений');return}save();popR();return}});
function profile(p){let ob=S.ach&&S.ach[p]||{},pins=(ob.pin||[]).map(id=>ACH.find(a=>a.id===id)).filter(Boolean);return '<div class="pl-tip"><b>'+esc(p)+' · '+title(score(p))+'</b><div>'+ (pins.length?pins.map(a=>'<span>'+a.ico+' '+esc(a.n)+'</span>').join(''):'<small>Пока нет закреплённых достижений</small>')+'</div></div>'}
let tooltip;document.addEventListener('mouseover',ev=>{let el=ev.target;while(el&&el!==document.body){let name=(el.textContent||'').trim();if(name.length<50&&S.players.some(p=>p.n===name)){if(!tooltip){tooltip=document.createElement('div');tooltip.id='ach-player-tip';document.body.appendChild(tooltip)}tooltip.innerHTML=profile(name);tooltip.style.left=Math.min(ev.clientX+12,innerWidth-250)+'px';tooltip.style.top=Math.min(ev.clientY+12,innerHeight-130)+'px';tooltip.style.display='block';return}el=el.parentElement}if(tooltip)tooltip.style.display='none'});
window.ACH=ACH;window.achCalc=calc;window.addEventListener('load',function(){setTimeout(function(){window.achProcess&&window.achProcess()},300)});})();
