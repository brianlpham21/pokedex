import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { setSelected} from '../features/pokemon/pokemonSlice';

import pokeball from '../assets/pokeball.png'

import { capitalizeString, formatOrderNumber } from '../helpers';
import { bgColors } from '../constants';

export default function Card({ pokemon }) {
  const dispatch = useDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);

  const selected = useSelector((state) => state.pokemon.selected);
  const captured = useSelector((state) => state.pokemon.captured);

  const isSelected = pokemon.name === selected.name;
  const isCaptured = captured.find((p) => p.name === pokemon.name);

  const handleSelect = () => {
    dispatch(setSelected(isSelected ? {} : pokemon));
  };

  if (!pokemon) return null;

  return (
    <motion.button
      className={`card ${isSelected && 'selected'} ${selected.name && 'minimize'}`}
      onClick={handleSelect}
      style={{ backgroundColor: `${bgColors[pokemon?.mainType]}` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .75 }}
    >
      <img
        className={`card-image ${!imageLoaded && 'hidden'}`}
        src={pokemon?.sprites?.other['official-artwork'].front_default}
        alt={`${pokemon.name}`}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="card-text">
        <div>
          <div className="card-title">
            {formatOrderNumber(pokemon?.order)} {capitalizeString(pokemon.name)}
          </div>
          <div className="card-subtitle">
            {capitalizeString(pokemon?.types?.join(' · '), true)}
          </div>
        </div>
        {isCaptured && <img className="card-captured-icon" src={pokeball} alt="pokeball" />}
      </div>
    </motion.button>
  )
}
