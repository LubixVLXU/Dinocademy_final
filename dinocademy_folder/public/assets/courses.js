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
