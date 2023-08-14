/* eslint-disable */
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <div className="profile">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="profile__avatar"
        />
        <button
          onClick={props.onEditAvatar}
          className="profile__avatar-button"
          type="button"
        />
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-button"
              type="button"
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"
        />
      </div>
      <div className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
        );
        })}
      </div>
      <Footer />
    </main>
  );
}

export default Main;
