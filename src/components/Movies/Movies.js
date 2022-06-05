// import React from 'react';
// import CurrentDataContext from '../../contexts/CurrentDataContext';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ statesData, handlers }) {
  // const { isNothingFound, isProcessing } = React.useContext(CurrentDataContext);
  // const allSimpleStates = React.useContext(CurrentDataContext);
  console.log('обращение к компоненту Movies');
  const { isProcessing, isNothingFound } = statesData;
  console.log('isProcessing внутри компонента Movies:');
  console.log(isProcessing);
  console.log('isNothingFound внутри компонента Movies:');
  console.log(isNothingFound);

  function whichComponentToDisplay() {
    if (isProcessing) {
      return (<Preloader/>);
    }
    if (isNothingFound) {
      return (<p className="content__error-text">Ничего не найдено</p>);
    }
    return (<MoviesCardList statesData={statesData}/>);
  }

  // const [isProcessing, setIsProcessing] = React.useState(false);
  // console.log(`currentMoviesCards - ${currentMoviesCards}`);

  // const handleFilteringMoviesCards = (isFiltering) => {
  //   setIsProcessing(isFiltering);
  // };

  return (
    <main className="content page_format_side-padding">
      <SearchForm handlers={handlers} statesData={statesData}/>
      {/* {isProcessing ? <Preloader/>
        : (isNothingFound ? <p className="content__error-text">Ничего не найдено</p>
        : <MoviesCardList/>)} */}
      {whichComponentToDisplay()}
    </main>
  );
}

export default Movies;
