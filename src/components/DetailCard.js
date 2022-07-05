import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CaptureModal from './CaptureModal';
import { formatOrderNumber } from '../helpers/formatOrderNumber';
import { capitalizeString } from '../helpers/capitalizeString';

export default function DetailCard() {
  const selected = useSelector((state) => state.pokemon.selected);
  const captured = useSelector((state) => state.pokemon.captured);

  const isCaptured = captured.filter((pokemon) => pokemon.name === selected.name)[0];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  let result = selected?.details?.types?.map(a => a.type.name);
  let result1 = selected?.details?.stats?.map(a => [a.stat.name, a.base_stat]);

  if (!selected.name) return null;

  return (
    <div style={{ border: '1px solid black', margin: '22px', borderRadius: '10px' }}>
      <img src={selected?.details?.sprites?.other['official-artwork'].front_default} alt={`${selected.name}`} style={{ height: '100px' }} />
      <div>{formatOrderNumber(selected?.details.order)} {capitalizeString(selected.name)}</div>

      <div>
        <div>{selected?.details.weight / 10}</div>
        <div>{selected?.details.height / 10}</div>
        <div>{capitalizeString(result?.join(' · '), true)}</div>
      </div>

      <div>
        <div>{result1.map((s) => <div style={{ whiteSpace: 'nowrap' }}>{s[0]} {s[1]}</div>)}</div>
      </div>

      {!isCaptured
        ? <button onClick={() => setModalIsOpen(true)}>Capture</button>
        : (
          <div>
            <div>Nickname: {isCaptured?.nickname}</div>
            <div>Captured Date: {isCaptured?.capturedDate}</div>
            <div>Captured Level: {isCaptured?.capturedLevel}</div>
          </div>
        )}
      <CaptureModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} detailPokemonData={selected?.details} />
    </div>
  )
}
