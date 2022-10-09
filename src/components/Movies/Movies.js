// import React from 'react';
// import CurrentDataContext from '../../contexts/CurrentDataContext';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({
  moviesArray,
  commonProcessStates,
  searchForm,
  neededHandlers,
}) {
  const { handleChangeSaveMovie, ...otherNeededHandlers } = neededHandlers;
  // debugger;
  // const { isNothingFound, isProcessing } = React.useContext(CurrentDataContext);
  // const allSimpleStates = React.useContext(CurrentDataContext);
  console.log('обращение к компоненту Movies');
  const { isProcessing, isNothingFound } = commonProcessStates;
  console.log('isProcessing внутри компонента Movies:');
  console.log(isProcessing);
  console.log('isNothingFound внутри компонента Movies:');
  console.log(isNothingFound);

  function whichElementToDisplay() {
    if (isProcessing) {
      return (<Preloader/>);
    }
    if (isNothingFound) {
      return (<p className="content__error-text">Ничего не найдено</p>);
    }
    return (<MoviesCardList
      moviesArray={moviesArray}
      onChangeSaveMovie={handleChangeSaveMovie}
      isSavedMoviesCase={false}/>);
  }

  // const [isProcessing, setIsProcessing] = React.useState(false);
  // console.log(`currentMoviesCards - ${currentMoviesCards}`);

  // const handleFilteringMoviesCards = (isFiltering) => {
  //   setIsProcessing(isFiltering);
  // };
  // debugger;
  return (
    <main className="content page_format_side-padding">
      <SearchForm
        searchForm={searchForm}
        neededHandlers={otherNeededHandlers}
        isSavedMoviesCase={false}/>
      {whichElementToDisplay()}
    </main>
  );
}

export default Movies;
