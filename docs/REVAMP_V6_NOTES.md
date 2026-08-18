# Dinocademy v6.0.0 — zmiany

## Encyklopedia
- Przywrócono warstwę wizualną z v4.1 (sprzed ujednolicenia v5).
- Zachowano wspólny dynamiczny header z pełną nawigacją i motywami.
- `style.css`, `site-shell.css` i arkusze encyklopedii są identyczne z bazą v4.1; strona nie ładuje `cohesion-v5.css`.

## Plan Pro
- Przebudowano HTML i layout od zera, usuwając konfliktujące arkusze starszych generacji.
- Dodano czytelny hero, podsumowanie zawartości, porównanie Free/Pro i sekcję statusu konta.
- Poprawiono informacje o kolekcji do 46 taksonów × 7 wariantów = 322 karty.
- `pro.js` montuje status planu do dedykowanego `#pro-status-slot`.

## Rejestracja
- Przebudowano layout i formularz, aby działał poprawnie na desktopie i urządzeniach mobilnych.
- Usunięto konflikt `dinocademy-v3.css` + `revamp.css` z nową warstwą.
- Zachowano dotychczasową logikę rejestracji, wybór kraju i live validation hasła.
- Backend wymaga teraz tego samego co frontend: min. 8 znaków, litera i cyfra.

## Strona główna
- Zachowano v5 i dopracowano ją zamiast robić kolejny redesign.
- Dodano interaktywną oś Trias → Jura → Kreda z subtelnym ciągłym skanem.
- Zaktualizowano komunikację systemu progresji do nowego mocniejszego mnożnika.

## Nowy model mnożników kart
Każda posiadana karta ma własny mnożnik zależny od:
1. rzadkości,
2. poziomu 1–100,
3. wariantu.

Bazowe mnożniki normalnego wariantu na Lv1 → Lv100:
- Pospolity: ×1.05 → ×1.65
- Niezwykły: ×1.10 → ×1.95
- Rzadki: ×1.20 → ×2.35
- Epicki: ×1.35 → ×2.85
- Legendarny: ×1.50 → ×3.50

Warianty wzmacniają bonus ponad ×1:
- Standard ×1.00
- Shiny ×1.15
- Fosylna poświata ×1.22
- Mutacja bio ×1.30
- Mutacja cyber ×1.38
- Cryo ×1.42
- Primal ×1.50

Przykład: Legendarny Primal na Lv100 ma mnożnik karty około ×4.75.
Globalny mnożnik kolekcji sumuje bonusy wszystkich posiadanych kart i ma bezpieczny limit ×50.

## Wykluwarnia
- Na każdej karcie jest widoczny jej indywidualny mnożnik.
- Modal szczegółów pokazuje mnożnik karty.
- Animacja wyklucia pokazuje osobno mnożnik nowej karty i globalny mnożnik kolekcji.
- Zachowano zasadę v5: każde zdobyte XP trafia jednocześnie do wszystkich niewyklutych jaj.
