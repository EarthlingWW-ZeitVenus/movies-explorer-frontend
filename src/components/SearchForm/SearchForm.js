import React from 'react';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SearchForm.css';
import ShortFilmCheckbox from '../ShortFilmCheckbox/ShortFilmCheckbox';
import getMoviesCards from '../../utils/MoviesApi';
import { filterNameFilm, synchronizeArrays, filterCurrentUserArray } from '../../utils/utils';

function SearchForm({
  catchResponse,
  isSavedMoviesCase,
  isProcessing,
  searchForm,
  neededHandlers,
}) {
  console.log('обращение к компоненту SearchForm');

  const [errorText, setErrorText] = React.useState('');

  const { email } = React.useContext(CurrentUserContext);
  const {
    ownedArrayToDisplay,
    cachedArray,
    cachedOwnedArray,
    cachedOwnedArrayToDisplay,
  } = React.useContext(CurrentDataContext);
  const searchFormValues = isSavedMoviesCase
    ? searchForm.searchFormValuesForSavedMovies : searchForm.searchFormValuesForMovies;
  const isSearchFormStatesEqual = isSavedMoviesCase
    ? searchForm.isSearchFormStatesForSavedMoviesEqual
    : searchForm.isSearchFormStatesForMoviesEqual;
  console.log('searchFormValues');
  console.log(searchFormValues);
  const { filmName = '', shortFilm = false } = searchFormValues;
  console.log(`filmName - ${filmName}`);
  console.log(`shortFilm - ${shortFilm}`);
  // console.log(`значение isSearchFormStatesEqual - ${isSearchFormStatesEqual}`);
  const {
    handleSetIsProcessing,
    handleSetIsNothingFound,
    handleSaveForm,
    handleSearchFormChange,
    handleSetIsShortFilmChecked,
    handleSetInitialMoviesValues,
    handleSetInitialSavedMoviesValues,
    handleSaveCachedArray,
    // handleSetIsArrayJustLoaded,
    // handleSetIsMayHaveConflictKeys,
  } = neededHandlers;
  const handleNeededSaveArray = isSavedMoviesCase
    ? neededHandlers.handleSetOwnedArray : neededHandlers.handleSetArray;
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
    debugger;
    handleSetIsNothingFound(false);
    if (isSearchFormStatesEqual) {
      // setErrorText('Такой запрос только что был выполнен, введите другую комбинацию символов');
      return;
    }
    let resultedMoviesArray;
    /* ************************************** */
    // Логика фильтрации для сохраненных фильмов
    if (isSavedMoviesCase) {
      debugger;
      if (String(filmName).length === 0) {
        handleNeededSaveArray(cachedOwnedArrayToDisplay);
        return;
      }
      handleSetIsProcessing(true);
      debugger;
      console.log('Значение массива сохраненных фильмов на входе:');
      console.log(ownedArrayToDisplay);
      resultedMoviesArray = filterNameFilm(ownedArrayToDisplay, filmName);
      console.log('Значение массива сохраненных фильмов на выходе:');
      console.log(resultedMoviesArray);
      if (!resultedMoviesArray.length) {
        handleNeededSaveArray([]);
        handleSetIsNothingFound(true);
        handleSetInitialSavedMoviesValues();
        handleSetIsProcessing(false);
        return;
      }
      handleNeededSaveArray(resultedMoviesArray);
      // Устанавливает стейт текущего состояния формы, для последующего сравнения с новым
      handleSetInitialSavedMoviesValues();
      handleSetIsProcessing(false);
      /* ************************** */
      // Логика фильтрации для фильмов
    } else {
      debugger;
      if (String(filmName).length === 0) {
        setErrorText('Нужно ввести ключевое слово');
        return;
      }
      handleSetIsProcessing(true);
      if (!cachedArray.length) {
        // Запрос за данными с сервера
        getMoviesCards()
          .then((moviesCardsData) => {
            // debugger;
            resultedMoviesArray = filterNameFilm(moviesCardsData, filmName);
            if (!resultedMoviesArray.length) {
              handleNeededSaveArray([]);
              handleSaveForm({ filmName, shortFilm });
              handleSetInitialMoviesValues();
              handleSetIsProcessing(false);
              handleSetIsNothingFound(true);
              return;
            }
            if (cachedOwnedArray.length) {
              console.log('moviesCardsData:');
              console.log(moviesCardsData);
              console.log('filterCurrentUserArray(email, cachedOwnedArray):');
              console.log(filterCurrentUserArray(email, cachedOwnedArray));
              console.log('synchro result:');
              // eslint-disable-next-line max-len
              console.log(synchronizeArrays(moviesCardsData, filterCurrentUserArray(email, cachedOwnedArray)));
              console.log('*************************************************');
              console.log('resultedMoviesArray:');
              console.log(resultedMoviesArray);
              console.log('filterCurrentUserArray(email, cachedOwnedArray):');
              console.log(filterCurrentUserArray(email, cachedOwnedArray));
              console.log('synchro result2:');
              // eslint-disable-next-line max-len
              console.log(synchronizeArrays(resultedMoviesArray, filterCurrentUserArray(email, cachedOwnedArray)));
              // debugger;
              handleSaveCachedArray(
                synchronizeArrays(moviesCardsData, filterCurrentUserArray(email, cachedOwnedArray)),
              );
              handleNeededSaveArray(
                synchronizeArrays(
                  resultedMoviesArray,
                  filterCurrentUserArray(email, cachedOwnedArray),
                ),
              );
            } else {
              handleSaveCachedArray(moviesCardsData);
              handleNeededSaveArray(resultedMoviesArray);
            }
            handleSaveForm({ filmName, shortFilm });
            handleSetInitialMoviesValues();
            // handleSetIsArrayJustLoaded(true);
          })
          .catch((err) => catchResponse(err))
          .finally(() => handleSetIsProcessing(false));
        return;
      }
      // Запрос закэшированных данных
      debugger;
      resultedMoviesArray = filterNameFilm(cachedArray, filmName);
      if (!resultedMoviesArray.length) {
        handleNeededSaveArray([]);
        handleSaveForm({ filmName, shortFilm });
        handleSetInitialMoviesValues();
        handleSetIsProcessing(false);
        handleSetIsNothingFound(true);
        return;
      }
      handleNeededSaveArray(resultedMoviesArray);
      handleSaveForm({ filmName, shortFilm });
      handleSetInitialMoviesValues();
      handleSetIsProcessing(false);
    }
  }

  function handleShortFilmFilter(event) {
    debugger;
    const { target: { checked } } = event;
    handleSetIsShortFilmChecked(checked, isSavedMoviesCase);
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
