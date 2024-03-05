import React, { useContext, useState ,useEffect} from 'react'
import Note from './Note'
import NoteContext from '../context/notes/NoteContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Notes() {
  const { notes, addNote ,getNote} = useContext(NoteContext)
  const [note,setnote]=useState({title:"", description:"", tag:""})

  const onsubmit=(e)=>{
    e.preventDefault()
    addNote(note)
  }

  useEffect(()=>{
    getNote()
  }, [])

  const handleChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }

  return (
    <div>
      <form id='add_note' onSubmit={onsubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" name="title" id="title"  onChange={handleChange} placeholder="Title"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" name='description'  id="description"  onChange={handleChange} placeholder="description" />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Description</label>
          <input type="text" className="form-control" name='tag'  id="tag"  onChange={handleChange} placeholder="tag" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div id="note">
        <button type="button" className="btn btn-light note" style={{ "marginLeft": "20px", "marginTop": "20px" }}><FontAwesomeIcon icon={faPlus} /></button>
        {Array.isArray(notes)&&notes.map((x) => {
          return <Note title={x.title} description={x.description} id={x.id} />
        })}
      </div>
    </div>
  )
}
