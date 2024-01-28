import './App.css';
import Navbar from './components/Navbar';
import Note from './components/Note';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar/>
      <div id="note">
      <Note/>
      <Note/>
      <Note/>
      <Note/>
      <Note/>
      <Note/>
      </div>
    </div>
  );
}

export default App;
