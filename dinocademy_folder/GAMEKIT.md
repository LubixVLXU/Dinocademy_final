# Kontrakt GameKit — dla twórców gier Dinocademy

Plik silnika: `/home/user/workspace/dinocademy_final/public/assets/game-kit.js` (PRZECZYTAJ GO PIERWSZY — nie modyfikuj).

Każda gra rejestruje się tak:

```js
(function () {
  var K = window.GameKit;
  K.register('memory', function start() { /* rysuje do K.stage() */ });
})();
```

Ładowanie w `gry.html` (kolejność): `recovery-data.js` → `recovery.js` → `game-kit.js` → `games-core.js` → `games-advanced.js` → wywołanie `GameKit.boot()`.

## Dostępne API (window.GameKit)

Pomocniki: `$`, `$$`, `esc`, `shuffle`, `pick`, `sample(arr,n)`, `img(path)` (usuwa wiodący `/`), `token()`.

Dane:
- `K.dinos()` → 16 obiektów: `{id, common, scientific, aliases[], image, clue, description, period, region, tier}` (tier 1=łatwy, 2=średni, 3=trudny)
- `K.byTier(1|2|3)` → filtr po tier
- `K.taxa()` → 46 obiektów: `{id, common, scientific, image, countries[], period, ageMya, lengthM, diet, clade, feature, defense, habitat}`
- `K.cases()` → sprawy dowodowe: `{id, title, setup, question, options[], answer(index), explanation}`
- `K.scenarios()` → 16 scenariuszy: `{id, title, text, kind}` (kind: 'defense' itd.)
- `K.countries()` → `{code, name, x, y}` (x,y = procenty na mapie `games/world-map.webp`)

UI:
- `K.stage()` → element `#game-stage` (rysuj do niego przez innerHTML)
- `K.head(kicker, title, rightHtml)` → HTML nagłówka gry
- `K.bar(pct, cls)` → pasek postępu
- `K.chips([{label, tone}])` → chipsy (tone: 'ok'|'warn'|'bad')
- `K.difficultyPicker({kicker, title, intro, modes:[{id,label,desc,tone}], onPick(modeId)})` → ekran wyboru trybu
- `K.askChoice({root, prefix, question, options[], correct, why, onAnswer(ok)})` → pytanie z listą odpowiedzi i feedbackiem (sama obsługuje kolory i opóźnienie)
- `K.buildQuestion('easy'|'medium'|'hard')` → `{q, correct, options[], why, dino}` — generowane pytanie o dinozaurze
- `K.finish({game, score, max, title, lines[], win(bool), onReplay})` → ekran końcowy; SAM zapisuje wynik i XP. **Zawsze kończ grę przez `K.finish`, nie zapisuj wyniku ręcznie.**
- `K.onCleanup(fn)` → zarejestruj sprzątanie (usuwanie listenerów, cancelAnimationFrame) — wołane przy zmianie gry. OBOWIĄZKOWE dla gier z pętlą animacji lub listenerami na `document`.

## Zasady

1. Nie używaj `window.addScore` ani własnego fetch do `/api/scores` — tylko `K.finish`.
2. Nie dotykaj `recovery.js`, `game-kit.js`, `gry.html`, `server.js`.
3ipeline. Cały kod w jednym IIFE, `'use strict'`, ES5-kompatybilny (bez optional chaining, bez `??`).
4. Zawsze escapuj dane użytkownika i dane z bazy przez `K.esc`.
5. Obrazy: `<img src="' + K.img(d.image) + '">` — ścieżki w danych zaczynają się od `/memory/...`.
6. Walidacja: `node --check <plik>` musi przejść.
7. Polski interfejs. Nazwy naukowe kursywą.
8. Nie generuj nowych obrazów — używaj tylko istniejących z danych i katalogu `public/memory/`, `public/games/`.
9. Klasy CSS, które już istnieją i możesz używać: `game-head`, `game-score`, `game-empty`, `choice-list`, `recovery-status`, `specimen-card`, `battle-pair`, `memory-grid`, `memory-card`, `app-kicker`, `button`, `quiet-link`, `gk-bar`, `gk-chips`, `gk-chip`, `gk-modes`, `gk-mode`, `gk-question`, `gk-feedback`, `gk-intro`. Nowe klasy nazywaj z prefiksem `gk-` i dopisz ich CSS na końcu pliku `public/assets/games.css` (utwórz go, jeśli nie istnieje — jest już podlinkowany).
