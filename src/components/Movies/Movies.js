import React from 'react';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({
  catchResponse,
  onBurgerMenu,
  colorThemeDark,
  commonProcessStates,
  searchForm,
  neededHandlers,
}) {
  const { moviesArrayToDisplay } = React.useContext(CurrentDataContext);
  // console.log('moviesArrayToDisplay in Movies.js:');
  // console.log(moviesArrayToDisplay);
  const { handleOwnMovie, ...otherNeededHandlers } = neededHandlers;
  // console.log('обращение к компоненту Movies');
  const { isProcessing, isNothingFound } = commonProcessStates;
  // console.log('isProcessing внутри компонента Movies:');
  // console.log(isProcessing);
  // console.log('isNothingFound внутри компонента Movies:');
  // console.log(isNothingFound);

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
