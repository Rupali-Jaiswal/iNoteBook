import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import NoteContext from '../context/notes/NoteContext'

export default function Note(props) {
  const { title, description, id } = props;
  const { deleteNote } = useContext(NoteContext)
  return (
    <div>
      <div id="card" className="card mt-3 mx-2 p-xl-4">
        <div className="card-body ">
          <div className="container d-flex flex-row">
            <h5 className="card-title" style={{ margin: "5px", padding: "2px" }}>{title}</h5>
            <i style={{ margin: "5px", padding: "2px", color: "blue", cursor:"pointer" }}><FontAwesomeIcon icon={faPenToSquare} /></i>
            <i style={{ margin: "5px", padding: "2px", color: "blue", cursor:"pointer" }} onClick={() => { deleteNote(id) }}>
            <FontAwesomeIcon icon={faTrash} /></i>
        </div>
        <p className="card-text">{description} {id}</p>
      </div>
    </div>
    </div >
  )
}