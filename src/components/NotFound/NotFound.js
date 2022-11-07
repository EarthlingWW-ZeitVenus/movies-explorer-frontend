import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  console.log('обращение к компоненту NotFound');
  const history = useHistory();
  return (
    <section className="not-found page_format_side-padding">
      <h2 className="not-found__title page_format_all-title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__link" onClick={history.goBack}>Назад</button>
    </section>
  );
}

export default NotFound;
