import React, { useEffect, useContext, } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky, faBars } from '@fortawesome/free-solid-svg-icons';
import {
    Link, useLocation,
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
        <div style={{width:"100%"}}>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid ">
                    <div>
                    <Link className="navbar-brand text-white link-custom" to={'/'}><FontAwesomeIcon icon={faNoteSticky} /> iNoteBook</Link>
                    {
                            isAuthenticated ? <><span className=" text-white   d-none">
                                <Link to={'/'} onClick={logout} className=' btn btn-light' >Logout</Link>
                            </span></> : <><span className=" text-white d-lg-none">
                                <Link to={'/SignUP'} className=' btn btn-light' >SignUP</Link>
                            </span></>
                    }
                    </div>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" ><span className="navbar-toggler-icon " style={{ color: "white" }} ><FontAwesomeIcon icon={faBars} style={{ display: 'block' }} /></span>
                    </button>

                    <div className="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarNav">
                        <ul className="navbar-nav">
                            {isAuthenticated? <><li className="nav-item">
                                <Link className="nav-link active text-white link-custom" aria-current="page" to={'/Main'}>Home</Link>
                            </li></>:<><li className="nav-item">
                                <Link className="nav-link active text-white link-custom" aria-current="page"  to={'/'}>Home</Link>
                            </li></>}
                            {
                                isAuthenticated ? <><li className="nav-item">
                                    <Link className="nav-link text-white link-custom" to={'/Notes'}>Your Notes</Link>
                                </li></> : <></>
                            }
                            <li className="nav-item">
                                <Link className="nav-link text-white link-custom" to={'/Services'}>Services</Link>
                            </li>
                        </ul>
                        {
                            isAuthenticated ? <><span className=" text-white ">
                                <Link to={'/'} onClick={logout} className=' btn btn-light' >Logout</Link>
                            </span></> : <><span className=" text-white ">
                                <Link to={'/SignUP'} className='btn btn-light' >SignUP</Link>
                            </span></>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}