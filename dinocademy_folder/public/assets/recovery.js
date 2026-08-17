(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

  // API helper - __PORT_3000__ is rewritten by deploy to proxy to backend; locally use relative URLs
  const API_BASE = '__PORT_3000__'.includes('PORT') ? '' : '__PORT_3000__';
  const API = {
    getToken() { return localStorage.getItem('dinocademy-token') || null; },
    setToken(t) { if(t) localStorage.setItem('dinocademy-token', t); else localStorage.removeItem('dinocademy-token'); },
    async get(path) {
      const r = await fetch(API_BASE + path, { credentials: 'same-origin', headers: this.getToken() ? {'X-Session-Token': this.getToken()} : {} });
      if (!r.ok) throw new Error((await r.json().catch(()=>({error:'Błąd'}))).error);
      return r.json();
    },
    async post(path, body) {
      const r = await fetch(API_BASE + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(this.getToken() ? {'X-Session-Token': this.getToken()} : {}) },
        credentials: 'same-origin',
        body: body ? JSON.stringify(body) : undefined
      });
      if (!r.ok) throw new Error((await r.json().catch(()=>({error:'Błąd'}))).error);
      return r.json();
    },
    async del(path) {
      const r = await fetch(API_BASE + path, { method: 'DELETE', credentials: 'same-origin', headers: this.getToken() ? {'X-Session-Token': this.getToken()} : {} });
      if (!r.ok) throw new Error((await r.json().catch(()=>({error:'Błąd'}))).error);
      return r.json();
    }
  };

  // localStorage fallback for non-auth settings (theme)
  const lstore={get(k,d=null){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch{return d}},set(k,v){localStorage.setItem(k,JSON.stringify(v))}};

  // Theme
  const theme=localStorage.getItem('dinocademy-theme')||'atlas'; document.documentElement.dataset.theme=theme;
  $$('.theme-grid button').forEach((b,i)=>b.addEventListener('click',()=>{const names=['atlas','teren','archiwum','noc']; const t=names[i]||'atlas'; document.documentElement.dataset.theme=t;localStorage.setItem('dinocademy-theme',t); $$('.theme-grid button').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true')}));

  // Intercept absolute links
  document.addEventListener('click',e=>{const a=e.target.closest('a'); if(!a)return; const h=a.getAttribute('href')||''; if(h.startsWith('/')){e.preventDefault(); const clean=h.split('?')[0]; const map={'/':'index.html','/learn':'kursy.html','/kursy':'kursy.html','/lekcja':'lekcja.html','/encyklopedia':'encyklopedia.html','/gry':'gry.html','/ranking':'ranking.html','/pro':'pro.html','/notatnik':'notatnik.html','/rejestracja':'rejestracja.html','/logowanie':'logowanie.html','/kurs/level-0':'kurs.html?c=paleo-pro','/kurs':'kurs.html'}; location.href=(map[clean]||'index.html')+(h.includes('?')?'?'+h.split('?')[1]:'')}} ,true);

  // Current user state
  let currentUser = null;

  async function initAuth() {
    try {
      const data = await API.get('/api/me');
      currentUser = data.user;
      updateAuthUI();
    } catch { currentUser = null; updateAuthUI(); }
  }

  function updateAuthUI() {
    const login=$('[data-auth-login]'), reg=$('[data-auth-register]');
    if(currentUser && login) {
      login.textContent=currentUser.name;
      login.href='notatnik.html';
      login.classList.add('logged-in');
      if(reg){reg.textContent='Wyloguj';reg.href='#';reg.addEventListener('click',async e=>{e.preventDefault();try{await API.post('/api/logout');API.setToken(null)}catch{}location.href='index.html'})}
      // Add profile link
      if(login) { login.href='profil.html'; }
      // Admin panel link
      if(currentUser.isAdmin){
        const nav=document.querySelector('.desktop-nav');
        const mobileNav=document.querySelector('.mobile-menu nav');
        if(nav && !nav.querySelector('[data-admin-link]')){
          const a=document.createElement('a');
          a.href='admin.html'; a.textContent='Panel admina'; a.setAttribute('data-admin-link','1');
          nav.appendChild(a);
        }
        if(mobileNav && !mobileNav.querySelector('[data-admin-link]')){
          const a2=document.createElement('a');
          a2.href='admin.html'; a2.textContent='Panel admina'; a2.setAttribute('data-admin-link','1');
          mobileNav.appendChild(a2);
        }
      }
    }
  }

  // Homepage starter
  if(document.body.dataset.page==='home'){
    const opts=$$('.home-starter-options button');
    opts.forEach((b,i)=>b.addEventListener('click',()=>{
      opts.forEach(x=>x.classList.remove('correct','wrong'));
      b.classList.add(i===1?'correct':'wrong');
      const foot=$('.home-starter footer span');
      if(foot) foot.textContent=i===1?'Tak — Triceratops należy do Dinosauria.':'Nie. Pamiętaj: grupa biologiczna wynika z pokrewieństwa, nie z samego wyglądu.';
    }));
  }

  // Register form
  const rf=$('#local-register');
  if(rf) {
    // Password validation
    const pwInput=$('#register-password');
    const pwHint=$('#password-hint');
    if(pwInput) pwInput.addEventListener('input',()=>{
      const v=pwInput.value;
      const hasLetter=/[a-zA-Z]/.test(v), hasDigit=/\d/.test(v), longEnough=v.length>=8;
      if(!v) {pwHint.textContent='';return;}
      const issues=[];
      if(!longEnough) issues.push('min. 8 znaków');
      if(!hasLetter) issues.push('litera');
      if(!hasDigit) issues.push('cyfra');
      pwHint.textContent=issues.length?('Brakuje: '+issues.join(', ')):'Hasło OK';
      pwHint.style.color=issues.length?'#c44':'#2a7';
    });

    rf.addEventListener('submit',async e=>{
      e.preventDefault();
      const f=new FormData(rf);
      const status=$('#auth-status');
      const pw=f.get('password');
      if(pw.length<8||!/[a-zA-Z]/.test(pw)||!/\d/.test(pw)){status.textContent='Hasło: min. 8 znaków, litera i cyfra.';return;}
      try {
        const data=await API.post('/api/register',{name:f.get('name'),email:f.get('email'),password:pw,country:f.get('country')||'PL'});
        if(data.token) API.setToken(data.token);
        status.textContent='Konto utworzone. Przenoszę do kursu…';
        setTimeout(()=>location.href='kursy.html',500);
      } catch(err) {
        status.textContent=err.message||'Błąd rejestracji';
      }
    });
  }

  // Login form
  const lf=$('#local-login');
  if(lf) lf.addEventListener('submit',async e=>{
    e.preventDefault();
    const f=new FormData(lf);
    const status=$('#auth-status');
    try {
      const data=await API.post('/api/login',{email:f.get('email'),password:f.get('password')});
      if(data && data.token) API.setToken(data.token);
      status.textContent='Zalogowano. Przenoszę…';
      const next=new URLSearchParams(location.search).get('next');
      setTimeout(()=>location.href=next?next.replace(/^\//,'')+'.html':'kursy.html',500);
    } catch(err) {
      status.textContent=err.message||'Błąd logowania';
    }
  });

  const titles={'l0-01':'Latający oszust','l0-02':'Drzewo bez drabiny','l0-03':'Czy mogły się spotkać?','l0-04':'Śmierć to dopiero początek','l0-05':'Ugryzienie, które się zagoiło','l0-06':'Ptaki są dinozaurami','l0-07':'Filtr zapisu kopalnego','l0-08':'Jak datować skamieniałość','l0-09':'Ślad czy artefakt?','l0-10':'Finał: obroń hipotezę'};

  // Lesson progress
  async function loadProgress() {
    try {
      const data=await API.get('/api/progress');
      return data.lessons||[];
    } catch { return []; }
  }
  async function saveProgress(id) {
    try { await API.post('/api/progress',{lesson_id:id}); } catch {}
  }

  async function updateProgressUI() {
    const done=await loadProgress();
    const el=$('#learning-progress');
    if(el)el.textContent=`${done.length} / 10`;
    const bar=$('#learning-progress-bar');
    if(bar)bar.style.width=`${done.length*10}%`;
    $$('.recovery-lesson-card').forEach(a=>{
      const id=(a.href.match(/id=([^&]+)/)||[])[1];
      if(done.includes(id))a.classList.add('done');
    });
  }

  // Run progress UI on learn page
  if(document.body.dataset.page==='learn') {
    updateProgressUI();
  }

  // Lesson view
  if(document.body.dataset.page==='lesson'){
    (async()=>{
      const id=new URLSearchParams(location.search).get('id')||'l0-01';
      const L=window.LESSONS[id];
      const view=$('#lesson-view');
      const done=await loadProgress();

      if(!L){view.innerHTML='<h1>Nie znaleziono lekcji</h1><p>Ta jednostka nie występowała w odzyskanym pakiecie.</p>';return}

      const sections=(L.sections||[]).map(s=>`<section class="recovery-section"><h2>${esc(s.title)}</h2><p>${esc(s.body)}</p></section>`).join('');
      const facts=(L.facts||[]).map(f=>typeof f==='string'?`<div>${esc(f)}</div>`:`<div><strong>${esc(f.label||f.title||'Fakt')}</strong><p>${esc(f.value||f.text||f.body||'')}</p></div>`).join('');
      const examples=(L.examples||[]).map(x=>`<section class="recovery-section"><h2>${esc(x.title||'Przykład')}</h2><p>${esc(x.body||x.text||'')}</p></section>`).join('');

      const isDone=done.includes(id);
      view.innerHTML=`<header class="lesson-hero"><span class="app-kicker">${esc(id.toUpperCase())} · ODZYSKANA TREŚĆ</span><h1>${esc(titles[id]||L.title||id)}</h1><p>${esc(L.hook)}</p><p class="lesson-question"><strong>${esc(L.question)}</strong></p></header><div class="recovery-sections">${sections}${examples}</div>${facts?`<div class="recovery-facts">${facts}</div>`:''}<aside class="recovery-mission"><b>Misja</b><p>${esc(L.mission||'')}</p>${L.boundary?`<small>Granica wniosku: ${esc(L.boundary)}</small>`:''}</aside><button class="button" id="complete-lesson">${isDone?'✓ Ukończona':'Oznacz jako ukończoną'}</button>`;

      if(!isDone) {
        $('#complete-lesson').addEventListener('click',async()=>{
          await saveProgress(id);
          $('#complete-lesson').textContent='✓ Ukończona';
          $('#complete-lesson').disabled=true;
        });
      } else {
        $('#complete-lesson').disabled=true;
      }
    })();
  }

  // Encyclopedia
  if(document.body.dataset.page==='encyklopedia'){
    (async()=>{
      const taxa=window.DINO_DATA.expanded.t;
      let period='all',sort='familiar',query='',current=0;
      const list=$('#taxa-list');

      // Load favorites from API if logged in, else localStorage
      let favorites=[];
      try {
        const favData=await API.get('/api/favorites');
        favorites=favData.favorites||[];
      } catch {
        favorites=lstore.get('dinocademy-favorites',[]);
      }

      function render(){
        let arr=taxa.map((x,i)=>({...x,_i:i})).filter(x=>period==='all'||String(x.period).toLowerCase().includes(period.toLowerCase())).filter(x=>`${x.common} ${x.scientific} ${x.clade}`.toLowerCase().includes(query.toLowerCase()));
        if(sort==='az')arr.sort((a,b)=>a.common.localeCompare(b.common,'pl'));
        if(sort==='za')arr.sort((a,b)=>b.common.localeCompare(a.common,'pl'));
        if(sort==='oldest')arr.sort((a,b)=>b.ageMya-a.ageMya);
        if(sort==='newest')arr.sort((a,b)=>a.ageMya-b.ageMya);
        list.innerHTML=arr.map(x=>`<button class="taxon-record ${x._i===current?'active':''}" type="button" data-i="${x._i}"><span class="taxon-thumb"><img src="${x.image.replace(/^\//,'')}" alt="" loading="lazy"></span><div><strong>${esc(x.common)}</strong><small><i>${esc(x.scientific)}</i> · ${esc(x.clade)}</small><p>${esc(x.feature)}</p></div><span>→</span></button>`).join('');
        $('#taxa-count').textContent=`${arr.length} rekordów`;
        $$('.taxon-record',list).forEach(b=>b.addEventListener('click',()=>select(+b.dataset.i)));
      }

      function select(i){
        current=i;
        const x=taxa[i];
        $('#taxon-detail-img').src=x.image.replace(/^\//,'');
        $('#taxon-detail-img').alt='Rekonstrukcja: '+x.scientific;
        $('#taxon-detail-clade').textContent=x.clade;
        $('#taxon-detail-common').textContent=x.common;
        $('#taxon-detail-scientific').textContent=x.scientific;
        $('#taxon-detail-period').textContent=x.period;
        $('#taxon-detail-countries').textContent=x.countries.join(', ');
        $('#taxon-detail-diet').textContent=x.diet;
        $('#taxon-detail-size').textContent=`ok. ${x.lengthM} m`;
        $('#taxon-detail-feature').textContent=x.feature;
        $('#taxon-detail-habitat').textContent=x.habitat;
        $('#taxon-detail-defense').textContent=x.defense;
        updateFav();
        render();
      }

      $('#taxa-search').addEventListener('input',e=>{query=e.target.value;render()});
      $('#taxa-sort').addEventListener('change',e=>{sort=e.target.value;render()});
      $$('#period-filter button').forEach(b=>b.addEventListener('click',()=>{
        $$('#period-filter button').forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        period=b.dataset.period;
        render();
      }));

      async function toggleFavorite(id){
        try {
          const data=await API.post('/api/favorites/toggle',{taxon_id:id});
          if(data.active) favorites.push(id); else favorites=favorites.filter(x=>x!==id);
        } catch {
          // Fallback to localStorage
          favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];
          lstore.set('dinocademy-favorites',favorites);
        }
        updateFav();
      }

      function updateFav(){
        const id=taxa[current].id;
        $('#favorite-button').textContent=favorites.includes(id)?'★ W ulubionych':'☆ Dodaj do ulubionych';
      }

      $('#favorite-button').addEventListener('click',()=>toggleFavorite(taxa[current].id));
      render();
      select(0);
    })();
  }

  // Notebook
  if(document.body.dataset.page==='notatnik'){
    (async()=>{
      const inp=$('#note-input'), list=$('#notes-list');
      const loggedIn = currentUser !== null;

      if(!loggedIn) {
        list.innerHTML='<p style="margin-top:24px;opacity:.65">Zaloguj się, aby zapisywać notatki na koncie.</p>';
        $('#save-note').addEventListener('click',()=>{ location.href='logowanie.html?next=/notatnik'; });
        return;
      }

      async function draw(){
        try {
          const data=await API.get('/api/notes');
          const notes=data.notes||[];
          list.innerHTML=notes.length?notes.map((x,i)=>`<article class="note-card"><button data-del="${x.id}" aria-label="Usuń">×</button><small>${new Date(x.created_at).toLocaleString('pl-PL')}</small><p>${esc(x.text)}</p></article>`).join(''):'<p style="margin-top:24px;opacity:.65">Brak wpisów. Zapisz pierwszą obserwację.</p>';
          $$('[data-del]',list).forEach(b=>b.addEventListener('click',async()=>{
            await API.del('/api/notes/'+b.dataset.del);
            draw();
          }));
        } catch {
          list.innerHTML='<p style="margin-top:24px;opacity:.65">Nie udało się wczytać notatek.</p>';
        }
      }

      $('#save-note').addEventListener('click',async()=>{
        const t=inp.value.trim();
        if(!t)return;
        try {
          await API.post('/api/notes',{text:t});
          inp.value='';
          draw();
        } catch(err) {
          alert(err.message||'Błąd zapisu');
        }
      });

      draw();
    })();
  }

  // Game scores
  async function addScore(game,score){
    try {
      await API.post('/api/scores',{game,score});
    } catch {
      // Fallback to localStorage if not logged in
      const arr=lstore.get('dinocademy-scores',[]);
      arr.push({name:currentUser?.name||'Gość',game,score,ts:Date.now()});
      lstore.set('dinocademy-scores',arr.slice(-100));
    }
  }

  // Ranking
  if(document.body.dataset.page==='ranking'){
    (async()=>{
      async function drawRank(){
        const box=$('#ranking-table');
        try {
          const data=await API.get('/api/scores');
          const a=(data.scores||[]).slice(0,20);
          box.innerHTML='<div class="ranking-row head"><span>#</span><span>Gracz / tryb</span><span>Wynik</span><span>Data</span></div>'+
            (a.length?a.map((x,i)=>`<div class="ranking-row"><b>${i+1}</b><span>${esc(x.player_name)} · ${esc(x.game)}</span><strong>${x.score}</strong><span>${new Date(x.last_played).toLocaleString('pl-PL')}</span></div>`).join(''):'<p style="padding:24px 0;opacity:.65">Brak wyników. Zagraj w jedną z gier.</p>');
        } catch {
          // Fallback to localStorage
          const a=lstore.get('dinocademy-scores',[]).sort((x,y)=>y.score-x.score).slice(0,20);
          box.innerHTML='<div class="ranking-row head"><span>#</span><span>Gracz / tryb</span><span>Wynik</span><span>Data</span></div>'+
            (a.length?a.map((x,i)=>`<div class="ranking-row"><b>${i+1}</b><span>${esc(x.name)} · ${esc(x.game)}</span><strong>${x.score}</strong><span>${new Date(x.ts).toLocaleString('pl-PL')}</span></div>`).join(''):'<p style="padding:24px 0;opacity:.65">Brak wyników. Zagraj w jedną z gier.</p>');
        }
      }

      drawRank();

      $('#clear-ranking').addEventListener('click',async()=>{
        try {
          await API.del('/api/scores');
        } catch {
          lstore.set('dinocademy-scores',[]);
        }
        drawRank();
      });
    })();
  }

  // Games are handled by game-kit.js + games-core.js + games-advanced.js

  // Pro page
  if(document.body.dataset.page==='pro'){
    $$('.pricing-page a.button').forEach(a=>{
      if(a.textContent.toLowerCase().includes('zakup'))a.addEventListener('click',e=>{e.preventDefault();alert('Płatności nie są dostępne w odzyskanej wersji lokalnej.')});
    });
  }

  function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

  // Initialize auth on every page
  initAuth();
})();
