# Dinocademy - serwer Node.js + Express + SQLite

Prawdziwy, prosty serwer backendowy gotowy do wrzucenia na hosting.
Baza danych to pojedynczy plik SQLite - bez zewnetrznej uslugi bazodanowej.

## Uruchomienie lokalne

npm install
npm start

Serwer wystartuje na http://localhost:3000

## Konto administratora (tworzone automatycznie przy pierwszym starcie)
- e-mail: adamlubanskimc@gmail.com
- haslo: Adamlubixroblox123

Po zalogowaniu tym kontem w menu nawigacji pojawi sie link "Panel admina"
ze statystykami, zarzadzaniem uzytkownikami/planem Pro i moderacja forum.

## Struktura projektu
server.js       - caly backend: Express + SQLite + wszystkie endpointy /api/...
package.json    - zaleznosci (Express, better-sqlite3, bcryptjs, cors, uuid)
public/         - caly frontend (HTML, CSS, JS, obrazy)
data.db         - baza SQLite (tworzy sie automatycznie przy pierwszym starcie)

## Osadzenie w internecie

### Render.com (zalecane, darmowy plan wystarczy)
1. Wrzuc ten folder do repozytorium GitHub.
2. Na Render.com: New -> Web Service -> polacz repozytorium.
3. Render wykryje dolaczony plik render.yaml i skonfiguruje wszystko
   automatycznie (dysk trwaly pod baze SQLite, komenda startowa npm start).
4. Po chwili strona bedzie dostepna pod adresem https://twoja-nazwa.onrender.com

Bez render.yaml wystarczy recznie ustawic:
- Build command: npm install
- Start command: npm start
- Persistent Disk zamontowany w /var/data
- Zmienna srodowiskowa DATABASE_PATH=/var/data/dinocademy.db

### Railway.app / Fly.io / dowolny VPS
Identyczna zasada: npm install i npm start, port z process.env.PORT
(juz obslugiwany w kodzie), oraz trwaly wolumin dla pliku data.db.

### Uwaga o trwalosci danych
Jesli hosting nie oferuje trwalego dysku, plik data.db zniknie po restarcie
serwera. Dla produkcyjnego uzytku warto rozwazyc zewnetrzna baze (np. Turso).

## Zmienne srodowiskowe
- PORT - port serwera (domyslnie 3000)
- DATABASE_PATH - sciezka do pliku bazy (domyslnie ./data.db)
- NODE_ENV=production - wlacza bezpieczne ciasteczka
