# Dinocademy v5.0.0 — spójny interfejs i poprawki funkcjonalne

## Zakres tej wersji

- Cały interfejs został ujednolicony z jasnym stylem profilu/encyklopedii: jasnoszare tło, białe karty, niebieskie akcenty, delikatne obramowania i cienie, zaokrąglenia oraz wyłącznie fonty bezszeryfowe.
- Wspólny `site-shell.js` jest źródłem prawdy dla headera. Każda strona ma ten sam zestaw głównych zakładek: Kursy, Encyklopedia, Gry, Forum, Wykluwarnia, Ranking, Plan Pro oraz — dla administratora — Panel admina.
- Przywrócono i zachowano wektorowe logo dinozaura; ten sam znak jest używany również w stopkach.
- Panel `Aa` nadal przełącza motywy Atlas, Teren, Archiwum i Noc, zachowując tę samą morfologię komponentów.
- Strona główna została przebudowana w tym samym systemie wizualnym. Zawiera lekkie, ciągłe animacje, ale treść nie zależy od działania animacji i nigdy nie jest domyślnie niewidoczna bez JavaScript.
- Poprawiono strukturę CSS wykluwalni, rankingu i panelu admina; ich siatki i karty nie rozciągają się nieprawidłowo.

## Wykluwarnia

- Nie istnieje już pojęcie jednego aktywnego jaja.
- Każde zdobyte finalne XP jest równolegle naliczane do KAŻDEGO niewyklutego jaja użytkownika, niezależnie dla każdego jaja i z ograniczeniem do jego progu inkubacji.
- Dotyczy XP z lekcji, gier i ręcznego XP przyznanego przez administratora.
- Frontend pokazuje przy każdym jaju etykietę `WSPÓLNY XP` i nie ma przycisku ustawiania aktywnego jaja.
- Usunięto przestarzały endpoint `/api/hatchery/activate` oraz pomocniczą logikę wyboru aktywnego jaja.

## Forum

Naprawiono kontrakt danych między frontendem i backendem:

- kategorie zwracają `id` + `label`,
- wątki zwracają `categoryId`, `authorId`, `authorName`, `createdAt`, `replyCount`, `authorIsAdmin`,
- odpowiedzi zwracają analogiczne pola w camelCase,
- liczba odpowiedzi jest liczona po stronie backendu,
- tworzenie wątku waliduje kategorię,
- dodanie odpowiedzi sprawdza istnienie nieusuniętego wątku,
- zachowano reguły kasowania przez autora lub administratora.

## Audyt wykonany przed spakowaniem

- `node --check` dla wszystkich plików JavaScript frontendu i `server.js`,
- sprawdzenie wszystkich lokalnych referencji CSS/JS/IMG w 17 plikach HTML — brak brakujących plików,
- sprawdzenie wspólnego headera na wszystkich 17 stronach z symulowaną sesją administratora,
- test renderu i interakcji forum z mockowanym API — lista wątków i modal działają bez błędów JS,
- test renderu wykluwalni z mockowanym API — trzy jaja równolegle oznaczone `WSPÓLNY XP`, prawidłowa 4-kolumnowa siatka kolekcji,
- test renderu rankingu — 12 kategorii sortowania i tabela,
- test renderu panelu admina — użytkownicy i audit log,
- test strony głównej — wszystkie sekcje stają się widoczne również dzięki awaryjnemu mechanizmowi reveal.

## Uruchomienie

```bash
npm install
npm start
```

Domyślny adres: `http://localhost:3000`.

Pełnego startu backendu nie wykonano w środowisku przygotowującym paczkę, ponieważ rejestr npm był niedostępny i zależności serwerowe nie mogły zostać pobrane. Testy kodu, statyczne i renderowe frontendu zostały wykonane niezależnie od tego ograniczenia.
