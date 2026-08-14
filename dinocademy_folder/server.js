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

// On Render set DATABASE_PATH=/var/data/dinocademy.db and mount a Persistent Disk at /var/data.
// Locally the app still uses data.db in the project folder.
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, 'data.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
console.log(`[database] SQLite: ${DB_PATH}`);
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

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
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS lesson_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    lesson_id TEXT NOT NULL,
    completed_at TEXT DEFAULT (datetime('now')),
    UNIQUE(user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS game_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    player_name TEXT NOT NULL,
    game TEXT NOT NULL,
    score INTEGER NOT NULL,
    xp_awarded INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    taxon_id TEXT NOT NULL,
    UNIQUE(user_id, taxon_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
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
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS collection (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    dino_id TEXT NOT NULL,
    rarity TEXT NOT NULL,
    nickname TEXT,
    hatched_at TEXT DEFAULT (datetime('now')),
    UNIQUE(user_id, dino_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS study_days (
    user_id INTEGER NOT NULL,
    study_date TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, study_date),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

(function migrate() {
  const cols = db.prepare('PRAGMA table_info(users)').all().map(c => c.name);
  const add = (name, ddl) => { if (!cols.includes(name)) { db.exec(`ALTER TABLE users ADD COLUMN ${name} ${ddl}`); console.log(`[migration] users.${name} added`); } };
  add('is_pro', 'INTEGER DEFAULT 0');
  add('pro_since', 'TEXT');
})();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000, 15000, 20000, 26000, 33000, 41000, 50000];
const LEVEL_TITLES = { 1:'Nowicjusz', 2:'Odkrywca', 3:'Badacz', 4:'Kolekcjoner', 5:'Analityk', 6:'Eksplorator', 7:'Łowca skamieniałości', 8:'Specjalista', 9:'Ekspert', 10:'Mistrz', 11:'Architekt', 12:'Weteran', 13:'Savant', 14:'Autorytet', 15:'Lider' };
function computeLevel(xp) { let level = 1; for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1; return xp >= 50000 ? Math.floor((xp - 50000) / 15000) + 16 : level; }
function isoDay(offset = 0) { const day = new Date(); day.setUTCHours(0, 0, 0, 0); day.setUTCDate(day.getUTCDate() + offset); return day.toISOString().slice(0, 10); }
function markStudyDay(userId) { db.prepare('INSERT OR IGNORE INTO study_days (user_id, study_date) VALUES (?, ?)').run(userId, isoDay()); }
function streakFor(userId) {
  const dates = new Set(db.prepare('SELECT study_date FROM study_days WHERE user_id = ? AND study_date >= ?').all(userId, isoDay(-365)).map(r => r.study_date));
  let count = 0;
  for (let offset = 0; ; offset--) { if (!dates.has(isoDay(offset))) break; count++; }
  const mondayOffset = -((new Date().getUTCDay() + 6) % 7);
  const week = Array.from({ length: 7 }, (_, index) => dates.has(isoDay(mondayOffset + index)) ? index : null).filter(Number.isInteger);
  return { count, studiedToday: dates.has(isoDay()), week };
}

function auth(required = true) {
  return (req, res, next) => {
    const token = req.cookies?.session || req.headers['x-session-token'];
    if (!token) { if (required) return res.status(401).json({ error: 'Nie zalogowano' }); req.user = null; return next(); }
    const row = db.prepare(`SELECT s.*,u.name,u.email,u.country,u.avatar,u.xp,u.is_pro,u.pro_since FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires_at>datetime('now')`).get(token);
    if (!row) { if (required) return res.status(401).json({ error: 'Sesja wygasła' }); req.user = null; return next(); }
    req.user = { id:row.user_id,name:row.name,email:row.email,country:row.country,avatar:row.avatar,xp:row.xp,is_pro:row.is_pro,pro_since:row.pro_since };
    next();
  };
}

app.post('/api/register', (req,res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error:'Wypełnij wszystkie pola' });
  if (String(password).length < 4) return res.status(400).json({ error:'Hasło musi mieć min. 4 znaki' });
  if (db.prepare('SELECT id FROM users WHERE email=?').get(String(email).toLowerCase())) return res.status(409).json({ error:'Konto z tym e-mailem już istnieje' });
  const result = db.prepare('INSERT INTO users (name,email,password_hash,country) VALUES (?,?,?,?)').run(String(name).trim().slice(0,40),String(email).toLowerCase().trim(),bcrypt.hashSync(password,10),req.body.country || 'PL');
  const token = uuidv4(); db.prepare('INSERT INTO sessions (token,user_id) VALUES (?,?)').run(token,result.lastInsertRowid);
  res.cookie('session',token,{ httpOnly:true,maxAge:30*24*60*60*1000,sameSite:'lax',secure:process.env.NODE_ENV==='production' });
  res.json({ ok:true, token, user:{ id:result.lastInsertRowid,name,email,country:req.body.country||'PL',xp:0,level:1 } });
});
app.post('/api/login', (req,res) => {
  const { email,password } = req.body || {}; if (!email || !password) return res.status(400).json({ error:'Wypełnij wszystkie pola' });
  const user = db.prepare('SELECT * FROM users WHERE email=?').get(String(email).toLowerCase().trim());
  if (!user || !bcrypt.compareSync(password,user.password_hash)) return res.status(401).json({ error:'Nieprawidłowy e-mail lub hasło' });
  const token=uuidv4(); db.prepare('INSERT INTO sessions (token,user_id) VALUES (?,?)').run(token,user.id);
  res.cookie('session',token,{ httpOnly:true,maxAge:30*24*60*60*1000,sameSite:'lax',secure:process.env.NODE_ENV==='production' });
  res.json({ ok:true,token,user:{ id:user.id,name:user.name,email:user.email,country:user.country,avatar:user.avatar,xp:user.xp,level:computeLevel(user.xp) } });
});
app.post('/api/logout', auth(false), (req,res) => { const token=req.cookies?.session || req.headers['x-session-token']; if(token) db.prepare('DELETE FROM sessions WHERE token=?').run(token); res.clearCookie('session'); res.json({ok:true}); });
app.get('/api/me', auth(false), (req,res) => { if(!req.user) return res.json({user:null}); const level=computeLevel(req.user.xp||0); res.json({user:{...req.user,isPro:!!req.user.is_pro,level,levelTitle:LEVEL_TITLES[level]||'Mistrz'}}); });

app.get('/api/progress', auth(), (req,res) => res.json({ lessons:db.prepare('SELECT lesson_id FROM lesson_progress WHERE user_id=?').all(req.user.id).map(r=>r.lesson_id) }));
app.post('/api/progress', auth(), (req,res) => { const id=req.body?.lesson_id; if(!id) return res.status(400).json({error:'Brak lesson_id'}); const result=db.prepare('INSERT OR IGNORE INTO lesson_progress (user_id,lesson_id) VALUES (?,?)').run(req.user.id,id); if(result.changes) markStudyDay(req.user.id); res.json({ok:true}); });

function requirePro(req,res){ if(!req.user || !req.user.is_pro){res.status(402).json({error:'Gry są dostępne w planie Pro.',needsPro:true});return false;} return true; }
app.post('/api/scores', auth(false), (req,res) => { if(!requirePro(req,res)) return; const score=Math.max(0,Number(req.body?.score)||0), game=String(req.body?.game||'Gra'); const xp=Math.floor(score/10); db.prepare('INSERT INTO game_scores (user_id,player_name,game,score,xp_awarded) VALUES (?,?,?,?,?)').run(req.user.id,req.user.name,game,score,xp); db.prepare('UPDATE users SET xp=xp+? WHERE id=?').run(xp,req.user.id); if(xp>0){db.prepare('UPDATE eggs SET warmth=MIN(warmth+?,required) WHERE user_id=? AND hatched=0').run(xp,req.user.id);markStudyDay(req.user.id);} res.json({ok:true,xpAwarded:xp}); });
app.get('/api/scores', (req,res) => res.json({scores:db.prepare('SELECT player_name,game,MAX(score) score,MIN(created_at) first_played,MAX(created_at) last_played FROM game_scores GROUP BY player_name,game ORDER BY score DESC LIMIT 50').all()}));
app.delete('/api/scores', auth(), (req,res)=>{db.prepare('DELETE FROM game_scores').run();res.json({ok:true});});

app.get('/api/notes', auth(), (req,res)=>res.json({notes:db.prepare('SELECT * FROM notes WHERE user_id=? ORDER BY created_at DESC').all(req.user.id)}));
app.post('/api/notes', auth(), (req,res)=>{const text=String(req.body?.text||'').trim();if(!text)return res.status(400).json({error:'Brak treści'});const r=db.prepare('INSERT INTO notes (user_id,text) VALUES (?,?)').run(req.user.id,text);res.json({ok:true,note:db.prepare('SELECT * FROM notes WHERE id=?').get(r.lastInsertRowid)});});
app.delete('/api/notes/:id',auth(),(req,res)=>{db.prepare('DELETE FROM notes WHERE id=? AND user_id=?').run(req.params.id,req.user.id);res.json({ok:true});});

app.get('/api/favorites',auth(),(req,res)=>res.json({favorites:db.prepare('SELECT taxon_id FROM favorites WHERE user_id=?').all(req.user.id).map(r=>r.taxon_id)}));
app.post('/api/favorites',auth(),(req,res)=>{const id=req.body?.taxon_id;if(!id)return res.status(400).json({error:'Brak taxon_id'});db.prepare('INSERT OR IGNORE INTO favorites (user_id,taxon_id) VALUES (?,?)').run(req.user.id,id);res.json({ok:true});});
app.delete('/api/favorites/:taxon_id',auth(),(req,res)=>{db.prepare('DELETE FROM favorites WHERE user_id=? AND taxon_id=?').run(req.user.id,req.params.taxon_id);res.json({ok:true});});
app.post('/api/favorites/toggle',auth(),(req,res)=>{const id=req.body?.taxon_id;if(!id)return res.status(400).json({error:'Brak taxon_id'});const old=db.prepare('SELECT id FROM favorites WHERE user_id=? AND taxon_id=?').get(req.user.id,id);if(old){db.prepare('DELETE FROM favorites WHERE id=?').run(old.id);return res.json({ok:true,active:false});}db.prepare('INSERT INTO favorites (user_id,taxon_id) VALUES (?,?)').run(req.user.id,id);res.json({ok:true,active:true});});

app.get('/api/profile',auth(),(req,res)=>{const user=db.prepare('SELECT id,name,email,country,avatar,xp,is_pro,pro_since,created_at FROM users WHERE id=?').get(req.user.id);const level=computeLevel(user.xp||0);const prev=level>1?(LEVEL_THRESHOLDS[level-1] ?? (50000+(level-16)*15000)):0;const next=level<LEVEL_THRESHOLDS.length?LEVEL_THRESHOLDS[level]:(50000+(level-15)*15000);res.json({...user,level,levelTitle:LEVEL_TITLES[level]||'Mistrz',xpToNext:Math.max(0,next-user.xp),xpProgress:user.xp-prev,xpRange:next-prev});});
app.get('/api/streak',auth(),(req,res)=>res.json(streakFor(req.user.id)));
app.post('/api/profile/country',auth(),(req,res)=>{const country=String(req.body?.country||'').slice(0,4);if(!country)return res.status(400).json({error:'Brak kraju'});db.prepare('UPDATE users SET country=? WHERE id=?').run(country,req.user.id);res.json({ok:true});});
app.post('/api/profile/avatar',auth(),(req,res)=>{const avatar=String(req.body?.avatar||'').slice(0,40);if(!avatar)return res.status(400).json({error:'Brak avatara'});db.prepare('UPDATE users SET avatar=? WHERE id=?').run(avatar,req.user.id);res.json({ok:true});});
app.post('/api/profile/name',auth(),(req,res)=>{const name=String(req.body?.name||'').trim().slice(0,40);if(!name)return res.status(400).json({error:'Brak nazwy'});db.prepare('UPDATE users SET name=? WHERE id=?').run(name,req.user.id);res.json({ok:true});});
app.post('/api/profile/email',auth(),(req,res)=>{const email=String(req.body?.email||'').trim().toLowerCase(),password=req.body?.password;if(!email||!password)return res.status(400).json({error:'Brak danych'});const user=db.prepare('SELECT password_hash FROM users WHERE id=?').get(req.user.id);if(!bcrypt.compareSync(password,user.password_hash))return res.status(401).json({error:'Nieprawidłowe hasło'});if(db.prepare('SELECT id FROM users WHERE email=? AND id!=?').get(email,req.user.id))return res.status(409).json({error:'E-mail już używany'});db.prepare('UPDATE users SET email=? WHERE id=?').run(email,req.user.id);res.json({ok:true});});
app.post('/api/profile/password',auth(),(req,res)=>{const old=req.body?.currentPassword,next=req.body?.newPassword;if(!old||!next)return res.status(400).json({error:'Brak danych'});if(String(next).length<8)return res.status(400).json({error:'Hasło min. 8 znaków'});const user=db.prepare('SELECT password_hash FROM users WHERE id=?').get(req.user.id);if(!bcrypt.compareSync(old,user.password_hash))return res.status(401).json({error:'Nieprawidłowe hasło'});db.prepare('UPDATE users SET password_hash=? WHERE id=?').run(bcrypt.hashSync(next,10),req.user.id);res.json({ok:true});});
app.get('/api/activity',auth(),(req,res)=>{const scores=db.prepare('SELECT game,score,xp_awarded,created_at FROM game_scores WHERE user_id=? ORDER BY created_at DESC LIMIT 10').all(req.user.id);const lessons=db.prepare('SELECT lesson_id,completed_at created_at FROM lesson_progress WHERE user_id=? ORDER BY completed_at DESC LIMIT 10').all(req.user.id);const activity=[...scores.map(s=>({type:'game',label:s.game,xp:s.xp_awarded,score:s.score,date:s.created_at})),...lessons.map(l=>({type:'lesson',label:l.lesson_id,xp:50,date:l.created_at}))].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,15);res.json({activity});});

