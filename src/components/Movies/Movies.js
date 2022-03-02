import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function Movies() {
  return (
    <main className="content page_format_side-padding">
      <SearchForm/>
      {/* <MoviesCardList/> */}
      <Preloader/>
    </main>
  );
}

export default Movies;
