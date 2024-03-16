import React from 'react'
import { Link } from 'react-router-dom'
import { useContext,useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
export default function SighUP() {
    const { createUser } = useContext(NoteContext)
  const [user, setuser] = useState({ name:"",email: "", password: "" })

    const handleCreate =async (e) => {
        e.preventDefault()
        await createUser(user)
    }
    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
      }
    return (
        <>
           <div style={{width:"100%", backgroundImage:"url(bg.jpg)",backgroundSize:"cover"}}>
           <div className='container' style={{ width: "400px", marginTop: "40px" }}>
                <h4 className="ml-5">Create Your User Account</h4>
                <form  className='card' style={{ padding: "25px" }}>
                    <div className="mb-3">
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" name='name' onChange={handleChange}/>
                        </div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email'onChange={handleChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2" name='password'onChange={handleChange} />
                    </div>
                    <Link className="btn btn-primary" onClick={handleCreate}to={'/login'}>Create User</Link>
                </form>
            </div>
           </div>
        </>
    )
}
