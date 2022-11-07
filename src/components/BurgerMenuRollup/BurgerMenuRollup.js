import { NavLink } from 'react-router-dom';
import './BurgerMenuRollup.css';
import closeButton from '../../images/close-button.svg';

function BurgerMenuRollup({ isOpen, onClose }) {
  return (
    <div className={`burger-menu-rollup ${isOpen && 'burger-menu-rollup_active'}`}>
      <button
        className="burger-menu-rollup__close-button"
        type="button"
        onClick={onClose}>
        <img
          className="burger-menu-rollup__close-button-image"
          src={closeButton}
          alt="Логотип заголовка страницы"/>
      </button>
        <ul className="burger-menu-rollup__links-container">
          <li className="burger-menu-rollup__item">
            <NavLink
              className="burger-menu-rollup__link"
              activeClassName="burger-menu-rollup__link_active"
              exact to="/">
              Главная
            </NavLink>
          </li>
          <li className="burger-menu-rollup__item">
            <NavLink
              className="burger-menu-rollup__link"
              activeClassName="burger-menu-rollup__link_active"
              to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li className="burger-menu-rollup__item">
            <NavLink
              className="burger-menu-rollup__link"
              activeClassName="burger-menu-rollup__link_active"
              to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink
          className="burger-menu-rollup__profile-link"
          activeClassName="burger-menu-rollup__profile-link_active"
          to="/profile">
          Аккаунт
        </NavLink>
    </div>
  );
}

export default BurgerMenuRollup;
