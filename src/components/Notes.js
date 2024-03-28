import React, { useContext, useState, useRef, useEffect } from 'react'
import Note from './Note'
import NoteContext from '../context/notes/NoteContext'


export default function Notes() {
    const { notes, getToken, setnotes } = useContext(NoteContext)
    const [note, setnote] = useState({ title: "", description: "" })
    const ref = useRef(null)
    const [Id,setId]=useState(null)
    const [status,setstatus]=useState(0)


    useEffect(() => {
        getNote()
    }, [status])

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


    const updateNote = async (id,title,description) => {
        const token = getToken()
        const host = 'http://localhost:5000'
        try {
            const url = `${host}/api/note/updateNote`
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': token,
                    'id':id,
                },
                credentials: 'include',
                body: JSON.stringify({title:title,description:description})
            });
            console.log(id)
            console.log(await response.json())
            if (response.ok) {
                const newNote = notes.filter((note) => { return note._id !== id })
                setstatus(status+1)
                await setnotes(newNote)
            }
        }
        catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    const handleUpdateIcon = async (id,title,description) => {
        setnote({title:title,description:description})
        ref.current.click()
        setId(id)
    }

    const onsubmit = async(e) => {
        e.preventDefault()
        await updateNote(Id,note.title,note.description)
    }

    const handleChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h5 className='mx-5'>{notes.length !== 0 && 'Your Notes'}</h5>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{ display: "none" }}>
                Launch demo modal
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"  >
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form className='container' id='add_note' onSubmit={onsubmit} style={{ width: "400px", marginTop: "10px" }} >
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" name="title" value={note.title} id="title" onChange={handleChange} placeholder="Title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea type="text" className="form-control" name='description' value={note.description} id="description" onChange={handleChange} placeholder="description" />
                                </div>
                                <button type="submit " className="btn btn-primary mx-1" data-bs-dismiss="modal">Submit</button>
                                <button type="button" class="btn btn-secondary mx-1" data-bs-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="note">
                {Array.isArray(notes) && notes.map((x) => {
                    return <Note title={x.title} description={x.description} key={x._id} id={x._id} handleUpdateIcon={handleUpdateIcon} />
                })}
            </div>
        </div>
    )
}
