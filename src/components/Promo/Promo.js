import './Promo.css';
import textLandingLogo from '../../images/text-landing-logo.svg';

function Promo({ colorThemeDark }) {
  return (
    <section className={`promo page_format_side-padding page_format_top-bottom-padding ${colorThemeDark && 'page_theme_dark'}`}>
      <div className="promo__container">
        <h1 className="promo__title page_format_all-title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__help-text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__button" href="#about-project">Узнать больше</a>
      </div>
      <img className="promo__landing-logo" src={textLandingLogo} alt="Логотип с изображением глобуса" />
    </section>
  );
}

export default Promo;
