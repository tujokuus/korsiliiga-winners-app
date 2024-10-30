
// Voittajien valitsemis komponentti jossa käytetään radio buttonia
const SelectWinners = ({ match, onWinnerSelect }) => {
    const { teamA, teamB } = match
  
    const handleSelection = (event) => {
      onWinnerSelect(match.id, event.target.value)
    }
    return (
      <form>
        
        <div>
          <input 
            type='radio' 
            id={`teamA-${match.id}`} 
            name={`match-${match.id}`} 
            value={teamA.name}
            onChange={handleSelection}
          />
          <label htmlFor='matchAWinner'> {teamA.name} </label>
          
          <input 
            type="radio" 
            id={`teamB-${match.id}`} 
            name={`match-${match.id}`} 
            value={teamB.name}
            onChange={handleSelection}
          />
          <label htmlFor="matchAWinner"> {teamB.name}</label>
        </div>
      </form>
    )
  }

  export default SelectWinners