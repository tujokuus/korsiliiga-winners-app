import React from 'react';
import './standings.css';

const Standings = ({ standings }) => {
  return (
    <div className='standings-container'>
      <h2>Sarjataulukko</h2>
      <table>
        <thead>
          <tr>
            <th>Joukkue</th>
            <th>O</th>
            <th>V</th>
            <th>H</th>
            <th>P</th>
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