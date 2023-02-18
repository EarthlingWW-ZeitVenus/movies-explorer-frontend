import React from 'react';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import './SearchForm.css';
import ShortFilmCheckbox from '../ShortFilmCheckbox/ShortFilmCheckbox';
import getMoviesCards from '../../utils/MoviesApi';
import { filterNameFilm } from '../../utils/utils';

function SearchForm({
  catchResponse,
  isSavedMoviesCase,
  isProcessing,
  searchForm,
  neededHandlers,
}) {
  console.log('обращение к компоненту SearchForm');

  const [errorText, setErrorText] = React.useState('');

  const {
    ownedMoviesArrayToDisplay,
    cachedMoviesArray,
    cachedOwnedMoviesArrayToDisplay,
  } = React.useContext(CurrentDataContext);
  const searchFormValues = isSavedMoviesCase
    ? searchForm.searchFormValuesForSavedMovies : searchForm.searchFormValuesForMovies;
  const isSearchFormStatesEqual = isSavedMoviesCase
    ? searchForm.isSearchFormStatesForSavedMoviesEqual
    : searchForm.isSearchFormStatesForMoviesEqual;
  // console.log(searchFormValues);
  const { filmName = '', shortFilm = false } = searchFormValues;
  // console.log(`значение isSearchFormStatesEqual - ${isSearchFormStatesEqual}`);
  const {
    handleSetIsProcessing,
    handleSetIsNothingFound,
    handleSaveForm,
    handleSearchFormChange,
    handleSetIsShortFilmChecked,
    handleSetInitialSavedMoviesValues,
    handleSaveCachedArray,
  } = neededHandlers;
  const handleNeededSaveArray = isSavedMoviesCase
    ? neededHandlers.handleSaveOwnedMovies : neededHandlers.handleSaveArray;
  // console.log(handleNeededSaveArray);

  // console.log('Ниже текущие состояние стейта filmName из хука useForms внутри SearchForm:');
  // console.log(filmName);

  // console.log('Ниже текущие состояние стейта shortFilm из хука useForms внутри SearchForm:');
  // console.log(shortFilm);

  function handleChangeString(event) {
    setErrorText('');
    handleSearchFormChange(event, isSavedMoviesCase);
  }

  // Общий сабмит для фильмов и сохраненных фильмов
  function handleSubmitForMovies(event) {
    event.preventDefault();
    // debugger;
    handleSetIsNothingFound(false);
    if (isSearchFormStatesEqual) {
      setErrorText('Такой запрос только что был выполнен, введите другую комбинацию символов');
      return;
    }
    let resultedMoviesArray;
    /* ************************************** */
    // Логика фильтрации для сохраненных фильмов
    if (isSavedMoviesCase) {
      if (String(filmName).length === 0) {
        handleNeededSaveArray(cachedOwnedMoviesArrayToDisplay);
        return;
      }
      handleSetIsProcessing(true);
      resultedMoviesArray = filterNameFilm(ownedMoviesArrayToDisplay, filmName);
      if (!resultedMoviesArray.length) {
        handleNeededSaveArray([]);
        handleSetIsProcessing(false);
        handleSetIsNothingFound(true);
        handleSetInitialSavedMoviesValues();
        return;
      }
      handleNeededSaveArray(resultedMoviesArray);
      // Устанавливает стейт текущего состояния формы, для последующего сравнения с новым
      handleSetInitialSavedMoviesValues();
      handleSetIsProcessing(false);
      /* ************************** */
      // Логика фильтрации для фильмов
    } else {
      if (String(filmName).length === 0) {
        setErrorText('Нужно ввести ключевое слово');
        return;
      }
      handleSetIsProcessing(true);
      if (!cachedMoviesArray.length) {
        getMoviesCards()
          .then((moviesCardsData) => {
            handleSaveCachedArray(moviesCardsData);
            // экспериментальный код
            // let moviesCardsDataWithOwner;
            // ownedMoviesArray.forEach((omai) => {
            //   moviesCardsDataWithOwner = moviesCardsData.map((mcdi) => (
            //     mcdi.id === omai.id ? omai : mcdi));
            // });
            // console.log(moviesCardsDataWithOwner);
            // debugger;
            resultedMoviesArray = filterNameFilm(moviesCardsData, filmName);
            if (!resultedMoviesArray.length) {
              handleNeededSaveArray([]);
              handleSetIsProcessing(false);
              handleSetIsNothingFound(true);
              return;
            }
            handleNeededSaveArray(resultedMoviesArray);
            handleSaveForm({ filmName, shortFilm });
          })
          .catch((err) => catchResponse(err))
          .finally(() => handleSetIsProcessing(false));
        return;
      }
      resultedMoviesArray = filterNameFilm(cachedMoviesArray, filmName);
      if (!resultedMoviesArray.length) {
        handleNeededSaveArray([]);
        handleSetIsProcessing(false);
        handleSetIsNothingFound(true);
        return;
      }
      handleNeededSaveArray(resultedMoviesArray);
      handleSaveForm({ filmName, shortFilm });
      handleSetIsProcessing(false);
    }
  }

  function handleShortFilmFilter(event) {
    debugger;
    const { target: { checked } } = event;
    handleSetIsShortFilmChecked(checked);
    handleSearchFormChange(event, isSavedMoviesCase);
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
