import './Footer.css';

function Footer() {
  console.log('обращение к компоненту Footer');
  return (
    <footer className="footer page_format_side-padding">

      <h4 className="footer__title page_format_all-title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>

      <div className="footer__container">
        <p className="footer__copyright">&#169; {new Date().getFullYear()}</p>
        <ul className="footer__links-container">
          <li className="footer__link-item">
            <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__link-item">
            <a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
          </li>
          <li className="footer__link-item">
            <a className="footer__link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
          </li>
        </ul>
      </div>

    </footer>
  );
}

export default Footer;
