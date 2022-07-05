import React from 'react';
import { useSelector } from 'react-redux';

export default function Pagination({ onClick, paginationData }) {
  const page = useSelector((state) => state.pokemon.page);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {paginationData.previous && <button id='previous' onClick={onClick}>Previous</button>}
      {page} {page + 1} {page + 2}
      {paginationData.next && <button id='next' onClick={onClick}>Next</button>}
    </div>
  )
}
