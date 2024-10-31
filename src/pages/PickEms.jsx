import SelectWinners from '../components/SelectWinners'
import SendButton from '../components/SendButton'

const PickEms = ({ matches, handleWinnerSelect, handleSend }) => {
  return (
    <>
      <h2>Ennusta korisliiga otteluiden voittajat!</h2>
      {matches.map((match) => (
        <SelectWinners key={match.id} match={match} onWinnerSelect={handleWinnerSelect} />
      ))}
      <SendButton handleSend={handleSend} />
    </>
  )
}

export default PickEms;
