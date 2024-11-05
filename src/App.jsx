import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import pickemService from './services/matches'
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import PickEms from './pages/PickEms';

const App = () => {
  const [winners, setWinners] = useState({})
  const [matches, setMatches] = useState([])
 // const matches = [
 //   { id: 1, teamA: { name: 'Tampereen Pyrintö' }, teamB: { name: 'Bisons' } },
 //   { id: 2, teamA: { name: 'Kouvot' }, teamB: { name: 'Karhubasket' } },
 //   { id: 3, teamA: { name: 'BC Nokia' }, teamB: { name: 'Helsinki Seagulls' } },
 // ]

  useEffect(() => {
    pickemService
      .getMatches()
      .then(response => {
        setMatches(response.data)
      })
      .catch(error => {
        console.log('Error fetching matches: ' , error);
      })
  }, [])

  const handleSend = () => {
    console.log('valitut voittajat:', winners);
  };

  const handleWinnerSelect = (matchId, winner) => {
    setWinners((prevWinners) => ({ ...prevWinners, [matchId]: winner }));
  };

  return (
    <Router>
      <nav>
        <Link to="/">Koti</Link> | <Link to="/tilastot">Tilastot</Link> | <Link to="/pickems">PickEms</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tilastot" element={<Statistics />} />
        <Route
          path="/pickems"
          element={
            <PickEms
              matches={matches}
              handleWinnerSelect={handleWinnerSelect}
              handleSend={handleSend}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
