/* eslint-disable no-alert */
import React from 'react';
import './SearchForm.css';
import CurrentDataContext from '../../contexts/CurrentDataContext';
// import CurrentFunctionsContext from '../../contexts/CurrentFunctionsContext';
// import ShortFilmCheckbox from '../ShortFilmCheckbox/ShortFilmCheckbox';
import getMoviesCards from '../../utils/MoviesApi';
import useForms from '../../utils/use-forms';

function SearchForm({ handlers }) {
  console.log('обращение к компоненту SearchForm');
  const { values: { shortFilm, filmName }, handleChange } = useForms();
  const { handleSetIsProcessing, handleSetIsNothingFound, handleSetFilteredMoviesCards } = handlers;
  // const allSimpleStates = React.useContext(CurrentDataContext);
  // const {
  //   handleSetAllSimpleStates,
  //   handleSetFilteredMoviesCards,
  // } = React.useContext(CurrentFunctionsContext);
  const { filteredMoviesCards } = React.useContext(CurrentDataContext);
  // const {
  //   handleSetFilteredMoviesCards,
  //   handleSetMoviesString,
  //   handleSetIsNothingFound,
  //   handleSetIsProcessing,
  // } = React.useContext(CurrentFunctionsContext);

  // const [moviesString, setMoviesString] = React.useState('');
  // const [filteredMoviesCards, setFilteredMoviesCards] = React.useState([]);

  console.log('Ниже текущие состояние контекстного стейта filteredMoviesCards внутри SearchForm:');
  console.log(filteredMoviesCards);

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
      // eslint-disable-next-line no-undef
      alert(`Сервер ответил ошибкой со статусом ${err.status}`);
    } else {
      // eslint-disable-next-line no-undef
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
    handleSetIsNothingFound(false);
    // handleSetIsProcessing(true);
    handleSetIsProcessing(true);
    // console.log();
    getMoviesCards()
      .then((moviesCardsData) => {
        let filteredMoviesCardsData = [];
        if (shortFilm) {
          filteredMoviesCardsData = moviesCardsData.filter(
            (movieCard) => (Number(movieCard.duration) <= 40),
          );
        } else {
          filteredMoviesCardsData = moviesCardsData;
        }
        debugger;
        filteredMoviesCardsData = filteredMoviesCardsData.filter(
          (movieCard) => (
            (String(movieCard.nameEN)).toLowerCase().includes((String(filmName)).toLowerCase())
          ) || (
            (String(movieCard.nameRU)).toLowerCase().includes((String(filmName)).toLowerCase())),
        );
        debugger;
        if (!filteredMoviesCardsData.length) {
          handleSetIsNothingFound(true);
        } else {
          handleSetFilteredMoviesCards(filteredMoviesCardsData);
        }
      })
      .catch((err) => catchResponse(err))
      .finally(() => handleSetIsProcessing(false));
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
            value={filmName}
            required
          />
          <button className="search-form__submit" type="submit">Поиск</button>
        </fieldset>

        <fieldset className="search-form__fieldset search-form__fieldset_type_for-checkbox">
          <label className="checkbox-switcher">
            <input
              name="shortFilm"
              className="checkbox-switcher__input"
              type="checkbox"
              // onChange={handleSetIsShortFilm}
              // checked={values}
              onChange={handleChange}
              checked={shortFilm}
            />
            <span className="checkbox-switcher__span"/>
          </label>
          <span className="search-form__text">Короткометражки</span>
        </fieldset>

      </form>
    </section>
  );
}

export default SearchForm;
