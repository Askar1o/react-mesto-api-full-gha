/* eslint-disable */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Register({ handleInfoTooltip }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    auth
      .register(password, email)
      .then((data) => {
        if (data) {
          navigate("/sign-in");
          handleInfoTooltip(true);
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      });
  }
  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Регистрация</h2>
        <form
          action=""
          onSubmit={handleSubmit}
          className="auth__form auth__form_login"
        >
          <input
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="input-email"
            placeholder="Email"
            type="email"
            className="auth__input auth__input_email"
            required
          />
          <input
            value={password ?? ""}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="input-password"
            placeholder="Пароль"
            type="password"
            className="auth__input auth__input_password"
            required
          />
          <button className="login__button" type="submit">
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="auth__link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
