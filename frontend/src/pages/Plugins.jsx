import React,{useEffect,useState} from 'react'
import API from '../api'
export default function Plugins(){
  const [list,setList]=useState([])
  const [repo,setRepo]=useState('')
  useEffect(()=>{ load() },[])
  function load(){ API.get('/plugin').then(r=>setList(r.data.plugins)).catch(()=>{}) }
  async function install(){ if(!repo) return alert('owner/repo required'); const r=await API.post('/plugin/install',{ repo }); alert(JSON.stringify(r.data)); load() }
  async function remove(name){ if(!confirm('Remove '+name+'?')) return; const r=await API.post('/plugin/remove',{ name }); alert(JSON.stringify(r.data)); load() }
  return (<div>
    <h2>Plugin Manager</h2>
    <div className='card'>
      <label>Install from GitHub (owner/repo)</label>
      <input className='input' value={repo} onChange={e=>setRepo(e.target.value)} placeholder='owner/repo' />
      <div style={{marginTop:10}}><button className='button' onClick={install}>Install</button></div>
    </div>
    <div style={{height:12}} />
    <div className='card'>
      <h4>Installed</h4>
      <ul>{list.map(p=> <li key={p.name}>{p.name} - {p.meta.description||''} <button onClick={()=>remove(p.name)}>Remove</button></li>)}</ul>
    </div>
  </div>)
}
