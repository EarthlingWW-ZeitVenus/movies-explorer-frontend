import React from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import './Navigation.css';
import profileIcon from '../../images/profile-icon-light.svg';

function Navigation({ colorThemeDark, onBurgerMenu }) {
  const { isLoggedIn } = React.useContext(CurrentDataContext);

  function whichElementToDisplay() {
    if (isLoggedIn) {
      return (
        <>
        <div
          className={`navigation-burger-menu ${colorThemeDark && 'navigation-burger-menu_light'}`}
          onClick={onBurgerMenu}>
        </div>
        <div className="navigation-internal">
          <ul className="navigation-internal__links-container">
            <li className="navigation-internal__item">
              <NavLink
                className="navigation-internal__link"
                activeClassName="navigation__link_active"
                to="/movies">
                Фильмы
              </NavLink>
            </li>
            <li className="navigation-internal__item">
              <NavLink
                className="navigation-internal__link"
                activeClassName="navigation__link_active"
                to="/saved-movies">
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink
            className={`navigation-internal__button ${colorThemeDark && 'navigation-internal__button_light'}`}
            activeClassName="navigation__link_active"
            to="/profile">
            {colorThemeDark
              && <img
                   className="navigation-internal__profile-icon"
                   src={profileIcon}
                   alt="Иконка редактирования профиля" />}
            Аккаунт
          </NavLink>
        </div>
        </>
      );
    }
    return (
      <ul className="navigation-landing">
        <li className="navigation-landing__item">
          <Link className="navigation-landing__button" to="/signup">Регистрация</Link>
        </li>
        <li className="navigation-landing__item navigation-landing__item_signin">
          <Link className="navigation-landing__button" to="/signin">Войти</Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navigation">
      {whichElementToDisplay()}
    </nav>
  );
}

export default Navigation;
