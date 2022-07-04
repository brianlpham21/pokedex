import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import DetailCard from '../components/DetailCard';

export default function Home() {
  const [list, setList] = useState([]);
  const [paginationData, setPaginationData] = useState({ next: null, previous: null });
  const [detailPanel, setDetailPanel] = useState(false);
  const [detailPokemonData, setDetailPokemonData] = useState([]);

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
    <div style={{ display: 'flex' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {paginationData.previous && <button id='previous' onClick={handlePagination}>Previous</button>}
          {paginationData.next && <button id='next' onClick={handlePagination}>Next</button>}
        </div>
        {<div style={{ display: 'flex', flexWrap: 'wrap', gap: '36px', margin: '36px' }}>
          {list.map(pokemon => <Card pokemonUrl={pokemon.url} detailPanel={detailPanel} setDetailPanel={setDetailPanel} setDetailPokemonData={setDetailPokemonData} />)}
        </div>}
      </div>
      {detailPanel && <DetailCard detailPokemonData={detailPokemonData} />} 
    </div>
  )
}

