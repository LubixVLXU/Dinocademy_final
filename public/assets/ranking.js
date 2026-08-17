(function () {
  'use strict';
  if (document.body.dataset.page !== 'ranking') return;
  var root = document.getElementById('ranking-table');
  var select = document.getElementById('ranking-sort');
  var clear = document.getElementById('clear-ranking');
  var state = [];

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function render(rows) {
    if (!rows.length) {
      root.innerHTML = '<p class="ranking-empty">Brak wyników do wyświetlenia.</p>';
      return;
    }
    var html = '<table class="ranking-table"><thead><tr>' +
      '<th>Gracz</th><th>Gra</th><th>Wynik</th><th>Poziom</th><th>XP</th><th>Ostatnia gra</th>' +
      '</tr></thead><tbody>';
    rows.forEach(function (row) {
      html += '<tr>' +
        '<td>' + esc(row.player_name) + '</td>' +
        '<td>' + esc(row.game) + '</td>' +
        '<td>' + esc(row.score) + '</td>' +
        '<td>' + esc(row.level || 0) + '</td>' +
        '<td>' + esc(row.xp || 0) + '</td>' +
        '<td>' + esc(row.last_played || '-') + '</td>' +
        '</tr>';
    });
    html += '</tbody></table>';
    root.innerHTML = html;
  }

  function sortedRows(key) {
    return state.slice().sort(function (a, b) {
      if (key === 'game' || key === 'player_name') return String(a[key] || '').localeCompare(String(b[key] || ''));
      return Number(b[key] || 0) - Number(a[key] || 0);
    });
  }

  fetch('/api/scores').then(function (r) { return r.json(); }).then(function (j) {
    state = j.scores || [];
    render(sortedRows(select.value));
  }).catch(function (err) {
    root.innerHTML = '<p class="ranking-empty">Nie udało się pobrać rankingu: ' + esc(err.message) + '</p>';
  });

  select.addEventListener('change', function () { render(sortedRows(select.value)); });
  clear.addEventListener('click', function () {
    fetch('/api/scores', { method: 'DELETE', credentials: 'same-origin' })
      .then(function (r) { return r.json(); })
      .then(function () { state = []; render(state); })
      .catch(function () {});
  });
})();
