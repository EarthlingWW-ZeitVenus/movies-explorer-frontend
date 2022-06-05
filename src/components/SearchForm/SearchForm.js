/* eslint-disable no-undef */
// import React from 'react';
import './SearchForm.css';
// import CurrentDataContext from '../../contexts/CurrentDataContext';
// import CurrentFunctionsContext from '../../contexts/CurrentFunctionsContext';
import ShortFilmCheckbox from '../ShortFilmCheckbox/ShortFilmCheckbox';
import getMoviesCards from '../../utils/MoviesApi';
import useForms from '../../utils/use-forms';
// import useLocalStorage from '../../utils/use-local-storage';

function SearchForm({ handlers, statesData }) {
  console.log('обращение к компоненту SearchForm');
  const { values: { shortFilm, filmName }, handleChange } = useForms();
  const {
    handleSetIsProcessing,
    handleSetIsNothingFound,
    handleSetFilteredMoviesCards,
    handleSaveIsUseSaveLocal,
    handleSaveMoviesArray,
    handleSaveMoviesString,
    handleSaveIsShortFilm,
  } = handlers;
  const { savedMoviesString, isUseSaveLocal } = statesData;
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

  // console.log('allFormsStates:');
  // console.log(allFormsStates);

  // Функция для обработки ошибок
  function catchResponse(err) {
    debugger;
    if (err.status) {
      alert(`Сервер ответил ошибкой со статусом ${err.status}`);
    } else {
      alert(`Ваш запрос не ушел на сервер или сервер не ответил, ошибка ${err}`);
    }
  }

  function handleChangeString(event) {
    handleChange(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // handleSetIsNothingFound(false);
    debugger;
    handleSetIsProcessing(true);
    handleSetIsNothingFound(false);
    // При сабмите формы устанавливаю стейт использующий локальное хранилище
    // в состояние по умолчанию (false), чтоб после логики подгрузки новых данных,
    // использовались новые данные, а не те, что сохранены в локальном хранилище.
    // В случае если строка запроса совпадает с сохраненной для ускорения загрузки
    // будут использованы данные их локального хранилища.
    handleSaveIsUseSaveLocal(false);
    // handleSetIsProcessing(true);
    // let savedMoviesCardsData = [];
    // let savedMoviesString = '';
    // if (isUsedSavedLocal) {
    //   const savedMoviesCardsData = localStorage.getItem('SAVED_MOVIES_ARRAY');
    //   const savedMoviesString = localStorage.getItem('SAVED_MOVIES_STRING');
    //   const savedIsShorFilm = localStorage.getItem('SAVED_IS_SHORT_STATE');
    //   handleSetFilteredMoviesCards(savedMoviesCardsData);
    // handleSetIsProcessing(false);
    if ((String(filmName)).toLowerCase() === (String(savedMoviesString)).toLowerCase()) {
      debugger;
      handleSaveIsUseSaveLocal(true);
    } else {
      getMoviesCards()
        .then((moviesCardsData) => {
          let filteredMoviesCardsData;
          if (shortFilm) {
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
            handleSetIsNothingFound(true);
          } else {
            handleSetFilteredMoviesCards(filteredMoviesCardsData);
            debugger;
            handleSaveMoviesArray(filteredMoviesCardsData);
            handleSaveMoviesString(filmName);
            handleSaveIsShortFilm(shortFilm);
            // Устанавливаем состояние в true для того, чтобы все зависимые свойства,
            // состояния и данные сразу (до сабмита формы) грузились из локального хранилища.
            handleSaveIsUseSaveLocal(true);
          }
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

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>

        <fieldset className="search-form__fieldset">
          <input
            className="search-form__input"
            name="filmName"
            placeholder="Фильм"
            type="text"
            autoComplete="off"
            onChange={handleChangeString}
            value={isUseSaveLocal ? savedMoviesString : filmName}
            required
            noValidate
          />
          <button className="search-form__submit" type="submit">Поиск</button>
        </fieldset>

        <fieldset className="search-form__fieldset search-form__fieldset_type_for-checkbox">
          <ShortFilmCheckbox
            isFilmShort={shortFilm}
            handleChange={handleChange}
            statesData={statesData}
          />
          <span className="search-form__text">Короткометражки</span>
        </fieldset>

      </form>
    </section>
  );
}

export default SearchForm;
