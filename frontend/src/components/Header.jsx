/* eslint-disable */
import React from "react";
import logoMesto from "../images/logo.svg";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={logoMesto} alt="Логотип Место" className="header__logo" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="navigate__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="navigate__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <nav className="navigate">
              <p className="navigate__email">{email}</p>
              <button onClick={onSignOut} className="navigate__button">
                Выйти
              </button>
            </nav>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
