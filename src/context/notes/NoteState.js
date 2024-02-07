import NoteContext from "./NoteContext";
import React from "react";
import { useState } from "react";
const NoteState=(props)=>{
    const notei=[{
        title:"1st title",
        description:"1 this is description"
    },
    {
        title:"1st title",
        description:"2 this is description"
    },
    {
        title:"1st title",
        description:"3 this is description"
    },
    {
        title:"1st title",
        description:"4 this is description"
    }]
    const [notes, setnotes]=useState(notei)

    const addNote=()=>{

    }

    const deleteNote=()=>{

    }

    const editNote=()=>{
        
    }

    return(
       <NoteContext.Provider value={{notes:notes,addNote:addNote,deleteNote:deleteNote,editNote:editNote}}>
        {props.children}
       </NoteContext.Provider>
    )
}


export default NoteState