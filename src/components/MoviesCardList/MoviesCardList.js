import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
// import movieImage from '../../images/movie-image.jpg';
import CurrentDataContext from '../../contexts/CurrentDataContext';

// const tempCardObject = {
//   title: 'В погоне за Бенкси',
//   duration: '27 минут',
//   image: movieImage,
// };

function MoviesCardList() {
  const { filteredMoviesCards } = React.useContext(CurrentDataContext);
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {filteredMoviesCards.map((movieCardItem) => <MoviesCard
            key={movieCardItem.id}
            title={movieCardItem.nameRU}
            duration={movieCardItem.duration}
            image={movieCardItem.image.url}
            trailer={movieCardItem.trailerLink}
          />)
        }
      </ul>
    </section>
  );
}

export default MoviesCardList;
