/* Сборка render и запуск */
let lk='';const _rd=render;render=function(){const A=document.getElementById('app');{const kk=view+'|'+!!me+'|'+tab+'|'+tkTab;if(kk!=lk){lk=kk;A.classList.remove('sw');void A.offsetWidth;A.classList.add('sw')}}document.body.classList.toggle('fj',!!me&&view=='home');document.body.classList.toggle('vd',!!me&&view=='tachki');document.body.classList.toggle('vy',!!me&&view=='tachki'&&vidOn);yt();if(me&&view!='champ')alt(A);else{_rd();if(me)A.insertAdjacentHTML('afterbegin',nav())}paint();popR()};

render();
