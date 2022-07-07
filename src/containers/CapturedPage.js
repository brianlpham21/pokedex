import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

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
          {
            captured.length ? (
            <tr>
              <th>Pokemon</th>
              <th>Nickname</th>
              <th>Captured At</th>
              <th>Captured Level</th>
              <th />
            </tr>) : (
              <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}><td className="empty-captured" colSpan={5}>No Pokemon Captured Yet.</td></motion.tr>
            )
          }
        </thead>
        <tbody className="captured-table-body">
        <AnimatePresence>
          {
            captured.length && captured.map((pokemon, index) => {
              return (
                <motion.tr key={pokemon.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td>
                    <img 
                      className={`pokemon${index}`}
                      style={{ backgroundColor: `${bgColors[pokemon.mainType]}` }}
                      src={pokemon.sprites?.other['official-artwork'].front_default}
                      alt={`${pokemon.name}`}
                    />
                    <span className="captured-main-info">
                      <div className="captured-name">{formatOrderNumber(pokemon.order)} {capitalizeString(pokemon.name)}</div>
                      <div className="captured-type">{capitalizeString(pokemon.types.join(' · '), true)}</div>
                    </span>
                  </td>
                  <td>{pokemon.nickname === '' ? <span className="none-text">None</span> : pokemon.nickname}</td>
                  <td>{pokemon.capturedDate}</td>
                  <td>{pokemon.capturedLevel}</td>
                  <td><button className="release-button" onClick={() => handleRelease(pokemon.id)}>Release</button></td>
                </motion.tr>
              )
            })
          }
        </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}
