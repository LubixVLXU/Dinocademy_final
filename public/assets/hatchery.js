/* ============================================================
   Wykluwarnia — jaja, inkubacja, kolekcja dinozaurów
   ============================================================ */
(function () {
  'use strict';

  var API_BASE = '__PORT_3000__'.indexOf('PORT') !== -1 ? '' : '__PORT_3000__';
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
  function token() { return localStorage.getItem('dinocademy-token') || null; }

  function api(path, method, body) {
    var headers = { 'Content-Type': 'application/json' };
    var t = token(); if (t) headers['X-Session-Token'] = t;
    return fetch(API_BASE + path, {
      method: method || 'GET', headers: headers, credentials: 'same-origin',
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) throw new Error(j.error || 'Błąd serwera');
        return j;
      });
    });
  }

  function dinoById(id) {
    var list = (window.DINO_DATA && window.DINO_DATA.dino && window.DINO_DATA.dino.e) || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function allPools() {
    return {
      common: ['trex', 'triceratops', 'stegosaurus', 'diplodocus', 'velociraptor', 'ankylosaurus'],
      rare: ['spinosaurus', 'therizinosaurus', 'anzu', 'concavenator', 'qianzhousaurus', 'struthiosaurus'],
      epic: ['yi', 'linhenykus', 'natovenator', 'bajadasaurus']
    };
  }
  var RARITY_LABEL = { common: 'Pospolite', rare: 'Rzadkie', epic: 'Wyjątkowe' };

  /* --- SVG jaja, kolor zależny od rzadkości --- */
  function eggSvg(rarity, ready) {
    var c = rarity === 'epic' ? ['#b47ae8', '#7a35b8'] : rarity === 'rare' ? ['#6fb6ec', '#22689f'] : ['#c9b79c', '#8c765a'];
    return '<svg class="hx-egg-svg' + (ready ? ' hx-egg-ready' : '') + '" viewBox="0 0 80 100" aria-hidden="true">' +
      '<defs><linearGradient id="g' + rarity + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + c[0] + '"/><stop offset="100%" stop-color="' + c[1] + '"/></linearGradient></defs>' +
      '<ellipse cx="40" cy="58" rx="32" ry="40" fill="url(#g' + rarity + ')"/>' +
      '<ellipse cx="29" cy="40" rx="9" ry="13" fill="#fff" opacity=".22"/>' +
      '<circle cx="27" cy="66" r="4" fill="#000" opacity=".10"/>' +
      '<circle cx="48" cy="76" r="5.5" fill="#000" opacity=".10"/>' +
      '<circle cx="52" cy="52" r="3.5" fill="#000" opacity=".10"/>' +
      (ready ? '<path d="M14 55 L26 48 L34 58 L44 47 L54 57 L66 50" stroke="#fff" stroke-width="2.6" fill="none" opacity=".85"/>' : '') +
      '</svg>';
  }

  var state = null;

  function render() {
    var root = $('#hatchery-root');
    if (!root || !state) return;
    var pools = allPools();
    var owned = {};
    state.collection.forEach(function (c) { owned[c.dino_id] = c; });

    var html = '';

    /* nagłówek */
    html += '<div class="hx-top">' +
      '<div><span class="app-kicker">WYKLUWARNIA</span><h1>Twoje gniazdo</h1>' +
      '<p>Za każdy zdobyty poziom otrzymujesz jajo. Jaja ogrzewają się XP z gier i lekcji — im rzadsze, tym więcej XP potrzebują.</p></div>' +
      '<div class="hx-stats">' +
      '<div class="hx-stat"><b>' + state.level + '</b><small>poziom</small></div>' +
      '<div class="hx-stat"><b>' + state.collected + '/' + state.totalDinos + '</b><small>kolekcja</small></div>' +
      '<div class="hx-stat"><b>' + state.eggsAvailable + '</b><small>jaja do odbioru</small></div>' +
      '</div></div>';

    /* odbierz jajo */
    html += '<section class="hx-claim">';
    if (state.eggsAvailable > 0) {
      html += '<p><strong>Masz ' + state.eggsAvailable + ' ' + (state.eggsAvailable === 1 ? 'nieodebrane jajo' : 'nieodebrane jaja') + '.</strong> Rzadkość jest losowa — wyższy poziom zwiększa szansę na wyjątkowe okazy.</p>' +
        '<button class="button" id="hx-claim-btn">Odbierz jajo</button>';
    } else {
      html += '<p>Wszystkie jaja odebrane. Zdobądź kolejny poziom, aby otrzymać następne.</p>';
    }
    html += '</section>';

    /* inkubator */
    html += '<section class="hx-section"><h2>Inkubator</h2>';
    if (!state.eggs.length) {
      html += '<p class="hx-muted">Inkubator jest pusty.</p>';
    } else {
      html += '<div class="hx-egg-grid">';
      state.eggs.forEach(function (e) {
        var pct = Math.round((e.warmth / e.required) * 100);
        html += '<article class="hx-egg hx-egg-' + esc(e.rarity) + (e.ready ? ' is-ready' : '') + '">' +
          eggSvg(e.rarity, e.ready) +
          '<span class="hx-rarity hx-rarity-' + esc(e.rarity) + '">' + esc(RARITY_LABEL[e.rarity] || e.rarity) + '</span>' +
          '<div class="hx-warm"><i style="width:' + pct + '%"></i></div>' +
          '<small>' + e.warmth + ' / ' + e.required + ' XP ciepła</small>' +
          (e.ready
            ? '<button class="button button-small hx-hatch" data-egg="' + e.id + '">Wyklul</button>'
            : '<small class="hx-muted">Brakuje ' + (e.required - e.warmth) + ' XP — zagraj w grę</small>') +
          (state.isAdmin ? '<button class="button button-small button-ghost hx-admin-hatch" data-egg="' + e.id + '">Wykluj jako admin</button>' : '') +
          '</article>';
      });
      html += '</div>';
    }
    html += '</section>';

    /* kolekcja */
    html += '<section class="hx-section"><h2>Kolekcja</h2>';
    ['common', 'rare', 'epic'].forEach(function (key) {
      var have = pools[key].filter(function (id) { return owned[id]; }).length;
      html += '<h3 class="hx-pool-head"><span class="hx-rarity hx-rarity-' + key + '">' + RARITY_LABEL[key] + '</span> ' + have + '/' + pools[key].length + '</h3>';
      html += '<div class="hx-collection">';
      pools[key].forEach(function (id) {
        var d = dinoById(id);
        var mine = owned[id];
        var name = d ? d.common : id;
        var sci = d ? d.scientific : '';
        var image = d ? String(d.image || '').replace(/^\//, '') : '';
        if (mine) {
          html += '<article class="hx-card is-owned" data-dino="' + esc(id) + '">' +
            '<div class="hx-card-img"><img src="' + esc(image) + '" alt="' + esc(name) + '" loading="lazy"/></div>' +
            '<strong>' + esc(mine.nickname || name) + '</strong>' +
            '<small><i>' + esc(sci) + '</i></small>' +
            (mine.nickname ? '<small class="hx-muted">' + esc(name) + '</small>' : '') +
            '<button class="hx-name-btn" data-name="' + esc(id) + '">' + (mine.nickname ? 'Zmień imię' : 'Nadaj imię') + '</button>' +
            '</article>';
        } else {
          html += '<article class="hx-card is-locked">' +
            '<div class="hx-card-img"><img src="' + esc(image) + '" alt="" loading="lazy"/><span class="hx-lock">?</span></div>' +
            '<strong>Nieodkryty</strong><small class="hx-muted">Wyklul jajo</small>' +
            '</article>';
        }
      });
      html += '</div>';
    });
    html += '</section>';

    root.innerHTML = html;
    wire();
  }

  function wire() {
    var cb = $('#hx-claim-btn');
    if (cb) cb.addEventListener('click', function () {
      cb.disabled = true; cb.textContent = 'Odbieram…';
      api('/api/hatchery/egg', 'POST').then(function () { return load(); })
        .catch(function (e) { alert(e.message); cb.disabled = false; cb.textContent = 'Odbierz jajo'; });
    });

    $$('.hx-hatch').forEach(function (b) {
      b.addEventListener('click', function () {
        b.disabled = true; b.textContent = '…';
        api('/api/hatchery/hatch', 'POST', { eggId: +b.dataset.egg }).then(function (res) {
          if (res.duplicate) { showReveal(null, res); } else { showReveal(res.dinoId, res); }
          return load();
        }).catch(function (e) { alert(e.message); b.disabled = false; b.textContent = 'Wyklul'; });
      });
    });

    $$('.hx-admin-hatch').forEach(function (b) {
      b.addEventListener('click', function () {
        b.disabled = true; b.textContent = '…';
        api('/api/hatchery/hatch', 'POST', { eggId: +b.dataset.egg, force: true }).then(function (res) {
          if (res.duplicate) { showReveal(null, res); } else { showReveal(res.dinoId, res); }
          return load();
        }).catch(function (e) { alert(e.message); b.disabled = false; b.textContent = 'Wykluj jako admin'; });
      });
    });

    $$('.hx-name-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.dataset.name;
        var d = dinoById(id);
        var v = prompt('Nadaj imię swojemu ' + (d ? d.common : id) + ':', '');
        if (v === null) return;
        api('/api/hatchery/nickname', 'POST', { dinoId: id, nickname: v.trim() })
          .then(load).catch(function (e) { alert(e.message); });
      });
    });
  }

  function showReveal(dinoId, res) {
    var d = dinoId ? dinoById(dinoId) : null;
    var overlay = document.createElement('div');
    overlay.className = 'hx-reveal';
    overlay.innerHTML = '<div class="hx-reveal-box">' +
      (d
        ? '<span class="hx-rarity hx-rarity-' + esc(res.rarity) + '">' + esc(RARITY_LABEL[res.rarity] || '') + '</span>' +
          '<h2>Wykluł się ' + esc(d.common) + '!</h2>' +
          '<img src="' + esc(String(d.image || '').replace(/^\//, '')) + '" alt="' + esc(d.common) + '"/>' +
          '<p><i>' + esc(d.scientific) + '</i></p>' +
          '<p class="hx-reveal-desc">' + esc(d.description || '') + '</p>'
        : '<h2>Duplikat</h2><p>' + esc(res.message || 'Jajo zamienione na XP.') + '</p>') +
      '<button class="button" id="hx-reveal-close">Świetnie</button></div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('is-open'); });
    function close() { overlay.classList.remove('is-open'); setTimeout(function () { overlay.remove(); }, 250); }
    $('#hx-reveal-close', overlay).addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  }

  function load() {
    return api('/api/hatchery').then(function (data) { state = data; render(); })
      .catch(function (e) {
        var root = $('#hatchery-root');
        if (root) root.innerHTML = '<div class="hx-gate"><h1>Wykluwarnia</h1><p>' + esc(e.message) +
          '</p><a class="button" href="logowanie.html?next=/wykluwarnia">Zaloguj się</a></div>';
      });
  }

  window.Hatchery = {
    refresh: function () { if (state) load(); },
    load: load
  };

  if (document.body.dataset.page === 'wykluwarnia') {
    if (!token()) {
      var root = $('#hatchery-root');
      if (root) root.innerHTML = '<div class="hx-gate"><h1>Wykluwarnia</h1>' +
        '<p>Zaloguj się, aby zbierać jaja i wykluwać własne dinozaury.</p>' +
        '<a class="button" href="logowanie.html?next=/wykluwarnia">Zaloguj się</a> ' +
        '<a class="quiet-link" href="rejestracja.html">Załóż konto →</a></div>';
    } else {
      load();
    }
  }
})();
