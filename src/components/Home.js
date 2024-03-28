import React from 'react'
import Login from './Login.js'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className='container d-md-flex d-sm-wrap' >
      <div className='container mt-5 welcome d-none d-md-block'>
        <h3 className='mt-5' style={{fontSize:"35px",fontFamily:" Arial, Helvetica, sans-serif"}}>
          Welcome to iNoteBook
        </h3>
        <div style={{fontSize:"19px", fontFamily:" Arial, Helvetica, sans-serif"}}>Enjoy the convenience of syncing your notes across all your devices, ensuring access anytime, anywhere.<br></br>Customize your notebook with fonts, colors, and themes to reflect your personal style. <br></br> Your data is encrypted and secure. </div>
      </div>
      <Login />
    </div>
  )
}

export default Home