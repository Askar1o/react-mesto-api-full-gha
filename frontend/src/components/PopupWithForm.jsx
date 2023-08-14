/* eslint-disable */
import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__container popup__container_${props.name}`}>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className={`popup__title popup__title_${props.name}`}>
          {props.title}
        </h2>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={`popup__form_${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className="popup__button-save"
            type="submit"
          >{`${props.buttonText}`}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
