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
/* Dinocademy: gry podstawowe — Memory, Nazwij okaz, Sprawa dowodowa, Quiz Battle */
(function () {
  'use strict';

  var K = window.GameKit;
  if (!K) return;

  function formatSeconds(total) {
    var mins = Math.floor(total / 60);
    var secs = total % 60;
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  function normaliseName(value) {
    var letters = { 'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z' };
    return String(value == null ? '' : value).toLowerCase().replace(/[ąćęłńóśźż]/g, function (letter) {
      return letters[letter];
    }).replace(/[\s.]+/g, '');
  }

  function emptyGame(message) {
    var stage = K.stage();
    if (stage) stage.innerHTML = '<div class="game-empty"><b>Brak danych</b><p>' + K.esc(message) + '</p></div>';
  }

  /* ------------------------------------------------------------
     1. MEMORY: obraz dinozaura + jego polska i naukowa nazwa
     ------------------------------------------------------------ */
  function startMemory() {
    K.difficultyPicker({
      kicker: 'GRA 1 · PAMIĘĆ',
      title: 'Memory: obraz i nazwa',
      intro: 'Odkrywaj karty i łącz w pary wizerunek dinozaura z jego nazwą.',
      modes: [
        { id: 'easy', label: 'Łatwy', desc: '4 pary · znane dinozaury', tone: '4 × 2' },
        { id: 'medium', label: 'Średni', desc: '6 par · poziomy 1 i 2', tone: '4 × 3' },
        { id: 'hard', label: 'Trudny', desc: '8 par · mniej znane okazy', tone: '4 × 4' }
      ],
      onPick: function (mode) { playMemory(mode); }
    });
  }

  function playMemory(mode) {
    var settings = {
      easy: { pairs: 4, base: 600, tiers: [1], grid: 'gk-memory-grid-4x2', label: 'Łatwy' },
      medium: { pairs: 6, base: 1000, tiers: [1, 2], grid: 'gk-memory-grid-4x3', label: 'Średni' },
      hard: { pairs: 8, base: 1600, tiers: [2, 3], grid: 'gk-memory-grid-4x4', label: 'Trudny' }
    }[mode];
    var pool = [];
    var stage = K.stage();
    var active = true;
    var first = null;
    var locked = false;
    var moves = 0;
    var matched = 0;
    var elapsed = 0;
    var startedAt = Date.now();
    var intervalId = null;
    var pendingId = null;
    var cards;

    settings.tiers.forEach(function (tier) { pool = pool.concat(K.byTier(tier)); });
    if (pool.length < settings.pairs) {
      emptyGame('Nie ma wystarczającej liczby dinozaurów dla tego trybu.');
      return;
    }
    cards = K.shuffle(K.sample(pool, settings.pairs).reduce(function (list, dino) {
      list.push({ dino: dino, kind: 'image' });
      list.push({ dino: dino, kind: 'name' });
      return list;
    }, []));

    function updateHud() {
      var moveEl = K.$('#gk-memory-moves', stage);
      var timeEl = K.$('#gk-memory-time', stage);
      if (moveEl) moveEl.textContent = moves;
      if (timeEl) timeEl.textContent = formatSeconds(elapsed);
    }

    function showFact(dino) {
      var fact = K.$('#gk-memory-fact', stage);
      if (fact) {
        fact.innerHTML = '<strong>' + K.esc(dino.common) + '</strong> <em>' + K.esc(dino.scientific) + '</em><p>' + K.esc(dino.description || '') + '</p>';
      }
    }

    function finishMemory() {
      var score;
      if (!active) return;
      active = false;
      clearInterval(intervalId);
      elapsed = Math.floor((Date.now() - startedAt) / 1000);
      score = Math.max(100, settings.base - (moves * 22) - (elapsed * 3));
      K.finish({
        game: 'memory', score: score, max: settings.base, title: 'Wszystkie pary odkryte!', win: true,
        lines: ['Tryb: ' + settings.label, 'Ruchy: ' + moves, 'Czas: ' + formatSeconds(elapsed)],
        onReplay: startMemory
      });
    }

    function turn(cardIndex) {
      var card = cards[cardIndex];
      var button;
      if (!active || locked || card.open || card.matched) return;
      button = K.$('[data-memory-card="' + cardIndex + '"]', stage);
      card.open = true;
      if (button) button.classList.remove('hidden');
      if (first === null) {
        first = cardIndex;
        return;
      }
      moves += 1;
      updateHud();
      if (cards[first].dino.id === card.dino.id && cards[first].kind !== card.kind) {
        cards[first].matched = true;
        card.matched = true;
        matched += 1;
        K.$('[data-memory-card="' + first + '"]', stage).classList.add('matched');
        if (button) button.classList.add('matched');
        showFact(card.dino);
        first = null;
        if (matched === settings.pairs) finishMemory();
      } else {
        var prior = first;
        locked = true;
        pendingId = setTimeout(function () {
          var priorButton;
          if (!active) return;
          cards[prior].open = false;
          cards[cardIndex].open = false;
          priorButton = K.$('[data-memory-card="' + prior + '"]', stage);
          if (priorButton) priorButton.classList.add('hidden');
          if (button) button.classList.add('hidden');
          first = null;
          locked = false;
        }, 800);
      }
    }

    if (!stage) return;
    stage.innerHTML = K.head('GRA 1 · MEMORY', 'Połącz obraz z nazwą',
      'Ruchy: <b id="gk-memory-moves">0</b> · Czas: <b id="gk-memory-time">0:00</b>') +
      K.bar(0, 'gk-memory-progress') +
      '<div class="memory-grid ' + settings.grid + '">' + cards.map(function (card, index) {
        var face = card.kind === 'image'
          ? '<img src="' + K.img(card.dino.image) + '" alt="Wizerunek dinozaura">'
          : '<span class="gk-memory-name">' + K.esc(card.dino.common) + '<em>' + K.esc(card.dino.scientific) + '</em></span>';
        return '<button type="button" class="memory-card hidden gk-memory-card" data-memory-card="' + index + '" aria-label="Odkryj kartę"><span class="gk-memory-face">' + face + '</span></button>';
      }).join('') + '</div>' +
      '<aside class="gk-memory-fact" id="gk-memory-fact" aria-live="polite">Odkryj parę, aby przeczytać krótką notkę o dinozaurze.</aside>';

    K.$$('[data-memory-card]', stage).forEach(function (button) {
      button.addEventListener('click', function () { turn(+button.getAttribute('data-memory-card')); });
    });
    intervalId = setInterval(function () {
      if (!active) return;
      elapsed = Math.floor((Date.now() - startedAt) / 1000);
      updateHud();
    }, 1000);
    K.onCleanup(function () {
      active = false;
      clearInterval(intervalId);
      clearTimeout(pendingId);
    });
  }

  /* ------------------------------------------------------------
     2. SPECIMEN: rozpoznawanie okazu ze wskazówki i ilustracji
     ------------------------------------------------------------ */
  function startSpecimen() {
    K.difficultyPicker({
      kicker: 'GRA 2 · OKAZ',
      title: 'Nazwij okaz',
      intro: 'Rozpoznaj dinozaura na podstawie obrazu i opisu cech.',
      modes: [
        { id: 'easy', label: 'Łatwy', desc: 'Kliknij jedną z 4 odpowiedzi', tone: 'tier 1' },
        { id: 'medium', label: 'Średni', desc: 'Wpisz nazwę z podpowiedzią', tone: 'tiery 1–2' },
        { id: 'hard', label: 'Trudny', desc: 'Wpisz nazwę bez podpowiedzi', tone: 'wszystkie tiery' }
      ],
      onPick: function (mode) { playSpecimen(mode); }
    });
  }

  function playSpecimen(mode) {
    var source = mode === 'easy' ? K.byTier(1) : mode === 'medium' ? K.byTier(1).concat(K.byTier(2)) : K.dinos();
    var rounds = K.sample(source, 6);
    var stage = K.stage();
    var round = 0;
    var score = 0;
    var correctCount = 0;
    var delayId = null;
    var active = true;

    if (rounds.length < 6) {
      emptyGame('Nie ma wystarczającej liczby okazów dla sześciu rund.');
      return;
    }

    function finishSpecimen() {
      active = false;
      K.finish({
        game: 'specimen', score: score, max: mode === 'hard' ? 900 : 600, title: 'Badanie okazów zakończone', win: correctCount >= 3,
        lines: ['Tryb: ' + (mode === 'easy' ? 'Łatwy' : mode === 'medium' ? 'Średni' : 'Trudny'), 'Poprawne odpowiedzi: ' + correctCount + ' / 6', 'Punkty: ' + score],
        onReplay: startSpecimen
      });
    }

    function goNext() {
      if (!active) return;
      round += 1;
      if (round >= rounds.length) finishSpecimen();
      else renderRound();
    }

    function acceptAnswer(value, dino, feedback) {
      var accepted = [dino.common, dino.scientific].concat(dino.aliases || []);
      var normal = normaliseName(value);
      var isCorrect = accepted.some(function (name) { return normal === normaliseName(name); });
      var scientificBonus = mode === 'hard' && normal === normaliseName(dino.scientific);
      var add = isCorrect ? 100 + (scientificBonus ? 50 : 0) : 0;
      if (isCorrect) { score += add; correctCount += 1; }
      feedback.innerHTML = (isCorrect ? '<strong class="ok">✓ Dobrze' + (scientificBonus ? ' — +50 za nazwę naukową' : '') + '.</strong> ' : '<strong class="no">✕ Nie tym razem.</strong> ') + K.esc(dino.description || '');
      delayId = setTimeout(goNext, isCorrect ? 1050 : 1650);
    }

    function renderRound() {
      var dino = rounds[round];
      var answerRoot;
      if (!active || !stage) return;
      stage.innerHTML = K.head('GRA 2 · NAZWIJ OKAZ', 'Rozpoznaj dinozaura', 'Runda ' + (round + 1) + ' / 6 · Punkty: ' + score) +
        K.bar((round / 6) * 100, 'gk-specimen-progress') +
        '<div class="specimen-card gk-specimen-card"><img src="' + K.img(dino.image) + '" alt="Okaz do rozpoznania"><div><span class="app-kicker">WSKAZÓWKA</span><p class="gk-specimen-clue">' + K.esc(dino.clue) + '</p><div id="gk-specimen-answer"></div><p class="gk-feedback" id="gk-specimen-feedback" aria-live="polite"></p></div></div>';
      answerRoot = K.$('#gk-specimen-answer', stage);
      if (mode === 'easy') {
        var answers = [dino.common].concat(K.sample(source.filter(function (item) { return item.id !== dino.id; }), 3).map(function (item) { return item.common; }));
        K.askChoice({
          root: answerRoot, question: 'Jaki to dinozaur?', options: K.shuffle(answers), correct: dino.common, why: dino.description || '',
          onAnswer: function (ok) {
            if (!active) return;
            if (ok) { score += 100; correctCount += 1; }
            delayId = setTimeout(goNext, ok ? 950 : 1550);
          }
        });
      } else {
        var hint = mode === 'medium' ? '<p class="gk-name-hint">Podpowiedź: <b>' + K.esc(dino.common.charAt(0)) + '</b> · ' + dino.common.replace(/\s/g, '').length + ' znaków</p>' : '';
        answerRoot.innerHTML = hint + '<form class="specimen-form gk-specimen-form" id="gk-specimen-form"><label class="sr-only" for="gk-specimen-input">Nazwa dinozaura</label><input id="gk-specimen-input" autocomplete="off" placeholder="Wpisz nazwę…"><button class="button" type="submit">Sprawdź</button></form>';
        K.$('#gk-specimen-form', stage).addEventListener('submit', function (event) {
          var input;
          var feedback;
          event.preventDefault();
          if (!active) return;
          input = K.$('#gk-specimen-input', stage);
          feedback = K.$('#gk-specimen-feedback', stage);
          if (!input || !feedback || input.disabled) return;
          input.disabled = true;
          K.$('button', event.currentTarget).disabled = true;
          acceptAnswer(input.value, dino, feedback);
        });
      }
    }

    K.onCleanup(function () { active = false; clearTimeout(delayId); });
    renderRound();
  }

  /* ------------------------------------------------------------
     3. EVIDENCE: ograniczanie wniosków do danych ze sprawy
     ------------------------------------------------------------ */
  function startEvidence() {
    var allCases = K.cases();
    var selected = [];
    var index = 0;
    var score = 0;
    var active = true;
    var stage = K.stage();

    if (!allCases.length) {
      emptyGame('Brak spraw dowodowych.');
      return;
    }
    while (selected.length < 5) {
      K.shuffle(allCases).forEach(function (item) {
        if (selected.length < 5 && (allCases.length < 5 || selected.indexOf(item) === -1)) selected.push(item);
      });
    }

    function finishEvidence() {
      active = false;
      K.finish({
        game: 'evidence', score: score, max: 500, title: 'Sprawa dowodowa zamknięta', win: score >= 300,
        lines: ['Rozwiązane sprawy: 5', 'Poprawne wnioski: ' + (score / 100) + ' / 5', 'Wynik: ' + score + ' pkt'],
        onReplay: startEvidence
      });
    }

    function renderCase() {
      var current = selected[index];
      var prefix;
      if (!active || !stage) return;
      prefix = K.head('GRA 3 · SPRAWA DOWODOWA', current.title, 'Sprawa ' + (index + 1) + ' / 5 · Punkty: ' + score) +
        K.bar((index / 5) * 100, 'gk-evidence-progress') +
        '<section class="gk-case-setup"><span class="app-kicker">MATERIAŁ SPRAWY</span><p>' + K.esc(current.setup) + '</p></section>';
      K.askChoice({
        root: stage, prefix: prefix, question: current.question, options: current.options,
        correct: current.options[current.answer], why: current.explanation,
        onAnswer: function (ok) {
          if (!active) return;
          if (ok) score += 100;
          index += 1;
          if (index >= selected.length) finishEvidence();
          else renderCase();
        }
      });
    }

    K.onCleanup(function () { active = false; });
    renderCase();
  }

  /* ------------------------------------------------------------
     4. BATTLE: szybkie porównanie dwóch taksonów
     ------------------------------------------------------------ */
  function startBattle() {
    K.difficultyPicker({
      kicker: 'GRA 4 · QUIZ BATTLE',
      title: 'Dino Quiz Battle',
      intro: 'Wybierz takson pasujący do pytania, buduj serię i zdobywaj mnożniki.',
      modes: [
        { id: 'easy', label: 'Łatwy', desc: 'Tylko porównanie długości', tone: '8 rund' },
        { id: 'medium', label: 'Średni', desc: 'Długość oraz wiek', tone: '8 rund' },
        { id: 'hard', label: 'Trudny', desc: 'Długość, wiek, dieta i klad', tone: '8 rund' }
      ],
      onPick: function (mode) { playBattle(mode); }
    });
  }

  function numberText(value) {
    return String(value).replace('.', ',');
  }

  function playBattle(mode) {
    var taxa = K.taxa();
    var types = mode === 'easy' ? ['length'] : mode === 'medium' ? ['length', 'age'] : ['length', 'age', 'diet', 'clade'];
    var stage = K.stage();
    var round = 0;
    var score = 0;
    var streak = 0;
    var delayId = null;
    var active = true;
    var used = {};

    function validNumber(value) { return typeof value === 'number' && isFinite(value); }

    function makeQuestion(type) {
      var attempt;
      for (attempt = 0; attempt < 120; attempt += 1) {
        var pair = K.sample(taxa, 2);
        var a = pair[0];
        var b = pair[1];
        var signature = [a.id, b.id].sort().join('|') + ':' + type;
        var question;
        if (used[signature]) continue;
        if (type === 'length' && validNumber(a.lengthM) && validNumber(b.lengthM) && a.lengthM !== b.lengthM) {
          question = { a: a, b: b, correct: a.lengthM > b.lengthM ? 0 : 1, label: 'Który dinozaur był dłuższy?', fact: a.common + ': ' + numberText(a.lengthM) + ' m vs ' + b.common + ': ' + numberText(b.lengthM) + ' m' };
        }
        if (type === 'age' && validNumber(a.ageMya) && validNumber(b.ageMya) && a.ageMya !== b.ageMya) {
          question = { a: a, b: b, correct: a.ageMya > b.ageMya ? 0 : 1, label: 'Który żył wcześniej?', fact: a.common + ': ok. ' + numberText(a.ageMya) + ' mln lat temu vs ' + b.common + ': ok. ' + numberText(b.ageMya) + ' mln lat temu' };
        }
        if (type === 'diet' && ((a.diet === 'drapieżnik') !== (b.diet === 'drapieżnik'))) {
          question = { a: a, b: b, correct: a.diet === 'drapieżnik' ? 0 : 1, label: 'Który był drapieżnikiem?', fact: a.common + ': ' + a.diet + ' · ' + b.common + ': ' + b.diet };
        }
        if (type === 'clade' && a.clade && b.clade && a.clade !== b.clade) {
          question = { a: a, b: b, correct: 0, label: 'Który należał do kladu ' + a.clade + '?', fact: a.common + ': ' + a.clade + ' · ' + b.common + ': ' + b.clade };
        }
        if (question) {
          used[signature] = true;
          return question;
        }
      }
      return null;
    }

    function finishBattle() {
      active = false;
      K.finish({
        game: 'battle', score: score, max: 1600, title: 'Bitwa quizowa zakończona', win: score >= 500,
        lines: ['Tryb: ' + (mode === 'easy' ? 'Łatwy' : mode === 'medium' ? 'Średni' : 'Trudny'), 'Rozegrane rundy: 8', 'Najwyższa seria daje mnożnik x2'],
        onReplay: startBattle
      });
    }

    function renderRound() {
      var question = makeQuestion(types[round % types.length]);
      if (!active || !stage) return;
      if (!question) { finishBattle(); return; }
      stage.innerHTML = K.head('GRA 4 · DINO QUIZ BATTLE', 'Wybierz właściwy takson', 'Runda ' + (round + 1) + ' / 8 · Punkty: ' + score + ' · Seria: <b>' + streak + '</b>') +
        K.bar((round / 8) * 100, 'gk-battle-progress') +
        '<h3 class="gk-question">' + K.esc(question.label) + '</h3><div class="battle-pair gk-battle-pair">' + [question.a, question.b].map(function (dino, side) {
          return '<button type="button" class="gk-battle-card" data-battle-side="' + side + '"><img src="' + K.img(dino.image) + '" alt="' + K.esc(dino.common) + '"><strong>' + K.esc(dino.common) + '</strong><em>' + K.esc(dino.scientific) + '</em></button>';
        }).join('') + '</div><p class="gk-feedback gk-battle-feedback" id="gk-battle-feedback" aria-live="polite"></p>';
      K.$$('[data-battle-side]', stage).forEach(function (button) {
        button.addEventListener('click', function () {
          var choice = +button.getAttribute('data-battle-side');
          var ok = choice === question.correct;
          var multiplier;
          var feedback;
          if (!active || button.disabled) return;
          K.$$('[data-battle-side]', stage).forEach(function (item, side) {
            item.disabled = true;
            if (side === question.correct) item.classList.add('correct');
          });
          if (ok) {
            streak += 1;
            multiplier = streak >= 4 ? 2 : streak >= 2 ? 1.5 : 1;
            score += 100 * multiplier;
          } else {
            streak = 0;
            button.classList.add('wrong');
          }
          feedback = K.$('#gk-battle-feedback', stage);
          if (feedback) feedback.innerHTML = (ok ? '<strong class="ok">✓ Dobrze.</strong> ' : '<strong class="no">✕ Nie tym razem.</strong> ') + K.esc(question.fact) + (ok ? ' · Seria: ' + streak + ', mnożnik x' + multiplier : ' · Seria przerwana.');
          delayId = setTimeout(function () {
            if (!active) return;
            round += 1;
            if (round >= 8) finishBattle();
            else renderRound();
          }, ok ? 1100 : 1700);
        });
      });
    }

    if (taxa.length < 2) {
      emptyGame('Brak wystarczających danych taksonomicznych.');
      return;
    }
    K.onCleanup(function () { active = false; clearTimeout(delayId); });
    renderRound();
  }

  K.register('memory', startMemory);
  K.register('specimen', startSpecimen);
  K.register('evidence', startEvidence);
  K.register('battle', startBattle);
})();
/* Advanced games 05–09 for Dinocademy. */
(function () {
  'use strict';

  var K = window.GameKit;
  if (!K) return;

  function modes(onPick, kicker, title, intro) {
    K.difficultyPicker({
      kicker: kicker,
      title: title,
      intro: intro,
      modes: [
        { id: 'easy', label: 'Łatwy', desc: 'Spokojne tempo i wyraźne różnice.', tone: 'Poziom 1' },
        { id: 'medium', label: 'Średni', desc: 'Więcej okazów i mniej oczywiste wybory.', tone: 'Poziomy 1–2' },
        { id: 'hard', label: 'Trudny', desc: 'Pełna pula danych i precyzyjne rozpoznawanie.', tone: 'Ekspert' }
      ],
      onPick: onPick
    });
  }

  function matchTaxon(dino) {
    var all = K.taxa();
    var i;
    for (i = 0; i < all.length; i++) {
      if (all[i].scientific === dino.scientific || all[i].common === dino.common) return all[i];
    }
    return { common: dino.common, scientific: dino.scientific, image: dino.image, countries: [], period: dino.period, diet: '', lengthM: 4, clade: '', feature: '', defense: '', habitat: '' };
  }

  function difficultyDinos(mode) {
    var d = K.dinos();
    if (mode === 'easy') return d.filter(function (x) { return x.tier === 1; });
    if (mode === 'medium') return d.filter(function (x) { return x.tier <= 2; });
    return d.slice();
  }

  function renderError(message) {
    K.stage().innerHTML = '<div class="game-empty"><b>Brak danych do gry</b><p>' + K.esc(message) + '</p></div>';
  }

  /* ------------------------------------------------------------
     05. DIAGNOSIS
     ------------------------------------------------------------ */
  function startDiagnosis() {
    modes(function (mode) {
      var pool = difficultyDinos(mode);
      var rounds = K.sample(pool, Math.min(6, pool.length));
      var state = { index: 0, score: 0, answered: 0 };
      if (rounds.length < 4) { renderError('Za mało taksonów do przygotowania pytań.'); return; }

      function optionsFor(dino) {
        var targetTaxon = matchTaxon(dino);
        var rest = pool.filter(function (x) { return x.id !== dino.id; });
        if (mode === 'easy') {
          rest = rest.filter(function (x) { return x.period !== dino.period; });
        } else if (mode === 'hard') {
          var sameBoth = rest.filter(function (x) {
            var t = matchTaxon(x);
            return t.clade && t.clade === targetTaxon.clade && x.period === dino.period;
          });
          var samePeriod = rest.filter(function (x) { return x.period === dino.period; });
          var sameClade = rest.filter(function (x) { return matchTaxon(x).clade && matchTaxon(x).clade === targetTaxon.clade; });
          rest = sameBoth.concat(samePeriod, sameClade).filter(function (x, i, arr) { return arr.indexOf(x) === i && x.id !== dino.id; });
        }
        if (rest.length < 3) rest = pool.filter(function (x) { return x.id !== dino.id; });
        return K.shuffle([dino].concat(K.sample(rest, 3)));
      }

      function next() {
        if (state.index >= rounds.length) {
          K.finish({ game: 'diagnosis', score: state.score, max: rounds.length * 100, title: 'Diagnoza zakończona', win: state.score > 0,
            lines: ['Rozpoznane okazy: ' + state.answered + ' / ' + rounds.length, 'Wynik: ' + state.score + ' pkt'], onReplay: startDiagnosis });
          return;
        }
        var dino = rounds[state.index];
        var opts = optionsFor(dino);
        var root = K.stage();
        K.askChoice({
          root: root,
          prefix: K.head('Diagnoza · runda ' + (state.index + 1) + '/' + rounds.length, 'Kto pasuje do opisu?', K.chips([{ label: state.score + ' pkt', tone: 'ok' }])) +
            '<div class="gk-diagnosis-clue">„' + K.esc(dino.clue) + '”</div>',
          question: 'Wybierz właściwy takson.',
          options: opts.map(function (x) { return x.common; }),
          correct: dino.common,
          why: 'Sprawdź uzasadnienie po odpowiedzi.',
          onAnswer: function (ok) {
            state.answered += ok ? 1 : 0;
            if (ok) state.score += 100;
            root.innerHTML = K.head('Diagnoza · analiza okazu', dino.common, K.chips([{ label: ok ? '+100 pkt' : '0 pkt', tone: ok ? 'ok' : 'bad' }])) +
              '<article class="gk-reveal-card"><img src="' + K.img(dino.image) + '" alt="' + K.esc(dino.common) + '"><div><p class="app-kicker">' + (ok ? 'Trafna diagnoza' : 'Poprawna odpowiedź') + '</p><h3>' + K.esc(dino.common) + '</h3><p><i>' + K.esc(dino.scientific) + '</i></p><p>' + K.esc(dino.description) + '</p></div></article>' +
              '<button class="button gk-next">' + (state.index + 1 === rounds.length ? 'Zobacz wynik' : 'Następny opis') + '</button>';
            K.$('.gk-next', root).addEventListener('click', function () { state.index++; next(); });
          }
        });
      }
      next();
    }, 'Gra 05', 'Kto pasuje do opisu?', 'Przeczytaj opis rekonstrukcji i postaw właściwą diagnozę.');
  }

  /* ------------------------------------------------------------
     06. MAPA
     ------------------------------------------------------------ */
  function startMap() {
    modes(function (mode) {
      var taxa = K.taxa().filter(function (t) { return t.countries && t.countries.length; });
      var rounds = K.sample(taxa, 7);
      var countryList = K.countries();
      var count = mode === 'easy' ? 6 : mode === 'medium' ? 12 : countryList.length;
      var state = { index: 0, score: 0, firstTry: true, locked: false };
      var pending = null;
      K.onCleanup(function () { if (pending) clearTimeout(pending); });
      if (rounds.length < 7) { renderError('Brakuje stanowisk z przypisanymi krajami.'); return; }

      function setPins(result, correctCodes, selected, lockAll) {
        K.$$('.gk-map-pin', K.stage()).forEach(function (pin) {
          var isCorrect = correctCodes.indexOf(pin.dataset.code) !== -1;
          if (lockAll || (pin.dataset.code === selected && !isCorrect)) pin.disabled = true;
          if (isCorrect) pin.classList.add('is-correct');
          if (pin.dataset.code === selected && !isCorrect) pin.classList.add('is-wrong');
        });
        var feedback = K.$('.gk-map-feedback', K.stage());
        if (feedback) feedback.innerHTML = result ? '<strong class="ok">✓ Właściwe stanowisko.</strong>' : '<strong class="no">✕ To nie jest kraj odkrycia tego taksonu.</strong> Zielone pinezki pokazują właściwe państwa — wybierz jedno, aby przejść dalej.';
      }

      function next() {
        if (state.index >= rounds.length) {
          K.finish({ game: 'mapa', score: state.score, max: rounds.length * 150, title: 'Mapa odkryć gotowa', win: state.score > 0,
            lines: ['Zmapowane taksony: ' + rounds.length, 'Wynik: ' + state.score + ' pkt', mode === 'hard' ? 'Tryb ekspercki: bonus +50 za trafienie w pierwszej próbie.' : ''], onReplay: startMap });
          return;
        }
        var taxon = rounds[state.index];
        var correct = taxon.countries.filter(function (code) { return countryList.some(function (c) { return c.code === code; }); });
        var correctCountry = countryList.filter(function (c) { return correct.indexOf(c.code) !== -1; });
        var others = countryList.filter(function (c) { return correct.indexOf(c.code) === -1; });
        var pins = K.shuffle(correctCountry.concat(K.sample(others, Math.max(0, count - correctCountry.length))));
        state.firstTry = true; state.locked = false;
        K.stage().innerHTML = K.head('Mapa · runda ' + (state.index + 1) + '/7', 'Mapa odkryć', K.chips([{ label: state.score + ' pkt', tone: 'ok' }, { label: mode === 'hard' ? 'bonus pierwszej próby' : count + ' pinezek' }])) +
          '<div class="gk-map-prompt"><img src="' + K.img(taxon.image) + '" alt="' + K.esc(taxon.common) + '"><div><p class="app-kicker">Wskaż kraj odkrycia</p><h3>' + K.esc(taxon.common) + '</h3><p><i>' + K.esc(taxon.scientific) + '</i> · ' + K.esc(taxon.period) + '</p></div></div>' +
          '<div class="gk-map-wrap"><img src="games/world-map.webp" alt="Mapa świata">' + pins.map(function (c) {
            return '<button class="gk-map-pin" data-code="' + K.esc(c.code) + '" style="left:' + c.x + '%;top:' + c.y + '%" aria-label="' + K.esc(c.name) + '" title="' + K.esc(c.name) + '"><span></span><b>' + K.esc(c.code) + '</b></button>';
          }).join('') + '</div><p class="gk-map-feedback" aria-live="polite">Kliknij pinezkę na mapie.</p>';
        K.$$('.gk-map-pin', K.stage()).forEach(function (pin) {
          pin.addEventListener('click', function () {
            if (state.locked) return;
            var ok = correct.indexOf(pin.dataset.code) !== -1;
            if (ok) {
              state.locked = true;
              state.score += 100 + (mode === 'hard' && state.firstTry ? 50 : 0);
              setPins(true, correct, pin.dataset.code, true);
              pending = setTimeout(function () { state.index++; next(); }, 1200);
            } else {
              state.firstTry = false;
              setPins(false, correct, pin.dataset.code, false);
            }
          });
        });
      }
      next();
    }, 'Gra 06', 'Mapa odkryć', 'Wskaż na mapie państwo, w którym znaleziono szczątki danego taksonu.');
  }

  /* ------------------------------------------------------------
     07. ESCAPE
     ------------------------------------------------------------ */
  function startEscape() {
    modes(function (mode) {
      var settings = { easy: { seconds: 20, multiplier: 1 }, medium: { seconds: 14, multiplier: 1.5 }, hard: { seconds: 9, multiplier: 2 } }[mode];
      var state = { distance: 5, score: 0, good: 0, active: true, timer: null, remaining: settings.seconds, serial: 0 };
      var wait = null;
      K.onCleanup(function () { if (state.timer) clearInterval(state.timer); if (wait) clearTimeout(wait); state.active = false; });

      function finish(win) {
        if (!state.active) return;
        state.active = false;
        if (state.timer) clearInterval(state.timer);
        var bonus = win ? Math.round(300 * settings.multiplier) : 0;
        if (win) state.score += bonus;
        K.finish({ game: 'escape', score: state.score, max: Math.round((5 * 100 + 300) * settings.multiplier), win: win,
          title: win ? 'Uciekłeś przed T. rexem!' : 'T. rex cię dogonił',
          lines: [win ? 'Dystans do mety: osiągnięty.' : 'Dystans spadł do zera.', 'Dobre odpowiedzi: ' + state.good, 'Mnożnik trybu: ×' + settings.multiplier, win ? 'Premia za metę: +' + bonus + ' pkt' : ''], onReplay: startEscape });
      }

      function trackHtml() {
        var player = Math.max(5, Math.min(95, 18 + state.distance * 7));
        var rex = Math.max(1, player - state.distance * 5);
        return '<div class="gk-chase-panel"><div class="gk-chase-readout"><span>Dystans: <b>' + state.distance + ' / 10</b></span><span>Czas: <b class="gk-timer-value">' + state.remaining + ' s</b></span></div>' + K.bar(state.distance * 10, 'gk-chase-bar') +
          '<div class="gk-chase-track"><span class="gk-chase-start">START</span><span class="gk-chase-finish">META</span><img class="gk-chase-rex" style="left:' + rex + '%" src="games/escape-rex.webp" alt="Tyranozaur"><img class="gk-chase-human" style="left:' + player + '%" src="games/escape-human.webp" alt="Uciekający badacz"></div></div>';
      }

      function move(ok, reason) {
        if (!state.active) return;
        if (state.timer) clearInterval(state.timer);
        state.serial++;
        if (ok) { state.distance++; state.good++; state.score += Math.round(100 * settings.multiplier); }
        else state.distance--;
        var feedback = K.$('.gk-chase-feedback', K.stage());
        if (feedback) feedback.innerHTML = ok ? '<strong class="ok">✓ Uciekasz o krok dalej.</strong> ' + K.esc(reason) : '<strong class="no">✕ T. rex się zbliża.</strong> ' + K.esc(reason);
        var track = K.$('.gk-chase-panel', K.stage());
        if (track) track.outerHTML = trackHtml();
        if (state.distance <= 0) { wait = setTimeout(function () { finish(false); }, 850); }
        else if (state.distance >= 10) { wait = setTimeout(function () { finish(true); }, 850); }
        else { wait = setTimeout(question, 1050); }
      }

      function question() {
        if (!state.active) return;
        var q = K.buildQuestion(mode);
        if (!q) { finish(false); return; }
        state.remaining = settings.seconds;
        var root = K.stage();
        root.innerHTML = K.head('Pościg · odpowiedź = krok', 'Ucieczka przed T. rexem', K.chips([{ label: state.score + ' pkt', tone: 'ok' }, { label: '×' + settings.multiplier }])) + trackHtml() + '<div class="gk-chase-question"></div><p class="gk-chase-feedback" aria-live="polite">Odpowiedz, zanim czas minie.</p>';
        var slot = K.$('.gk-chase-question', root);
        var answered = false;
        var answerPicked = false;
        K.askChoice({ root: slot, question: q.q, options: q.options, correct: q.correct, why: q.why,
          onAnswer: function (ok) { if (answered || !state.active) return; answered = true; move(ok, q.why); } });
        slot.addEventListener('click', function (ev) {
          if (ev.target && ev.target.getAttribute('data-choice') !== null && !answerPicked) {
            answerPicked = true;
            if (state.timer) clearInterval(state.timer);
          }
        });
        state.timer = setInterval(function () {
          state.remaining--;
          var label = K.$('.gk-timer-value', root);
          if (label) label.textContent = state.remaining + ' s';
          if (state.remaining <= 0 && !answerPicked) { answered = true; move(false, 'Czas minął.'); }
        }, 1000);
      }
      question();
    }, 'Gra 07', 'Ucieczka przed T. rexem', 'Dobra odpowiedź oddala cię od drapieżnika. Błąd albo brak odpowiedzi przybliża go o krok.');
  }

  /* ------------------------------------------------------------
     08. SURVIVAL — 24 templates, six behavior variants each.
     ------------------------------------------------------------ */
  var SURVIVAL_EVENTS = [
    ['drapieżnik', 'Cień większego drapieżnika', 'Na skraju terenu przesuwa się cień znacznie większego zwierzęcia.'],
    ['drapieżnik', 'Zasadzka w zaroślach', 'Z gęstwiny słychać ciężkie kroki — ktoś czeka w ukryciu.'],
    ['drapieżnik', 'Alarm stada', 'Inne zwierzęta nagle uciekają w jednym kierunku.'],
    ['głód', 'Uboga roślinność', 'Po długiej wędrówce pokarmu wokół jest wyraźnie mniej niż zwykle.'],
    ['głód', 'Mało drobnej zdobyczy', 'Drobna zdobycz zniknęła z okolicy niemal całkowicie.'],
    ['głód', 'Wyczerpany żer', 'Znane źródło pokarmu zostało już wyjedzone do końca.'],
    ['pogoda', 'Nagłe ochłodzenie', 'Wieczorem temperatura gwałtownie spada.'],
    ['pogoda', 'Upał bez cienia', 'W południe powietrze stoi, a cienia nie ma nigdzie.'],
    ['pogoda', 'Silny wiatr', 'Nad otwartym terenem wieje tak mocno, że trudno wyczuć zapachy.'],
    ['konkurencja', 'Rywal przy pożywieniu', 'Przy najlepszym miejscu żerowania stoi już inny osobnik twojego gatunku.'],
    ['konkurencja', 'Tłok przy wodopoju', 'Przy wodzie zebrało się zbyt wiele zwierząt naraz.'],
    ['konkurencja', 'Obce stado', 'Na trasę przemarszu weszło obce, liczne stado.'],
    ['terytorium', 'Zapach obcego osobnika', 'Na granicy znanego terenu pojawił się świeży, obcy zapach.'],
    ['terytorium', 'Nieznane przejście', 'Odkrywasz nowe przejście, którego nikt jeszcze nie sprawdził.'],
    ['rozmnażanie', 'Miejsce na gniazdo', 'Nadchodzi okres składania jaj i trzeba wybrać bezpieczne miejsce.'],
    ['rozmnażanie', 'Ochrona młodych', 'W pobliżu kryjówki młodych krąży coś podejrzanego.'],
    ['migracja', 'Wysychająca trasa', 'Dawna trasa wędrówki wysycha i staje się nieprzejezdna.'],
    ['migracja', 'Zmiana pór roku', 'Sezonowa zmiana roślinności zmusza do decyzji o przemieszczeniu się.'],
    ['choroba', 'Bolesna rana stopy', 'Po skalistym odcinku każdy krok sprawia ból.'],
    ['choroba', 'Pasożyty i osłabienie', 'Od kilku dni czujesz narastające osłabienie i swędzenie skóry.'],
    ['powódź', 'Nagła fala', 'Po ulewie woda gwałtownie podnosi się i zalewa niziny.'],
    ['powódź', 'Długotrwała susza', 'Kolejny tydzień bez deszczu wysusza wszystkie zbiorniki.'],
    ['wulkan', 'Pył w powietrzu', 'Z daleka nadciąga chmura wulkanicznego pyłu.'],
    ['wulkan', 'Wstrząsy gruntu', 'Ziemia drży, a z ziemi unosi się siarkowy zapach.']
  ];

  function survivalProfile(t) {
    var feature = String(t.feature || '').toLowerCase();
    var defense = String(t.defense || '').toLowerCase();
    if (defense === 'armor' || feature.indexOf('pancerz') !== -1) return 'armored';
    if (defense === 'glide' || feature.indexOf('skrzyd') !== -1 || feature.indexOf('piór') !== -1) return 'flying';
    if (t.diet === 'drapieżnik' || t.diet === 'owadożerca' || t.diet === 'wszystkożerca') return (+t.lengthM || 3) >= 6 ? 'largePredator' : 'smallPredator';
    return (+t.lengthM || 4) >= 6 ? 'largeHerbivore' : 'smallHerbivore';
  }

  var SURVIVAL_VARIANTS = {
    largePredator: { noun: 'duży drapieżnik', approach: 'wykorzystujesz masę i zmysły, ale nie ryzykujesz niepotrzebnej walki', safe: 'obchodzisz zagrożenie szerokim łukiem i obserwujesz teren', bold: 'zajmujesz pozycję osłaniającą, gotów odstraszyć rywala', bad: 'szarżujesz bez rozeznania', mult: { health: 0.85, food: 1.2, safety: 0.8 } },
    smallPredator: { noun: 'mały drapieżnik', approach: 'stawiasz na szybkość, osłonę i ostrożne polowanie', safe: 'przenosisz się pod osłonę i szukasz bezpiecznej ścieżki', bold: 'obserwujesz z dystansu, wykorzystując zwinność', bad: 'wchodzisz w otwartą konfrontację', mult: { health: 0.8, food: 1.15, safety: 0.7 } },
    largeHerbivore: { noun: 'duży roślinożerca', approach: 'korzystasz z rozmiaru, lecz oszczędzasz energię', safe: 'pozostajesz przy osłonie i wybierasz stabilny teren', bold: 'ustawiasz ciało defensywnie i szukasz wsparcia grupy', bad: 'tracisz energię na pochopny manewr', mult: { health: 1.05, food: 1.1, safety: 1 } },
    smallHerbivore: { noun: 'mały roślinożerca', approach: 'wybierasz kryjówki i szybkie zmiany kierunku', safe: 'ukrywasz się w osłonie oraz sprawdzasz drogę odwrotu', bold: 'przemieszczasz się szybko przy osłonie terenu', bad: 'wychodzisz na otwartą przestrzeń bez planu', mult: { health: 0.85, food: 1, safety: 0.7 } },
    armored: { noun: 'opancerzony roślinożerca', approach: 'wykorzystujesz pancerz, ogon lub masywną sylwetkę bez lekkomyślności', safe: 'obracasz chronioną stronę ku zagrożeniu i cofając się szukasz osłony', bold: 'przyjmujesz pozycję obronną, chroniąc wrażliwe części ciała', bad: 'oddalasz się w panice, odsłaniając słabsze miejsca', mult: { health: 1.2, food: 1, safety: 1.25 } },
    flying: { noun: 'lekki, pierzasty lub latający takson', approach: 'wybierasz wysokość, zwinność i osłonę zamiast siłowej rywalizacji', safe: 'przemieszczasz się do bezpiecznej osłony lub wyższego miejsca', bold: 'wykorzystujesz lekkość, by szybko zmienić pozycję', bad: 'pozostajesz na odsłoniętym terenie mimo ryzyka', mult: { health: 0.8, food: 1.1, safety: 0.65 } }
  };

  function change(base, mult) { return Math.round(base * mult); }

  function buildSurvivalScenario(event, taxon, type, turn) {
    var v = SURVIVAL_VARIANTS[type];
    var category = event[0];
    var HABITAT_PL = {
      floodplain: 'nadrzeczna równina zalewowa',
      coastal: 'wybrzeże',
      arid: 'sucha, piaszczysta równina',
      forest: 'gęsty las',
      polar: 'chłodna, polarna kraina'
    };
    var habitat = HABITAT_PL[String(taxon.habitat || '').toLowerCase()] || 'twoja okolica';
    var feature = taxon.feature || 'budowa ciała';
    var intro = event[2] + ' Siedlisko: ' + habitat + '. Jako ' + v.noun + ' (' + taxon.common + ') ' + v.approach + '.';
    var actions;
    if (category === 'głód') {
      actions = [
        { text: 'Szukasz pokarmu ostrożnie w osłonie terenu.', fx: { health: -3, food: 14, safety: 4 }, good: true },
        { text: 'Wyruszasz daleko bez sprawdzenia zagrożeń.', fx: { health: -8, food: 8, safety: -12 } },
        { text: 'Odpoczywasz i ignorujesz głód.', fx: { health: -9, food: -13, safety: 2 } }
      ];
    } else if (category === 'drapieżnik' || category === 'konkurencja' || category === 'terytorium') {
      actions = [
        { text: v.safe + '.', fx: { health: 1, food: -4, safety: 14 }, good: true },
        { text: v.bold + '.', fx: { health: -3, food: 1, safety: 7 }, good: true },
        { text: v.bad + '.', fx: { health: -13, food: -3, safety: -16 } },
        { text: 'Stoisz nieruchomo na odsłoniętym terenie.', fx: { health: -5, food: -4, safety: -10 } }
      ];
    } else if (category === 'pogoda' || category === 'powódź' || category === 'wulkan') {
      actions = [
        { text: 'Szukasz stabilnej osłony i zmieniasz trasę.', fx: { health: 4, food: -3, safety: 13 }, good: true },
        { text: 'Podążasz za naturalnym ukształtowaniem terenu.', fx: { health: 0, food: -2, safety: 8 }, good: true },
        { text: 'Zostajesz w najbardziej ryzykownym miejscu.', fx: { health: -14, food: -5, safety: -15 } }
      ];
    } else if (category === 'rozmnażanie') {
      actions = [
        { text: 'Wybierasz osłonięte miejsce i ograniczasz ryzyko.', fx: { health: -2, food: -5, safety: 12 }, good: true },
        { text: 'Pilnujesz terenu, ale regularnie żerujesz.', fx: { health: 1, food: 5, safety: 5 }, good: true },
        { text: 'Bronisz miejsca bez odpoczynku i pożywienia.', fx: { health: -10, food: -10, safety: 2 } }
      ];
    } else if (category === 'migracja') {
      actions = [
        { text: 'Wybierasz stopniową trasę z wodą i osłoną.', fx: { health: 3, food: 5, safety: 11 }, good: true },
        { text: 'Podążasz za rozpoznawalnymi punktami terenu.', fx: { health: 0, food: 2, safety: 8 }, good: true },
        { text: 'Idziesz najkrótszą, nieznaną drogą bez postoju.', fx: { health: -11, food: -6, safety: -10 } }
      ];
    } else {
      actions = [
        { text: 'Zwalniasz tempo, oczyszczasz ranę i szukasz osłony.', fx: { health: 8, food: -4, safety: 6 }, good: true },
        { text: 'Ograniczasz ruch, lecz pilnujesz dostępu do pokarmu.', fx: { health: 5, food: 4, safety: 3 }, good: true },
        { text: 'Forsujesz marsz, mimo osłabienia.', fx: { health: -15, food: -3, safety: -6 } }
      ];
    }
    actions.forEach(function (a) {
      a.fx.health = change(a.fx.health, v.mult.health); a.fx.food = change(a.fx.food, v.mult.food); a.fx.safety = change(a.fx.safety, v.mult.safety);
      a.why = (a.good ? 'Dobra decyzja: ' : 'Ryzykowna decyzja: ') + 'dla ' + taxon.common + ' cecha „' + feature + '” oznacza, że ' + v.approach + '. ' +
        'Wpływ: zdrowie ' + (a.fx.health >= 0 ? '+' : '') + a.fx.health + ', sytość ' + (a.fx.food >= 0 ? '+' : '') + a.fx.food + ', bezpieczeństwo ' + (a.fx.safety >= 0 ? '+' : '') + a.fx.safety + '.';
    });
    return { title: event[1], text: intro, actions: K.shuffle(actions), turn: turn };
  }

  function startSurvival() {
    var dinos = K.dinos();
    K.stage().innerHTML = K.head('Gra 08', 'Wybierz dinozaura', '') + '<p class="gk-intro">Zagrasz jako wybrany takson. Każda decyzja zmieni zdrowie, sytość albo bezpieczeństwo.</p><div class="gk-survival-picker">' + dinos.map(function (d) {
      return '<button class="gk-dino-pick" data-dino="' + K.esc(d.id) + '"><img src="' + K.img(d.image) + '" alt=""><strong>' + K.esc(d.common) + '</strong><small><i>' + K.esc(d.scientific) + '</i></small></button>';
    }).join('') + '</div>';
    K.$$('.gk-dino-pick', K.stage()).forEach(function (button) {
      button.addEventListener('click', function () {
        var chosen = dinos.filter(function (d) { return d.id === button.dataset.dino; })[0];
        playSurvival(chosen, matchTaxon(chosen));
      });
    });
  }

  function playSurvival(dino, taxon) {
    var type = survivalProfile(taxon);
    var events = K.shuffle(SURVIVAL_EVENTS).slice(0, 12);
    var state = { health: 100, food: 100, safety: 100, turn: 0, alive: true, cause: '' };
    function hud() {
      return '<div class="gk-survival-hud">' +
        '<div><span>Zdrowie <b>' + state.health + '</b></span>' + K.bar(state.health, 'gk-health') + '</div>' +
        '<div><span>Sytość <b>' + state.food + '</b></span>' + K.bar(state.food, 'gk-food') + '</div>' +
        '<div><span>Bezpieczeństwo <b>' + state.safety + '</b></span>' + K.bar(state.safety, 'gk-safety') + '</div></div>';
    }
    function end() {
      var survived = state.turn;
      var sum = Math.max(0, state.health) + Math.max(0, state.food) + Math.max(0, state.safety);
      var score = Math.round(sum * survived / 4 + (state.alive && survived === 12 ? 250 : 0));
      K.finish({ game: 'survival', score: score, max: 1150, win: state.alive && survived === 12,
        title: state.alive && survived === 12 ? dino.common + ' przetrwał(a) 12 tur' : dino.common + ' nie przetrwał(a)',
        lines: ['Przetrwane tury: ' + survived + ' / 12', 'Końcowe wskaźniki: zdrowie ' + Math.max(0, state.health) + ', sytość ' + Math.max(0, state.food) + ', bezpieczeństwo ' + Math.max(0, state.safety), state.alive ? 'Premia za pełne przetrwanie: +250 pkt' : 'Przyczyna śmierci: ' + K.esc(state.cause)], onReplay: startSurvival });
    }
    function next() {
      if (!state.alive || state.turn >= 12) { end(); return; }
      var sc = buildSurvivalScenario(events[state.turn], taxon, type, state.turn + 1);
      K.stage().innerHTML = K.head('Przetrwanie · tura ' + (state.turn + 1) + '/12', dino.common, K.chips([{ label: SURVIVAL_VARIANTS[type].noun }])) + hud() +
        '<article class="gk-survival-scene"><img src="' + K.img(dino.image) + '" alt="' + K.esc(dino.common) + '"><div><p class="app-kicker">' + K.esc(sc.title) + '</p><h3>Co robisz?</h3><p>' + K.esc(sc.text) + '</p></div></article><div class="gk-survival-actions">' + sc.actions.map(function (a, i) { return '<button data-action="' + i + '">' + K.esc(a.text) + '</button>'; }).join('') + '</div><div class="gk-survival-consequence" aria-live="polite"></div>';
      K.$$('.gk-survival-actions button', K.stage()).forEach(function (button) {
        button.addEventListener('click', function () {
          var a = sc.actions[+button.dataset.action];
          K.$$('.gk-survival-actions button', K.stage()).forEach(function (b) { b.disabled = true; });
          state.health = Math.max(0, Math.min(100, state.health + a.fx.health));
          state.food = Math.max(0, Math.min(100, state.food + a.fx.food));
          state.safety = Math.max(0, Math.min(100, state.safety + a.fx.safety));
          state.turn++;
          if (!state.health) { state.alive = false; state.cause = 'obrażenia i wyczerpanie'; }
          else if (!state.food) { state.alive = false; state.cause = 'głód'; }
          else if (!state.safety) { state.alive = false; state.cause = 'brak bezpieczeństwa wobec zagrożeń'; }
          var box = K.$('.gk-survival-consequence', K.stage());
          box.innerHTML = '<strong class="' + (a.good ? 'ok' : 'no') + '">' + (a.good ? 'Korzystna konsekwencja.' : 'Trudna konsekwencja.') + '</strong><p>' + K.esc(a.why) + '</p>' + hud() + '<button class="button gk-next">' + (!state.alive ? 'Zobacz wynik' : state.turn === 12 ? 'Podsumowanie' : 'Następna tura') + '</button>';
          K.$('.gk-next', box).addEventListener('click', next);
        });
      });
    }
    next();
  }

  /* ------------------------------------------------------------
     09. DEDUCTION
     ------------------------------------------------------------ */
  function deductionFacts(secret, board) {
    var countries = K.countries();
    function cName(code) { var x = countries.filter(function (c) { return c.code === code; })[0]; return x ? x.name : code; }
    var all = [
      { text: (secret.diet === 'drapieżnik' ? 'Był drapieżnikiem.' : 'Nie był drapieżnikiem.'), test: function (x) { return (x.diet === 'drapieżnik') === (secret.diet === 'drapieżnik'); }, type: 'dieta' },
      { text: 'Żył w okresie: ' + secret.period + '.', test: function (x) { return x.period === secret.period; }, type: 'okres' },
      { text: (+secret.lengthM || 0) < 6 ? 'Mierzył mniej niż 6 metrów.' : 'Mierzył co najmniej 6 metrów.', test: function (x) { return ((+x.lengthM || 0) < 6) === ((+secret.lengthM || 0) < 6); }, type: 'długość' },
      { text: 'Należał do kladu ' + secret.clade + '.', test: function (x) { return x.clade === secret.clade; }, type: 'klad' }
    ];
    (secret.countries || []).forEach(function (code) {
      all.push({ text: 'Znaleziono go również w: ' + cName(code) + '.', test: function (x) { return (x.countries || []).indexOf(code) !== -1; }, type: 'kraj' });
    });
    if (secret.clade) all.push({
      text: secret.clade === 'Tyrannosauridae' ? 'Należy do Tyrannosauridae.' : 'Nie należy do Tyrannosauridae.',
      test: function (x) { return (x.clade === 'Tyrannosauridae') === (secret.clade === 'Tyrannosauridae'); },
      type: 'negacja kladu'
    });
    return K.shuffle(all).filter(function (fact) {
      var matching = board.filter(fact.test).length;
      return matching >= 1 && matching < board.length;
    });
  }

  function startDeduction() {
    modes(function (mode) {
      var amount = mode === 'easy' ? 8 : mode === 'medium' ? 12 : 16;
      var source = K.taxa().filter(function (t) { return t.common && t.image && t.period && t.diet && t.clade; });
      if (source.length < amount) { renderError('Za mało kompletnych kart taksonów.'); return; }
      var board = K.sample(source, amount);
      var secret = K.pick(board);
      var facts = deductionFacts(secret, board);
      var state = { eliminated: {}, hint: 0, hintsUsed: 0, pool: 1000, finished: false };
      if (!facts.length) { startDeduction(); return; }

      function render(message) {
        var remaining = board.filter(function (x) { return !state.eliminated[x.id]; });
        K.stage().innerHTML = K.head('Dedukcja · Guess Who', 'Który dinozaur?', K.chips([{ label: 'Pozostało: ' + remaining.length }, { label: 'Wskazówki: ' + state.hintsUsed }, { label: state.pool + ' pkt', tone: 'warn' }])) +
          '<section class="gk-deduction-clue"><p class="app-kicker">Wskazówka ' + (state.hintsUsed + 1) + '</p><h3>' + K.esc(facts[state.hint].text) + '</h3><p>Samodzielnie przekreśl karty, które nie pasują do tej informacji.</p></section>' +
          '<div class="gk-deduction-grid">' + board.map(function (t) {
            var off = !!state.eliminated[t.id];
            return '<button class="gk-deduction-card' + (off ? ' is-eliminated' : '') + '" data-card="' + K.esc(t.id) + '" aria-pressed="' + off + '"><img src="' + K.img(t.image) + '" alt=""><strong>' + K.esc(t.common) + '</strong><small><i>' + K.esc(t.scientific) + '</i></small><span>' + (off ? 'Odrzucono' : 'Kliknij, aby odrzucić') + '</span></button>';
          }).join('') + '</div><p class="gk-deduction-message" aria-live="polite">' + K.esc(message || '') + '</p><div class="gk-deduction-actions"><button class="button gk-next-hint"' + (state.hint >= facts.length - 1 ? ' disabled' : '') + '>Następna wskazówka (−150 pkt)</button><button class="button gk-submit"' + (remaining.length === 1 ? '' : ' disabled') + '>Zgłoś odpowiedź</button></div>';
        K.$$('.gk-deduction-card', K.stage()).forEach(function (button) {
          button.addEventListener('click', function () {
            if (state.finished) return;
            var id = button.dataset.card;
            state.eliminated[id] = !state.eliminated[id];
            if (id === secret.id && state.eliminated[id]) {
              state.finished = true;
              K.finish({ game: 'deduction', score: 0, max: 1000, win: false, title: 'Odrzucono sekretnego dinozaura', lines: ['Sekretnym taksonem był: ' + K.esc(secret.common), 'Przeanalizuj wskazówki i spróbuj ponownie.'], onReplay: startDeduction });
              return;
            }
            render('Karta została ' + (state.eliminated[id] ? 'odrzucona.' : 'przywrócona do puli.'));
          });
        });
        var nextHint = K.$('.gk-next-hint', K.stage());
        if (nextHint) nextHint.addEventListener('click', function () {
          if (state.hint >= facts.length - 1) return;
          state.hint++; state.hintsUsed++; state.pool = Math.max(0, state.pool - 150);
          render('Nowa wskazówka obniżyła pulę punktów.');
        });
        var submit = K.$('.gk-submit', K.stage());
        if (submit) submit.addEventListener('click', function () {
          var candidate = board.filter(function (x) { return !state.eliminated[x.id]; })[0];
          var ok = candidate && candidate.id === secret.id;
          state.finished = true;
          K.finish({ game: 'deduction', score: ok ? state.pool : 0, max: 1000, win: ok, title: ok ? 'Trafna dedukcja!' : 'To nie był sekretny dinozaur',
            lines: ['Sekretny takson: ' + K.esc(secret.common), 'Wykorzystane wskazówki: ' + (state.hintsUsed + 1), ok ? 'Zachowana pula: ' + state.pool + ' pkt' : 'Wybrano: ' + K.esc(candidate ? candidate.common : 'brak')], onReplay: startDeduction });
        });
      }
      render('Pierwsza wskazówka jest już aktywna.');
    }, 'Gra 09', 'Który dinozaur?', 'Czytaj wskazówki, ręcznie eliminuj niepasujące karty i zgłoś odpowiedź dopiero, gdy zostanie jedna.');
  }

  K.register('diagnosis', startDiagnosis);
  K.register('mapa', startMap);
  K.register('escape', startEscape);
  K.register('survival', startSurvival);
  K.register('deduction', startDeduction);
})();
