const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data.db');

// Initialize database
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    country TEXT DEFAULT 'PL',
    avatar TEXT DEFAULT 'trex',
    xp INTEGER DEFAULT 0,
    is_pro INTEGER DEFAULT 0,
    pro_since TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    expires_at TEXT DEFAULT (datetime('now', '+30 days')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS lesson_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    lesson_id TEXT NOT NULL,
    completed_at TEXT DEFAULT (datetime('now')),
    UNIQUE(user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS game_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    player_name TEXT NOT NULL,
    game TEXT NOT NULL,
    score INTEGER NOT NULL,
    xp_awarded INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    taxon_id TEXT NOT NULL,
    UNIQUE(user_id, taxon_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS eggs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    rarity TEXT NOT NULL,
    warmth INTEGER DEFAULT 0,
    required INTEGER NOT NULL,
    hatched INTEGER DEFAULT 0,
    from_level INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS collection (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    dino_id TEXT NOT NULL,
    rarity TEXT NOT NULL,
    nickname TEXT,
    hatched_at TEXT DEFAULT (datetime('now')),
    UNIQUE(user_id, dino_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// ===== MIGRACJE (bezpieczne dla istniejących baz) =====
// Dodaje brakujące kolumny bez usuwania danych użytkowników.
(function migrate() {
  const cols = db.prepare('PRAGMA table_info(users)').all().map(c => c.name);
  const add = (name, ddl) => {
    if (!cols.includes(name)) {
      db.exec(`ALTER TABLE users ADD COLUMN ${name} ${ddl}`);
      console.log(`[migracja] users.${name} dodane`);
    }
  };
  add('is_pro', 'INTEGER DEFAULT 0');
  add('pro_since', 'TEXT');
})();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html']
}));

// Auth middleware
function computeLevel(xp) {
  // Level thresholds: each level requires more XP
  // L1: 0, L2: 100, L3: 250, L4: 500, L5: 1000, L6: 2000, L7: 3500, etc.
  const thresholds = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000, 15000, 20000, 26000, 33000, 41000, 50000];
  let level = 1;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i + 1;
  }
  if (xp >= 50000) level = Math.floor((xp - 50000) / 15000) + 16;
  return level;
}

const LEVEL_TITLES = {
  1: 'Nowicjusz', 2: 'Odkrywca', 3: 'Badacz', 4: 'Kolekcjoner', 5: 'Analityk',
  6: 'Eksplorator', 7: 'Łowca Skamieniałości', 8: 'Specjalista', 9: 'Ekspert',
  10: 'Mistrz', 11: 'Architekt', 12: 'Weteran', 13: 'Savant', 14: 'Autorytet', 15: 'Lider'
};

function auth(required = true) {
  return (req, res, next) => {
    const token = req.cookies?.session || req.headers['x-session-token'];
    if (!token) {
      if (required) return res.status(401).json({ error: 'Nie zalogowano' });
      req.user = null;
      return next();
    }
    const session = db.prepare('SELECT s.*, u.name, u.email, u.country, u.avatar, u.xp, u.is_pro, u.pro_since FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > datetime(\'now\')').get(token);
    if (!session) {
      if (required) return res.status(401).json({ error: 'Sesja wygasła' });
      req.user = null;
      return next();
    }
    req.user = { id: session.user_id, name: session.name, email: session.email, country: session.country, avatar: session.avatar, xp: session.xp, is_pro: session.is_pro, pro_since: session.pro_since };
    req.sessionToken = token;
    next();
  };
}

// ===== AUTH ROUTES =====

