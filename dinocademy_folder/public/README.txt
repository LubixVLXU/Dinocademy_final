DINOCademy — FIXED / RECOVERED EDITION

URUCHOMIENIE (Windows):
1. Rozpakuj cały ZIP.
2. Kliknij START_DINOCademy.bat.
3. Strona otworzy się w domyślnej przeglądarce.

Ta wersja działa bez Pythona, Node.js i serwera.

ODZYSKANE / ODBUDOWANE:
- wygląd i strona główna z wdrożenia,
- 46 rekordów encyklopedii + grafiki, wyszukiwanie i filtry,
- 10 lekcji Level 0 odzyskanych z bundla DatabaseLesson,
- gry: Memory, Nazwij okaz, Sprawa dowodowa, Dino Quiz Battle,
- notatnik lokalny,
- lokalny ranking,
- lokalna rejestracja/logowanie i postęp,
- Plan Pro jako strona informacyjna,
- wszystkie odzyskane assety i oryginalne bundle JS zachowane w recovered-bundles/.

OGRANICZENIA:
Oryginalny backend, baza użytkowników, sesje, płatności i prywatne dane nie były obecne w publicznych plikach, więc nie dało się ich odzyskać. Zastąpiłem te elementy localStorage, żeby strona była używalna bez serwera.


=====================================================================
AKTUALIZACJA - KURSY, PLAN PRO, SLOWNIK, WIDOK MOBILNY
=====================================================================

NAWIGACJA KURSOW (3 poziomy)
  kursy.html                        -> biblioteka kursow (wybor kursu)
  kurs.html?c=<kurs>                -> lista rozdzialow kursu
  kurs.html?c=<kurs>&m=<rozdzial>   -> lista lekcji rozdzialu
  lekcja.html?c=..&m=..&l=<lekcja>  -> tresc lekcji
  lekcja.html?c=..&m=..&quiz=1      -> quiz rozdzialu
  learn.html / lesson.html          -> przekierowanie do kursy.html

KURSY
  1. dino-all   "Swiat dinozaurow - kurs kompletny"
     34 rozdzialy, 262 lekcje, 175 pytan quizowych, ~45 h
  2. paleo-pro  "Paleontologia praktyczna"
     33 rozdzialy w 8 etapach, 546 lekcji, ~104 h

  Dane kursow: assets/course-dino-1.js (rozdz. 1-12),
               assets/course-dino-2.js (13-24),
               assets/course-dino-3.js (25-34),
               assets/course-plan.js  (sciezka zawodowa),
               assets/courses.js      (rejestr + regula dostepu).
  Renderowanie: assets/course-hub.js + assets/course-hub.css

DOSTEP BEZPLATNY (funkcja isFree w assets/courses.js)
  Kurs o dinozaurach: cale rozdzialy 1-2, pierwsza lekcja rozdzialow 3-6
  oraz dwie lekcje z rozdzialu 33 "Fakty i mity" = 16 lekcji bezplatnie.
  Sciezka zawodowa: pierwszy rozdzial.
  Pozostale lekcje, wszystkie quizy i certyfikat -> plan Pro.

PLAN PRO - BAZA DANYCH
  Tabela users: nowe kolumny is_pro INTEGER DEFAULT 0, pro_since TEXT.
  Migracja jest automatyczna przy starcie serwera (blok MIGRACJE
  w server.js) - istniejacej data.db nie trzeba usuwac.

  Endpointy:
    GET  /api/me            -> user.isPro
    POST /api/pro/activate  -> wlacza Pro (wersja demo, bez plaatnosci)
    POST /api/pro/cancel    -> wylacza Pro
    POST /api/scores        -> 402 {needsPro:true} bez Pro

  Aby podlaczyc prawdziwe plaatnosci: zamien POST /api/pro/activate na
  webhook operatora (Stripe / Przelewy24) i ustaw is_pro=1 dopiero po
  potwierdzeniu wplaty.

  Panel planu na pro.html: assets/pro.js

GRY - TYLKO W PRO
  assets/game-kit.js: FREE_DEMO = 'memory' (jedyny tryb bez Pro, bez XP).
  Pozostale 8 gier zablokowane, kafelki dostaja plakietke PRO.
  Zapis wynikow i XP wymaga Pro (serwer odrzuca zadanie kodem 402).

SLOWNIK TERMINOW
  90 hasel: assets/glossary.js (29 odzyskanych z oryginalnej strony)
  + glossary-1.js / -2.js / -3.js (61 nowych).
  Silnik: assets/glossary-engine.js - podkresla terminy w tresci lekcji,
  wyjasnienie po najechaniu, kliknieciu lub fokusie z klawiatury.
  Kazdy termin zaznaczany raz na lekcje.
  Nowe haslo = jeden wpis {t:'termin', d:'definicja', f:['odmiany']}.

WIDOK MOBILNY
  assets/ui-extra.css: breakpointy 768 px i 480 px dla centrum gier,
  wykluwarni, paywalla i panelu Pro. Cele dotykowe min. 46-48 px.

MIEJSCE NA OBRAZY
  Lekcje i rozdzialy maja pola figure / figures (caption + alt),
  renderowane jako ramki-placeholdery z podpisem. Aby wstawic grafike,
  dodaj pole src do obiektu figure - renderer uzyje obrazu zamiast ramki.
