import React from "react"
import './finalScore.css'


const FinalScore = ({ matchId, results }) => {
    console.log("FinalScore results: ", results, "matchId: ", matchId);

    const result = results.find(results => parseInt(results.match_id) === parseInt(matchId))
    console.log(result);

    return (
        <div className="final-score">
        {result ? (
          <div>
            <strong>{result.score} </strong>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    )
}

export default FinalScore