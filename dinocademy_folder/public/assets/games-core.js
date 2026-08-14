/* Dinocademy: gry podstawowe — Memory, Nazwij okaz, Sprawa dowodowa, Quiz Battle */
(function () {
  'use strict';

  var K = window.GameKit;
  if (!K) return;

  function formatSeconds(total) {
    var mins = Math.floor(total / 60);
    var secs = total % 60;
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  function normaliseName(value) {
    var letters = { 'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z' };
    return String(value == null ? '' : value).toLowerCase().replace(/[ąćęłńóśźż]/g, function (letter) {
      return letters[letter];
    }).replace(/[\s.]+/g, '');
  }

  function emptyGame(message) {
    var stage = K.stage();
    if (stage) stage.innerHTML = '<div class="game-empty"><b>Brak danych</b><p>' + K.esc(message) + '</p></div>';
  }

  /* ------------------------------------------------------------
     1. MEMORY: obraz dinozaura + jego polska i naukowa nazwa
     ------------------------------------------------------------ */
  function startMemory() {
    K.difficultyPicker({
      kicker: 'GRA 1 · PAMIĘĆ',
      title: 'Memory: obraz i nazwa',
      intro: 'Odkrywaj karty i łącz w pary wizerunek dinozaura z jego nazwą.',
      modes: [
        { id: 'easy', label: 'Łatwy', desc: '4 pary · znane dinozaury', tone: '4 × 2' },
        { id: 'medium', label: 'Średni', desc: '6 par · poziomy 1 i 2', tone: '4 × 3' },
        { id: 'hard', label: 'Trudny', desc: '8 par · mniej znane okazy', tone: '4 × 4' }
      ],
      onPick: function (mode) { playMemory(mode); }
    });
  }

  function playMemory(mode) {
    var settings = {
      easy: { pairs: 4, base: 600, tiers: [1], grid: 'gk-memory-grid-4x2', label: 'Łatwy' },
      medium: { pairs: 6, base: 1000, tiers: [1, 2], grid: 'gk-memory-grid-4x3', label: 'Średni' },
      hard: { pairs: 8, base: 1600, tiers: [2, 3], grid: 'gk-memory-grid-4x4', label: 'Trudny' }
    }[mode];
    var pool = [];
    var stage = K.stage();
    var active = true;
    var first = null;
    var locked = false;
    var moves = 0;
    var matched = 0;
    var elapsed = 0;
    var startedAt = Date.now();
    var intervalId = null;
    var pendingId = null;
    var cards;

    settings.tiers.forEach(function (tier) { pool = pool.concat(K.byTier(tier)); });
    if (pool.length < settings.pairs) {
      emptyGame('Nie ma wystarczającej liczby dinozaurów dla tego trybu.');
      return;
    }
    cards = K.shuffle(K.sample(pool, settings.pairs).reduce(function (list, dino) {
      list.push({ dino: dino, kind: 'image' });
      list.push({ dino: dino, kind: 'name' });
      return list;
    }, []));

    function updateHud() {
      var moveEl = K.$('#gk-memory-moves', stage);
      var timeEl = K.$('#gk-memory-time', stage);
      if (moveEl) moveEl.textContent = moves;
      if (timeEl) timeEl.textContent = formatSeconds(elapsed);
    }

    function showFact(dino) {
      var fact = K.$('#gk-memory-fact', stage);
      if (fact) {
        fact.innerHTML = '<strong>' + K.esc(dino.common) + '</strong> <em>' + K.esc(dino.scientific) + '</em><p>' + K.esc(dino.description || '') + '</p>';
      }
    }

    function finishMemory() {
      var score;
      if (!active) return;
      active = false;
      clearInterval(intervalId);
      elapsed = Math.floor((Date.now() - startedAt) / 1000);
      score = Math.max(100, settings.base - (moves * 22) - (elapsed * 3));
      K.finish({
        game: 'memory', score: score, max: settings.base, title: 'Wszystkie pary odkryte!', win: true,
        lines: ['Tryb: ' + settings.label, 'Ruchy: ' + moves, 'Czas: ' + formatSeconds(elapsed)],
        onReplay: startMemory
      });
    }

    function turn(cardIndex) {
      var card = cards[cardIndex];
      var button;
      if (!active || locked || card.open || card.matched) return;
      button = K.$('[data-memory-card="' + cardIndex + '"]', stage);
      card.open = true;
      if (button) button.classList.remove('hidden');
      if (first === null) {
        first = cardIndex;
        return;
      }
      moves += 1;
      updateHud();
      if (cards[first].dino.id === card.dino.id && cards[first].kind !== card.kind) {
        cards[first].matched = true;
        card.matched = true;
        matched += 1;
        K.$('[data-memory-card="' + first + '"]', stage).classList.add('matched');
        if (button) button.classList.add('matched');
        showFact(card.dino);
        first = null;
        if (matched === settings.pairs) finishMemory();
      } else {
        var prior = first;
        locked = true;
        pendingId = setTimeout(function () {
          var priorButton;
          if (!active) return;
          cards[prior].open = false;
          cards[cardIndex].open = false;
          priorButton = K.$('[data-memory-card="' + prior + '"]', stage);
          if (priorButton) priorButton.classList.add('hidden');
          if (button) button.classList.add('hidden');
          first = null;
          locked = false;
        }, 800);
      }
    }

    if (!stage) return;
    stage.innerHTML = K.head('GRA 1 · MEMORY', 'Połącz obraz z nazwą',
      'Ruchy: <b id="gk-memory-moves">0</b> · Czas: <b id="gk-memory-time">0:00</b>') +
      K.bar(0, 'gk-memory-progress') +
      '<div class="memory-grid ' + settings.grid + '">' + cards.map(function (card, index) {
        var face = card.kind === 'image'
          ? '<img src="' + K.img(card.dino.image) + '" alt="Wizerunek dinozaura">'
          : '<span class="gk-memory-name">' + K.esc(card.dino.common) + '<em>' + K.esc(card.dino.scientific) + '</em></span>';
        return '<button type="button" class="memory-card hidden gk-memory-card" data-memory-card="' + index + '" aria-label="Odkryj kartę"><span class="gk-memory-face">' + face + '</span></button>';
      }).join('') + '</div>' +
      '<aside class="gk-memory-fact" id="gk-memory-fact" aria-live="polite">Odkryj parę, aby przeczytać krótką notkę o dinozaurze.</aside>';

    K.$$('[data-memory-card]', stage).forEach(function (button) {
      button.addEventListener('click', function () { turn(+button.getAttribute('data-memory-card')); });
    });
    intervalId = setInterval(function () {
      if (!active) return;
      elapsed = Math.floor((Date.now() - startedAt) / 1000);
      updateHud();
    }, 1000);
    K.onCleanup(function () {
      active = false;
      clearInterval(intervalId);
      clearTimeout(pendingId);
    });
  }

  /* ------------------------------------------------------------
     2. SPECIMEN: rozpoznawanie okazu ze wskazówki i ilustracji
     ------------------------------------------------------------ */
  function startSpecimen() {
    K.difficultyPicker({
      kicker: 'GRA 2 · OKAZ',
      title: 'Nazwij okaz',
      intro: 'Rozpoznaj dinozaura na podstawie obrazu i opisu cech.',
      modes: [
        { id: 'easy', label: 'Łatwy', desc: 'Kliknij jedną z 4 odpowiedzi', tone: 'tier 1' },
        { id: 'medium', label: 'Średni', desc: 'Wpisz nazwę z podpowiedzią', tone: 'tiery 1–2' },
        { id: 'hard', label: 'Trudny', desc: 'Wpisz nazwę bez podpowiedzi', tone: 'wszystkie tiery' }
      ],
      onPick: function (mode) { playSpecimen(mode); }
    });
  }

  function playSpecimen(mode) {
    var source = mode === 'easy' ? K.byTier(1) : mode === 'medium' ? K.byTier(1).concat(K.byTier(2)) : K.dinos();
    var rounds = K.sample(source, 6);
    var stage = K.stage();
    var round = 0;
    var score = 0;
    var correctCount = 0;
    var delayId = null;
    var active = true;

    if (rounds.length < 6) {
      emptyGame('Nie ma wystarczającej liczby okazów dla sześciu rund.');
      return;
    }

    function finishSpecimen() {
      active = false;
      K.finish({
        game: 'specimen', score: score, max: mode === 'hard' ? 900 : 600, title: 'Badanie okazów zakończone', win: correctCount >= 3,
        lines: ['Tryb: ' + (mode === 'easy' ? 'Łatwy' : mode === 'medium' ? 'Średni' : 'Trudny'), 'Poprawne odpowiedzi: ' + correctCount + ' / 6', 'Punkty: ' + score],
        onReplay: startSpecimen
      });
    }

    function goNext() {
      if (!active) return;
      round += 1;
      if (round >= rounds.length) finishSpecimen();
      else renderRound();
    }

    function acceptAnswer(value, dino, feedback) {
      var accepted = [dino.common, dino.scientific].concat(dino.aliases || []);
      var normal = normaliseName(value);
      var isCorrect = accepted.some(function (name) { return normal === normaliseName(name); });
      var scientificBonus = mode === 'hard' && normal === normaliseName(dino.scientific);
      var add = isCorrect ? 100 + (scientificBonus ? 50 : 0) : 0;
      if (isCorrect) { score += add; correctCount += 1; }
      feedback.innerHTML = (isCorrect ? '<strong class="ok">✓ Dobrze' + (scientificBonus ? ' — +50 za nazwę naukową' : '') + '.</strong> ' : '<strong class="no">✕ Nie tym razem.</strong> ') + K.esc(dino.description || '');
      delayId = setTimeout(goNext, isCorrect ? 1050 : 1650);
    }

    function renderRound() {
      var dino = rounds[round];
      var answerRoot;
      if (!active || !stage) return;
      stage.innerHTML = K.head('GRA 2 · NAZWIJ OKAZ', 'Rozpoznaj dinozaura', 'Runda ' + (round + 1) + ' / 6 · Punkty: ' + score) +
        K.bar((round / 6) * 100, 'gk-specimen-progress') +
        '<div class="specimen-card gk-specimen-card"><img src="' + K.img(dino.image) + '" alt="Okaz do rozpoznania"><div><span class="app-kicker">WSKAZÓWKA</span><p class="gk-specimen-clue">' + K.esc(dino.clue) + '</p><div id="gk-specimen-answer"></div><p class="gk-feedback" id="gk-specimen-feedback" aria-live="polite"></p></div></div>';
      answerRoot = K.$('#gk-specimen-answer', stage);
      if (mode === 'easy') {
        var answers = [dino.common].concat(K.sample(source.filter(function (item) { return item.id !== dino.id; }), 3).map(function (item) { return item.common; }));
        K.askChoice({
          root: answerRoot, question: 'Jaki to dinozaur?', options: K.shuffle(answers), correct: dino.common, why: dino.description || '',
          onAnswer: function (ok) {
            if (!active) return;
            if (ok) { score += 100; correctCount += 1; }
            delayId = setTimeout(goNext, ok ? 950 : 1550);
          }
        });
      } else {
        var hint = mode === 'medium' ? '<p class="gk-name-hint">Podpowiedź: <b>' + K.esc(dino.common.charAt(0)) + '</b> · ' + dino.common.replace(/\s/g, '').length + ' znaków</p>' : '';
        answerRoot.innerHTML = hint + '<form class="specimen-form gk-specimen-form" id="gk-specimen-form"><label class="sr-only" for="gk-specimen-input">Nazwa dinozaura</label><input id="gk-specimen-input" autocomplete="off" placeholder="Wpisz nazwę…"><button class="button" type="submit">Sprawdź</button></form>';
        K.$('#gk-specimen-form', stage).addEventListener('submit', function (event) {
          var input;
          var feedback;
          event.preventDefault();
          if (!active) return;
          input = K.$('#gk-specimen-input', stage);
          feedback = K.$('#gk-specimen-feedback', stage);
          if (!input || !feedback || input.disabled) return;
          input.disabled = true;
          K.$('button', event.currentTarget).disabled = true;
          acceptAnswer(input.value, dino, feedback);
        });
      }
    }

    K.onCleanup(function () { active = false; clearTimeout(delayId); });
    renderRound();
  }

  /* ------------------------------------------------------------
     3. EVIDENCE: ograniczanie wniosków do danych ze sprawy
     ------------------------------------------------------------ */
  function startEvidence() {
    var allCases = K.cases();
    var selected = [];
    var index = 0;
    var score = 0;
    var active = true;
    var stage = K.stage();

    if (!allCases.length) {
      emptyGame('Brak spraw dowodowych.');
      return;
    }
    while (selected.length < 5) {
      K.shuffle(allCases).forEach(function (item) {
        if (selected.length < 5 && (allCases.length < 5 || selected.indexOf(item) === -1)) selected.push(item);
      });
    }

    function finishEvidence() {
      active = false;
      K.finish({
        game: 'evidence', score: score, max: 500, title: 'Sprawa dowodowa zamknięta', win: score >= 300,
        lines: ['Rozwiązane sprawy: 5', 'Poprawne wnioski: ' + (score / 100) + ' / 5', 'Wynik: ' + score + ' pkt'],
        onReplay: startEvidence
      });
    }

    function renderCase() {
      var current = selected[index];
      var prefix;
      if (!active || !stage) return;
      prefix = K.head('GRA 3 · SPRAWA DOWODOWA', current.title, 'Sprawa ' + (index + 1) + ' / 5 · Punkty: ' + score) +
        K.bar((index / 5) * 100, 'gk-evidence-progress') +
        '<section class="gk-case-setup"><span class="app-kicker">MATERIAŁ SPRAWY</span><p>' + K.esc(current.setup) + '</p></section>';
      K.askChoice({
        root: stage, prefix: prefix, question: current.question, options: current.options,
        correct: current.options[current.answer], why: current.explanation,
        onAnswer: function (ok) {
          if (!active) return;
          if (ok) score += 100;
          index += 1;
          if (index >= selected.length) finishEvidence();
          else renderCase();
        }
      });
    }

    K.onCleanup(function () { active = false; });
    renderCase();
  }

  /* ------------------------------------------------------------
     4. BATTLE: szybkie porównanie dwóch taksonów
     ------------------------------------------------------------ */
  function startBattle() {
    K.difficultyPicker({
      kicker: 'GRA 4 · QUIZ BATTLE',
      title: 'Dino Quiz Battle',
      intro: 'Wybierz takson pasujący do pytania, buduj serię i zdobywaj mnożniki.',
      modes: [
        { id: 'easy', label: 'Łatwy', desc: 'Tylko porównanie długości', tone: '8 rund' },
        { id: 'medium', label: 'Średni', desc: 'Długość oraz wiek', tone: '8 rund' },
        { id: 'hard', label: 'Trudny', desc: 'Długość, wiek, dieta i klad', tone: '8 rund' }
      ],
      onPick: function (mode) { playBattle(mode); }
    });
  }

  function numberText(value) {
    return String(value).replace('.', ',');
  }

  function playBattle(mode) {
    var taxa = K.taxa();
    var types = mode === 'easy' ? ['length'] : mode === 'medium' ? ['length', 'age'] : ['length', 'age', 'diet', 'clade'];
    var stage = K.stage();
    var round = 0;
    var score = 0;
    var streak = 0;
    var delayId = null;
    var active = true;
    var used = {};

    function validNumber(value) { return typeof value === 'number' && isFinite(value); }

    function makeQuestion(type) {
      var attempt;
      for (attempt = 0; attempt < 120; attempt += 1) {
        var pair = K.sample(taxa, 2);
        var a = pair[0];
        var b = pair[1];
        var signature = [a.id, b.id].sort().join('|') + ':' + type;
        var question;
        if (used[signature]) continue;
        if (type === 'length' && validNumber(a.lengthM) && validNumber(b.lengthM) && a.lengthM !== b.lengthM) {
          question = { a: a, b: b, correct: a.lengthM > b.lengthM ? 0 : 1, label: 'Który dinozaur był dłuższy?', fact: a.common + ': ' + numberText(a.lengthM) + ' m vs ' + b.common + ': ' + numberText(b.lengthM) + ' m' };
        }
        if (type === 'age' && validNumber(a.ageMya) && validNumber(b.ageMya) && a.ageMya !== b.ageMya) {
          question = { a: a, b: b, correct: a.ageMya > b.ageMya ? 0 : 1, label: 'Który żył wcześniej?', fact: a.common + ': ok. ' + numberText(a.ageMya) + ' mln lat temu vs ' + b.common + ': ok. ' + numberText(b.ageMya) + ' mln lat temu' };
        }
        if (type === 'diet' && ((a.diet === 'drapieżnik') !== (b.diet === 'drapieżnik'))) {
          question = { a: a, b: b, correct: a.diet === 'drapieżnik' ? 0 : 1, label: 'Który był drapieżnikiem?', fact: a.common + ': ' + a.diet + ' · ' + b.common + ': ' + b.diet };
        }
        if (type === 'clade' && a.clade && b.clade && a.clade !== b.clade) {
          question = { a: a, b: b, correct: 0, label: 'Który należał do kladu ' + a.clade + '?', fact: a.common + ': ' + a.clade + ' · ' + b.common + ': ' + b.clade };
        }
        if (question) {
          used[signature] = true;
          return question;
        }
      }
      return null;
    }

    function finishBattle() {
      active = false;
      K.finish({
        game: 'battle', score: score, max: 1600, title: 'Bitwa quizowa zakończona', win: score >= 500,
        lines: ['Tryb: ' + (mode === 'easy' ? 'Łatwy' : mode === 'medium' ? 'Średni' : 'Trudny'), 'Rozegrane rundy: 8', 'Najwyższa seria daje mnożnik x2'],
        onReplay: startBattle
      });
    }

    function renderRound() {
      var question = makeQuestion(types[round % types.length]);
      if (!active || !stage) return;
      if (!question) { finishBattle(); return; }
      stage.innerHTML = K.head('GRA 4 · DINO QUIZ BATTLE', 'Wybierz właściwy takson', 'Runda ' + (round + 1) + ' / 8 · Punkty: ' + score + ' · Seria: <b>' + streak + '</b>') +
        K.bar((round / 8) * 100, 'gk-battle-progress') +
        '<h3 class="gk-question">' + K.esc(question.label) + '</h3><div class="battle-pair gk-battle-pair">' + [question.a, question.b].map(function (dino, side) {
          return '<button type="button" class="gk-battle-card" data-battle-side="' + side + '"><img src="' + K.img(dino.image) + '" alt="' + K.esc(dino.common) + '"><strong>' + K.esc(dino.common) + '</strong><em>' + K.esc(dino.scientific) + '</em></button>';
        }).join('') + '</div><p class="gk-feedback gk-battle-feedback" id="gk-battle-feedback" aria-live="polite"></p>';
      K.$$('[data-battle-side]', stage).forEach(function (button) {
        button.addEventListener('click', function () {
          var choice = +button.getAttribute('data-battle-side');
          var ok = choice === question.correct;
          var multiplier;
          var feedback;
          if (!active || button.disabled) return;
          K.$$('[data-battle-side]', stage).forEach(function (item, side) {
            item.disabled = true;
            if (side === question.correct) item.classList.add('correct');
          });
          if (ok) {
            streak += 1;
            multiplier = streak >= 4 ? 2 : streak >= 2 ? 1.5 : 1;
            score += 100 * multiplier;
          } else {
            streak = 0;
            button.classList.add('wrong');
          }
          feedback = K.$('#gk-battle-feedback', stage);
          if (feedback) feedback.innerHTML = (ok ? '<strong class="ok">✓ Dobrze.</strong> ' : '<strong class="no">✕ Nie tym razem.</strong> ') + K.esc(question.fact) + (ok ? ' · Seria: ' + streak + ', mnożnik x' + multiplier : ' · Seria przerwana.');
          delayId = setTimeout(function () {
            if (!active) return;
            round += 1;
            if (round >= 8) finishBattle();
            else renderRound();
          }, ok ? 1100 : 1700);
        });
      });
    }

    if (taxa.length < 2) {
      emptyGame('Brak wystarczających danych taksonomicznych.');
      return;
    }
    K.onCleanup(function () { active = false; clearTimeout(delayId); });
    renderRound();
  }

  K.register('memory', startMemory);
  K.register('specimen', startSpecimen);
  K.register('evidence', startEvidence);
  K.register('battle', startBattle);
})();
