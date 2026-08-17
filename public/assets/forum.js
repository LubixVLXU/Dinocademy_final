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
    try {
      var d = new Date(iso);
      return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    } catch (e) { return iso; }
  }

  var API_BASE = '';
  function getToken() { try { return localStorage.getItem('dinocademy-token'); } catch (e) { return null; } }
  function authHeaders() { var t = getToken(); return t ? { 'X-Session-Token': t } : {}; }

  async function apiGet(path) {
    var r = await fetch(API_BASE + path, { headers: authHeaders() });
    var data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Błąd');
    return data;
  }
  async function apiPost(path, body, method) {
    var r = await fetch(API_BASE + path, {
      method: method || 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, authHeaders()),
      body: JSON.stringify(body || {})
    });
    var data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Błąd');
    return data;
  }
  async function apiDelete(path) {
    var r = await fetch(API_BASE + path, { method: 'DELETE', headers: authHeaders() });
    var data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Błąd');
    return data;
  }

  if (document.body.dataset.page !== 'forum') return;

  var currentUser = null;
  var currentCategory = '';
  var categories = [];

  async function init() {
    try {
      var me = await apiGet('/api/me');
      currentUser = me.user;
    } catch (e) { currentUser = null; }

    var newBtn = $('#forum-new-thread-btn');
    var loginHint = $('#forum-login-hint');
    if (currentUser) {
      newBtn.style.display = '';
      loginHint.style.display = 'none';
    } else {
      newBtn.style.display = 'none';
      loginHint.style.display = '';
    }

    await loadCategories();
    await loadThreads();
    wireEvents();
  }

  async function loadCategories() {
    var data = await apiGet('/api/forum/categories');
    categories = data.categories || [];
    var wrap = $('#forum-categories');
    var select = $('#forum-new-category');
    categories.forEach(function (c) {
      var btn = document.createElement('button');
      btn.className = 'forum-category-btn';
      btn.dataset.category = c.id;
      btn.textContent = c.label;
      btn.addEventListener('click', function () { selectCategory(c.id); });
      wrap.appendChild(btn);

      var opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.label;
      select.appendChild(opt);
    });
    $('.forum-category-btn[data-category=""]').addEventListener('click', function () { selectCategory(''); });
  }

  function selectCategory(id) {
    currentCategory = id;
    $$('.forum-category-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.category === id); });
    loadThreads();
  }

  function categoryLabel(id) {
    var c = categories.find(function (x) { return x.id === id; });
    return c ? c.label : id;
  }

  async function loadThreads() {
    var list = $('#forum-thread-list');
    list.innerHTML = '<p class="forum-empty">Ładowanie wątków…</p>';
    try {
      var q = currentCategory ? ('?category=' + encodeURIComponent(currentCategory)) : '';
      var data = await apiGet('/api/forum/threads' + q);
      var threads = data.threads || [];
      if (!threads.length) {
        list.innerHTML = '<p class="forum-empty">Brak wątków w tej kategorii. Bądź pierwszy!</p>';
        return;
      }
      list.innerHTML = threads.map(function (t) {
        return '<article class="forum-thread-card" data-thread-id="' + esc(t.id) + '">' +
          (t.pinned ? '<span class="forum-pin-badge">📌 Przypięte</span>' : '') +
          '<span class="forum-thread-category">' + esc(categoryLabel(t.categoryId)) + '</span>' +
          '<h3>' + esc(t.title) + '</h3>' +
          '<p class="forum-thread-excerpt">' + esc(t.body.slice(0, 160)) + (t.body.length > 160 ? '…' : '') + '</p>' +
          '<footer><span>' + esc(t.authorName) + '</span><span>' + fmtDate(t.createdAt) + '</span><span>' + t.replyCount + ' odpowiedzi</span></footer>' +
          '</article>';
      }).join('');
      $$('.forum-thread-card', list).forEach(function (card) {
        card.addEventListener('click', function () { openThread(card.dataset.threadId); });
      });
    } catch (e) {
      list.innerHTML = '<p class="forum-empty">Błąd ładowania: ' + esc(e.message) + '</p>';
    }
  }

  async function openThread(id) {
    var modal = $('#forum-thread-modal');
    var content = $('#forum-thread-content');
    modal.style.display = 'flex';
    content.innerHTML = '<p class="forum-empty">Ładowanie…</p>';
    try {
      var data = await apiGet('/api/forum/threads/' + id);
      var t = data.thread;
      var replies = data.replies || [];
      var canDeleteThread = currentUser && (currentUser.id === t.authorId || currentUser.isAdmin);
      content.innerHTML =
        '<span class="forum-thread-category">' + esc(categoryLabel(t.categoryId)) + '</span>' +
        '<h2>' + esc(t.title) + '</h2>' +
        '<div class="forum-post"><div class="forum-post-body">' + esc(t.body).replace(/\n/g, '<br/>') + '</div>' +
        '<footer><span>' + esc(t.authorName) + (t.authorIsAdmin ? ' <b class="forum-admin-badge">Admin</b>' : '') + '</span><span>' + fmtDate(t.createdAt) + '</span>' +
        (canDeleteThread ? '<button class="forum-delete-btn" data-delete-thread="' + esc(t.id) + '" type="button">Usuń</button>' : '') +
        '</footer></div>' +
        '<h3 class="forum-replies-title">Odpowiedzi (' + replies.length + ')</h3>' +
        '<div class="forum-replies">' + replies.map(function (r) {
          var canDeleteReply = currentUser && (currentUser.id === r.authorId || currentUser.isAdmin);
          return '<div class="forum-post forum-reply"><div class="forum-post-body">' + esc(r.body).replace(/\n/g, '<br/>') + '</div>' +
            '<footer><span>' + esc(r.authorName) + (r.authorIsAdmin ? ' <b class="forum-admin-badge">Admin</b>' : '') + '</span><span>' + fmtDate(r.createdAt) + '</span>' +
            (canDeleteReply ? '<button class="forum-delete-btn" data-delete-reply="' + esc(r.id) + '" type="button">Usuń</button>' : '') +
            '</footer></div>';
        }).join('') + '</div>' +
        (currentUser ?
          '<form id="forum-reply-form"><textarea id="forum-reply-body" maxlength="3000" placeholder="Napisz odpowiedź…" rows="4"></textarea><button class="button" type="submit">Odpowiedz</button><p class="recovery-status" id="forum-reply-status"></p></form>'
          : '<p class="forum-login-hint">Zaloguj się, aby odpowiedzieć.</p>');

      var replyForm = $('#forum-reply-form', content);
      if (replyForm) {
        replyForm.addEventListener('submit', async function (e) {
          e.preventDefault();
          var body = $('#forum-reply-body', content).value.trim();
          var status = $('#forum-reply-status', content);
          if (!body) return;
          try {
            await apiPost('/api/forum/threads/' + t.id + '/replies', { body: body });
            openThread(t.id);
          } catch (err) { status.textContent = err.message; }
        });
      }

      $$('[data-delete-thread]', content).forEach(function (btn) {
        btn.addEventListener('click', async function () {
          if (!confirm('Usunąć ten wątek?')) return;
          try { await apiDelete('/api/forum/threads/' + btn.dataset.deleteThread); modal.style.display = 'none'; loadThreads(); } catch (e) { alert(e.message); }
        });
      });
      $$('[data-delete-reply]', content).forEach(function (btn) {
        btn.addEventListener('click', async function () {
          if (!confirm('Usunąć tę odpowiedź?')) return;
          try { await apiDelete('/api/forum/replies/' + btn.dataset.deleteReply); openThread(t.id); } catch (e) { alert(e.message); }
        });
      });
    } catch (e) {
      content.innerHTML = '<p class="forum-empty">Błąd: ' + esc(e.message) + '</p>';
    }
  }

  function wireEvents() {
    var newBtn = $('#forum-new-thread-btn');
    var newModal = $('#forum-new-modal');
    var newForm = $('#forum-new-form');
    var cancelBtn = $('#forum-new-cancel');
    var threadModal = $('#forum-thread-modal');
    var threadClose = $('#forum-thread-close');

    newBtn.addEventListener('click', function () { newModal.style.display = 'flex'; });
    cancelBtn.addEventListener('click', function () { newModal.style.display = 'none'; });
    threadClose.addEventListener('click', function () { threadModal.style.display = 'none'; });
    [newModal, threadModal].forEach(function (m) {
      m.addEventListener('click', function (e) { if (e.target === m) m.style.display = 'none'; });
    });

    newForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      var status = $('#forum-new-status');
      var categoryId = $('#forum-new-category').value;
      var title = $('#forum-new-title').value.trim();
      var body = $('#forum-new-body').value.trim();
      try {
        await apiPost('/api/forum/threads', { categoryId: categoryId, title: title, body: body });
        newForm.reset();
        newModal.style.display = 'none';
        status.textContent = '';
        loadThreads();
      } catch (err) {
        status.textContent = err.message;
      }
    });
  }

  init();
})();
