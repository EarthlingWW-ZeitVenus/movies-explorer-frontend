/* eslint-disable no-undef */
import React from 'react';

function useLocalStorage(
  keyForArray = 'SAVED_ARRAY',
  keyForForm = 'SAVED_FORM_STATE',
  // keyForCurrentUser = 'SAVED_CURRENT_USER_STATE',
  // keyForSavedMovies = 'SAVED_MOVIES',
) {
  // debugger;
  console.log('Произошло обращение к кастомному хуку useLocalStorage');
  // debugger;

  const getLocalValue = (key) => {
    console.log(`Обращение к инициализации стейта внутри getInitialValue, с ключом - ${key}`);
    // debugger;
    // window.localStorage.clear();
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

  const [moviesArray, setMoviesArray] = React.useState([]);
  const [ownedMoviesArray, setOwnedMoviesArray] = React.useState([]);
  const [formState, setFormState] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [isMovieOwner, setIsMovieOwner] = React.useState(false);

  // const handleSetMoviesArray = () => {
  //   setMoviesArray(getLocalValue(keyForArray));
  // };
  console.log('moviesArrai in use-local-storage:');
  console.log(moviesArray);
  console.log('ownedMoviesArray in use-local-storage:');
  // console.log(ownedMoviesArray);
  // const handleStateSavedFormState = () => {
  //   setLocalSavedFormState(getLocalValue(keyForFormState));
  // };

  // const handleSetArray = (moviesArrayData) => {
  //   setMoviesArray(moviesArrayData);
  // };

  const handleSaveArray = (moviesArrayData) => {
    window.localStorage.setItem(keyForArray, JSON.stringify(moviesArrayData));
    setMoviesArray(moviesArrayData);
  };

  const handleSaveOwnedMovies = (ownedMoviesArrayData) => {
    // window.localStorage.setItem(keyForSavedMovies, JSON.stringify(ownedMoviesArrayData));
    setOwnedMoviesArray(ownedMoviesArrayData);
  };

  const handleSaveForm = (formStateData) => {
    debugger;
    // console.log('formState in handleSaveFormState:');
    // console.log(formStateData);
    const { filmName, isShortFilm: shortFilm } = formStateData;
    // console.log(`Значение shortFilm внутри handleSaveFormState - ${shortFilm}`);
    window.localStorage.setItem(keyForForm, JSON.stringify({ filmName, shortFilm }));
    // setSavedStateObject(...savedStateObject, stateObjectForSave);
  };

  const handleSetCurrentUser = (currentUserData) => {
    // window.localStorage.setItem(keyForCurrentUser, JSON.stringify(currentUserData));
    setCurrentUser(currentUserData);
  };

  const handleSetIsLoggedIn = (isUserLoggedIn) => {
    setIsLoggedIn(isUserLoggedIn);
  };

  React.useEffect(() => {
    // debugger;
    console.log('запрос внутри хука эффекта локального хранилища');
    if (isLoggedIn) {
      setMoviesArray(getLocalValue(keyForArray));
      setFormState(getLocalValue(keyForForm));
      // setCurrentUser(getLocalValue(keyForCurrentUser));
      // setOwnedMoviesArray(getLocalValue(keyForSavedMovies));
    }
  }, [isLoggedIn]);

  console.log('Всё содержимое хранилища localStorage:');
  console.log(JSON.stringify(window.localStorage, null, 2));

  return {
    moviesArray,
    ownedMoviesArray,
    formState,
    currentUser,
    isLoggedIn,
    // handleSetArray,
    handleSaveArray,
    handleSaveForm,
    handleSetCurrentUser,
    handleSetIsLoggedIn,
    handleSaveOwnedMovies,
  };
}

export default useLocalStorage;
