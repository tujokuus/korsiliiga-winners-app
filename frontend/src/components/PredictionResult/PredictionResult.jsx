import {useEffect, useState} from "react"
import './predictionResult.css'

const PredictionResult = ({ matchId, predictions, results }) => {
const [isPredictionCorrect, setIsPredictionCorrect] = useState(false)

useEffect(() => {
    const result = results.find(result => parseInt(result.match_id) === parseInt(matchId))
    const prediction = predictions.find(prediction => parseInt(prediction.match_id) === parseInt(matchId))
   
    if (result && prediction) {
        setIsPredictionCorrect(result.winner === prediction.predicted_winner)
    } else {
        setIsPredictionCorrect(null)
    }
}, [results, predictions, matchId])

    return (
        <div className={`prediction-result ${isPredictionCorrect !== null ? (isPredictionCorrect ? 'correct' : 'incorrect') : ''}`}>
        {isPredictionCorrect !== null ? (
          isPredictionCorrect ? <span className="correct">O</span> : <span className="incorrect">V</span>
        ) : (
          " "
        )}
      </div>
    )
}

export default PredictionResult