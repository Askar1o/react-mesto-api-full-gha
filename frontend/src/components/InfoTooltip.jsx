/* eslint-disable */
import React from "react";
import ok from "../images/ok.png";
import err from "../images/err.png";

function InfoTooltip({ onClose, result: { isOpen, successful } }) {
  return (
    <div className={`popup popup_type_info ${isOpen ? "popup_opened" : false}`}>
      <div className="popup__container popup__container_info">
        <img
          className="popup__photo popup__photo_info"
          src={successful ? ok : err}
          alt="Значок результата операции"
        />
        <h2 className={`popup__title_info`}>
          {successful
            ? "Вы успешно зарегестрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
        <button
          onClick={onClose}
          className="popup__button-close"
          type="button"
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
