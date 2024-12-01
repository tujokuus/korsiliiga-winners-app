import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

axios
  .get("http://localhost:3001/api/matches")
  .then(response => {
    const matches = response.data
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  })
  