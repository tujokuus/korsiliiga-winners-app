import axios from "axios"

const baseUrl = 'http://localhost:3001'
const matches = 'http://localhost:3001/matches'
const standings = 'http://localhost:3001/standings'

const getMatches = () => {
    return axios.get(matches)
}

const getStandings = () => {
    return axios.get(standings)
}

const savePredictions = (prediction) => {
    return axios.post(`${baseUrl}/predictions`, prediction);
}

const getPredictions = () => {
    return axios.get(`${baseUrl}/predictions`)
}

export default { getMatches, getStandings, savePredictions, getPredictions }