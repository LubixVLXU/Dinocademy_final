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

  // Krajowe zestawy dinozaurów — znaleziska powiązane z regionem/kraju profilu.
  // Dla Polski uwzględniamy realne polskie znaleziska (Silesaurus, Smok, Lisowicia)
  // korzystając z obrazów już dostępnych w encyklopedii/kursie.
  const COUNTRY_DINOS = {
    PL: [
      {id:'silesaurus', name:'Silezaur', latin:'Silesaurus opolensis', img:'encyclopedia/silesaurus.webp', note:'Odkryty w Krasiejowie na Opolszczyźnie — jeden z najsłynniejszych triasowych znalezisk w Polsce.'},
    ],
    US: [
      {id:'trex', name:'Tyranozaur', latin:'Tyrannosaurus rex', img:'memory/trex.webp', note:'Formacja Hell Creek, Montana/Dakota.'},
      {id:'triceratops', name:'Triceratops', latin:'Triceratops horridus', img:'memory/triceratops.webp', note:'Późna kreda Ameryki Północnej.'},
      {id:'stegosaurus', name:'Stegozaur', latin:'Stegosaurus stenops', img:'memory/stegosaurus.webp', note:'Formacja Morrison.'}
    ],
    MN: [
      {id:'velociraptor', name:'Welociraptor', latin:'Velociraptor mongoliensis', img:'memory/velociraptor.webp', note:'Pustynia Gobi, Mongolia.'},
      {id:'therizinosaurus', name:'Terizinozaur', latin:'Therizinosaurus cheloniformis', img:'memory/therizinosaurus.webp', note:'Późna kreda Mongolii.'}
    ],
    ES: [
      {id:'concavenator', name:'Concavenator', latin:'Concavenator corcovatus', img:'memory/concavenator.webp', note:'Las Hoyas, Hiszpania.'}
    ],
    AT: [
      {id:'struthiosaurus', name:'Strutiozaur', latin:'Struthiosaurus austriacus', img:'memory/struthiosaurus.webp', note:'Pierwsze szczątki opisane z Austrii.'}
    ],
    AR: [
      {id:'bajadasaurus', name:'Bajadasaurus', latin:'Bajadasaurus pronuspinax', img:'memory/bajadasaurus.webp', note:'Wczesnokredowe skały Argentyny.'}
    ],
    CN: [
      {id:'yi', name:'Yi qi', latin:'Yi qi', img:'memory/yi.webp', note:'Jura, Chiny.'},
      {id:'qianzhousaurus', name:'Qianzhousaurus', latin:'Qianzhousaurus sinensis', img:'memory/qianzhousaurus.webp', note:'Chiny.'}
    ]
  };

  // Kolory i liczba gwiazdek zależne od poziomu — im wyżej, tym bardziej "legendarny" wygląd.
  function levelTier(level){
    if(level >= 13) return {stars:5, color:'#c9962c', glow:'rgba(201,150,44,.45)', label:'Legenda'};
    if(level >= 10) return {stars:4, color:'#8b46c9', glow:'rgba(139,70,201,.4)', label:'Mistrz'};
    if(level >= 7)  return {stars:3, color:'#2f7fbf', glow:'rgba(47,127,191,.38)', label:'Ekspert'};
    if(level >= 4)  return {stars:2, color:'#2f8a5b', glow:'rgba(47,138,91,.35)', label:'Badacz'};
    return {stars:1, color:'#7d8a97', glow:'rgba(125,138,151,.3)', label:'Nowicjusz'};
  }

  function starsHtml(tier){
    let out = '';
    for(let i=0;i<5;i++){
      out += `<span class="lvl-star ${i<tier.stars?'is-on':''}" style="${i<tier.stars?`color:${tier.color}`:''}">★</span>`;
    }
    return out;
  }

  // ---- Seria dziennych lekcji (streak) ----
  const STREAK_KEY = 'dinocademy-streak';
  function loadStreakLocal(){
    try { return JSON.parse(localStorage.getItem(STREAK_KEY)) || {count:0,last:null}; }
    catch(e){ return {count:0,last:null}; }
  }
  function saveStreakLocal(v){ localStorage.setItem(STREAK_KEY, JSON.stringify(v)); }

  function todayStr(){ return new Date().toISOString().slice(0,10); }
  function daysBetween(a,b){ return Math.round((new Date(b) - new Date(a)) / 86400000); }

  function computeStreakFromActivity(activity){
    // Fallback: liczymy serię na podstawie dat aktywności (lekcje/gry) zwróconych z API.
    const days = new Set(activity.map(a => (a.date||'').slice(0,10)).filter(Boolean));
    const local = loadStreakLocal();
    const today = todayStr();
    days.add(today && local.last === today ? today : null);
    let count = 0;
    let cursor = today;
    // dzień dzisiejszy liczy się jeśli była aktywność dziś LUB lokalny licznik już go zaznaczył
    let d = new Date();
    while(true){
      const key = d.toISOString().slice(0,10);
      if(days.has(key) || (key===today && local.last===today)){
        count++;
        d.setDate(d.getDate()-1);
      } else break;
    }
    return count;
  }

  function markTodayActive(){
    const local = loadStreakLocal();
    const today = todayStr();
    if(local.last === today) return local;
    if(local.last && daysBetween(local.last, today) === 1){
      local.count = (local.count||0) + 1;
    } else {
      local.count = 1;
    }
    local.last = today;
    saveStreakLocal(local);
    return local;
  }

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
      let favorites = [];
      try { const f = await api('/api/favorites'); favorites = f.favorites || []; } catch(e){}
      // Aktualizuj serię dzienną, jeśli użytkownik jest aktywny na profilu.
      const localStreak = markTodayActive();
      const streakDays = Math.max(localStreak.count, computeStreakFromActivity(activity.activity||[]));
      renderProfile(profile, activity.activity || [], favorites, streakDays);
    } catch(e) {
      $('#profile-page').innerHTML = `<p style="padding:40px;text-align:center">Błąd: ${esc(e.message)}. <a href="logowanie.html">Zaloguj się ponownie</a></p>`;
    }
  }

  function dinoLookup(id){
    const list = (window.DINO_DATA && window.DINO_DATA.dino && window.DINO_DATA.dino.e) || [];
    return list.find(d => d.id === id);
  }

  function favoritesHtml(favorites){
    if(!favorites.length){
      return `<p class="profile-empty">Nie masz jeszcze ulubionych taksonów. Odwiedź <a href="encyklopedia.html">encyklopedię</a> i kliknij „Dodaj do ulubionych”.</p>`;
    }
    return `<div class="fav-grid">${favorites.map(id => {
      const d = dinoLookup(id);
      if(!d) return `<div class="fav-card"><strong>${esc(id)}</strong></div>`;
      return `<a class="fav-card" href="encyklopedia.html">
        <img src="${d.image.replace(/^\//,'')}" alt="${esc(d.common)}"/>
        <strong>${esc(d.common)}</strong>
        <small><i>${esc(d.scientific)}</i></small>
      </a>`;
    }).join('')}</div>`;
  }

  function countryDinosHtml(countryCode){
    const list = COUNTRY_DINOS[countryCode];
    if(!list){
      return `<p class="profile-empty">Brak jeszcze udokumentowanych znalezisk z Twojego kraju w naszej bazie. Spróbuj wybrać inny kraj profilu lub przeglądaj <a href="encyklopedia.html">pełną encyklopedię</a>.</p>`;
    }
    return `<div class="fav-grid">${list.map(d => `
      <div class="fav-card">
        <img src="${d.img}" alt="${esc(d.name)}"/>
        <strong>${esc(d.name)}</strong>
        <small><i>${esc(d.latin)}</i></small>
        <p class="fav-note">${esc(d.note)}</p>
      </div>`).join('')}</div>`;
  }

  function renderProfile(p, activity, favorites, streakDays) {
    const pct = p.xpRange > 0 ? Math.round((p.xpProgress / p.xpRange) * 100) : 100;
    const avatar = AVATARS.find(a=>a.id===p.avatar) || AVATARS[0];
    const tier = levelTier(p.level);
    const country = COUNTRIES.find(c=>c.code===p.country) || COUNTRIES[0];

    $('#profile-page').innerHTML = `
      <div class="profile-top-row">
        <div class="profile-card-badge">
          <div class="profile-avatar-wrap">
            <img id="profile-avatar-img" src="${avatar.img.replace(/^\//,'')}" alt="${esc(avatar.name)}"/>
            <label class="avatar-upload-btn" title="Zmień zdjęcie profilowe">
              📷
              <input type="file" id="avatar-upload-input" accept="image/*" hidden/>
            </label>
          </div>
          <div class="profile-card-badge-body">
            <span class="profile-kicker">PROFIL BADACZA</span>
            <h1>${esc(p.name)}</h1>
            <p>${country.flag} ${esc(country.name)} · ${p.is_pro ? 'PRO' : 'Free'} · konto Dinocademy</p>
          </div>
        </div>
        <div class="streak-card">
          <div class="streak-flame">🔥</div>
          <div class="streak-count">${streakDays}</div>
          <div class="streak-label">dni serii</div>
          <small>Aktywność dzisiaj podtrzymuje serię. Bez powiadomień.</small>
        </div>
      </div>

      <div class="profile-level-card" style="--tier-color:${tier.color};--tier-glow:${tier.glow}">
        <div class="level-star-badge">
          <span class="level-star-icon" style="color:${tier.color}">★</span>
          <span class="level-star-num">${p.level}</span>
        </div>
        <div class="profile-level-body">
          <span class="profile-kicker">ŁOWCA SKAMIENIAŁOŚCI</span>
          <h2>${p.xp} XP</h2>
          <div class="lvl-stars-row">${starsHtml(tier)}<span class="lvl-tier-label">${tier.label}</span></div>
          <div class="profile-progress-bar"><i style="width:${pct}%;background:${tier.color}"></i></div>
          <small>${p.xpToNext} XP do kolejnego poziomu · każdy próg rośnie szybciej.</small>
        </div>
        <a class="quiet-link" href="ranking.html">Ranking Pro →</a>
      </div>

      <div class="profile-grid">
        <section class="recovery-lesson-card profile-section">
          <header><small>SKĄD JESTEŚ?</small></header>
          <h3>Twój kraj i lokalne dinozaury</h3>
          <p class="profile-section-sub">Wybierz kraj, aby zobaczyć znaleziska powiązane z Twoim regionem.</p>
          <label class="profile-field">
            <span>Kraj profilu</span>
            <select id="profile-country">
              ${COUNTRIES.map(c=>`<option value="${c.code}" ${c.code===p.country?'selected':''}>${c.flag} ${c.name}</option>`).join('')}
            </select>
          </label>
          <button class="button" id="save-country">Zapisz kraj</button>
          <div class="country-dinos" id="country-dinos">${countryDinosHtml(p.country)}</div>
        </section>

        <section class="recovery-lesson-card profile-section">
          <header><small>ULUBIONE</small></header>
          <h3>Twoje ulubione taksony</h3>
          <p class="profile-section-sub">Dodane z encyklopedii — kliknij ☆ przy dinozaurze, by go tu zobaczyć.</p>
          ${favoritesHtml(favorites)}
        </section>
      </div>

      <section class="recovery-lesson-card profile-section" style="margin-top:20px">
        <header><small>OSTATNIE XP</small></header>
        <h3>Ślad aktywności</h3>
        ${activity.length ? `<div class="activity-list">${activity.map(a=>`
          <div class="activity-row">
            <span>${esc(a.label)} ${a.score?`(${a.score} pkt)`:''}</span>
            <strong class="activity-xp">+${a.xp} XP</strong>
          </div>
        `).join('')}</div>` : '<p class="profile-empty">Brak aktywności. Zagraj w grę lub ukończ lekcję.</p>'}
      </section>

      <section class="recovery-lesson-card profile-section" style="margin-top:20px">
        <header><small>DANE KONTA</small></header>
        <h3>Ustawienia profilu i logowania</h3>
        <div class="profile-grid" style="margin-top:16px">
          <div>
            <h4>Profil publiczny</h4>
            <label class="profile-field"><span>Nazwa profilu</span><input id="profile-name" value="${esc(p.name)}" maxlength="40"/></label>
            <p class="profile-section-sub" style="margin-top:12px">Avatar</p>
            <div class="avatar-grid">
              ${AVATARS.map(a=>`<button class="avatar-choice ${a.id===p.avatar?'active':''}" data-avatar="${a.id}">
                <img src="${a.img.replace(/^\//,'')}" alt="${esc(a.name)}"/>
                <small>${esc(a.name)}</small>
              </button>`).join('')}
            </div>
            <button class="button" id="save-profile-btn" style="margin-top:12px">Zapisz profil</button>
          </div>
          <div>
            <h4>Adres e-mail</h4>
            <label class="profile-field"><span>Nowy e-mail</span><input id="new-email" value="${esc(p.email)}" type="email"/></label>
            <label class="profile-field" style="margin-top:8px"><span>Obecne hasło</span><input id="email-password" type="password"/></label>
            <button class="button" id="change-email-btn" style="margin-top:12px">Zmień e-mail</button>
          </div>
          <div>
            <h4>Nowe hasło</h4>
            <label class="profile-field"><span>Obecne hasło</span><input id="current-pw" type="password"/></label>
            <label class="profile-field" style="margin-top:8px"><span>Nowe hasło</span><input id="new-pw" type="password" minlength="8"/></label>
            <label class="profile-field" style="margin-top:8px"><span>Powtórz nowe hasło</span><input id="repeat-pw" type="password"/></label>
            <button class="button" id="change-pw-btn" style="margin-top:12px">Zmień hasło</button>
          </div>
        </div>
      </section>
    `;

    // ---- Event handlers ----
    $('#save-country')?.addEventListener('click', async () => {
      const code = $('#profile-country').value;
      try {
        await api('/api/profile/country', 'POST', {country: code});
        $('#country-dinos').innerHTML = countryDinosHtml(code);
        alert('Kraj zapisany');
      } catch(e) { alert(e.message); }
    });

    $$('.avatar-choice').forEach(btn => btn.addEventListener('click', async () => {
      try {
        await api('/api/profile/avatar', 'POST', {avatar: btn.dataset.avatar});
        $$('.avatar-choice').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const chosen = AVATARS.find(a=>a.id===btn.dataset.avatar);
        if(chosen) $('#profile-avatar-img').src = chosen.img.replace(/^\//,'');
      } catch(e) { alert(e.message); }
    }));

    // Działające zdjęcie profilowe: podgląd natychmiastowy + zapis jako custom avatar (data URL w localStorage).
    $('#avatar-upload-input')?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if(!file) return;
      if(file.size > 2*1024*1024){ alert('Zdjęcie jest za duże (max 2MB).'); return; }
      const reader = new FileReader();
      reader.onload = () => {
        $('#profile-avatar-img').src = reader.result;
        localStorage.setItem('dinocademy-custom-avatar', reader.result);
      };
      reader.readAsDataURL(file);
    });

    // Jeśli użytkownik ma wcześniej zapisane zdjęcie profilowe lokalnie, użyj go.
    const customAvatar = localStorage.getItem('dinocademy-custom-avatar');
    if(customAvatar) $('#profile-avatar-img').src = customAvatar;

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
