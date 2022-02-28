import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import movieImage from '../../images/movie-image.jpg';

const tempCardObject = {
  title: "В погоне за Бенкси",
  duration: "27 минут",
  image: movieImage,
};

function MoviesCardList() {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {new Array(3).fill(tempCardObject).map((movie) =>
          <MoviesCard
            title={tempCardObject.title}
            duration={tempCardObject.duration}
            image={tempCardObject.image}
          />)}
      </ul>
    </section>
  );
}

export default MoviesCardList;