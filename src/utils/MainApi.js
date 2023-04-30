import { apiConstants } from './constants';

const { MAIN_URL } = apiConstants;

// адрес, который должен быть - https://movie-explorer.api.nomoredomains.rocks
// временный адрес, пока облако не оплачу - http://192.168.0.154:3000
// fake-server.local.org - переделанный hosts, чтоб кукисы принимались

// Обработка логики then
const thenResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(res);
};

// Авторизация пользователя
// eslint-disable-next-line no-undef
const login = (email, password) => fetch(`${MAIN_URL}/signin`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then(
    (res) => thenResponse(res),
  );

// Регистрация пользователя
// eslint-disable-next-line no-undef
const register = (name, email, password) => fetch(`${MAIN_URL}/signup`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  body: JSON.stringify({ name, email, password }),
})
  .then((res) => thenResponse(res));

// Выход пользователя
// eslint-disable-next-line no-undef
const logout = () => fetch(`${MAIN_URL}/users/signout`, {
  method: 'DELETE',
  credentials: 'include',
})
  .then((res) => thenResponse(res));

// Получить информацию о текущем пользователе
// eslint-disable-next-line no-undef
const getUser = () => fetch(`${MAIN_URL}/users/me`, {
  credentials: 'include',
  headers: {
    accept: 'application/json',
  },
})
  .then((res) => thenResponse(res));

// Редактировать информацию о текущем пользователе
// eslint-disable-next-line no-undef
const editUser = (email, name) => fetch(`${MAIN_URL}/users/me`, {
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
// eslint-disable-next-line no-undef
const getMovies = () => fetch(`${MAIN_URL}/movies`, {
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
  imageUrl,
  trailer,
  thumbnail,
  id,
  nameRU,
  nameEN,
  // eslint-disable-next-line no-undef
) => fetch(`${MAIN_URL}/movies`, {
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
    imageUrl,
    trailer,
    thumbnail,
    id,
    nameRU,
    nameEN,
  }),
})
  .then((res) => thenResponse(res));

// Удалить информацию о фильме с сервера
// eslint-disable-next-line no-undef
const deleteMovie = (dbMovieId) => fetch(`${MAIN_URL}/movies/${dbMovieId}`, {
  method: 'DELETE',
  credentials: 'include',
})
  .then((res) => thenResponse(res));

export {
  login, register, logout, getUser, editUser, getMovies, addMovie, deleteMovie,
};
