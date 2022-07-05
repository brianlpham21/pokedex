import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPokemonList } from '../features/pokemon/thunks/fetchPokemonList';

export default function Pagination() {
  const dispatch = useDispatch();

  const nextUrl = useSelector((state) => state.pokemon.next);
  const previousUrl = useSelector((state) => state.pokemon.previous);
  const loading = useSelector((state) => state.pokemon.loading);

  const handleClick = (e) => {
    const url = e.target.id === 'next' ? nextUrl : previousUrl;
    dispatch(fetchPokemonList(url));
  }

  return (
    <div className="pagination">
      {
        previousUrl && (
          <button
            className={`previous-button ${loading && 'disabled'}`}
            id='previous'
            onClick={handleClick}
            disabled={loading}
          >
            Previous
          </button>
        )
      }
      {
        nextUrl && (
          <button
            className={`next-button ${loading && 'disabled'}`}
            id='next'
            onClick={handleClick}
            disabled={loading}
          >
            Next
          </button>
        )
      }
    </div>
  )
}
