import React from "react";

function ImagePopup({ name, card, isOpen, onClose }) {

    // декларативное закрытие на Esc
    React.useEffect(() => {
        const handleEscClose = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscClose);
        } else {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [isOpen, onClose]);
    
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

//или так (стр.23): <img className="popup__image" src={`${card.card.link}`} alt={`${card.card.name}`}/>
//или так (стр.24): <p className="popup__subtitle">{`${card.card.name}`}</p>
