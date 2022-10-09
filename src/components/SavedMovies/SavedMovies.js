import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { getMovies } from '../../utils/MainApi';

function SavedMovies({
  catchResponse,
  ownedMoviesArray,
  commonProcessStates,
  searchForm,
  neededHandlers,
}) {
  console.log('обращение к компоненту SavedMovies');

  const { isProcessing, isNothingFound } = commonProcessStates;
  const { handleChangeSaveMovie, handleSaveOwnedMovies, ...otherNeededHandlers } = neededHandlers;

  // const [isSavedOnLocalStorage, setIsSavedOnLocalStorage] = React.useState(false);

  // const handleSetIsSavedOnLocalStorage = (isSaved) => {
  //   setIsSavedOnLocalStorage(isSaved);
  // };

  function whichComponentToDisplay() {
    if (isProcessing) {
      return (<Preloader/>);
    }
    if (isNothingFound) {
      return (<p className="content__error-text">Ничего не найдено</p>);
    }
    return (<MoviesCardList
      isSavedMoviesCase={true}
      moviesArray={ownedMoviesArray}
      onChangeSaveMovie={handleChangeSaveMovie}
      onOwnMovie={handleChangeSaveMovie}/>);
  }

  React.useEffect(() => {
    // debugger;
    console.log('запрос за сохраненными фильмами внутри SavedMovies.js');
    getMovies()
      .then((res) => handleSaveOwnedMovies(res.data))
      .catch((err) => catchResponse(err));
  }, []);

  return (
    <main className="content page_format_side-padding">
      <SearchForm
        catchResponse={catchResponse}
        ownedMoviesArray={ownedMoviesArray}
        isSavedMoviesCase={true}
        searchForm={searchForm}
        neededHandlers={otherNeededHandlers}/>
        {/* handleSetIsSavedOnLocalStorage={handleSetIsSavedOnLocalStorage}/> */}
      {whichComponentToDisplay()}
    </main>
  );
}

export default SavedMovies;
