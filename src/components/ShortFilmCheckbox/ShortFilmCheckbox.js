/* eslint-disable react/display-name */
import './ShortFilmCheckbox.css';

const ShortFilmCheckbox = ({ shortFilm, handleShortFilmFilter, isProcessing }) => {
  console.log('обращение к компоненту ShortFilmCheckbox');

  return (
    <label className="checkbox-switcher">
      <input
        name="shortFilm"
        className="checkbox-switcher__input"
        type="checkbox"
        onChange={handleShortFilmFilter}
        checked={shortFilm}
        disabled={isProcessing}
      />
      <span className="checkbox-switcher__span"/>
    </label>
  );
};

export default ShortFilmCheckbox;
