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
  const [results, setResults] = useState([])
  const [points, setPoints] = useState(0)
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
  }, [])

  // haetaan tulokset tietokannasta
  useEffect(() => {
    pickemService
      .getResults()
      .then(response => {
        setResults(response.data)
        console.log("results: ", response.data)
      })
      .catch(error => {
        console.log("Error fetching results: ", error)
      })
  }, [])

  // haetaan pisteet tietokannasta
  useEffect(() => {
    pickemService
      .getPoints('1')
      .then(response => {
        setPoints(response.data.points)
        console.log("points: ", response.data)
      })
      .catch(error => {
        console.log('Error fetching points: ' , error)
      })
  }, [])

  // Funktio hakemaan olemassa olevat ennustukset tietokannasta
  const fetchPredictions = () => {
    pickemService
      .getPredictions()
      .then(response => {
        setPredictions(response.data)
        response.data.forEach(prediction => {
          handleWinnerSelect(prediction.match_id, prediction.predicted_winner)
        })
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
   // console.log(predictions)
    //console.log(predictions.some(predictions => predictions.match_id === matchId && predictions.user_id === userId))
    return predictions.find(predictions => predictions.match_id === matchId && predictions.user_id === userId)
  }


  // tallentaa valitut voittajat tietokantaan
  const handleSend = (event) => {
    event.preventDefault()
  
    const newPredictions = Object.keys(winners).map((matchId, index) => ({
      match_id: parseInt(matchId),
      user_id: 1,
      predicted_winner: winners[matchId],
      created_at: new Date().toISOString()
    }))
    
    newPredictions.forEach(prediction => {
      const exisistingPrediction = checkExistingPrediction(prediction.match_id, prediction.user_id)
      if (!exisistingPrediction) {
        pickemService
          .savePredictions(prediction)
          .then(response => {
            console.log('valittu voittaja tallennettu:', response.data)
            
            fetchPredictions()
          })
          .catch(error => {
            console.log('Error saving prediction: ', error);
          });
      } else if (exisistingPrediction.predicted_winner !== prediction.predicted_winner){
        console.log(`Ennustus ottelulle ${prediction.match_id} on jo olemassa, päivitetään ennustus`)
        pickemService
          .updatePredictions(exisistingPrediction.id, prediction)
          .then(response => {
            console.log("uusi ennustus tallennettu: ", response.data)
            fetchPredictions()
          })
          .catch(error => {
            console.log('Error updating prediction: ', error) 
          })
      } else {
        console.log("ennustukset ei ole muttununeet, ei tallenneta uudelleen");
      }
    })
    
  }

  const handleWinnerSelect = (matchId, winner) => {
    setWinners((prevWinners) => ({ ...prevWinners, [matchId]: winner }))
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
              predictions={predictions}
              winners={winners}
              results={results}
            />
          }
        />
      </Routes>
      </main>
    </Router>
  )
}

export default App
