const express = require('express');
const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  console.error('[database] Brak TURSO_DATABASE_URL lub TURSO_AUTH_TOKEN w zmiennych środowiskowych.');
  process.exit(1);
}

const db = createClient({ url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN });
console.log(`[database] Turso: ${TURSO_DATABASE_URL}`);

async function query(sql, args = []) { return db.execute({ sql, args }); }
async function one(sql, args = []) { const result = await query(sql, args); return result.rows[0] || null; }
async function all(sql, args = []) { const result = await query(sql, args); return result.rows; }
function asObject(row) { return row ? Object.fromEntries(Object.entries(row)) : null; }
function asObjects(rows) { return rows.map(asObject); }
function utcNowSql() { return new Date().toISOString().replace('T', ' ').replace('Z', ''); }
function plusDaysSql(days) { return new Date(Date.now() + days * 86400000).toISOString().replace('T', ' ').replace('Z', ''); }
function dbDate(value) { return value ? String(value).replace('T', ' ').replace('Z', '') : utcNowSql(); }

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000, 15000, 20000, 26000, 33000, 41000, 50000];
const LEVEL_TITLES = { 1:'Nowicjusz', 2:'Odkrywca', 3:'Badacz', 4:'Kolekcjoner', 5:'Analityk', 6:'Eksplorator', 7:'Łowca skamieniałości', 8:'Specjalista', 9:'Ekspert', 10:'Mistrz', 11:'Architekt', 12:'Weteran', 13:'Savant', 14:'Autorytet', 15:'Lider' };
function computeLevel(xp) { let level = 1; for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) if (Number(xp) >= LEVEL_THRESHOLDS[i]) level = i + 1; return Number(xp) >= 50000 ? Math.floor((Number(xp) - 50000) / 15000) + 16 : level; }
function isoDay(offset = 0) { const date = new Date(); date.setUTCHours(0, 0, 0, 0); date.setUTCDate(date.getUTCDate() + offset); return date.toISOString().slice(0, 10); }

