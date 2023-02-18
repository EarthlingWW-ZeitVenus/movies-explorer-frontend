import React from 'react';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getMovies } from '../../utils/MainApi';

function SavedMovies({
  catchResponse,
  onBurgerMenu,
  colorThemeDark,
  commonProcessStates,
  searchForm,
  neededHandlers,
}) {
  // console.log('обращение к компоненту SavedMovies');

  const { ownedMoviesArrayToDisplay } = React.useContext(CurrentDataContext);
  const { isProcessing, isNothingFound } = commonProcessStates;
  const {
    handleOwnMovie,
    handleSaveOwnedMovies,
    handleSaveCachedOwnedMovies,
    ...otherNeededHandlers
  } = neededHandlers;

  function whichElementToDisplay() {
    if (isProcessing) {
      return (<Preloader/>);
    }
    if (isNothingFound) {
      return (<p className="content__error-text">Ничего не найдено</p>);
    }
    return (<MoviesCardList
      isSavedMoviesCase={true}
      moviesArray={ownedMoviesArrayToDisplay}
      onOwnMovie={handleOwnMovie}/>);
  }

  React.useEffect(() => {
    // debugger;
    console.log('запрос за сохраненными фильмами внутри SavedMovies.js');
    getMovies()
      .then((res) => {
        handleSaveCachedOwnedMovies(res.data);
        handleSaveOwnedMovies(res.data);
      })
      .catch((err) => catchResponse(err));
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
          neededHandlers={{ ...otherNeededHandlers, handleSaveOwnedMovies }} />
        {whichElementToDisplay()}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
