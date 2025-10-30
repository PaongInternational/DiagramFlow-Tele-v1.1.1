import express from 'express';
import { installFromGit, listInstalled, removePlugin } from './pluginManager.js';
const router = express.Router();
router.get('/', (req,res)=>{ res.json({ plugins: listInstalled() }) });
router.post('/install', async (req,res)=>{ const { repo, name } = req.body; try{ const out = await installFromGit(repo, name); res.json(out); }catch(e){ res.status(500).json({ error: e.message }) } });
router.post('/remove', async (req,res)=>{ const { name } = req.body; try{ const out = await removePlugin(name); res.json(out); }catch(e){ res.status(500).json({ error: e.message }) } });
export default router;
