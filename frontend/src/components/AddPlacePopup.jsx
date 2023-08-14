/* eslint-disable */
import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }
  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-title"
        type="text"
        name="name"
        className="popup__type popup__type_input_title"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        value={name ?? ""}
        onChange={(e) => setName(e.target.value)}
      />
      <span id="input-title-error" className="error error_username" />
      <input
        id="input-href"
        type="url"
        name="link"
        className="popup__type popup__type_input_href"
        placeholder="Ссылка на картинку"
        required
        value={link ?? ""}
        onChange={(e) => setLink(e.target.value)}
      />
      <span id="input-href-error" className="error error_job" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
