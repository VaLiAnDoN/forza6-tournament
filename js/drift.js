/* Статистика дрифта (архив). Данные: window.HISTORY_EXTRA.drift. Не меняет состояние турнира. */
(function(){
'use strict';
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fmt(n){return Number(n).toLocaleString('ru-RU')}
var GOALS=[[5000000,'Дрифтер'],[10000000,'Король дрифта']];
function addMenu(){var h=document.querySelector('[data-history-action="open"]');if(!h||h.parentNode.querySelector('[data-drift-action="open"]'))return;var b=document.createElement('button');b.className='btn';b.style.cssText='width:100%;margin:3px 0';b.setAttribute('data-drift-action','open');b.textContent='\uD83C\uDFCE Дрифт';h.insertAdjacentElement('afterend',b)}
function view(){
 var list=(window.HISTORY_EXTRA&&window.HISTORY_EXTRA.drift)||[],tot={},cnt={},best={};
 list.forEach(function(d){Object.keys(d.pts||{}).forEach(function(p){var v=+d.pts[p]||0;tot[p]=(tot[p]||0)+v;cnt[p]=(cnt[p]||0)+1;best[p]=Math.max(best[p]||0,v)})});
 var names=Object.keys(tot).sort(function(a,b){return tot[b]-tot[a]}),all=names.reduce(function(s,n){return s+tot[n]},0);
 var cards=names.map(function(n,i){
  var bars=GOALS.map(function(g){var pc=Math.min(100,tot[n]/g[0]*100);return '<div style="margin-top:10px"><small>'+esc(g[1])+' · '+fmt(g[0])+'</small><div style="height:8px;border-radius:8px;background:#26384b;overflow:hidden;margin-top:4px"><i style="display:block;height:100%;width:'+pc.toFixed(1)+'%;background:linear-gradient(90deg,#4aa8ff,#9ad7ff)"></i></div><small>'+pc.toFixed(1)+'%'+(tot[n]>=g[0]?' · получено':'')+'</small></div>'}).join('');
  return '<section class="hist-panel"><div class="hist-label">МЕСТО '+(i+1)+'</div><strong style="display:block;font-size:24px;margin:8px 0">'+esc(n)+'</strong><div class="hist-leader-score">'+fmt(tot[n])+' <small>очков в сумме</small></div><small>Заездов: '+cnt[n]+' · лучший: '+fmt(best[n])+'</small>'+bars+'</section>'}).join('');
 var rows=list.map(function(d){return '<tr><td>'+esc(d.champ)+'</td><td>'+esc(d.name)+'</td>'+names.map(function(n){return '<td>'+(d.pts&&d.pts[n]!=null?fmt(d.pts[n]):'—')+'</td>'}).join('')+'</tr>'}).join('');
 return '<div class="hist-title"><div class="hist-eyebrow">FORZA · СТАТИСТИКА</div><h1>Дрифт</h1><p>Очки дрифта суммируются отдельно и не смешиваются с временем гонок.</p></div>'+
 (names.length?'<div class="hist-metrics" style="margin-bottom:16px"><span><b>'+list.length+'</b> заезд(ов)</span><span>Всего очков: <b>'+fmt(all)+'</b></span></div><div class="hist-grid">'+cards+'</div><h2 class="hist-sections-title">Заезды</h2><div class="hist-scroll"><table><thead><tr><th>Чемпионат</th><th>Гонка</th>'+names.map(function(n){return '<th>'+esc(n)+'</th>'}).join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div>':'<div class="hist-note">Данных о дрифте пока нет.</div>')+
 '<p class="hist-footnote">Достижения: «Дрифтер» — 5 000 000 очков в сумме, «Король дрифта» — 10 000 000.</p>'}
function show(){var el=document.getElementById('history-overlay');if(!el){el=document.createElement('div');el.id='history-overlay';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');document.body.appendChild(el)}
 el.innerHTML='<div class="hist-window"><div class="hist-top"><span>FORZA <b>DRIFT</b></span><button class="hist-close" data-history-action="close" aria-label="Закрыть">\u2715</button></div><main class="hist-content">'+view()+'</main></div>';el.scrollTop=0}
var prev=render;render=function(){var r=prev.apply(this,arguments);addMenu();return r};addMenu();
document.addEventListener('click',function(ev){var b=ev.target.closest('[data-drift-action="open"]');if(!b)return;mo=false;render();show()});
})();
