import React,{useContext} from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

export default function Main() {
 
  return (
    <div>
      <AddNote/>
      <Notes/>
    </div>
  )
}