async function initializeDatabase() {
  const schema = [
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, country TEXT DEFAULT 'PL', avatar TEXT DEFAULT 'trex', xp INTEGER DEFAULT 0, is_pro INTEGER DEFAULT 0, pro_since TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP, expires_at TEXT NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS lesson_progress (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, lesson_id TEXT NOT NULL, completed_at TEXT DEFAULT CURRENT_TIMESTAMP, UNIQUE(user_id, lesson_id))`,
    `CREATE TABLE IF NOT EXISTS game_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, player_name TEXT NOT NULL, game TEXT NOT NULL, score INTEGER NOT NULL, xp_awarded INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, text TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, taxon_id TEXT NOT NULL, UNIQUE(user_id, taxon_id))`,
    `CREATE TABLE IF NOT EXISTS eggs (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, rarity TEXT NOT NULL, warmth INTEGER DEFAULT 0, required INTEGER NOT NULL, hatched INTEGER DEFAULT 0, from_level INTEGER NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS collection (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, dino_id TEXT NOT NULL, rarity TEXT NOT NULL, nickname TEXT, hatched_at TEXT DEFAULT CURRENT_TIMESTAMP, UNIQUE(user_id, dino_id))`,
    `CREATE TABLE IF NOT EXISTS study_days (user_id INTEGER NOT NULL, study_date TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(user_id, study_date))`
  ];
  for (const sql of schema) await query(sql);
  console.log('[database] Turso schema ready');
}

async function markStudyDay(userId) { await query('INSERT OR IGNORE INTO study_days (user_id, study_date) VALUES (?, ?)', [userId, isoDay()]); }
async function streakFor(userId) {
  const rows = asObjects(await all('SELECT study_date FROM study_days WHERE user_id = ? AND study_date >= ?', [userId, isoDay(-365)]));
  const dates = new Set(rows.map(row => String(row.study_date)));
  let count = 0;
  for (let offset = 0; ; offset--) { if (!dates.has(isoDay(offset))) break; count++; }
  const mondayOffset = -((new Date().getUTCDay() + 6) % 7);
  const week = Array.from({ length: 7 }, (_, index) => dates.has(isoDay(mondayOffset + index)) ? index : null).filter(Number.isInteger);
  return { count, studiedToday: dates.has(isoDay()), week };
}

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

function auth(required = true) {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.session || req.headers['x-session-token'];
      if (!token) { if (required) return res.status(401).json({ error: 'Nie zalogowano' }); req.user = null; return next(); }
      const row = asObject(await one(`SELECT s.user_id,u.name,u.email,u.country,u.avatar,u.xp,u.is_pro,u.pro_since FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires_at>?`, [token, utcNowSql()]));
      if (!row) { if (required) return res.status(401).json({ error: 'Sesja wygasła' }); req.user = null; return next(); }
      req.user = row;
      next();
    } catch (error) { next(error); }
  };
}
function cookieOptions() { return { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' }; }

app.post('/api/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'Wypełnij wszystkie pola' });
    if (String(password).length < 4) return res.status(400).json({ error: 'Hasło musi mieć min. 4 znaki' });
    const normalizedEmail = String(email).trim().toLowerCase();
    if (await one('SELECT id FROM users WHERE email = ?', [normalizedEmail])) return res.status(409).json({ error: 'Konto z tym e-mailem już istnieje' });
    const result = await query('INSERT INTO users (name, email, password_hash, country) VALUES (?, ?, ?, ?)', [String(name).trim().slice(0, 40), normalizedEmail, bcrypt.hashSync(password, 10), req.body.country || 'PL']);
    const id = Number(result.lastInsertRowid);
    const token = uuidv4(); await query('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)', [token, id, plusDaysSql(30)]);
    res.cookie('session', token, cookieOptions());
    res.json({ ok: true, token, user: { id, name, email: normalizedEmail, country: req.body.country || 'PL', xp: 0, level: 1 } });
  } catch (error) { next(error); }
});

app.post('/api/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Wypełnij wszystkie pola' });
    const user = asObject(await one('SELECT * FROM users WHERE email = ?', [String(email).trim().toLowerCase()]));
    if (!user || !bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ error: 'Nieprawidłowy e-mail lub hasło' });
    const token = uuidv4(); await query('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)', [token, user.id, plusDaysSql(30)]);
    res.cookie('session', token, cookieOptions());
    res.json({ ok: true, token, user: { id: user.id, name: user.name, email: user.email, country: user.country, avatar: user.avatar, xp: user.xp, level: computeLevel(user.xp) } });
  } catch (error) { next(error); }
});

app.post('/api/logout', auth(false), async (req, res, next) => { try { const token = req.cookies?.session || req.headers['x-session-token']; if (token) await query('DELETE FROM sessions WHERE token = ?', [token]); res.clearCookie('session'); res.json({ ok: true }); } catch (error) { next(error); } });
app.get('/api/me', auth(false), (req, res) => { if (!req.user) return res.json({ user: null }); const level = computeLevel(req.user.xp || 0); res.json({ user: { ...req.user, isPro: !!req.user.is_pro, level, levelTitle: LEVEL_TITLES[level] || 'Mistrz' } }); });

app.get('/api/progress', auth(), async (req, res, next) => { try { const rows = asObjects(await all('SELECT lesson_id FROM lesson_progress WHERE user_id = ?', [req.user.user_id])); res.json({ lessons: rows.map(row => row.lesson_id) }); } catch (error) { next(error); } });
app.post('/api/progress', auth(), async (req, res, next) => { try { const lessonId = req.body?.lesson_id; if (!lessonId) return res.status(400).json({ error: 'Brak lesson_id' }); const result = await query('INSERT OR IGNORE INTO lesson_progress (user_id, lesson_id) VALUES (?, ?)', [req.user.user_id, lessonId]); if (Number(result.rowsAffected) > 0) await markStudyDay(req.user.user_id); res.json({ ok: true }); } catch (error) { next(error); } });

function requirePro(req, res) { if (!req.user || !Number(req.user.is_pro)) { res.status(402).json({ error: 'Gry są dostępne w planie Pro.', needsPro: true }); return false; } return true; }
app.post('/api/scores', auth(false), async (req, res, next) => { try { if (!requirePro(req, res)) return; const score = Math.max(0, Number(req.body?.score) || 0); const xp = Math.floor(score / 10); await query('INSERT INTO game_scores (user_id, player_name, game, score, xp_awarded) VALUES (?, ?, ?, ?, ?)', [req.user.user_id, req.user.name, String(req.body?.game || 'Gra'), score, xp]); await query('UPDATE users SET xp = xp + ? WHERE id = ?', [xp, req.user.user_id]); if (xp > 0) { await query('UPDATE eggs SET warmth = MIN(warmth + ?, required) WHERE user_id = ? AND hatched = 0', [xp, req.user.user_id]); await markStudyDay(req.user.user_id); } res.json({ ok: true, xpAwarded: xp }); } catch (error) { next(error); } });
app.get('/api/scores', async (req, res, next) => { try { res.json({ scores: asObjects(await all('SELECT player_name, game, MAX(score) score, MIN(created_at) first_played, MAX(created_at) last_played FROM game_scores GROUP BY player_name, game ORDER BY score DESC LIMIT 50')) }); } catch (error) { next(error); } });
app.delete('/api/scores', auth(), async (req, res, next) => { try { await query('DELETE FROM game_scores'); res.json({ ok: true }); } catch (error) { next(error); } });

app.get('/api/notes', auth(), async (req, res, next) => { try { res.json({ notes: asObjects(await all('SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC', [req.user.user_id])) }); } catch (error) { next(error); } });
app.post('/api/notes', auth(), async (req, res, next) => { try { const text = String(req.body?.text || '').trim(); if (!text) return res.status(400).json({ error: 'Brak treści' }); const result = await query('INSERT INTO notes (user_id, text) VALUES (?, ?)', [req.user.user_id, text]); res.json({ ok: true, note: asObject(await one('SELECT * FROM notes WHERE id = ?', [Number(result.lastInsertRowid)])) }); } catch (error) { next(error); } });
app.delete('/api/notes/:id', auth(), async (req, res, next) => { try { await query('DELETE FROM notes WHERE id = ? AND user_id = ?', [req.params.id, req.user.user_id]); res.json({ ok: true }); } catch (error) { next(error); } });

app.get('/api/favorites', auth(), async (req, res, next) => { try { res.json({ favorites: asObjects(await all('SELECT taxon_id FROM favorites WHERE user_id = ?', [req.user.user_id]))).map(row => row.taxon_id) }); } catch (error) { next(error); } });
app.post('/api/favorites', auth(), async (req, res, next) => { try { const id = req.body?.taxon_id; if (!id) return res.status(400).json({ error: 'Brak taxon_id' }); await query('INSERT OR IGNORE INTO favorites (user_id, taxon_id) VALUES (?, ?)', [req.user.user_id, id]); res.json({ ok: true }); } catch (error) { next(error); } });
app.delete('/api/favorites/:taxon_id', auth(), async (req, res, next) => { try { await query('DELETE FROM favorites WHERE user_id = ? AND taxon_id = ?', [req.user.user_id, req.params.taxon_id]); res.json({ ok: true }); } catch (error) { next(error); } });
app.post('/api/favorites/toggle', auth(), async (req, res, next) => { try { const id = req.body?.taxon_id; if (!id) return res.status(400).json({ error: 'Brak taxon_id' }); const found = await one('SELECT id FROM favorites WHERE user_id = ? AND taxon_id = ?', [req.user.user_id, id]); if (found) { await query('DELETE FROM favorites WHERE id = ?', [found.id]); return res.json({ ok: true, active: false }); } await query('INSERT INTO favorites (user_id, taxon_id) VALUES (?, ?)', [req.user.user_id, id]); res.json({ ok: true, active: true }); } catch (error) { next(error); } });

app.get('/api/profile', auth(), async (req, res, next) => { try { const user = asObject(await one('SELECT id, name, email, country, avatar, xp, is_pro, pro_since, created_at FROM users WHERE id = ?', [req.user.user_id])); const level = computeLevel(user.xp || 0); const prev = level > 1 ? (LEVEL_THRESHOLDS[level - 1] ?? (50000 + (level - 16) * 15000)) : 0; const nextThreshold = level < LEVEL_THRESHOLDS.length ? LEVEL_THRESHOLDS[level] : (50000 + (level - 15) * 15000); res.json({ ...user, level, levelTitle: LEVEL_TITLES[level] || 'Mistrz', xpToNext: Math.max(0, nextThreshold - Number(user.xp)), xpProgress: Number(user.xp) - prev, xpRange: nextThreshold - prev }); } catch (error) { next(error); } });
app.get('/api/streak', auth(), async (req, res, next) => { try { res.json(await streakFor(req.user.user_id)); } catch (error) { next(error); } });
app.post('/api/profile/country', auth(), async (req, res, next) => { try { const country = String(req.body?.country || '').slice(0, 4); if (!country) return res.status(400).json({ error: 'Brak kraju' }); await query('UPDATE users SET country = ? WHERE id = ?', [country, req.user.user_id]); res.json({ ok: true }); } catch (error) { next(error); } });
app.post('/api/profile/avatar', auth(), async (req, res, next) => { try { const avatar = String(req.body?.avatar || '').slice(0, 40); if (!avatar) return res.status(400).json({ error: 'Brak avatara' }); await query('UPDATE users SET avatar = ? WHERE id = ?', [avatar, req.user.user_id]); res.json({ ok: true }); } catch (error) { next(error); } });
app.post('/api/profile/name', auth(), async (req, res, next) => { try { const name = String(req.body?.name || '').trim().slice(0, 40); if (!name) return res.status(400).json({ error: 'Brak nazwy' }); await query('UPDATE users SET name = ? WHERE id = ?', [name, req.user.user_id]); res.json({ ok: true }); } catch (error) { next(error); } });
app.post('/api/profile/email', auth(), async (req, res, next) => { try { const email = String(req.body?.email || '').trim().toLowerCase(); const password = req.body?.password; if (!email || !password) return res.status(400).json({ error: 'Brak danych' }); const user = asObject(await one('SELECT password_hash FROM users WHERE id = ?', [req.user.user_id])); if (!bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ error: 'Nieprawidłowe hasło' }); if (await one('SELECT id FROM users WHERE email = ? AND id != ?', [email, req.user.user_id])) return res.status(409).json({ error: 'E-mail już używany' }); await query('UPDATE users SET email = ? WHERE id = ?', [email, req.user.user_id]); res.json({ ok: true }); } catch (error) { next(error); } });
app.post('/api/profile/password', auth(), async (req, res, next) => { try { const oldPassword = req.body?.currentPassword; const nextPassword = req.body?.newPassword; if (!oldPassword || !nextPassword) return res.status(400).json({ error: 'Brak danych' }); if (String(nextPassword).length < 8) return res.status(400).json({ error: 'Hasło min. 8 znaków' }); const user = asObject(await one('SELECT password_hash FROM users WHERE id = ?', [req.user.user_id])); if (!bcrypt.compareSync(oldPassword, user.password_hash)) return res.status(401).json({ error: 'Nieprawidłowe hasło' }); await query('UPDATE users SET password_hash = ? WHERE id = ?', [bcrypt.hashSync(nextPassword, 10), req.user.user_id]); res.json({ ok: true }); } catch (error) { next(error); } });
app.get('/api/activity', auth(), async (req, res, next) => { try { const scores = asObjects(await all('SELECT game, score, xp_awarded, created_at FROM game_scores WHERE user_id = ? ORDER BY created_at DESC LIMIT 10', [req.user.user_id])); const lessons = asObjects(await all('SELECT lesson_id, completed_at AS created_at FROM lesson_progress WHERE user_id = ? ORDER BY completed_at DESC LIMIT 10', [req.user.user_id])); const activity = [...scores.map(s => ({ type: 'game', label: s.game, xp: s.xp_awarded, score: s.score, date: s.created_at })), ...lessons.map(l => ({ type: 'lesson', label: l.lesson_id, xp: 50, date: l.created_at }))].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 15); res.json({ activity }); } catch (error) { next(error); } });

app.post('/api/pro/activate', auth(), async (req, res, next) => { try { await query('UPDATE users SET is_pro = 1, pro_since = ? WHERE id = ?', [utcNowSql(), req.user.user_id]); res.json({ ok: true, isPro: true }); } catch (error) { next(error); } });
app.post('/api/pro/cancel', auth(), async (req, res, next) => { try { await query('UPDATE users SET is_pro = 0 WHERE id = ?', [req.user.user_id]); res.json({ ok: true, isPro: false }); } catch (error) { next(error); } });

const RARITY = { common: { label: 'Pospolite', required: 120 }, rare: { label: 'Rzadkie', required: 260 }, epic: { label: 'Wyjątkowe', required: 480 } };
const DINO_POOLS = { common: ['trex','triceratops','stegosaurus','diplodocus','velociraptor','ankylosaurus'], rare: ['spinosaurus','therizinosaurus','anzu','concavenator','qianzhousaurus','struthiosaurus'], epic: ['yi','linhenykus','natovenator','bajadasaurus'] };
function rollRarity(level) { const epic = Math.min(.3, .04 + level * .02), rare = Math.min(.45, .2 + level * .015), roll = Math.random(); return roll < epic ? 'epic' : roll < epic + rare ? 'rare' : 'common'; }
app.get('/api/hatchery', auth(), async (req, res, next) => { try { const user = asObject(await one('SELECT xp FROM users WHERE id = ?', [req.user.user_id])); const level = computeLevel(user.xp || 0); const eggs = asObjects(await all('SELECT id, rarity, warmth, required, from_level, created_at FROM eggs WHERE user_id = ? AND hatched = 0 ORDER BY id', [req.user.user_id])); const collection = asObjects(await all('SELECT dino_id, rarity, nickname, hatched_at FROM collection WHERE user_id = ? ORDER BY hatched_at DESC', [req.user.user_id])); const claimed = asObject(await one('SELECT COUNT(*) AS c FROM eggs WHERE user_id = ?', [req.user.user_id])); res.json({ level, xp: user.xp || 0, eggsAvailable: Math.max(0, level - Number(claimed.c)), eggs: eggs.map(e => ({ ...e, label: RARITY[e.rarity]?.label || e.rarity, ready: Number(e.warmth) >= Number(e.required) })), collection, collected: collection.length, totalDinos: 16, rarities: RARITY }); } catch (error) { next(error); } });
app.post('/api/hatchery/egg', auth(), async (req, res, next) => { try { const user = asObject(await one('SELECT xp FROM users WHERE id = ?', [req.user.user_id])); const level = computeLevel(user.xp || 0); const claimed = asObject(await one('SELECT COUNT(*) AS c FROM eggs WHERE user_id = ?', [req.user.user_id])); if (Number(claimed.c) >= level) return res.status(400).json({ error: 'Brak dostępnych jaj. Zdobądź kolejny poziom.' }); const rarity = rollRarity(level), info = RARITY[rarity]; const result = await query('INSERT INTO eggs (user_id, rarity, warmth, required, from_level) VALUES (?, ?, 0, ?, ?)', [req.user.user_id, rarity, info.required, level]); res.json({ ok: true, egg: { id: Number(result.lastInsertRowid), rarity, label: info.label, warmth: 0, required: info.required, ready: false } }); } catch (error) { next(error); } });
app.post('/api/hatchery/hatch', auth(), async (req, res, next) => { try { const egg = asObject(await one('SELECT * FROM eggs WHERE id = ? AND user_id = ? AND hatched = 0', [req.body?.eggId, req.user.user_id])); if (!egg) return res.status(404).json({ error: 'Nie znaleziono jaja' }); if (Number(egg.warmth) < Number(egg.required)) return res.status(400).json({ error: 'Jajo nie jest jeszcze gotowe.' }); const owned = asObjects(await all('SELECT dino_id FROM collection WHERE user_id = ?', [req.user.user_id])).map(x => x.dino_id); const order = egg.rarity === 'epic' ? ['epic','rare','common'] : egg.rarity === 'rare' ? ['rare','epic','common'] : ['common','rare','epic']; let chosen, rarity = egg.rarity; for (const key of order) { const fresh = DINO_POOLS[key].filter(id => !owned.includes(id)); if (fresh.length) { chosen = fresh[Math.floor(Math.random() * fresh.length)]; rarity = key; break; } } if (!chosen) { const bonus = Math.round(Number(egg.required) / 2); await query('UPDATE users SET xp = xp + ? WHERE id = ?', [bonus, req.user.user_id]); await query('UPDATE eggs SET hatched = 1 WHERE id = ?', [egg.id]); return res.json({ ok: true, duplicate: true, xpBonus: bonus }); } await query('INSERT OR IGNORE INTO collection (user_id, dino_id, rarity) VALUES (?, ?, ?)', [req.user.user_id, chosen, rarity]); await query('UPDATE eggs SET hatched = 1 WHERE id = ?', [egg.id]); res.json({ ok: true, dinoId: chosen, rarity, duplicate: false }); } catch (error) { next(error); } });
app.post('/api/hatchery/nickname', auth(), async (req, res, next) => { try { const dinoId = req.body?.dinoId; const nickname = String(req.body?.nickname || '').slice(0, 30); if (!dinoId) return res.status(400).json({ error: 'Brak dinozaura' }); const result = await query('UPDATE collection SET nickname = ? WHERE user_id = ? AND dino_id = ?', [nickname, req.user.user_id, dinoId]); if (!Number(result.rowsAffected)) return res.status(404).json({ error: 'Nie masz tego dinozaura' }); res.json({ ok: true }); } catch (error) { next(error); } });

app.get('*', (req, res, next) => { if (req.path.startsWith('/api/')) return next(); const direct = path.join(__dirname, 'public', req.path); const html = path.join(__dirname, 'public', req.path + '.html'); if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return res.sendFile(direct); if (fs.existsSync(html)) return res.sendFile(html); res.sendFile(path.join(__dirname, 'public', 'index.html')); });
app.use((error, req, res, next) => { console.error(error); res.status(500).json({ error: 'Błąd serwera. Spróbuj ponownie za chwilę.' }); });

initializeDatabase().then(() => app.listen(PORT, '0.0.0.0', () => console.log(`Dinocademy server running on port ${PORT}`))).catch(error => { console.error('[database] Nie udało się zainicjować Turso:', error); process.exit(1); });
