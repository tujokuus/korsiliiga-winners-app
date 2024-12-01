import axios from "axios"

const baseUrl = 'http://localhost:3001/api'


const getMatches = () => {
    return axios.get(`${baseUrl}/matches`)
}

const getStandings = () => {
    return axios.get(`${baseUrl}/standings`)
}

const savePredictions = (prediction) => {
    return axios.post(`${baseUrl}/predictions`, prediction)
}

const getPredictions = () => {
    return axios.get(`${baseUrl}/predictions`)
}

const updatePredictions = (id, prediction) => {
    return axios.patch(`${baseUrl}/predictions/${id}`, prediction)
}

const getResults = () => {
    return axios.get(`${baseUrl}/results`)	
}

export default { getMatches, getStandings, savePredictions, getPredictions, updatePredictions, getResults }
