import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faMicrophoneSlash,faPause } from '@fortawesome/free-solid-svg-icons';
import { host } from '../BaseUrl'


export default function AddNote() {
  const { getToken, notes, setnotes, userName, capatalize, getUser } = useContext(NoteContext)
  const [note, setnote] = useState({ title: "", description: "", })
  const [status, setStatus] = useState(0)


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const setTranscript = () => {
    setnote({ ...note, title: "", description: transcript })
    console.log(note)
  }
  useEffect(() => {
    setTranscript()
  }, [transcript])

  useEffect(() => {
    getUser()
    getNote()
  }, [status])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const startlistening = () => {
    SpeechRecognition.startListening({ continuous: true }, { language: 'en-IN' })
  }
  const getNote = async () => {
    const token = getToken()
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
      if (response.ok) {
        const res_note = await response.json()
        const newNote = notes.filter((note) => { return note._id !== res_note._id })
        setnotes(newNote);
        setStatus(status + 1)
        console.log('Your added Note:')
        console.log(res_note)
        return alert('Your note has been saved')
      }
      else {
        const err = await response.json()
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

  const handleClear = (e) => {
    setnote({ title: "", description: "" })
    resetTranscript()
  }

  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  const handleCopy = async () => {
    navigator.clipboard.writeText(note.description).then(() => {
      // Alert the user that the action took place.
      // Nobody likes hidden stuff being done under the hood!
      alert("Copied to clipboard");
    });
  }

  return (
    <div style={{ width: "100%", }}>
      <form className='container' id='add_note' onSubmit={onsubmit}  >
        <div className="form-group text-white mt-3">
          <h3 className=''>Hi {capatalize(userName)}</h3>
          <h5>Add Your Note</h5>
          <input type="text" className="form-control inputHover" name="title" value={note.title} id="title" onChange={handleChange} placeholder="Title" required="true" />
        </div>
        <div className="form-group">
          <textarea type="text" className="form-control inputHover" name='description' value={note.description} id="description" onChange={handleChange} placeholder="Description" rows="11" cols="205" required="true" />
        </div>
        <button type="submit" className="btn btnHover" style={{ backgroundColor: "black", color: "white", }}>Save</button>
        <div className="btn ml-2 btnHover" onClick={handleClear} style={{ backgroundColor: "black", color: "white", }}>Clear</div>
        <div className="btn ml-2 btnHover" onClick={handleCopy} style={{ backgroundColor: "black", color: "white", }}>Copy</div>
        {listening ?<> 
        <div className='btn ml-2 pause pauseHover' onClick={SpeechRecognition.stopListening} style={{ backgroundColor: "red", color: "white", }}><FontAwesomeIcon icon={faPause} /></div></>:
        <> <div className='btn ml-2 microphoneHover'  onClick={() => { startlistening() }} style={{ backgroundColor: "skyblue", color: "black", }}><FontAwesomeIcon icon={faMicrophone} /></div>
       </>}
      </form>
      <div>
      </div>
    </div>
  )
}
