import NoteContext from "./NoteContext";
import React, { useEffect } from "react";
import { useState } from "react";

const NoteState = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [emailHelp, setemailHelp] = useState("We'll never share your email with anyone else.")
    const [notes, setnotes] = useState([])
    const[UserCreated,setUserCreated]=useState(false)
    // const[user_id,setuser_id]

    const getUser=async()=>{
      const host = 'http://localhost:5000'
      try {
        const url = `${host}/api/auth/getUser`
        const response=await fetch(url,{
          method:"GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        })
        const user=await response.json()
        console.log(user)
        return user
      } catch (error) {
        console.log(error)
      }
    }
    
    useEffect(()=>{
      if(isAuthenticated){
        getUser()
      }
    },[])

    const login = async (user) => {
      setUserCreated(false)
      const host = 'http://localhost:5000'
      try {
        const url = `${host}/api/auth/login`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: user.email, password: user.password })
        })
        if (response.ok) {
          const user_id=await response.json()
          setIsAuthenticated(true)
          console.log("frontend user logged in")
        }
        else {
          return alert("Invalid credientials")
        }
      } catch (error) {
        console.log(error.msg)
      }
    };

    const createUser = async (user) => {
      const host = 'http://localhost:5000'
      try {
        const url = `${host}/api/auth/createUser`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name:user.name, email: user.email, password: user.password })
        })
        if (response.ok) {
          const res_user=await response.json()
          console.log("frontend created user details")
          console.log(res_user)
          setUserCreated(true)
        }
        else {
          return alert("Invalid credientials")
        }
      } catch (error) {
        console.log(error.msg)
      }
    };
  
    const logout = () => {
      // Implement your logout logic here
      setIsAuthenticated(false);
    };
  
   
  
    
    const getNote = async () => {
      const host = 'http://localhost:5000'
      try {
          const url = `${host}/api/note/fetchNote`
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': "application.json"
              }
          });
          const note = await response.json();
          setnotes([...notes,[note]])
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
        <NoteContext.Provider value={{ notes,isAuthenticated,emailHelp, addNote, deleteNote, editNote,login,logout,getNote,getUser,setIsAuthenticated,createUser,UserCreated }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState