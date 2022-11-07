import React from 'react';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getMovies } from '../../utils/MainApi';
// import { filterShortFilm } from '../../utils/utils';
// import { numberConstants } from '../../utils/constants';

function SavedMovies({
  catchResponse,
  // ownedMoviesArray,
  onBurgerMenu,
  colorThemeDark,
  commonProcessStates,
  searchForm,
  neededHandlers,
}) {
  console.log('обращение к компоненту SavedMovies');

  // const [moviesArrayToDisplay, setMoviesArrayToDisplay] = React.useState([]);
  // const [isShortFilmChecked, setIsShortFilmChecked] = React.useState(false);

  const { ownedMoviesArrayToDisplay } = React.useContext(CurrentDataContext);
  const { isProcessing, isNothingFound } = commonProcessStates;
  const { handleOwnMovie, handleSaveOwnedMovies, ...otherNeededHandlers } = neededHandlers;
  // const { searchFormValues: { shortFilm } } = searchForm;
  // const { SHORT_FILM_MAX_DURATION } = numberConstants;

  // console.log(`значение shortFilm внутри SavedMovies - ${shortFilm}`);

  // function handleSetMoviesArrayToDisplay(mArray) {
  //   setMoviesArrayToDisplay(mArray);
  // }

  // function handleSetsetIsShortFilmChecked(isChecked) {
  //   setIsShortFilmChecked(isChecked);
  // }

  function whichElementToDisplay() {
    if (isProcessing) {
      return (<Preloader/>);
    }
    if (isNothingFound) {
      return (<p className="content__error-text">Ничего не найдено</p>);
    }
    return (<MoviesCardList
      isSavedMoviesCase={true}
      // moviesArray={ownedMoviesArray}
      moviesArray={ownedMoviesArrayToDisplay}
      onOwnMovie={handleOwnMovie}/>);
  }

  React.useEffect(() => {
    // debugger;
    console.log('запрос за сохраненными фильмами внутри SavedMovies.js');
    getMovies()
      .then((res) => handleSaveOwnedMovies(res.data))
      .catch((err) => catchResponse(err));
  }, []);

  // Хук фильтрации массива фильмов по переключателю "короткометражки" при начальном рендере
  // React.useEffect(() => {
  //   console.log('запрос внутри хука эффекта фильтрации по переключателю');
  //   debugger;
  //   setIsShortFilmChecked(shortFilm);
  //   // let finalMoviesArray = isSavedMoviesCase ? ownedMoviesArray : moviesArray;
  //   let finalMoviesArray = ownedMoviesArray;
  //   if (shortFilm) {
  //     debugger;
  //     finalMoviesArray = filterShortFilm(ownedMoviesArray, SHORT_FILM_MAX_DURATION);
  //   }
  //   handleSetMoviesArrayToDisplay(finalMoviesArray);
  //   debugger;
  // }, []);

  // Хук фильтрации массива фильмов по переключателю "короткометражки" при изменении "сhecked"
  // React.useEffect(() => {
  //   console.log('запрос внутри хука эффекта фильтрации по переключателю');
  //   debugger;
  // let finalMoviesArray = isSavedMoviesCase ? ownedMoviesArray : moviesArray;
  //   let finalMoviesArray = ownedMoviesArray;
  //   if (isShortFilmChecked) {
  //     debugger;
  //     finalMoviesArray = filterShortFilm(ownedMoviesArray, SHORT_FILM_MAX_DURATION);
  //   }
  //   handleSetMoviesArrayToDisplay(finalMoviesArray);
  //   debugger;
  // }, [isShortFilmChecked]);

  return (
    <>
      <Header onBurgerMenu={onBurgerMenu} colorThemeDark={colorThemeDark}/>
      <main className="content page_format_side-padding">
        <SearchForm
          catchResponse={catchResponse}
          // ownedMoviesArray={ownedMoviesArray}
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
