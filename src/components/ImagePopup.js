import React from "react";

function ImagePopup({ name, card, isOpen, onClose }) {
    
    return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_active" : ''}`} onClick={onClose}>
        <div className="popup__illustration" onClick={(event) => {event.stopPropagation()}}>
            <button className="popup__close-button popup__close-button_type_openImg" onClick={onClose} type="button"></button>
            <img className="popup__image" src={`${card?.link || '#'}`} alt={`${card?.name ?? ' '}`}/>
            <p className="popup__subtitle">{`${card?.name ?? ' '}`}</p>
        </div>
    </div>
    );
}

export default ImagePopup;

//или так (стр.9): <img className="popup__image" src={`${card.card.link}`} alt={`${card.card.name}`}/>
//или так (стр.10): <p className="popup__subtitle">{`${card.card.name}`}</p>
