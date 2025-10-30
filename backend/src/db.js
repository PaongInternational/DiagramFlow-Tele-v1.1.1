import Database from 'better-sqlite3';
import fs from 'fs';
if (!fs.existsSync('./data')) fs.mkdirSync('./data', { recursive: true });
const db = new Database('./data/df.sqlite');
db.exec(`
CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, login TEXT, gh_token TEXT, avatar TEXT, email TEXT, created_at INTEGER);
CREATE TABLE IF NOT EXISTS configs (k TEXT PRIMARY KEY, v TEXT);
CREATE TABLE IF NOT EXISTS flows (id TEXT PRIMARY KEY, json TEXT);
CREATE TABLE IF NOT EXISTS plugins (name TEXT PRIMARY KEY, meta TEXT, repo TEXT, installed_at INTEGER);
`);
export function setConfig(k,v){ db.prepare('INSERT OR REPLACE INTO configs(k,v) VALUES(?,?)').run(k,v) }
export function getConfig(k){ const r=db.prepare('SELECT v FROM configs WHERE k=?').get(k); return r? r.v:null }
export default db;
