import './Header.css';
import headerLogo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ colorThemeDark, onBurgerMenu }) {
  console.log('обращение к компоненту Header');
  return (
    <header className={`header page_format_side-padding ${colorThemeDark && 'page_theme_dark'}`}>
      <div className="header__container">
        <img className="header__logo" src={headerLogo} alt="Логотип заголовка страницы" />
        <Navigation onBurgerMenu={onBurgerMenu}/>
      </div>
    </header>
  );
}

export default Header;
