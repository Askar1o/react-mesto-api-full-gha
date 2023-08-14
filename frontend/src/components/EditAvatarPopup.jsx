/* eslint-disable */
import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="update"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-update"
        type="url"
        name="avatar"
        className="popup__type popup__type_input_update"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span id="input-update-error" className="error error_username" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
