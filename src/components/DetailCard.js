import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";

import CaptureModal from './CaptureModal';
import { capitalizeString, formatOrderNumber } from '../helpers';

import { bgColors } from '../constants';

export default function DetailCard() {
  const selected = useSelector((state) => state.pokemon.selected);
  const captured = useSelector((state) => state.pokemon.captured);

  const isCaptured = captured.find((pokemon) => pokemon.name === selected.name);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!selected.name) return null;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: .75 }}
    >
    <div className="detail-card">
      <div className="main" style={{ backgroundColor: `${bgColors[selected.mainType]}` }}>
        <img src={selected?.sprites?.other['official-artwork'].front_default} alt={`${selected.name}`} />
        <div>{formatOrderNumber(selected?.order)} {capitalizeString(selected.name)}</div>
      </div>

      <div className="about">
        <h1 className="title">About</h1>
        <div>Type(s): {capitalizeString(selected.types?.join(' · '), true)}</div>
        <div>Weight: {selected?.weight / 10} kg</div>
        <div>Height: {selected?.height / 10} m</div>
      </div>

      <div className="base-stats">
        <h1 className="title">Base Stats</h1>
        {selected.stats.map((s) => <div>{s.join(': ')}</div>)}
      </div>

      {!isCaptured
        ? <div className="button-container"><button className="capture-button" onClick={() => setModalIsOpen(true)}>Capture</button></div>
        : (
          <div className="captured-stats">
            <h1 className="title">Capture Information</h1>
            <div>Nickname: {isCaptured?.nickname}</div>
            <div>Captured Date: {isCaptured?.capturedDate}</div>
            <div>Captured Level: {isCaptured?.capturedLevel}</div>
          </div>
        )}
      <CaptureModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} detailPokemonData={selected} />
    </div>
    </motion.div>
  )
}
