import { Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Captured from './Captured';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>Header</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/captured">Captured Pokemon</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/captured" element={<Captured />} />
      </Routes>
    </div>
  );
}

export default App;
