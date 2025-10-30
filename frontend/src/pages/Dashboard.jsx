import React from 'react'
export default function Dashboard({user}){
  return (<div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div>
        <h1 style={{margin:0}}>Welcome{user? `, ${user.login}`:''}</h1>
        <div style={{color:'#9aa9c2'}}>Responsive automation studio</div>
      </div>
      <div>
        <a className='button' href='http://localhost:3000/api/github/login'>Continue with GitHub</a>
      </div>
    </div>
    <div style={{height:18}}/>
    <div className='card'>
      <h3>Flows</h3>
      <div id='drawflow' style={{height:360,background:'#020617',borderRadius:8}}></div>
    </div>
  </div>)
}
