import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../components/Card';
import DetailCard from '../components/DetailCard';

import { incrementPage, decrementPage, setList, setLoadingStatus } from '../features/pokemon/pokemonSlice';

export default function Home() {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.pokemon.selected);
  const page = useSelector((state) => state.pokemon.page);
  const loading = useSelector((state) => state.pokemon.loading);

  const [pokemonList, setPokemonList] = useState([]);
  const [paginationData, setPaginationData] = useState({ next: null, previous: null });

  useEffect(() => {
    dispatch(setLoadingStatus(true));

    fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      .then(response => response.json())
      .then(({ next, previous, results }) => {
        setPaginationData({ next, previous });
        setPokemonList(results);
        dispatch(setList(results));
      });  
  }, [])

  const handlePagination = (e) => {
    dispatch(setLoadingStatus(true));

    e.target.id === 'next' ? dispatch(incrementPage()) :  dispatch(decrementPage());

    fetch(paginationData[e.target.id])
      .then(response => response.json())
      .then(({ next, previous, results }) => {
        setPaginationData({ next, previous });
        setPokemonList(results);
        dispatch(setList(results));
      }); 
  }

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {paginationData.previous && <button id='previous' style={{ color: loading ? 'red' : 'black' }} disabled={loading} onClick={handlePagination}>Previous</button>}
          {page} {page + 1} {page + 2}
          {paginationData.next && <button id='next' style={{ color: loading ? 'red' : 'black' }} disabled={loading} onClick={handlePagination}>Next</button>}
        </div>
        {<div style={{ display: 'flex', flexWrap: 'wrap', gap: '36px', margin: '36px' }}>
          {pokemonList.map(pokemon => <Card pokemonUrl={pokemon.url} key={pokemon.url} />)}
        </div>}
      </div>
      {selected.name && <DetailCard />} 
    </div>
  )
}

