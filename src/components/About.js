import React, { useEffect } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function About () {
    const a=useContext(NoteContext)
  return ( 
    <div>About</div>
  )
}
