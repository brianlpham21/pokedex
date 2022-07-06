import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { setSelected} from '../features/pokemon/pokemonSlice';

import { capitalizeString, formatOrderNumber } from '../helpers';
import { bgColors } from '../constants';

export default function Card({ pokemon }) {
  const dispatch = useDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);

  const selected = useSelector((state) => state.pokemon.selected);
  const loading = useSelector((state) => state.pokemon.loading);

  const isSelected = pokemon.name === selected.name;

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
      {
        !loading
          ? (
            <div className="card-text">
              <div className="card-title">
                {formatOrderNumber(pokemon?.order)} {capitalizeString(pokemon.name)}
              </div>
              <div className="card-subtitle">
                {capitalizeString(pokemon?.types?.join(' · '), true)}
              </div>
            </div>
          ) : <div className="loader" />
      }
    </motion.button>
  )
}
