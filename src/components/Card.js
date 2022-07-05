import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSelected} from '../features/pokemon/pokemonSlice';

import { formatOrderNumber } from '../helpers/formatOrderNumber';
import { capitalizeString } from '../helpers/capitalizeString';

export default function Card({ pokemon }) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.pokemon.selected);

  let result = pokemon?.details?.types?.map(a => a.type.name);

  const handleClick = () => {
    dispatch(setSelected(pokemon.name === selected.name ? {} : pokemon));
  };

  return (
    <button
      onClick={handleClick}
      style={{ padding: '0', width: 'calc((100%/4) - 27px)', borderRadius: '10px', height: 'fit-content', border: 'none', boxShadow: `5px 5px 10px ${pokemon.name === selected.name ? 'purple' : 'lightGrey'}` }}
    >
      <img src={pokemon?.details?.sprites?.other['official-artwork'].front_default} alt={`${pokemon.name}`} style={{ height: '100px' }} />
      <div style={{ backgroundColor: 'white', borderRadius: '0 0 10px 10px' }}>
        <div>{formatOrderNumber(pokemon?.details?.order)} {capitalizeString(pokemon.name)}</div>
        <div>{capitalizeString(result?.join(' · '), true)}</div>
      </div>
    </button>
  )
}
