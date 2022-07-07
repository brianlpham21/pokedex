import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Home from './containers/Home';
import CapturedPage from './containers/CapturedPage';

import { fetchPokemonList } from './features/pokemon/thunks/fetchPokemonList';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const next = useSelector((state) => state.pokemon.next);

  useEffect(() => {
    dispatch(fetchPokemonList());
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [dispatch]);

  const handleScroll = () => {
    if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) <= (document.documentElement.offsetHeight - 5) || isFetching) return;
    setIsFetching(true);
  };

  useEffect(() => {
		if (!isFetching) return;
		dispatch(fetchPokemonList(next));
    setIsFetching(false);
	}, [dispatch, isFetching]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Home />} />
        <Route path="/captured" element={<CapturedPage />} />
      </Routes>
    </div>
  );
}

export default App;
