/* ============================================================
   Glossary — subtelne podkreślanie trudnych terminów
   Użycie: window.Glossary.apply(rootElement)
   Dane: window.GLOSSARY (bazowe) + window.GLOSSARY_EXTRA (dopisane przez kursy)
   ============================================================ */
(function () {
  'use strict';

  var index = null;   // forma (lowercase) -> { t, d }
  var sorted = null;  // formy posortowane od najdłuższej

  function build() {
    if (index) return;
    index = {};
    var all = [].concat(window.GLOSSARY || [], window.GLOSSARY_EXTRA || []);
    all.forEach(function (e) {
      if (!e || !e.t || !e.d) return;
      var forms = (e.f && e.f.length ? e.f : [e.t]).concat([e.t]);
      forms.forEach(function (f) {
        f = String(f).trim().toLowerCase();
        if (f.length < 4) return;
        if (!index[f]) index[f] = { t: e.t, d: e.d };
      });
    });
    sorted = Object.keys(index).sort(function (a, b) { return b.length - a.length; });
  }

  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  var re = null;
  function pattern() {
    if (re) return re;
    build();
    if (!sorted.length) return null;
    // granice słowa działające dla polskich znaków diakrytycznych
    re = new RegExp('(^|[^0-9A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])(' +
      sorted.map(escRe).join('|') + ')(?![0-9A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])', 'gi');
    return re;
  }

  var SKIP = { SCRIPT: 1, STYLE: 1, CODE: 1, PRE: 1, A: 1, BUTTON: 1, H1: 1, H2: 1, TEXTAREA: 1, INPUT: 1 };

  function apply(root) {
    if (!root) return;
    var rx = pattern();
    if (!rx) return;
    var seen = {};                 // każdy termin oznaczamy tylko raz na lekcję
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || node.nodeValue.trim().length < 4) return NodeFilter.FILTER_REJECT;
        var p = node.parentNode;
        while (p && p !== root) {
          if (SKIP[p.nodeName] || (p.classList && p.classList.contains('gl-term'))) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(function (node) {
      var text = node.nodeValue;
      rx.lastIndex = 0;
      if (!rx.test(text)) return;
      rx.lastIndex = 0;

      var frag = document.createDocumentFragment();
      var last = 0, m;
      while ((m = rx.exec(text)) !== null) {
        var lead = m[1] || '';
        var word = m[2];
        var entry = index[word.toLowerCase()];
        if (!entry || seen[entry.t]) continue;
        seen[entry.t] = 1;

        var start = m.index + lead.length;
        if (start > last) frag.appendChild(document.createTextNode(text.slice(last, start)));

        var span = document.createElement('span');
        span.className = 'gl-term';
        span.tabIndex = 0;
        span.setAttribute('role', 'button');
        span.setAttribute('aria-label', entry.t + ' — wyjaśnienie terminu');
        span.dataset.term = entry.t;
        span.dataset.def = entry.d;
        span.textContent = word;
        frag.appendChild(span);

        last = start + word.length;
      }
      if (!last) return;
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  /* ---------- dymek z definicją ---------- */
  var tip = null;
  function ensureTip() {
    if (tip) return tip;
    tip = document.createElement('div');
    tip.className = 'gl-tip';
    tip.setAttribute('role', 'tooltip');
    tip.innerHTML = '<strong class="gl-tip-term"></strong><p class="gl-tip-def"></p>';
    document.body.appendChild(tip);
    return tip;
  }

  var current = null;
  function show(el) {
    var t = ensureTip();
    t.querySelector('.gl-tip-term').textContent = el.dataset.term;
    t.querySelector('.gl-tip-def').textContent = el.dataset.def;
    t.classList.add('is-open');
    current = el;
    position(el);
  }

  function position(el) {
    var t = ensureTip();
    var r = el.getBoundingClientRect();
    var tw = t.offsetWidth, th = t.offsetHeight;
    var left = r.left + r.width / 2 - tw / 2;
    left = Math.max(10, Math.min(left, window.innerWidth - tw - 10));
    var top = r.top - th - 10;
    var below = false;
    if (top < 8) { top = r.bottom + 10; below = true; }
    t.classList.toggle('is-below', below);
    t.style.left = (left + window.scrollX) + 'px';
    t.style.top = (top + window.scrollY) + 'px';
  }

  function hide() { if (tip) tip.classList.remove('is-open'); current = null; }

  function init() {
    document.addEventListener('mouseover', function (e) {
      var el = e.target.closest && e.target.closest('.gl-term');
      if (el) show(el);
    });
    document.addEventListener('mouseout', function (e) {
      var el = e.target.closest && e.target.closest('.gl-term');
      if (el && el === current && !el.dataset.pinned) hide();
    });
    document.addEventListener('click', function (e) {
      var el = e.target.closest && e.target.closest('.gl-term');
      if (el) {
        e.preventDefault();
        if (current === el && el.dataset.pinned) { delete el.dataset.pinned; hide(); }
        else {
          document.querySelectorAll('.gl-term[data-pinned]').forEach(function (x) { delete x.dataset.pinned; });
          el.dataset.pinned = '1';
          show(el);
        }
        return;
      }
      if (current) { document.querySelectorAll('.gl-term[data-pinned]').forEach(function (x) { delete x.dataset.pinned; }); hide(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hide();
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('gl-term')) {
        e.preventDefault(); show(e.target);
      }
    });
    document.addEventListener('focusin', function (e) {
      if (e.target.classList && e.target.classList.contains('gl-term')) show(e.target);
    });
    window.addEventListener('scroll', function () { if (current) position(current); }, { passive: true });
    window.addEventListener('resize', hide);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Glossary = { apply: apply, hide: hide, count: function () { build(); return sorted.length; } };
})();
