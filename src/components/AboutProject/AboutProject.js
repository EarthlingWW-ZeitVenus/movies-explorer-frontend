import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project page_format_side-padding" id="about-project">

      <div className="about-project__title-container main__section_format_title-container">
        <h2 className="about-project__title main__section_format_title page_format_all-title">О проекте</h2>
      </div>

      <div className="about-project__text-container">
        <div className="about-project__text-block">
          <h3 className="about-project__text-title page_format_all-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__text-block">
          <h3 className="about-project__text-title page_format_all-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text"> У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <div className="about-project__info-week-container">
          <p className="about-project__info-week">1 неделя</p>
          <p className="about-project__info-week">4 недели</p>
          <p className="about-project__info-week-annot">Back-end</p>
          <p className="about-project__info-week-annot">Front-end</p>
      </div>

    </section>
  );
}

export default AboutProject;
