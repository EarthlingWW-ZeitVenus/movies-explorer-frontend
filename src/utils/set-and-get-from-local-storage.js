/* eslint-disable no-undef */
import React from 'react';

function setAndGetFromLocalStorage(keyForArray = 'SAVED_ARRAY', keyForFormState = 'SAVED_FORM_STATE') {
  // debugger;
  console.log('Произошло обращение к кастомному хуку useLocalStorage');
  // debugger;

  const getLocalValue = (key) => {
    console.log(`Обращение к инициализации стейта внутри getInitialValue, с ключом - ${key}`);
    // debugger;
    // window.localStorage.clear();
    // console.log(JSON.stringify(window.localStorage, null, 2));
    let initialValue;
    if (key === keyForArray) {
      initialValue = [];
    } else {
      initialValue = {};
    }
    const keyValue = window.localStorage.getItem(key);
    // debugger;
    return keyValue ? JSON.parse(keyValue) : initialValue;
  };

  // const localArrayValue = getLocalValue(keyForArray);
  // const localFormStateValue = getLocalValue(keyForFormState);

  const [
    localSavedArray,
    setLocalSavedArray,
  ] = React.useState(getLocalValue(keyForArray));
  const [
    localSavedFormState,
    setLocalSavedFormState,
  ] = React.useState(getLocalValue(keyForFormState));

  const handleStateSavedArray = () => {
    setLocalSavedArray(getLocalValue(keyForArray));
  };

  const handleStateSavedFormState = () => {
    setLocalSavedFormState(getLocalValue(keyForFormState));
  };

  const handleSaveArray = (moviesArray) => {
    window.localStorage.setItem(keyForArray, JSON.stringify(moviesArray));
    setLocalSavedArray(moviesArray);
  };

  const handleSaveFormState = (formState) => {
    debugger;
    console.log('formState in handleSaveFormState:');
    console.log(formState);
    const { filmName, isShortFilm: shortFilm } = formState;
    console.log(`Значение shortFilm внутри handleSaveFormState - ${shortFilm}`);
    // if (!window.localStorage.getItem(keyForFormState)) {
    //   debugger;
    // }
    window.localStorage.setItem(keyForFormState, JSON.stringify({ filmName, shortFilm }));
    // setSavedStateObject(...savedStateObject, stateObjectForSave);
  };
  // const arrayValue = window.localStorage.getItem(keyForArray);
  // const formStateValue = window.localStorage.getItem(keyForFormState);

  // React.useEffect(() => {
  //   debugger;
  //   console.log('запрос внутри первого хука эффекта локального хранилища');
  //   if (arrayValue) {
  //     setLocalSavedArray(JSON.parse(arrayValue));
  //   }
  // }, [arrayValue]);

  // React.useEffect(() => {
  //   debugger;
  //   console.log('запрос внутри второго хука эффекта локального хранилища');
  //   if (formStateValue) {
  //     setLocalSavedFormState(JSON.parse(formStateValue));
  //   }
  // }, [formStateValue]);

  console.log('Всё содержимое хранилища localStorage:');
  console.log(JSON.stringify(window.localStorage, null, 2));

  return {
    localSavedArray,
    localSavedFormState,
    handleSaveArray,
    handleSaveFormState,
    handleStateSavedArray,
    handleStateSavedFormState,
  };
}

export default setAndGetFromLocalStorage;
