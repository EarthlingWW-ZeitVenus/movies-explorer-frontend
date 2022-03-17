import './Techs.css';

function Techs() {
  return (
    <section className="techs page_format_side-padding">

      <div className="techs__title-container main__section_format_title-container">
        <h2 className="techs__title main__section_format_title page_format_all-title">Технологии</h2>
      </div>

      <h2 className="techs__content-title page_format_all-title">7 технологий</h2>

      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

      <div className='techs__elements-container'>
        <div className='techs__element'>HTML</div>
        <div className='techs__element'>CSS</div>
        <div className='techs__element'>JS</div>
        <div className='techs__element'>React</div>
        <div className='techs__element'>Git</div>
        <div className='techs__element'>Express.js</div>
        <div className='techs__element'>mongoDB</div>
      </div>

    </section>
  );
}

export default Techs;
