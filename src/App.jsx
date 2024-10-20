import { useState } from 'react'
import './App.css'

// Voittajien valitsemis komponentti jossa käytetään radio buttonia
const SelectWinners = () => {
  return (
    <form>
      Valitse otteluiden voittajat:
      <div>
        <input type='radio' id="matchAWinner" name='joukkue' value='loimaa bisons'/>
        <label for='matchAWinner'> Loimaa Bisons</label>
        
        <input type="radio" id="matchAWinner" name="joukkue" value="Kouvot"/>
        <label for="matchAWinner"> Kouvot</label>
      </div>
    </form>
  )
}

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

const App = () => {
  const [winnerA, setWinnerA] = useState(0)
  const [color, setColor] = useState('blue')
  
  // Esimerkkilistä nimistä
  const teams = [
    { id: 1, name: 'Tampereen Pyrintö' },
    { id: 2, name: 'Bisons' },
    { id: 3, name: 'Kouvot' },
    { id: 4, name: 'Karhubasket' },
    { id: 5, name: 'BC Nokia' }
  ]

  // Funktio vaihtamaan napin väriä
  const changeColor = () => {
    setColor((prevColor) => (prevColor === 'green' ? 'red' : 'green'))
  }

  // Määritellään vastakkainen väri suhteessä nykyiseen väriin
  const getOppositeColor = (color) => {
    if (color ==='green') return 'red'
    if (color === 'red') return 'green'
    return 'blue'
  }

  const oppositeColor = getOppositeColor(color)

  return (
    <>
        <h1>Ennusta korisliiga otteluiden voittajat!</h1>
        <button 
        onClick={() => setWinnerA((winnerA) => winnerA + 1)}>
        winner is {winnerA}
        </button>
        
        <ColorChangeButton color={color} changeColor={changeColor} oppositeColor={oppositeColor}/>
        <SelectWinners></SelectWinners>
        
    </>
  )
}

export default App
