import "./MoviesCard.css";


function MoviesCard({ title, duration, image }) {

  console.log(image);

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
      <button type="button" className="movies-card__button">
        <div className="movie-card__button-icon movies-card__button-icon_type_delete" />
      </button>
    </li>
  );
}

export default MoviesCard;