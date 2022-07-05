import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CaptureModal from './CaptureModal';
import { formatOrderNumber } from '../helpers/formatOrderNumber';
import { capitalizeString } from '../helpers/capitalizeString';

export default function DetailCard() {
  const selected = useSelector((state) => state.pokemon.selected);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  let result = selected?.types?.map(a => a.type.name);
  let result1 = selected?.stats?.map(a => [a.stat.name, a.base_stat]);

  if (!selected.name) return null;

  return (
    <div style={{ border: '1px solid black', margin: '22px', borderRadius: '10px' }}>
      <img src={selected?.sprites?.other['official-artwork'].front_default} alt={`${selected.name}`} style={{ height: '100px' }} />
      <div>{formatOrderNumber(selected.order)} {capitalizeString(selected.name)}</div>

      <div>
        <div>{selected.weight / 10}</div>
        <div>{selected.height / 10}</div>
        <div>{capitalizeString(result?.join(' · '), true)}</div>
      </div>

      <div>
        <div>{result1.map((s) => <div style={{ whiteSpace: 'nowrap' }}>{s[0]} {s[1]}</div>)}</div>
      </div>

      <button onClick={() => setModalIsOpen(true)}>Capture</button>
      <CaptureModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} detailPokemonData={selected} />
    </div>
  )
}
