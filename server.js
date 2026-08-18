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
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, 'data.db');
const ADMIN_EMAIL = 'adamlubanskimc@gmail.com';

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

const TAXA = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'taxa.json'), 'utf8'));
const VARIANT_LIST = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'variants.json'), 'utf8'));
const TAXA_BY_ID = Object.fromEntries(TAXA.map(t => [t.id, t]));
const VARIANTS = Object.fromEntries(VARIANT_LIST.map(v => [v.id, v]));

const RARITY = {
  // cardBase/cardMax describe the multiplier of ONE normal-variant card at Lv1/Lv100.
  // Special variants amplify the bonus above ×1 through multiplierFactor from variants.json.
  common:    { label: 'Pospolity',  required: 140, dinoXpFactor: 1.00, cardBase: 1.05, cardMax: 1.65, weight: 46 },
  uncommon:  { label: 'Niezwykły', required: 220, dinoXpFactor: 1.10, cardBase: 1.10, cardMax: 1.95, weight: 27 },
  rare:      { label: 'Rzadki',     required: 340, dinoXpFactor: 1.25, cardBase: 1.20, cardMax: 2.35, weight: 16 },
  epic:      { label: 'Epicki',     required: 520, dinoXpFactor: 1.50, cardBase: 1.35, cardMax: 2.85, weight: 8 },
  legendary: { label: 'Legendarny', required: 760, dinoXpFactor: 2.00, cardBase: 1.50, cardMax: 3.50, weight: 3 }
};

const LEVEL_THRESHOLDS = [0,100,250,500,1000,2000,3500,5500,8000,11000,15000,20000,26000,33000,41000,50000,65000,82000,100000,125000,150000,180000,215000,255000,300000,350000,405000,465000,530000,600000,675000,755000,840000,930000,1025000];
const RANKS = [
  [1,'Nowicjusz'],[5,'Odkrywca'],[10,'Badacz'],[20,'Paleontolog terenowy'],[30,'Kurator kolekcji'],
  [35,'Ekspert mezozoiku'],[40,'Mistrz wykopalisk'],[50,'Strażnik skamieniałości'],[60,'Kronikarz er'],
  [75,'Legenda Dinocademy'],[90,'Architekt paleoświata'],[100,'Władca zapisu kopalnego'],[125,'Tytan paleontologii'],[150,'Legenda ery mezozoicznej']
];

