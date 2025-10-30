import React, {useState} from 'react'
import API from '../api'
export default function Setup(){
  const [form,setForm]=useState({GITHUB_CLIENT_ID:'', GITHUB_CLIENT_SECRET:'', SESSION_SECRET:'', TELEGRAM_BOT_TOKEN:'', OWNER_ID:''})
  const [status,setStatus]=useState('')
  async function save(){ setStatus('Saving...'); try{ const r = await API.post('/config/setup', form); setStatus('Saved: '+(r.data.written||'')); }catch(e){ setStatus('Error: '+(e.response?.data?.error||e.message)) } }
  return (<div>
    <h2>Setup</h2>
    <div className='card'>
      <label>GitHub Client ID</label>
      <input className='input' value={form.GITHUB_CLIENT_ID} onChange={e=>setForm({...form, GITHUB_CLIENT_ID:e.target.value})} />
      <label>GitHub Client Secret</label>
      <input className='input' value={form.GITHUB_CLIENT_SECRET} onChange={e=>setForm({...form, GITHUB_CLIENT_SECRET:e.target.value})} />
      <label>Session Secret</label>
      <input className='input' value={form.SESSION_SECRET} onChange={e=>setForm({...form, SESSION_SECRET:e.target.value})} />
      <label>Telegram Bot Token (optional)</label>
      <input className='input' value={form.TELEGRAM_BOT_TOKEN} onChange={e=>setForm({...form, TELEGRAM_BOT_TOKEN:e.target.value})} />
      <label>Owner ID (optional)</label>
      <input className='input' value={form.OWNER_ID} onChange={e=>setForm({...form, OWNER_ID:e.target.value})} />
      <div style={{marginTop:10}}><button className='button' onClick={save}>Save Configuration</button></div>
      <div style={{marginTop:8,color:'#9aa9c2'}}>{status}</div>
    </div>
  </div>)
}
