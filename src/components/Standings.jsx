import React from 'react';

const Standings = ({ standings }) => {
  return (
    <div>
      <h2>Sarjataulukko</h2>
      <table>
        <thead>
          <tr>
            <th>Joukkue</th>
            <th>Pelatut</th>
            <th>Voitot</th>
            <th>Tappiot</th>
            <th>Pisteet</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr key={index}>
              <td>{team.team}</td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.lost}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Standings