function migrateTable(table, columns) {
  const existing = db.prepare(`PRAGMA table_info(${table})`).all().map(c => c.name);
  Object.entries(columns).forEach(([name, ddl]) => {
    if (!existing.includes(name)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${name} ${ddl}`);
  });
}

db.exec(`
CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
 password_hash TEXT NOT NULL, country TEXT DEFAULT 'PL', avatar TEXT DEFAULT 'trex', xp INTEGER DEFAULT 0,
 is_pro INTEGER DEFAULT 0, pro_since TEXT, is_admin INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS sessions (
 token TEXT PRIMARY KEY, user_id INTEGER NOT NULL, created_at TEXT DEFAULT (datetime('now')),
 expires_at TEXT DEFAULT (datetime('now','+30 days')), FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS lesson_progress (
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, lesson_id TEXT NOT NULL,
 completed_at TEXT DEFAULT (datetime('now')), UNIQUE(user_id,lesson_id), FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS game_scores (
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, player_name TEXT NOT NULL, game TEXT NOT NULL,
 score INTEGER NOT NULL, xp_awarded INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')),
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,text TEXT NOT NULL,created_at TEXT DEFAULT (datetime('now')),FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,taxon_id TEXT NOT NULL,UNIQUE(user_id,taxon_id),FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS study_days (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,study_date TEXT NOT NULL,UNIQUE(user_id,study_date),FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS eggs (
 id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,rarity TEXT NOT NULL,warmth INTEGER DEFAULT 0,
 required INTEGER NOT NULL,from_level INTEGER,hatched INTEGER DEFAULT 0,active INTEGER DEFAULT 0,created_at TEXT DEFAULT (datetime('now')),
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS collection (
 id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,dino_id TEXT NOT NULL,rarity TEXT NOT NULL,
 variant TEXT DEFAULT 'normal',level INTEGER DEFAULT 1,dino_xp INTEGER DEFAULT 0,duplicates INTEGER DEFAULT 0,xp_bonus INTEGER DEFAULT 0,nickname TEXT,
 hatched_at TEXT DEFAULT (datetime('now')),FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS xp_ledger (
 id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,source_type TEXT NOT NULL,source_id TEXT,
 base_xp INTEGER NOT NULL,multiplier REAL NOT NULL DEFAULT 1,final_xp INTEGER NOT NULL,hatch_xp INTEGER DEFAULT 0,
 actor_user_id INTEGER,created_at TEXT DEFAULT (datetime('now')),
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,FOREIGN KEY(actor_user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS admin_audit_log (
 id INTEGER PRIMARY KEY AUTOINCREMENT,actor_user_id INTEGER NOT NULL,target_user_id INTEGER,action TEXT NOT NULL,amount INTEGER,
 details TEXT,created_at TEXT DEFAULT (datetime('now')),FOREIGN KEY(actor_user_id) REFERENCES users(id),FOREIGN KEY(target_user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS forum_threads (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL,body TEXT NOT NULL,category_id TEXT NOT NULL,author_id INTEGER NOT NULL,pinned INTEGER DEFAULT 0,deleted INTEGER DEFAULT 0,created_at TEXT DEFAULT (datetime('now')),FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS forum_replies (id INTEGER PRIMARY KEY AUTOINCREMENT,thread_id INTEGER NOT NULL,body TEXT NOT NULL,author_id INTEGER NOT NULL,deleted INTEGER DEFAULT 0,created_at TEXT DEFAULT (datetime('now')),FOREIGN KEY(thread_id) REFERENCES forum_threads(id) ON DELETE CASCADE,FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE CASCADE);
CREATE INDEX IF NOT EXISTS idx_xp_ledger_user_created ON xp_ledger(user_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_collection_user ON collection(user_id);
`);

migrateTable('users', { is_pro: 'INTEGER DEFAULT 0', pro_since: 'TEXT', is_admin: 'INTEGER DEFAULT 0' });
migrateTable('eggs', { active: 'INTEGER DEFAULT 0' });
migrateTable('collection', { variant: "TEXT DEFAULT 'normal'", level: 'INTEGER DEFAULT 1', dino_xp: 'INTEGER DEFAULT 0', duplicates: 'INTEGER DEFAULT 0', xp_bonus: 'INTEGER DEFAULT 0' });
try { db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_collection_variant ON collection(user_id,dino_id,variant)'); } catch (_) {}

(function seedAdminFlag() {
  const existing = db.prepare('SELECT id FROM users WHERE lower(email)=lower(?)').get(ADMIN_EMAIL);
  if (existing) db.prepare('UPDATE users SET is_admin=1 WHERE id=?').run(existing.id);
  else if (process.env.ADMIN_PASSWORD) {
    const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
    db.prepare("INSERT INTO users(name,email,password_hash,country,avatar,xp,is_pro,pro_since,is_admin) VALUES (?,?,?,?,?,?,?,datetime('now'),1)")
      .run('Adam Lubański', ADMIN_EMAIL, hash, 'PL', 'trex', 0, 1);
  }
})();

function computeLevel(xp) {
  xp = Math.max(0, Number(xp) || 0);
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  if (xp >= LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]) {
    const beyond = xp - LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    let cursor = LEVEL_THRESHOLDS.length;
    let cost = 120000;
    let left = beyond;
    while (left >= cost) { left -= cost; cursor += 1; cost += 8000; if (cursor > 500) break; }
    level = cursor;
  }
  return level;
}
function titleForLevel(level) {
  let title = RANKS[0][1];
  RANKS.forEach(([min, label]) => { if (level >= min) title = label; });
  return title;
}
function levelBounds(level) {
  if (level <= LEVEL_THRESHOLDS.length) {
    const prev = LEVEL_THRESHOLDS[Math.max(0, level - 1)] || 0;
    const next = LEVEL_THRESHOLDS[level] ?? prev + 120000;
    return [prev, next];
  }
  let prev = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  let cost = 120000;
  for (let l = LEVEL_THRESHOLDS.length; l < level; l++) { prev += cost; cost += 8000; }
  return [prev, prev + cost];
}
function levelInfo(xp) {
  xp = Math.max(0, Number(xp) || 0);
  const level = computeLevel(xp);
  const [previous, next] = levelBounds(level);
  return { level, levelTitle: titleForLevel(level), xpToNext: Math.max(0, next - xp), xpProgress: Math.max(0, xp - previous), xpRange: Math.max(1, next - previous) };
}
function isoDay() { return new Date().toISOString().slice(0, 10); }
function markStudyDay(userId) { db.prepare('INSERT OR IGNORE INTO study_days(user_id,study_date) VALUES (?,?)').run(userId, isoDay()); }

function auth(required = true) {
  return (req, res, next) => {
    const token = req.cookies?.session || req.headers['x-session-token'];
    if (!token) { if (required) return res.status(401).json({ error: 'Nie zalogowano' }); req.user = null; return next(); }
    const row = db.prepare("SELECT s.user_id,u.name,u.email,u.country,u.avatar,u.xp,u.is_pro,u.pro_since,u.is_admin FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires_at>datetime('now')").get(token);
    if (!row) { if (required) return res.status(401).json({ error: 'Sesja wygasła' }); req.user = null; return next(); }
    req.user = { id: row.user_id, name: row.name, email: row.email, country: row.country, avatar: row.avatar, xp: row.xp, is_pro: row.is_pro, is_admin: row.is_admin, pro_since: row.pro_since };
    next();
  };
}
function requireAdmin(req, res) { if (!req.user?.is_admin) { res.status(403).json({ error: 'Brak uprawnień administratora' }); return false; } return true; }
function requirePro(req, res) { if (!req.user?.is_pro) { res.status(402).json({ error: 'Gry są dostępne w planie Pro.', needsPro: true }); return false; } return true; }
function sessionResponse(res, user) {
  const token = uuidv4();
  db.prepare('INSERT INTO sessions(token,user_id) VALUES (?,?)').run(token, user.id);
  res.cookie('session', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.json({ ok: true, token, user: { id:user.id,name:user.name,email:user.email,country:user.country,avatar:user.avatar,xp:user.xp,isPro:!!user.is_pro,isAdmin:!!user.is_admin,...levelInfo(user.xp) } });
}

function computeCardMultiplier(row) {
  const rarity = RARITY[row?.rarity] || RARITY.common;
  const level = Math.max(1, Math.min(100, Number(row?.level || 1)));
  const progress = (level - 1) / 99;
  // Slightly back-loaded curve: early duplicates matter, but high levels become substantially stronger.
  const levelCurve = Math.pow(progress, 1.18);
  const normalCard = rarity.cardBase + (rarity.cardMax - rarity.cardBase) * levelCurve;
  const variantFactor = VARIANTS[row?.variant]?.multiplierFactor || 1;
  return 1 + Math.max(0, normalCard - 1) * variantFactor;
}
function computeCollectionMultiplier(userId) {
  const rows = db.prepare('SELECT level,rarity,variant FROM collection WHERE user_id=?').all(userId);
  // Each owned collectible contributes its bonus above ×1. This makes rare cards meaningful from Lv1,
  // while still rewarding duplicate-driven Lv100 progression. Hard cap protects the XP economy.
  const bonus = rows.reduce((sum, row) => sum + (computeCardMultiplier(row) - 1), 0);
  return Math.min(50, Math.round((1 + bonus) * 10000) / 10000);
}

const awardXpTx = db.transaction(({ userId, baseXp, sourceType, sourceId = null, actorUserId = null, applyMultiplier = true }) => {
  const safeBase = Math.max(0, Math.floor(Number(baseXp) || 0));
  const multiplier = applyMultiplier ? computeCollectionMultiplier(userId) : 1;
  const finalXp = Math.max(0, Math.floor(safeBase * multiplier));
  db.prepare('UPDATE users SET xp=xp+? WHERE id=?').run(finalXp, userId);
  let hatchXp = 0;
  let warmedEggs = 0;
  if (finalXp > 0) {
    const eggs = db.prepare('SELECT id,warmth,required FROM eggs WHERE user_id=? AND hatched=0 ORDER BY id').all(userId);
    for (const egg of eggs) {
      const applied = Math.min(finalXp, Math.max(0, egg.required - egg.warmth));
      if (applied > 0) {
        db.prepare('UPDATE eggs SET warmth=MIN(warmth+?,required) WHERE id=?').run(applied, egg.id);
        hatchXp += applied;
        warmedEggs += 1;
      }
    }
  }
  db.prepare('INSERT INTO xp_ledger(user_id,source_type,source_id,base_xp,multiplier,final_xp,hatch_xp,actor_user_id) VALUES (?,?,?,?,?,?,?,?)')
    .run(userId, sourceType, sourceId, safeBase, multiplier, finalXp, hatchXp, actorUserId);
  if (finalXp) markStudyDay(userId);
  return { baseXp: safeBase, multiplier, finalXp, hatchXp, warmedEggs };
});
function awardXp(args) { return awardXpTx(args); }

function weightedPick(items, getWeight) {
  const weights = items.map(x => Math.max(0, Number(getWeight(x)) || 0));
  const total = weights.reduce((a, b) => a + b, 0);
  if (!items.length) return null;
  if (total <= 0) return items[Math.floor(Math.random() * items.length)];
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) { r -= weights[i]; if (r <= 0) return items[i]; }
  return items[items.length - 1];
}
function rollEggRarity(level) {
  const boost = Math.min(12, Math.floor(Math.max(1, level) / 10));
  const rows = Object.entries(RARITY).map(([id, info]) => ({ id, weight: info.weight + (id === 'legendary' ? boost * .12 : id === 'epic' ? boost * .25 : id === 'rare' ? boost * .4 : 0) }));
  return weightedPick(rows, x => x.weight).id;
}
function rollVariant(eggRarity) {
  const rarityBoost = { common:0, uncommon:5, rare:12, epic:22, legendary:35 }[eggRarity] || 0;
  return weightedPick(VARIANT_LIST, v => v.id === 'normal' ? Math.max(500, v.dropWeight - rarityBoost * 5) : v.dropWeight + rarityBoost).id;
}
function dinoXpToNext(level) { return 100 + 25 * Math.max(0, level - 1); }
function applyDuplicateXp(card, gain) {
  let level = Math.max(1, Math.min(100, Number(card.level) || 1));
  let xp = Math.max(0, Number(card.dino_xp) || 0) + Math.max(0, Math.floor(gain));
  while (level < 100) {
    const need = dinoXpToNext(level);
    if (xp < need) break;
    xp -= need; level += 1;
  }
  if (level >= 100) xp = 0;
  return { level, dinoXp: xp };
}

app.post('/api/register', (req,res) => {
  const name=String(req.body?.name||'').trim().slice(0,40), email=String(req.body?.email||'').trim().toLowerCase(), password=String(req.body?.password||'');
  if(!name||!email||!password) return res.status(400).json({error:'Wypełnij wszystkie pola'});
  if(password.length<8||!/[A-Za-z]/.test(password)||!/\d/.test(password)) return res.status(400).json({error:'Hasło musi mieć minimum 8 znaków, literę i cyfrę'});
  if(db.prepare('SELECT id FROM users WHERE email=?').get(email)) return res.status(409).json({error:'Konto z tym e-mailem już istnieje'});
  const result=db.prepare('INSERT INTO users(name,email,password_hash,country,is_admin) VALUES (?,?,?,?,?)').run(name,email,bcrypt.hashSync(password,10),String(req.body?.country||'PL').slice(0,4),email===ADMIN_EMAIL?1:0);
  sessionResponse(res,db.prepare('SELECT * FROM users WHERE id=?').get(result.lastInsertRowid));
});
app.post('/api/login',(req,res)=>{ const user=db.prepare('SELECT * FROM users WHERE email=?').get(String(req.body?.email||'').trim().toLowerCase()); if(!user||!bcrypt.compareSync(String(req.body?.password||''),user.password_hash)) return res.status(401).json({error:'Nieprawidłowy e-mail lub hasło'}); sessionResponse(res,user); });
app.post('/api/logout',auth(false),(req,res)=>{ const t=req.cookies?.session||req.headers['x-session-token']; if(t) db.prepare('DELETE FROM sessions WHERE token=?').run(t); res.clearCookie('session'); res.json({ok:true}); });
app.get('/api/me',auth(false),(req,res)=>res.json({user:req.user?{...req.user,isPro:!!req.user.is_pro,isAdmin:!!req.user.is_admin,...levelInfo(req.user.xp),collectionMultiplier:computeCollectionMultiplier(req.user.id)}:null}));

app.get('/api/catalog',(req,res)=>res.json({taxa:TAXA,variants:VARIANT_LIST,rarities:RARITY}));
app.get('/api/progress',auth(),(req,res)=>res.json({lessons:db.prepare('SELECT lesson_id FROM lesson_progress WHERE user_id=?').all(req.user.id).map(r=>r.lesson_id)}));
app.post('/api/progress',auth(),(req,res)=>{
  const lesson=String(req.body?.lesson_id||''); if(!lesson) return res.status(400).json({error:'Brak lesson_id'});
  const r=db.prepare('INSERT OR IGNORE INTO lesson_progress(user_id,lesson_id) VALUES (?,?)').run(req.user.id,lesson);
  const award=r.changes?awardXp({userId:req.user.id,baseXp:50,sourceType:'lesson',sourceId:lesson,applyMultiplier:true}):{baseXp:0,multiplier:computeCollectionMultiplier(req.user.id),finalXp:0,hatchXp:0};
  res.json({ok:true,xpAwarded:award.finalXp,multiplier:award.multiplier,hatchXp:award.hatchXp});
});

app.post('/api/scores',auth(false),(req,res)=>{
  if(!req.user) return res.status(401).json({error:'Nie zalogowano'}); if(!requirePro(req,res)) return;
  const score=Math.max(0,Math.floor(Number(req.body?.score)||0)), game=String(req.body?.game||'Gra').slice(0,80);
  const award=awardXp({userId:req.user.id,baseXp:Math.floor(score/10),sourceType:'game',sourceId:game,applyMultiplier:true});
  db.prepare('INSERT INTO game_scores(user_id,player_name,game,score,xp_awarded) VALUES (?,?,?,?,?)').run(req.user.id,req.user.name,game,score,award.finalXp);
  res.json({ok:true,xpAwarded:award.finalXp,multiplier:award.multiplier,hatchXp:award.hatchXp});
});
app.get('/api/scores',(req,res)=>{ const rows=db.prepare(`SELECT gs.player_name,gs.game,MAX(gs.score) score,MIN(gs.created_at) first_played,MAX(gs.created_at) last_played,u.xp FROM game_scores gs LEFT JOIN users u ON u.id=gs.user_id GROUP BY gs.player_name,gs.game,u.id ORDER BY score DESC LIMIT 200`).all(); res.json({scores:rows.map(x=>({...x,level:x.xp==null?0:computeLevel(x.xp)}))}); });
app.delete('/api/scores',auth(),(req,res)=>{ if(!requireAdmin(req,res)) return; db.prepare('DELETE FROM game_scores').run(); res.json({ok:true}); });

app.get('/api/ranking',(req,res)=>{
  const allowed=['level','xp','best_score','total_score','collection','completion','shiny','mutations','high_rarity','avg_dino_level','max_dino_level','multiplier'];
  const sort=allowed.includes(String(req.query.sort))?String(req.query.sort):'level';
  const rows=db.prepare(`
    WITH c AS (SELECT user_id,COUNT(*) collection_count,SUM(CASE WHEN variant='shiny' THEN 1 ELSE 0 END) shiny_count,SUM(CASE WHEN variant LIKE 'mutation_%' THEN 1 ELSE 0 END) mutation_count,SUM(CASE WHEN rarity IN ('epic','legendary') THEN 1 ELSE 0 END) high_rarity,AVG(level) avg_dino_level,MAX(level) max_dino_level FROM collection GROUP BY user_id),
    s AS (SELECT user_id,MAX(score) best_score,SUM(score) total_score FROM game_scores GROUP BY user_id)
    SELECT u.id,u.name,u.xp,COALESCE(c.collection_count,0) collection,COALESCE(c.shiny_count,0) shiny,COALESCE(c.mutation_count,0) mutations,COALESCE(c.high_rarity,0) high_rarity,COALESCE(c.avg_dino_level,0) avg_dino_level,COALESCE(c.max_dino_level,0) max_dino_level,COALESCE(s.best_score,0) best_score,COALESCE(s.total_score,0) total_score FROM users u LEFT JOIN c ON c.user_id=u.id LEFT JOIN s ON s.user_id=u.id`).all().map(r=>({
      ...r, level:computeLevel(r.xp), levelTitle:titleForLevel(computeLevel(r.xp)), completion:Math.round((r.collection/(TAXA.length*VARIANT_LIST.length))*10000)/100, multiplier:Math.round(computeCollectionMultiplier(r.id)*10000)/10000
    }));
  rows.sort((a,b)=>Number(b[sort]||0)-Number(a[sort]||0)||Number(b.xp)-Number(a.xp));
  res.json({sort,totalTaxa:TAXA.length,totalVariants:VARIANT_LIST.length,rows:rows.slice(0,200)});
});

app.get('/api/hatchery',auth(),(req,res)=>{
  const u=db.prepare('SELECT xp FROM users WHERE id=?').get(req.user.id), level=computeLevel(u.xp||0);
  const eggs=db.prepare('SELECT id,rarity,warmth,required,from_level,created_at FROM eggs WHERE user_id=? AND hatched=0 ORDER BY id').all(req.user.id);
  const collection=db.prepare('SELECT id,dino_id,rarity,variant,level,dino_xp,duplicates,xp_bonus,nickname,hatched_at FROM collection WHERE user_id=? ORDER BY hatched_at DESC').all(req.user.id);
  const collectionWithMultipliers=collection.map(c=>({...c,cardMultiplier:Math.round(computeCardMultiplier(c)*1000)/1000}));
  const claimed=db.prepare('SELECT COUNT(*) c FROM eggs WHERE user_id=?').get(req.user.id).c;
  res.json({level,xp:u.xp||0,eggsAvailable:Math.max(0,level-claimed),eggs:eggs.map(e=>({...e,label:RARITY[e.rarity]?.label||e.rarity,ready:e.warmth>=e.required})),collection:collectionWithMultipliers,collected:collection.length,totalDinos:TAXA.length,totalCollectibles:TAXA.length*VARIANT_LIST.length,rarities:RARITY,variants:VARIANTS,multiplier:computeCollectionMultiplier(req.user.id)});
});
app.post('/api/hatchery/egg',auth(),(req,res)=>{
  const u=db.prepare('SELECT xp FROM users WHERE id=?').get(req.user.id), level=computeLevel(u.xp||0), claimed=db.prepare('SELECT COUNT(*) c FROM eggs WHERE user_id=?').get(req.user.id).c;
  if(claimed>=level) return res.status(400).json({error:'Brak dostępnych jaj. Zdobądź kolejny poziom.'});
  const rarity=rollEggRarity(level), info=RARITY[rarity];
  const r=db.prepare('INSERT INTO eggs(user_id,rarity,warmth,required,from_level,active) VALUES (?,?,0,?,?,0)').run(req.user.id,rarity,info.required,level);
  res.json({ok:true,egg:{id:r.lastInsertRowid,rarity,label:info.label,warmth:0,required:info.required,ready:false}});
});
app.post('/api/hatchery/hatch',auth(),(req,res)=>{
  const egg=db.prepare('SELECT * FROM eggs WHERE id=? AND user_id=? AND hatched=0').get(Number(req.body?.eggId),req.user.id);
  if(!egg) return res.status(404).json({error:'Nie znaleziono jaja'});
  if(egg.warmth<egg.required) return res.status(400).json({error:`Jajo potrzebuje jeszcze ${egg.required-egg.warmth} XP.`});
  const variant=rollVariant(egg.rarity);
  let pool=TAXA.filter(t=>t.collectible && t.baseRarity===egg.rarity); if(!pool.length) pool=TAXA.filter(t=>t.collectible);
  const owned=db.prepare('SELECT dino_id,variant FROM collection WHERE user_id=?').all(req.user.id);
  const chosen=weightedPick(pool,t=>owned.some(c=>c.dino_id===t.id&&c.variant===variant)?1:owned.some(c=>c.dino_id===t.id)?1.6:2.5) || TAXA[0];
  const rarity=chosen.baseRarity || egg.rarity;
  const old=db.prepare('SELECT * FROM collection WHERE user_id=? AND dino_id=? AND variant=?').get(req.user.id,chosen.id,variant);
  let level=1, duplicate=false, dinoXp=0, duplicateXp=0;
  const hatchTx=db.transaction(()=>{
    if(old){
      duplicate=true;
      const rarityFactor=RARITY[rarity]?.dinoXpFactor||1, variantFactor=VARIANTS[variant]?.dinoXpFactor||1;
      duplicateXp=Math.ceil(dinoXpToNext(old.level||1)*rarityFactor*variantFactor);
      const updated=applyDuplicateXp(old,duplicateXp); level=updated.level; dinoXp=updated.dinoXp;
      db.prepare('UPDATE collection SET level=?,dino_xp=?,duplicates=COALESCE(duplicates,0)+1,xp_bonus=COALESCE(xp_bonus,0)+? WHERE id=?').run(level,dinoXp,duplicateXp,old.id);
    } else {
      db.prepare('INSERT INTO collection(user_id,dino_id,rarity,variant,level,dino_xp,duplicates,xp_bonus) VALUES (?,?,?,?,1,0,0,0)').run(req.user.id,chosen.id,rarity,variant);
    }
    db.prepare('UPDATE eggs SET hatched=1,active=0 WHERE id=?').run(egg.id);
  });
  hatchTx();
  const cardMultiplier=Math.round(computeCardMultiplier({rarity,variant,level})*1000)/1000;
  res.json({ok:true,dinoId:chosen.id,rarity,variant,level,dinoXp,duplicate,duplicateXp,taxon:chosen,cardMultiplier,multiplier:computeCollectionMultiplier(req.user.id)});
});
app.post('/api/hatchery/nickname',auth(),(req,res)=>{ const dinoId=String(req.body?.dinoId||''),variant=String(req.body?.variant||'normal'),nickname=String(req.body?.nickname||'').slice(0,30); const r=db.prepare('UPDATE collection SET nickname=? WHERE user_id=? AND dino_id=? AND variant=?').run(nickname,req.user.id,dinoId,variant); if(!r.changes)return res.status(404).json({error:'Nie masz tego wariantu'}); res.json({ok:true}); });

app.get('/api/profile',auth(),(req,res)=>{ const user=db.prepare('SELECT id,name,email,country,avatar,xp,is_pro,pro_since,is_admin,created_at FROM users WHERE id=?').get(req.user.id); res.json({...user,isPro:!!user.is_pro,isAdmin:!!user.is_admin,...levelInfo(user.xp),collectionMultiplier:computeCollectionMultiplier(user.id)}); });
app.post('/api/profile/country',auth(),(req,res)=>{const value=String(req.body?.country||'').slice(0,4);if(!value)return res.status(400).json({error:'Brak kraju'});db.prepare('UPDATE users SET country=? WHERE id=?').run(value,req.user.id);res.json({ok:true});});
app.post('/api/profile/avatar',auth(),(req,res)=>{const value=String(req.body?.avatar||'').slice(0,40);if(!value)return res.status(400).json({error:'Brak avatara'});db.prepare('UPDATE users SET avatar=? WHERE id=?').run(value,req.user.id);res.json({ok:true});});
app.post('/api/profile/name',auth(),(req,res)=>{const value=String(req.body?.name||'').trim().slice(0,40);if(!value)return res.status(400).json({error:'Brak nazwy'});db.prepare('UPDATE users SET name=? WHERE id=?').run(value,req.user.id);res.json({ok:true});});
app.post('/api/profile/email',auth(),(req,res)=>{
  const email=String(req.body?.email||'').trim().toLowerCase(), password=String(req.body?.password||''), user=db.prepare('SELECT * FROM users WHERE id=?').get(req.user.id);
  if(!email||!password) return res.status(400).json({error:'Podaj nowy e-mail i hasło'}); if(!bcrypt.compareSync(password,user.password_hash)) return res.status(401).json({error:'Nieprawidłowe hasło'});
  if(db.prepare('SELECT id FROM users WHERE email=? AND id<>?').get(email,user.id)) return res.status(409).json({error:'Ten e-mail jest już używany'});
  db.prepare('UPDATE users SET email=?,is_admin=? WHERE id=?').run(email,email===ADMIN_EMAIL?1:user.is_admin,user.id); res.json({ok:true});
});
app.post('/api/profile/password',auth(),(req,res)=>{
  const current=String(req.body?.currentPassword||''), next=String(req.body?.newPassword||''), user=db.prepare('SELECT * FROM users WHERE id=?').get(req.user.id);
  if(next.length<8) return res.status(400).json({error:'Nowe hasło musi mieć minimum 8 znaków'}); if(!bcrypt.compareSync(current,user.password_hash)) return res.status(401).json({error:'Nieprawidłowe obecne hasło'});
  db.transaction(()=>{db.prepare('UPDATE users SET password_hash=? WHERE id=?').run(bcrypt.hashSync(next,10),user.id);db.prepare('DELETE FROM sessions WHERE user_id=?').run(user.id);})(); res.clearCookie('session'); res.json({ok:true,reauth:true});
});
app.get('/api/activity',auth(),(req,res)=>{const scores=db.prepare('SELECT game,score,xp_awarded,created_at FROM game_scores WHERE user_id=? ORDER BY created_at DESC LIMIT 10').all(req.user.id),lessons=db.prepare('SELECT lesson_id,completed_at FROM lesson_progress WHERE user_id=? ORDER BY completed_at DESC LIMIT 10').all(req.user.id);res.json({activity:[...scores.map(x=>({type:'game',label:x.game,score:x.score,xp:x.xp_awarded,date:x.created_at})),...lessons.map(x=>({type:'lesson',label:x.lesson_id,date:x.completed_at}))].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,15)});});
app.post('/api/pro/activate',auth(),(req,res)=>{db.prepare("UPDATE users SET is_pro=1,pro_since=datetime('now') WHERE id=?").run(req.user.id);res.json({ok:true,isPro:true});});
app.post('/api/pro/cancel',auth(),(req,res)=>{db.prepare('UPDATE users SET is_pro=0 WHERE id=?').run(req.user.id);res.json({ok:true,isPro:false});});

app.get('/api/notes',auth(),(req,res)=>res.json({notes:db.prepare('SELECT * FROM notes WHERE user_id=? ORDER BY created_at DESC').all(req.user.id)}));
app.post('/api/notes',auth(),(req,res)=>{const text=String(req.body?.text||'').trim();if(!text)return res.status(400).json({error:'Brak treści'});const r=db.prepare('INSERT INTO notes(user_id,text) VALUES (?,?)').run(req.user.id,text);res.json({ok:true,note:db.prepare('SELECT * FROM notes WHERE id=?').get(r.lastInsertRowid)});});
app.delete('/api/notes/:id',auth(),(req,res)=>{db.prepare('DELETE FROM notes WHERE id=? AND user_id=?').run(req.params.id,req.user.id);res.json({ok:true});});
app.get('/api/favorites',auth(),(req,res)=>res.json({favorites:db.prepare('SELECT taxon_id FROM favorites WHERE user_id=?').all(req.user.id).map(x=>x.taxon_id)}));
app.post('/api/favorites/toggle',auth(),(req,res)=>{const id=String(req.body?.taxon_id||'');if(!id)return res.status(400).json({error:'Brak taxon_id'});const row=db.prepare('SELECT id FROM favorites WHERE user_id=? AND taxon_id=?').get(req.user.id,id);if(row){db.prepare('DELETE FROM favorites WHERE id=?').run(row.id);return res.json({ok:true,active:false});}db.prepare('INSERT INTO favorites(user_id,taxon_id) VALUES (?,?)').run(req.user.id,id);res.json({ok:true,active:true});});

const FORUM_CATEGORIES=[{id:'general',label:'Ogólne'},{id:'paleo',label:'Paleontologia'},{id:'learning',label:'Nauka'},{id:'games',label:'Gry i kolekcja'}];
function forumThreadDto(row){return {id:row.id,title:row.title,body:row.body,categoryId:row.category_id,authorId:row.author_id,authorName:row.author_name,pinned:!!row.pinned,createdAt:row.created_at,replyCount:Number(row.reply_count||0),authorIsAdmin:!!row.author_is_admin};}
function forumReplyDto(row){return {id:row.id,threadId:row.thread_id,body:row.body,authorId:row.author_id,authorName:row.author_name,createdAt:row.created_at,authorIsAdmin:!!row.author_is_admin};}
app.get('/api/forum/categories',(req,res)=>res.json({categories:FORUM_CATEGORIES}));
app.get('/api/forum/threads',(req,res)=>{
  const cat=String(req.query.category||'');
  const sql=`SELECT t.*,u.name author_name,u.is_admin author_is_admin,(SELECT COUNT(*) FROM forum_replies r WHERE r.thread_id=t.id AND r.deleted=0) reply_count FROM forum_threads t JOIN users u ON u.id=t.author_id WHERE t.deleted=0 ${cat?'AND t.category_id=?':''} ORDER BY t.pinned DESC,t.created_at DESC`;
  const rows=cat?db.prepare(sql).all(cat):db.prepare(sql).all();
  res.json({threads:rows.map(forumThreadDto)});
});
app.get('/api/forum/threads/:id',(req,res)=>{
  const thread=db.prepare(`SELECT t.*,u.name author_name,u.is_admin author_is_admin,(SELECT COUNT(*) FROM forum_replies rr WHERE rr.thread_id=t.id AND rr.deleted=0) reply_count FROM forum_threads t JOIN users u ON u.id=t.author_id WHERE t.id=? AND t.deleted=0`).get(req.params.id);
  if(!thread)return res.status(404).json({error:'Nie znaleziono wątku'});
  const replies=db.prepare(`SELECT r.*,u.name author_name,u.is_admin author_is_admin FROM forum_replies r JOIN users u ON u.id=r.author_id WHERE r.thread_id=? AND r.deleted=0 ORDER BY r.created_at`).all(req.params.id);
  res.json({thread:forumThreadDto(thread),replies:replies.map(forumReplyDto)});
});
app.post('/api/forum/threads',auth(),(req,res)=>{const title=String(req.body?.title||'').trim().slice(0,120),body=String(req.body?.body||'').trim().slice(0,5000),category=String(req.body?.categoryId||'general');if(!title||!body)return res.status(400).json({error:'Podaj tytuł i treść'});if(!FORUM_CATEGORIES.some(c=>c.id===category))return res.status(400).json({error:'Nieprawidłowa kategoria'});const r=db.prepare('INSERT INTO forum_threads(title,body,category_id,author_id) VALUES (?,?,?,?)').run(title,body,category,req.user.id);res.json({ok:true,id:r.lastInsertRowid});});
app.post('/api/forum/threads/:id/replies',auth(),(req,res)=>{const body=String(req.body?.body||'').trim().slice(0,5000);if(!body)return res.status(400).json({error:'Brak treści'});const thread=db.prepare('SELECT id FROM forum_threads WHERE id=? AND deleted=0').get(req.params.id);if(!thread)return res.status(404).json({error:'Nie znaleziono wątku'});const r=db.prepare('INSERT INTO forum_replies(thread_id,body,author_id) VALUES (?,?,?)').run(req.params.id,body,req.user.id);res.json({ok:true,id:r.lastInsertRowid});});
app.delete('/api/forum/threads/:id',auth(),(req,res)=>{const t=db.prepare('SELECT author_id FROM forum_threads WHERE id=?').get(req.params.id);if(!t)return res.status(404).json({error:'Brak wątku'});if(t.author_id!==req.user.id&&!req.user.is_admin)return res.status(403).json({error:'Brak uprawnień'});db.prepare('UPDATE forum_threads SET deleted=1 WHERE id=?').run(req.params.id);res.json({ok:true});});
app.delete('/api/forum/replies/:id',auth(),(req,res)=>{const r=db.prepare('SELECT author_id FROM forum_replies WHERE id=?').get(req.params.id);if(!r)return res.status(404).json({error:'Brak odpowiedzi'});if(r.author_id!==req.user.id&&!req.user.is_admin)return res.status(403).json({error:'Brak uprawnień'});db.prepare('UPDATE forum_replies SET deleted=1 WHERE id=?').run(req.params.id);res.json({ok:true});});

app.get('/api/admin/stats',auth(),(req,res)=>{if(!requireAdmin(req,res))return;res.json({totalUsers:db.prepare('SELECT COUNT(*) c FROM users').get().c,proUsers:db.prepare('SELECT COUNT(*) c FROM users WHERE is_pro=1').get().c,totalGames:db.prepare('SELECT COUNT(*) c FROM game_scores').get().c,totalXp:db.prepare('SELECT COALESCE(SUM(xp),0) s FROM users').get().s,totalCollectibles:db.prepare('SELECT COUNT(*) c FROM collection').get().c});});
app.get('/api/admin/users',auth(),(req,res)=>{if(!requireAdmin(req,res))return;const q=String(req.query.q||'').trim().toLowerCase();let users=db.prepare('SELECT id,name,email,xp,is_pro,is_admin,created_at FROM users ORDER BY created_at DESC').all();if(q)users=users.filter(u=>u.name.toLowerCase().includes(q)||u.email.toLowerCase().includes(q)||String(u.id)===q);users=users.slice(0,200).map(u=>({...u,isPro:!!u.is_pro,isAdmin:!!u.is_admin,...levelInfo(u.xp),multiplier:computeCollectionMultiplier(u.id)}));res.json({users});});
app.get('/api/admin/audit',auth(),(req,res)=>{if(!requireAdmin(req,res))return;const rows=db.prepare(`SELECT a.*,actor.name actor_name,target.name target_name,target.email target_email FROM admin_audit_log a JOIN users actor ON actor.id=a.actor_user_id LEFT JOIN users target ON target.id=a.target_user_id ORDER BY a.created_at DESC LIMIT 100`).all();res.json({rows});});
app.post('/api/admin/add-xp',auth(),(req,res)=>{
  if(!requireAdmin(req,res))return;const userId=Number(req.body?.userId),amount=Math.floor(Number(req.body?.amount));
  if(!Number.isInteger(userId)||!Number.isInteger(amount)||amount<=0||amount>100000000)return res.status(400).json({error:'Podaj poprawne userId i ilość XP 1–100 000 000'});
  const target=db.prepare('SELECT id,xp,name,email FROM users WHERE id=?').get(userId);if(!target)return res.status(404).json({error:'Nie znaleziono użytkownika'});
  const award=awardXp({userId,baseXp:amount,sourceType:'admin',actorUserId:req.user.id,applyMultiplier:false});
  const newXp=target.xp+award.finalXp;db.prepare('INSERT INTO admin_audit_log(actor_user_id,target_user_id,action,amount,details) VALUES (?,?,?,?,?)').run(req.user.id,userId,'ADD_XP',amount,JSON.stringify({beforeXp:target.xp,afterXp:newXp,hatchXp:award.hatchXp,warmedEggs:award.warmedEggs||0}));
  res.json({ok:true,userId,amount,newXp,hatchXp:award.hatchXp,warmedEggs:award.warmedEggs||0,...levelInfo(newXp)});
});
app.post('/api/admin/users/:id/pro',auth(),(req,res)=>{if(!requireAdmin(req,res))return;db.prepare("UPDATE users SET is_pro=?,pro_since=CASE WHEN ? THEN datetime('now') ELSE pro_since END WHERE id=?").run(req.body?.isPro?1:0,req.body?.isPro?1:0,req.params.id);res.json({ok:true});});

app.get('*',(req,res,next)=>{if(req.path.startsWith('/api/'))return next();const direct=path.join(__dirname,'public',req.path),html=path.join(__dirname,'public',req.path+'.html');if(fs.existsSync(direct)&&fs.statSync(direct).isFile())return res.sendFile(direct);if(fs.existsSync(html))return res.sendFile(html);res.sendFile(path.join(__dirname,'public','index.html'));});

app.listen(PORT,'0.0.0.0',()=>console.log(`Dinocademy server running on port ${PORT}`));
