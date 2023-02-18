import './Header.css';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ colorThemeDark, onBurgerMenu }) {
  console.log('обращение к компоненту Header');
  return (
    <header className={`header page_format_side-padding ${colorThemeDark && 'page_theme_dark'}`}>
      <div className="header__container">
        <Link className="header__logo-link" to="/"><img className="header__logo" src={headerLogo} alt="Логотип заголовка страницы" /></Link>
        <Navigation colorThemeDark={colorThemeDark} onBurgerMenu={onBurgerMenu}/>
      </div>
    </header>
  );
}

export default Header;
