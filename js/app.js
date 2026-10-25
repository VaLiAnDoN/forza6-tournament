/* Сборка render и запуск */
function LGBG(){let p='';for(let i=0;i<46;i++){const w=8+Math.random()*10;p+=`<i class="pt" style="left:${Math.random()*100}%;width:${w}px;height:${w*.75}px;--dx:${(Math.random()-.3)*260}px;--r:${(Math.random()-.5)*1080}deg;animation-delay:-${Math.random()*10}s;animation-duration:${6+Math.random()*6}s"></i>`}return`<div id="lgbg">${p}<div class="ft">Forza <b>Horizon</b> 6</div><div class="fs">日本 · JAPAN</div></div>`}
document.body.insertAdjacentHTML('afterbegin',LGBG());
let lk='';const _rd=render;render=function(){const A=document.getElementById('app');document.body.classList.toggle('lg',!me);{const kk=view+'|'+!!me+'|'+tab+'|'+tkTab;if(kk!=lk){lk=kk;A.classList.remove('sw');void A.offsetWidth;A.classList.add('sw')}}document.body.classList.toggle('fj',!!me&&view=='home');document.body.classList.toggle('vd',!!me&&view=='tachki');document.body.classList.toggle('vy',!!me&&view=='tachki'&&vidOn);yt();if(me&&view!='champ')alt(A);else{_rd();if(me)A.insertAdjacentHTML('afterbegin',nav())}paint();popR()};

render();
