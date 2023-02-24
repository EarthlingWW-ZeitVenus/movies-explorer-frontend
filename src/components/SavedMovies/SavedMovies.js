import React from 'react';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getMovies } from '../../utils/MainApi';
import { filterCurrentUserArray } from '../../utils/utils';

function SavedMovies({
  catchResponse,
  onBurgerMenu,
  colorThemeDark,
  commonProcessStates,
  searchForm,
  neededHandlers,
  // forConflictCard,
}) {
  console.log('обращение к компоненту SavedMovies');

  const currentUser = React.useContext(CurrentUserContext);
  const {
    ownedArrayToDisplay,
    cachedOwnedArray,
  } = React.useContext(CurrentDataContext);
  const { isProcessing, isNothingFound } = commonProcessStates;
  const {
    handleOwnMovie,
    handleSetOwnedArray,
    handleSetCachedOwnedArray,
    handleSetIsShortFilmChecked,
    ...otherNeededHandlers
  } = neededHandlers;
  const { email } = currentUser;

  const { resetSearchFormForSavedMovies } = searchForm;

  function whichElementToDisplay() {
    if (isProcessing) {
      return (<Preloader/>);
    }
    if (isNothingFound) {
      return (<p className="content__error-text">Ничего не найдено</p>);
    }
    return (<MoviesCardList
      isSavedMoviesCase={true}
      // forConflictCard={forConflictCard}
      moviesArray={ownedArrayToDisplay}
      onOwnMovie={handleOwnMovie}/>);
  }

  React.useEffect(() => {
    // debugger;
    console.log('запрос за сохраненными фильмами внутри SavedMovies.js');
    resetSearchFormForSavedMovies();
    handleSetIsShortFilmChecked(false, true);
    if (!cachedOwnedArray.length) {
      getMovies()
        .then((res) => {
          // В кэшированном отобранном массиве содержатся карточки всех
          // пользователей, а уже дальше я накладываю функции-фильтры на него.
          handleSetCachedOwnedArray(res.data);
          handleSetOwnedArray(filterCurrentUserArray(email, res.data));
          // handleSaveCachedOwnedMovies(res.data);
          // handleSaveOwnedMovies(res.data);
        })
        .catch((err) => catchResponse(err));
    } else {
      handleSetOwnedArray(filterCurrentUserArray(email, cachedOwnedArray));
    }
  }, []);

  return (
    <>
      <Header onBurgerMenu={onBurgerMenu} colorThemeDark={colorThemeDark}/>
      <main className="content page_format_side-padding">
        <SearchForm
          catchResponse={catchResponse}
          isSavedMoviesCase={true}
          isProcessing={isProcessing}
          searchForm={searchForm}
          neededHandlers={
            { ...otherNeededHandlers, handleSetOwnedArray, handleSetIsShortFilmChecked }} />
        {whichElementToDisplay()}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
