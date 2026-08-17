/* ============================================================
   Dinocademy — strona główna: animacje, interakcje, ciekawostki
   Podłącz w public/index.html przed </body>:
   <script src="assets/home.js"></script>
   ============================================================ */
(function () {
  'use strict';
  if (document.body.dataset.page !== 'home') return;

  /* --- 1. Płynne wjeżdżanie sekcji przy scrollu --- */
  function revealOnScroll(selector) {
    var els = [].slice.call(document.querySelectorAll(selector));
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { obs.observe(el); });
  }

  revealOnScroll('.home-hero');
  revealOnScroll('.home-path article');
  revealOnScroll('.home-destination-grid a');
  revealOnScroll('.home-facts');

  /* --- 2. Interaktywna "pierwsza decyzja" z natychmiastowym feedbackiem --- */
  var options = document.querySelectorAll('.home-starter-options button');
  var footerSpan = document.querySelector('.home-starter footer span');

  var ANSWER_FACTS = {
    triceratops: 'Trafiona odpowiedź: Triceratops to jedyny prawdziwy dinozaur (Dinosauria) w tym zestawie.',
    pteranodon: 'Pteranodon latał, ale był pterozaurem — bliskim krewnym dinozaurów, nie dinozaurem.',
    mosasaurus: 'Mosasaurus był wielkim gadem morskim (mozazaurem), nie dinozaurem.',
    dimetrodon: 'Dimetrodon żył dużo wcześniej niż dinozaury i należał do synapsydów.'
  };

  if (options.length && footerSpan) {
    options.forEach(function (btn) {
      btn.addEventListener('click', function () {
        options.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('is-pop');
        setTimeout(function () { btn.classList.remove('is-pop'); }, 300);

        var label = btn.textContent.toLowerCase();
        var key = Object.keys(ANSWER_FACTS).find(function (k) { return label.indexOf(k) !== -1; });
        if (key) footerSpan.textContent = ANSWER_FACTS[key];
      });
    });
  }

  /* --- 3. Karuzela ciekawostek o dinozaurach --- */
  var FACTS = [
    'Ptaki są żyjącymi dinozaurami — należą do kladu Dinosauria razem z T. rex.',
    'Nie wszystkie dinozaury były gigantyczne — wiele miało rozmiar kury lub indyka.',
    'Spinosaurus to jedyny znany dinozaur przystosowany do pływania i polowania w wodzie.',
    'Największe znane jaja dinozaurów należały do zauropodów i mieściły w sobie ok. 3 litry.',
    'Velociraptor z filmów jest znacznie większy niż prawdziwy — ten miał rozmiar dużego indyka.',
    'Niektóre dinozaury miały pióra jeszcze przed pojawieniem się ptaków.',
    'Największe znane odciski stóp dinozaurów mają ponad metr długości.',
    'Tyranozaur miał jeden z najsilniejszych znanych ugryzień wśród lądowych zwierząt w historii.'
  ];

  var factEl = document.getElementById('home-fact-text');
  var factDots = document.getElementById('home-fact-dots');
  var factIndex = 0;

  function renderFact(i) {
    if (!factEl) return;
    factEl.classList.remove('is-in');
    void factEl.offsetWidth; /* restart animacji */
    factEl.textContent = FACTS[i];
    factEl.classList.add('is-in');
    if (factDots) {
      [].slice.call(factDots.children).forEach(function (dot, idx) {
        dot.classList.toggle('is-active', idx === i);
      });
    }
  }

  function buildDots() {
    if (!factDots) return;
    factDots.innerHTML = '';
    FACTS.forEach(function (_, idx) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'home-fact-dot';
      dot.setAttribute('aria-label', 'Ciekawostka ' + (idx + 1));
      dot.addEventListener('click', function () {
        factIndex = idx;
        renderFact(factIndex);
        resetTimer();
      });
      factDots.appendChild(dot);
    });
  }

  var factTimer = null;
  function nextFact() {
    factIndex = (factIndex + 1) % FACTS.length;
    renderFact(factIndex);
  }
  function resetTimer() {
    if (factTimer) clearInterval(factTimer);
    factTimer = setInterval(nextFact, 9000);
  }

  if (factEl) {
    buildDots();
    renderFact(factIndex);
    resetTimer();
  }

  /* --- 4. Licznik statystyk "home-proof" z animacją zliczania --- */
  var proofNumbers = document.querySelectorAll('.home-proof dt');
  if (proofNumbers.length && 'IntersectionObserver' in window) {
    var proofObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        proofObs.unobserve(entry.target);
        var el = entry.target;
        var raw = el.textContent.trim();
        var match = raw.match(/[\d]+/);
        if (!match) return;
        var target = parseInt(match[0], 10);
        var suffix = raw.replace(match[0], '');
        var current = 0;
        var step = Math.max(1, Math.round(target / 30));
        var interval = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = current + suffix;
        }, 30);
      });
    }, { threshold: 0.5 });
    proofNumbers.forEach(function (el) { proofObs.observe(el); });
  }

  /* --- 5. Delikatny parallax na hero przy ruchu myszy (desktop) --- */
  var hero = document.querySelector('.home-hero-grid');
  if (hero && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty('--tiltX', (y * -4).toFixed(2) + 'deg');
      hero.style.setProperty('--tiltY', (x * 4).toFixed(2) + 'deg');
    });
    hero.addEventListener('mouseleave', function () {
      hero.style.setProperty('--tiltX', '0deg');
      hero.style.setProperty('--tiltY', '0deg');
    });
  }

  /* --- 6. Karty ścieżki nauki: hover z liczbą minut podświetloną --- */
  document.querySelectorAll('.home-path article').forEach(function (card) {
    card.addEventListener('mouseenter', function () { card.classList.add('is-hover'); });
    card.addEventListener('mouseleave', function () { card.classList.remove('is-hover'); });
  });
})();
