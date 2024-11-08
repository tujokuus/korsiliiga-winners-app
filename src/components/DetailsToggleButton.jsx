import React from "react";

const DetailsToggleButton = ({ toggleDetails }) => {
    return (
        <button type='button' onClick={toggleDetails}>
            {toggleDetails ? 'Piilota tiedot' : 'Näytä tiedot'}
        </button>
    )
}

export default DetailsToggleButton