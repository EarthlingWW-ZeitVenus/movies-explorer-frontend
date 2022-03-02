import { Switch, Route } from 'react-router-dom';
import './Navigation.css';

function Navigation({ onBurgerMenu }) {
  return (
    <Switch>
      <Route exact path="/">
        <ul className="navigation-landing">
          <li className="navigation-landing__item">
            <a className="navigation-landing__button" href="/signup">Регистрация</a>
          </li>
          <li className="navigation-landing__item navigation-landing__item_signin">
            <a className="navigation-landing__button" href="/signin">Войти</a>
          </li>
        </ul>
      </Route>
      <Route path="*">
        <div className="navigation-burger-menu" onClick={onBurgerMenu}></div>
        <div className="navigation-internal">
          <ul className="navigation-internal__links-container">
            <li className="navigation-internal__item">
              <a className="navigation-internal__link navigation-internal__link_active" href="/movies">Фильмы</a>
            </li>
            <li className="navigation-internal__item">
              <a className="navigation-internal__link" href="/saved-movies">Сохранённые фильмы</a>
            </li>
          </ul>
          <a className="navigation-internal__button navigation-internal__button_active" href="/profile">Аккаунт</a>
        </div>
      </Route>
    </Switch>
  );
}

export default Navigation;
