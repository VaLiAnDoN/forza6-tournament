/* Обработчики кликов/изменений/наведения */
document.addEventListener('keydown',ev=>{if(ev.key=='Enter'&&ev.target.id=='cd')document.querySelector('[data-a=in]').click()});
window.addEventListener('error',x=>{alert('Ошибка: '+x.message)});
document.addEventListener('click',ev=>{const el=ev.target.closest('[data-a]');if(!el)return;const a=el.dataset.a;
if(a=='in'){const c=document.getElementById('cd').value.replace(/\s/g,'');const p=S.players.find(p=>p.c==c);me=c.toUpperCase()==S.admin?'@admin':p?p.n:null;if(!me)return alert('Код не найден');try{localStorage.setItem('nc5me',me)}catch(x){}}
if(a=='out'){me=null;try{localStorage.removeItem('nc5me')}catch(x){}}
if(a=='tab')tab=el.dataset.k;
if(a=='start'){S.order=dord().slice();S.picks={}}
if(a=='pick'){const c=turn();if(c){S.picks[el.dataset.k]=c}}
if(a=='rr'||a=='rd'||a=='reset'){pend=a;render();scrollTo(0,0);return}
if(a=='no')pend=null;
if(a=='yes'){if(pend=='rr')S.races=[];if(pend=='rd'){S.order=[];S.picks={};S.races=[]}if(pend=='reset'){S=init();migrate()}pend=null}
if(a=='spin'){spin2(+el.dataset.i,el.dataset.k||'t');return}
if(a=='cl'){const o=document.getElementById('ov');if(o)o.remove()}
if(a=='up'||a=='dn'){const L=dord(),i=+el.dataset.i,j=a=='up'?i-1:i+1;if(L[j]){[L[i],L[j]]=[L[j],L[i]];S.dorder=L}}
if(a=='shuf')S.dorder=dord().sort(()=>Math.random()-.5);
if(a=='v'){const k=el.dataset.k;if(view!=k){wipe();setTimeout(()=>{view=k;mo=false;render()},420);return}view=k;mo=false}
if(a=='mn')mo=!mo;if(a=='pop'){pop=el.dataset.k;mo=false}if(a=='pc')pop=null;if(a=='wspin'){wofSpin();return}
if(a=='tkt')tkTab=el.dataset.k;if(a=='tkadd'){const n=document.getElementById('tkn').value.trim();if(n)TK().races.push({n,t:document.getElementById('tkt').value,l:document.getElementById('tkl').value,code:document.getElementById('tkc').value.trim(),p:{}})}
if(a=='tkdel')TK().races.splice(+el.dataset.i,1);
if(a=='gen'){const n=+document.getElementById('nr').value||12;S.nr=n;if(!Object.keys(S.picks).length)return alert('Сначала проведите драфт');gen3(n)}
if(a=='addp'){const n=document.getElementById('np').value.trim();if(n)S.players.push({n,c:code()})}
save();render()});

document.addEventListener('mouseover',ev=>{const t=ev.target,m=t.closest&&t.closest('[data-hl]'),c=t.closest&&t.closest('#map')&&t.dataset&&t.dataset.c,tp=document.getElementById('tip');
if(m){hl(m.dataset.hl.split(','));tp.textContent=''}else if(c){hl([c]);tp.textContent=CN[c]}else{hl([]);tp.textContent=''}});
document.addEventListener('change',ev=>{const el=ev.target;
if(['cd','tkn','tkt','tkl','tkc'].includes(el.id))return;
if(el.dataset.sp){S.sp=el.value;save();render();return}
if(el.dataset.wof){S.wof=el.value;save();return}
if(el.dataset.tkf){const[i,f]=el.dataset.tkf.split('|');TK().races[i][f]=el.value;save();return}
if(el.dataset.car!==undefined){const r=S.races[el.dataset.car];r.cars=r.cars||{};r.cars[el.dataset.p]=el.value;save();return}
if(el.dataset.tkc!==undefined){const r=TK().races[el.dataset.tkc];r.c=r.c||{};r.c[el.dataset.p]=el.value;save();return}
if(el.dataset.tk!==undefined){const r=TK().races[el.dataset.tk];r.p=r.p||{};r.p[el.dataset.p]=el.value;save();render();return}
if(el.dataset.sn){S.snake=el.checked;save();return}
if(el.dataset.code!==undefined){S.races[el.dataset.code].code=el.value.trim();save();return}
if(el.dataset.cf){cf[el.dataset.cf]=el.value;render();return}
if(el.id=='nr'){S.nr=+el.value;save();return}
if(el.dataset.c!==undefined)S.races[el.dataset.c].times[el.dataset.p]=el.value;
if(el.dataset.tr)S.tracks[el.dataset.tr]=el.value.split('\n').map(s=>s.trim()).filter(Boolean);
if(el.dataset.cp){const[t,d]=el.dataset.cp.split('|');S.compat[t][d]=el.checked}
if(el.dataset.cc){const[t,c]=el.dataset.cc.split('|');S.compatC[t][c]=el.checked}
save();render()});
