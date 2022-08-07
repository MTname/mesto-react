import React from "react";

import 'index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    
    // императивное закрытие на Esc (декларативное см. PopupWithForm.js/ImagePopup.js)
    // const handleEscClose = (event) => {
    //     if (event.key === 'Escape') {
    //         closeAllPopups();
    //     }
    // };
    
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
        // document.addEventListener('keydown', handleEscClose); // императивное закрытие на Esc
    };
    
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
        // document.addEventListener('keydown', handleEscClose); // императивное закрытие на Esc
    };
    
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(!isAddPlacePopupOpen);
        // document.addEventListener('keydown', handleEscClose); // императивное закрытие на Esc
    };

    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
    const handleDeleteCardClick = () => {
        setDeleteCardPopupOpen(!isDeleteCardPopupOpen);
        // document.addEventListener('keydown', handleEscClose); // императивное закрытие на Esc
    };
    
    const [selectedCard, setSelectedCard] = useState(null);
    //или так (см. ImagePopup.js стр. 32, 33): const [selectedCard, setSelectedCard] = useState({ isOpen: false, card: {} });
    const handleCardClick = (card) => {
        setSelectedCard(card); //или так (см. ImagePopup.js стр. 32, 33): setSelectedCard({ isOpen: true, card: card });
        // document.addEventListener('keydown', handleEscClose); // императивное закрытие на Esc
    };

    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeleteCardPopupOpen(false);
        setSelectedCard(null); //или так (см. ImagePopup.js стр. 32, 33): setSelectedCard({ isOpen: false, card: {} });
        // document.removeEventListener('keydown', handleEscClose); // императивное закрытие на Esc
    };
    
    return (
        <div className="page">
            <>
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onDeleteCardClick={handleDeleteCardClick}
                    onCardClick={handleCardClick}
                />
                <Footer />
                <PopupWithForm name="avatar" title="Обновить аватар" btnText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                    <input className="popup__form-input popup__form-input_value_text" id="input-avatar" type="url" name="avatarUrl" placeholder="Путь файла фото" autoComplete="off" minLength={2} required/>
                    <span className="popup__form-input-error input-avatar-error"></span>
                </PopupWithForm>
                <PopupWithForm name="info" title="Редактировать профиль" btnText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                    <input className="popup__form-input popup__form-input_value_name" id="input-title" type="text" name="author" placeholder="Введите имя" autoComplete="off" minLength={2} maxLength={40} required/>
                    <span className="popup__form-input-error input-title-error"></span>
                    <input className="popup__form-input popup__form-input_value_text" id="input-job" type="text" name="text" placeholder="Профессия, интересы" autoComplete="off" minLength={2} maxLength={200} required/>
                    <span className="popup__form-input-error input-job-error"></span>
                </PopupWithForm>
                <PopupWithForm name="card-item" title="Новое место" btnText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                    <input className="popup__form-input popup__form-input_value_name" id="input-name" type="text" name="placeName" placeholder="Название" autoComplete="off" minLength={2} maxLength={30} required/>
                    <span className="popup__form-input-error input-name-error"></span>
                    <input className="popup__form-input popup__form-input_value_text" id="input-link" type="url" name="text" placeholder="Путь файла фото" autoComplete="off" minLength={2} required/>
                    <span className="popup__form-input-error input-link-error"></span>
                </PopupWithForm>
                <PopupWithForm name="deleteCard" title="Вы уверены?" btnText="Да" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups}></PopupWithForm>
                <ImagePopup name="photo" isOpen={!!selectedCard} /*или так: isOpen={selectedCard.isOpen}*/ card={selectedCard} onClose={closeAllPopups}></ImagePopup>
            </>
        </div>
    );
}

export default App;
