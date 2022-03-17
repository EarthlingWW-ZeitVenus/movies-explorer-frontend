import './AboutMe.css';
import aboutMePhoto from '../../images/about-me-photo.jpg';

function AboutMe() {
  return (
    <section className="about-me page_format_side-padding">

      <div className="about-me__title-container main__section_format_title-container">
        <h2 className="about-me__title main__section_format_title page_format_all-title">Студент</h2>
      </div>

      <div className="about-me__container">
        <h2 className="about-me__title-name page_format_all-title">Виталий</h2>
        <img className="about-me__photo" src={aboutMePhoto} alt="моя фотография"/>
        <h2 className="about-me__title-profession page_format_all-title">Фронтенд-разработчик, 30 лет</h2>
        <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ.
          У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке,
          начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <div className="about-me__contacts-container">
          <a className="about-me__contacts" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
          <a className="about-me__contacts" href="https://github.com/EarthlingWW-ZeitVenus" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>

    </section>
  );
}

export default AboutMe;
