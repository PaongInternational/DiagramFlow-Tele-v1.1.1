import React,{useState,useEffect} from 'react'
import API from '../api'
export default function BotSettings(){
  const [cfg,setCfg]=useState({TELEGRAM_BOT_TOKEN:'', OWNER_ID:''})
  useEffect(()=>{ API.get('/config').then(r=>setCfg(r.data)).catch(()=>{}) },[])
  async function save(){ await API.post('/config/set', cfg); alert('Saved') }
  async function test(){ try{ const r=await API.post('/config/test-telegram'); alert('Test OK') }catch(e){ alert('Test failed') } }
  return (<div>
    <h2>Bot Settings</h2>
    <div className='card'>
      <label>Telegram Bot Token</label>
      <input className='input' value={cfg.TELEGRAM_BOT_TOKEN||''} onChange={e=>setCfg({...cfg, TELEGRAM_BOT_TOKEN:e.target.value})} />
      <label>Owner ID</label>
      <input className='input' value={cfg.OWNER_ID||''} onChange={e=>setCfg({...cfg, OWNER_ID:e.target.value})} />
      <div style={{marginTop:10}}><button className='button' onClick={save}>Save</button><button className='button' onClick={test} style={{marginLeft:8}}>Test</button></div>
    </div>
  </div>)
}
