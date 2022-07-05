import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Home from './containers/Home';
import CapturedPage from './containers/CapturedPage';

import { fetchPokemonList } from './features/pokemon/thunks/fetchPokemonList';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonList());
  });

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