// Register
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Wypełnij wszystkie pola' });
  if (password.length < 4) return res.status(400).json({ error: 'Hasło musi mieć min. 4 znaki' });

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (existing) return res.status(409).json({ error: 'Konto z tym e-mailem już istnieje' });

  const hash = bcrypt.hashSync(password, 10);
  const country = req.body.country || 'PL';
  const result = db.prepare('INSERT INTO users (name, email, password_hash, country) VALUES (?, ?, ?, ?)').run(name, email.toLowerCase(), hash, country);
  
  const token = uuidv4();
  db.prepare('INSERT INTO sessions (token, user_id) VALUES (?, ?)').run(token, result.lastInsertRowid);
  
  res.cookie('session', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'lax' });
  res.json({ ok: true, token, user: { id: result.lastInsertRowid, name, email, country, xp: 0, level: 1 } });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Wypełnij wszystkie pola' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
  if (!user) return res.status(401).json({ error: 'Nieprawidłowy e-mail lub hasło' });
  
  if (!bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Nieprawidłowy e-mail lub hasło' });
  }

  const token = uuidv4();
  db.prepare('INSERT INTO sessions (token, user_id) VALUES (?, ?)').run(token, user.id);
  
  res.cookie('session', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'lax' });
  res.json({ ok: true, token, user: { id: user.id, name: user.name, email: user.email, country: user.country, avatar: user.avatar, xp: user.xp, level: computeLevel(user.xp) } });
});

// Logout
app.post('/api/logout', (req, res) => {
  const token = req.cookies?.session;
  if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  res.clearCookie('session');
  res.json({ ok: true });
});

// Current user
app.get('/api/me', auth(false), (req, res) => {
  if (!req.user) return res.json({ user: null });
  const xp = req.user.xp || 0;
  res.json({ user: { ...req.user, isPro: !!req.user.is_pro, level: computeLevel(xp), levelTitle: LEVEL_TITLES[computeLevel(xp)] || 'Mistrz' } });
});

// ===== LESSON PROGRESS =====

app.get('/api/progress', auth(), (req, res) => {
  const rows = db.prepare('SELECT lesson_id FROM lesson_progress WHERE user_id = ?').all(req.user.id);
  res.json({ lessons: rows.map(r => r.lesson_id) });
});

app.post('/api/progress', auth(), (req, res) => {
  const { lesson_id } = req.body;
  if (!lesson_id) return res.status(400).json({ error: 'Brak lesson_id' });
  db.prepare('INSERT OR IGNORE INTO lesson_progress (user_id, lesson_id) VALUES (?, ?)').run(req.user.id, lesson_id);
  res.json({ ok: true });
});

// ===== GAME SCORES =====

app.post('/api/scores', auth(false), (req, res) => {
  if (!requirePro(req, res)) return;
  const { game, score } = req.body;
  const playerName = req.user ? req.user.name : 'Gość';
  const userId = req.user ? req.user.id : null;
  const xpAward = Math.floor(score / 10);
  db.prepare('INSERT INTO game_scores (user_id, player_name, game, score, xp_awarded) VALUES (?, ?, ?, ?, ?)').run(userId, playerName, game, score, xpAward);
  if (userId) {
    db.prepare('UPDATE users SET xp = xp + ? WHERE id = ?').run(xpAward, userId);
    // Ogrzewaj wszystkie inkubowane jaja zdobytym XP
    if (xpAward > 0) {
      db.prepare('UPDATE eggs SET warmth = MIN(warmth + ?, required) WHERE user_id = ? AND hatched = 0').run(xpAward, userId);
    }
  }
  res.json({ ok: true, xpAwarded: xpAward });
});

app.get('/api/scores', (req, res) => {
  // Get best score per player+game combination
  const rows = db.prepare(`
    SELECT player_name, game, MAX(score) as score, MIN(created_at) as first_played, MAX(created_at) as last_played
    FROM game_scores 
    GROUP BY player_name, game
    ORDER BY score DESC
    LIMIT 50
  `).all();
  res.json({ scores: rows });
});

app.delete('/api/scores', auth(), (req, res) => {
  // Only admins (or own scores) can clear - for now clear all
  db.prepare('DELETE FROM game_scores').run();
  res.json({ ok: true });
});

// ===== NOTES =====

app.get('/api/notes', auth(), (req, res) => {
  const rows = db.prepare('SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  res.json({ notes: rows });
});

app.post('/api/notes', auth(), (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'Brak treści' });
  const result = db.prepare('INSERT INTO notes (user_id, text) VALUES (?, ?)').run(req.user.id, text.trim());
  const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(result.lastInsertRowid);
  res.json({ ok: true, note });
});

