import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../components/Card';

import { getPokemonList } from '../features/pokemon/pokemonSlice';

export default function CardListContainer() {
  const results = useSelector((state) => getPokemonList(state));
  const loading = useSelector((state) => state.pokemon.loading);

  return (
    <div className="cards-container">
      {results && results.map(pokemon => <Card pokemon={pokemon} key={pokemon.url} />)}
      {loading && <div className="loader-container"><div className="loader" /></div>}
    </div>
  )
}
