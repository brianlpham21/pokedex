import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSelected} from '../features/pokemon/pokemonSlice';

import { capitalizeString, formatOrderNumber } from '../helpers';
import { bgColors } from '../constants';

export default function Card({ pokemon }) {
  const dispatch = useDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);

  const selected = useSelector((state) => state.pokemon.selected);
  const loading = useSelector((state) => state.pokemon.loading);

  let result = pokemon?.details?.types?.map(a => a.type.name);
  const isSelected = pokemon.name === selected.name;

  const handleSelect = () => {
    dispatch(setSelected(isSelected ? {} : pokemon));
  };

  return (
    <button
      className={`card ${isSelected && 'selected'}`}
      onClick={handleSelect}
      style={{ backgroundColor: `${result && result[0] && bgColors[result[0]]}` }}
    >
      <img
        className={`card-image ${!imageLoaded && 'hidden'}`}
        src={pokemon?.details?.sprites?.other['official-artwork'].front_default}
        alt={`${pokemon.name}`}
        onLoad={() => setImageLoaded(true)}
      />
      {
        !loading
          ? (
            <div className="card-text">
              <div className="card-title">
                {formatOrderNumber(pokemon?.details?.order)} {capitalizeString(pokemon.name)}
              </div>
              <div className="card-subtitle">
                {capitalizeString(result?.join(' · '), true)}
              </div>
            </div>
          ) : <div className="loader" />
      }
    </button>
  )
}
