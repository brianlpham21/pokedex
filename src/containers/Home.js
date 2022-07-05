import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Pagination from '../components/Pagination';
import CardListContainer from '../components/CardListContainer';
import DetailCard from '../components/DetailCard';

import { fetchPokemonList } from '../features/pokemon/thunks/fetchPokemonList';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonList());
  });

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Pagination />
        <CardListContainer />
      </div>
      <DetailCard />
    </div>
  )
}

