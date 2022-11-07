/* eslint-disable no-alert */
import React from 'react';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import './SearchForm.css';
// import CurrentDataContext from '../../contexts/CurrentDataContext';
import ShortFilmCheckbox from '../ShortFilmCheckbox/ShortFilmCheckbox';
import getMoviesCards from '../../utils/MoviesApi';
import { filterNameFilm } from '../../utils/utils';
// import { numberConstants } from '../../utils/constants';

function SearchForm({
  catchResponse,
  // ownedMoviesArray,
  isSavedMoviesCase,
  isProcessing,
  searchForm,
  neededHandlers,
}) {
  console.log('обращение к компоненту SearchForm');

  const [errorText, setErrorText] = React.useState('');

  const { ownedMoviesArrayToDisplay } = React.useContext(CurrentDataContext);
  const { searchFormValues, isSearchFormStatesEqual } = searchForm;
  const { filmName = '', shortFilm = false } = searchFormValues;
  // const { SHORT_FILM_MAX_DURATION } = numberConstants;
  console.log(`значение isSearchFormStatesEqual - ${isSearchFormStatesEqual}`);
  // const { localSavedFormState } = React.useContext(CurrentDataContext);
  const {
    handleSetIsProcessing,
    handleSetIsNothingFound,
    // handleSaveArray,
    // handleSaveOwnedMovies,
    handleSaveForm,
    handleSearchFormChange,
    // handleSetMoviesArrayToDisplay,
    handleSetIsShortFilmChecked,
  } = neededHandlers;
  const handleNeededSaveArray = isSavedMoviesCase
    ? neededHandlers.handleSaveOwnedMovies : neededHandlers.handleSaveArray;
  console.log(handleNeededSaveArray);
  // const handleFilteredNeededSaveArray = isSavedMoviesCase
  //   ? neededHandlers.handleSaveFilteredOwnedMoviesArray
  //   : neededHandlers.handleSaveFilteredMoviesArray;
  // const isShortFilm = shortFilm || false;

  console.log('Ниже текущие состояние стейта filmName из хука useForms внутри SearchForm:');
  console.log(filmName);

  console.log('Ниже текущие состояние стейта shortFilm из хука useForms внутри SearchForm:');
  console.log(shortFilm);

  // console.log('Ниже текущие состояние константы isShortFilm внутри SearchForm:');
  // console.log(isShortFilm);

  function handleChangeString(event) {
    setErrorText('');
    handleSearchFormChange(event);
  }

  // Общий сабмит для фильмов и сохраненных фильмов
  function handleSubmitForMovies(event) {
    event.preventDefault();
    debugger;
    handleSetIsNothingFound(false);
    if (String(filmName).length === 0) {
      setErrorText('Нужно ввести ключевое слово');
      return;
    }
    if (!isSearchFormStatesEqual) {
      debugger;
      handleSetIsProcessing(true);
      handleSetIsNothingFound(false);
      let resultedMoviesArray;
      // Логика фильтрации для сохраненных фильмов
      if (isSavedMoviesCase) {
        debugger;
        resultedMoviesArray = filterNameFilm(ownedMoviesArrayToDisplay, filmName);
        if (!resultedMoviesArray.length) {
          debugger;
          handleNeededSaveArray([]);
          // handleFilteredNeededSaveArray([]);
          handleSetIsNothingFound(true);
        } else {
          handleNeededSaveArray(resultedMoviesArray);
          debugger;
        }
        // if (shortFilm) {
        //   resultedMoviesArray = filterShortFilm(resultedMoviesArray, SHORT_FILM_MAX_DURATION);
        // }
        // handleFilteredNeededSaveArray(resultedMoviesArray);
        handleSaveForm({ filmName, shortFilm });
        handleSetIsProcessing(false);
      // Логика фильтрации для фильмов
      } else {
        debugger;
        getMoviesCards()
          .then((moviesCardsData) => {
            debugger;
            resultedMoviesArray = filterNameFilm(moviesCardsData, filmName);
            if (!resultedMoviesArray.length) {
              debugger;
              handleNeededSaveArray([]);
              // handleFilteredNeededSaveArray([]);
              handleSetIsNothingFound(true);
            } else {
              debugger;
              handleNeededSaveArray(resultedMoviesArray);
            }
            // if (shortFilm) {
            // resultedMoviesArray = filterShortFilm(resultedMoviesArray, SHORT_FILM_MAX_DURATION);
            // }
            // handleFilteredNeededSaveArray(resultedMoviesArray);
            handleSaveForm({ filmName, shortFilm });
          })
          .catch((err) => catchResponse(err))
          .finally(() => handleSetIsProcessing(false));
      }
      // let moviesArrayToProcess = isSavedMoviesCase ? ownedMoviesArray : moviesArray;
      // moviesArrayToProcess = filterNameFilm(moviesArrayToProcess, filmName);
      // let filteredMoviesCardsData;
      // handleSetMoviesArrayToDisplay(moviesArrayToProcess);
      // debugger;
      // filteredMoviesCardsData = filteredMoviesCardsData.filter(
      //   (movieCard) => (
      //     (String(movieCard.nameEN)).toLowerCase().includes((String(filmName)).toLowerCase())
      //   ) || (
      //     (String(movieCard.nameRU)).toLowerCase().includes((String(filmName)).toLowerCase())),
      // );
      // if (!moviesArrayToProcess.length) {
      //   debugger;
      //   handleSetIsNothingFound(true);
      //   handleSetMoviesArrayToDisplay([]);
      // } else {
      //   debugger;
      //   handleSetMoviesArrayToDisplay(moviesArrayToProcess);
      // }
      // handleSetIsProcessing(false);
    }
  }

  // function handleSubmitForMovies(event) {
  //   event.preventDefault();
  //   debugger;
  //   console.log(filmName);
  //   console.log(String(filmName));
  //   console.log(String(filmName).length);
  //   if (String(filmName).length === 0) {
  //     setErrorText('Нужно ввести ключевое слово');
  //     return;
  //   }
  // console.log(event.target);
  // console.log(event.target.name);
  // console.log(event.target.shortFilm);
  // console.log(event.target.shortFilm.checked);
  // handleSetIsNothingFound(false);
  // debugger;
  // if (!isSearchFormStatesEqual) {
  // debugger;
  // handleSetIsProcessing(true);
  // getMoviesCards()
  //   .then((moviesCardsData) => {
  //     let filteredMoviesCardsData;
  //     if (isShortFilm) {
  //       filteredMoviesCardsData = moviesCardsData.filter(
  //         (movieCard) => (Number(movieCard.duration) <= 40),
  //       );
  //     } else {
  //       filteredMoviesCardsData = moviesCardsData;
  //     }
  // debugger;
  // filteredMoviesCardsData = filteredMoviesCardsData.filter(
  //   (movieCard) => (
  //     (String(movieCard.nameEN)).toLowerCase().includes((String(filmName)).toLowerCase())
  //   ) || (
  //     (String(movieCard.nameRU)).toLowerCase().includes((String(filmName)).toLowerCase())),
  // );
  // debugger;
  // if (!filteredMoviesCardsData.length) {
  // debugger;
  // handleSetIsNothingFound(true);
  // handleSaveArray([]);
  // } else {
  // debugger;
  //           handleSaveArray(filteredMoviesCardsData);
  //         }
  //         handleSaveForm({ filmName, isShortFilm });
  //       })
  //       .catch((err) => catchResponse(err))
  //       .finally(() => handleSetIsProcessing(false));
  //   }
  // }

  function handleShortFilmFilter(event) {
    const { target: { checked } } = event;
    handleSetIsShortFilmChecked(checked);
    handleSearchFormChange(event);
  }

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        name="searchForm"
        noValidate
        onSubmit={handleSubmitForMovies}>

        <fieldset className="search-form__fieldset">
          <input
            className="search-form__input"
            name="filmName"
            placeholder="Фильм"
            type="text"
            autoComplete="off"
            onChange={handleChangeString}
            value={filmName || ''}
            disabled={isProcessing}
            required
            noValidate
          />
          <button
            className={`search-form__submit ${isProcessing && 'search-form__submit_disabled'}`}
            type="submit"
            disabled={isProcessing}>
            Поиск
          </button>
        </fieldset>

        <p className="search-form__error">{errorText}</p>

        <fieldset className="search-form__fieldset search-form__fieldset_type_for-checkbox">
          <ShortFilmCheckbox
            shortFilm={shortFilm}
            handleShortFilmFilter={handleShortFilmFilter}
            isProcessing={isProcessing}
          />
          <span className="search-form__text">Короткометражки</span>
        </fieldset>

      </form>
    </section>
  );
}

export default SearchForm;
