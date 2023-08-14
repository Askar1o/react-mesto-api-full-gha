/* eslint-disable */
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = (`element__button ${
    isLiked && "element__button_active"
  }`);
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div className="element__template" id="cards">
      <div className="element">
        <div className="element__mask">
          {isOwn && (
            <button
              className="element__delete-button"
              type="button"
              onClick={handleDeleteClick}
            />
          )}
          <img
            className="element__mask-group"
            alt={props.card.name}
            src={props.card.link}
            onClick={handleClick}
          />
        </div>
        <div className="element__wrap">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-wrapper">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}
            ></button>
            <p className="element__like-quantity">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
