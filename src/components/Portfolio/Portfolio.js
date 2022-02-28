import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio page_format_side-padding">

      <h3 className="portfolio__title page_format_all-title">Портфолио</h3>  

      <ul className="portfolio__container">
          
        <li className="portfolio__item portfolio__item_underlined">
          <a className="portfolio__link" href="https://github.com/EarthlingWW-ZeitVenus/how-to-learn" target="_blank" rel="noreferrer">
            <h4 className="portfolio__title-link page_font_title-style">Статичный сайт</h4>
          </a>
        </li>
        <li className="portfolio__item portfolio__item_underlined">
          <a className="portfolio__link" href="https://github.com/EarthlingWW-ZeitVenus/russian-travel" target="_blank" rel="noreferrer">
            <h4 className="portfolio__title-link page_font_title-style">Адаптивный сайт</h4>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/EarthlingWW-ZeitVenus/react-mesto-api-full" target="_blank" rel="noreferrer">
            <h4 className="portfolio__title-link page_font_title-style">Одностраничное приложение</h4>
          </a>
        </li>
      
      </ul>

    </section>
  );
}

export default Portfolio;
