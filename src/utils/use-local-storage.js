/* eslint-disable no-undef */
import React from 'react';
import { localSorageConstants } from './constants';

function useLocalStorage() {
  // debugger;
  console.log('Произошло обращение к кастомному хуку useLocalStorage');
  const {
    KEY_FOR_CURRENT_ARRAY,
    KEY_FOR_FORM,
    // KEY_FOR_OWNED_MOVIES_ARRAY,
    KEY_FOR_SAVED_ARRAY_DATA,
  } = localSorageConstants;

  const getLocalValue = (key) => {
    // console.log(`Обращение к инициализации стейта внутри getInitialValue, с ключом - ${key}`);
    // debugger;
    // window.localStorage.clear();
    let initialValue;
    if (key === KEY_FOR_FORM) {
      initialValue = {};
    } else {
      initialValue = [];
    }
    const keyValue = window.localStorage.getItem(key);
    // debugger;
    return keyValue ? JSON.parse(keyValue) : initialValue;
  };

  // массив фильмов для текущих операций и рендера
  const [array, setArray] = React.useState(getLocalValue(KEY_FOR_CURRENT_ARRAY));
  // массив фильмов для хранения и возврата к исходному состоянию
  const [cachedArray, setCachedArray] = React.useState(getLocalValue(KEY_FOR_SAVED_ARRAY_DATA));
  // массив избранных/отобранных фильмов для текущих операций и рендера
  const [ownedArray, setOwnedArray] = React.useState([]);
  // массив избранных/отобранных фильмов для хранения и возврата к исходному состоянию
  const [cachedOwnedArray, setCachedOwnedArray] = React.useState([]);

  const [formState, setFormState] = React.useState(getLocalValue(KEY_FOR_FORM));

  // console.log('cachedMoviesArray in use-local-storage:');
  // console.log(cachedMoviesArray);
  // console.log('moviesArray in use-local-storage:');
  // console.log(moviesArray);
  // console.log('cachedOwnedMoviesArray in use-local-storage:');
  // console.log(cachedOwnedMoviesArray);
  // console.log('ownedMoviesArray in use-local-storage:');
  // console.log(ownedMoviesArray);

  const handleSetArray = (moviesArrayData) => {
    window.localStorage.setItem(KEY_FOR_CURRENT_ARRAY, JSON.stringify(moviesArrayData));
    setArray(moviesArrayData);
  };

  const handleSaveCachedArray = (moviesArrayData) => {
    window.localStorage.setItem(KEY_FOR_SAVED_ARRAY_DATA, JSON.stringify(moviesArrayData));
    setCachedArray(moviesArrayData);
  };

  const handleResetArray = () => {
    window.localStorage.removeItem(KEY_FOR_CURRENT_ARRAY);
    setArray([]);
  };

  const handleSetOwnedArray = (ownedMoviesArrayData) => {
    setOwnedArray(ownedMoviesArrayData);
  };

  const handleSetCachedOwnedArray = (ownedMoviesArrayData) => {
    setCachedOwnedArray(ownedMoviesArrayData);
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

  const handleRemoveCachedArray = () => {
    window.localStorage.removeItem(KEY_FOR_SAVED_ARRAY_DATA);
    setCachedArray([]);
  };

  const handleResetCachedOwnedArray = () => {
    setCachedOwnedArray([]);
  };

  // console.log('Всё содержимое хранилища localStorage:');
  // console.log(JSON.stringify(window.localStorage, null, 2));

  return {
    array,
    cachedArray,
    ownedArray,
    cachedOwnedArray,
    formState,
    handleSetArray,
    handleSaveCachedArray,
    handleSaveForm,
    handleSetOwnedArray,
    handleSetCachedOwnedArray,
    handleResetArray,
    handleRemoveForm,
    handleRemoveCachedArray,
    handleResetCachedOwnedArray,
  };
}

export default useLocalStorage;
