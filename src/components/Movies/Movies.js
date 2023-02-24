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
  // forConflictCard,
}) {
  console.log('обращение к компоненту Movies');
  const { arrayToDisplay } = React.useContext(CurrentDataContext);
  console.log('arrayToDisplay in Movies.js:');
  console.log(arrayToDisplay);
  const { handleOwnMovie, handleSetIsNothingFound, ...otherNeededHandlers } = neededHandlers;
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
      // forConflictCard={forConflictCard}
      moviesArray={arrayToDisplay}
      onOwnMovie={handleOwnMovie}
      isSavedMoviesCase={false}/>);
  }

  // Хук исправляющий ситуацию, когда после перехода из другого компонента
  // (где было ничего не найдено) в текущем компоненте отображается "ничего не найдено"
  React.useEffect(() => {
    console.log('сработал хук эффекта внутри movies');
    // debugger;
    if (isNothingFound && Boolean(arrayToDisplay.length)) {
      handleSetIsNothingFound(false);
    }
  }, [isNothingFound]);

  return (
    <>
      <Header onBurgerMenu={onBurgerMenu} colorThemeDark={colorThemeDark}/>
      <main className="content page_format_side-padding">
        <SearchForm
          catchResponse={catchResponse}
          searchForm={searchForm}
          neededHandlers={{ ...otherNeededHandlers, handleSetIsNothingFound }}
          isSavedMoviesCase={false}
          isProcessing={isProcessing} />
        {whichElementToDisplay()}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
