import NoteContext from "./NoteContext";
import React from "react";
import { useState } from "react";

const NoteState = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailHelp, setemailHelp] = useState("We'll never share your email with anyone else.")
  const [userName, setUserName] = useState("")
  const [notes, setnotes] = useState([])
  
  const getUser = async () => {
    const host = 'http://localhost:5000'
    const token = getToken()
    try {
      const url = `${host}/api/auth/getUser`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        credentials: 'include',
      })
      const user = await response.json()
      const name = user.name
      setUserName(name)
      setIsAuthenticated(true)
      console.log("Retrived user details:")
      console.log(user)
      return user
    } catch (error) {
      console.log(error)
    }
  }


  window.close = function () {
    localStorage.removeItem('token');
    return '';
  };

  const capatalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const saveToken = (token) => {
    return localStorage.setItem("token", token)
  }

  const getToken = () => {
    return localStorage.getItem("token")
  }


  return (
    <NoteContext.Provider value={{ notes, capatalize, isAuthenticated, userName, setUserName, getToken, setIsAuthenticated,saveToken, setnotes, emailHelp ,getUser,setemailHelp}}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState