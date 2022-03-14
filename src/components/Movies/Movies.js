import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ isLoaded }) {
  return (
    <main className="content page_format_side-padding">
      <SearchForm/>
      { isLoaded ? <MoviesCardList/> : <Preloader/> }
    </main>
  );
}

export default Movies;
