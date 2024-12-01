import React from "react";
import './detailsToggleButton.css'

const DetailsToggleButton = ({ showDetails ,toggleDetails }) => {
    return (
        <button type="button" onClick={toggleDetails} className="details-toggle-button">
            {showDetails ? '▲' : '▼'}
        </button>
    )
}

export default DetailsToggleButton