import express from 'express';
import { setConfig, getConfig } from '../db.js';
import fs from 'fs';
import path from 'path';
const router = express.Router();
router.get('/',(req,res)=>{ const keys=['TELEGRAM_BOT_TOKEN','OWNER_ID']; const out={}; keys.forEach(k=>out[k]=getConfig(k)); res.json(out); });
router.post('/set',(req,res)=>{ const body=req.body||{}; Object.keys(body).forEach(k=>setConfig(k, body[k])); res.json({ ok:true }); });
router.post('/test-telegram', async (req,res)=>{ const token = getConfig('TELEGRAM_BOT_TOKEN'); if(!token) return res.status(400).json({ error:'telegram token not set' }); try{ const fetch = (await import('node-fetch')).default; const r = await fetch(`https://api.telegram.org/bot${token}/getMe`); const j = await r.json(); res.json({ ok:true, data:j }); }catch(e){ res.status(500).json({ error: e.message }) } });
router.post('/setup', async (req,res)=>{
  const body = req.body || {};
  const entries = {
    PORT: body.PORT || '3000',
    GITHUB_CLIENT_ID: body.GITHUB_CLIENT_ID || '',
    GITHUB_CLIENT_SECRET: body.GITHUB_CLIENT_SECRET || '',
    SESSION_SECRET: body.SESSION_SECRET || 'change_me',
    TELEGRAM_BOT_TOKEN: body.TELEGRAM_BOT_TOKEN || '',
    OWNER_ID: body.OWNER_ID || ''
  };
  const lines = Object.keys(entries).map(k=>`${k}=${entries[k]}`);
  const envPath = path.resolve('./.env');
  try{
    fs.writeFileSync(envPath, lines.join('\n'));
    // apply to process.env
    Object.keys(entries).forEach(k=>process.env[k]=entries[k]);
    res.json({ ok:true, written: envPath });
  }catch(e){ res.status(500).json({ error: e.message }) }
});
export default router;
