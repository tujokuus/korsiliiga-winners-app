import './TopBar.css';
import React from "react";  

const TopBar = ({ handleSend, points, showTopBar }) => {
    return (
        <div className={`top-bar ${showTopBar ? 'visible' : ''}`}>
            <button onClick={handleSend}>Tallenna</button>
            <span>Omat pisteet: {points}</span>
        </div>
    )
}

export default TopBar