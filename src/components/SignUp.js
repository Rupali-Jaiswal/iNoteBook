import React from 'react'
import { useContext, useState, } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

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
      const registered_res = await response.json()
      if (response.ok) {
        const token = registered_res.token
        saveToken(token)
        console.log("frontend created user details")
        console.log(registered_res)
        return true
      }
      else {
        return alert(JSON.stringify(registered_res))
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
      <div style={{width:"100%"}}>
      <div className="container" style={{height:"90vh"}}>
        <div className="container d-flex justify-content-center  h-100">
          <div className="card Card">
            <div className="card-header Card-header d-flex justify-content-between">
              <h3>SignUp</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleCreate}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon={faUser}/></span>
                  </div>
                  <input type="name" className="form-control" id="exampleInputName1" aria-describedby="name" name="name" onChange={handleChange} placeholder='Name' required="true"  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope}/></span>
                  </div>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange} placeholder='Email' required="true" />
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
                  <input type="submit" value="SignUp" className="btn float-right login_btn"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
