import './TopBar.css'
import React from "react"  
import { useLocation } from 'react-router-dom'

const TopBar = ({ handleSend, points, showTopBar }) => {
const location = useLocation()

if (location.pathname !== '/pickems') {
    return null
}

    return (
        <div className={`top-bar ${showTopBar ? 'visible' : ''}`}>
            <span>Omat pisteet: {points}</span>
            <button onClick={handleSend}>Tallenna</button>
        </div>
    )
}

export default TopBar