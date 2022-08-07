import React from "react";


function Card(card) { //или так: function Card(props) {
    function handleClick() {
        card.onCardClick(card); //или так: props.onCardClick(props.card);
    }

    return (
        <>
            <article className="element">
                <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
                <div className="element__description">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__likeBox">
                        <button className="element__like" type="button"></button>
                        <h4 className="element__likeCounter">{card.likes}</h4>
                    </div>
                </div>
                <button className="element__delete" type="button"></button>
            </article>
        </>
    );
}

export default Card;

//или так (стр.12): <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
//или так (стр.14): <h2 className="element__title">{props.name}</h2>
//или так (стр.17): <h4 className="element__likeCounter">{props.likes}</h4>
