import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPokemonList } from '../features/pokemon/thunks/fetchPokemonList';

export default function Pagination() {
  const dispatch = useDispatch();

  const nextUrl = useSelector((state) => state.pokemon.next);
  const previousUrl = useSelector((state) => state.pokemon.previous);

  const handleClick = (e) => {
    const url = e.target.id === 'next' ? nextUrl : previousUrl;
    dispatch(fetchPokemonList(url));
  }

  return (
    <div className="pagination">
      {
        previousUrl && (
          <button
            className="previous-button"
            id='previous'
            onClick={handleClick}
          >
            Previous
          </button>
        )
      }
      {
        nextUrl && (
          <button className="next-button" id='next' onClick={handleClick}>Next</button>
        )
      }
    </div>
  )
}
