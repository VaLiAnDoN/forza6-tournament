/* Состояние (localStorage), вход, сохранение. Сюда подключим Supabase */
function init(){const compat={};T.forEach(t=>{compat[t.id]={};D.forEach(d=>compat[t.id][d]=!(['athr','dkca'].includes(t.id)&&/Автокросс|Грунт/.test(d)))});
const tracks={};D.forEach(d=>tracks[d]=[1,2,3].map(i=>d+' — трасса '+i));
return{players:['Женя','Максим','Влад','Богдан'].map(n=>({n,c:code()})),admin:'777777',order:[],picks:{},compat,compatC:Object.fromEntries(T.map(t=>[t.id,Object.fromEntries(CL.map(c=>[c,true]))])),tracks,races:[]}}
let S;try{S=JSON.parse(localStorage.getItem('nc5'))}catch(x){}S=S||init();function notify(m){const d=document.createElement('div');d.textContent=m;d.style.cssText='position:fixed;left:50%;top:20px;transform:translateX(-50%);background:#ff3d81;color:#fff;padding:10px 16px;border-radius:10px;z-index:9;max-width:90%';document.body.appendChild(d);setTimeout(()=>d.remove(),3000)}window.alert=notify;
let me=null,tab='t',pend=null;try{me=localStorage.getItem('nc5me')}catch(x){}
function migrate(){S.players=S.players||[];S.order=S.order||[];S.picks=S.picks||{};S.races=S.races||[];S.admin='777777';S.wg=S.wg||{};S.ci=S.ci||{};S.compat=S.compat||{};S.compatC=S.compatC||{};S.tracks=S.tracks||{};D.forEach(d=>S.tracks[d]=S.tracks[d]||[]);T.forEach(t=>{S.compat[t.id]=S.compat[t.id]||{};D.forEach(d=>{if(S.compat[t.id][d]===undefined)S.compat[t.id][d]=true});S.compatC[t.id]=S.compatC[t.id]||{}});if(S.nv!==1){const sf={};S.players.forEach(p=>{if(p.n==='Женя'){if(sf.x)p.n='Даня';sf.x=1}});S.nv=1}if(!S.cp){S.cp={};S.players.forEach(p=>S.cp[p.n]=p.n==='Даня'?0:1)}if(!S.tp){S.tp={};S.players.forEach(p=>S.tp[p.n]=p.n==='Даня'?0:1)}if(!S.compatC)S.compatC=init().compatC;if(S.tv!==2){D.forEach(d=>S.tracks[d]=Object.keys(TD[d]||{}));S.tv=2}if(S.cv!==3){applyCav();S.cv=3}S.cs=S.cs||{};for(const u in S.ci)for(const K in S.ci[u])for(const k in S.ci[u][K]){const v=S.ci[u][K][k];if(v!==''&&v!==undefined){const o=S.cs[K]=S.cs[K]||{};if(o[k]===undefined)o[k]=v}}}
migrate();
const save=()=>{try{localStorage.setItem('nc5',JSON.stringify(S))}catch(x){}window.syncKick&&syncKick()};const adm=()=>me==='@admin';

/* Участники чемпионата 5 и турнира Тачки настраиваются отдельно от списка игроков сайта */
const CP=()=>S.players.filter(p=>(S.cp||{})[p.n]),TP=()=>S.players.filter(p=>(S.tp||{})[p.n]),CPN=()=>CP().map(p=>p.n),TPN=()=>TP().map(p=>p.n);
let view='home',cf={so:'4',dir:'-1'};
