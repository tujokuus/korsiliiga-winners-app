import { useState, useEffect } from 'react'
import './selectWinners.css'
import MatchDetails from '../MatchDetails/MatchDetails'
import DetailsToggleButton from '../Buttons/DetailsToggleButton'
import FinalScore from '../FinalScore/FinalScore'
import PredictionResult from '../PredictionResult/PredictionResult'
  
  
  // Voittajien valitsemis komponentti jossa käytetään radio buttonia
  const SelectWinners = ({ match, onWinnerSelect, predictions, results}) => {
      const { teamA, teamB } = match
      const date = match.date
      const [selectedTeam, setSelectedTeam] = useState(null)
      const [showDetails, setShowDetails] = useState(false)

      useEffect(() => {
        const prediction = predictions.find(prediction => parseInt(prediction.match_id) === parseInt(match.id))
        if (prediction) {
          setSelectedTeam(prediction.predicted_winner)
        }
      }, [predictions, match.id])

      const handleSelection = (team) => {
        setSelectedTeam(team)
        onWinnerSelect(match.id, team)
      }

      const toggleDetails = () => {
        setShowDetails(!showDetails)
      }

      const matchDate = date ? new Date(date) : null
      const isValidDate = matchDate instanceof Date && !isNaN(matchDate);

  // Muotoillaan päivämäärä ja aika suomalaiseen muotoon, jos päivämäärä on kelvollinen
      const formattedDate = isValidDate
        ? matchDate.toLocaleDateString("fi-FI", {
            year: 'numeric', month: 'numeric', day: 'numeric'
          })
        : 'Päivämäärä ei saatavilla';
        
      const formattedTime = isValidDate
        ? matchDate.toLocaleTimeString("fi-FI", {
            hour: '2-digit', minute: '2-digit'
          })
        : 'Aika ei saatavilla';
    

      return (
      <form>
        <div className="match-container" >
          <div className="match-info">
              {formattedDate}     {formattedTime}
          </div>
          <div className="team-selection">
            <div
              className={`team-name ${selectedTeam === teamA.name ? 'selectedHome' : ''}`}
              onClick={() => handleSelection(teamA.name)}
            >
              {teamA.name}
            </div>
            <FinalScore matchId={match.id} results={results}/>  
            <div
              className={`team-name ${selectedTeam === teamB.name ? 'selectedAway' : ''}`}
              onClick={() => handleSelection(teamB.name)}
            >
              {teamB.name}
            </div>
            <PredictionResult matchId={match.id} results={results} predictions={predictions}/>
          </div> 
          <DetailsToggleButton showDetails={showDetails} toggleDetails={toggleDetails} className='details-toggle-button' />
          {showDetails && <MatchDetails match={match} />}
        </div>
      </form>
      )
    }

    export default SelectWinners