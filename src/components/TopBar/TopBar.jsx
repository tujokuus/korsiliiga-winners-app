import './TopBar.css';
import React from "react";  

const TopBar = ({ handleSend, points, showTopBar }) => {
    return (
        <div className={`top-bar ${showTopBar ? 'visible' : ''}`}>
            <span>Omat pisteet: {points}</span>
            <button onClick={handleSend}>Tallenna</button>
        </div>
    )
}

export default TopBar