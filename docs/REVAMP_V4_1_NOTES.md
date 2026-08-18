# Dinocademy — Revamp v4.1.0

## Kierunek wizualny

Cały interfejs został ujednolicony wokół języka wizualnego encyklopedii: cyfrowy atlas / notatnik terenowy / muzealna baza badawcza. Zredukowano przypadkowe duże promienie narożników, „card soup”, ozdobne szeryfy i generyczne efekty. Główna hierarchia opiera się na cienkich liniach, siatce, indeksach, metadanych, dużej typografii bezszeryfowej oraz kontrolowanej asymetrii.

## Strona główna

- nowy pełnoekranowy hero z animowanymi warstwami geologicznymi, cząstkami i skanem okazu;
- poprawiona karta Tyrannosaurus rex — obraz 640×640 z przezroczystością jest renderowany przez `object-fit: contain`, bez obcinania sylwetki;
- notatka T. rex otwiera się przyciskiem, nie chaotycznym hoverem;
- usunięty tekst „przewiń przez warstwy czasu”;
- usunięty generyczny automatyczny ticker tekstowy; zastąpił go panel notatek terenowych z animowanym wskaźnikiem głębokości;
- interaktywny panel rodzajów dowodów, oś czasu mezozoiku, prezentacja wariantów kolekcjonerskich, mini-quiz i nawigacja do głównych modułów;
- animacje wykorzystują głównie `transform` i `opacity`; `prefers-reduced-motion` wyłącza ruch nieistotny.

## Header i nawigacja

- jeden header na wszystkich głównych podstronach;
- przywrócone oryginalne wektorowe logo dinozaura;
- usunięte pseudo-logo z literą `D` również ze starego arkusza `ui-extra.css`;
- pełny zestaw: Kursy, Encyklopedia, Gry, Forum, Wykluwarnia, Ranking, Pro;
- spójna nawigacja mobilna;
- stan logowania pobierany przez `/api/me` i widoczny w headerze;
- administrator dostaje skrót do panelu Admin.

## Motywy

Panel motywów w headerze działa globalnie i zapisuje wybór w `localStorage`.
Dostępne warianty:
- Atlas — niebiesko-szary;
- Teren — zielony;
- Archiwum — bordowo-grafitowy;
- Noc — ciemny.

Naprawiono wcześniejszą niezgodność nazw `teren/archiwum/noc` z wartościami CSS `field/archive/night`. Stare wartości zapisane w przeglądarce są mapowane automatycznie.

## Logowanie / wykluwarnia / admin

Przyczyną błędu wykluwarni był brak nagłówka `X-Session-Token` w jej własnym helperze API. `hatchery.js` odczytuje teraz ten sam `dinocademy-token`, który zapisuje logowanie, i wysyła token do backendu. Ten sam problem usunięto z `admin.js`.

## Wykluwarnia i kolekcja

Zachowano funkcjonalność v3:
- 46 taksonów z encyklopedii;
- 7 wariantów kolekcjonerskich = 322 możliwe karty;
- poziom każdej karty 1–100;
- duplikaty rozwijają konkretny wariant;
- poziomy kart zasilają globalny mnożnik XP z uwzględnieniem rzadkości i wariantu;
- osobne animacje Shiny / Fossil Glow / Bio / Tech / Cryo / Primal.

Warstwa wizualna wykluwalni została dopasowana do encyklopedii: mniej zaokrągleń, wyraźniejsze linie, lżejsze cienie, precyzyjniejsze stany hover.

## Gra mapowa

Pierwsze kliknięcie blokuje rundę. Po błędnej odpowiedzi:
- wynik tej rundy = 0;
- wszystkie pinezki zostają zablokowane;
- poprawna lokalizacja jest pokazana informacyjnie;
- po ok. 1 s gra automatycznie przechodzi do kolejnego taksonu.

Nie można już kliknąć błędnie, a następnie poprawnie i odebrać punktów.

## Ranking

Zachowane i wystylizowane kategorie sortowania:
- Level;
- XP;
- najlepszy wynik;
- suma punktów;
- kolekcja;
- kompletność;
- Shiny;
- mutacje;
- Epic + Legendary;
- średni level dino;
- maksymalny level dino;
- mnożnik XP.

## Admin

Dla `adamlubanskimc@gmail.com` działa panel administratora z:
- wyszukiwaniem użytkownika;
- presetami +100 / +1K / +10K XP;
- własną liczbą XP;
- audit logiem operacji.

## Audyt przed spakowaniem

Wykonane kontrole:
- wszystkie pliki JavaScript przechodzą `node --check`;
- wszystkie lokalne assety wskazywane przez HTML/CSS istnieją;
- wszystkie 46 obrazów taksonów istnieje;
- 46 identyfikatorów taksonów oraz 7 identyfikatorów wariantów jest unikalnych;
- wszystkie główne HTML mają dokładnie jeden wspólny `site-shell.css` i `site-shell.js`;
- wszystkie główne strony mają pełny header, 7 pozycji nawigacji i wektorowe logo;
- strony logowania/rejestracji również używają wektorowego logo;
- brak pseudo-logo `D`, Playfair Display i Georgia;
- arkusze CSS mają zbilansowane nawiasy klamrowe;
- usunięto wskazany tekst ze strony głównej;
- wszystkie skrypty wymagające sesji mają obsługę `X-Session-Token`.

W środowisku generowania paczki nie było możliwe pobranie zależności npm z rejestru (brak cache / ograniczenie sieci), dlatego nie wykonano pełnego uruchomienia backendu z `npm start`. Kod backendu przeszedł walidację składni, a `package.json` i `package-lock.json` są kompletne.
