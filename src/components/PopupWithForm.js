import React from "react";

function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit }) {
    const className = `popup popup_type_${name} ${isOpen ? "popup_active" : ''}`;
    
    // ДРУГАЯ реализация закрытия на оверлей и крестик
    // const handlePopupClick(event) {
    //     if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
    //         onClose();
    //     }
    // }
    
    return (
    <div className={className} onClick={onClose} /*onMouseDown={handlePopupClick}*/>
        <div className="popup__box" onClick={(event) => {event.stopPropagation()}}>
            <button className="popup__close-button" onClick={onClose} type="button"></button>
            <h2 className="popup__title">{title}</h2>
            <form className="popup__form" name={`form-${name}`} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    </div>
    );
}

export default PopupWithForm;
