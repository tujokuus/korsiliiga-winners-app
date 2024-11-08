import { useState } from 'react'
import './selectWinners.css'
  
  
  // Voittajien valitsemis komponentti jossa käytetään radio buttonia
  const SelectWinners = ({ match, onWinnerSelect }) => {
      const { teamA, teamB } = match
      const date = match.date
      const [selectedTeam, setSelectedTeam] = useState({})
      
      
      const handleSelection = (team) => {
        setSelectedTeam(team)
        onWinnerSelect(match.id, team)
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

        </div>
        <div className="team-selection">
        <p><strong>Ottelu:</strong></p>
          
          <div
            className={`team-name ${selectedTeam === teamA.name ? 'selected' : ''}`}
            onClick={() => handleSelection(teamA.name)}
          >
            {teamA.name}
          </div>
          <div
            className={`team-name ${selectedTeam === teamB.name ? 'selected' : ''}`}
            onClick={() => handleSelection(teamB.name)}
          >
            {teamB.name}
          </div>
          <p>
            <strong>pvm:</strong> {formattedDate} <br />
            <strong>aika:</strong> {formattedTime}
          </p>
        </div> 
      </div>
    </form>
      )
    }

    export default SelectWinners