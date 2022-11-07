/* eslint-disable no-undef */
import React from 'react';
import { localSorageConstants } from './constants';
// import { filterShortFilm } from './utils';

function useLocalStorage(isLoggedIn) {
  // debugger;
  console.log('Произошло обращение к кастомному хуку useLocalStorage');
  const { KEY_FOR_MOVIES_ARRAY, KEY_FOR_FORM, KEY_FOR_OWNED_MOVIES_ARRAY } = localSorageConstants;
  // const { SHORT_FILM_MAX_DURATION } = numberConstants;

  const getLocalValue = (key) => {
    console.log(`Обращение к инициализации стейта внутри getInitialValue, с ключом - ${key}`);
    // debugger;
    // window.localStorage.clear();
    let initialValue;
    if ((key === KEY_FOR_MOVIES_ARRAY) || (key === KEY_FOR_OWNED_MOVIES_ARRAY)) {
      initialValue = [];
    } else {
      initialValue = {};
    }
    const keyValue = window.localStorage.getItem(key);
    // debugger;
    return keyValue ? JSON.parse(keyValue) : initialValue;
  };

  const [moviesArray, setMoviesArray] = React.useState([]);
  const [ownedMoviesArray, setOwnedMoviesArray] = React.useState([]);
  // const [filteredMoviesArray, setFilteredMoviesArray] = React.useState([]);
  // const [filteredOwnedMoviesArray, setFilteredOwnedMoviesArray] = React.useState([]);
  const [formState, setFormState] = React.useState(getLocalValue(KEY_FOR_FORM));

  console.log('moviesArrai in use-local-storage:');
  console.log(moviesArray);
  console.log('ownedMoviesArray in use-local-storage:');

  const handleSaveArray = (moviesArrayData) => {
    window.localStorage.setItem(KEY_FOR_MOVIES_ARRAY, JSON.stringify(moviesArrayData));
    setMoviesArray(moviesArrayData);
  };

  // const handleSaveFilteredMoviesArray = (filteredMoviesArrayData) => {
  //   setFilteredMoviesArray(filteredMoviesArrayData);
  // };

  // const handleSaveFilteredOwnedMoviesArray = (filteredOwnedMoviesArrayData) => {
  //   setFilteredOwnedMoviesArray(filteredOwnedMoviesArrayData);
  // };

  const handleSaveOwnedMovies = (ownedMoviesArrayData) => {
  // window.localStorage.setItem(KEY_FOR_OWNED_MOVIES_ARRAY, JSON.stringify(ownedMoviesArrayData));
    setOwnedMoviesArray(ownedMoviesArrayData);
  };

  const handleSaveForm = (formStateData) => {
    debugger;
    const { filmName, shortFilm } = formStateData;
    window.localStorage.setItem(KEY_FOR_FORM, JSON.stringify({ filmName, shortFilm }));
    setFormState({ filmName, shortFilm });
  };

  React.useEffect(() => {
    debugger;
    console.log('запрос внутри хука эффекта локального хранилища');
    if (isLoggedIn) {
      debugger;
      setMoviesArray(getLocalValue(KEY_FOR_MOVIES_ARRAY));
      // setOwnedMoviesArray(getLocalValue(KEY_FOR_OWNED_MOVIES_ARRAY));
      // setFilteredMoviesArray(filterShortFilm(moviesArray, SHORT_FILM_MAX_DURATION));
      // setFilteredOwnedMoviesArray(filterShortFilm(ownedMoviesArray, SHORT_FILM_MAX_DURATION));
      // setFormState(getLocalValue(keyForForm));
      // setCurrentUser(getLocalValue(keyForCurrentUser));
    }
  }, [isLoggedIn]);

  console.log('Всё содержимое хранилища localStorage:');
  console.log(JSON.stringify(window.localStorage, null, 2));

  return {
    moviesArray,
    ownedMoviesArray,
    // filteredMoviesArray,
    // filteredOwnedMoviesArray,
    formState,
    handleSaveArray,
    handleSaveForm,
    handleSaveOwnedMovies,
    // handleSaveFilteredMoviesArray,
    // handleSaveFilteredOwnedMoviesArray,
  };
}

export default useLocalStorage;
