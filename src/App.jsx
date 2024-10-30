import { useState } from 'react'
import './App.css'
import SelectWinners from './components/SelectWinners'
import SendButton from './components/SendButton'

// Arpoo joukkueista satunnaisen otteluparin
const GetRandomMatch = (teams) => {
  // Kopioidaan alkuperäinen teams-taulukko
  const shuffledTeams = [...teams];

  // Sekoitetaan taulukko Fisher-Yates algoritmilla
  for (let i = shuffledTeams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledTeams[i], shuffledTeams[j]] = [shuffledTeams[j], shuffledTeams[i]];
  }

  // Palautetaan kaksi ensimmäistä joukkuetta taulukosta ottelupariksi
  return { teamA: shuffledTeams[0], teamB: shuffledTeams[1] }
}

/*
// ColorChangebutton-komponentti, jossa kaksi nappia 
const ColorChangeButton = ({ color, changeColor, oppositeColor}) => {
  
  return (
    <p>
    <button 
      onClick={changeColor}
      style={{ backgroundColor: color, color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
    >
      Loimaa Bisons
    </button>

    <button 
      onClick={changeColor}
      style={{ backgroundColor: oppositeColor, color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
    >
      Kouvot
    </button>
    </p>
  )
}
*/



const App = () => {
  const [color, setColor] = useState('blue')
  const [winners, setWinners] = useState({})
  //kiinteä ottelulista testaus datalla
  const matches = [
    { id: 1, teamA: { name: 'Tampereen Pyrintö' }, teamB: { name: 'Bisons' } },
    { id: 2, teamA: { name: 'Kouvot' }, teamB: { name: 'Karhubasket' } },
    { id: 3, teamA: { name: 'BC Nokia' }, teamB: { name: 'Helsinki Seagulls' } }
  ]
  
  // Esimerkkilistä joukkueista
  const teams = [
    { id: 1, name: 'Tampereen Pyrintö' },
    { id: 2, name: 'Bisons' },
    { id: 3, name: 'Kouvot' },
    { id: 4, name: 'Karhubasket' },
    { id: 5, name: 'BC Nokia' }
  ]

  /*
  // Funktio vaihtamaan napin väriä
  const changeColor = () => {
    setColor((prevColor) => (prevColor === 'green' ? 'red' : 'green'))
  }
*/

  // Määritellään vastakkainen väri suhteessä nykyiseen väriin
  const getOppositeColor = (color) => {
    if (color ==='green') return 'red'
    if (color === 'red') return 'green'
    return 'blue'
  }


  const handleSend = () => {
    console.log('valitut voittajat:', winners);
  }

  const handleWinnerSelect = (matchId, winner) => {
    setWinners((prevWinners) => ({ ...prevWinners, [matchId]: winner}))
  }

  const oppositeColor = getOppositeColor(color)

  return (
    <>
        <h1>Ennusta korisliiga otteluiden voittajat!</h1>
        {matches.map((match) => (
          <SelectWinners 
            key={match.id} 
            match={match} 
            onWinnerSelect={handleWinnerSelect} 
          />
      ))}
        <SendButton handleSend={handleSend}/>
    </>
  )
}

export default App
