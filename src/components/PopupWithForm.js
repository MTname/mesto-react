import React from "react";

function PopupWithForm({ name, title, btnText, children, isOpen, onClose }) {
    const className = `popup popup_type_${name} ${isOpen ? "popup_active" : ''}`;
    
    return (
    <div className={className} onClick={onClose}>
        <div className="popup__box" onClick={(event) => {event.stopPropagation()}}>
            <button className="popup__close-button" onClick={onClose} type="button"></button>
            <h2 className="popup__title">{title}</h2>
            <form className="popup__form" name={`form-${name}`}>
                {children}
                <button className="popup__save-button" type="submit">{btnText}</button>
            </form>
        </div>
    </div>
    );
}

export default PopupWithForm;