app.delete('/api/notes/:id', auth(), (req, res) => {
  db.prepare('DELETE FROM notes WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ ok: true });
});

// ===== FAVORITES =====

app.get('/api/favorites', auth(), (req, res) => {
  const rows = db.prepare('SELECT taxon_id FROM favorites WHERE user_id = ?').all(req.user.id);
  res.json({ favorites: rows.map(r => r.taxon_id) });
});

app.post('/api/favorites', auth(), (req, res) => {
  const { taxon_id } = req.body;
  if (!taxon_id) return res.status(400).json({ error: 'Brak taxon_id' });
  db.prepare('INSERT OR IGNORE INTO favorites (user_id, taxon_id) VALUES (?, ?)').run(req.user.id, taxon_id);
  res.json({ ok: true });
});

app.delete('/api/favorites/:taxon_id', auth(), (req, res) => {
  db.prepare('DELETE FROM favorites WHERE user_id = ? AND taxon_id = ?').run(req.user.id, req.params.taxon_id);
  res.json({ ok: true });
});

app.post('/api/favorites/toggle', auth(), (req, res) => {
  const { taxon_id } = req.body;
  if (!taxon_id) return res.status(400).json({ error: 'Brak taxon_id' });
  const existing = db.prepare('SELECT id FROM favorites WHERE user_id = ? AND taxon_id = ?').get(req.user.id, taxon_id);
  if (existing) {
    db.prepare('DELETE FROM favorites WHERE id = ?').run(existing.id);
    res.json({ ok: true, active: false });
  } else {
    db.prepare('INSERT INTO favorites (user_id, taxon_id) VALUES (?, ?)').run(req.user.id, taxon_id);
    res.json({ ok: true, active: true });
  }
});

// ===== PROFILE ENDPOINTS =====

// Get profile
app.get('/api/profile', auth(), (req, res) => {
  const user = db.prepare('SELECT id, name, email, country, avatar, xp, is_pro, pro_since, created_at FROM users WHERE id = ?').get(req.user.id);
  const xp = user.xp || 0;
  const level = computeLevel(xp);
  const thresholds = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000, 15000, 20000, 26000, 33000, 41000, 50000];
  const nextThreshold = level < thresholds.length ? thresholds[level] : (50000 + (level - 15) * 15000);
  const prevThreshold = level > 1 ? thresholds[level - 1] : 0;
  const xpToNext = nextThreshold - xp;
  res.json({
    ...user,
    level,
    levelTitle: LEVEL_TITLES[level] || 'Mistrz',
    xpToNext,
    xpProgress: xp - prevThreshold,
    xpRange: nextThreshold - prevThreshold
  });
});

// Update country
app.post('/api/profile/country', auth(), (req, res) => {
  const { country } = req.body;
  if (!country) return res.status(400).json({ error: 'Brak kraju' });
  db.prepare('UPDATE users SET country = ? WHERE id = ?').run(country, req.user.id);
  res.json({ ok: true });
});

// Update avatar
app.post('/api/profile/avatar', auth(), (req, res) => {
  const { avatar } = req.body;
  if (!avatar) return res.status(400).json({ error: 'Brak avatara' });
  db.prepare('UPDATE users SET avatar = ? WHERE id = ?').run(avatar, req.user.id);
  res.json({ ok: true });
});

// Update name
app.post('/api/profile/name', auth(), (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Brak nazwy' });
  db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name, req.user.id);
  res.json({ ok: true });
});

// Update email
app.post('/api/profile/email', auth(), (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Brak danych' });
  const user = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user.id);
  if (!bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ error: 'Nieprawidłowe hasło' });
  const existing = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(email.toLowerCase(), req.user.id);
  if (existing) return res.status(409).json({ error: 'E-mail już używany' });
  db.prepare('UPDATE users SET email = ? WHERE id = ?').run(email.toLowerCase(), req.user.id);
  res.json({ ok: true });
});

// Update password
app.post('/api/profile/password', auth(), (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Brak danych' });
  if (newPassword.length < 8) return res.status(400).json({ error: 'Hasło min. 8 znaków' });
  const user = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user.id);
  if (!bcrypt.compareSync(currentPassword, user.password_hash)) return res.status(401).json({ error: 'Nieprawidłowe hasło' });
  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, req.user.id);
  res.json({ ok: true });
});

