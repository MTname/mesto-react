import React, { useState } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onDeleteCardClick, onCardClick }) {
    const [cards, setCards] = useState([]);
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userDescription, setUserDescription] = useState('');

    React.useEffect(() => {
        Promise.all([api.getUser(), api.getCards()])
        .then(([user, cards]) => {
            setUserName(user.name);
            setUserDescription(user.about);
            setUserAvatar(user.avatar);
            setCards(cards);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }, []);
    
    return (
    <main className="content">
        <section className="profile content__profile-gap">
            <button className="profile__avatar" onClick={onEditAvatar} type="button" aria-label="Кнопка редактирования аватара" style={{ backgroundImage: `url(${userAvatar})` }}></button>
            <div className="profile__info">
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Кнопка редактирования профиля"></button>
                <p className="profile__text">{userDescription}</p>
            </div>
            <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Кнопка добавления карточки"></button>
        </section>
        <section className="elements" aria-label="Каталог изображений">
            {cards.map((data) => {
                return (
                    <Card
                        key={data._id}
                        name={data.name}
                        link={data.link}
                        likes={data.likes.length}
                        onCardClick={onCardClick}
                    />
                )
            })}
        </section>
    </main>
    );
}

export default Main;
