import React from "react";

function PopupWithForm({ name, title, btnText, children, isOpen, onClose }) {
    const className = `popup popup_type_${name} ${isOpen ? "popup_active" : ''}`;
    
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
