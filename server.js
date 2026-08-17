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
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

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
 required INTEGER NOT NULL,from_level INTEGER,hatched INTEGER DEFAULT 0,created_at TEXT DEFAULT (datetime('now')),
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS collection (
 id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,dino_id TEXT NOT NULL,rarity TEXT NOT NULL,
 variant TEXT DEFAULT 'normal',level INTEGER DEFAULT 1,xp_bonus INTEGER DEFAULT 0,nickname TEXT,
 hatched_at TEXT DEFAULT (datetime('now')),FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS forum_threads (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL,body TEXT NOT NULL,category_id TEXT NOT NULL,author_id INTEGER NOT NULL,pinned INTEGER DEFAULT 0,deleted INTEGER DEFAULT 0,created_at TEXT DEFAULT (datetime('now')),FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS forum_replies (id INTEGER PRIMARY KEY AUTOINCREMENT,thread_id INTEGER NOT NULL,body TEXT NOT NULL,author_id INTEGER NOT NULL,deleted INTEGER DEFAULT 0,created_at TEXT DEFAULT (datetime('now')),FOREIGN KEY(thread_id) REFERENCES forum_threads(id) ON DELETE CASCADE,FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE CASCADE);
`);

function migrateTable(table, columns) {
 const existing = db.prepare(`PRAGMA table_info(${table})`).all().map(c => c.name);
 Object.entries(columns).forEach(([name, ddl]) => {
  if (!existing.includes(name)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${name} ${ddl}`);
 });
}
migrateTable('users', { is_pro: 'INTEGER DEFAULT 0', pro_since: 'TEXT', is_admin: 'INTEGER DEFAULT 0' });
migrateTable('collection', { variant: "TEXT DEFAULT 'normal'", level: 'INTEGER DEFAULT 1', xp_bonus: 'INTEGER DEFAULT 0' });
try { db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_collection_variant ON collection(user_id,dino_id,variant)'); } catch (_) {}

const ADMIN_EMAIL = 'adamlubanskimc@gmail.com';
(function seedAdmin() {
 const existing = db.prepare('SELECT id FROM users WHERE email=?').get(ADMIN_EMAIL);
 if (existing) return db.prepare('UPDATE users SET is_admin=1 WHERE id=?').run(existing.id);
 const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'ZmienToHasloAdmina123!', 10);
 db.prepare("INSERT INTO users(name,email,password_hash,country,avatar,xp,is_pro,pro_since,is_admin) VALUES (?,?,?,?,?,?,?,datetime('now'),1)")
  .run('Adam Lubański', ADMIN_EMAIL, hash, 'PL', 'trex', 0, 1);
})();

const LEVEL_THRESHOLDS = [0,100,250,500,1000,2000,3500,5500,8000,11000,15000,20000,26000,33000,41000,50000,65000,82000,100000,125000,150000,180000,215000,255000,300000,350000,405000,465000,530000,600000,675000,755000,840000,930000,1025000];
const LEVEL_TITLES = {1:'Nowicjusz',2:'Odkrywca',3:'Badacz',4:'Kolekcjoner',5:'Analityk',6:'Eksplorator',7:'Łowca skamieniałości',8:'Specjalista',9:'Ekspert',10:'Mistrz',11:'Architekt',12:'Weteran',13:'Savant',14:'Autorytet',15:'Lider',16:'Kurator kolekcji',17:'Kartograf epok',18:'Strażnik zapisów kopalnych',19:'Interpretator śladów',20:'Chronista Dinosauria',21:'Mistrz wykluwarni',22:'Władca warstw geologicznych',23:'Pan kredy',24:'Arcybadacz',25:'Legenda archiwów'};
function computeLevel(xp) {
 let level = 1;
 for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
 return xp >= LEVEL_THRESHOLDS.at(-1) ? LEVEL_THRESHOLDS.length + Math.floor((xp - LEVEL_THRESHOLDS.at(-1)) / 120000) : level;
}
function levelInfo(xp) {
 const level = computeLevel(xp || 0);
 const previous = level <= 1 ? 0 : (LEVEL_THRESHOLDS[level - 1] ?? LEVEL_THRESHOLDS.at(-1) + (level - LEVEL_THRESHOLDS.length) * 120000);
 const next = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS.at(-1) + (level - LEVEL_THRESHOLDS.length + 1) * 120000;
 return { level, levelTitle: LEVEL_TITLES[level] || 'Legenda ery mezozoicznej', xpToNext: Math.max(0,next-xp), xpProgress: xp-previous, xpRange: next-previous };
}
function isoDay() { return new Date().toISOString().slice(0,10); }
function markStudyDay(userId) { db.prepare('INSERT OR IGNORE INTO study_days(user_id,study_date) VALUES (?,?)').run(userId,isoDay()); }

