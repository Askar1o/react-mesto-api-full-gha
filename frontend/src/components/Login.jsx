/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({ handleLogin, handleInfoTooltip }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    auth
      .login(password, email)
      .then((data) => {
        localStorage.setItem("token", data.token);
        handleLogin();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      });
  }
  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Вход</h2>
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
