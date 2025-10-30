import React,{useState} from 'react'
import API from '../api'
export default function ImportGit(){ const [repo,setRepo]=useState('')
  async function imp(){ if(!repo) return alert('owner/repo required'); const r = await API.post('/github/import',{ repo }); alert(JSON.stringify(r.data)); }
  return (<div>
    <h2>Import</h2>
    <div className='card'>
      <label>Repo (owner/repo)</label>
      <input className='input' value={repo} onChange={e=>setRepo(e.target.value)} />
      <div style={{marginTop:10}}><button className='button' onClick={imp}>Fetch Archive</button></div>
    </div>
  </div>)
}
