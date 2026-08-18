# Dinocademy — wdrożenie Node.js + Express + SQLite

## Lokalnie

```bash
npm install
npm start
```

Domyślnie serwer działa pod `http://localhost:3000`.

## Administrator

Konto administratora jest przypisane do `adamlubanskimc@gmail.com`.

- Jeśli użytkownik o tym adresie już istnieje, backend nada mu flagę administratora.
- Na świeżej bazie konto administratora zostanie utworzone tylko wtedy, gdy przed pierwszym uruchomieniem ustawisz zmienną środowiskową `ADMIN_PASSWORD`.
- Hasło administratora nie jest zapisane w repozytorium.

Przykład PowerShell:

```powershell
$env:ADMIN_PASSWORD="TU_WSTAW_SILNE_HASLO"
npm start
```

## Struktura

- `server.js` — backend Express + SQLite i API;
- `package.json` / `package-lock.json` — zależności;
- `public/` — frontend;
- `data/taxa.json` — katalog taksonów;
- `data/variants.json` — warianty kolekcjonerskie;
- `data.db` — tworzona automatycznie baza użytkowników (nie jest częścią repozytorium).

## Hosting

Aplikacja korzysta z `process.env.PORT`. Dla hostingu produkcyjnego baza SQLite musi znajdować się na trwałym woluminie; ścieżkę można ustawić przez `DATABASE_PATH`.

Zmienne środowiskowe:

- `PORT` — port HTTP, domyślnie 3000;
- `DATABASE_PATH` — ścieżka do SQLite, domyślnie `./data.db`;
- `ADMIN_PASSWORD` — hasło użyte wyłącznie do utworzenia konta admina na świeżej bazie;
- `NODE_ENV=production` — włącza `secure` dla ciasteczka sesji.
