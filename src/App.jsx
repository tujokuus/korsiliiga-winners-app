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
  const [standings, setStandings] = useState([])

  // haetaan ottelut ja sarjataulukko palvelimelta
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

  useEffect(() => {
    pickemService
      .getStandings()
      .then(response => {
        setStandings(response.data)
      })
      .catch(error => {
        console.log('Error fetching standings: ' , error);
      })
  })

  // toistaiseksi funktio tulostaa valitut voittajat konsoliin
  const handleSend = () => {
    console.log('valitut voittajat:', winners);
  }

  const handleWinnerSelect = (matchId, winner) => {
    setWinners((prevWinners) => ({ ...prevWinners, [matchId]: winner }));
  }

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
              standings={standings}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