// Recent activity
app.get('/api/activity', auth(), (req, res) => {
  const scores = db.prepare('SELECT game, score, xp_awarded, created_at FROM game_scores WHERE user_id = ? ORDER BY created_at DESC LIMIT 10').all(req.user.id);
  const lessons = db.prepare('SELECT lesson_id, completed_at as created_at FROM lesson_progress WHERE user_id = ? ORDER BY completed_at DESC LIMIT 10').all(req.user.id);
  const activity = [
    ...scores.map(s => ({ type: 'game', label: s.game, xp: s.xp_awarded, score: s.score, date: s.created_at })),
    ...lessons.map(l => ({ type: 'lesson', label: l.lesson_id, xp: 50, date: l.created_at }))
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 15);
  res.json({ activity });
});

// ===== PLAN PRO =====

// Aktywacja / dezaktywacja planu Pro (w produkcji podmień na webhook operatora płatności)
app.post('/api/pro/activate', auth(), (req, res) => {
  db.prepare("UPDATE users SET is_pro = 1, pro_since = datetime('now') WHERE id = ?").run(req.user.id);
  res.json({ ok: true, isPro: true });
});

app.post('/api/pro/cancel', auth(), (req, res) => {
  db.prepare('UPDATE users SET is_pro = 0 WHERE id = ?').run(req.user.id);
  res.json({ ok: true, isPro: false });
});

// Bramka serwerowa: bez Pro nie zapisujemy wyników gier
function requirePro(req, res) {
  if (!req.user || !req.user.is_pro) {
    res.status(402).json({ error: 'Gry są dostępne w planie Pro.', needsPro: true });
    return false;
  }
  return true;
}

// ===== WYKLUWARNIA (EGGS + COLLECTION) =====

const RARITY = {
  common:  { label: 'Pospolite',  tier: 1, required: 120, color: '#7d8a97' },
  rare:    { label: 'Rzadkie',    tier: 2, required: 260, color: '#2f7fbf' },
  epic:    { label: 'Wyjątkowe',  tier: 3, required: 480, color: '#8b46c9' }
};

// Pule dinozaurów po rzadkości (id z DINO_DATA.dino.e)
const DINO_POOLS = {
  common: ['trex', 'triceratops', 'stegosaurus', 'diplodocus', 'velociraptor', 'ankylosaurus'],
  rare:   ['spinosaurus', 'therizinosaurus', 'anzu', 'concavenator', 'qianzhousaurus', 'struthiosaurus'],
  epic:   ['yi', 'linhenykus', 'natovenator', 'bajadasaurus']
};

function rollRarity(level) {
  // Wyższy poziom = lepsze szanse na rzadkie jaja
  const epicChance = Math.min(0.30, 0.04 + level * 0.02);
  const rareChance = Math.min(0.45, 0.20 + level * 0.015);
  const r = Math.random();
  if (r < epicChance) return 'epic';
  if (r < epicChance + rareChance) return 'rare';
  return 'common';
}

app.get('/api/hatchery', auth(), (req, res) => {
  const user = db.prepare('SELECT xp FROM users WHERE id = ?').get(req.user.id);
  const level = computeLevel(user.xp || 0);
  const eggs = db.prepare('SELECT id, rarity, warmth, required, from_level, created_at FROM eggs WHERE user_id = ? AND hatched = 0 ORDER BY id').all(req.user.id);
  const collection = db.prepare('SELECT dino_id, rarity, nickname, hatched_at FROM collection WHERE user_id = ? ORDER BY hatched_at DESC').all(req.user.id);
  const claimed = db.prepare('SELECT COUNT(*) AS c FROM eggs WHERE user_id = ?').get(req.user.id).c;
  const totalDinos = DINO_POOLS.common.length + DINO_POOLS.rare.length + DINO_POOLS.epic.length;
  res.json({
    level,
    xp: user.xp || 0,
    eggsAvailable: Math.max(0, level - claimed),
    eggs: eggs.map(e => ({ ...e, label: RARITY[e.rarity] ? RARITY[e.rarity].label : e.rarity, ready: e.warmth >= e.required })),
    collection,
    collected: collection.length,
    totalDinos,
    rarities: RARITY
  });
});

