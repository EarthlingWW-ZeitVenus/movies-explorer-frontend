// Обработка логики then
const thenResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(res);
};

// Поиск фильмов по заданным критериям
function getMoviesCards() {
  debugger;
  // eslint-disable-next-line no-undef
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
  // credentials: 'include',
    headers: {
      accept: 'application/json',
    },
  })
    .then((res) => thenResponse(res));
}

export default getMoviesCards;