function auth(required = true) {
 return (req,res,next) => {
  const token = req.cookies?.session || req.headers['x-session-token'];
  if (!token) { if (required) return res.status(401).json({ error:'Nie zalogowano' }); req.user=null; return next(); }
  const row = db.prepare("SELECT s.user_id,u.name,u.email,u.country,u.avatar,u.xp,u.is_pro,u.pro_since,u.is_admin FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires_at>datetime('now')").get(token);
  if (!row) { if (required) return res.status(401).json({ error:'Sesja wygasła' }); req.user=null; return next(); }
  req.user = { id:row.user_id,name:row.name,email:row.email,country:row.country,avatar:row.avatar,xp:row.xp,is_pro:row.is_pro,is_admin:row.is_admin,pro_since:row.pro_since };
  next();
 };
}
function requireAdmin(req,res) { if (!req.user?.is_admin) { res.status(403).json({error:'Brak uprawnień administratora'}); return false; } return true; }
function requirePro(req,res) { if (!req.user?.is_pro) { res.status(402).json({error:'Gry są dostępne w planie Pro.',needsPro:true}); return false; } return true; }
function sessionResponse(res,user) {
 const token=uuidv4(); db.prepare('INSERT INTO sessions(token,user_id) VALUES (?,?)').run(token,user.id);
 res.cookie('session',token,{httpOnly:true,maxAge:30*24*60*60*1000,sameSite:'lax',secure:process.env.NODE_ENV==='production'});
 res.json({ok:true,token,user:{id:user.id,name:user.name,email:user.email,country:user.country,avatar:user.avatar,xp:user.xp,isPro:!!user.is_pro,isAdmin:!!user.is_admin,...levelInfo(user.xp)}});
}

app.post('/api/register',(req,res)=>{
 const name=String(req.body?.name||'').trim().slice(0,40),email=String(req.body?.email||'').trim().toLowerCase(),password=String(req.body?.password||'');
 if(!name||!email||!password)return res.status(400).json({error:'Wypełnij wszystkie pola'});
 if(password.length<4)return res.status(400).json({error:'Hasło musi mieć minimum 4 znaki'});
 if(db.prepare('SELECT id FROM users WHERE email=?').get(email))return res.status(409).json({error:'Konto z tym e-mailem już istnieje'});
 const result=db.prepare('INSERT INTO users(name,email,password_hash,country) VALUES (?,?,?,?)').run(name,email,bcrypt.hashSync(password,10),String(req.body?.country||'PL').slice(0,4));
 sessionResponse(res,db.prepare('SELECT * FROM users WHERE id=?').get(result.lastInsertRowid));
});
app.post('/api/login',(req,res)=>{
 const user=db.prepare('SELECT * FROM users WHERE email=?').get(String(req.body?.email||'').trim().toLowerCase());
 if(!user||!bcrypt.compareSync(String(req.body?.password||''),user.password_hash))return res.status(401).json({error:'Nieprawidłowy e-mail lub hasło'});
 sessionResponse(res,user);
});
app.post('/api/logout',auth(false),(req,res)=>{const t=req.cookies?.session||req.headers['x-session-token'];if(t)db.prepare('DELETE FROM sessions WHERE token=?').run(t);res.clearCookie('session');res.json({ok:true});});
app.get('/api/me',auth(false),(req,res)=>res.json({user:req.user?{...req.user,isPro:!!req.user.is_pro,isAdmin:!!req.user.is_admin,...levelInfo(req.user.xp)}:null}));

