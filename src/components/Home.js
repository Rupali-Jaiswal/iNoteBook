import React, { useRef } from 'react';
import Login from './Login.js';

function Home() {
  const ref = useRef(null)

  const handleToggle = () => {
    ref.current.click()
  }
  return (
    <div className='d-center' style={{width:"100%"}}>
      <div className='d-center container'>
        <div className='Container  welcome text-white'>
          <h3 className='mt-5' style={{ fontSize: "35px", fontFamily: "Arial, Helvetica, sans-serif" }}>
            Welcome to iNoteBook
          </h3>
          <div className="" style={{ fontSize: "19px", fontFamily: "Arial, Helvetica, sans-serif" }}>
            Enjoy the convenience of syncing your notes across all your devices, ensuring access anytime, anywhere.<br />
            Customize your notebook with fonts, colors, and themes to reflect your personal style.<br />
            Your data is encrypted and secure.
          </div>
          <button className="btn btn-dark p-2  mt-3 " onClick={handleToggle} type='submit' style={{ backgroundColor: "#141414" }}>Login/Registor</button>
        </div>

        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{ display: "none" }}>
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  modal-dialog-centered ">
            <div className="modal-content " style={{ background: "transparent", border: "none" }}>
              <div className="modal-body">
                <Login handleToggle={handleToggle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
