import NoteContext from "./NoteContext";
import React, { useEffect } from "react";
import { useState } from "react";

const NoteState = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailHelp, setemailHelp] = useState("We'll never share your email with anyone else.")
  const [userName, setUserName] = useState("")
  const [notes, setnotes] = useState([])
  const [UserCreated, setUserCreated] = useState(false)
  window.onbeforeunload = function () {
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
    <NoteContext.Provider value={{ notes, capatalize, isAuthenticated, userName, setUserName, getToken, setIsAuthenticated, UserCreated, setUserCreated, saveToken, setnotes, emailHelp }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState