import path from 'path';
import fs from 'fs';
import simpleGit from 'simple-git';
import { CONFIG } from './config.js';
import { registerPlugin, listPlugins } from './db.js';
export async function installFromGit(repo, name){
  const dest = path.join(CONFIG.PLUGINS_DIR, name || repo.replace('/','-'));
  if (!fs.existsSync(CONFIG.PLUGINS_DIR)) fs.mkdirSync(CONFIG.PLUGINS_DIR, { recursive: true });
  const git = simpleGit();
  await git.clone(`https://github.com/${repo}.git`, dest);
  try{
    const metaPath = path.join(dest,'plugin.json');
    const meta = JSON.parse(fs.readFileSync(metaPath));
    registerPlugin(meta.name || name, meta, repo);
    return { ok:true, name: meta.name || name };
  }catch(e){
    return { ok:false, error:e.message };
  }
}
export function listInstalled(){ return listPlugins(); }
export async function removePlugin(name){
  const dest = path.join(CONFIG.PLUGINS_DIR, name);
  if(fs.existsSync(dest)){ fs.rmSync(dest, { recursive:true, force:true }); return { ok:true }; }
  return { ok:false, error:'not found' };
}
