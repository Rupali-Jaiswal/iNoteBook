import React from 'react'
import { useContext, useState, } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useNavigate}from 'react-router-dom'
export default function SighUP() {
  const { saveToken, getUser} = useContext(NoteContext)
  const [user, setuser] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()
  const createUser = async (user) => {
    const host = 'http://localhost:5000'
    try {
      const url = `${host}/api/auth/createUser`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
      })
      if (response.ok) {
        const registered_res = await response.json()
        const token = registered_res.token
        saveToken(token)
        console.log("frontend created user details")
        console.log(registered_res)
        return true
      }
      else {
        return alert("Invalid credientials")
      }
    } catch (error) {
      console.log(error.msg)
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault()
    const status =await createUser(user)
    if(status){
     getUser() 
    navigate('/Main')}
  }

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div style={{ width: "100%", backgroundImage: "url(bg.jpg)", backgroundSize: "cover" }}>
        <div className='container' style={{ width: "400px", marginTop: "40px" }}>
          <h4 className="ml-5">Create Your User Account</h4>
          <form className='card' style={{ padding: "25px" }} onSubmit={handleCreate}>
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputPassword1" name='name' onChange={handleChange} />
              </div>
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword2" name='password' onChange={handleChange} />
            </div>
            <button className="btn btn-primary">Create User</button>
          </form>
        </div>
      </div>
    </>
  )
}
