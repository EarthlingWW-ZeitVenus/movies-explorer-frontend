import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <main className="content page_format_side-padding">
      <SearchForm/>
      <MoviesCardList/>
    </main>
  );
}

export default SavedMovies;
