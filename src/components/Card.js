import React, { useEffect, useState } from 'react';

export default function Card({ pokemonUrl }) {
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
    <div style={{ padding: '10px', border: '1px solid black', width: 'calc((100%/4) - 30px)', borderRadius: '10px' }}>
      <img src={pokemonData?.sprites?.other['official-artwork'].front_default} alt={`${pokemonData.name}`} style={{ height: '100px' }} />
      <div>{pokemonData.name}</div>
      <div>{pokemonData.order}</div>
      <div>{result?.join(', ')}</div>
    </div>
  )
}
