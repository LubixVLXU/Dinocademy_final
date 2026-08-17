/* ============================================================
   Courses — rejestr kursów Dinocademy
   Ujednolica różne źródła danych do wspólnego modelu:
     course { id, title, subtitle, kicker, badge, level, accent,
              modules: [{ id, num, title, summary, figures, lessons, quiz }] }
   Dostęp: darmowe / Pro — reguła w freeRule()
   ============================================================ */
(function () {
  'use strict';

  var list = [];

  /* ---------- 1. Wszystko o dinozaurach (kurs dla miłośników) ---------- */
  if (window.COURSE_DINO && window.COURSE_DINO.modules && window.COURSE_DINO.modules.length) {
    var mods = window.COURSE_DINO.modules.slice().sort(function (a, b) { return (a.num || 0) - (b.num || 0); });
    list.push({
      id: 'dino-all',
      title: 'Świat dinozaurów — kurs kompletny',
      subtitle: 'Wszystko o dinozaurach: od pierwszych archozaurów do współczesnych ptaków. Kurs dla pasjonatów, bez wymaganej wiedzy wstępnej.',
      kicker: 'KURS OTWARTY · POZIOM PODSTAWOWY',
      badge: 'Najpopularniejszy',
      level: 'Dla każdego',
      accent: '#1f4e79',
      modules: mods
    });
  }

  /* ---------- 2. Paleontologia praktyczna (istniejący plan) ---------- */
  if (window.COURSE_PLAN && window.COURSE_PLAN.stages) {
    var pm = [];
    var num = 0;
    window.COURSE_PLAN.stages.forEach(function (st, si) {
      (st.modules || []).forEach(function (m) {
        num++;
        pm.push({
          id: m.id,
          num: num,
          title: m.title,
          stage: 'Etap ' + si + ' · ' + st.title,
          summary: m.keyLesson && m.keyLesson.desc ? m.keyLesson.desc : '',
          keyLesson: m.keyLesson,
          practice: m.practice,
          figures: [],
          lessons: (m.lessons || []).map(function (l) {
            return { id: l.id, title: l.title, desc: l.desc, duration: l.duration, body: l.body || null };
          }),
          quiz: m.quiz || []
        });
      });
    });
    list.push({
      id: 'paleo-pro',
      title: 'Paleontologia praktyczna',
      subtitle: 'Ścieżka warsztatowa: metoda naukowa, praca ze skamieniałościami, analiza filogenetyczna i czytanie literatury. Z certyfikacją.',
      kicker: 'ŚCIEŻKA ZAWODOWA · 8 ETAPÓW',
      badge: 'Certyfikat',
      level: 'Średni / zaawansowany',
      accent: '#315e4c',
      grouped: true,
      certification: window.COURSE_PLAN.certification || null,
      modules: pm
    });
  }

  /* ---------- reguła dostępu ---------- */
  /* Darmowe:
       - rozdziały 1 i 2 w całości (pełne wprowadzenie i narodziny dinozaurów),
       - pierwsza lekcja każdego z rozdziałów 3–6 (próbka epok i systematyki),
       - rozdział 33 „Fakty i mity" — pierwsze dwie lekcje (najczęściej szukane treści).
     Reszta wymaga planu Pro. */
  function isFree(course, mod, lessonIndex) {
    if (!mod) return false;
    if (mod.num === 1 || mod.num === 2) return true;
    if (mod.num >= 3 && mod.num <= 6 && lessonIndex === 0) return true;
    if (mod.num === 33 && lessonIndex < 2) return true;
    return false;
  }

  function freeCount(course) {
    var n = 0;
    course.modules.forEach(function (m) {
      m.lessons.forEach(function (l, i) { if (isFree(course, m, i)) n++; });
    });
    return n;
  }

  function lessonCount(course) {
    var n = 0;
    course.modules.forEach(function (m) { n += m.lessons.length; });
    return n;
  }

  function minutes(course) {
    var n = 0;
    course.modules.forEach(function (m) { m.lessons.forEach(function (l) { n += (l.duration || 9); }); });
    return n;
  }

  function quizCount(course) {
    var n = 0;
    course.modules.forEach(function (m) { if (m.quiz && m.quiz.length) n += m.quiz.length; });
    return n;
  }

  function get(id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function module(course, mid) {
    if (!course) return null;
    for (var i = 0; i < course.modules.length; i++) if (course.modules[i].id === mid) return course.modules[i];
    return null;
  }

  window.Courses = {
    all: list, get: get, module: module,
    isFree: isFree, freeCount: freeCount,
    lessonCount: lessonCount, minutes: minutes, quizCount: quizCount
  };
})();
/* ============================================================
   Course Hub — trzypoziomowa nawigacja
     data-page="kursy" → wybór kursu
     data-page="kurs"  → rozdziały kursu     (?c=<courseId>)
     data-page="lekcja"→ lekcja + quiz       (?c=&m=&l=)
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
  function qs(k) { return new URLSearchParams(location.search).get(k); }
  function token() { return localStorage.getItem('dinocademy-token') || null; }
  function pad(n) { return String(n).padStart(2, '0'); }

  /* ---------- stan użytkownika ---------- */
  var state = { logged: false, isPro: false, done: {} };

  function loadState() {
    var t = token();
    if (!t) return Promise.resolve(state);
    var h = t ? { 'X-Session-Token': t } : {};
    return Promise.all([
      fetch(API_BASE + '/api/me', { headers: h, credentials: 'same-origin' }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
      fetch(API_BASE + '/api/progress', { headers: h, credentials: 'same-origin' }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
    ]).then(function (res) {
      var u = res[0] && res[0].user;
      state.logged = !!u;
      state.isPro = !!(u && (u.isPro || u.is_pro));
      var p = res[1];
      var rows = p && (p.progress || p.lessons || p.completed) || [];
      if (rows.length) rows.forEach(function (r) {
        var id = r.lesson_id || r.lessonId || r.id || r;
        if (id) state.done[id] = true;
      });
      return state;
    });
  }

  function markDone(lessonId) {
    var t = token();
    return fetch(API_BASE + '/api/progress', {
      method: 'POST', credentials: 'same-origin',
      headers: t ? { 'Content-Type': 'application/json', 'X-Session-Token': t } : { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId: lessonId, lesson_id: lessonId, completed: true })
    }).catch(function () {});
  }

  /* ---------- wspólne elementy ---------- */
  function lockBadge() { return '<span class="ch-lock" title="Wymaga planu Pro">PRO</span>'; }
  function freeBadge() { return '<span class="ch-free">Darmowa</span>'; }

  function breadcrumb(items) {
    return '<nav class="ch-crumbs" aria-label="Ścieżka">' + items.map(function (it, i) {
      var last = i === items.length - 1;
      return (last ? '<span aria-current="page">' + esc(it.label) + '</span>'
        : '<a href="' + it.href + '">' + esc(it.label) + '</a><i aria-hidden="true">/</i>');
    }).join('') + '</nav>';
  }

  function proNote(msg) {
    return '<div class="ch-pronote"><strong>Plan Pro</strong><p>' + msg + '</p>' +
      (state.logged ? '<a class="button button-small" href="pro.html">Przejdź na Pro</a>'
        : '<a class="button button-small" href="logowanie.html?next=%2Fkursy">Zaloguj się</a>') + '</div>';
  }

  /* ============================================================
     POZIOM 1 — wybór kursu
     ============================================================ */
  function renderCourses() {
    var root = $('#ch-root'); if (!root) return;
    var courses = window.Courses ? window.Courses.all : [];
    if (!courses.length) { root.innerHTML = '<p class="ch-empty">Brak dostępnych kursów.</p>'; return; }

    root.innerHTML =
      '<header class="ch-hero">' +
      '<span class="app-kicker">BIBLIOTEKA KURSÓW</span>' +
      '<h1>Wybierz kurs</h1>' +
      '<p>Każdy kurs to osobna ścieżka: najpierw wybierasz kurs, potem rozdział, na końcu pojedynczą lekcję. Trudniejsze terminy w lekcjach są podkreślone — kliknij je, aby zobaczyć wyjaśnienie.</p>' +
      '</header>' +
      '<div class="ch-course-list">' + courses.map(function (c, i) {
        var lc = window.Courses.lessonCount(c);
        var mins = window.Courses.minutes(c);
        var qc = window.Courses.quizCount(c);
        var fc = window.Courses.freeCount(c);
        return '<a class="ch-course" href="kurs.html?c=' + encodeURIComponent(c.id) + '" style="--ch-accent:' + c.accent + '">' +
          '<div class="ch-course-side"><span class="ch-course-num">' + pad(i + 1) + '</span>' +
          (c.badge ? '<span class="ch-course-badge">' + esc(c.badge) + '</span>' : '') + '</div>' +
          '<div class="ch-course-main">' +
          '<span class="ch-course-kicker">' + esc(c.kicker || '') + '</span>' +
          '<h2>' + esc(c.title) + '</h2>' +
          '<p>' + esc(c.subtitle || '') + '</p>' +
          '<dl class="ch-course-stats">' +
          '<div><dt>Rozdziały</dt><dd>' + c.modules.length + '</dd></div>' +
          '<div><dt>Lekcje</dt><dd>' + lc + '</dd></div>' +
          (qc ? '<div><dt>Quizy</dt><dd>' + qc + ' pytań</dd></div>' : '') +
          '<div><dt>Czas</dt><dd>~' + Math.round(mins / 60) + ' h</dd></div>' +
          '<div><dt>Poziom</dt><dd>' + esc(c.level || '—') + '</dd></div>' +
          '</dl>' +
          '<span class="ch-course-cta">' + fc + ' lekcji bezpłatnie · resztę odblokowuje Pro <i aria-hidden="true">→</i></span>' +
          '</div></a>';
      }).join('') + '</div>';
  }

  /* ============================================================
     POZIOM 2 — rozdziały kursu
     ============================================================ */
  function renderCourse() {
    var root = $('#ch-root'); if (!root) return;
    var c = window.Courses && window.Courses.get(qs('c') || (window.Courses.all[0] && window.Courses.all[0].id));
    if (!c) { root.innerHTML = '<p class="ch-empty">Nie znaleziono kursu. <a href="kursy.html">Wróć do listy kursów</a>.</p>'; return; }
    document.title = c.title + ' · Dinocademy';

    var doneTotal = 0, lessonsTotal = 0;
    c.modules.forEach(function (m) {
      lessonsTotal += m.lessons.length;
      m.lessons.forEach(function (l) { if (state.done[l.id]) doneTotal++; });
    });
    var pct = lessonsTotal ? Math.round(doneTotal / lessonsTotal * 100) : 0;

    var lastStage = null;
    var modsHtml = c.modules.map(function (m) {
      var free = m.lessons.some(function (l, i) { return window.Courses.isFree(c, m, i); });
      var allFree = m.lessons.every(function (l, i) { return window.Courses.isFree(c, m, i); });
      var mDone = m.lessons.filter(function (l) { return state.done[l.id]; }).length;
      var mins = m.lessons.reduce(function (a, l) { return a + (l.duration || 9); }, 0);
      var head = '';
      if (c.grouped && m.stage && m.stage !== lastStage) {
        lastStage = m.stage;
        head = '<h3 class="ch-stage-head">' + esc(m.stage) + '</h3>';
      }
      return head +
        '<a class="ch-module' + (mDone === m.lessons.length && mDone > 0 ? ' is-done' : '') + '" ' +
        'href="kurs.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(m.id) + '">' +
        '<span class="ch-module-num">' + pad(m.num) + '</span>' +
        '<div class="ch-module-body">' +
        '<h3>' + esc(m.title) + '</h3>' +
        (m.summary ? '<p>' + esc(m.summary) + '</p>' : '') +
        '<div class="ch-module-meta">' +
        '<span>' + m.lessons.length + ' lekcji</span>' +
        '<span>~' + mins + ' min</span>' +
        (m.quiz && m.quiz.length ? '<span>Quiz: ' + m.quiz.length + ' pytań</span>' : '') +
        (allFree ? freeBadge() : free ? '<span class="ch-free">Próbka bezpłatna</span>' : lockBadge()) +
        '</div>' +
        (mDone ? '<div class="ch-mini-bar"><i style="width:' + Math.round(mDone / m.lessons.length * 100) + '%"></i></div>' : '') +
        '</div>' +
        '<span class="ch-module-arrow" aria-hidden="true">→</span>' +
        '</a>';
    }).join('');

    /* widok jednego rozdziału (lista lekcji) */
    var mid = qs('m');
    if (mid) { renderModule(c, mid, root); return; }

    root.innerHTML =
      breadcrumb([{ label: 'Kursy', href: 'kursy.html' }, { label: c.title }]) +
      '<header class="ch-hero ch-hero-course" style="--ch-accent:' + c.accent + '">' +
      '<span class="app-kicker">' + esc(c.kicker || '') + '</span>' +
      '<h1>' + esc(c.title) + '</h1>' +
      '<p>' + esc(c.subtitle || '') + '</p>' +
      (state.logged
        ? '<div class="ch-progress"><div class="ch-progress-bar"><i style="width:' + pct + '%"></i></div>' +
          '<span>' + doneTotal + ' / ' + lessonsTotal + ' lekcji ukończonych (' + pct + '%)</span></div>'
        : '<p class="ch-hint">Zaloguj się, aby zapisywać postęp lekcji.</p>') +
      '</header>' +
      (!state.isPro ? proNote(c.id === 'dino-all'
          ? 'Bezpłatnie: całe rozdziały 1–2, pierwsza lekcja rozdziałów 3–6 oraz dwie lekcje z rozdziału „Fakty i mity”. Pozostałe lekcje, quizy i certyfikat wymagają planu Pro.'
          : 'Bezpłatnie otwarty jest pierwszy rozdział ścieżki. Pozostałe rozdziały, quizy i certyfikat wymagają planu Pro.') : '') +
      '<div class="ch-module-list">' + modsHtml + '</div>' +
      (c.certification ? '<section class="ch-cert"><span class="app-kicker">CERTYFIKACJA</span><h2>' +
        esc(c.certification.title || 'Certyfikat ukończenia') + '</h2><p>' +
        esc(c.certification.desc || 'Ukończ wszystkie rozdziały i zdaj quizy, aby otrzymać certyfikat.') + '</p></section>' : '');
  }

  /* --- lista lekcji w rozdziale --- */
  function renderModule(c, mid, root) {
    var m = window.Courses.module(c, mid);
    if (!m) { root.innerHTML = '<p class="ch-empty">Nie znaleziono rozdziału.</p>'; return; }
    document.title = m.title + ' · ' + c.title;

    var idx = c.modules.indexOf(m);
    var prev = c.modules[idx - 1], next = c.modules[idx + 1];
    var mDone = m.lessons.filter(function (l) { return state.done[l.id]; }).length;

    var lessons = m.lessons.map(function (l, i) {
      var free = window.Courses.isFree(c, m, i);
      var open = free || state.isPro;
      var done = !!state.done[l.id];
      var href = 'lekcja.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(m.id) + '&l=' + encodeURIComponent(l.id);
      return '<' + (open ? 'a class="ch-lesson' + (done ? ' is-done' : '') + '" href="' + href + '"' : 'div class="ch-lesson is-locked"') + '>' +
        '<span class="ch-lesson-num">' + (done ? '✓' : pad(i + 1)) + '</span>' +
        '<div class="ch-lesson-body"><strong>' + esc(l.title) + '</strong>' +
        (l.desc ? '<p>' + esc(l.desc) + '</p>' : '') + '</div>' +
        '<span class="ch-lesson-meta">' + (open ? (l.duration || 9) + ' min' : lockBadge()) + '</span>' +
        '</' + (open ? 'a' : 'div') + '>';
    }).join('');

    var figs = (m.figures && m.figures.length)
      ? '<section class="ch-figs"><span class="app-kicker">MATERIAŁ WIZUALNY</span><div class="ch-fig-grid">' +
        m.figures.map(function (f) {
          return '<figure class="ch-fig"><div class="ch-fig-ph" role="img" aria-label="' + esc(f.alt || f.caption || '') + '">' +
            '<span aria-hidden="true">Rycina</span></div><figcaption>' + esc(f.caption || '') + '</figcaption></figure>';
        }).join('') + '</div></section>'
      : '';

    var quizBtn = (m.quiz && m.quiz.length)
      ? (state.isPro
        ? '<a class="button ch-quiz-cta" href="lekcja.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(m.id) + '&quiz=1">Rozwiąż quiz rozdziału (' + m.quiz.length + ' pytań)</a>'
        : '<div class="ch-quiz-locked">Quiz rozdziału (' + m.quiz.length + ' pytań) — dostępny w planie Pro</div>')
      : '';

    root.innerHTML =
      breadcrumb([
        { label: 'Kursy', href: 'kursy.html' },
        { label: c.title, href: 'kurs.html?c=' + encodeURIComponent(c.id) },
        { label: 'Rozdział ' + m.num }
      ]) +
      '<header class="ch-hero ch-hero-module" style="--ch-accent:' + c.accent + '">' +
      '<span class="app-kicker">ROZDZIAŁ ' + pad(m.num) + (m.stage ? ' · ' + esc(m.stage) : '') + '</span>' +
      '<h1>' + esc(m.title) + '</h1>' +
      (m.summary ? '<p>' + esc(m.summary) + '</p>' : '') +
      '<div class="ch-progress"><div class="ch-progress-bar"><i style="width:' +
      (m.lessons.length ? Math.round(mDone / m.lessons.length * 100) : 0) + '%"></i></div>' +
      '<span>' + mDone + ' / ' + m.lessons.length + ' lekcji</span></div>' +
      '</header>' +
      '<div class="ch-lesson-list">' + lessons + '</div>' +
      quizBtn + figs +
      '<nav class="ch-pager">' +
      (prev ? '<a href="kurs.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(prev.id) + '"><small>Poprzedni rozdział</small><strong>' + esc(prev.title) + '</strong></a>' : '<span></span>') +
      (next ? '<a class="ch-pager-next" href="kurs.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(next.id) + '"><small>Następny rozdział</small><strong>' + esc(next.title) + '</strong></a>' : '<span></span>') +
      '</nav>';
  }

  /* ============================================================
     POZIOM 3 — lekcja / quiz
     ============================================================ */
  function renderLesson() {
    var root = $('#ch-root'); if (!root) return;
    var c = window.Courses && window.Courses.get(qs('c'));
    if (!c) { root.innerHTML = '<p class="ch-empty">Nie znaleziono kursu. <a href="kursy.html">Lista kursów</a>.</p>'; return; }
    var m = window.Courses.module(c, qs('m'));
    if (!m) { root.innerHTML = '<p class="ch-empty">Nie znaleziono rozdziału.</p>'; return; }

    if (qs('quiz')) { renderQuiz(c, m, root); return; }

    var li = -1;
    m.lessons.forEach(function (l, i) { if (l.id === qs('l')) li = i; });
    if (li === -1) li = 0;
    var l = m.lessons[li];
    var free = window.Courses.isFree(c, m, li);

    document.title = l.title + ' · ' + c.title;

    var crumbs = breadcrumb([
      { label: 'Kursy', href: 'kursy.html' },
      { label: c.title, href: 'kurs.html?c=' + encodeURIComponent(c.id) },
      { label: 'Rozdział ' + m.num, href: 'kurs.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(m.id) },
      { label: l.title }
    ]);

    if (!free && !state.isPro) {
      root.innerHTML = crumbs +
        '<div class="ch-paywall">' +
        '<span class="ch-paywall-mark" aria-hidden="true">✦</span>' +
        '<h1>' + esc(l.title) + '</h1>' +
        '<p>Ta lekcja jest częścią planu Pro.</p>' +
        '<ul class="ch-paywall-perks">' +
        '<li>Wszystkie ' + window.Courses.lessonCount(c) + ' lekcji tego kursu</li>' +
        '<li>Quizy po każdym rozdziale i zapis postępu</li>' +
        '<li>Centrum gier, XP, ranking i wykluwarnia</li>' +
        '<li>Certyfikat po ukończeniu ścieżki</li>' +
        '</ul>' +
        '<div class="ch-paywall-actions">' +
        (state.logged ? '<a class="button" href="pro.html">Przejdź na Pro</a>'
          : '<a class="button" href="logowanie.html?next=%2Fkursy">Zaloguj się</a><a class="quiet-link" href="pro.html">Zobacz plan Pro →</a>') +
        '</div></div>';
      return;
    }

    var body = (l.body && l.body.length) ? l.body.join('\n')
      : '<p>' + esc(l.desc || 'Treść tej lekcji jest w przygotowaniu.') + '</p>';

    var fig = l.figure
      ? '<figure class="ch-fig ch-fig-wide"><div class="ch-fig-ph" role="img" aria-label="' + esc(l.figure.alt || '') + '">' +
        '<span aria-hidden="true">Rycina</span></div><figcaption>' + esc(l.figure.caption || '') + '</figcaption></figure>'
      : '';

    var prev = m.lessons[li - 1], next = m.lessons[li + 1];
    var base = 'lekcja.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(m.id) + '&l=';

    root.innerHTML = crumbs +
      '<article class="ch-lesson-page" style="--ch-accent:' + c.accent + '">' +
      '<header class="ch-lesson-head">' +
      '<span class="app-kicker">ROZDZIAŁ ' + pad(m.num) + ' · LEKCJA ' + pad(li + 1) + ' / ' + pad(m.lessons.length) + (free ? ' · BEZPŁATNA' : '') + '</span>' +
      '<h1>' + esc(l.title) + '</h1>' +
      (l.desc ? '<p class="ch-lesson-lede">' + esc(l.desc) + '</p>' : '') +
      '<div class="ch-lesson-facts"><span>' + (l.duration || 9) + ' min czytania</span><span>' + esc(m.title) + '</span></div>' +
      '</header>' +
      fig +
      '<div class="ch-prose" id="ch-prose">' + body + '</div>' +
      '<div class="ch-lesson-foot">' +
      '<button class="button" id="ch-done">' + (state.done[l.id] ? '✓ Lekcja ukończona' : 'Oznacz jako ukończoną') + '</button>' +
      (m.quiz && m.quiz.length && li === m.lessons.length - 1
        ? '<a class="quiet-link" href="lekcja.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(m.id) + '&quiz=1">Przejdź do quizu rozdziału →</a>' : '') +
      '</div>' +
      '<nav class="ch-pager">' +
      (prev ? '<a href="' + base + encodeURIComponent(prev.id) + '"><small>Poprzednia lekcja</small><strong>' + esc(prev.title) + '</strong></a>' : '<span></span>') +
      (next ? '<a class="ch-pager-next" href="' + base + encodeURIComponent(next.id) + '"><small>Następna lekcja</small><strong>' + esc(next.title) + '</strong></a>'
        : '<a class="ch-pager-next" href="kurs.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(m.id) + '"><small>Koniec rozdziału</small><strong>Wróć do spisu lekcji</strong></a>') +
      '</nav></article>';

    /* podkreślenia terminów */
    if (window.Glossary) window.Glossary.apply($('#ch-prose'));

    var btn = $('#ch-done');
    if (btn) btn.addEventListener('click', function () {
      state.done[l.id] = true;
      btn.textContent = '✓ Lekcja ukończona';
      btn.classList.add('is-done');
      markDone(l.id);
    });
  }

  /* --- quiz rozdziału --- */
  function renderQuiz(c, m, root) {
    var qs_ = (m.quiz || []).slice();
    if (!qs_.length) { root.innerHTML = '<p class="ch-empty">Ten rozdział nie ma jeszcze quizu.</p>'; return; }
    document.title = 'Quiz: ' + m.title;

    if (!state.isPro) {
      root.innerHTML = breadcrumb([
        { label: 'Kursy', href: 'kursy.html' },
        { label: c.title, href: 'kurs.html?c=' + encodeURIComponent(c.id) },
        { label: 'Rozdział ' + m.num, href: 'kurs.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(m.id) }
      ]) + '<div class="ch-paywall"><span class="ch-paywall-mark" aria-hidden="true">✦</span>' +
        '<h1>Quizy są w planie Pro</h1><p>Sprawdź wiedzę po każdym rozdziale i zdobywaj XP.</p>' +
        '<div class="ch-paywall-actions">' +
        (state.logged ? '<a class="button" href="pro.html">Przejdź na Pro</a>' : '<a class="button" href="logowanie.html?next=%2Fkursy">Zaloguj się</a>') +
        '</div></div>';
      return;
    }

    var i = 0, score = 0;
    root.innerHTML = breadcrumb([
      { label: 'Kursy', href: 'kursy.html' },
      { label: c.title, href: 'kurs.html?c=' + encodeURIComponent(c.id) },
      { label: 'Rozdział ' + m.num, href: 'kurs.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(m.id) },
      { label: 'Quiz' }
    ]) + '<section class="ch-quiz" style="--ch-accent:' + c.accent + '" id="ch-quiz"></section>';

    function step() {
      var box = $('#ch-quiz');
      if (i >= qs_.length) {
        var pct = Math.round(score / qs_.length * 100);
        box.innerHTML =
          '<div class="ch-quiz-result' + (pct >= 60 ? ' is-pass' : ' is-fail') + '">' +
          '<span class="ch-quiz-badge">' + (pct >= 60 ? '✓' : '✕') + '</span>' +
          '<h1>' + score + ' / ' + qs_.length + ' poprawnych</h1>' +
          '<div class="ch-progress-bar"><i style="width:' + pct + '%"></i></div>' +
          '<p>' + (pct >= 60 ? 'Rozdział zaliczony. Możesz przejść dalej.' : 'Wróć do lekcji i spróbuj ponownie — próg zaliczenia to 60%.') + '</p>' +
          '<div class="ch-quiz-actions"><button class="button" id="ch-retry">Spróbuj ponownie</button>' +
          '<a class="quiet-link" href="kurs.html?c=' + encodeURIComponent(c.id) + '&m=' + encodeURIComponent(m.id) + '">Wróć do rozdziału →</a></div></div>';
        $('#ch-retry').addEventListener('click', function () { i = 0; score = 0; step(); });
        return;
      }
      var q = qs_[i];
      box.innerHTML =
        '<div class="ch-quiz-head"><span class="app-kicker">QUIZ · ROZDZIAŁ ' + pad(m.num) + '</span>' +
        '<strong>Pytanie ' + (i + 1) + ' z ' + qs_.length + '</strong>' +
        '<div class="ch-progress-bar"><i style="width:' + Math.round(i / qs_.length * 100) + '%"></i></div></div>' +
        '<h2 class="ch-quiz-q">' + esc(q.q) + '</h2>' +
        '<div class="ch-quiz-options">' + q.options.map(function (o, oi) {
          return '<button data-opt="' + oi + '">' + esc(o) + '</button>';
        }).join('') + '</div><p class="ch-quiz-why" id="ch-why"></p>';

      $$('[data-opt]', box).forEach(function (b) {
        b.addEventListener('click', function () {
          var ok = +b.dataset.opt === q.answer;
          if (ok) score++;
          $$('[data-opt]', box).forEach(function (x) {
            x.disabled = true;
            if (+x.dataset.opt === q.answer) x.classList.add('is-correct');
          });
          if (!ok) b.classList.add('is-wrong');
          $('#ch-why').innerHTML = (ok ? '<strong class="ok">✓ Dobrze.</strong> ' : '<strong class="no">✕ Niepoprawnie.</strong> ') + esc(q.why || '');
          setTimeout(function () { i++; step(); }, ok ? 1200 : 2200);
        });
      });
    }
    step();
  }

  /* ---------- start ---------- */
  function init() {
    var page = document.body.dataset.page;
    if (['kursy', 'kurs', 'lekcja'].indexOf(page) === -1) return;
    loadState().catch(function () {}).then(function () {
      if (page === 'kursy') renderCourses();
      else if (page === 'kurs') renderCourse();
      else renderLesson();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.CourseHub = { state: state };
})();
