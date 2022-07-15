// import React from 'react';
// import CurrentDataContext from '../../contexts/CurrentDataContext';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ statesData, handlers }) {
  // debugger;
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
    return (<MoviesCardList statesData={statesData} handlers={handlers}/>);
  }

  // const [isProcessing, setIsProcessing] = React.useState(false);
  // console.log(`currentMoviesCards - ${currentMoviesCards}`);

  // const handleFilteringMoviesCards = (isFiltering) => {
  //   setIsProcessing(isFiltering);
  // };
  // debugger;
  return (
    <main className="content page_format_side-padding">
      <SearchForm handlers={handlers} statesData={statesData}/>
      {whichComponentToDisplay()}
    </main>
  );
}

export default Movies;
