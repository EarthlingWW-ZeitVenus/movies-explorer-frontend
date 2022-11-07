import React from 'react';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import { filterShortFilm } from '../../utils/utils';
// import { numberConstants } from '../../utils/constants';

function Movies({
  catchResponse,
  // moviesArray,
  onBurgerMenu,
  colorThemeDark,
  commonProcessStates,
  searchForm,
  neededHandlers,
  // shortFilm,
}) {
  // const [moviesArrayToDisplay, setMoviesArrayToDisplay] = React.useState([]);
  // const [isShortFilmChecked, setIsShortFilmChecked] = React.useState(false);

  const { moviesArrayToDisplay } = React.useContext(CurrentDataContext);
  console.log('moviesArrayToDisplay in Movies.js:');
  console.log(moviesArrayToDisplay);
  const { handleOwnMovie, ...otherNeededHandlers } = neededHandlers;
  // const { searchFormValues: { shortFilm } } = searchForm;
  // const { SHORT_FILM_MAX_DURATION } = numberConstants;
  // debugger;
  // const { isNothingFound, isProcessing } = React.useContext(CurrentDataContext);
  // const allSimpleStates = React.useContext(CurrentDataContext);
  console.log('обращение к компоненту Movies');
  const { isProcessing, isNothingFound } = commonProcessStates;
  console.log('isProcessing внутри компонента Movies:');
  console.log(isProcessing);
  console.log('isNothingFound внутри компонента Movies:');
  console.log(isNothingFound);

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
      moviesArray={moviesArrayToDisplay}
      onOwnMovie={handleOwnMovie}
      isSavedMoviesCase={false}/>);
  }

  // Хук фильтрации массива фильмов по переключателю "короткометражки" при начальном рендере
  // React.useEffect(() => {
  //   console.log('запрос внутри хука эффекта фильтрации по переключателю');
  //   debugger;
  //   setIsShortFilmChecked(shortFilm);
  //   // let finalMoviesArray = isSavedMoviesCase ? ownedMoviesArray : moviesArray;
  //   let finalMoviesArray = moviesArray;
  //   if (shortFilm) {
  //     debugger;
  //     finalMoviesArray = filterShortFilm(moviesArray, SHORT_FILM_MAX_DURATION);
  //   }
  //   setMoviesArrayToDisplay(finalMoviesArray);
  //   debugger;
  // }, []);

  // Хук фильтрации массива фильмов по переключателю "короткометражки" при изменении "сhecked"
  // React.useEffect(() => {
  // console.log('запрос внутри хука эффекта фильтрации по переключателю');
  // debugger;
  // let finalMoviesArray = isSavedMoviesCase ? ownedMoviesArray : moviesArray;
  // let finalMoviesArray = moviesArray;
  // if (isShortFilmChecked) {
  // debugger;
  // finalMoviesArray = filterShortFilm(moviesArray, SHORT_FILM_MAX_DURATION);
  // }
  // setMoviesArrayToDisplay(finalMoviesArray);
  // debugger;
  // }, [isShortFilmChecked]);

  return (
    <>
      <Header onBurgerMenu={onBurgerMenu} colorThemeDark={colorThemeDark}/>
      <main className="content page_format_side-padding">
        <SearchForm
          catchResponse={catchResponse}
          searchForm={searchForm}
          neededHandlers={{ ...otherNeededHandlers }}
          isSavedMoviesCase={false}
          isProcessing={isProcessing} />
        {whichElementToDisplay()}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
