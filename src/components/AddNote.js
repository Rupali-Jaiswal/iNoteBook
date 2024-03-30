import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function AddNote() {
  const {  getToken, notes, setnotes ,userName,capatalize,getUser} = useContext(NoteContext)
  const [note, setnote] = useState({ title: "", description: "",  })
  const [status,setStatus]=useState(0)
  useEffect(() => {
    getUser()
    getNote()
  },[status])

  

  const getNote = async () => {
    const token = getToken()
    const host = 'http://localhost:5000'
    try {
      const url = `${host}/api/note/fetchNote`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        credentials: 'include',
      });
      const res_note = await response.json();
      await setnotes(res_note)
      console.log("fetched note:")
      console.log(res_note)
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (note) => {
    const token = getToken()
    const host = 'http://localhost:5000'
    try {
      const url = `${host}/api/note/addNote`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
          'Authorization': token
        },
        credentials: 'include',
        body: JSON.stringify({ title: note.title, description: note.description })

      });
      if(response.ok){
        const res_note = await response.json()
        const newNote = notes.filter((note) => { return note._id !== res_note._id })
        setnotes(newNote);
        setStatus(status+1)
        console.log('Your added Note:')
        console.log(res_note)}
        else{
          const err=await response.json()
          return alert(err.msg)
        }
        }
    catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  const onsubmit = (e) => {
    e.preventDefault()
    addNote(note)
  }
  const handleClear=(e)=>{
    setnote({title:"",description:""})
  }

  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div style={{width:"100%"}}>
      <form className='container' id='add_note' onSubmit={onsubmit}  >
        <div className="form-group text-white mt-3">
          <h3 className=''>Hi {capatalize(userName)}</h3>
          <h5>Add Your Note</h5>
          <input type="text" className="form-control inputHover" name="title" value={note.title} id="title" onChange={handleChange} placeholder="Title" required="true" />
        </div>
        <div className="form-group">
          <textarea type="text" className="form-control inputHover" name='description' value={note.description} id="description" onChange={handleChange} placeholder="description" rows="8" cols="200" required="true"/>
        </div>
        <button type="submit" className="btn" style={{backgroundColor:"black", color:"white", }}>Save</button>
        <div  className="btn ml-1" onClick={handleClear} style={{backgroundColor:"black", color:"white", }}>Clear</div>
      </form>
    </div>
  )
}
