import axios from "axios"

const baseUrl = 'http://localhost:3001/matches'

const getMatches = () => {
    return axios.get(baseUrl)
}

export default { getMatches }