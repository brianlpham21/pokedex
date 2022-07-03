import React from 'react';

export default function CapturedPage() {
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
          <tr>
            <td>Emil</td>
            <td>Tobias</td>
            <td>Linus</td>
            <td>Linus</td>
          </tr>
          <tr>
            <td>16</td>
            <td>14</td>
            <td>10</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
