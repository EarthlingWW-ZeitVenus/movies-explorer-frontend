import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found page_format_side-padding">
      <h2 className="not-found__title page_format_all-title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <a className="not-found__link" href="/signin">Назад</a>
    </section>
  );
}

export default NotFound;
