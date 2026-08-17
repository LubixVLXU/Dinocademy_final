/* ============================================================
   Pro — aktywacja i status planu na pro.html
   W wersji demonstracyjnej aktywacja jest natychmiastowa.
   W produkcji podmień POST /api/pro/activate na webhook operatora płatności.
   ============================================================ */
(function () {
  'use strict';
  if (document.body.dataset.page !== 'pro') return;

  var API_BASE = '__PORT_3000__'.indexOf('PORT') !== -1 ? '' : '__PORT_3000__';
  function token() { return localStorage.getItem('dinocademy-token') || null; }

  var box = document.createElement('section');
  box.className = 'pro-panel';
  box.innerHTML = '<p class="pro-panel-loading">Sprawdzanie statusu konta…</p>';

  var main = document.querySelector('#main-content .page-shell') || document.querySelector('#main-content');
  if (main) main.insertBefore(box, main.firstChild);

  function render(user) {
    if (!user) {
      box.innerHTML =
        '<span class="app-kicker">TWÓJ PLAN</span>' +
        '<h2>Nie jesteś zalogowany</h2>' +
        '<p>Plan Pro wiąże się z kontem — zaloguj się lub utwórz konto, aby go aktywować.</p>' +
        '<div class="pro-panel-actions">' +
        '<a class="button" href="logowanie.html?next=%2Fpro">Zaloguj się</a>' +
        '<a class="button button-ghost" href="rejestracja.html?next=%2Fpro">Utwórz konto</a>' +
        '</div>';
      return;
    }
    var pro = !!(user.isPro || user.is_pro);
    box.className = 'pro-panel' + (pro ? ' is-pro' : '');
    box.innerHTML =
      '<span class="app-kicker">TWÓJ PLAN</span>' +
      '<h2>' + (pro ? 'Dinocademy Pro — aktywny' : 'Plan bezpłatny') + '</h2>' +
      '<p>' + (pro
        ? 'Masz dostęp do wszystkich lekcji, quizów, centrum gier, rankingu i wykluwarni.'
        : 'Bezpłatnie masz rozdziały 1–2 kursu o dinozaurach, próbki rozdziałów 3–6 oraz demo gry Memory. Pro odblokowuje 262 lekcje, 175 pytań quizowych, 9 gier, XP, ranking i wykluwarnię.') + '</p>' +
      '<div class="pro-panel-actions">' +
      (pro
        ? '<a class="button" href="kursy.html">Przejdź do kursów</a><button class="button button-ghost" id="pro-cancel">Zrezygnuj z Pro</button>'
        : '<button class="button" id="pro-activate">Aktywuj plan Pro</button><a class="quiet-link" href="kursy.html">Zobacz bezpłatne lekcje →</a>') +
      '</div>' +
      '<small class="pro-panel-note">' + (pro && user.pro_since ? 'Plan aktywny od: ' + user.pro_since : 'Wersja demonstracyjna: aktywacja bez płatności.') + '</small>';

    var a = document.getElementById('pro-activate');
    if (a) a.addEventListener('click', function () { toggle('/api/pro/activate', a); });
    var c = document.getElementById('pro-cancel');
    if (c) c.addEventListener('click', function () { toggle('/api/pro/cancel', c); });
  }

  function toggle(path, btn) {
    btn.disabled = true;
    btn.textContent = 'Przetwarzanie…';
    fetch(API_BASE + path, {
      method: 'POST', credentials: 'same-origin',
      headers: token() ? { 'Content-Type': 'application/json', 'X-Session-Token': token() } : { 'Content-Type': 'application/json' }
    }).then(function (r) { return r.json(); }).then(function () { load(); })
      .catch(function () { btn.disabled = false; btn.textContent = 'Spróbuj ponownie'; });
  }

  function load() {
    var t = token();
    fetch(API_BASE + '/api/me', { credentials: 'same-origin', headers: t ? { 'X-Session-Token': t } : {} })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { render(d && d.user); })
      .catch(function () { render(null); });
  }

  load();
})();
