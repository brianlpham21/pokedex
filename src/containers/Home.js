import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Home() {
  const [list, setList] = useState([])
  const [paginationData, setPaginationData] = useState({ next: null, previous: null });

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      .then(response => response.json())
      .then(({ next, previous, results }) => {
        setPaginationData({ next, previous });
        setList(results);
      });  
  }, [])

  const handlePagination = (e) => {

    fetch(paginationData[e.target.id])
      .then(response => response.json())
      .then(({ next, previous, results }) => {
        setPaginationData({ next, previous });
        setList(results);
      }); 
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {paginationData.previous && <button id='previous' onClick={handlePagination}>Previous</button>}
        {paginationData.next && <button id='next' onClick={handlePagination}>Next</button>}
      </div>
      {<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '10px' }}>
        {list.map(pokemon => <Card pokemonUrl={pokemon.url} />)}
      </div>}
    </div>
  )
}

