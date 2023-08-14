/* eslint-disable */
import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_big-image ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container-image">
        <button
          className="popup__button-close popup__button-close_image"
          onClick={props.onClose}
        />
        <img
          className="popup__image"
          alt={props.card.name}
          src={props.card.link}
        />
        <h2 className="popup__subtitle-image">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
