import { apiConstants } from './constants';

const { MOVIES_URL } = apiConstants;

// Обработка логики then
const thenResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(res);
};

// Поиск фильмов по заданным критериям
function getMoviesCards() {
  debugger;
  // eslint-disable-next-line no-undef
  return fetch(String(MOVIES_URL), {
  // credentials: 'include',
    headers: {
      accept: 'application/json',
    },
  })
    .then((res) => thenResponse(res));
}

export default getMoviesCards;