app.post('/api/pro/activate',auth(),(req,res)=>{db.prepare("UPDATE users SET is_pro=1,pro_since=datetime('now') WHERE id=?").run(req.user.id);res.json({ok:true,isPro:true});});
app.post('/api/pro/cancel',auth(),(req,res)=>{db.prepare('UPDATE users SET is_pro=0 WHERE id=?').run(req.user.id);res.json({ok:true,isPro:false});});

const RARITY={common:{label:'Pospolite',required:120},rare:{label:'Rzadkie',required:260},epic:{label:'Wyjątkowe',required:480}};
const DINO_POOLS={common:['trex','triceratops','stegosaurus','diplodocus','velociraptor','ankylosaurus'],rare:['spinosaurus','therizinosaurus','anzu','concavenator','qianzhousaurus','struthiosaurus'],epic:['yi','linhenykus','natovenator','bajadasaurus']};
function rollRarity(level){const epic=Math.min(.3,.04+level*.02),rare=Math.min(.45,.2+level*.015),r=Math.random();return r<epic?'epic':r<epic+rare?'rare':'common';}
app.get('/api/hatchery',auth(),(req,res)=>{const user=db.prepare('SELECT xp FROM users WHERE id=?').get(req.user.id),level=computeLevel(user.xp||0),eggs=db.prepare('SELECT id,rarity,warmth,required,from_level,created_at FROM eggs WHERE user_id=? AND hatched=0 ORDER BY id').all(req.user.id),collection=db.prepare('SELECT dino_id,rarity,nickname,hatched_at FROM collection WHERE user_id=? ORDER BY hatched_at DESC').all(req.user.id),claimed=db.prepare('SELECT COUNT(*) c FROM eggs WHERE user_id=?').get(req.user.id).c;res.json({level,xp:user.xp||0,eggsAvailable:Math.max(0,level-claimed),eggs:eggs.map(e=>({...e,label:RARITY[e.rarity]?.label||e.rarity,ready:e.warmth>=e.required})),collection,collected:collection.length,totalDinos:16,rarities:RARITY});});
app.post('/api/hatchery/egg',auth(),(req,res)=>{const user=db.prepare('SELECT xp FROM users WHERE id=?').get(req.user.id),level=computeLevel(user.xp||0),claimed=db.prepare('SELECT COUNT(*) c FROM eggs WHERE user_id=?').get(req.user.id).c;if(claimed>=level)return res.status(400).json({error:'Brak dostępnych jaj. Zdobądź kolejny poziom.'});const rarity=rollRarity(level),info=RARITY[rarity],r=db.prepare('INSERT INTO eggs (user_id,rarity,warmth,required,from_level) VALUES (?,?,0,?,?)').run(req.user.id,rarity,info.required,level);res.json({ok:true,egg:{id:r.lastInsertRowid,rarity,label:info.label,warmth:0,required:info.required,ready:false}});});
app.post('/api/hatchery/hatch',auth(),(req,res)=>{const egg=db.prepare('SELECT * FROM eggs WHERE id=? AND user_id=? AND hatched=0').get(req.body?.eggId,req.user.id);if(!egg)return res.status(404).json({error:'Nie znaleziono jaja'});if(egg.warmth<egg.required)return res.status(400).json({error:'Jajo nie jest jeszcze gotowe.'});const owned=db.prepare('SELECT dino_id FROM collection WHERE user_id=?').all(req.user.id).map(x=>x.dino_id),order=egg.rarity==='epic'?['epic','rare','common']:egg.rarity==='rare'?['rare','epic','common']:['common','rare','epic'];let chosen,rarity=egg.rarity;for(const key of order){const fresh=DINO_POOLS[key].filter(id=>!owned.includes(id));if(fresh.length){chosen=fresh[Math.floor(Math.random()*fresh.length)];rarity=key;break;}}if(!chosen){const bonus=Math.round(egg.required/2);db.prepare('UPDATE users SET xp=xp+? WHERE id=?').run(bonus,req.user.id);db.prepare('UPDATE eggs SET hatched=1 WHERE id=?').run(egg.id);return res.json({ok:true,duplicate:true,xpBonus:bonus});}db.prepare('INSERT OR IGNORE INTO collection (user_id,dino_id,rarity) VALUES (?,?,?)').run(req.user.id,chosen,rarity);db.prepare('UPDATE eggs SET hatched=1 WHERE id=?').run(egg.id);res.json({ok:true,dinoId:chosen,rarity,duplicate:false});});
app.post('/api/hatchery/nickname',auth(),(req,res)=>{const dinoId=req.body?.dinoId,nickname=String(req.body?.nickname||'').slice(0,30);if(!dinoId)return res.status(400).json({error:'Brak dinozaura'});const r=db.prepare('UPDATE collection SET nickname=? WHERE user_id=? AND dino_id=?').run(nickname,req.user.id,dinoId);if(!r.changes)return res.status(404).json({error:'Nie masz tego dinozaura'});res.json({ok:true});});

app.get('*',(req,res,next)=>{if(req.path.startsWith('/api/'))return next();const direct=path.join(__dirname,'public',req.path),html=path.join(__dirname,'public',req.path+'.html');if(fs.existsSync(direct)&&fs.statSync(direct).isFile())return res.sendFile(direct);if(fs.existsSync(html))return res.sendFile(html);res.sendFile(path.join(__dirname,'public','index.html'));});
app.listen(PORT,'0.0.0.0',()=>console.log(`Dinocademy server running on port ${PORT}`));
