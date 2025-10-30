import express from 'express';
import axios from 'axios';
import { CONFIG } from './config.js';
const router = express.Router();
router.get('/login', (req,res)=>{
  const url = `https://github.com/login/oauth/authorize?client_id=${CONFIG.GITHUB_CLIENT_ID}&scope=repo%20read:user`;
  res.redirect(url);
});
router.get('/callback', async (req,res)=>{
  const code = req.query.code;
  try{
    const tokenRes = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: CONFIG.GITHUB_CLIENT_ID, client_secret: CONFIG.GITHUB_CLIENT_SECRET, code
    }, { headers: { Accept: 'application/json' } });
    const token = tokenRes.data.access_token;
    const user = await axios.get('https://api.github.com/user', { headers: { Authorization: `Bearer ${token}` } });
    req.session = req.session || {}; req.session.gh_token = token; req.session.user = user.data;
    res.redirect('http://localhost:5173/?gh=1');
  }catch(e){ res.status(500).json({ error: e.message }); }
});
router.get('/session', (req,res)=>{
  if(req.session && req.session.user) return res.json({ user: req.session.user });
  res.status(401).json({ error: 'not authenticated' });
});
router.post('/import', async (req,res)=>{
  const { repo } = req.body;
  if(!repo) return res.status(400).json({ error: 'repo required' });
  try{
    const archive = `https://github.com/${repo}/archive/refs/heads/main.zip`;
    res.json({ ok:true, archive });
  }catch(e){ res.status(500).json({ error: e.message }) }
});
export default router;
