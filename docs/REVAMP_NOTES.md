# Dinocademy v3.0 — Revamp

## Najważniejsze zmiany

- Całkowicie przebudowana strona główna: warstwowy hero, pył/warstwy geologiczne, interaktywne epoki, wykopalisko z ukrytymi ciekawostkami, quiz i animowany showcase wariantów.
- Płynne animacje z `prefers-reduced-motion`; lekkie efekty globalne na pozostałych stronach.
- Naprawione brakujące arkusze CSS (`index-C-lA4BJt.css`, `games.css`, `recovery.css`, `course-hub.css`).
- Wykluwarnia korzysta z kanonicznego katalogu `data/taxa.json` — 46 taksonów z encyklopedii.
- 7 wariantów collectible: Standard, Shiny, Fosylna poświata, Mutacja bio, Mutacja cyber, Cryo, Primal.
- Każdy wariant jest osobną kartą; poziom karty 1–100; duplikaty dają Dino XP i mogą podnieść kilka poziomów przy rzadszych kartach.
- Wyższe rzadkości i warianty mają większe współczynniki Dino XP oraz wkład do globalnego mnożnika XP.
- Globalny mnożnik XP działa w grach i lekcjach przez jeden serwis `awardXp()`.
- Tylko jedno aktywne jajo otrzymuje XP inkubacji; pozostałe czekają w kolejce.
- XP dodawane przez administratora jest dokładną wartością (bez mnożnika), ale również zasila aktywne jajo.
- Panel administratora: wyszukiwanie użytkowników, +100/+1K/+10K, własna wartość, statystyki i audit log.
- Konto `adamlubanskimc@gmail.com` otrzymuje flagę administratora, jeśli istnieje w bazie. Przy świeżej bazie można utworzyć je przez zmienną `ADMIN_PASSWORD`.
- Profil administratora pokazuje link do panelu admina.
- Gra mapowa: pierwszy klik kończy rundę. Błąd = 0 pkt, poprawne państwo zostaje pokazane i następuje automatyczne przejście dalej.
- Ranking ma kategorie: level, XP, najlepszy wynik, suma punktów, kolekcja, kompletność, shiny, mutacje, epic+legendary, średni/max level dino i mnożnik XP.
- Przywrócone endpointy zmiany e-maila i hasła profilu oraz podstawowe API forum.

## Uruchomienie

```bash
npm install
npm start
```

Domyślny adres: `http://localhost:3000`.

### Administrator na świeżej bazie

Ustaw zmienną środowiskową `ADMIN_PASSWORD` przed pierwszym uruchomieniem. Jeżeli konto `adamlubanskimc@gmail.com` już istnieje, serwer automatycznie nada mu uprawnienia administratora.

## Dane kolekcji

- `data/taxa.json` — kanoniczny katalog 46 taksonów.
- `data/variants.json` — konfiguracja 7 wariantów i ich współczynników.
- Maksymalna liczba kombinacji takson × wariant: 322.

## Ważne

Projekt nie zawiera `node_modules` ani pliku bazy użytkowników. `npm install` odtwarza zależności na podstawie `package-lock.json`, a SQLite tworzy bazę przy pierwszym uruchomieniu.
