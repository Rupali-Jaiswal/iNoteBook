import React, { useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import {
    Link, useLocation
} from "react-router-dom";
import NoteContext from '../context/notes/NoteContext';

export default function Navbar() {
    let location = useLocation()

    useEffect(() => {
        console.log(location.pathname)
    }, [location])

    const { setIsAuthenticated, isAuthenticated } = useContext(NoteContext);
    const logout = () => {
        // Implement your logout logic here
        localStorage.removeItem("token")
        setIsAuthenticated(false);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark text-white ">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" href="#"> <FontAwesomeIcon icon={faNoteSticky} /> iNotebook</Link>
                {
                    isAuthenticated? <Link>  <button className="btn btn-primary" onClick={() => { logout() }} to="/">Logout</button></Link>:<></>
                }
                </div>
            </nav>
        </div>
    )
}