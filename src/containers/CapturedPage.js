import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeCaptured } from '../features/pokemon/pokemonSlice';

import { capitalizeString, formatOrderNumber } from '../helpers';

import { bgColors } from '../constants';

export default function CapturedPage() {
  const dispatch = useDispatch();

  const captured = useSelector((state) => state.pokemon.captured);

  const handleRelease = (id) => {
    dispatch(removeCaptured(id));
  }

  return (
    <div className="captured-container">
      <table className="captured-table">
        <thead className="captured-table-header">
          <tr>
            <th>Pokemon</th>
            <th>Nickname</th>
            <th>Captured At</th>
            <th>Captured Level</th>
            <th />
          </tr>
        </thead>
        <tbody className="captured-table-body">
          {
            captured.length ? captured.map((pokemon) => {
              return (
                <tr key={pokemon.id}>
                  <td>
                    <img style={{ backgroundColor: `${bgColors[pokemon.mainType]}` }} src={pokemon.sprites?.other['official-artwork'].front_default} alt={`${pokemon.name}`} />
                    <span className="captured-main-info">
                      <div className="captured-name">{formatOrderNumber(pokemon.order)} {capitalizeString(pokemon.name)}</div>
                      <div className="captured-type">{capitalizeString(pokemon.types.join(' · '), true)}</div>
                    </span>
                  </td>
                  <td>{pokemon.nickname === '' ? 'None' : pokemon.nicknamed}</td>
                  <td>{pokemon.capturedDate}</td>
                  <td>{pokemon.capturedLevel}</td>
                  <td><button className="release-button" onClick={() => handleRelease(pokemon.id)}>Release</button></td>
                </tr>
              )
            }) : <tr><td className="empty-captured" colSpan={4}>No Pokemon Captured Yet.</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}
