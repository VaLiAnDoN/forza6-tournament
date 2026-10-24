/* Состояние (localStorage), вход, сохранение. Сюда подключим Supabase */
function init(){const compat={};T.forEach(t=>{compat[t.id]={};D.forEach(d=>compat[t.id][d]=!(['athr','dkca'].includes(t.id)&&/Автокросс|Грунт/.test(d)))});
const tracks={};D.forEach(d=>tracks[d]=[1,2,3].map(i=>d+' — трасса '+i));
return{players:['Женя','Максим','Влад','Богдан'].map(n=>({n,c:code()})),admin:'ADMIN',order:[],picks:{},compat,compatC:Object.fromEntries(T.map(t=>[t.id,Object.fromEntries(CL.map(c=>[c,true]))])),tracks,races:[]}}
let S;try{S=JSON.parse(localStorage.getItem('nc5'))}catch(x){}S=S||init();function notify(m){const d=document.createElement('div');d.textContent=m;d.style.cssText='position:fixed;left:50%;top:20px;transform:translateX(-50%);background:#ff3d81;color:#fff;padding:10px 16px;border-radius:10px;z-index:9;max-width:90%';document.body.appendChild(d);setTimeout(()=>d.remove(),3000)}window.alert=notify;
let me=null,tab='t',pend=null;try{me=localStorage.getItem('nc5me')}catch(x){}
function migrate(){S.players=S.players||[];S.order=S.order||[];S.picks=S.picks||{};S.races=S.races||[];S.admin=S.admin||'ADMIN';S.compat=S.compat||{};S.compatC=S.compatC||{};S.tracks=S.tracks||{};D.forEach(d=>S.tracks[d]=S.tracks[d]||[]);T.forEach(t=>{S.compat[t.id]=S.compat[t.id]||{};D.forEach(d=>{if(S.compat[t.id][d]===undefined)S.compat[t.id][d]=true});S.compatC[t.id]=S.compatC[t.id]||{}});const f=x=>x==='Даня'?'Женя':x;S.players.forEach(p=>p.n=f(p.n));S.order=S.order.map(f);for(const t in S.picks)S.picks[t]=f(S.picks[t]);S.races.forEach(r=>{for(const o of['lanes','times']){const n={};for(const k in r[o])n[f(k)]=r[o][k];r[o]=n}});if(!S.compatC)S.compatC=init().compatC;if(S.tv!==2){D.forEach(d=>S.tracks[d]=Object.keys(TD[d]||{}));S.tv=2}if(S.cv!==3){applyCav();S.cv=3}me=f(me)}
migrate();
const save=()=>{try{localStorage.setItem('nc5',JSON.stringify(S))}catch(x){}};const adm=()=>me==='@admin';

let view='home',cf={so:'4',dir:'-1'};
