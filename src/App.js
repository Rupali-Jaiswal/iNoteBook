// App.js
import React from 'react';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NoteContext from './context/notes/NoteContext';
import Main from './components/Main';
import Login from './components/Login';
import NoteState from './context/notes/NoteState';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Error from './components/Error';
import Notes from './components/Notes';
import Footer from './components/Footer';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(NoteContext);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" />
  );
};


function App() {
  return (
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Error />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Main" element={<Main/>}/>
            <Route path="/Notes" element={<Notes/>}/>
          </Routes>
        </Router>
        <Footer/>
      </NoteState>
  );
}

export default App;
