/* Advanced games 05–09 for Dinocademy. */
(function () {
  'use strict';

  var K = window.GameKit;
  if (!K) return;

  function modes(onPick, kicker, title, intro) {
    K.difficultyPicker({
      kicker: kicker,
      title: title,
      intro: intro,
      modes: [
        { id: 'easy', label: 'Łatwy', desc: 'Spokojne tempo i wyraźne różnice.', tone: 'Poziom 1' },
        { id: 'medium', label: 'Średni', desc: 'Więcej okazów i mniej oczywiste wybory.', tone: 'Poziomy 1–2' },
        { id: 'hard', label: 'Trudny', desc: 'Pełna pula danych i precyzyjne rozpoznawanie.', tone: 'Ekspert' }
      ],
      onPick: onPick
    });
  }

  function matchTaxon(dino) {
    var all = K.taxa();
    var i;
    for (i = 0; i < all.length; i++) {
      if (all[i].scientific === dino.scientific || all[i].common === dino.common) return all[i];
    }
    return { common: dino.common, scientific: dino.scientific, image: dino.image, countries: [], period: dino.period, diet: '', lengthM: 4, clade: '', feature: '', defense: '', habitat: '' };
  }

  function difficultyDinos(mode) {
    var d = K.dinos();
    if (mode === 'easy') return d.filter(function (x) { return x.tier === 1; });
    if (mode === 'medium') return d.filter(function (x) { return x.tier <= 2; });
    return d.slice();
  }

  function renderError(message) {
    K.stage().innerHTML = '<div class="game-empty"><b>Brak danych do gry</b><p>' + K.esc(message) + '</p></div>';
  }

  /* ------------------------------------------------------------
     05. DIAGNOSIS
     ------------------------------------------------------------ */
  function startDiagnosis() {
    modes(function (mode) {
      var pool = difficultyDinos(mode);
      var rounds = K.sample(pool, Math.min(6, pool.length));
      var state = { index: 0, score: 0, answered: 0 };
      if (rounds.length < 4) { renderError('Za mało taksonów do przygotowania pytań.'); return; }

      function optionsFor(dino) {
        var targetTaxon = matchTaxon(dino);
        var rest = pool.filter(function (x) { return x.id !== dino.id; });
        if (mode === 'easy') {
          rest = rest.filter(function (x) { return x.period !== dino.period; });
        } else if (mode === 'hard') {
          var sameBoth = rest.filter(function (x) {
            var t = matchTaxon(x);
            return t.clade && t.clade === targetTaxon.clade && x.period === dino.period;
          });
          var samePeriod = rest.filter(function (x) { return x.period === dino.period; });
          var sameClade = rest.filter(function (x) { return matchTaxon(x).clade && matchTaxon(x).clade === targetTaxon.clade; });
          rest = sameBoth.concat(samePeriod, sameClade).filter(function (x, i, arr) { return arr.indexOf(x) === i && x.id !== dino.id; });
        }
        if (rest.length < 3) rest = pool.filter(function (x) { return x.id !== dino.id; });
        return K.shuffle([dino].concat(K.sample(rest, 3)));
      }

      function next() {
        if (state.index >= rounds.length) {
          K.finish({ game: 'diagnosis', score: state.score, max: rounds.length * 100, title: 'Diagnoza zakończona', win: state.score > 0,
            lines: ['Rozpoznane okazy: ' + state.answered + ' / ' + rounds.length, 'Wynik: ' + state.score + ' pkt'], onReplay: startDiagnosis });
          return;
        }
        var dino = rounds[state.index];
        var opts = optionsFor(dino);
        var root = K.stage();
        K.askChoice({
          root: root,
          prefix: K.head('Diagnoza · runda ' + (state.index + 1) + '/' + rounds.length, 'Kto pasuje do opisu?', K.chips([{ label: state.score + ' pkt', tone: 'ok' }])) +
            '<div class="gk-diagnosis-clue">„' + K.esc(dino.clue) + '”</div>',
          question: 'Wybierz właściwy takson.',
          options: opts.map(function (x) { return x.common; }),
          correct: dino.common,
          why: 'Sprawdź uzasadnienie po odpowiedzi.',
          onAnswer: function (ok) {
            state.answered += ok ? 1 : 0;
            if (ok) state.score += 100;
            root.innerHTML = K.head('Diagnoza · analiza okazu', dino.common, K.chips([{ label: ok ? '+100 pkt' : '0 pkt', tone: ok ? 'ok' : 'bad' }])) +
              '<article class="gk-reveal-card"><img src="' + K.img(dino.image) + '" alt="' + K.esc(dino.common) + '"><div><p class="app-kicker">' + (ok ? 'Trafna diagnoza' : 'Poprawna odpowiedź') + '</p><h3>' + K.esc(dino.common) + '</h3><p><i>' + K.esc(dino.scientific) + '</i></p><p>' + K.esc(dino.description) + '</p></div></article>' +
              '<button class="button gk-next">' + (state.index + 1 === rounds.length ? 'Zobacz wynik' : 'Następny opis') + '</button>';
            K.$('.gk-next', root).addEventListener('click', function () { state.index++; next(); });
          }
        });
      }
      next();
    }, 'Gra 05', 'Kto pasuje do opisu?', 'Przeczytaj opis rekonstrukcji i postaw właściwą diagnozę.');
  }

  /* ------------------------------------------------------------
     06. MAPA
     ------------------------------------------------------------ */
  function startMap() {
    modes(function (mode) {
      var taxa = K.taxa().filter(function (t) { return t.countries && t.countries.length; });
      var rounds = K.sample(taxa, 7);
      var countryList = K.countries();
      var count = mode === 'easy' ? 6 : mode === 'medium' ? 12 : countryList.length;
      var state = { index: 0, score: 0, firstTry: true, locked: false };
      var pending = null;
      K.onCleanup(function () { if (pending) clearTimeout(pending); });
      if (rounds.length < 7) { renderError('Brakuje stanowisk z przypisanymi krajami.'); return; }

      function setPins(result, correctCodes, selected, lockAll) {
        K.$$('.gk-map-pin', K.stage()).forEach(function (pin) {
          var isCorrect = correctCodes.indexOf(pin.dataset.code) !== -1;
          if (lockAll || (pin.dataset.code === selected && !isCorrect)) pin.disabled = true;
          if (isCorrect) pin.classList.add('is-correct');
          if (pin.dataset.code === selected && !isCorrect) pin.classList.add('is-wrong');
        });
        var feedback = K.$('.gk-map-feedback', K.stage());
        if (feedback) feedback.innerHTML = result ? '<strong class="ok">✓ Właściwe stanowisko.</strong>' : '<strong class="no">✕ To nie jest kraj odkrycia tego taksonu.</strong> Zielone pinezki pokazują właściwe państwa — wybierz jedno, aby przejść dalej.';
      }

      function next() {
        if (state.index >= rounds.length) {
          K.finish({ game: 'mapa', score: state.score, max: rounds.length * 150, title: 'Mapa odkryć gotowa', win: state.score > 0,
            lines: ['Zmapowane taksony: ' + rounds.length, 'Wynik: ' + state.score + ' pkt', mode === 'hard' ? 'Tryb ekspercki: bonus +50 za trafienie w pierwszej próbie.' : ''], onReplay: startMap });
          return;
        }
        var taxon = rounds[state.index];
        var correct = taxon.countries.filter(function (code) { return countryList.some(function (c) { return c.code === code; }); });
        var correctCountry = countryList.filter(function (c) { return correct.indexOf(c.code) !== -1; });
        var others = countryList.filter(function (c) { return correct.indexOf(c.code) === -1; });
        var pins = K.shuffle(correctCountry.concat(K.sample(others, Math.max(0, count - correctCountry.length))));
        state.firstTry = true; state.locked = false;
        K.stage().innerHTML = K.head('Mapa · runda ' + (state.index + 1) + '/7', 'Mapa odkryć', K.chips([{ label: state.score + ' pkt', tone: 'ok' }, { label: mode === 'hard' ? 'bonus pierwszej próby' : count + ' pinezek' }])) +
          '<div class="gk-map-prompt"><img src="' + K.img(taxon.image) + '" alt="' + K.esc(taxon.common) + '"><div><p class="app-kicker">Wskaż kraj odkrycia</p><h3>' + K.esc(taxon.common) + '</h3><p><i>' + K.esc(taxon.scientific) + '</i> · ' + K.esc(taxon.period) + '</p></div></div>' +
          '<div class="gk-map-wrap"><img src="games/world-map.webp" alt="Mapa świata">' + pins.map(function (c) {
            return '<button class="gk-map-pin" data-code="' + K.esc(c.code) + '" style="left:' + c.x + '%;top:' + c.y + '%" aria-label="' + K.esc(c.name) + '" title="' + K.esc(c.name) + '"><span></span><b>' + K.esc(c.code) + '</b></button>';
          }).join('') + '</div><p class="gk-map-feedback" aria-live="polite">Kliknij pinezkę na mapie.</p>';
        K.$$('.gk-map-pin', K.stage()).forEach(function (pin) {
          pin.addEventListener('click', function () {
            if (state.locked) return;
            var ok = correct.indexOf(pin.dataset.code) !== -1;
            if (ok) {
              state.locked = true;
              state.score += 100 + (mode === 'hard' && state.firstTry ? 50 : 0);
              setPins(true, correct, pin.dataset.code, true);
              pending = setTimeout(function () { state.index++; next(); }, 1200);
            } else {
              state.firstTry = false;
              setPins(false, correct, pin.dataset.code, false);
            }
          });
        });
      }
      next();
    }, 'Gra 06', 'Mapa odkryć', 'Wskaż na mapie państwo, w którym znaleziono szczątki danego taksonu.');
  }

  /* ------------------------------------------------------------
     07. ESCAPE
     ------------------------------------------------------------ */
  function startEscape() {
    modes(function (mode) {
      var settings = { easy: { seconds: 20, multiplier: 1 }, medium: { seconds: 14, multiplier: 1.5 }, hard: { seconds: 9, multiplier: 2 } }[mode];
      var state = { distance: 5, score: 0, good: 0, active: true, timer: null, remaining: settings.seconds, serial: 0 };
      var wait = null;
      K.onCleanup(function () { if (state.timer) clearInterval(state.timer); if (wait) clearTimeout(wait); state.active = false; });

      function finish(win) {
        if (!state.active) return;
        state.active = false;
        if (state.timer) clearInterval(state.timer);
        var bonus = win ? Math.round(300 * settings.multiplier) : 0;
        if (win) state.score += bonus;
        K.finish({ game: 'escape', score: state.score, max: Math.round((5 * 100 + 300) * settings.multiplier), win: win,
          title: win ? 'Uciekłeś przed T. rexem!' : 'T. rex cię dogonił',
          lines: [win ? 'Dystans do mety: osiągnięty.' : 'Dystans spadł do zera.', 'Dobre odpowiedzi: ' + state.good, 'Mnożnik trybu: ×' + settings.multiplier, win ? 'Premia za metę: +' + bonus + ' pkt' : ''], onReplay: startEscape });
      }

      function trackHtml() {
        var player = Math.max(5, Math.min(95, 18 + state.distance * 7));
        var rex = Math.max(1, player - state.distance * 5);
        return '<div class="gk-chase-panel"><div class="gk-chase-readout"><span>Dystans: <b>' + state.distance + ' / 10</b></span><span>Czas: <b class="gk-timer-value">' + state.remaining + ' s</b></span></div>' + K.bar(state.distance * 10, 'gk-chase-bar') +
          '<div class="gk-chase-track"><span class="gk-chase-start">START</span><span class="gk-chase-finish">META</span><img class="gk-chase-rex" style="left:' + rex + '%" src="games/escape-rex.webp" alt="Tyranozaur"><img class="gk-chase-human" style="left:' + player + '%" src="games/escape-human.webp" alt="Uciekający badacz"></div></div>';
      }

      function move(ok, reason) {
        if (!state.active) return;
        if (state.timer) clearInterval(state.timer);
        state.serial++;
        if (ok) { state.distance++; state.good++; state.score += Math.round(100 * settings.multiplier); }
        else state.distance--;
        var feedback = K.$('.gk-chase-feedback', K.stage());
        if (feedback) feedback.innerHTML = ok ? '<strong class="ok">✓ Uciekasz o krok dalej.</strong> ' + K.esc(reason) : '<strong class="no">✕ T. rex się zbliża.</strong> ' + K.esc(reason);
        var track = K.$('.gk-chase-panel', K.stage());
        if (track) track.outerHTML = trackHtml();
        if (state.distance <= 0) { wait = setTimeout(function () { finish(false); }, 850); }
        else if (state.distance >= 10) { wait = setTimeout(function () { finish(true); }, 850); }
        else { wait = setTimeout(question, 1050); }
      }

      function question() {
        if (!state.active) return;
        var q = K.buildQuestion(mode);
        if (!q) { finish(false); return; }
        state.remaining = settings.seconds;
        var root = K.stage();
        root.innerHTML = K.head('Pościg · odpowiedź = krok', 'Ucieczka przed T. rexem', K.chips([{ label: state.score + ' pkt', tone: 'ok' }, { label: '×' + settings.multiplier }])) + trackHtml() + '<div class="gk-chase-question"></div><p class="gk-chase-feedback" aria-live="polite">Odpowiedz, zanim czas minie.</p>';
        var slot = K.$('.gk-chase-question', root);
        var answered = false;
        var answerPicked = false;
        K.askChoice({ root: slot, question: q.q, options: q.options, correct: q.correct, why: q.why,
          onAnswer: function (ok) { if (answered || !state.active) return; answered = true; move(ok, q.why); } });
        slot.addEventListener('click', function (ev) {
          if (ev.target && ev.target.getAttribute('data-choice') !== null && !answerPicked) {
            answerPicked = true;
            if (state.timer) clearInterval(state.timer);
          }
        });
        state.timer = setInterval(function () {
          state.remaining--;
          var label = K.$('.gk-timer-value', root);
          if (label) label.textContent = state.remaining + ' s';
          if (state.remaining <= 0 && !answerPicked) { answered = true; move(false, 'Czas minął.'); }
        }, 1000);
      }
      question();
    }, 'Gra 07', 'Ucieczka przed T. rexem', 'Dobra odpowiedź oddala cię od drapieżnika. Błąd albo brak odpowiedzi przybliża go o krok.');
  }

  /* ------------------------------------------------------------
     08. SURVIVAL — 24 templates, six behavior variants each.
     ------------------------------------------------------------ */
  var SURVIVAL_EVENTS = [
    ['drapieżnik', 'Cień większego drapieżnika', 'Na skraju terenu przesuwa się cień znacznie większego zwierzęcia.'],
    ['drapieżnik', 'Zasadzka w zaroślach', 'Z gęstwiny słychać ciężkie kroki — ktoś czeka w ukryciu.'],
    ['drapieżnik', 'Alarm stada', 'Inne zwierzęta nagle uciekają w jednym kierunku.'],
    ['głód', 'Uboga roślinność', 'Po długiej wędrówce pokarmu wokół jest wyraźnie mniej niż zwykle.'],
    ['głód', 'Mało drobnej zdobyczy', 'Drobna zdobycz zniknęła z okolicy niemal całkowicie.'],
    ['głód', 'Wyczerpany żer', 'Znane źródło pokarmu zostało już wyjedzone do końca.'],
    ['pogoda', 'Nagłe ochłodzenie', 'Wieczorem temperatura gwałtownie spada.'],
    ['pogoda', 'Upał bez cienia', 'W południe powietrze stoi, a cienia nie ma nigdzie.'],
    ['pogoda', 'Silny wiatr', 'Nad otwartym terenem wieje tak mocno, że trudno wyczuć zapachy.'],
    ['konkurencja', 'Rywal przy pożywieniu', 'Przy najlepszym miejscu żerowania stoi już inny osobnik twojego gatunku.'],
    ['konkurencja', 'Tłok przy wodopoju', 'Przy wodzie zebrało się zbyt wiele zwierząt naraz.'],
    ['konkurencja', 'Obce stado', 'Na trasę przemarszu weszło obce, liczne stado.'],
    ['terytorium', 'Zapach obcego osobnika', 'Na granicy znanego terenu pojawił się świeży, obcy zapach.'],
    ['terytorium', 'Nieznane przejście', 'Odkrywasz nowe przejście, którego nikt jeszcze nie sprawdził.'],
    ['rozmnażanie', 'Miejsce na gniazdo', 'Nadchodzi okres składania jaj i trzeba wybrać bezpieczne miejsce.'],
    ['rozmnażanie', 'Ochrona młodych', 'W pobliżu kryjówki młodych krąży coś podejrzanego.'],
    ['migracja', 'Wysychająca trasa', 'Dawna trasa wędrówki wysycha i staje się nieprzejezdna.'],
    ['migracja', 'Zmiana pór roku', 'Sezonowa zmiana roślinności zmusza do decyzji o przemieszczeniu się.'],
    ['choroba', 'Bolesna rana stopy', 'Po skalistym odcinku każdy krok sprawia ból.'],
    ['choroba', 'Pasożyty i osłabienie', 'Od kilku dni czujesz narastające osłabienie i swędzenie skóry.'],
    ['powódź', 'Nagła fala', 'Po ulewie woda gwałtownie podnosi się i zalewa niziny.'],
    ['powódź', 'Długotrwała susza', 'Kolejny tydzień bez deszczu wysusza wszystkie zbiorniki.'],
    ['wulkan', 'Pył w powietrzu', 'Z daleka nadciąga chmura wulkanicznego pyłu.'],
    ['wulkan', 'Wstrząsy gruntu', 'Ziemia drży, a z ziemi unosi się siarkowy zapach.']
  ];

  function survivalProfile(t) {
    var feature = String(t.feature || '').toLowerCase();
    var defense = String(t.defense || '').toLowerCase();
    if (defense === 'armor' || feature.indexOf('pancerz') !== -1) return 'armored';
    if (defense === 'glide' || feature.indexOf('skrzyd') !== -1 || feature.indexOf('piór') !== -1) return 'flying';
    if (t.diet === 'drapieżnik' || t.diet === 'owadożerca' || t.diet === 'wszystkożerca') return (+t.lengthM || 3) >= 6 ? 'largePredator' : 'smallPredator';
    return (+t.lengthM || 4) >= 6 ? 'largeHerbivore' : 'smallHerbivore';
  }

  var SURVIVAL_VARIANTS = {
    largePredator: { noun: 'duży drapieżnik', approach: 'wykorzystujesz masę i zmysły, ale nie ryzykujesz niepotrzebnej walki', safe: 'obchodzisz zagrożenie szerokim łukiem i obserwujesz teren', bold: 'zajmujesz pozycję osłaniającą, gotów odstraszyć rywala', bad: 'szarżujesz bez rozeznania', mult: { health: 0.85, food: 1.2, safety: 0.8 } },
    smallPredator: { noun: 'mały drapieżnik', approach: 'stawiasz na szybkość, osłonę i ostrożne polowanie', safe: 'przenosisz się pod osłonę i szukasz bezpiecznej ścieżki', bold: 'obserwujesz z dystansu, wykorzystując zwinność', bad: 'wchodzisz w otwartą konfrontację', mult: { health: 0.8, food: 1.15, safety: 0.7 } },
    largeHerbivore: { noun: 'duży roślinożerca', approach: 'korzystasz z rozmiaru, lecz oszczędzasz energię', safe: 'pozostajesz przy osłonie i wybierasz stabilny teren', bold: 'ustawiasz ciało defensywnie i szukasz wsparcia grupy', bad: 'tracisz energię na pochopny manewr', mult: { health: 1.05, food: 1.1, safety: 1 } },
    smallHerbivore: { noun: 'mały roślinożerca', approach: 'wybierasz kryjówki i szybkie zmiany kierunku', safe: 'ukrywasz się w osłonie oraz sprawdzasz drogę odwrotu', bold: 'przemieszczasz się szybko przy osłonie terenu', bad: 'wychodzisz na otwartą przestrzeń bez planu', mult: { health: 0.85, food: 1, safety: 0.7 } },
    armored: { noun: 'opancerzony roślinożerca', approach: 'wykorzystujesz pancerz, ogon lub masywną sylwetkę bez lekkomyślności', safe: 'obracasz chronioną stronę ku zagrożeniu i cofając się szukasz osłony', bold: 'przyjmujesz pozycję obronną, chroniąc wrażliwe części ciała', bad: 'oddalasz się w panice, odsłaniając słabsze miejsca', mult: { health: 1.2, food: 1, safety: 1.25 } },
    flying: { noun: 'lekki, pierzasty lub latający takson', approach: 'wybierasz wysokość, zwinność i osłonę zamiast siłowej rywalizacji', safe: 'przemieszczasz się do bezpiecznej osłony lub wyższego miejsca', bold: 'wykorzystujesz lekkość, by szybko zmienić pozycję', bad: 'pozostajesz na odsłoniętym terenie mimo ryzyka', mult: { health: 0.8, food: 1.1, safety: 0.65 } }
  };

  function change(base, mult) { return Math.round(base * mult); }

  function buildSurvivalScenario(event, taxon, type, turn) {
    var v = SURVIVAL_VARIANTS[type];
    var category = event[0];
    var HABITAT_PL = {
      floodplain: 'nadrzeczna równina zalewowa',
      coastal: 'wybrzeże',
      arid: 'sucha, piaszczysta równina',
      forest: 'gęsty las',
      polar: 'chłodna, polarna kraina'
    };
    var habitat = HABITAT_PL[String(taxon.habitat || '').toLowerCase()] || 'twoja okolica';
    var feature = taxon.feature || 'budowa ciała';
    var intro = event[2] + ' Siedlisko: ' + habitat + '. Jako ' + v.noun + ' (' + taxon.common + ') ' + v.approach + '.';
    var actions;
    if (category === 'głód') {
      actions = [
        { text: 'Szukasz pokarmu ostrożnie w osłonie terenu.', fx: { health: -3, food: 14, safety: 4 }, good: true },
        { text: 'Wyruszasz daleko bez sprawdzenia zagrożeń.', fx: { health: -8, food: 8, safety: -12 } },
        { text: 'Odpoczywasz i ignorujesz głód.', fx: { health: -9, food: -13, safety: 2 } }
      ];
    } else if (category === 'drapieżnik' || category === 'konkurencja' || category === 'terytorium') {
      actions = [
        { text: v.safe + '.', fx: { health: 1, food: -4, safety: 14 }, good: true },
        { text: v.bold + '.', fx: { health: -3, food: 1, safety: 7 }, good: true },
        { text: v.bad + '.', fx: { health: -13, food: -3, safety: -16 } },
        { text: 'Stoisz nieruchomo na odsłoniętym terenie.', fx: { health: -5, food: -4, safety: -10 } }
      ];
    } else if (category === 'pogoda' || category === 'powódź' || category === 'wulkan') {
      actions = [
        { text: 'Szukasz stabilnej osłony i zmieniasz trasę.', fx: { health: 4, food: -3, safety: 13 }, good: true },
        { text: 'Podążasz za naturalnym ukształtowaniem terenu.', fx: { health: 0, food: -2, safety: 8 }, good: true },
        { text: 'Zostajesz w najbardziej ryzykownym miejscu.', fx: { health: -14, food: -5, safety: -15 } }
      ];
    } else if (category === 'rozmnażanie') {
      actions = [
        { text: 'Wybierasz osłonięte miejsce i ograniczasz ryzyko.', fx: { health: -2, food: -5, safety: 12 }, good: true },
        { text: 'Pilnujesz terenu, ale regularnie żerujesz.', fx: { health: 1, food: 5, safety: 5 }, good: true },
        { text: 'Bronisz miejsca bez odpoczynku i pożywienia.', fx: { health: -10, food: -10, safety: 2 } }
      ];
    } else if (category === 'migracja') {
      actions = [
        { text: 'Wybierasz stopniową trasę z wodą i osłoną.', fx: { health: 3, food: 5, safety: 11 }, good: true },
        { text: 'Podążasz za rozpoznawalnymi punktami terenu.', fx: { health: 0, food: 2, safety: 8 }, good: true },
        { text: 'Idziesz najkrótszą, nieznaną drogą bez postoju.', fx: { health: -11, food: -6, safety: -10 } }
      ];
    } else {
      actions = [
        { text: 'Zwalniasz tempo, oczyszczasz ranę i szukasz osłony.', fx: { health: 8, food: -4, safety: 6 }, good: true },
        { text: 'Ograniczasz ruch, lecz pilnujesz dostępu do pokarmu.', fx: { health: 5, food: 4, safety: 3 }, good: true },
        { text: 'Forsujesz marsz, mimo osłabienia.', fx: { health: -15, food: -3, safety: -6 } }
      ];
    }
    actions.forEach(function (a) {
      a.fx.health = change(a.fx.health, v.mult.health); a.fx.food = change(a.fx.food, v.mult.food); a.fx.safety = change(a.fx.safety, v.mult.safety);
      a.why = (a.good ? 'Dobra decyzja: ' : 'Ryzykowna decyzja: ') + 'dla ' + taxon.common + ' cecha „' + feature + '” oznacza, że ' + v.approach + '. ' +
        'Wpływ: zdrowie ' + (a.fx.health >= 0 ? '+' : '') + a.fx.health + ', sytość ' + (a.fx.food >= 0 ? '+' : '') + a.fx.food + ', bezpieczeństwo ' + (a.fx.safety >= 0 ? '+' : '') + a.fx.safety + '.';
    });
    return { title: event[1], text: intro, actions: K.shuffle(actions), turn: turn };
  }

  function startSurvival() {
    var dinos = K.dinos();
    K.stage().innerHTML = K.head('Gra 08', 'Wybierz dinozaura', '') + '<p class="gk-intro">Zagrasz jako wybrany takson. Każda decyzja zmieni zdrowie, sytość albo bezpieczeństwo.</p><div class="gk-survival-picker">' + dinos.map(function (d) {
      return '<button class="gk-dino-pick" data-dino="' + K.esc(d.id) + '"><img src="' + K.img(d.image) + '" alt=""><strong>' + K.esc(d.common) + '</strong><small><i>' + K.esc(d.scientific) + '</i></small></button>';
    }).join('') + '</div>';
    K.$$('.gk-dino-pick', K.stage()).forEach(function (button) {
      button.addEventListener('click', function () {
        var chosen = dinos.filter(function (d) { return d.id === button.dataset.dino; })[0];
        playSurvival(chosen, matchTaxon(chosen));
      });
    });
  }

  function playSurvival(dino, taxon) {
    var type = survivalProfile(taxon);
    var events = K.shuffle(SURVIVAL_EVENTS).slice(0, 12);
    var state = { health: 100, food: 100, safety: 100, turn: 0, alive: true, cause: '' };
    function hud() {
      return '<div class="gk-survival-hud">' +
        '<div><span>Zdrowie <b>' + state.health + '</b></span>' + K.bar(state.health, 'gk-health') + '</div>' +
        '<div><span>Sytość <b>' + state.food + '</b></span>' + K.bar(state.food, 'gk-food') + '</div>' +
        '<div><span>Bezpieczeństwo <b>' + state.safety + '</b></span>' + K.bar(state.safety, 'gk-safety') + '</div></div>';
    }
    function end() {
      var survived = state.turn;
      var sum = Math.max(0, state.health) + Math.max(0, state.food) + Math.max(0, state.safety);
      var score = Math.round(sum * survived / 4 + (state.alive && survived === 12 ? 250 : 0));
      K.finish({ game: 'survival', score: score, max: 1150, win: state.alive && survived === 12,
        title: state.alive && survived === 12 ? dino.common + ' przetrwał(a) 12 tur' : dino.common + ' nie przetrwał(a)',
        lines: ['Przetrwane tury: ' + survived + ' / 12', 'Końcowe wskaźniki: zdrowie ' + Math.max(0, state.health) + ', sytość ' + Math.max(0, state.food) + ', bezpieczeństwo ' + Math.max(0, state.safety), state.alive ? 'Premia za pełne przetrwanie: +250 pkt' : 'Przyczyna śmierci: ' + K.esc(state.cause)], onReplay: startSurvival });
    }
    function next() {
      if (!state.alive || state.turn >= 12) { end(); return; }
      var sc = buildSurvivalScenario(events[state.turn], taxon, type, state.turn + 1);
      K.stage().innerHTML = K.head('Przetrwanie · tura ' + (state.turn + 1) + '/12', dino.common, K.chips([{ label: SURVIVAL_VARIANTS[type].noun }])) + hud() +
        '<article class="gk-survival-scene"><img src="' + K.img(dino.image) + '" alt="' + K.esc(dino.common) + '"><div><p class="app-kicker">' + K.esc(sc.title) + '</p><h3>Co robisz?</h3><p>' + K.esc(sc.text) + '</p></div></article><div class="gk-survival-actions">' + sc.actions.map(function (a, i) { return '<button data-action="' + i + '">' + K.esc(a.text) + '</button>'; }).join('') + '</div><div class="gk-survival-consequence" aria-live="polite"></div>';
      K.$$('.gk-survival-actions button', K.stage()).forEach(function (button) {
        button.addEventListener('click', function () {
          var a = sc.actions[+button.dataset.action];
          K.$$('.gk-survival-actions button', K.stage()).forEach(function (b) { b.disabled = true; });
          state.health = Math.max(0, Math.min(100, state.health + a.fx.health));
          state.food = Math.max(0, Math.min(100, state.food + a.fx.food));
          state.safety = Math.max(0, Math.min(100, state.safety + a.fx.safety));
          state.turn++;
          if (!state.health) { state.alive = false; state.cause = 'obrażenia i wyczerpanie'; }
          else if (!state.food) { state.alive = false; state.cause = 'głód'; }
          else if (!state.safety) { state.alive = false; state.cause = 'brak bezpieczeństwa wobec zagrożeń'; }
          var box = K.$('.gk-survival-consequence', K.stage());
          box.innerHTML = '<strong class="' + (a.good ? 'ok' : 'no') + '">' + (a.good ? 'Korzystna konsekwencja.' : 'Trudna konsekwencja.') + '</strong><p>' + K.esc(a.why) + '</p>' + hud() + '<button class="button gk-next">' + (!state.alive ? 'Zobacz wynik' : state.turn === 12 ? 'Podsumowanie' : 'Następna tura') + '</button>';
          K.$('.gk-next', box).addEventListener('click', next);
        });
      });
    }
    next();
  }

  /* ------------------------------------------------------------
     09. DEDUCTION
     ------------------------------------------------------------ */
  function deductionFacts(secret, board) {
    var countries = K.countries();
    function cName(code) { var x = countries.filter(function (c) { return c.code === code; })[0]; return x ? x.name : code; }
    var all = [
      { text: (secret.diet === 'drapieżnik' ? 'Był drapieżnikiem.' : 'Nie był drapieżnikiem.'), test: function (x) { return (x.diet === 'drapieżnik') === (secret.diet === 'drapieżnik'); }, type: 'dieta' },
      { text: 'Żył w okresie: ' + secret.period + '.', test: function (x) { return x.period === secret.period; }, type: 'okres' },
      { text: (+secret.lengthM || 0) < 6 ? 'Mierzył mniej niż 6 metrów.' : 'Mierzył co najmniej 6 metrów.', test: function (x) { return ((+x.lengthM || 0) < 6) === ((+secret.lengthM || 0) < 6); }, type: 'długość' },
      { text: 'Należał do kladu ' + secret.clade + '.', test: function (x) { return x.clade === secret.clade; }, type: 'klad' }
    ];
    (secret.countries || []).forEach(function (code) {
      all.push({ text: 'Znaleziono go również w: ' + cName(code) + '.', test: function (x) { return (x.countries || []).indexOf(code) !== -1; }, type: 'kraj' });
    });
    if (secret.clade) all.push({
      text: secret.clade === 'Tyrannosauridae' ? 'Należy do Tyrannosauridae.' : 'Nie należy do Tyrannosauridae.',
      test: function (x) { return (x.clade === 'Tyrannosauridae') === (secret.clade === 'Tyrannosauridae'); },
      type: 'negacja kladu'
    });
    return K.shuffle(all).filter(function (fact) {
      var matching = board.filter(fact.test).length;
      return matching >= 1 && matching < board.length;
    });
  }

  function startDeduction() {
    modes(function (mode) {
      var amount = mode === 'easy' ? 8 : mode === 'medium' ? 12 : 16;
      var source = K.taxa().filter(function (t) { return t.common && t.image && t.period && t.diet && t.clade; });
      if (source.length < amount) { renderError('Za mało kompletnych kart taksonów.'); return; }
      var board = K.sample(source, amount);
      var secret = K.pick(board);
      var facts = deductionFacts(secret, board);
      var state = { eliminated: {}, hint: 0, hintsUsed: 0, pool: 1000, finished: false };
      if (!facts.length) { startDeduction(); return; }

      function render(message) {
        var remaining = board.filter(function (x) { return !state.eliminated[x.id]; });
        K.stage().innerHTML = K.head('Dedukcja · Guess Who', 'Który dinozaur?', K.chips([{ label: 'Pozostało: ' + remaining.length }, { label: 'Wskazówki: ' + state.hintsUsed }, { label: state.pool + ' pkt', tone: 'warn' }])) +
          '<section class="gk-deduction-clue"><p class="app-kicker">Wskazówka ' + (state.hintsUsed + 1) + '</p><h3>' + K.esc(facts[state.hint].text) + '</h3><p>Samodzielnie przekreśl karty, które nie pasują do tej informacji.</p></section>' +
          '<div class="gk-deduction-grid">' + board.map(function (t) {
            var off = !!state.eliminated[t.id];
            return '<button class="gk-deduction-card' + (off ? ' is-eliminated' : '') + '" data-card="' + K.esc(t.id) + '" aria-pressed="' + off + '"><img src="' + K.img(t.image) + '" alt=""><strong>' + K.esc(t.common) + '</strong><small><i>' + K.esc(t.scientific) + '</i></small><span>' + (off ? 'Odrzucono' : 'Kliknij, aby odrzucić') + '</span></button>';
          }).join('') + '</div><p class="gk-deduction-message" aria-live="polite">' + K.esc(message || '') + '</p><div class="gk-deduction-actions"><button class="button gk-next-hint"' + (state.hint >= facts.length - 1 ? ' disabled' : '') + '>Następna wskazówka (−150 pkt)</button><button class="button gk-submit"' + (remaining.length === 1 ? '' : ' disabled') + '>Zgłoś odpowiedź</button></div>';
        K.$$('.gk-deduction-card', K.stage()).forEach(function (button) {
          button.addEventListener('click', function () {
            if (state.finished) return;
            var id = button.dataset.card;
            state.eliminated[id] = !state.eliminated[id];
            if (id === secret.id && state.eliminated[id]) {
              state.finished = true;
              K.finish({ game: 'deduction', score: 0, max: 1000, win: false, title: 'Odrzucono sekretnego dinozaura', lines: ['Sekretnym taksonem był: ' + K.esc(secret.common), 'Przeanalizuj wskazówki i spróbuj ponownie.'], onReplay: startDeduction });
              return;
            }
            render('Karta została ' + (state.eliminated[id] ? 'odrzucona.' : 'przywrócona do puli.'));
          });
        });
        var nextHint = K.$('.gk-next-hint', K.stage());
        if (nextHint) nextHint.addEventListener('click', function () {
          if (state.hint >= facts.length - 1) return;
          state.hint++; state.hintsUsed++; state.pool = Math.max(0, state.pool - 150);
          render('Nowa wskazówka obniżyła pulę punktów.');
        });
        var submit = K.$('.gk-submit', K.stage());
        if (submit) submit.addEventListener('click', function () {
          var candidate = board.filter(function (x) { return !state.eliminated[x.id]; })[0];
          var ok = candidate && candidate.id === secret.id;
          state.finished = true;
          K.finish({ game: 'deduction', score: ok ? state.pool : 0, max: 1000, win: ok, title: ok ? 'Trafna dedukcja!' : 'To nie był sekretny dinozaur',
            lines: ['Sekretny takson: ' + K.esc(secret.common), 'Wykorzystane wskazówki: ' + (state.hintsUsed + 1), ok ? 'Zachowana pula: ' + state.pool + ' pkt' : 'Wybrano: ' + K.esc(candidate ? candidate.common : 'brak')], onReplay: startDeduction });
        });
      }
      render('Pierwsza wskazówka jest już aktywna.');
    }, 'Gra 09', 'Który dinozaur?', 'Czytaj wskazówki, ręcznie eliminuj niepasujące karty i zgłoś odpowiedź dopiero, gdy zostanie jedna.');
  }

  K.register('diagnosis', startDiagnosis);
  K.register('mapa', startMap);
  K.register('escape', startEscape);
  K.register('survival', startSurvival);
  K.register('deduction', startDeduction);
})();
