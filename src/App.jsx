import { useState } from 'react'
import './App.css'

// ColorChangebutton-komponentti, jossa kaksi nappia
const ColorChangeButton = ({ color, changeColor, oppositeColor}) => {
  
  return (
    <p>
    <button 
      onClick={changeColor}
      style={{ backgroundColor: color, color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
    >
      Click to change color
    </button>

    <button 
      onClick={changeColor}
      style={{ backgroundColor: oppositeColor, color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
    >
      Opposite color
    </button>
    </p>
  )
}

const App = () => {
  const [winnerA, setWinnerA] = useState(0)
  const [color, setColor] = useState('blue')

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
        <button onClick={() => setWinnerA((winnerA) => winnerA + 1)}>
          winner is {winnerA}
        </button>
        <ColorChangeButton color={color} changeColor={changeColor} oppositeColor={oppositeColor}/>
        
    </>
  )
}

export default App
