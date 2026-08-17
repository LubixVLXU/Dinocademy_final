(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch (e) { return iso; }
  }

  function getToken() { try { return localStorage.getItem('dinocademy-token'); } catch (e) { return null; } }
  function authHeaders() { var t = getToken(); return t ? { 'X-Session-Token': t } : {}; }

  async function apiGet(path) {
    var r = await fetch(path, { headers: authHeaders() });
    var data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Błąd');
    return data;
  }
  async function apiPost(path, body, method) {
    var r = await fetch(path, { method: method || 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, authHeaders()), body: JSON.stringify(body || {}) });
    var data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Błąd');
    return data;
  }
  async function apiDelete(path) {
    var r = await fetch(path, { method: 'DELETE', headers: authHeaders() });
    var data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Błąd');
    return data;
  }

  if (document.body.dataset.page !== 'admin') return;

  async function init() {
    var guard = $('#admin-guard');
    var guardMsg = $('#admin-guard-msg');
    var content = $('#admin-content');

    var me;
    try { me = (await apiGet('/api/me')).user; } catch (e) { me = null; }

    if (!me) {
      guardMsg.textContent = 'Musisz być zalogowany, aby wejść do panelu administratora.';
      return;
    }
    if (!me.isAdmin) {
      guardMsg.textContent = 'Brak uprawnień administratora dla tego konta.';
      return;
    }

    guard.style.display = 'none';
    content.style.display = '';

    await loadStats();
    await loadUsers();
    await loadThreads();
    wireDanger();
  }

  async function loadStats() {
    try {
      var s = await apiGet('/api/admin/stats');
      $('#admin-stats').innerHTML = [
        ['Użytkownicy', s.totalUsers],
        ['Konta Pro', s.proUsers],
        ['Wątki forum', s.totalThreads],
        ['Odpowiedzi', s.totalReplies],
        ['Rozegrane gry', s.totalGames],
        ['Suma XP', s.totalXp]
      ].map(function (pair) {
        return '<div class="admin-stat-card"><span class="admin-stat-value">' + esc(pair[1]) + '</span><span class="admin-stat-label">' + esc(pair[0]) + '</span></div>';
      }).join('');
    } catch (e) {
      $('#admin-stats').innerHTML = '<p class="forum-empty">Błąd: ' + esc(e.message) + '</p>';
    }
  }

  async function loadUsers() {
    var tbody = $('#admin-users-table tbody');
    tbody.innerHTML = '<tr><td colspan="6">Ładowanie…</td></tr>';
    try {
      var data = await apiGet('/api/admin/users');
      var users = data.users || [];
      tbody.innerHTML = users.map(function (u) {
        return '<tr>' +
          '<td>' + esc(u.name) + (u.isAdmin ? ' <b class="forum-admin-badge">Admin</b>' : '') + '</td>' +
          '<td>' + esc(u.email) + '</td>' +
          '<td>' + u.level + '</td>' +
          '<td>' + u.xp + '</td>' +
          '<td>' + (u.isPro ? '✅' : '—') + '</td>' +
          '<td class="admin-actions-cell">' +
          '<button class="admin-mini-btn" data-toggle-pro="' + esc(u.id) + '" data-pro="' + (u.isPro ? '0' : '1') + '" type="button">' + (u.isPro ? 'Wyłącz Pro' : 'Włącz Pro') + '</button>' +
          (!u.isAdmin ? '<button class="admin-mini-btn admin-mini-danger" data-delete-user="' + esc(u.id) + '" type="button">Usuń</button>' : '') +
          '</td></tr>';
      }).join('') || '<tr><td colspan="6">Brak użytkowników</td></tr>';

      $$('[data-toggle-pro]', tbody).forEach(function (btn) {
        btn.addEventListener('click', async function () {
          try {
            await apiPost('/api/admin/users/' + btn.dataset.togglePro + '/pro', { isPro: btn.dataset.pro === '1' }, 'POST');
            loadUsers(); loadStats();
          } catch (e) { alert(e.message); }
        });
      });
      $$('[data-delete-user]', tbody).forEach(function (btn) {
        btn.addEventListener('click', async function () {
          if (!confirm('Usunąć to konto na stałe?')) return;
          try { await apiDelete('/api/admin/users/' + btn.dataset.deleteUser); loadUsers(); loadStats(); } catch (e) { alert(e.message); }
        });
      });
    } catch (e) {
      tbody.innerHTML = '<tr><td colspan="6">Błąd: ' + esc(e.message) + '</td></tr>';
    }
  }

  async function loadThreads() {
    var tbody = $('#admin-threads-table tbody');
    tbody.innerHTML = '<tr><td colspan="5">Ładowanie…</td></tr>';
    try {
      var data = await apiGet('/api/admin/threads');
      var threads = data.threads || [];
      tbody.innerHTML = threads.map(function (t) {
        return '<tr>' +
          '<td>' + esc(t.title) + '</td>' +
          '<td>' + esc(t.categoryId) + '</td>' +
          '<td>' + esc(t.authorName) + '</td>' +
          '<td>' + (t.deleted ? '🗑️ Usunięty' : (t.pinned ? '📌 Przypięty' : 'Aktywny')) + '</td>' +
          '<td class="admin-actions-cell">' +
          (!t.deleted ? '<button class="admin-mini-btn" data-pin-thread="' + esc(t.id) + '" data-pin="' + (t.pinned ? '0' : '1') + '" type="button">' + (t.pinned ? 'Odepnij' : 'Przypnij') + '</button>' : '') +
          (!t.deleted ? '<button class="admin-mini-btn admin-mini-danger" data-delete-thread="' + esc(t.id) + '" type="button">Usuń</button>' : '') +
          '</td></tr>';
      }).join('') || '<tr><td colspan="5">Brak wątków</td></tr>';

      $$('[data-pin-thread]', tbody).forEach(function (btn) {
        btn.addEventListener('click', async function () {
          try { await apiPost('/api/forum/threads/' + btn.dataset.pinThread + '/pin', { pinned: btn.dataset.pin === '1' }); loadThreads(); } catch (e) { alert(e.message); }
        });
      });
      $$('[data-delete-thread]', tbody).forEach(function (btn) {
        btn.addEventListener('click', async function () {
          if (!confirm('Usunąć ten wątek?')) return;
          try { await apiDelete('/api/forum/threads/' + btn.dataset.deleteThread); loadThreads(); loadStats(); } catch (e) { alert(e.message); }
        });
      });
    } catch (e) {
      tbody.innerHTML = '<tr><td colspan="5">Błąd: ' + esc(e.message) + '</td></tr>';
    }
  }

  function wireDanger() {
    $('#admin-reset-btn').addEventListener('click', async function () {
      if (!confirm('Na pewno zresetować CAŁĄ bazę danych? Tej operacji nie można cofnąć.')) return;
      if (!confirm('Ostatnie potwierdzenie: wszystkie konta, postępy i wątki forum zostaną usunięte.')) return;
      try {
        await apiPost('/api/admin/reset', {});
        alert('Baza zresetowana. Strona zostanie przeładowana.');
        location.reload();
      } catch (e) { alert(e.message); }
    });
  }

  init();
})();
