# Dinocademy — patch: home.js + home.css

## Co jest w paczce
- public/assets/home.js  — animacje i interakcje strony głównej (reveal on scroll, interaktywna "pierwsza decyzja", karuzela ciekawostek, licznik statystyk, lekki tilt na hero)
- public/assets/home.css — style/animacje wspierające powyższy skrypt

## Jak wdrożyć (Windows PowerShell)

1. Skopiuj oba pliki do swojego repo, zachowując strukturę:
   dinocademy-final/public/assets/home.js
   dinocademy-final/public/assets/home.css

2. W pliku public/index.html:

   a) W sekcji <head>, po istniejących linkach do CSS, dodaj:
      <link href="assets/home.css" rel="stylesheet"/>

   b) Przed </body>, po istniejących <script>, dodaj:
      <script src="assets/home.js"></script>

   c) (Opcjonalnie) Dodaj sekcję ciekawostek w <main>, np. po sekcji
      "home-destinations" a przed </main>:

      <section class="home-facts">
        <div class="page-shell">
          <header><span>LOSOWA CIEKAWOSTKA</span><h2>Co dziś odkrywasz?</h2></header>
          <p id="home-fact-text"></p>
          <div id="home-fact-dots"></div>
        </div>
      </section>

3. Commit i push:

   cd C:\Users\adaml\Documents\dinocademy-final
   git add public/assets/home.js public/assets/home.css public/index.html
   git commit -m "Dodaj animacje i interakcje na stronie glownej"
   git push -u origin main

Skrypt jest napisany w czystym JS (bez zależności), więc nie wymaga zmian
w package.json ani ponownego npm install.
