import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

axios
  .get("http://localhost:3001/matches")
  .then(response => {
    const matches = response.data
    console.log(matches)
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  })
  