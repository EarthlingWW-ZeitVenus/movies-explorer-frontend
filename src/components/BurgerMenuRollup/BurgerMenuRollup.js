import './BurgerMenuRollup.css';
import closeButton from '../../images/close-button.svg';

function BurgerMenuRollup({ isOpen, onClose }) {
  return (
    <section className={`burger-menu-rollup ${isOpen && 'burger-menu-rollup_active'} page_format_side-padding`}>
      <div className={`burger-menu-rollup__container ${isOpen && 'burger-menu-rollup__container_active'}`}>
        <button
          className="burger-menu-rollup__close-button"
          type="button"
          onClick={onClose}
        >
          <img
            className="burger-menu-rollup__close-button-image"
            src={closeButton}
            alt="Логотип заголовка страницы"
          />
        </button>
        <ul className="burger-menu-rollup__links-container">
          <li className="burger-menu-rollup__item">
            <a className="burger-menu-rollup__link" href="/">Главная</a>
          </li>
          <li className="burger-menu-rollup__item">
            <a className="burger-menu-rollup__link burger-menu-rollup__link_active" href="/movies">Фильмы</a>
          </li>
          <li className="burger-menu-rollup__item">
            <a className="burger-menu-rollup__link" href="/saved-movies">Сохранённые фильмы</a>
          </li>
        </ul>
        <a className="burger-menu-rollup__profile-link" href="/profile">Аккаунт</a>
      </div>
    </section>
  );
}

export default BurgerMenuRollup;
