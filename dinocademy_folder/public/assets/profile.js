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
    {code:'NL',name:'Holandia',flag:'🇳🇱'},{code:'CZ',name:'Czechy',flag:'🇨🇿'},
    {code:'AT',name:'Austria',flag:'🇦🇹'}
  ];

  const COUNTRY_DINOS = {
    PL: [
      {id:'silesaurus', name:'Silezaur', latin:'Silesaurus opolensis', img:'encyclopedia/silesaurus.webp', note:'Odkryty w Krasiejowie na Opolszczyźnie — jedno z najsłynniejszych triasowych znalezisk w Polsce.'}
    ],
    US: [
      {id:'trex', name:'Tyranozaur', latin:'Tyrannosaurus rex', img:'memory/trex.webp', note:'Formacja Hell Creek, Montana/Dakota.'},
      {id:'triceratops', name:'Triceratops', latin:'Triceratops horridus', img:'memory/triceratops.webp', note:'Późna kreda Ameryki Północnej.'},
      {id:'stegosaurus', name:'Stegozaur', latin:'Stegosaurus stenops', img:'memory/stegosaurus.webp', note:'Formacja Morrison.'},
      {id:'diplodocus', name:'Diplodok', latin:'Diplodocus carnegii', img:'memory/diplodocus.webp', note:'Formacja Morrison, USA.'},
      {id:'ankylosaurus', name:'Ankylozaur', latin:'Ankylosaurus magniventris', img:'memory/ankylosaurus.webp', note:'Koniec kredy, Ameryka Północna.'},
      {id:'anzu', name:'Anzu', latin:'Anzu wyliei', img:'memory/anzu.webp', note:'Formacja Hell Creek.'}
    ],
    MN: [
      {id:'velociraptor', name:'Welociraptor', latin:'Velociraptor mongoliensis', img:'memory/velociraptor.webp', note:'Pustynia Gobi, Mongolia.'},
      {id:'therizinosaurus', name:'Terizinozaur', latin:'Therizinosaurus cheloniformis', img:'memory/therizinosaurus.webp', note:'Późna kreda Mongolii.'},
      {id:'yi', name:'Yi qi', latin:'Yi qi', img:'memory/yi.webp', note:'Jura, region graniczący z Mongolią.'},
      {id:'linhenykus', name:'Linhenykus', latin:'Linhenykus monodactylus', img:'memory/linhenykus.webp', note:'Późna kreda Mongolii.'},
      {id:'natovenator', name:'Natovenator', latin:'Natovenator polydontus', img:'memory/natovenator.webp', note:'Późna kreda Mongolii.'}
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
      {id:'qianzhousaurus', name:'Qianzhousaurus', latin:'Qianzhousaurus sinensis', img:'memory/qianzhousaurus.webp', note:'Chiny.'},
      {id:'linhenykus', name:'Linhenykus', latin:'Linhenykus monodactylus', img:'memory/linhenykus.webp', note:'Chiny.'}
    ]
  };

  function levelTier(level){
    if(level >= 13) return {stars:5, color:'#c9962c', glow:'rgba(201,150,44,.45)', label:'Legenda'};
    if(level >= 10) return {stars:4, color:'#8b46c9', glow:'rgba(139,70,201,.4)', label:'Mistrz'};
    if(level >= 7)  return {stars:3, color:'#2f7fbf', glow:'rgba(47,127,191,.38)', label:'Ekspert'};
    if(level >= 4)  return {stars:2, color:'#2f8a5b', glow:'rgba(47,138,91,.35)', label:'Badacz'};
    return {stars:1, color:'#7d8a97', glow:'rgba(125,138,151,.3)', label:'Nowicjusz'};
  }

  function starsHtml(tier){
    let out = '';
    for(let i=0;i<5;i++) out += `<span class="pf-star ${i<tier.stars?'is-on':''}">★</span>`;
    return out;
  }

  const STREAK_KEY = 'dinocademy-streak';
  function loadStreakLocal(){ try{ return JSON.parse(localStorage.getItem(STREAK_KEY)) || {count:0,last:null}; } catch(e){ return {count:0,last:null}; } }
  function saveStreakLocal(v){ localStorage.setItem(STREAK_KEY, JSON.stringify(v)); }
  function todayStr(){ return new Date().toISOString().slice(0,10); }
  function daysBetween(a,b){ return Math.round((new Date(b) - new Date(a)) / 86400000); }

  function computeStreakFromActivity(activity){
    const days = new Set(activity.map(a => (a.date||'').slice(0,10)).filter(Boolean));
    const local = loadStreakLocal();
    const today = todayStr();
    let count = 0;
    let d = new Date();
    while(true){
      const key = d.toISOString().slice(0,10);
      if(days.has(key) || (key===today && local.last===today)){ count++; d.setDate(d.getDate()-1); }
      else break;
    }
    return count;
  }

  function markTodayActive(){
    const local = loadStreakLocal();
    const today = todayStr();
    if(local.last === today) return local;
    if(local.last && daysBetween(local.last, today) === 1) local.count = (local.count||0) + 1;
    else local.count = 1;
    local.last = today;
    saveStreakLocal(local);
    return local;
  }

  function weekStrip(streakDays){
    const today = new Date();
    const localLast = loadStreakLocal().last;
    let cells = '';
    for(let i=6;i>=0;i--){
      const d = new Date(today); d.setDate(d.getDate()-i);
      const key = d.toISOString().slice(0,10);
      const isToday = i===0;
      const isActive = i < streakDays || (isToday && localLast===key);
      cells += `<span class="pf-streak-day ${isActive?'is-active':''} ${isToday?'is-today':''}" title="${key}">${isActive?'✓':''}</span>`;
    }
    return cells;
  }

  async function api(path, method='GET', body=null) {
    const opts = { method, headers: {'X-Session-Token': token, 'Content-Type': 'application/json'}, credentials: 'same-origin' };
    if(body) opts.body = JSON.stringify(body);
    const r = await fetch(API_BASE + path, opts);
    if(!r.ok) throw new Error((await r.json().catch(()=>({error:'Błąd'}))).error);
    return r.json();
  }

  function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

  function dinoLookup(id){
    const list = (window.DINO_DATA && window.DINO_DATA.dino && window.DINO_DATA.dino.e) || [];
    return list.find(d => d.id === id);
  }

  function favoritesHtml(favorites){
    if(!favorites.length){
      return `<div class="pf-empty"><span class="pf-empty-icon">☆</span><p>Nie masz jeszcze ulubionych taksonów.<br/>Odwiedź <a href="encyklopedia.html">encyklopedię</a> i dodaj pierwszy.</p></div>`;
    }
    return `<div class="pf-dino-grid">${favorites.map(id => {
      const d = dinoLookup(id);
      if(!d) return '';
      return `<a class="pf-dino-card" href="encyklopedia.html">
        <img src="${d.image.replace(/^\//,'')}" alt="${esc(d.common)}" loading="lazy"/>
        <span class="pf-dino-name">${esc(d.common)}</span>
        <span class="pf-dino-latin">${esc(d.scientific)}</span>
      </a>`;
    }).join('')}</div>`;
  }

  function countryDinosHtml(countryCode){
    const list = COUNTRY_DINOS[countryCode];
    if(!list){
      return `<div class="pf-empty"><span class="pf-empty-icon">🌍</span><p>Brak jeszcze udokumentowanych znalezisk z tego kraju.<br/>Przeglądaj <a href="encyklopedia.html">pełną encyklopedię</a>.</p></div>`;
    }
    return `<div class="pf-dino-grid">${list.map(d => `
      <div class="pf-dino-card">
        <img src="${d.img}" alt="${esc(d.name)}" loading="lazy"/>
        <span class="pf-dino-name">${esc(d.name)}</span>
        <span class="pf-dino-latin">${esc(d.latin)}</span>
        <span class="pf-dino-note">${esc(d.note)}</span>
      </div>`).join('')}</div>`;
  }

  async function load() {
    try {
      const profile = await api('/api/profile');
      const activity = await api('/api/activity');
      let favorites = [];
      try { const f = await api('/api/favorites'); favorites = f.favorites || []; } catch(e){}
      const localStreak = markTodayActive();
      const streakDays = Math.max(localStreak.count, computeStreakFromActivity(activity.activity || []));
      renderProfile(profile, activity.activity || [], favorites, streakDays);
    } catch(e) {
      $('#profile-page').innerHTML = `<div class="profile-shell"><div class="pf-card"><p>Błąd: ${esc(e.message)}. <a href="logowanie.html">Zaloguj się ponownie</a></p></div></div>`;
    }
  }

  function renderProfile(p, activity, favorites, streakDays) {
    const pct = p.xpRange > 0 ? Math.round((p.xpProgress / p.xpRange) * 100) : 100;
    const avatar = AVATARS.find(a=>a.id===p.avatar) || AVATARS[0];
    const tier = levelTier(p.level);
    const country = COUNTRIES.find(c=>c.code===p.country) || COUNTRIES[0];
    const isCold = streakDays === 0;

    $('#profile-page').innerHTML = `
    <div class="profile-shell">

      <div class="pf-hero">
        <div class="pf-avatar-wrap">
          <img id="pf-avatar-img" src="${avatar.img.replace(/^\//,'')}" alt="${esc(avatar.name)}"/>
          <label class="pf-avatar-upload" title="Zmień zdjęcie profilowe">📷<input type="file" id="pf-avatar-input" accept="image/*" hidden/></label>
        </div>
        <div class="pf-identity">
          <span class="pf-kicker">Profil badacza</span>
          <h1 class="pf-name">${esc(p.name)}</h1>
          <div class="pf-meta">
            <span>${country.flag} ${esc(country.name)}</span>
            <span class="pf-dot">·</span>
            <span class="${p.is_pro ? 'pf-pro-badge' : ''}">${p.is_pro ? 'PRO' : 'Free'}</span>
            <span class="pf-dot">·</span>
            <span>konto Dinocademy</span>
          </div>
        </div>
        <div class="pf-streak ${isCold?'is-cold':''}">
          <span class="pf-streak-flame">${isCold?'💤':'🔥'}</span>
          <span class="pf-streak-num">${streakDays}</span>
          <span class="pf-streak-label">${streakDays===1?'dzień serii':'dni serii'}</span>
          <div class="pf-streak-week">${weekStrip(streakDays)}</div>
        </div>
      </div>

      <div class="pf-level" style="--tier-color:${tier.color};--tier-glow:${tier.glow}">
        <div class="pf-star-badge">
          <span class="pf-star-icon">★</span>
          <span class="pf-star-num">${p.level}</span>
        </div>
        <div class="pf-level-stats">
          <span class="pf-level-kicker">Łowca skamieniałości</span>
          <div class="pf-level-xp">${p.xp} XP</div>
          <div class="pf-stars-row">${starsHtml(tier)}<span class="pf-tier-label">${tier.label}</span></div>
          <div class="pf-bar"><i style="width:${pct}%"></i></div>
          <div class="pf-level-sub">${p.xpToNext} XP do kolejnego poziomu · każdy próg rośnie szybciej</div>
        </div>
        <a class="pf-level-link" href="ranking.html">Ranking Pro →</a>
      </div>

      <div class="pf-grid">
        <section class="pf-card pf-col-7">
          <div class="pf-card-head">
            <span class="pf-card-kicker">Skąd jesteś?</span>
            <h2 class="pf-card-title">Dinozaury z Twojego kraju</h2>
            <p class="pf-card-sub">Wybierz kraj, aby zobaczyć znaleziska powiązane z Twoim regionem.</p>
          </div>
          <label class="pf-field">
            <span>Kraj profilu</span>
            <select id="pf-country">
              ${COUNTRIES.map(c=>`<option value="${c.code}" ${c.code===p.country?'selected':''}>${c.flag} ${c.name}</option>`).join('')}
            </select>
          </label>
          <button class="pf-btn" id="pf-save-country">Zapisz kraj</button>
          <div id="pf-country-dinos">${countryDinosHtml(p.country)}</div>
        </section>

        <section class="pf-card pf-col-5">
          <div class="pf-card-head">
            <span class="pf-card-kicker">Ulubione</span>
            <h2 class="pf-card-title">Twój prywatny atlas</h2>
            <p class="pf-card-sub">Dodane z encyklopedii — kliknij ☆ przy dinozaurze.</p>
          </div>
          ${favoritesHtml(favorites)}
        </section>

        <section class="pf-card pf-col-12">
          <div class="pf-card-head">
            <span class="pf-card-kicker">Ostatnie XP</span>
            <h2 class="pf-card-title">Ślad aktywności</h2>
          </div>
          ${activity.length ? `<div class="pf-timeline">${activity.map(a=>`
            <div class="pf-timeline-row">
              <span>${esc(a.label)} ${a.score?`(${a.score} pkt)`:''}</span>
              <span class="pf-timeline-xp">+${a.xp} XP</span>
            </div>
          `).join('')}</div>` : `<div class="pf-empty"><span class="pf-empty-icon">📭</span><p>Brak aktywności. Zagraj w grę lub ukończ lekcję.</p></div>`}
        </section>

        <section class="pf-card pf-col-12">
          <div class="pf-card-head">
            <span class="pf-card-kicker">Dane konta</span>
            <h2 class="pf-card-title">Ustawienia profilu i logowania</h2>
          </div>
          <div class="pf-settings-grid">
            <div class="pf-settings-block">
              <h4>Profil publiczny</h4>
              <label class="pf-field"><span>Nazwa profilu</span><input id="pf-name" value="${esc(p.name)}" maxlength="40"/></label>
              <p class="pf-card-sub" style="margin-top:12px">Avatar</p>
              <div class="pf-avatar-grid">
                ${AVATARS.map(a=>`<button class="pf-avatar-choice ${a.id===p.avatar?'active':''}" data-avatar="${a.id}">
                  <img src="${a.img.replace(/^\//,'')}" alt="${esc(a.name)}"/>
                  <small>${esc(a.name)}</small>
                </button>`).join('')}
              </div>
              <button class="pf-btn" id="pf-save-profile">Zapisz profil</button>
            </div>
            <div class="pf-settings-block">
              <h4>Adres e-mail</h4>
              <label class="pf-field"><span>Nowy e-mail</span><input id="pf-email" value="${esc(p.email)}" type="email"/></label>
              <label class="pf-field"><span>Obecne hasło</span><input id="pf-email-pw" type="password"/></label>
              <button class="pf-btn pf-btn-ghost" id="pf-change-email">Zmień e-mail</button>
            </div>
            <div class="pf-settings-block">
              <h4>Nowe hasło</h4>
              <label class="pf-field"><span>Obecne hasło</span><input id="pf-current-pw" type="password"/></label>
              <label class="pf-field"><span>Nowe hasło</span><input id="pf-new-pw" type="password" minlength="8"/></label>
              <label class="pf-field"><span>Powtórz nowe hasło</span><input id="pf-repeat-pw" type="password"/></label>
              <button class="pf-btn pf-btn-ghost" id="pf-change-pw">Zmień hasło</button>
            </div>
          </div>
        </section>
      </div>
    </div>
    `;

    $('#pf-save-country')?.addEventListener('click', async () => {
      const code = $('#pf-country').value;
      try { await api('/api/profile/country', 'POST', {country: code}); $('#pf-country-dinos').innerHTML = countryDinosHtml(code); }
      catch(e) { alert(e.message); }
    });

    $$('.pf-avatar-choice').forEach(btn => btn.addEventListener('click', async () => {
      try {
        await api('/api/profile/avatar', 'POST', {avatar: btn.dataset.avatar});
        $$('.pf-avatar-choice').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const chosen = AVATARS.find(a=>a.id===btn.dataset.avatar);
        if(chosen) $('#pf-avatar-img').src = chosen.img.replace(/^\//,'');
        localStorage.removeItem('dinocademy-custom-avatar');
      } catch(e) { alert(e.message); }
    }));

    $('#pf-avatar-input')?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if(!file) return;
      if(file.size > 2*1024*1024){ alert('Zdjęcie jest za duże (max 2MB).'); return; }
      const reader = new FileReader();
      reader.onload = () => {
        $('#pf-avatar-img').src = reader.result;
        localStorage.setItem('dinocademy-custom-avatar', reader.result);
      };
      reader.readAsDataURL(file);
    });

    const customAvatar = localStorage.getItem('dinocademy-custom-avatar');
    if(customAvatar) $('#pf-avatar-img').src = customAvatar;

    $('#pf-save-profile')?.addEventListener('click', async () => {
      try { await api('/api/profile/name', 'POST', {name: $('#pf-name').value}); alert('Profil zapisany'); } catch(e) { alert(e.message); }
    });
    $('#pf-change-email')?.addEventListener('click', async () => {
      try { await api('/api/profile/email', 'POST', {email: $('#pf-email').value, password: $('#pf-email-pw').value}); alert('E-mail zmieniony'); } catch(e) { alert(e.message); }
    });
    $('#pf-change-pw')?.addEventListener('click', async () => {
      const npw = $('#pf-new-pw').value, rpw = $('#pf-repeat-pw').value;
      if(npw !== rpw) { alert('Hasła nie są zgodne'); return; }
      if(npw.length < 8) { alert('Hasło min. 8 znaków'); return; }
      try { await api('/api/profile/password', 'POST', {currentPassword: $('#pf-current-pw').value, newPassword: npw}); alert('Hasło zmienione'); } catch(e) { alert(e.message); }
    });
  }

  load();
})();
