/* eslint-disable no-undef */
import React from 'react';
// import { useCallback } from 'react/cjs/react.production.min';

// eslint-disable-next-line consistent-return
function useLocalStorage(keyForArray, keyForString, keyForIsShortFilm, keyForisUseSaveLocal) {
  console.log('Произошло обращение к кастомному хуку useLocalStorage');
  // debugger;
  const getInitialValue = (key) => {
    console.log(`Обращение к инициализации стейта внутри getInitialValue, с ключом - ${key}`);
    // debugger;
    // window.localStorage.clear();
    console.log(JSON.stringify(window.localStorage, null, 2));
    let initialValue;
    switch (key) {
      case keyForArray:
        initialValue = [];
        break;
      case keyForString:
        initialValue = '';
        break;
      case keyForIsShortFilm:
        initialValue = false;
        break;
      default:
        initialValue = false;
    }
    const keyValue = window.localStorage.getItem(key);
    // debugger;
    return keyValue ? JSON.parse(keyValue) : initialValue;
  };
  const [
    savedMoviesArray,
    setSavedMoviesArray,
  ] = React.useState(getInitialValue(keyForArray));
  const [
    savedMoviesString,
    setSavedMoviesString,
  ] = React.useState(getInitialValue(keyForString));
  const [
    savedIsShortFilm,
    setSavedIsShortFilm,
  ] = React.useState(getInitialValue(keyForIsShortFilm));
  const [
    isUseSaveLocal,
    setIsUseSaveLocal,
  ] = React.useState(getInitialValue(keyForisUseSaveLocal));

  // if (window.localStorage.getItem(keyForArray)) {
  //   setSavedMoviesArray(JSON.parse(window.localStorage.getItem(keyForArray)));
  // }

  // if (localStorage.getItem(keyMoviesString)) {
  //   setSavedMoviesString(JSON.parse(localStorage.getItem(keyMoviesString)));
  // }

  // if (localStorage.getItem(keyFilmIsShort)) {
  //   setSavedIsShorFilm(JSON.parse(localStorage.getItem(keyFilmIsShort)));
  // }

  const handleSaveMoviesArray = (moviesArray) => {
    if (window.localStorage.getItem(keyForArray) !== String(moviesArray)) {
      debugger;
      // window.localStorage.removeItem(keyForArray);
    }
    window.localStorage.setItem(keyForArray, JSON.stringify(moviesArray));
    setSavedMoviesArray(moviesArray);
  };

  const handleSaveMoviesString = (moviesString) => {
    if (window.localStorage.getItem(keyForString) !== moviesString) {
      debugger;
      // window.localStorage.removeItem(keyForString);
      window.localStorage.setItem(keyForString, JSON.stringify(moviesString));
    }
    setSavedMoviesString(moviesString);
  };

  const handleSaveIsShortFilm = (isShortFilm) => {
    if (window.localStorage.getItem(keyForIsShortFilm) !== String(isShortFilm)) {
      debugger;
      const isShort = isShortFilm || false;
      console.log(isShort);
      // window.localStorage.removeItem(keyForIsShortFilm);
      window.localStorage.setItem(keyForIsShortFilm, JSON.stringify(isShort));
    }
    setSavedIsShortFilm(isShortFilm);
  };

  const handleSaveIsUseSaveLocal = (isSaveLocal) => {
    if (window.localStorage.getItem(keyForisUseSaveLocal) !== String(isSaveLocal)) {
      debugger;
      // window.localStorage.removeItem(keyForisUseSaveLocal);
      window.localStorage.setItem(keyForisUseSaveLocal, JSON.stringify(isSaveLocal));
    }
    setIsUseSaveLocal(isSaveLocal);
  };

  console.log('Всё содержимое хранилища localStorage:');
  console.log(JSON.stringify(window.localStorage, null, 2));

  // const valueFromStorageKey = localStorage.getItem(key);
  // let valueFromStorage;
  // if (key && !value) {
  //   valueFromStorage = JSON.parse(valueFromStorageKey);
  //   // return JSON.parse(valueFromStorageKey);
  // }
  // if (key && value) {
  //   if (valueFromStorageKey) {
  //     localStorage.removeItem(key);
  //   }
  //   localStorage.setItem(key, JSON.stringify(value));
  //   setHasSavedLocal(true);
  // }

  return {
    savedMoviesArray,
    savedMoviesString,
    savedIsShortFilm,
    isUseSaveLocal,
    handleSaveMoviesArray,
    handleSaveMoviesString,
    handleSaveIsShortFilm,
    handleSaveIsUseSaveLocal,
  };
}

export default useLocalStorage;
