import SelectWinners from '../components/SelectWinners'
import SendButton from '../components/SendButton'
import Standings from '../components/Standings'

const PickEms = ({ matches, handleWinnerSelect, handleSend, standings }) => {
  return (
    <div className='pickems-container'>
      <div className='matches-container'>
        <h2>Ennusta korisliiga otteluiden voittajat!</h2>
        {matches.map((match) => (
          <SelectWinners key={match.id} match={match} onWinnerSelect={handleWinnerSelect} />
        ))}
        <SendButton handleSend={handleSend} />
        <div className='standigs-container'>
          <strong>Sarjataulukko</strong>
          <Standings standings={standings} />
        </div>
      </div>
    </div>
  )
}

export default PickEms;
