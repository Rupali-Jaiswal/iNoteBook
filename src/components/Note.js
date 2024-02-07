import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Note(props) {
  const {title,description}=props;
  return (
    <div>
      <div id="card" className="card mt-3 mx-2 p-xl-4">
        <div className="card-body ">
          <div className="container d-flex flex-row">
          <h5 className="card-title" style={{margin:"5px", padding:"2px"}}>{title}</h5>
          <a href='/' style={{margin:"5px", padding:"2px"}}><FontAwesomeIcon icon={faPenToSquare} /></a>
          <a href='/'style={{margin:"5px", padding:"2px"}}><FontAwesomeIcon icon={faTrash} /></a>
          </div>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  )
}