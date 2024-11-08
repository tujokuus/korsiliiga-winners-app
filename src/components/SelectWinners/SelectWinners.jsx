import { useState } from 'react'
import './selectWinners.css'
import MatchDetails from '../MatchDetails/MatchDetails'
import ToggleButton from '../DetailsToggleButton'
  
  
  // Voittajien valitsemis komponentti jossa käytetään radio buttonia
  const SelectWinners = ({ match, onWinnerSelect }) => {
      const { teamA, teamB } = match
      const date = match.date
      const [selectedTeam, setSelectedTeam] = useState({})
      const [showDetails, setShowDetails] = useState(false)
      
      
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
      <div className="match-container">
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
          <div
            className={`team-name ${selectedTeam === teamB.name ? 'selectedAway' : ''}`}
            onClick={() => handleSelection(teamB.name)}
          >
            {teamB.name}
          </div>
        </div> 
        <ToggleButton showDetails={showDetails} toggleDetails={toggleDetails} />
        {showDetails && <MatchDetails match={match} />}
      </div>
    </form>
      )
    }

    export default SelectWinners