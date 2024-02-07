import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Notes from './components/Notes';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <NoteState>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Notes />} />
          <Route exact path='/About' element={<About />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
