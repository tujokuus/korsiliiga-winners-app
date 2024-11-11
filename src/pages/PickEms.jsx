import SelectWinners from '../components/SelectWinners/SelectWinners.jsx'
import SendButton from '../components/SendButton'
import Standings from '../components/Standings/Standings.jsx'
import WeekSelector from '../components/WeekSelector/WeekSelector.jsx'
import './pickEms.css'

const PickEms = ({ matches, handleWinnerSelect, handleSend, standings, selectedWeek, handleSelectedWeek }) => {
  const getWeekNumber = (date) => {
    const d = new Date(date);
    const oneJan = new Date(d.getFullYear(), 0, 1)
    const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000))
    return Math.ceil((d.getDay() + 1 + numberOfDays) / 7)
  }

  const filteredMatches = selectedWeek === 0
  ? matches
  : matches.filter(
      (match) => getWeekNumber(match.date) === selectedWeek
    )

  //console.log("handlewinnerselect: ", handleWinnerSelect);
  //console.log("handle send: ", handleSend);
  //console.log("selected Week pickems sivulla: ", selectedWeek, "handleselectedWeek pickems sivulla: ", handleSelectedWeek)



  return (
    <div className='pickems-container'>
      <div className='matches-container'>
        <h2>Ennusta korisliiga otteluiden voittajat!</h2>
        <WeekSelector selectedWeek={selectedWeek} setSelectedWeek={handleSelectedWeek}/>
        {filteredMatches.map((match) => (
          <SelectWinners key={match.id} match={match} onWinnerSelect={handleWinnerSelect} />
        ))}
        <div className='sendbutton-container'>
          <SendButton handleSend={handleSend} />
        </div>
      </div>
        <div className='standings-container'>
          <Standings standings={standings} />
      </div>
    </div>
  )
}

export default PickEms;
