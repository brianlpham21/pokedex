import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPokemonList } from '../features/pokemon/thunks/fetchPokemonList';

import { calculatePage, validatePageNumber } from '../helpers';

import { apiCallSettings } from '../constants';

export default function Pagination() {
  const dispatch = useDispatch();

  const nextUrl = useSelector((state) => state.pokemon.next);
  const previousUrl = useSelector((state) => state.pokemon.previous);
  const loading = useSelector((state) => state.pokemon.loading);

  const handleClick = (e) => {
    const url = e.target.id === 'next' ? nextUrl : previousUrl;
    dispatch(fetchPokemonList(url));
  }

  const page = (calculatePage(apiCallSettings.limit, nextUrl))

  return (
    <div className="pagination">
      <button
        className={`previous-button ${(loading || !previousUrl) && 'disabled'}`}
        id='previous'
        onClick={handleClick}
        disabled={(loading || !previousUrl)}
      >
        Previous
      </button>

      <div className="page-selection" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <div>{validatePageNumber(page - 2)}</div>
        <div>{validatePageNumber(page - 1)}</div>
        <div className="active">{page}</div>
        <div>{page + 1}</div>
        <div>{page + 2}</div>
      </div>

      <button
        className={`next-button ${(loading || !nextUrl) && 'disabled'}`}
        id='next'
        onClick={handleClick}
        disabled={loading || !nextUrl}
      >
        Next
      </button>
    </div>
  )
}
