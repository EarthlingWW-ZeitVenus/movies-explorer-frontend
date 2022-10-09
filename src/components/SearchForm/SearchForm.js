/* eslint-disable no-alert */
import React from 'react';
import './SearchForm.css';
// import CurrentDataContext from '../../contexts/CurrentDataContext';
// import CurrentFunctionsContext from '../../contexts/CurrentFunctionsContext';
import ShortFilmCheckbox from '../ShortFilmCheckbox/ShortFilmCheckbox';
import getMoviesCards from '../../utils/MoviesApi';
// import useForms from '../../utils/use-forms';
// import useLocalStorage from '../../utils/use-local-storage';

function SearchForm({
  catchResponse,
  ownedMoviesArray,
  isSavedMoviesCase,
  searchForm,
  neededHandlers,
  // handleSetIsSavedOnLocalStorage
}) {
  const [errorText, setErrorText] = React.useState('');
  // debugger;
  console.log('обращение к компоненту SearchForm');
  const { searchFormValues, isSearchFormStatesEqual } = searchForm;
  const { filmName = '', shortFilm } = searchFormValues;
  console.log(`значение isSearchFormStatesEqual - ${isSearchFormStatesEqual}`);
  // const { localSavedFormState } = React.useContext(CurrentDataContext);
  // const [prevMoviesString, setPrevMoviesString] = React.useState('');
  // const { initialFormStateValue } = statesData;
  // const { values: { shortFilm, filmName }, handleChange, handleInitialFormState } = useForms();
  const {
    handleSetIsProcessing,
    handleSetIsNothingFound,
    handleSaveArray,
    // handleSetArray,
    handleSaveForm,
    handleSearchFormChange,
    handleSaveOwnedMovies,
  } = neededHandlers;
  // debugger;
  const isShortFilm = shortFilm || false;
  // const { hasSavedLocal, valueFromStorage } = useLocalStorage();
  // const allSimpleStates = React.useContext(CurrentDataContext);
  // const {
  //   handleSetAllSimpleStates,
  //   handleSetFilteredMoviesCards,
  // } = React.useContext(CurrentFunctionsContext);
  // const { filteredMoviesCards } = React.useContext(CurrentDataContext);
  // const {
  //   handleSetFilteredMoviesCards,
  //   handleSetMoviesString,
  //   handleSetIsNothingFound,
  //   handleSetIsProcessing,
  // } = React.useContext(CurrentFunctionsContext);

  // const [moviesString, setMoviesString] = React.useState('');
  // const [filteredMoviesCards, setFilteredMoviesCards] = React.useState([]);

  // console.log('Ниже текущие состояние контекстного
  // стейта filteredMoviesCards внутри SearchForm:');
  // console.log(filteredMoviesCards);

  console.log('Ниже текущие состояние стейта filmName из хука useForms внутри SearchForm:');
  console.log(filmName);

  console.log('Ниже текущие состояние стейта shortFilm из хука useForms внутри SearchForm:');
  console.log(shortFilm);

  console.log('Ниже текущие состояние константы isShortFilm внутри SearchForm:');
  console.log(isShortFilm);

  // console.log('allFormsStates:');
  // console.log(allFormsStates);

  // Функция для обработки ошибок
  // function catchResponse(err) {
  //   debugger;
  //   if (err.status) {
  //     // eslint-disable-next-line no-undef
  //     alert(`Сервер ответил ошибкой со статусом ${err.status}`);
  //   } else {
  //     // eslint-disable-next-line no-undef
  //     alert(`Ваш запрос не ушел на сервер или сервер не ответил, ошибка ${err}`);
  //   }
  // }

  function handleChangeString(event) {
    setErrorText('');
    handleSearchFormChange(event);
  }

  function handleSubmitForSavedMovies(event) {
    event.preventDefault();
    debugger;
    if (String(filmName).length === 0) {
      setErrorText('Нужно ввести ключевое слово');
      return;
    }
    handleSetIsNothingFound(false);
    if (!isSearchFormStatesEqual) {
      debugger;
      handleSetIsProcessing(true);
      let filteredMoviesCardsData;
      if (isShortFilm) {
        filteredMoviesCardsData = ownedMoviesArray.filter(
          (movieCard) => (Number(movieCard.duration) <= 40),
        );
      } else {
        filteredMoviesCardsData = ownedMoviesArray;
      }
      // debugger;
      filteredMoviesCardsData = filteredMoviesCardsData.filter(
        (movieCard) => (
          (String(movieCard.nameEN)).toLowerCase().includes((String(filmName)).toLowerCase())
        ) || (
          (String(movieCard.nameRU)).toLowerCase().includes((String(filmName)).toLowerCase())),
      );
      if (!filteredMoviesCardsData.length) {
        debugger;
        handleSetIsNothingFound(true);
        handleSaveOwnedMovies([]);
      } else {
        // handleSetFilteredMoviesCards(filteredMoviesCardsData);
        debugger;
        // handleSetArray(filteredMoviesCardsData);
        handleSaveOwnedMovies(filteredMoviesCardsData);
      }
      // handleSaveForm({ filmName, isShortFilm });
      // setPrevMoviesString(filmName);
      handleSetIsProcessing(false);
    }
  }

  function handleSubmitForMovies(event) {
    event.preventDefault();
    debugger;
    console.log(filmName);
    console.log(String(filmName));
    console.log(String(filmName).length);
    if (String(filmName).length === 0) {
      setErrorText('Нужно ввести ключевое слово');
      return;
    }
    // console.log(event.target);
    // console.log(event.target.name);
    // console.log(event.target.shortFilm);
    // console.log(event.target.shortFilm.checked);
    // handleSetIsNothingFound(false);
    handleSetIsNothingFound(false);
    // При сабмите формы устанавливаю стейт использующий локальное хранилище
    // в состояние по умолчанию (false), чтоб после логики подгрузки новых данных,
    // использовались новые данные, а не те, что сохранены в локальном хранилище.
    // В случае если строка запроса совпадает с сохраненной для ускорения загрузки
    // будут использованы данные их локального хранилища.
    // handleSaveIsUseSaveLocal(false);
    // handleSetIsProcessing(true);
    // let savedMoviesCardsData = [];
    // let savedMoviesString = '';
    // if (isUsedSavedLocal) {
    //   const savedMoviesCardsData = localStorage.getItem('SAVED_MOVIES_ARRAY');
    //   const savedMoviesString = localStorage.getItem('SAVED_MOVIES_STRING');
    //   const savedIsShorFilm = localStorage.getItem('SAVED_IS_SHORT_STATE');
    //   handleSetFilteredMoviesCards(savedMoviesCardsData);
    // handleSetIsProcessing(false);
    debugger;
    if (!isSearchFormStatesEqual) {
      debugger;
      handleSetIsProcessing(true);
      getMoviesCards()
        .then((moviesCardsData) => {
          let filteredMoviesCardsData;
          if (isShortFilm) {
            filteredMoviesCardsData = moviesCardsData.filter(
              (movieCard) => (Number(movieCard.duration) <= 40),
            );
          } else {
            filteredMoviesCardsData = moviesCardsData;
          }
          // debugger;
          filteredMoviesCardsData = filteredMoviesCardsData.filter(
            (movieCard) => (
              (String(movieCard.nameEN)).toLowerCase().includes((String(filmName)).toLowerCase())
            ) || (
              (String(movieCard.nameRU)).toLowerCase().includes((String(filmName)).toLowerCase())),
          );
          // debugger;
          if (!filteredMoviesCardsData.length) {
            debugger;
            handleSetIsNothingFound(true);
            // handleSetArray([]);
            handleSaveArray([]);
          } else {
            // handleSetFilteredMoviesCards(filteredMoviesCardsData);
            debugger;
            // handleSetArray(filteredMoviesCardsData);
            handleSaveArray(filteredMoviesCardsData);
          }
          handleSaveForm({ filmName, isShortFilm });
          // setPrevMoviesString(filmName);
        })
        .catch((err) => catchResponse(err))
        .finally(() => handleSetIsProcessing(false));
    }
    // Все что ниже после этого if запихнуть в else
    // console.log();
    // console.log('Строкой ниже - как сработали методы filter и includes
    // на строчках из массива данных с сервера:');
    // console.log(`moviesString внутри хэндлера сабмита - ${moviesString}`);
    // console.log(`moviesString приведенное toLowerCase() внутри хэндлера сабмита
    //   - ${moviesString.toLowerCase()}`);
    // moviesCardsData.forEach((movieCard) => {
    //   console.log(`${(String(movieCard.nameEN)).toLowerCase()} -
    //   ${moviesString.toLowerCase()} -
    //   ${(String(movieCard.nameEN)).toLowerCase().includes(moviesString.toLowerCase())} `);
    // });
    // console.log(moviesCardsData.filter(
    //   (movieCard) => String(movieCard.nameEN).includes(moviesString.toLowerCase()),
    // ));
    // setFilteredMoviesCards(moviesCardsData.filter(
    //   (movieCard) => (
    //     (String(movieCard.nameEN)).toLowerCase().includes(moviesString.toLowerCase())
    //   ) || (
    //     (String(movieCard.nameRU)).toLowerCase().includes(moviesString.toLowerCase())),
    // ));
    // console.log(`текущее состояние стейта moviesCards после setMoviesCards
    // при обращении к стейту изнутри промиса-хендлера - ${filteredMoviesCards}`);
  }

  // React.useEffect(() => {
  //   console.log('Хук эффекта внутри SearchForm устанавливающий состояние формы');
  //   handleInitialFormState(localSavedFormState);
  // });

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        name="searchForm"
        noValidate
        onSubmit={isSavedMoviesCase ? handleSubmitForSavedMovies : handleSubmitForMovies}>

        <fieldset className="search-form__fieldset">
          <input
            className="search-form__input"
            name="filmName"
            placeholder="Фильм"
            type="text"
            autoComplete="off"
            onChange={handleChangeString}
            value={filmName || ''}
            required
            noValidate
          />
          <button className="search-form__submit" type="submit" >Поиск</button>
        </fieldset>

        <p className="search-form__error">{errorText}</p>

        <fieldset className="search-form__fieldset search-form__fieldset_type_for-checkbox">
          <ShortFilmCheckbox
            isShortFilm={isShortFilm}
            handleChange={handleSearchFormChange}
          />
          <span className="search-form__text">Короткометражки</span>
        </fieldset>

      </form>
    </section>
  );
}

export default SearchForm;
