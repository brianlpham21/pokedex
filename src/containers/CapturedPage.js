import React from 'react';
import { useSelector } from 'react-redux';

export default function CapturedPage() {
  const captured = useSelector((state) => state.pokemon.captured);

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: 'lightGrey' }}>
          <tr>
            <th>Pokemon</th>
            <th>Nickname</th>
            <th>Captured At</th>
            <th>Captured Level</th>
          </tr>
        </thead>
        <tbody>
          {
            captured.length ? captured.map((pokemon) => {
              return (
                <tr>
                  <td>{pokemon.name}</td>
                  <td>{pokemon.nickname}</td>
                  <td>{pokemon.capturedDate}</td>
                  <td>{pokemon.capturedLevel}</td>
                </tr>
              )
            }) : <div>none</div>
          }
        </tbody>
      </table>
    </div>
  )
}
