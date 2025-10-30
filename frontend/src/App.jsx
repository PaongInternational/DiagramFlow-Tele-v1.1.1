import React, {useState,useEffect} from 'react'
import Dashboard from './pages/Dashboard'
import BotSettings from './pages/BotSettings'
import Plugins from './pages/Plugins'
import ImportGit from './pages/ImportGit'
import Terminal from './pages/Terminal'
import Setup from './pages/Setup'
import API from './api'
export default function App(){
  const [view,setView]=useState('setup')
  const [user,setUser]=useState(null)
  useEffect(()=>{ if(window.location.search.includes('gh=1')){ API.get('/github/session').then(r=>setUser(r.data.user)).catch(()=>{}) } },[])
  return (
    <div className='app'>
      <div className='sidebar card'>
        <div className='logo'><img src='https://cdn.yupra.my.id/yp/qm656enk.jpg' alt='logo'/><div><div style={{fontWeight:700,fontSize:18}}>DiagramFlow-Tele</div><div style={{fontSize:12,color:'#9aa9c2'}}>n8n-like · GitHub plugins</div></div></div>
        <div style={{marginTop:14}} className='nav'>
          <button onClick={()=>setView('dashboard')}>Dashboard</button>
          <button onClick={()=>setView('bot')}>Bot Settings</button>
          <button onClick={()=>setView('plugins')}>Plugins</button>
          <button onClick={()=>setView('import')}>Import</button>
          <button onClick={()=>setView('terminal')}>Terminal</button>
        </div>
        <div style={{marginTop:12}} className='footer'>Credit: Paong & Evelyn (Main Developer: Paong)</div>
        <div style={{marginTop:12}}><a className='button' href='https://whatsapp.com/channel/0029Vb6cgi6LSmbec90kZv02' target='_blank' rel='noreferrer'>Join Community</a></div>
      </div>
      <div className='content'>
        {view==='dashboard' && <Dashboard user={user}/>} 
        {view==='bot' && <BotSettings/>}
        {view==='plugins' && <Plugins/>}
        {view==='import' && <ImportGit/>}
        {view==='terminal' && <Terminal/>}
        {view==='setup' && <Setup/>}
      </div>
    </div>
  )
}
