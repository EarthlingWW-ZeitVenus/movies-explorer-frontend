import './MoviesCard.css';
// import savedMovieButton from '../../images/saved-movie-button.jpg';

function MoviesCard({
  title, duration, image, number,
}) {
  // const swKey = key;
  const whichTypeIsButton = () => {
    switch (number) {
      case 1:
        return '_type_saved';
      case 2:
        return '_type_save';
      default:
        return '_type_deleted';
    }
  };

  return (
    <li className="movies-card">
      <div className="movies-card__title-container">
        <h2 className="movies-card__title short-format-title">{title}</h2>
        <p className="movies-card__duration">{duration}</p>
      </div>
      <a className="movies-card__link" href="http://www.link-to-trailer.org" target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          src={image}
          alt="Картинка с кадром из фильма"
        />
      </a>
      <button type="button" className={`movies-card__button movies-card__button${whichTypeIsButton()}`}>
        { (whichTypeIsButton() === '_type_save')
          ? 'Сохранить'
          : <div
              className={`movie-card__button-icon movies-card__button-icon${whichTypeIsButton()}`}
            />
        }
      </button>
    </li>
  );
}

export default MoviesCard;
