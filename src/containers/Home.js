import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Pagination from '../components/Pagination';
import Card from '../components/Card';
import DetailCard from '../components/DetailCard';

import { incrementPage, decrementPage, setList } from '../features/pokemon/pokemonSlice';

export default function Home() {
  const dispatch = useDispatch();

  const [pokemonList, setPokemonList] = useState([]);
  const [paginationData, setPaginationData] = useState({ next: null, previous: null });

  useEffect(() => {

    fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      .then(response => response.json())
      .then(({ next, previous, results }) => {
        setPaginationData({ next, previous });
        setPokemonList(results);
        dispatch(setList(results));
      });  
  });

  const handlePagination = (e) => {
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
        <Pagination onClick={handlePagination} paginationData={paginationData} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '36px', margin: '36px' }}>
          {pokemonList.map(pokemon => <Card pokemonUrl={pokemon.url} key={pokemon.url} />)}
        </div>
      </div>
      <DetailCard />
    </div>
  )
}

