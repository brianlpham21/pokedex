import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSelected, setDetails, setLoadingStatus } from '../features/pokemon/pokemonSlice';

import { formatOrderNumber } from '../helpers/formatOrderNumber';
import { capitalizeString } from '../helpers/capitalizeString';

export default function Card({ pokemonUrl }) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.pokemon.selected);

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch(pokemonUrl)
      .then(response => response.json())
      .then((data) => {
        setPokemonData(data);
        dispatch(setDetails(data));
        dispatch(setLoadingStatus(false));
      });  
  }, [pokemonUrl, dispatch])

  let result = pokemonData?.types?.map(a => a.type.name);

  const handleClick = () => {
    dispatch(setSelected(pokemonData.name === selected.name ? {} : pokemonData));
  };

  return (
    <button
      onClick={handleClick}
      style={{ padding: '0', width: 'calc((100%/4) - 27px)', borderRadius: '10px', height: 'fit-content', border: 'none', boxShadow: `5px 5px 10px ${pokemonData.name === selected.name ? 'purple' : 'lightGrey'}` }}
    >
      <img src={pokemonData?.sprites?.other['official-artwork'].front_default} alt={`${pokemonData.name}`} style={{ height: '100px' }} />
      <div style={{ backgroundColor: 'white', borderRadius: '0 0 10px 10px' }}>
        <div>{formatOrderNumber(pokemonData.order)} {capitalizeString(pokemonData.name)}</div>
        <div>{capitalizeString(result?.join(' · '), true)}</div>
      </div>
    </button>
  )
}
