// import React from 'react';
import './MoviesCard.css';
import savedButtonIcon from '../../images/saved-button-icon.svg';

function MoviesCard({
  movieInfoObject,
  onChangeSaveMovie,
}) {
  console.log('movieInfoObject in MoviesCard');
  console.log(movieInfoObject);
  const isOwned = 'owner' in movieInfoObject;
  console.log(`isOwned - ${isOwned}`);
  const {
    // country,
    // director,
    duration,
    // year,
    // description,
    image: { url: image },
    trailerLink: trailer,
    nameRU,
    // nameEN,
    // id: movieId,
  } = movieInfoObject;
  // const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  const thumbnail = `https://api.nomoreparties.co${image}`;

  console.log(image);
  console.log(thumbnail);

  const handleButtonClick = () => {
    debugger;
    onChangeSaveMovie(
      movieInfoObject,
      // country,
      // director,
      // duration,
      // year,
      // description,
      // image,
      // trailer,
      // thumbnail,
      // movieId,
      // nameRU,
      // nameEN,
    );
    // setIsMovieSaved(true);
  };

  // console.log(savedButtonIcon);

  return (
    <li className="movies-card">
      <div className="movies-card__title-container">
        <h2 className="movies-card__title short-format-title">{nameRU}</h2>
        <p className="movies-card__duration">{duration}</p>
      </div>
      <a className="movies-card__link" href={trailer} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          src={thumbnail}
          alt="Картинка с кадром из фильма"
        />
      </a>
      {/* <button type="button"
      className={`movies-card__button movies-card__button${whichTypeIsButton()}`}>
        { (whichTypeIsButton() === '_type_save')
          ? 'Сохранить'
          : <div
              className={`movie-card__button-icon movies-card__button-icon${whichTypeIsButton()}`}
            />
        }
      </button> */}
      <button type="button" className={`movies-card__button ${isOwned && 'movies-card__button_type_saved'}`} onClick={handleButtonClick}>
        {isOwned ? <img src={savedButtonIcon} alt="иконка сохраненного фильма" /> : 'Сохранить'}
      </button>
    </li>
  );
}

export default MoviesCard;