// Odbierz nowe jajo za poziom
app.post('/api/hatchery/egg', auth(), (req, res) => {
  const user = db.prepare('SELECT xp FROM users WHERE id = ?').get(req.user.id);
  const level = computeLevel(user.xp || 0);
  const claimed = db.prepare('SELECT COUNT(*) AS c FROM eggs WHERE user_id = ?').get(req.user.id).c;
  if (claimed >= level) {
    return res.status(400).json({ error: 'Brak dostępnych jaj. Zdobądź kolejny poziom.' });
  }
  const rarity = rollRarity(level);
  const info = RARITY[rarity];
  const r = db.prepare('INSERT INTO eggs (user_id, rarity, warmth, required, from_level) VALUES (?, ?, 0, ?, ?)')
    .run(req.user.id, rarity, info.required, level);
  res.json({ ok: true, egg: { id: r.lastInsertRowid, rarity, label: info.label, warmth: 0, required: info.required, ready: false } });
});

// Wyklucz gotowe jajo
app.post('/api/hatchery/hatch', auth(), (req, res) => {
  const eggId = req.body && req.body.eggId;
  if (!eggId) return res.status(400).json({ error: 'Brak jaja' });
  const egg = db.prepare('SELECT * FROM eggs WHERE id = ? AND user_id = ? AND hatched = 0').get(eggId, req.user.id);
  if (!egg) return res.status(404).json({ error: 'Nie znaleziono jaja' });
  if (egg.warmth < egg.required) {
    return res.status(400).json({ error: 'Jajo jeszcze nie jest gotowe. Zdobądź ' + (egg.required - egg.warmth) + ' XP.' });
  }
  const owned = db.prepare('SELECT dino_id FROM collection WHERE user_id = ?').all(req.user.id).map(x => x.dino_id);
  // Preferuj nowego dinozaura z puli tej rzadkości, potem z innych pul
  const order = egg.rarity === 'epic' ? ['epic', 'rare', 'common'] : egg.rarity === 'rare' ? ['rare', 'epic', 'common'] : ['common', 'rare', 'epic'];
  let chosen = null, chosenRarity = egg.rarity, duplicate = false;
  for (const key of order) {
    const fresh = DINO_POOLS[key].filter(id => owned.indexOf(id) === -1);
    if (fresh.length) { chosen = fresh[Math.floor(Math.random() * fresh.length)]; chosenRarity = key; break; }
  }
  if (!chosen) {
    // Wszystko zebrane — duplikat zamieniamy na XP
    duplicate = true;
    const bonus = Math.round(egg.required / 2);
    db.prepare('UPDATE users SET xp = xp + ? WHERE id = ?').run(bonus, req.user.id);
    db.prepare('UPDATE eggs SET hatched = 1 WHERE id = ?').run(egg.id);
    return res.json({ ok: true, duplicate: true, xpBonus: bonus, message: 'Masz już wszystkie dinozaury — jajo zamienione na ' + bonus + ' XP.' });
  }
  db.prepare('INSERT OR IGNORE INTO collection (user_id, dino_id, rarity) VALUES (?, ?, ?)').run(req.user.id, chosen, chosenRarity);
  db.prepare('UPDATE eggs SET hatched = 1 WHERE id = ?').run(egg.id);
  res.json({ ok: true, dinoId: chosen, rarity: chosenRarity, duplicate });
});

// Nadaj imię dinozaurowi w kolekcji
app.post('/api/hatchery/nickname', auth(), (req, res) => {
  const { dinoId, nickname } = req.body || {};
  if (!dinoId) return res.status(400).json({ error: 'Brak dinozaura' });
  const clean = String(nickname || '').slice(0, 30);
  const r = db.prepare('UPDATE collection SET nickname = ? WHERE user_id = ? AND dino_id = ?').run(clean, req.user.id, dinoId);
  if (!r.changes) return res.status(404).json({ error: 'Nie masz tego dinozaura' });
  res.json({ ok: true });
});

// SPA fallback for HTML routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  const filePath = path.join(__dirname, 'public', req.path);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return res.sendFile(filePath);
  // Try .html extension
  const htmlPath = path.join(__dirname, 'public', req.path + '.html');
  if (fs.existsSync(htmlPath)) return res.sendFile(htmlPath);
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dinocademy server running on port ${PORT}`);
});
