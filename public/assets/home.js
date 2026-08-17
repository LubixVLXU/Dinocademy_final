/* ============================================================
Dinocademy — strona główna: animacje, interakcje, ciekawostki
Podmień istniejący plik assets/home.js
============================================================ */
(function () {
  'use strict';
  if (document.body.dataset.page !== 'home') return;

  var doc = document;
  var win = window;
  var reduceMotion = win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $all(sel, root) {
    return [].slice.call((root || doc).querySelectorAll(sel));
  }

  function revealOnScroll(selector) {
    var els = $all(selector);
    if (!els.length) return;
    if (!('IntersectionObserver' in win) || reduceMotion) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  revealOnScroll('.home-hero');
  revealOnScroll('.home-path article');
  revealOnScroll('.home-destination-grid a');
  revealOnScroll('.home-facts');
  revealOnScroll('.home-hero-copy > *');
  revealOnScroll('.home-proof div');

  var heroGrid = doc.querySelector('.home-hero-grid');
  if (heroGrid && !reduceMotion && win.matchMedia('(pointer:fine)').matches) {
    heroGrid.addEventListener('mousemove', function (e) {
      var rect = heroGrid.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      heroGrid.style.setProperty('--tiltY', ((px - 0.5) * 7).toFixed(2) + 'deg');
      heroGrid.style.setProperty('--tiltX', ((0.5 - py) * 6).toFixed(2) + 'deg');
      heroGrid.style.setProperty('--glowX', (px * 100).toFixed(1) + '%');
      heroGrid.style.setProperty('--glowY', (py * 100).toFixed(1) + '%');
    });
    heroGrid.addEventListener('mouseleave', function () {
      heroGrid.style.setProperty('--tiltX', '0deg');
      heroGrid.style.setProperty('--tiltY', '0deg');
      heroGrid.style.setProperty('--glowX', '50%');
      heroGrid.style.setProperty('--glowY', '40%');
    });
  }

  var pathCards = $all('.home-path article');
  pathCards.forEach(function (card, index) {
    card.style.setProperty('--i', index);
    card.addEventListener('mouseenter', function () { card.classList.add('is-hover'); });
    card.addEventListener('mouseleave', function () { card.classList.remove('is-hover'); });
  });

  var options = $all('.home-starter-options button');
  var resultBox = doc.querySelector('.home-starter-result');
  var footerSpan = doc.querySelector('.home-starter footer span');
  var answerFacts = {
    triceratops: {
      ok: true,
      lead: 'Trafiona odpowiedź.',
      body: 'Triceratops był prawdziwym dinozaurem z kladu Dinosauria i do tego roślinożercą z imponującą kryzą.'
    },
    pteranodon: {
      ok: false,
      lead: 'Blisko, ale nie tym razem.',
      body: 'Pteranodon był pterozaurem — latającym krewniakiem dinozaurów, ale nie dinozaurem właściwym.'
    },
    mosasaurus: {
      ok: false,
      lead: 'To nie dinozaur.',
      body: 'Mosasaurus był morskim gadem, który polował w oceanach późnej kredy.'
    },
    dimetrodon: {
      ok: false,
      lead: 'Dobra próba.',
      body: 'Dimetrodon żył dużo wcześniej niż dinozaury i należał do synapsydów, dalszych krewnych ssaków.'
    }
  };

  function inferAnswerKey(text) {
    text = String(text || '').toLowerCase();
    return Object.keys(answerFacts).find(function (key) { return text.indexOf(key) !== -1; }) || 'triceratops';
  }

  if (options.length && footerSpan) {
    options.forEach(function (btn, idx) {
      btn.style.setProperty('--i', idx);
      btn.addEventListener('click', function () {
        options.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('is-pop');
        setTimeout(function () { btn.classList.remove('is-pop'); }, 280);

        var key = inferAnswerKey(btn.textContent);
        var item = answerFacts[key];
        footerSpan.textContent = item.lead + ' ' + item.body;
        if (resultBox) {
          resultBox.classList.toggle('is-correct', !!item.ok);
          resultBox.classList.add('is-burst');
          setTimeout(function () { resultBox.classList.remove('is-burst'); }, 420);
          var title = resultBox.querySelector('b');
          var text = resultBox.querySelector('p');
          if (title) title.textContent = item.lead;
          if (text) text.textContent = item.body;
        }
      });
    });
  }

  var facts = [
    'Ptaki są żyjącymi dinozaurami i należą do tej samej wielkiej linii ewolucyjnej co drapieżne teropody.',
    'Velociraptor był dużo mniejszy niż filmowy odpowiednik — bardziej jak duży indyk niż potwór wielkości człowieka.',
    'Niektóre dinozaury miały pióra, zanim powstały pierwsze nowoczesne ptaki.',
    'Tyranozaur miał jeden z najsilniejszych znanych ugryzień w historii zwierząt lądowych.',
    'Spinosaurus był świetnie przystosowany do życia przy wodzie i prawdopodobnie aktywnie w niej polował.',
    'Największe znane tropy dinozaurów mają ponad metr długości i pokazują, jak gigantyczne były niektóre gatunki.',
    'Ankylozaury miały pancerz tak skuteczny, że wiele drapieżników wolało ich unikać niż ryzykować atak.',
    'Część współczesnych kolorów upierzenia ptaków może podpowiadać, jak mogły wyglądać niektóre opierzone dinozaury.'
  ];
  var factEl = doc.getElementById('home-fact-text');
  var factDots = doc.getElementById('home-fact-dots');
  var factIndex = 0;
  var factTimer = null;

  function renderFact(index) {
    if (!factEl) return;
    factIndex = (index + facts.length) % facts.length;
    factEl.classList.remove('is-in');
    void factEl.offsetWidth;
    factEl.textContent = facts[factIndex];
    factEl.classList.add('is-in');
    if (factDots) {
      [].slice.call(factDots.children).forEach(function (dot, idx) {
        dot.classList.toggle('is-active', idx === factIndex);
        dot.setAttribute('aria-pressed', idx === factIndex ? 'true' : 'false');
      });
    }
  }

  function startFactLoop() {
    if (reduceMotion) return;
    stopFactLoop();
    factTimer = win.setInterval(function () { renderFact(factIndex + 1); }, 4800);
  }
  function stopFactLoop() {
    if (factTimer) {
      win.clearInterval(factTimer);
      factTimer = null;
    }
  }

  if (factEl && factDots) {
    factDots.innerHTML = '';
    facts.forEach(function (_, idx) {
      var dot = doc.createElement('button');
      dot.type = 'button';
      dot.className = 'home-fact-dot';
      dot.setAttribute('aria-label', 'Pokaż ciekawostkę ' + (idx + 1));
      dot.addEventListener('click', function () {
        renderFact(idx);
        startFactLoop();
      });
      factDots.appendChild(dot);
    });
    renderFact(0);
    startFactLoop();
    var factsWrap = doc.querySelector('.home-facts');
    if (factsWrap) {
      factsWrap.addEventListener('mouseenter', stopFactLoop);
      factsWrap.addEventListener('mouseleave', startFactLoop);
    }
  }

  var animatedNumbers = $all('.home-proof dt[data-target]');
  function animateCounter(el) {
    if (!el || el.dataset.animated === '1') return;
    el.dataset.animated = '1';
    var target = parseInt(el.getAttribute('data-target') || el.textContent, 10) || 0;
    var start = 0;
    var startTime = 0;
    function tick(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / 1100, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(start + (target - start) * eased);
      el.textContent = value + (el.dataset.suffix || '');
      if (progress < 1) win.requestAnimationFrame(tick);
    }
    win.requestAnimationFrame(tick);
  }

  if (animatedNumbers.length && 'IntersectionObserver' in win && !reduceMotion) {
    var numsObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          numsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.55 });
    animatedNumbers.forEach(function (el) { numsObs.observe(el); });
  } else {
    animatedNumbers.forEach(animateCounter);
  }

  var destinations = $all('.home-destination-grid a');
  destinations.forEach(function (link) {
    link.addEventListener('mousemove', function (e) {
      if (reduceMotion || !win.matchMedia('(pointer:fine)').matches) return;
      var rect = link.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      link.style.setProperty('--mx', x + '%');
      link.style.setProperty('--my', y + '%');
    });
    link.addEventListener('mouseleave', function () {
      link.style.removeProperty('--mx');
      link.style.removeProperty('--my');
    });
  });
})();
