import React from 'react';
import { formatOrderNumber } from '../helpers/formatOrderNumber';
import { capitalizeString } from '../helpers/capitalizeString';

export default function DetailCard({ detailPokemonData }) {
  let result = detailPokemonData?.types?.map(a => a.type.name);
  let result1 = detailPokemonData?.stats?.map(a => [a.stat.name, a.base_stat]);

  return (
    <div style={{ border: '1px solid black', margin: '22px', borderRadius: '10px' }}>
      <img src={detailPokemonData?.sprites?.other['official-artwork'].front_default} alt={`${detailPokemonData.name}`} style={{ height: '100px' }} />
      <div>{formatOrderNumber(detailPokemonData.order)} {capitalizeString(detailPokemonData.name)}</div>

      <div>
        <div>{detailPokemonData.weight / 10}</div>
        <div>{detailPokemonData.height / 10}</div>
        <div>{capitalizeString(result?.join(' · '), true)}</div>
      </div>

      <div>
        <div>{result1.map((s) => <div style={{ whiteSpace: 'nowrap' }}>{s[0]} {s[1]}</div>)}</div>
      </div>

      <button>Capture</button>
    </div>
  )
}
