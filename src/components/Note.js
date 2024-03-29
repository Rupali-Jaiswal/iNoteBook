import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import NoteContext from '../context/notes/NoteContext'

export default function Note(props) {
  const { title, description, id, handleUpdateIcon } = props;
  const { notes, setnotes, getToken ,capatalize} = useContext(NoteContext)

  const deleteNote = async () => {
    const token = getToken()
    const host = 'http://localhost:5000'
    try {
      const url = `${host}/api/note/deleteNote`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': "application/json",
          'Authorization': token,
        },
        credentials: 'include',
        body: JSON.stringify({ id: id })
      });
      console.log(await response.json())
      if (response.ok) {
        const newNote = notes.filter((note) => { return note._id !== id })
        setnotes(newNote)
      }
    }
    catch (error) {
      console.error("Error fetching notes:", error);
    }

  }



  return (
    <div >
      <div id="card" className="card mt-3 ml-4 p-xl-4">
        <div className="card-body ">
          <div className="container d-flex flex-row">
            <h5 className="card-title" style={{ margin: "5px", padding: "2px" }}>{capatalize(title)}</h5>
            <i style={{ margin: "5px", padding: "2px", color: "blue", cursor: "pointer" }}><FontAwesomeIcon icon={faPenToSquare} onClick={()=>handleUpdateIcon(id,title,description)} /></i>
            <i style={{ margin: "5px", padding: "2px", color: "blue", cursor: "pointer" }} onClick={() => { deleteNote() }}>
              <FontAwesomeIcon icon={faTrash} /></i>
          </div>
          <p className="card-text">{capatalize(description)}</p>
        </div>
      </div>
    </div>
  )
}