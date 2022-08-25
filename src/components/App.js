import 'index.css';
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';

function App() {
    
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };
    
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
    };
    
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(!isAddPlacePopupOpen);
    };
    const [selectedCard, setSelectedCard] = React.useState(null);
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };
    
    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
    };
    
    // декларативное закрытие на Esc
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;
    React.useEffect(() => {
        function handleEscClose(event) {
            if(event.key === 'Escape') {
                closeAllPopups();
            }
        }
        if(isOpen) {
            document.addEventListener('keydown', handleEscClose);
            return () => {
                document.removeEventListener('keydown', handleEscClose);
            };
        }
    }, [isOpen]);

    // загрузка данных пользователя
    React.useEffect(() => {
        api.getUser()
        .then((res) => setCurrentUser(res))
        .catch((err) => console.log(err)); // выведем ошибку в консоль
    }, []);
    
    // загрузка карточек
    React.useEffect(() => {
        api.getCards()
        .then((res) => setCards(res))
        .catch((err) => console.log(err));
    }, []);
    
    const handleUpdateAvatar = (avatarData) => {
        api.editAvatar(avatarData)
        .then((newData) => {
            setCurrentUser(newData);
            closeAllPopups();
        })
        .catch((err) => console.log(err));
    };
    
    const handleUpdateUser = (userData) => {
        api.editUserInfo(userData)
        .then((newData) => {
            setCurrentUser(newData);
            closeAllPopups();
        })
        .catch((err) => console.log(err));
    };
    
    const handleAddPlaceSubmit = (cardData) => {
        api.addCard(cardData)
        .then((newCard) => {
            setCards((cards) => [newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => console.log(err));
    };

    // Функция установки/снятия лайка на карточку
    function handleCardLike(id, isLiked) {
        api.switchLike(id, isLiked) // проверяем, есть ли уже лайк на этой(id) карточке: добавить/снять лайк
        .then((res) => {
            setCards((state) => state.map(card => card._id === res._id ? res : card));
        })
        .catch((err) => console.log(err));
    }

    // Функция удаления карточки
    function handleDeleteCardClick(cardId) {
        api.deleteCard(cardId) // проверяем _id владельца карточки: удаляем/нет
        .then((_id) => {
            setCards((state) => state.filter(card => card._id !== cardId));
        })
        .catch((err) => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardDelete={handleDeleteCardClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                />
                <Footer />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onUpdateAvatar={handleUpdateAvatar} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <ImagePopup name="photo" isOpen={!!selectedCard} card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
