// Обработка логики then
const thenResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(res);
};

// Авторизация пользователя
const login = (email, password) => fetch('https://movie-explorer.api.nomoredomains.rocks/signin', {
  method: 'POST',
  credentials: 'include',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then(
    (res) => thenResponse(res),
  );

// Регистрация пользователя
const register = (email, password) => fetch('https://movie-explorer.api.nomoredomains.rocks/signup', {
  method: 'POST',
  credentials: 'include',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((res) => thenResponse(res));

// Выход пользователя
const logout = () => fetch('https://movie-explorer.api.nomoredomains.rocks/users/signout', {
  method: 'DELETE',
  credentials: 'include',
})
  .then((res) => thenResponse(res));

// Получить информацию о текущем пользователе
const getUser = () => fetch('https://movie-explorer.api.nomoredomains.rocks/users/me', {
  credentials: 'include',
  headers: {
    accept: 'application/json',
  },
})
  .then((res) => thenResponse(res));

// Редактировать информацию о текущем пользователе
const editUser = (email, name) => fetch('https://movie-explorer.api.nomoredomains.rocks/users/me', {
  method: 'PATCH',
  credentials: 'include',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  body: JSON.stringify({ email, name }),
})
  .then((res) => thenResponse(res));

// Получить массив с информацией о фильмах с сервера
const getMovies = () => fetch('https://movie-explorer.api.nomoredomains.rocks/movies', {
  credentials: 'include',
  headers: {
    accept: 'application/json',
  },
})
  .then((res) => thenResponse(res));

// Добавить информацию о новом фильме на сервер
const addMovie = (
  country,
  director,
  duration,
  year,
  description,
  image,
  trailer,
  nameRU,
  nameEN,
  thumbnail,
  movieId,
) => fetch('https://movie-explorer.api.nomoredomains.rocks/movies', {
  method: 'POST',
  credentials: 'include',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  }),
})
  .then((res) => thenResponse(res));

// Удалить информацию о фильме с сервера
const deleteMovie = (movieId) => fetch(`https://movie-explorer.api.nomoredomains.rocks/movies/${movieId}`, {
  method: 'DELETE',
  credentials: 'include',
})
  .then((res) => thenResponse(res));

export {
  login, register, logout, getUser, editUser, getMovies, addMovie, deleteMovie,
};
