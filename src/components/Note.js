import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import NoteContext from '../context/notes/NoteContext'
import { host } from '../BaseUrl'

export default function Note(props) {
  const { title, description, id, handleUpdateIcon } = props;
  const { notes, setnotes, getToken ,capatalize} = useContext(NoteContext)

  const deleteNote = async () => {
    const token = getToken()
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

    const RemoveSpace = (text) => {
    let newtext = text.split(/\s+/);
    return newtext;
  }

  


  return (
    <div>
      <div id="card" className="card m-3 p-xl-4 cardHover" style={{backgroundColor:"whitesmoke" }}>
        <div className="card-body " >
          <div className="d-flex flex-row justify-content-between">
            <h5 className="card-title" style={{ margin: "4px", padding: "2px" }}>{capatalize(title).slice(0,15)}</h5>
            <div style={{margin:"5px"}} >
            <FontAwesomeIcon icon={faPenToSquare} onClick={()=>handleUpdateIcon(id,title,description)} className='cardIcon' style={{padding:"2px", paddingLeft:"10px" ,color:"rgb(41, 64, 83)", cursor:"pointer"}} />
            <FontAwesomeIcon icon={faTrash} onClick={() => { deleteNote() }} className='cardIcon'  style={{padding:"2px", paddingLeft:"10px" ,color:"rgb(41, 64, 83)", cursor:"pointer"}}/>
            </div>
          </div>
          <p className="card-text">{(capatalize(description)).slice(0,90)}</p>
        </div>
      </div>
    </div>
  )
}