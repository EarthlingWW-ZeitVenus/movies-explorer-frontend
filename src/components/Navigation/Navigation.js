import {
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import './Navigation.css';
// import useAllSimpleStates from '../../utils/use-simple-states';

function Navigation({ onBurgerMenu }) {
  // const { handleChange } = useAllSimpleStates();
  return (
    <nav className="navigation">
    <Switch>
      <Route exact path="/">
        <ul className="navigation-landing">
          <li className="navigation-landing__item">
            <Link className="navigation-landing__button" to="/signup">Регистрация</Link>
          </li>
          <li className="navigation-landing__item navigation-landing__item_signin">
            <Link className="navigation-landing__button" to="/signin">Войти</Link>
          </li>
        </ul>
      </Route>
      <Route path="*">
        <div className="navigation-burger-menu" onClick={onBurgerMenu}></div>
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
            className="navigation-internal__button"
            activeClassName="navigation__link_active"
            to="/profile">
            Аккаунт
          </NavLink>
        </div>
      </Route>
    </Switch>
    </nav>
  );
}

export default Navigation;
