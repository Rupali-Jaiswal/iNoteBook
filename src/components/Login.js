import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
export default function Login(props) {
  const { 
  saveToken, getUser,setIsAuthenticated } = useContext(NoteContext)
  const [user, setuser] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleClose=()=>{
    props.handleToggle()
  }


  const login = async (user) => {
    const host = 'http://localhost:5000'
    try {
      const url = `${host}/api/auth/login`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, password: user.password })
      })
      const login_res = await response.json()
      if (response.ok) {
        const token = login_res.token
        await saveToken(token)
        setIsAuthenticated(true)
        props.handleToggle()
        console.log("frontend user logged in " + token)
        return true
      }
      else {
        return alert("Please Login with Correct Credentials")
      }
    } catch (error) {
      console.log(error.msg)
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    const status = await login(user)
    if (status) {
      navigate('/Main')
      getUser()
    }
  }

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div >
        <div className="d-flex h-100">
          <div className="card Card">
            <div className="card-header Card-header d-flex justify-content-between">
              <h3>Sign In</h3>
              <h4 style={{cursor:"pointer", color:"white"}} onClick={handleClose}>&#x2715;</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope}/></span>
                  </div>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange} placeholder='Username' required="true" />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon={faKey}/></span>
                  </div>
                  <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} placeholder='Password' required="true"/>
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox"/>Remember Me
                </div>
                <div className="form-group">
                  <input type="submit" value="Login"  className="btn float-right login_btn"/>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<Link to="/SignUp" onClick={props.handleToggle}>Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
