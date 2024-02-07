import React, { useContext } from 'react'
import Note from './Note'
import NoteContext from '../context/notes/NoteContext'

export default function Notes() {
  const{notes,addNote,deleteNote}=useContext(NoteContext)
  return (
    <div id="note">
      {notes.map((x)=>{
      return <Note title={x.title} description={x.description}/>
    })}
    </div>
  )
}
