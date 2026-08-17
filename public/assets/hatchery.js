/* ============================================================
Dinocademy — wykluwarnia z levelami, wariantami i animowanymi kartami
============================================================ */
(function () {
  'use strict';
  if (document.body.dataset.page !== 'hatchery') return;
  var API_BASE = '__PORT_3000__'.indexOf('PORT') !== -1 ? '' : '__PORT_3000__';
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function token() { return localStorage.getItem('dinocademy-token') || null; }
  function api(path, method, body) {
    var headers = { 'Content-Type': 'application/json' };
    var t = token();
    if (t) headers['X-Session-Token'] = t;
    return fetch(API_BASE + path, { method: method || 'GET', headers: headers, credentials: 'same-origin', body: body ? JSON.stringify(body) : undefined })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) throw new Error(j.error || 'Błąd serwera'); return j; }); });
  }
  function dinoById(id) {
    var list = (window.DINO_DATA && window.DINO_DATA.dino && window.DINO_DATA.dino.e) || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function variantLabel(v) {
    return { normal: 'Standard', shiny: 'Shiny', mutation_bio: 'Mutacja biologiczna', mutation_tech: 'Mutacja cybernetyczna', fossil_glow: 'Fosylna poświata' }[v] || v || 'Standard';
  }
  var state = null;

  function render() {
    var root = $('#hatchery-root');
    if (!root || !state) return;
    var html = '';
    html += '<section class="panel-glass hatchery-dashboard">';
    html += '<div class="hatchery-stats">';
    html += '<div><span>Poziom gracza</span><strong>' + esc(state.level) + '</strong></div>';
    html += '<div><span>XP</span><strong>' + esc(state.xp) + '</strong></div>';
    html += '<div><span>Kolekcja</span><strong>' + esc(state.collected) + ' / ' + esc(state.totalDinos) + '</strong></div>';
    html += '<div><span>Jaja do odbioru</span><strong>' + esc(state.eggsAvailable) + '</strong></div>';
    html += '</div>';
    if (state.eggsAvailable > 0) html += '<button class="btn btn-primary" id="claim-egg">Odbierz nowe jajo</button>';
    html += '</section>';

    html += '<section class="panel-glass hatchery-eggs"><h2>Inkubator</h2>';
    if (!state.eggs.length) {
      html += '<p>Inkubator jest pusty. Zdobywaj XP w grach i lekcjach albo odbierz nowe jajo za poziom.</p>';
    } else {
      html += '<div class="hx-egg-grid">';
      state.eggs.forEach(function (egg) {
        var progress = egg.required ? Math.min(100, Math.round((egg.warmth / egg.required) * 100)) : 0;
        html += '<article class="hx-egg-card rarity-' + esc(egg.rarity) + '">';
        html += '<div class="hx-egg-shell"></div>';
        html += '<strong>' + esc(egg.label) + '</strong>';
        html += '<small>Poziom źródłowy: ' + esc(egg.from_level || '-') + '</small>';
        html += '<div class="hx-progress"><span style="width:' + progress + '%"></span></div>';
        html += '<p>' + esc(egg.warmth) + ' / ' + esc(egg.required) + ' XP</p>';
        html += egg.ready ? '<button class="btn btn-primary hx-hatch" data-egg="' + esc(egg.id) + '">Wykluj</button>' : '<button class="btn btn-secondary" disabled>Jeszcze się ogrzewa</button>';
        html += '</article>';
      });
      html += '</div>';
    }
    html += '</section>';

    html += '<section class="panel-glass hatchery-collection"><h2>Kolekcja</h2><div class="hx-card-grid">';
    state.collection.forEach(function (mine) {
      var d = dinoById(mine.dino_id) || {};
      var name = d.name_pl || d.name || mine.dino_id;
      var sci = d.scientific || d.name_latin || '';
      var image = d.image || d.img || 'images/dinosaurs/' + mine.dino_id + '.png';
      var variant = mine.variant || 'normal';
      var level = mine.level || 1;
      html += '<article class="hx-card is-owned hx-variant-' + esc(variant) + '">';
      html += '<div class="hx-card-img"><img src="' + esc(image) + '" alt="' + esc(name) + '" loading="lazy"><span class="hx-variant-badge">' + esc(variantLabel(variant)) + '</span></div>';
      html += '<span class="hx-level">Lv ' + esc(level) + '</span>';
      html += '<strong>' + esc(mine.nickname || name) + '</strong>';
      html += '<small><i>' + esc(sci) + '</i></small>';
      html += '<p>' + esc((d.description || '').slice(0, 120)) + '</p>';
      html += '</article>';
    });
    html += '</div></section>';
    root.innerHTML = html;

    var claim = $('#claim-egg');
    if (claim) claim.addEventListener('click', function () {
      api('/api/hatchery/egg', 'POST').then(load).catch(function (e) { alert(e.message); });
    });
    [].slice.call(document.querySelectorAll('.hx-hatch')).forEach(function (btn) {
      btn.addEventListener('click', function () {
        api('/api/hatchery/hatch', 'POST', { eggId: Number(btn.getAttribute('data-egg')) })
          .then(function (res) { showReveal(res); return load(); })
          .catch(function (e) { alert(e.message); });
      });
    });
  }

  function showReveal(res) {
    var existing = document.querySelector('.hx-reveal');
    if (existing) existing.remove();
    var wrap = document.createElement('div');
    wrap.className = 'hx-reveal';
    if (res.duplicate) {
      wrap.innerHTML = '<div class="hx-reveal-card"><h3>Duplikat przetworzony</h3><p>' + esc(res.message || ('Dodano poziom lub XP: ' + (res.xpBonus || 0))) + '</p><button type="button">Zamknij</button></div>';
    } else {
      var d = dinoById(res.dinoId) || {};
      var title = d.name_pl || d.name || res.dinoId;
      var image = d.image || d.img || 'images/dinosaurs/' + res.dinoId + '.png';
      wrap.innerHTML = '<div class="hx-reveal-card hx-variant-' + esc(res.variant || 'normal') + '"><img src="' + esc(image) + '" alt="' + esc(title) + '"><h3>' + esc(title) + '</h3><div class="hx-reveal-badges"><span class="hx-rarity">' + esc(res.rarity || '') + '</span><span class="hx-reveal-variant">' + esc(variantLabel(res.variant)) + '</span><span class="hx-level">Lv ' + esc(res.level || 1) + '</span></div><p>' + esc((d.description || '').slice(0, 180)) + '</p><button type="button">Super</button></div>';
    }
    document.body.appendChild(wrap);
    wrap.querySelector('button').addEventListener('click', function () { wrap.remove(); });
    wrap.addEventListener('click', function (e) { if (e.target === wrap) wrap.remove(); });
  }

  function load() {
    return api('/api/hatchery').then(function (j) { state = j; render(); });
  }
  load().catch(function (e) {
    $('#hatchery-root').innerHTML = '<section class="panel-glass"><p>' + esc(e.message) + '</p><a class="btn btn-primary" href="logowanie.html">Zaloguj się</a></section>';
  });
})();
