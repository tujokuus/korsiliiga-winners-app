import axios from "axios"

const matches = 'http://localhost:3001/matches'
const standings = 'http://localhost:3001/standings'

const getMatches = () => {
    return axios.get(matches)
}

const getStandings = () => {
    return axios.get(standings)
}

export default { getMatches, getStandings }