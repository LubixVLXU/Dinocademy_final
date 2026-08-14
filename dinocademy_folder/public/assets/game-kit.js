/* ============================================================
   GameKit — wspólny silnik dla wszystkich gier Dinocademy
   Rejestracja: window.GameKit.register('key', startFn)
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
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function sample(a, n) { return shuffle(a).slice(0, n); }
  function img(path) { return String(path || '').replace(/^\//, ''); }
  function token() { return localStorage.getItem('dinocademy-token') || null; }

  /* ---------- dane ---------- */
  function dinos() { return (window.DINO_DATA && window.DINO_DATA.dino && window.DINO_DATA.dino.e) || []; }
  function taxa() { return (window.DINO_DATA && window.DINO_DATA.expanded && window.DINO_DATA.expanded.t) || []; }
  function cases() { return (window.DINO_DATA && window.DINO_DATA.dino && window.DINO_DATA.dino.i) || []; }
  function scenarios() { return (window.DINO_DATA && window.DINO_DATA.expanded && window.DINO_DATA.expanded.n) || []; }
  function countries() { return (window.DINO_DATA && window.DINO_DATA.expanded && window.DINO_DATA.expanded.e) || []; }
  function byTier(t) { return dinos().filter(function (d) { return d.tier === t; }); }

  /* ---------- wynik + XP ---------- */
  var lastResult = null;
  function saveScore(game, score, meta) {
    lastResult = { game: game, score: score };
    if (proState.checked && !proState.isPro) return Promise.resolve({ needsPro: true, xpAwarded: 0 });
    var body = { game: game, score: score };
    if (meta) body.meta = meta;
    var headers = { 'Content-Type': 'application/json' };
    var t = token(); if (t) headers['X-Session-Token'] = t;
    return fetch(API_BASE + '/api/scores', {
      method: 'POST', headers: headers, credentials: 'same-origin', body: JSON.stringify(body)
    }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () {
      try {
        var k = 'dinocademy-scores';
        var arr = JSON.parse(localStorage.getItem(k) || '[]');
        arr.push({ name: 'Gość', game: game, score: score, ts: Date.now() });
        localStorage.setItem(k, JSON.stringify(arr));
      } catch (e) {}
      return null;
    });
  }

  /* ---------- UI budulec ---------- */
  function stage() { return $('#game-stage'); }

  function head(kicker, title, right) {
    return '<div class="game-head"><div><span class="app-kicker">' + esc(kicker) + '</span><h2>' + esc(title) + '</h2></div>' +
      '<div class="game-score">' + (right || '') + '</div></div>';
  }

  function bar(pct, cls) {
    return '<div class="gk-bar' + (cls ? ' ' + cls : '') + '"><i style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></div>';
  }

  function chips(list) {
    return '<div class="gk-chips">' + list.map(function (c) {
      return '<span class="gk-chip' + (c.tone ? ' gk-chip-' + c.tone : '') + '">' + esc(c.label) + '</span>';
    }).join('') + '</div>';
  }

  /* Ekran końcowy z zapisem wyniku i XP */
  function finish(opts) {
    // opts: { game, score, max, title, lines[], onReplay, win }
    var s = stage(); if (!s) return;
    saveScore(opts.game, opts.score).then(function (res) {
      var xp = res && typeof res.xpAwarded === 'number' ? res.xpAwarded : Math.floor(opts.score / 10);
      var xpLine;
      if (res && res.needsPro) {
        xpLine = '<p class="gk-xp gk-xp-guest">Tryb demo — wynik nie jest zapisywany. ' +
          '<a href="pro.html">Przejdź na Pro</a>, aby zbierać XP, wchodzić do rankingu i wykluwać dinozaury.</p>';
      } else {
        xpLine = token()
          ? '<p class="gk-xp">+' + xp + ' XP dopisane do konta</p>'
          : '<p class="gk-xp gk-xp-guest">Zaloguj się, aby zbierać XP i wykluwać dinozaury.</p>';
      }
      var extra = $('#gk-xp-slot', s);
      if (extra) extra.innerHTML = xpLine;
      if (window.Hatchery && window.Hatchery.refresh) window.Hatchery.refresh();
    });

    var pct = opts.max ? Math.round((opts.score / opts.max) * 100) : null;
    s.innerHTML =
      '<div class="gk-result ' + (opts.win === false ? 'gk-result-lose' : 'gk-result-win') + '">' +
      '<span class="gk-result-badge">' + (opts.win === false ? '✕' : '✓') + '</span>' +
      '<h2>' + esc(opts.title || (opts.win === false ? 'Koniec gry' : 'Ukończone')) + '</h2>' +
      '<strong class="gk-result-score">' + opts.score + (opts.max ? ' / ' + opts.max : '') + ' pkt</strong>' +
      (pct !== null ? bar(pct) : '') +
      (opts.lines && opts.lines.length ? '<ul class="gk-result-lines">' + opts.lines.map(function (l) { return '<li>' + l + '</li>'; }).join('') + '</ul>' : '') +
      '<div id="gk-xp-slot"><p class="gk-xp gk-xp-pending">Zapisywanie wyniku…</p></div>' +
      '<div class="gk-result-actions"><button class="button" id="gk-replay">Zagraj ponownie</button>' +
      '<a class="quiet-link" href="ranking.html">Zobacz ranking →</a></div>' +
      '</div>';
    var rb = $('#gk-replay', s);
    if (rb && opts.onReplay) rb.addEventListener('click', opts.onReplay);
  }

  /* Wybór trybu trudności */
  function difficultyPicker(opts) {
    // opts: { kicker, title, intro, modes:[{id,label,desc,tone}], onPick }
    var s = stage(); if (!s) return;
    s.innerHTML = head(opts.kicker, opts.title, '') +
      (opts.intro ? '<p class="gk-intro">' + opts.intro + '</p>' : '') +
      '<div class="gk-modes">' + opts.modes.map(function (m) {
        return '<button class="gk-mode gk-mode-' + esc(m.id) + '" data-mode="' + esc(m.id) + '">' +
          '<strong>' + esc(m.label) + '</strong><p>' + esc(m.desc) + '</p>' +
          (m.tone ? '<small>' + esc(m.tone) + '</small>' : '') + '</button>';
      }).join('') + '</div>';
    $$('[data-mode]', s).forEach(function (b) {
      b.addEventListener('click', function () { opts.onPick(b.dataset.mode); });
    });
  }

  /* Pytania quizowe generowane z danych taksonów */
  var QUESTION_BUILDERS = [
    function (d, pool) {
      var wrong = sample(pool.filter(function (x) { return x.period !== d.period; }), 3).map(function (x) { return x.period; });
      var uniq = []; wrong.forEach(function (w) { if (uniq.indexOf(w) === -1 && w !== d.period) uniq.push(w); });
      if (uniq.length < 2) return null;
      return { q: 'W jakim okresie żył ' + d.common + '?', correct: d.period, options: [d.period].concat(uniq.slice(0, 3)), why: d.common + ' pochodzi z okresu: ' + d.period + '.' };
    },
    function (d, pool) {
      if (!d.region) return null;
      var regs = []; pool.forEach(function (x) { if (x.region && x.region !== d.region && regs.indexOf(x.region) === -1) regs.push(x.region); });
      if (regs.length < 2) return null;
      return { q: 'Gdzie znaleziono szczątki ' + d.common + '?', correct: d.region, options: [d.region].concat(sample(regs, 3)), why: 'Stanowiska: ' + d.region + '.' };
    },
    function (d, pool) {
      var wrong = sample(pool.filter(function (x) { return x.id !== d.id; }), 3).map(function (x) { return x.common; });
      if (wrong.length < 3) return null;
      return { q: 'Do kogo pasuje ten opis: „' + d.clue + '”?', correct: d.common, options: [d.common].concat(wrong), why: d.description || '' };
    },
    function (d, pool) {
      var wrong = sample(pool.filter(function (x) { return x.id !== d.id; }), 3).map(function (x) { return x.scientific; });
      if (wrong.length < 3) return null;
      return { q: 'Jaka jest nazwa naukowa gatunku „' + d.common + '”?', correct: d.scientific, options: [d.scientific].concat(wrong), why: d.common + ' = ' + d.scientific + '.' };
    }
  ];

  function buildQuestion(difficulty) {
    var pool = dinos();
    if (!pool.length) return null;
    var tierPool = difficulty === 'easy' ? byTier(1) : difficulty === 'hard' ? pool : byTier(1).concat(byTier(2));
    if (!tierPool.length) tierPool = pool;
    for (var attempt = 0; attempt < 12; attempt++) {
      var d = pick(tierPool);
      var builder = difficulty === 'easy' ? QUESTION_BUILDERS[Math.random() < 0.6 ? 2 : 0] : pick(QUESTION_BUILDERS);
      var q = builder(d, pool);
      if (q) { q.dino = d; q.options = shuffle(q.options); return q; }
    }
    return null;
  }

  /* Lista odpowiedzi z natychmiastowym feedbackiem */
  function askChoice(opts) {
    // opts: { root, question, options, correct, onAnswer(ok), why }
    var root = opts.root || stage();
    root.innerHTML = (opts.prefix || '') +
      '<h3 class="gk-question">' + esc(opts.question) + '</h3>' +
      '<div class="choice-list">' + opts.options.map(function (o, i) {
        return '<button data-choice="' + i + '">' + esc(o) + '</button>';
      }).join('') + '</div><p class="gk-feedback" id="gk-feedback"></p>';
    $$('[data-choice]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var chosen = opts.options[+b.dataset.choice];
        var ok = chosen === opts.correct;
        $$('[data-choice]', root).forEach(function (x) { x.disabled = true; });
        b.classList.add(ok ? 'correct' : 'wrong');
        $$('[data-choice]', root).forEach(function (x) {
          if (opts.options[+x.dataset.choice] === opts.correct) x.classList.add('correct');
        });
        var fb = $('#gk-feedback', root);
        if (fb) fb.innerHTML = (ok ? '<strong class="ok">✓ Dobrze.</strong> ' : '<strong class="no">✕ Źle.</strong> ') + esc(opts.why || '');
        setTimeout(function () { opts.onAnswer(ok); }, ok ? 900 : 1500);
      });
    });
  }

  /* ---------- rejestr gier + cleanup ---------- */
  var registry = {};
  var cleanups = [];
  function register(key, fn) { registry[key] = fn; }
  function onCleanup(fn) { cleanups.push(fn); }
  function runCleanups() { cleanups.forEach(function (f) { try { f(); } catch (e) {} }); cleanups = []; }

  /* ---------- bramka Pro ---------- */
  var FREE_DEMO = 'memory';           // jedna gra dostępna bez Pro (tryb demo, bez XP)
  var proState = { checked: false, isPro: false, logged: false };

  function loadProState() {
    var t = token();
    return fetch(API_BASE + '/api/me', {
      credentials: 'same-origin', headers: t ? { 'X-Session-Token': t } : {}
    }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      var u = d && d.user;
      proState = { checked: true, isPro: !!(u && (u.isPro || u.is_pro)), logged: !!u };
      return proState;
    }).catch(function () {
      proState = { checked: true, isPro: false, logged: !!t };
      return proState;
    });
  }

  function isPro() { return proState.isPro; }

  function paywall(gameLabel) {
    var s = stage(); if (!s) return;
    var cta = proState.logged
      ? '<a class="button" href="pro.html">Przejdź na Pro</a>'
      : '<a class="button" href="logowanie.html?next=%2Fgry">Zaloguj się</a><a class="quiet-link" href="pro.html">Zobacz plan Pro →</a>';
    s.innerHTML =
      '<div class="gk-paywall">' +
      '<span class="gk-paywall-mark" aria-hidden="true">✦</span>' +
      '<h2>' + esc(gameLabel || 'Ta gra') + ' — tylko w planie Pro</h2>' +
      '<p>Centrum gier Dinocademy jest częścią planu Pro. ' +
      (proState.logged ? 'Twoje konto nie ma jeszcze aktywnego planu.' : 'Zaloguj się na konto Pro, aby zagrać.') + '</p>' +
      '<ul class="gk-paywall-perks">' +
      '<li>Wszystkie 9 trybów gry z trzema poziomami trudności</li>' +
      '<li>XP z gier, poziomy i miejsce w rankingu ogólnym</li>' +
      '<li>Wykluwarnia — jaja i kolekcja 16 dinozaurów</li>' +
      '<li>Pełny kurs: 34 rozdziały, quizy i certyfikat</li>' +
      '</ul>' +
      '<div class="gk-paywall-actions">' + cta + '</div>' +
      (FREE_DEMO ? '<p style="margin-top:18px;font-size:12.5px;opacity:.6">Bez Pro możesz zagrać w tryb demo Memory (bez XP).</p>' : '') +
      '</div>';
  }

  function boot() {
    if (document.body.dataset.page !== 'gry') return;
    var btns = $$('.recovery-game-grid button');
    var grid = $('.recovery-game-grid');

    loadProState().then(function () {
      if (isPro() || !grid) return;
      grid.classList.add('is-locked');
      btns.forEach(function (b) {
        if (b.dataset.game === FREE_DEMO) b.classList.add('gk-free-demo');
      });
      var s = stage();
      if (s && $('.game-empty', s)) {
        s.innerHTML = '<div class="gk-paywall">' +
          '<span class="gk-paywall-mark" aria-hidden="true">✦</span>' +
          '<h2>Centrum gier jest w planie Pro</h2>' +
          '<p>Dziewięć trybów gry, XP, ranking i wykluwarnia dinozaurów.</p>' +
          '<div class="gk-paywall-actions">' +
          (proState.logged ? '<a class="button" href="pro.html">Przejdź na Pro</a>'
            : '<a class="button" href="logowanie.html?next=%2Fgry">Zaloguj się</a><a class="quiet-link" href="pro.html">Zobacz plan Pro →</a>') +
          '</div>' +
          '<p style="margin-top:18px;font-size:12.5px;opacity:.6">Możesz sprawdzić darmowy tryb demo Memory.</p>' +
          '</div>';
      }
    });

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        runCleanups();
        if (proState.checked && !isPro() && b.dataset.game !== FREE_DEMO) {
          btns.forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
          var t3 = b.querySelector('h3');
          paywall(t3 ? t3.textContent : '');
          var sp = stage(); if (sp) sp.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }
        btns.forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        var fn = registry[b.dataset.game];
        if (fn) { try { fn(); } catch (e) {
          var s = stage();
          if (s) s.innerHTML = '<div class="game-empty"><b>Błąd gry</b><p>' + esc(e.message) + '</p></div>';
          console.error(e);
        } }
        else { var s2 = stage(); if (s2) s2.innerHTML = '<div class="game-empty"><b>Wkrótce</b><p>Ta gra jest w przygotowaniu.</p></div>'; }
        var s3 = stage(); if (s3) s3.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  window.GameKit = {
    $: $, $$: $$, esc: esc, shuffle: shuffle, pick: pick, sample: sample, img: img, token: token,
    dinos: dinos, taxa: taxa, cases: cases, scenarios: scenarios, countries: countries, byTier: byTier,
    stage: stage, head: head, bar: bar, chips: chips, finish: finish, difficultyPicker: difficultyPicker,
    askChoice: askChoice, buildQuestion: buildQuestion, saveScore: saveScore,
    isPro: isPro, loadProState: loadProState, paywall: paywall,
    register: register, onCleanup: onCleanup, boot: boot, API_BASE: API_BASE
  };
})();
