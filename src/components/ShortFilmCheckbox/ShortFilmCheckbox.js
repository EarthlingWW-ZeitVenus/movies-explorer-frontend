import './ShortFilmCheckbox.css';

function ShortFilmCheckbox() {
  return (
    <label className="checkbox-switcher">
      <input
        name="shortFilm"
        className="checkbox-switcher__input"
        type="checkbox"
      />
      <span className="checkbox-switcher__span"/>
    </label>
  );
}

export default ShortFilmCheckbox;