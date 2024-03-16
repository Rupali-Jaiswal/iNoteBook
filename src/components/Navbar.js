import React, { useEffect,useContext } from 'react'
import {
    Link, useLocation
} from "react-router-dom";
import NoteContext from '../context/notes/NoteContext';

export default function Navbar() {
    let location = useLocation()
    useEffect(() => {
        console.log(location.pathname)
    }, [location])

    const { isAuthenticated, logout } = useContext(NoteContext);

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <Link className="navbar-brand" href="/">Home</Link>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="navbar-brand" onClick={()=>{logout()}} to="/login">Logout</Link>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                </>
            ) : (
                <>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <Link className="navbar-brand" href="#">Your Notebook</Link>
                        </div>
                    </nav>
                </>
            )}
        </div>
    )
}