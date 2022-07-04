import React, { useEffect, useState } from 'react';
import { formatOrderNumber } from '../helpers/formatOrderNumber';
import { capitalizeString } from '../helpers/capitalizeString';

export default function Card({ pokemonUrl, detailPanel, setDetailPanel, setDetailPokemonData }) {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch(pokemonUrl)
      .then(response => response.json())
      .then((data) => {
        setPokemonData(data);
      });  
  }, [pokemonUrl])

  let result = pokemonData?.types?.map(a => a.type.name);

  return (
    <button
      onClick={() => {
        setDetailPokemonData(pokemonData);
        setDetailPanel(!detailPanel);
      }}
      style={{ padding: '0', width: 'calc((100%/4) - 27px)', borderRadius: '10px', border: 'none', height: 'fit-content', boxShadow: '5px 5px 10px grey' }}
    >
      <img src={pokemonData?.sprites?.other['official-artwork'].front_default} alt={`${pokemonData.name}`} style={{ height: '100px' }} />
      <div style={{ backgroundColor: 'white', borderRadius: '0 0 10px 10px' }}>
        <div>{formatOrderNumber(pokemonData.order)} {capitalizeString(pokemonData.name)}</div>
        <div>{capitalizeString(result?.join(' · '), true)}</div>
      </div>
    </button>
  )
}
