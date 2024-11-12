import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import pickemService from './services/matches'
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import PickEms from './pages/PickEms'
import TopBar from './components/TopBar/TopBar'

const App = () => {
  const [winners, setWinners] = useState([])
  const [matches, setMatches] = useState([])
  const [standings, setStandings] = useState([])
  const [points, setPoints] = useState(19)
  const [showTopBar, setShowTopBar] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [predictions, setPredictions] = useState([])

  

  useEffect(() => {
    setSelectedWeek(getCurrentWeek())
  }, [])

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

  // haetaan sarjataulukko tietokannasta
  useEffect(() => {
    pickemService
      .getStandings()
      .then(response => {
        setStandings(response.data)
      })
      .catch(error => {
        console.log('Error fetching standings: ' , error)
      })
  })

  // Funktio hakemaan olemassa olevat ennustukset tietokannasta
  const fetchPredictions = () => {
    pickemService
      .getPredictions()
      .then(response => {
        setPredictions(response.data)
      })
      .catch(error => {
        console.log('Error fetching predictions: ', error)
      })
  }

  // Haetaan olemassa olevat ennustukset tietokannasta, kun komponentti ladataan
  useEffect(() => {
    fetchPredictions()
  }, [])

  // Näytä yläreunan palkki, kun käyttäjä selaa ylöspäin
  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShowTopBar(true)
      } else {
        setShowTopBar(false)
      }
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const getCurrentWeek = () => {
    const now = new Date()
    const oneJan = new Date(now.getFullYear(), 0, 1)
    const numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000))
    return Math.ceil((now.getDay() + 1 + numberOfDays) / 7)
  }

  const handleSelectedWeek = (week) => {
    setSelectedWeek(week)
  }

  const checkExistingPrediction = (matchId, userId) => {
    //console.log("checkExistingprediction predictions: ", prediction, "matchId: ", matchId, "userId: ", userId)
    console.log(predictions)
    console.log(predictions.some(predictions => predictions.match_id === matchId && predictions.user_id === userId))
    return predictions.some(predictions => predictions.match_id === matchId && predictions.user_id === userId)
  }


  // Tallenna valitut voittajat tietokantaan
  const handleSend = (event) => {
    event.preventDefault();
    
    const newPredictions = Object.keys(winners).map((matchId, index) => ({
      match_id: parseInt(matchId),
      user_id: 1,
      predicted_winner: winners[matchId],
      created_at: new Date().toISOString()
    }))
    
    console.log("hanldeSend newPredictions ", newPredictions)
    console.log("handleSend predictions ", predictions);
    console.log("handleSend winners ", winners)

    newPredictions.forEach(prediction => {
      if (!checkExistingPrediction(prediction.match_id, prediction.user_id)) {
        pickemService
          .savePredictions(prediction)
          .then(response => {
            console.log('valittu voittaja tallennettu:', response.data)
            
            fetchPredictions()
          })
          .catch(error => {
            console.log('Error saving prediction: ', error);
          });
      } else {
        console.log(`Ennustus ottelulle ${prediction.match_id} on jo olemassa.`)
      }
    })
  }

  const handleWinnerSelect = (matchId, winner) => {
    setWinners((prevWinners) => ({ ...prevWinners, [matchId]: winner }))
    console.log("handlewinnerselect kutsuttu appissa, matchId: ", matchId, "winner: ", winner);
  }

  return (
    <Router>
      <TopBar handleSend={handleSend} points={points} showTopBar={showTopBar} />
      <nav>
        <Link to="/">Koti</Link> | <Link to="/tilastot">Tilastot</Link> | <Link to="/pickems">PickEms</Link>
      </nav>
      <main>
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
              selectedWeek={selectedWeek}
              handleSelectedWeek={handleSelectedWeek}
            />
          }
        />
      </Routes>
      </main>
    </Router>
  )
}

export default App
