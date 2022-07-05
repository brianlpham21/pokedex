import { Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Home from './containers/Home';
import CapturedPage from './containers/CapturedPage';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/captured" element={<CapturedPage />} />
      </Routes>
    </div>
  );
}

export default App;
