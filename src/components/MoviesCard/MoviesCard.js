// import React from 'react';
import './MoviesCard.css';
import savedButtonIcon from '../../images/saved-button-icon.svg';
import deleteButtonIcon from '../../images/delete-button-icon.svg';

function MoviesCard({
  movieInfoObject,
  onChangeSaveMovie,
  isSavedMoviesCase,
}) {
  console.log('movieInfoObject in MoviesCard');
  console.log(movieInfoObject);
  const isOwned = 'owner' in movieInfoObject;
  console.log(`isOwned - ${isOwned}`);
  const { duration, nameRU } = movieInfoObject;
  const image = movieInfoObject.imageUrl;
  const imagePath = movieInfoObject.image && movieInfoObject.image.url;
  const trailer = movieInfoObject.trailer || movieInfoObject.trailerLink;
  // if (isOwned) {
  //   const {
  //     imageUrl: image,
  //     trailer,
  //   } = movieInfoObject;
  // } else {
  // const {
  // country,
  // director,
  // duration,
  // year,
  // description,
  // image: { url: image },
  // trailerLink: trailer,
  // nameRU,
  // nameEN,
  // id: movieId,
  //   } = movieInfoObject;
  // }

  // const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  const thumbnail = image || `https://api.nomoreparties.co${imagePath}`;

  console.log(image);
  console.log(imagePath);
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

  function whichElementToDisplay() {
    if (isSavedMoviesCase) {
      return (<img src={deleteButtonIcon} alt="иконка удаления фильма" />);
    }
    if (isOwned) {
      return (<img src={savedButtonIcon} alt="иконка сохраненного фильма" />);
    }
    return ('Сохранить');
  }

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
      <button
        type="button"
        className={`movies-card__button
          ${isOwned && !isSavedMoviesCase && 'movies-card__button_type_saved'}`}
        onClick={handleButtonClick}>
        {/* {isSavedMoviesCase ? <img src={deleteButtonIcon} alt="иконка удаления фильма" />
          : isOwned ? <img src={savedButtonIcon} alt="иконка сохраненного фильма" />
            : 'Сохранить'} */}
        {whichElementToDisplay()}
      </button>
    </li>
  );
}

export default MoviesCard;
