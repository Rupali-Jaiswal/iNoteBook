import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

export default function Main() {
 
  return (
    <div className='Notes' style={{width:"100%"}}>
      <AddNote/>
      <Notes/>
    </div>
  )
}
