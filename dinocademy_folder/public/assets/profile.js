(function(){
  if(document.body.dataset.page !== 'profil') return;
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const API_BASE = '__PORT_3000__'.includes('PORT') ? '' : '__PORT_3000__';
  const token = localStorage.getItem('dinocademy-token');
  if(!token) { location.href='logowanie.html?next=/profil'; return; }

  const AVATARS = [
    {id:'trex',name:'Tyranozaur',img:'/memory/trex.webp'},
    {id:'triceratops',name:'Triceratops',img:'/memory/triceratops.webp'},
    {id:'stegosaurus',name:'Stegozaur',img:'/memory/stegosaurus.webp'},
    {id:'velociraptor',name:'Welociraptor',img:'/memory/velociraptor.webp'},
    {id:'ankylosaurus',name:'Ankylozaur',img:'/memory/ankylosaurus.webp'},
    {id:'spinosaurus',name:'Spinozaur',img:'/memory/spinosaurus.webp'},
    {id:'therizinosaurus',name:'Therizinozaur',img:'/memory/therizinosaurus.webp'},
    {id:'diplodocus',name:'Diplodok',img:'/memory/diplodocus.webp'}
  ];

  const COUNTRIES = [
    {code:'PL',name:'Polska',flag:'🇵🇱'},{code:'US',name:'Stany Zjednoczone',flag:'🇺🇸'},
    {code:'GB',name:'Wielka Brytania',flag:'🇬🇧'},{code:'DE',name:'Niemcy',flag:'🇩🇪'},
    {code:'FR',name:'Francja',flag:'🇫🇷'},{code:'CN',name:'Chiny',flag:'🇨🇳'},
    {code:'AR',name:'Argentyna',flag:'🇦🇷'},{code:'BR',name:'Brazylia',flag:'🇧🇷'},
    {code:'CA',name:'Kanada',flag:'🇨🇦'},{code:'AU',name:'Australia',flag:'🇦🇺'},
    {code:'JP',name:'Japonia',flag:'🇯🇵'},{code:'IT',name:'Włochy',flag:'🇮🇹'},
    {code:'ES',name:'Hiszpania',flag:'🇪🇸'},{code:'RU',name:'Rosja',flag:'🇷🇺'},
    {code:'MX',name:'Meksyk',flag:'🇲🇽'},{code:'ZA',name:'RPA',flag:'🇿🇦'},
    {code:'MN',name:'Mongolia',flag:'🇲🇳'},{code:'PT',name:'Portugalia',flag:'🇵🇹'},
    {code:'NL',name:'Holandia',flag:'🇳🇱'},{code:'CZ',name:'Czechy',flag:'🇨🇿'}
  ];

  async function api(path, method='GET', body=null) {
    const opts = { method, headers: {'X-Session-Token': token, 'Content-Type': 'application/json'}, credentials: 'same-origin' };
    if(body) opts.body = JSON.stringify(body);
    const r = await fetch(API_BASE + path, opts);
    if(!r.ok) throw new Error((await r.json().catch(()=>({error:'Błąd'}))).error);
    return r.json();
  }

  function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

  async function load() {
    try {
      const profile = await api('/api/profile');
      const activity = await api('/api/activity');
      renderProfile(profile, activity.activity || []);
    } catch(e) {
      $('#profile-page').innerHTML = `<p style="padding:40px;text-align:center">Błąd: ${esc(e.message)}. <a href="logowanie.html">Zaloguj się ponownie</a></p>`;
    }
  }

  function renderProfile(p, activity) {
    const pct = p.xpRange > 0 ? Math.round((p.xpProgress / p.xpRange) * 100) : 100;
    const avatar = AVATARS.find(a=>a.id===p.avatar) || AVATARS[0];

    $('#profile-page').innerHTML = `
      <div class="profile-header">
        <div class="profile-level-card">
          <div class="profile-level-icon">⭐</div>
          <div class="profile-level-body">
            <small>LVL ${p.level}</small>
            <h2>${esc(p.levelTitle)}</h2>
            <strong>${p.xp} XP</strong>
            <div class="profile-progress-bar"><i style="width:${pct}%"></i></div>
            <small>${p.xpToNext} XP do kolejnego poziomu</small>
          </div>
          <a class="quiet-link" href="ranking.html">Ranking Pro →</a>
        </div>
      </div>

      <div class="profile-grid">
        <section class="recovery-lesson-card" style="padding:24px">
          <header><small>USTAWIENIA</small></header>
          <h3>Skąd jesteś?</h3>
          <p style="opacity:.7;font-size:14px">Wybierz kraj, aby zaznaczać dinozaury z Twojego regionu.</p>
          <label style="display:block;margin-top:16px">
            <span style="font-size:12px;opacity:.6">Kraj profilu</span>
            <select id="profile-country" style="width:100%;padding:8px;margin-top:4px">
              ${COUNTRIES.map(c=>`<option value="${c.code}" ${c.code===p.country?'selected':''}>${c.flag} ${c.name}</option>`).join('')}
            </select>
          </label>
          <button class="button" id="save-country" style="margin-top:12px">Zapisz kraj</button>
        </section>

        <section class="recovery-lesson-card" style="padding:24px">
          <header><small>OSTATNIE XP</small></header>
          <h3>Ślad aktywności</h3>
          ${activity.length ? activity.map(a=>`
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(0,0,0,.06)">
              <span>${esc(a.label)} ${a.score?`(${a.score} pkt)`:''}</span>
              <strong style="color:#2a7">+${a.xp} XP</strong>
            </div>
          `).join('') : '<p style="opacity:.6">Brak aktywności. Zagraj w grę lub ukończ lekcję.</p>'}
        </section>
      </div>

      <section class="recovery-lesson-card" style="padding:24px;margin-top:24px">
        <header><small>DANE KONTA</small></header>
        <h3>Ustawienia profilu i logowania</h3>
        <div class="profile-grid" style="margin-top:16px">
          <div>
            <h4>Profil publiczny</h4>
            <label><span>Nazwa profilu</span><input id="profile-name" value="${esc(p.name)}" maxlength="40" style="width:100%;padding:8px"/></label>
            <p style="margin-top:12px;font-size:13px;opacity:.7">Avatar</p>
            <div class="avatar-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:8px">
              ${AVATARS.map(a=>`<button class="avatar-choice ${a.id===p.avatar?'active':''}" data-avatar="${a.id}" style="border:2px solid ${a.id===p.avatar?'var(--accent,#1f4e79)':'transparent'};border-radius:8px;padding:4px;background:none;cursor:pointer;text-align:center">
                <img src="${a.img.replace(/^\//,'')}" alt="${esc(a.name)}" style="width:100%;border-radius:4px"/>
                <small style="display:block;font-size:10px">${esc(a.name)}</small>
              </button>`).join('')}
            </div>
            <button class="button" id="save-profile-btn" style="margin-top:12px">Zapisz profil</button>
          </div>
          <div>
            <h4>Adres e-mail</h4>
            <label><span>Nowy e-mail</span><input id="new-email" value="${esc(p.email)}" type="email" style="width:100%;padding:8px"/></label>
            <label style="margin-top:8px"><span>Obecne hasło</span><input id="email-password" type="password" style="width:100%;padding:8px"/></label>
            <button class="button" id="change-email-btn" style="margin-top:12px">Zmień e-mail</button>
          </div>
          <div>
            <h4>Nowe hasło</h4>
            <label><span>Obecne hasło</span><input id="current-pw" type="password" style="width:100%;padding:8px"/></label>
            <label style="margin-top:8px"><span>Nowe hasło</span><input id="new-pw" type="password" minlength="8" style="width:100%;padding:8px"/></label>
            <label style="margin-top:8px"><span>Powtórz nowe hasło</span><input id="repeat-pw" type="password" style="width:100%;padding:8px"/></label>
            <button class="button" id="change-pw-btn" style="margin-top:12px">Zmień hasło</button>
          </div>
        </div>
      </section>
    `;

    // Event handlers
    $('#save-country')?.addEventListener('click', async () => {
      try { await api('/api/profile/country', 'POST', {country: $('#profile-country').value}); alert('Kraj zapisany'); } catch(e) { alert(e.message); }
    });

    $$('.avatar-choice').forEach(btn => btn.addEventListener('click', async () => {
      try { await api('/api/profile/avatar', 'POST', {avatar: btn.dataset.avatar}); $$('.avatar-choice').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); } catch(e) { alert(e.message); }
    }));

    $('#save-profile-btn')?.addEventListener('click', async () => {
      try { await api('/api/profile/name', 'POST', {name: $('#profile-name').value}); alert('Profil zapisany'); } catch(e) { alert(e.message); }
    });

    $('#change-email-btn')?.addEventListener('click', async () => {
      try { await api('/api/profile/email', 'POST', {email: $('#new-email').value, password: $('#email-password').value}); alert('E-mail zmieniony'); } catch(e) { alert(e.message); }
    });

    $('#change-pw-btn')?.addEventListener('click', async () => {
      const npw = $('#new-pw').value, rpw = $('#repeat-pw').value;
      if(npw !== rpw) { alert('Hasła nie są zgodne'); return; }
      if(npw.length < 8) { alert('Hasło min. 8 znaków'); return; }
      try { await api('/api/profile/password', 'POST', {currentPassword: $('#current-pw').value, newPassword: npw}); alert('Hasło zmienione'); } catch(e) { alert(e.message); }
    });
  }

  load();
})();
