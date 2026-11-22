/* Общий пул трасс (для Чемпионата 5, Колеса Фортуны и будущих режимов) + фотографии в Supabase Storage.
   Классы и число кругов относятся ТОЛЬКО к Чемпионату 5 и не ограничивают сохранение трассы в пуле. */
(function(){
'use strict';
const BUCKET='Forza Photo', SB='https://sxjrldbxqrgszhmpzrak.supabase.co', KEY='sb_publishable_FlcsmTdHbSu0laI_kZPlTQ_vAObuZba';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const metadata=()=>S.trackPhotos||(S.trackPhotos={});
const item=(d,n)=>metadata()[d+'|'+n]||{};
const finOf=(d,n)=>FIN.find(f=>f.d===d&&f.n===n);
const fmtKm=v=>(+Number(v).toFixed(2)).toLocaleString('ru-RU');
function close(){document.getElementById('trackManagerModal')?.remove();document.getElementById('trackDetailsModal')?.remove()}
function panel(){const el=document.createElement('div');el.id='trackManagerModal';el.setAttribute('role','dialog');el.setAttribute('aria-label','Трассы');el.style.cssText='position:fixed;inset:0;z-index:1000;background:#080914ef;overflow:auto;padding:18px;box-sizing:border-box';document.body.appendChild(el);return el}
/* Для Чемпионата 5: в каких классах трасса подойдёт (для кругов — только при целом числе кругов в диапазоне дистанции) */
function ch5Info(d,km,cl){const allowed=cl&&cl.length?CL.filter(c=>cl.includes(c)):CL.slice();if(!km)return'';if(!CIRC(d))return 'Спринт: число кругов не нужно. Классы: '+allowed.join(', ')+'.';
 const ok=allowed.filter(c=>lapsFor(km,c).length),no=allowed.filter(c=>!lapsFor(km,c).length);
 return 'Для Чемпионата 5 (круги): подходит для классов '+(ok.length?ok.join(', '):'—')+(no.length?'. Для '+no.join(', ')+' целое число кругов в допустимую дистанцию не укладывается — в этих классах Чемпионат 5 эту трассу пропустит.':'.')}
let filterD='', search='';
function list(){
 close();const root=panel();
 root.innerHTML=`<div class="card" style="max-width:900px;margin:3vh auto;padding:18px"><div class="row"><h2 class="sp">🗺️ Трассы</h2><button class="btn" data-tm="close">Закрыть</button></div><p class="mut">Общий пул трасс. Нажмите название — откроются данные и фотография. Любой участник может изменить трассу, добавить фото или новую трассу. Финальные гонки Чемпионата 5 отмечены значком 🏁.</p><div class="row"><label>Дисциплина <select id="track-filter"><option value="">Все дисциплины</option>${D.map(d=>`<option value="${esc(d)}" ${d===filterD?'selected':''}>${esc(d)}</option>`).join('')}</select></label><label class="sp">Поиск <input id="track-search" value="${esc(search)}" placeholder="Название трассы"></label><button class="btn pri" data-tm="new">Добавить трассу</button></div><div id="track-list"></div></div>`;
 const fill=()=>{const q=search.trim().toLocaleLowerCase('ru'),listEl=root.querySelector('#track-list');let count=0;
  listEl.innerHTML=D.filter(d=>!filterD||d===filterD).map(d=>{const rows=trackPool(d).filter(t=>t.n.toLocaleLowerCase('ru').includes(q));if(!rows.length)return '';count+=rows.length;
   return `<section><h3>${esc(d)} <small class="mut">${rows.length}</small></h3>${rows.map(t=>`<div class="row" style="border-top:1px solid #ffffff22;padding:7px 0"><button class="btn sp" style="text-align:left" data-detail-d="${esc(t.d)}" data-detail-n="${esc(t.n)}">${t.fin?'🏁 ':''}${esc(t.n)}</button><span class="mut">${t.km?fmtKm(t.km)+' км'+(t.fin?' (дистанция финала)':CIRC(t.d)?'/круг':''):'длина не указана'}${t.url?' · 📷':''}</span><button class="btn" data-edit-d="${esc(t.d)}" data-edit-n="${esc(t.n)}">Изменить</button></div>`).join('')}</section>`}).join('');
  if(!count)listEl.innerHTML='<p class="mut">Трассы не найдены.</p>'};
 fill();root.querySelector('#track-filter').onchange=e=>{filterD=e.target.value;fill()};root.querySelector('#track-search').oninput=e=>{search=e.target.value;fill()};
 root.addEventListener('click',ev=>{const t=ev.target.closest('button');if(!t)return;if(t.dataset.tm==='close')close();else if(t.dataset.tm==='new')edit();else if(t.hasAttribute('data-edit-d'))edit(t.dataset.editD,t.dataset.editN);else if(t.hasAttribute('data-detail-d'))details(t.dataset.detailD,t.dataset.detailN,true)});
}
function details(d,n){
 document.getElementById('trackDetailsModal')?.remove();const x=trackData(d,n),m=item(d,n),f=finOf(d,n),used=(S.races||[]).filter(r=>r.d===d&&r.track===n).length,ov=document.createElement('div');
 ov.id='trackDetailsModal';ov.setAttribute('role','dialog');ov.setAttribute('aria-label','Данные трассы');ov.style.cssText='position:fixed;inset:0;z-index:1100;background:#05050ded;overflow:auto;padding:18px';
 const clTxt=f?'Финал Чемпионата 5, класс '+finInfo(f).c:(x&&x.cl&&x.cl.length&&x.cl.length<CL.length?'Классы Чемпионата 5: '+x.cl.join(', '):'Классы Чемпионата 5: любые');
 ov.innerHTML=`<div class="card" style="max-width:800px;margin:3vh auto;padding:18px"><div class="row"><h2 class="sp">${f?'🏁 ':''}${esc(n)}</h2><button class="btn" data-detail-close>Закрыть</button></div><p><b>Дисциплина:</b> ${esc(d)}</p><p><b>Длина:</b> ${x&&x.km?esc(fmtKm(x.km))+' км'+(f?' (дистанция финала)':CIRC(d)?' за круг':''):'не указана'}</p><p class="mut">${esc(clTxt)}${x&&x.km&&!f?'<br>'+esc(ch5Info(d,x.km,x.cl)):''}</p>${used?`<p class="mut">Гонок в расписании Чемпионата 5 на этой трассе: ${used}</p>`:''}${m.url?`<img src="${esc(m.url)}" alt="Изображение трассы ${esc(n)}" style="display:block;max-width:100%;max-height:65vh;object-fit:contain;margin:12px auto;border-radius:10px" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><p hidden>Не удалось загрузить изображение.</p>`:'<p class="mut">Изображение ещё не добавлено.</p>'}<button class="btn" data-detail-edit>Изменить данные и фото</button></div>`;
 document.body.appendChild(ov);ov.onclick=e=>{if(e.target===ov||e.target.closest('[data-detail-close]'))ov.remove();else if(e.target.closest('[data-detail-edit]')){ov.remove();edit(d,n)}};
}
function edit(oldD='',oldN=''){
 close();const isEdit=!!oldN,fin=isEdit&&finOf(oldD,oldN),d=oldD||filterD||D[0],rec=isEdit?trackData(d,oldN):null,m=isEdit?item(d,oldN):{},root=panel(),restricted=!!(rec&&rec.cl&&rec.cl.length&&rec.cl.length<CL.length);
 root.innerHTML=`<div class="card" style="max-width:760px;margin:3vh auto;padding:18px"><div class="row"><h2 class="sp">${isEdit?'Изменить трассу':'Добавить трассу'}</h2><button class="btn" data-back>← К списку</button></div>${fin?'<p class="mut">🏁 Финальная гонка Чемпионата 5: название и дисциплина фиксированы, можно менять длину и фото.</p>':''}<div class="row"><label>Дисциплина <select id="tmDisc" ${isEdit?'disabled':''}>${D.map(x=>`<option value="${esc(x)}" ${x===d?'selected':''}>${esc(x)}</option>`).join('')}</select></label><label class="sp">Название <input id="tmName" value="${esc(oldN)}" maxlength="70" placeholder="Название трассы" ${fin?'disabled':''}></label><label>Длина, км <input id="tmKm" type="number" min="0.01" max="500" step="any" value="${rec?.km||''}" style="width:100px"></label></div><p class="mut">${fin?'Для финала это общая дистанция гонки.':'Для кольцевой трассы укажите длину одного круга.'} Сохранение не зависит от правил классов.</p>
 ${fin?`<div style="margin:8px 0"><b>Класс финала в Чемпионате 5</b> <select id="tmFinCl">${CL.concat('X').map(c=>`<option ${c===finInfo(fin).c?'selected':''}>${c}</option>`).join('')}</select><p class="mut">В этом классе Чемпионат 5 поставит финал. Колесо Фортуны и другие режимы это не используют. Для класса X страны подбираются по возможностям класса R.</p></div>`:`<details open style="margin:8px 0"><summary><b>Только для Чемпионата 5 (необязательно)</b></summary><p class="mut">Какие классы Чемпионат 5 может ставить на эту трассу. Если отмечены все классы — ограничений нет. Колесо Фортуны и другие режимы это не используют.</p><div class="row" id="tmClasses">${CL.map(c=>`<label style="margin:4px"><input type="checkbox" value="${c}" ${(!restricted||rec.cl.includes(c))?'checked':''}> ${c}</label>`).join('')}</div><p class="mut" id="tmHint"></p></details>`}
 <p><label><input id="tmRoulette" type="checkbox" ${(typeof m.roulette==='boolean'?m.roulette:!fin)?'checked':''}> Добавлять трассу в рулетку чемпионатов</label><br><span class="mut">На общий пул и ручной выбор в Колесе Фортуны настройка не влияет.</span></p>
 <p><label>Фотография (JPEG, PNG или WebP, не более 20 МБ)<br><input id="tmFile" type="file" accept="image/jpeg,image/png,image/webp"></label></p>${m.url?`<img src="${esc(m.url)}" alt="Текущая фотография" style="max-width:240px;max-height:140px;object-fit:contain"><p><label><input type="checkbox" id="tmClear"> Убрать фотографию из карточки</label></p>`:''}<p class="mut">Пустое поле фотографии сохраняет прежнюю картинку. Изменения доступны всем игрокам после синхронизации.</p><div class="row"><button class="btn pri" id="tmSave">${isEdit?'Сохранить изменения':'Добавить в пул'}</button>${isEdit&&!fin?'<button class="btn" data-remove>Убрать из пула</button>':''}<span id="tmStatus" class="mut"></span></div></div>`;
 root.querySelector('[data-back]').onclick=list;
 const hint=()=>{const h=root.querySelector('#tmHint');if(!h)return;const dd=root.querySelector('#tmDisc').value,km=Number(root.querySelector('#tmKm').value),cl=[...root.querySelectorAll('#tmClasses input:checked')].map(x=>x.value);h.textContent=km>0?ch5Info(dd,km,cl.length<CL.length?cl:null):''};
 ['#tmDisc','#tmKm','#tmClasses'].forEach(s=>{const el=root.querySelector(s);if(el){el.addEventListener('input',hint);el.addEventListener('change',hint)}});hint();
 const del=root.querySelector('[data-remove]');if(del)del.onclick=()=>{if(!confirm('Убрать трассу «'+oldN+'» из общего пула? Уже составленные гонки сохранятся.'))return;S.tracks[oldD]=(S.tracks[oldD]||[]).filter(n=>n!==oldN);save();list()};
 root.querySelector('#tmSave').onclick=async()=>{
 const status=root.querySelector('#tmStatus'),button=root.querySelector('#tmSave'),nd=root.querySelector('#tmDisc').value,name=fin?oldN:root.querySelector('#tmName').value.trim(),km=Number(root.querySelector('#tmKm').value),file=root.querySelector('#tmFile').files[0],checked=[...root.querySelectorAll('#tmClasses input:checked')].map(x=>x.value),cl=(!checked.length||checked.length===CL.length)?null:checked;
 if(!name||name.includes('|')||!Number.isFinite(km)||km<=0||km>500){status.textContent='Укажите название без символа | и длину больше 0 и не более 500 км.';return}
 const taken=(S.tracks[nd]||[]).concat(FIN.filter(f=>f.d===nd).map(f=>f.n));
 if(taken.some(n=>n.toLocaleLowerCase('ru')===name.toLocaleLowerCase('ru')&&!(isEdit&&n===oldN))){status.textContent='Такая трасса уже есть в этой дисциплине.';return}
 if(file&&(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>20*1024*1024)){status.textContent='Выберите JPEG, PNG или WebP размером не более 20 МБ.';return}
 button.disabled=true;status.textContent=file?'Загружаю фотографию…':'Сохраняю…';let url=m.url||'';
 try{
 if(file){const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[file.type];const id=(globalThis.crypto&&crypto.randomUUID)?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2);const path='tracks/'+id+'.'+ext;
  const response=await fetch(SB+'/storage/v1/object/'+encodeURIComponent(BUCKET)+'/'+path,{method:'POST',headers:{apikey:KEY,'Content-Type':file.type},body:file});
  if(!response.ok){let body='';try{body=await response.text()}catch(_){}let msg='';try{const j=JSON.parse(body);msg=j.message||j.error||''}catch(_){msg=body}
   const rls=/row-level security|Unauthorized|policy/i.test(msg)||response.status===401||response.status===403||response.status===400;
   throw Error('Хранилище ответило '+response.status+(msg?' («'+String(msg).slice(0,140)+'»)':'')+(rls?'. Скорее всего, не выполнен SQL из SUPABASE-TRACK-POLICIES.txt (права на загрузку).':''))}
  url=SB+'/storage/v1/object/public/'+encodeURIComponent(BUCKET)+'/'+path}
 else if(root.querySelector('#tmClear')?.checked)url='';
 if(isEdit&&oldN!==name){S.tracks[oldD]=(S.tracks[oldD]||[]).map(n=>n===oldN?name:n);(S.races||[]).forEach(r=>{if(r.d===oldD&&r.track===oldN)r.track=name});delete metadata()[oldD+'|'+oldN]}
 if(!fin&&!(S.tracks[nd]||[]).includes(name))(S.tracks[nd]=S.tracks[nd]||[]).push(name);
 metadata()[nd+'|'+name]={...m,custom:m.custom||(!fin&&!(TD[nd]||{})[name]),km,cl,url,roulette:root.querySelector('#tmRoulette').checked,...(fin?{fc:root.querySelector('#tmFinCl').value}:{})};
 if(fin)(S.races||[]).forEach(r=>{if(r.fin&&r.d===nd&&r.track===name&&!(r.times&&Object.keys(r.times).some(k=>r.times[k]))){r.km=km;r.c=metadata()[nd+'|'+name].fc||r.c}});
 save();list();notify('Сохранено. Проверьте индикатор синхронизации с облаком.');
 }catch(err){status.textContent='Не удалось сохранить: '+err.message;button.disabled=false}
 };
}
document.addEventListener('click',ev=>{const menu=ev.target.closest('[data-track-menu]');if(menu&&me){mo=false;render();list();return}const b=ev.target.closest('[data-track-details], [data-a="trackshow"]');if(b&&me){const d=b.dataset.trackDisc||b.dataset.disc,n=b.dataset.trackDetails||b.dataset.track;if(d&&n)details(d,n)}});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&document.getElementById('trackDetailsModal'))document.getElementById('trackDetailsModal').remove();else if(ev.key==='Escape'&&document.getElementById('trackManagerModal'))close()});
})();
