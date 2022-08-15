import React from "react";


function Card(props) {
    function handleClick() {
        props.onCardClick(props);
    }

    return (
        <article className="element">
            <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
            <div className="element__description">
            <h2 className="element__title">{props.name}</h2>
                <div className="element__likeBox">
                    <button className="element__like" type="button"></button>
                    <h4 className="element__likeCounter">{props.likes}</h4>
                </div>
            </div>
            <button className="element__delete" type="button"></button>
        </article>
    );
}

export default Card;
