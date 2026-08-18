(function(){
  'use strict';
  var body=document.body;
  if(!body) return;
  var page=body.dataset.page||'';
  var TOKEN_KEY='dinocademy-token';
  var THEME_KEY='dinocademy-theme';
  var THEME_ALIASES={atlas:'atlas',teren:'field',field:'field',archiwum:'archive',archive:'archive',noc:'night',night:'night'};
  var themes=[
    {id:'atlas',label:'Atlas',swatch:'#1f4e79'},
    {id:'field',label:'Teren',swatch:'#315e4c'},
    {id:'archive',label:'Archiwum',swatch:'#713447'},
    {id:'night',label:'Noc',swatch:'#75afd0'}
  ];
  function token(){try{return localStorage.getItem(TOKEN_KEY)||'';}catch(_){return '';}}
  function setTheme(id){
    id=THEME_ALIASES[id]||'atlas';
    document.documentElement.dataset.theme=id==='atlas'?'':id;
    try{localStorage.setItem(THEME_KEY,id);}catch(_){}
    document.querySelectorAll('[data-theme-choice]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.themeChoice===id));});
    window.dispatchEvent(new CustomEvent('dinocademy:theme',{detail:{theme:id}}));
  }
  function currentTheme(){var x='atlas';try{x=localStorage.getItem(THEME_KEY)||'atlas';}catch(_){}return THEME_ALIASES[x]||'atlas';}
  setTheme(currentTheme());

  var logo='<svg class="brand-logo-svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">'+
    '<path d="M8 38c0-15.464 12.536-28 28-28 10.245 0 19.205 5.5 24.052 13.704-2.47-.794-5.438-.956-8.904-.484 2.507 2.66 3.76 5.39 3.76 8.192 0 4.749-3.458 9.533-10.374 14.352H30l-7.862 8.76c-1.935 2.158-5.481.79-5.481-2.108V46H12c-2.21 0-4-1.79-4-4v-4z" fill="currentColor" opacity=".12"/>'+
    '<path d="M20 43c-4-3-6-6.667-6-11 0-10.493 8.507-19 19-19 8.584 0 15.837 5.695 18.193 13.516-3.98-.656-7.711-.122-11.193 1.602 2.667 2 4 4.31 4 6.932 0 3.968-3.333 8.285-10 12.95H28l-5.58 6.116c-1.372 1.504-3.92.534-3.92-1.502V43z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>'+
    '<circle cx="33" cy="24" r="2.4" fill="currentColor"/></svg>';
  function brand(){return '<a class="brand" href="index.html" aria-label="Dinocademy — strona główna">'+logo+'<span class="brand-word">Dinocademy</span></a>';}
  var navItems=[
    ['courses','kursy.html','Kursy'],['encyklopedia','encyklopedia.html','Encyklopedia'],['gry','gry.html','Gry'],['forum','forum.html','Forum'],
    ['hatchery','wykluwarnia.html','Wykluwarnia'],['ranking','ranking.html','Ranking'],['pro','pro.html','Pro']
  ];
  function isActive(id,href){return page===id || location.pathname.endsWith('/'+href) || location.pathname.endsWith(href);}
  function navLinks(){return navItems.map(function(n){return '<a '+(isActive(n[0],n[1])?'aria-current="page" ':'')+'href="'+n[1]+'">'+n[2]+'</a>';}).join('');}
  function themeMarkup(){return '<details class="theme-menu"><summary aria-label="Zmień motyw">Aa</summary><div class="theme-panel"><span>Motyw interfejsu</span><div class="theme-options">'+themes.map(function(t){return '<button class="theme-option" data-theme-choice="'+t.id+'" aria-pressed="'+(currentTheme()===t.id)+'" type="button"><i class="theme-swatch" style="background:'+t.swatch+'"></i>'+t.label+'</button>';}).join('')+'</div></div></details>';}
  function headerMarkup(){return '<div class="dino-header-inner">'+brand()+'<nav class="dino-nav" aria-label="Główna nawigacja">'+navLinks()+'</nav><details class="mobile-nav-toggle"><summary aria-label="Otwórz menu">Menu</summary><nav class="mobile-nav" aria-label="Nawigacja mobilna">'+navLinks()+'</nav></details><div class="dino-header-actions">'+themeMarkup()+'<a class="auth-register" data-shell-register href="rejestracja.html">Załóż konto</a><a class="auth-link" data-shell-login href="logowanie.html">Zaloguj</a><span class="header-status" aria-live="polite"></span></div></div>';}

  var header=document.querySelector('header.site-header');
  if(header){header.innerHTML=headerMarkup();}
  // Replace the minimal auth-page brand with the original vector identity too.
  document.querySelectorAll('.auth-top .brand').forEach(function(el){el.outerHTML=brand();});

  document.querySelectorAll('[data-theme-choice]').forEach(function(b){b.addEventListener('click',function(){setTheme(b.dataset.themeChoice);var d=b.closest('details');if(d)d.open=false;});});

  function request(path,opts){
    opts=opts||{};opts.credentials='same-origin';opts.headers=Object.assign({},opts.headers||{},token()?{'X-Session-Token':token()}:{});
    return fetch(path,opts).then(function(r){return r.json().catch(function(){return{};}).then(function(j){if(!r.ok)throw new Error(j.error||'Błąd serwera');return j;});});
  }
  window.DinocademyShell={request:request,token:token,setTheme:setTheme,getTheme:currentTheme,logo:logo};

  function updateAuth(user){
    var actions=document.querySelector('.dino-header-actions');if(!actions)return;
    var login=actions.querySelector('[data-shell-login]'),reg=actions.querySelector('[data-shell-register]');
    actions.querySelectorAll('[data-shell-user]').forEach(function(x){x.remove();});
    if(!user){if(login){login.textContent='Zaloguj';login.href='logowanie.html';login.className='auth-link';}if(reg)reg.hidden=false;return;}
    if(reg)reg.hidden=true;
    if(login){login.textContent=user.name||'Profil';login.href='profil.html';login.className='auth-profile';}
    if(user.isAdmin){var a=document.createElement('a');a.href='admin.html';a.className='auth-link admin-shortcut';a.dataset.shellUser='1';a.textContent='Admin';actions.insertBefore(a,login);}
    var out=document.createElement('button');out.type='button';out.className='auth-logout';out.dataset.shellUser='1';out.textContent='Wyloguj';out.addEventListener('click',function(){request('/api/logout',{method:'POST'}).catch(function(){}).finally(function(){try{localStorage.removeItem(TOKEN_KEY);}catch(_){}location.href='index.html';});});actions.appendChild(out);
  }
  request('/api/me').then(function(d){updateAuth(d.user||null);window.dispatchEvent(new CustomEvent('dinocademy:auth-ready',{detail:{user:d.user||null}}));}).catch(function(){updateAuth(null);window.dispatchEvent(new CustomEvent('dinocademy:auth-ready',{detail:{user:null}}));});

  // Close popovers when clicking outside; avoid stale open menus across responsive changes.
  document.addEventListener('click',function(e){document.querySelectorAll('.theme-menu[open],.mobile-nav-toggle[open]').forEach(function(d){if(!d.contains(e.target))d.open=false;});});
})();
