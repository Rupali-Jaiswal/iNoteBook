import NoteContext from "./NoteContext";
import React from "react";
import { useState } from "react";
const NoteState = (props) => {

    const host = 'http://localhost:5000'
    const [notes, setnotes] = useState([])


    const getNote = async () => {
        try {
            const url = `${host}/api/note/fetchNote`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'content-type': "application.json"
                }
            });
            const data = await response.json();
            setnotes(data); // Assuming your data is an array
            console.log("notes" + notes)
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    
    const addNote = (note) => {
        setnotes([...notes, note]);
    }

    const deleteNote = (id) => {
        console.log("id=" + id)
        const newNote = notes.filter((note) => { return note.id !== id })
        setnotes(newNote)
    }

    const editNote = (id) => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState