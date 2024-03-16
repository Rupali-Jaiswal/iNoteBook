import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { Link } from 'react-router-dom'
export default function Login() {
  const { login ,emailHelp,isAuthenticated,getUser,setIsAuthenticated} = useContext(NoteContext)
  const [user, setuser] = useState({ email: "", password: "" })

  const handleLogin =() =>{
      login(user)
  }
  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div style={{ width: "100%", backgroundImage: "url('bg.jpg')", backgroundSize: "cover" }}>
        <div className='container' style={{ width: "400px", marginTop: "50px" }}>
          <h4 className="ml-5">Please Login/SignUp First</h4>
          <form className='card' style={{ padding: "30px" }}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange} />
              <div id="emailHelp" className="form-text">{emailHelp}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} />
            </div>
            <Link className="btn btn-primary" onClick={handleLogin} to='/' >Login</Link>
            <div className="form-text" >Didn't have Account? Click on <Link to='/signUp'>Create Account</Link></div>
          </form>
        </div>
      </div>
    </>
  )
}
