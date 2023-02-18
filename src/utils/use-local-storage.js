/* eslint-disable no-undef */
import React from 'react';
import { localSorageConstants } from './constants';

function useLocalStorage() {
  // debugger;
  console.log('Произошло обращение к кастомному хуку useLocalStorage');
  const { KEY_FOR_MOVIES_ARRAY, KEY_FOR_FORM, KEY_FOR_OWNED_MOVIES_ARRAY } = localSorageConstants;

  const getLocalValue = (key) => {
    // console.log(`Обращение к инициализации стейта внутри getInitialValue, с ключом - ${key}`);
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

  const [cachedMoviesArray, setCachedMoviesArray] = React.useState([]);
  const [moviesArray, setMoviesArray] = React.useState(getLocalValue(KEY_FOR_MOVIES_ARRAY));
  const [cachedOwnedMoviesArray, setCachedOwnedMoviesArray] = React.useState([]);
  const [ownedMoviesArray, setOwnedMoviesArray] = React.useState([]);
  const [formState, setFormState] = React.useState(getLocalValue(KEY_FOR_FORM));

  // console.log('cachedMoviesArray in use-local-storage:');
  // console.log(cachedMoviesArray);
  // console.log('moviesArray in use-local-storage:');
  // console.log(moviesArray);
  // console.log('cachedOwnedMoviesArray in use-local-storage:');
  // console.log(cachedOwnedMoviesArray);
  // console.log('ownedMoviesArray in use-local-storage:');
  // console.log(ownedMoviesArray);

  const handleSaveArray = (moviesArrayData) => {
    window.localStorage.setItem(KEY_FOR_MOVIES_ARRAY, JSON.stringify(moviesArrayData));
    setMoviesArray(moviesArrayData);
  };

  const handleSaveCachedArray = (moviesArrayData) => {
    setCachedMoviesArray(moviesArrayData);
  };

  const handleRemoveArray = () => {
    window.localStorage.removeItem(KEY_FOR_MOVIES_ARRAY);
    setMoviesArray([]);
  };

  const handleSaveOwnedMovies = (ownedMoviesArrayData) => {
    setOwnedMoviesArray(ownedMoviesArrayData);
  };

  const handleSaveCachedOwnedMovies = (ownedMoviesArrayData) => {
    setCachedOwnedMoviesArray(ownedMoviesArrayData);
  };

  const handleSaveForm = (formStateData) => {
    // debugger;
    const { filmName, shortFilm } = formStateData;
    window.localStorage.setItem(KEY_FOR_FORM, JSON.stringify({ filmName, shortFilm }));
    setFormState({ filmName, shortFilm });
  };

  const handleRemoveForm = () => {
    window.localStorage.removeItem(KEY_FOR_FORM);
    setFormState({});
  };

  const handleRemoveCachedMoviesArray = () => {
    setCachedMoviesArray([]);
  };

  // console.log('Всё содержимое хранилища localStorage:');
  // console.log(JSON.stringify(window.localStorage, null, 2));

  return {
    moviesArray,
    cachedMoviesArray,
    ownedMoviesArray,
    cachedOwnedMoviesArray,
    formState,
    handleSaveArray,
    handleSaveCachedArray,
    handleSaveForm,
    handleSaveOwnedMovies,
    handleSaveCachedOwnedMovies,
    handleRemoveArray,
    handleRemoveForm,
    handleRemoveCachedMoviesArray,
  };
}

export default useLocalStorage;
