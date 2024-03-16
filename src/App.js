// App.js
import React from 'react';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NoteContext from './context/notes/NoteContext';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import NoteState from './context/notes/NoteState';
import SighUP from './components/SighUP';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(NoteContext);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};
const ProtectedRoute2 = ({ element }) => {
  const { UserCreated } = useContext(NoteContext);

  return UserCreated ? (
    <Navigate to="/login" />
  ) : (
    element
  );
};

function App() {
  return (
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<ProtectedRoute2 element={<SighUP/>} />} />
            <Route path="/" element={<ProtectedRoute element={<Home />} />}/>
            <Route path="/about" element={<ProtectedRoute element={<About />} />}/>
          </Routes>
        </Router>
      </NoteState>
  );
}

export default App;
