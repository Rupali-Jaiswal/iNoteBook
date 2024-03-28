import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
  const { emailHelp, isAuthenticated, setIsAuthenticated, setUserCreated,
    setUserName, saveToken, getToken } = useContext(NoteContext)
  const [user, setuser] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const getUser = async () => {
    const host = 'http://localhost:5000'
    const token = getToken()
    try {
      const url = `${host}/api/auth/getUser`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        credentials: 'include',
      })
      const user = await response.json()
      console.log("Retrived user details:")
      console.log(user)
      return user
    } catch (error) {
      console.log(error)
    }
  }



  const login = async (user) => {
    setUserCreated(false)
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
        const name = login_res.name
        setUserName(name)
        await saveToken(token)
        setIsAuthenticated(true)
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
    const status=await login(user)
    navigate('/Main')
    if(status){
    getUser()}
  }

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
       <div className='container' style={{ width: "400px", marginTop: "50px",}}>
          <h4 className="text-centre" style={{textAlign:"center" ,fontSize:"25px",fontFamily:" Arial, Helvetica, sans-serif"}}>Get Started</h4>
          <form className='card' style={{ padding: "30px" }} onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange} />
              <div id="emailHelp" className="form-text">{emailHelp}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} />
            </div>
            <button className="btn btn-dark" type='submit'>Login</button>
            <div className="form-text" >Didn't have Account? Click on <Link to='/SignUp'>Create Account</Link></div>
          </form>
        </div>
    </>
  )
}