app.get('/api/progress',auth(),(req,res)=>res.json({lessons:db.prepare('SELECT lesson_id FROM lesson_progress WHERE user_id=?').all(req.user.id).map(r=>r.lesson_id)}));
app.post('/api/progress',auth(),(req,res)=>{const lesson=String(req.body?.lesson_id||'');if(!lesson)return res.status(400).json({error:'Brak lesson_id'});const r=db.prepare('INSERT OR IGNORE INTO lesson_progress(user_id,lesson_id) VALUES (?,?)').run(req.user.id,lesson);if(r.changes){db.prepare('UPDATE users SET xp=xp+50 WHERE id=?').run(req.user.id);db.prepare('UPDATE eggs SET warmth=MIN(warmth+50,required) WHERE user_id=? AND hatched=0').run(req.user.id);markStudyDay(req.user.id);}res.json({ok:true,xpAwarded:r.changes?50:0});});

const RARITY={common:{label:'Pospolite',required:120,boost:.005},rare:{label:'Rzadkie',required:260,boost:.01},epic:{label:'Wyjątkowe',required:480,boost:.015}};
const VARIANTS={normal:{label:'Standard',factor:1},shiny:{label:'Shiny',factor:1.25},mutation_bio:{label:'Mutacja biologiczna',factor:1.4},mutation_tech:{label:'Mutacja cybernetyczna',factor:1.5},fossil_glow:{label:'Fosylna poświata',factor:1.3}};
function allDinoIds() {
 const dataPath=path.join(__dirname,'public','assets','recovery-data.js');
 try { const content=fs.readFileSync(dataPath,'utf8'); const ids=[...content.matchAll(/\bid\s*:\s*['\"]([a-z0-9_-]+)['\"]/gi)].map(m=>m[1]); return [...new Set(ids)].filter(x=>!['root','dino'].includes(x)); } catch (_) { return []; }
}
const FALLBACK=['trex','triceratops','stegosaurus','diplodocus','velociraptor','ankylosaurus','spinosaurus','therizinosaurus','anzu','concavenator','qianzhousaurus','struthiosaurus','yi','linhenykus','natovenator','bajadasaurus'];
function dinoPool() { const all=allDinoIds(); return all.length?all:FALLBACK; }
function rarityForIndex(index,total){const p=(index+1)/Math.max(1,total);return p>.85?'epic':p>.55?'rare':'common';}
function pools(){const all=dinoPool();return {common:all.filter((_,i)=>rarityForIndex(i,all.length)==='common'),rare:all.filter((_,i)=>rarityForIndex(i,all.length)==='rare'),epic:all.filter((_,i)=>rarityForIndex(i,all.length)==='epic')};}
function rollRarity(level){const epic=Math.min(.3,.04+level*.002),rare=Math.min(.45,.2+level*.004),r=Math.random();return r<epic?'epic':r<epic+rare?'rare':'common';}
function rollVariant(rarity){const r=Math.random();if(rarity==='epic')return r<.12?'mutation_tech':r<.28?'shiny':r<.45?'fossil_glow':'normal';if(rarity==='rare')return r<.10?'mutation_bio':r<.25?'shiny':'normal';return r<.05?'shiny':'normal';}
function computeCollectionMultiplier(userId){const rows=db.prepare('SELECT level,rarity,variant FROM collection WHERE user_id=?').all(userId);return Math.min(5,rows.reduce((total,row)=>total+(RARITY[row.rarity]?.boost||.005)*(VARIANTS[row.variant]?.factor||1)*Math.max(1,row.level||1),1));}

app.post('/api/scores',auth(false),(req,res)=>{
 if(!req.user)return res.status(401).json({error:'Nie zalogowano'});if(!requirePro(req,res))return;
 const score=Math.max(0,Math.floor(Number(req.body?.score)||0)),game=String(req.body?.game||'Gra').slice(0,80);
 const multiplier=computeCollectionMultiplier(req.user.id),xpAward=Math.floor(Math.floor(score/10)*multiplier);
 db.prepare('INSERT INTO game_scores(user_id,player_name,game,score,xp_awarded) VALUES (?,?,?,?,?)').run(req.user.id,req.user.name,game,score,xpAward);
 db.prepare('UPDATE users SET xp=xp+? WHERE id=?').run(xpAward,req.user.id);
 if(xpAward){db.prepare('UPDATE eggs SET warmth=MIN(warmth+?,required) WHERE user_id=? AND hatched=0').run(xpAward,req.user.id);markStudyDay(req.user.id);}
 res.json({ok:true,xpAwarded:xpAward,multiplier});
});
app.get('/api/scores',(req,res)=>{const rows=db.prepare(`SELECT gs.player_name,gs.game,MAX(gs.score) score,MIN(gs.created_at) first_played,MAX(gs.created_at) last_played,u.xp FROM game_scores gs LEFT JOIN users u ON u.id=gs.user_id GROUP BY gs.player_name,gs.game,u.id ORDER BY score DESC LIMIT 200`).all();res.json({scores:rows.map(x=>({...x,level:x.xp==null?0:computeLevel(x.xp)}))});});
app.delete('/api/scores',auth(),(req,res)=>{if(!requireAdmin(req,res))return;db.prepare('DELETE FROM game_scores').run();res.json({ok:true});});

app.get('/api/hatchery',auth(),(req,res)=>{const u=db.prepare('SELECT xp FROM users WHERE id=?').get(req.user.id),level=computeLevel(u.xp||0),eggs=db.prepare('SELECT id,rarity,warmth,required,from_level,created_at FROM eggs WHERE user_id=? AND hatched=0 ORDER BY id').all(req.user.id),collection=db.prepare('SELECT dino_id,rarity,variant,level,xp_bonus,nickname,hatched_at FROM collection WHERE user_id=? ORDER BY hatched_at DESC').all(req.user.id),claimed=db.prepare('SELECT COUNT(*) c FROM eggs WHERE user_id=?').get(req.user.id).c;res.json({level,xp:u.xp||0,eggsAvailable:Math.max(0,level-claimed),eggs:eggs.map(e=>({...e,label:RARITY[e.rarity].label,ready:e.warmth>=e.required})),collection,collected:collection.length,totalDinos:dinoPool().length,rarities:RARITY,variants:VARIANTS,multiplier:computeCollectionMultiplier(req.user.id)});});
app.post('/api/hatchery/egg',auth(),(req,res)=>{const u=db.prepare('SELECT xp FROM users WHERE id=?').get(req.user.id),level=computeLevel(u.xp||0),claimed=db.prepare('SELECT COUNT(*) c FROM eggs WHERE user_id=?').get(req.user.id).c;if(claimed>=level)return res.status(400).json({error:'Brak dostępnych jaj. Zdobądź kolejny poziom.'});const rarity=rollRarity(level),info=RARITY[rarity],r=db.prepare('INSERT INTO eggs(user_id,rarity,warmth,required,from_level) VALUES (?,?,0,?,?)').run(req.user.id,rarity,info.required,level);res.json({ok:true,egg:{id:r.lastInsertRowid,rarity,label:info.label,warmth:0,required:info.required,ready:false}});});
app.post('/api/hatchery/hatch',auth(),(req,res)=>{const egg=db.prepare('SELECT * FROM eggs WHERE id=? AND user_id=? AND hatched=0').get(Number(req.body?.eggId),req.user.id);if(!egg)return res.status(404).json({error:'Nie znaleziono jaja'});if(egg.warmth<egg.required)return res.status(400).json({error:`Jajo potrzebuje jeszcze ${egg.required-egg.warmth} XP.`});const p=pools(),order=egg.rarity==='epic'?['epic','rare','common']:egg.rarity==='rare'?['rare','epic','common']:['common','rare','epic'];const existing=db.prepare('SELECT dino_id,variant FROM collection WHERE user_id=?').all(req.user.id);let chosen=null,rarity=egg.rarity,variant=rollVariant(egg.rarity);for(const key of order){const fresh=p[key].filter(id=>!existing.some(c=>c.dino_id===id&&c.variant===variant));if(fresh.length){chosen=fresh[Math.floor(Math.random()*fresh.length)];rarity=key;break;}}if(!chosen){chosen=p[egg.rarity][Math.floor(Math.random()*p[egg.rarity].length)]||dinoPool()[0];rarity=egg.rarity;}const old=db.prepare('SELECT * FROM collection WHERE user_id=? AND dino_id=? AND variant=?').get(req.user.id,chosen,variant);let level=1,duplicate=false;if(old){duplicate=true;level=Math.min(100,(old.level||1)+1);db.prepare('UPDATE collection SET level=?,xp_bonus=xp_bonus+? WHERE id=?').run(level,Math.round(egg.required/16),old.id);}else db.prepare('INSERT INTO collection(user_id,dino_id,rarity,variant,level,xp_bonus) VALUES (?,?,?,?,1,?)').run(req.user.id,chosen,rarity,variant,Math.round(egg.required/20));db.prepare('UPDATE eggs SET hatched=1 WHERE id=?').run(egg.id);res.json({ok:true,dinoId:chosen,rarity,variant,level,duplicate});});
app.post('/api/hatchery/nickname',auth(),(req,res)=>{const dinoId=String(req.body?.dinoId||''),nickname=String(req.body?.nickname||'').slice(0,30);const r=db.prepare('UPDATE collection SET nickname=? WHERE user_id=? AND dino_id=?').run(nickname,req.user.id,dinoId);if(!r.changes)return res.status(404).json({error:'Nie masz tego dinozaura'});res.json({ok:true});});

app.get('/api/profile',auth(),(req,res)=>{const user=db.prepare('SELECT id,name,email,country,avatar,xp,is_pro,pro_since,is_admin,created_at FROM users WHERE id=?').get(req.user.id);res.json({...user,isPro:!!user.is_pro,isAdmin:!!user.is_admin,...levelInfo(user.xp),collectionMultiplier:computeCollectionMultiplier(user.id)});});
app.post('/api/profile/country',auth(),(req,res)=>{const value=String(req.body?.country||'').slice(0,4);if(!value)return res.status(400).json({error:'Brak kraju'});db.prepare('UPDATE users SET country=? WHERE id=?').run(value,req.user.id);res.json({ok:true});});
app.post('/api/profile/avatar',auth(),(req,res)=>{const value=String(req.body?.avatar||'').slice(0,40);if(!value)return res.status(400).json({error:'Brak avatara'});db.prepare('UPDATE users SET avatar=? WHERE id=?').run(value,req.user.id);res.json({ok:true});});
app.post('/api/profile/name',auth(),(req,res)=>{const value=String(req.body?.name||'').trim().slice(0,40);if(!value)return res.status(400).json({error:'Brak nazwy'});db.prepare('UPDATE users SET name=? WHERE id=?').run(value,req.user.id);res.json({ok:true});});
app.get('/api/activity',auth(),(req,res)=>{const scores=db.prepare('SELECT game,score,xp_awarded,created_at FROM game_scores WHERE user_id=? ORDER BY created_at DESC LIMIT 10').all(req.user.id),lessons=db.prepare('SELECT lesson_id,completed_at FROM lesson_progress WHERE user_id=? ORDER BY completed_at DESC LIMIT 10').all(req.user.id);res.json({activity:[...scores.map(x=>({type:'game',label:x.game,score:x.score,xp:x.xp_awarded,date:x.created_at})),...lessons.map(x=>({type:'lesson',label:x.lesson_id,xp:50,date:x.completed_at}))].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,15)});});
app.post('/api/pro/activate',auth(),(req,res)=>{db.prepare("UPDATE users SET is_pro=1,pro_since=datetime('now') WHERE id=?").run(req.user.id);res.json({ok:true,isPro:true});});
app.post('/api/pro/cancel',auth(),(req,res)=>{db.prepare('UPDATE users SET is_pro=0 WHERE id=?').run(req.user.id);res.json({ok:true,isPro:false});});

app.get('/api/notes',auth(),(req,res)=>res.json({notes:db.prepare('SELECT * FROM notes WHERE user_id=? ORDER BY created_at DESC').all(req.user.id)}));
app.post('/api/notes',auth(),(req,res)=>{const text=String(req.body?.text||'').trim();if(!text)return res.status(400).json({error:'Brak treści'});const r=db.prepare('INSERT INTO notes(user_id,text) VALUES (?,?)').run(req.user.id,text);res.json({ok:true,note:db.prepare('SELECT * FROM notes WHERE id=?').get(r.lastInsertRowid)});});
app.delete('/api/notes/:id',auth(),(req,res)=>{db.prepare('DELETE FROM notes WHERE id=? AND user_id=?').run(req.params.id,req.user.id);res.json({ok:true});});
app.get('/api/favorites',auth(),(req,res)=>res.json({favorites:db.prepare('SELECT taxon_id FROM favorites WHERE user_id=?').all(req.user.id).map(x=>x.taxon_id)}));
app.post('/api/favorites/toggle',auth(),(req,res)=>{const id=String(req.body?.taxon_id||'');if(!id)return res.status(400).json({error:'Brak taxon_id'});const row=db.prepare('SELECT id FROM favorites WHERE user_id=? AND taxon_id=?').get(req.user.id,id);if(row){db.prepare('DELETE FROM favorites WHERE id=?').run(row.id);return res.json({ok:true,active:false});}db.prepare('INSERT INTO favorites(user_id,taxon_id) VALUES (?,?)').run(req.user.id,id);res.json({ok:true,active:true});});

app.get('/api/admin/stats',auth(),(req,res)=>{if(!requireAdmin(req,res))return;res.json({totalUsers:db.prepare('SELECT COUNT(*) c FROM users').get().c,proUsers:db.prepare('SELECT COUNT(*) c FROM users WHERE is_pro=1').get().c,totalGames:db.prepare('SELECT COUNT(*) c FROM game_scores').get().c,totalXp:db.prepare('SELECT COALESCE(SUM(xp),0) s FROM users').get().s});});
app.get('/api/admin/users',auth(),(req,res)=>{if(!requireAdmin(req,res))return;const users=db.prepare('SELECT id,name,email,xp,is_pro,is_admin,created_at FROM users ORDER BY created_at DESC').all().map(u=>({...u,isPro:!!u.is_pro,isAdmin:!!u.is_admin,...levelInfo(u.xp)}));res.json({users});});
app.post('/api/admin/add-xp',auth(),(req,res)=>{if(!requireAdmin(req,res))return;const userId=Number(req.body?.userId),amount=Math.floor(Number(req.body?.amount));if(!Number.isInteger(userId)||!Number.isInteger(amount)||amount<=0)return res.status(400).json({error:'Podaj poprawne userId i dodatnią ilość XP'});const target=db.prepare('SELECT id,xp FROM users WHERE id=?').get(userId);if(!target)return res.status(404).json({error:'Nie znaleziono użytkownika'});db.transaction(()=>{db.prepare('UPDATE users SET xp=xp+? WHERE id=?').run(amount,userId);db.prepare('UPDATE eggs SET warmth=MIN(warmth+?,required) WHERE user_id=? AND hatched=0').run(amount,userId);})();res.json({ok:true,userId,amount,newXp:target.xp+amount,...levelInfo(target.xp+amount)});});
app.post('/api/admin/users/:id/pro',auth(),(req,res)=>{if(!requireAdmin(req,res))return;db.prepare("UPDATE users SET is_pro=?,pro_since=CASE WHEN ? THEN datetime('now') ELSE pro_since END WHERE id=?").run(req.body?.isPro?1:0,req.body?.isPro?1:0,req.params.id);res.json({ok:true});});

app.get('*',(req,res,next)=>{if(req.path.startsWith('/api/'))return next();const direct=path.join(__dirname,'public',req.path),html=path.join(__dirname,'public',req.path+'.html');if(fs.existsSync(direct)&&fs.statSync(direct).isFile())return res.sendFile(direct);if(fs.existsSync(html))return res.sendFile(html);res.sendFile(path.join(__dirname,'public','index.html'));});
app.listen(PORT,'0.0.0.0',()=>console.log(`Dinocademy server running on port ${PORT}`));
