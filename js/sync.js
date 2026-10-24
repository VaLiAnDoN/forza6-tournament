/* Синхронизация с Supabase: опрос раз в 4 с, слияние одновременных правок */
const SB_URL='https://sxjrldbxqrgszhmpzrak.supabase.co/rest/v1/app_state?id=eq.main',
SB_KEY='sb_publishable_FlcsmTdHbSu0laI_kZPlTQ_vAObuZba',
SB_H={apikey:SB_KEY,'Content-Type':'application/json'};
let sRev=-1,sBase=null,sDirty=false,sBusy=false,sTm=0,sOk=null;
const sJ=x=>JSON.stringify(x),sClone=x=>JSON.parse(sJ(x)),sEq=(a,b)=>sJ(a)===sJ(b),isO=x=>x&&typeof x=='object'&&!Array.isArray(x);
/* трёхстороннее слияние: b — последняя синхронизированная версия, l — моя, r — облачная */
function sMerge(b,l,r){
 if(sEq(l,b))return r;if(sEq(r,b)||sEq(l,r))return l;
 if(isO(l)&&isO(r)){const o={};new Set([...Object.keys(l),...Object.keys(r),...(isO(b)?Object.keys(b):[])]).forEach(k=>{const v=sMerge(isO(b)?b[k]:undefined,l[k],r[k]);if(v!==undefined)o[k]=v});return o}
 if(Array.isArray(l)&&Array.isArray(r)&&Array.isArray(b)&&l.length>=b.length&&r.length>=b.length)return b.map((x,i)=>sMerge(x,l[i],r[i])).concat(l.slice(b.length),r.slice(b.length));
 return l}
function sSt(s){sOk=s;let e=document.getElementById('sy');if(!e){document.body.insertAdjacentHTML('beforeend','<div id="sy"></div>');e=document.getElementById('sy');e.style.cssText='position:fixed;left:10px;bottom:8px;z-index:11;font-size:11px;opacity:.75;pointer-events:none;color:#cfd3e6'}e.textContent=s==1?'☁ синхронизировано':s==2?'☁ сохранение…':'⚠ нет связи с облаком'}
const sFetch=async(u,o)=>{const r=await fetch(u,o);if(!r.ok)throw new Error(r.status);return r.json()};
const sGet=async sel=>(await sFetch(SB_URL+'&select='+sel,{headers:SB_H}))[0];
const sEditing=()=>{const a=document.activeElement;return !!a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)};
/* подтянуть облако; false — облако пустое, нужно залить локальные данные */
async function sApply(){
 const r=await sGet('rev,data');if(!r)throw new Error('нет строки main');
 if(!r.data||!Object.keys(r.data).length){sRev=r.rev;sBase=null;sDirty=true;return false}
 const had=sDirty&&sBase;
 S=had?sMerge(sBase,S,r.data):sClone(r.data);sBase=sClone(r.data);sRev=r.rev;if(!had)sDirty=false;
 migrate();try{localStorage.setItem('nc5',sJ(S))}catch(x){}return true}
async function sPush(){
 for(let i=0;i<4&&sDirty;i++){
  const snap=sClone(S);
  const a=await sFetch(SB_URL+'&rev=eq.'+sRev,{method:'PATCH',headers:{...SB_H,Prefer:'return=representation'},body:sJ({data:snap,rev:sRev+1,updated_at:new Date().toISOString()})});
  if(a.length){sRev=a[0].rev;sBase=snap;sDirty=!sEq(S,snap)}else await sApply()}}
async function sPoll(){
 if(sBusy)return;sBusy=true;
 try{
  if(sRev<0&&await sApply())render();
  if(sDirty){sSt(2);await sPush()}
  const r=await sGet('rev');
  if(r&&r.rev!==sRev&&!sDirty&&!sEditing()){await sApply();render()}
  sSt(1)
 }catch(e){sSt(0)}
 sBusy=false;if(sDirty&&sOk!==0){clearTimeout(sTm);sTm=setTimeout(sPoll,400)}}
window.syncKick=()=>{sDirty=sBase?!sEq(S,sBase):true;if(sDirty){clearTimeout(sTm);sTm=setTimeout(sPoll,400)}};
setInterval(sPoll,4000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)sPoll()});window.addEventListener('online',sPoll);sPoll();
