(function () {
  'use strict';
  if (document.body.dataset.page !== 'admin') return;
  function token() { return localStorage.getItem('dinocademy-token') || null; }
  function api(path, method, body) {
    var headers = { 'Content-Type': 'application/json' };
    var t = token();
    if (t) headers['X-Session-Token'] = t;
    return fetch(path, { method: method || 'GET', headers: headers, credentials: 'same-origin', body: body ? JSON.stringify(body) : undefined })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) throw new Error(j.error || 'Błąd'); return j; }); });
  }
  var form = document.getElementById('admin-xp-form');
  var status = document.getElementById('admin-xp-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      api('/api/admin/add-xp', 'POST', { userId: Number(data.get('userId')), amount: Number(data.get('amount')) })
        .then(function () { status.textContent = 'Dodano XP pomyślnie.'; form.reset(); })
        .catch(function (err) { status.textContent = err.message; });
    });
  }
})();
