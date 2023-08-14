/* eslint-disable */
import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-username"
        type="text"
        name="name"
        className="popup__type popup__type_input_username"
        placeholder="Имя"
        required
        value={name ?? ""}
        onChange={(e) => setName(e.target.value)}
        minLength={2}
        maxLength={40}
      />
      <span id="input-username-error" className="error error_username" />
      <input
        id="input-about"
        type="text"
        name="about"
        className="popup__type popup__type_input_job"
        placeholder="О себе"
        required
        value={description ?? ""}
        onChange={(e) => setDescription(e.target.value)}
        minLength={2}
        maxLength={200}
      />
      <span id="input-job-error" className="error error_job" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
