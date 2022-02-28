import './SearchForm.css';
import ShortFilmCheckbox from '../ShortFilmCheckbox/ShortFilmCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">

        <fieldset className="search-form__fieldset">
          <input
            className="search-form__input"
            name="film-name"
            placeholder="Фильм"
            type="text"
            autoComplete="off"
          />
          <button className="search-form__submit" type="submit">Поиск</button>
        </fieldset>

        <fieldset className="search-form__fieldset search-form__fieldset_type_for-checkbox">
          <ShortFilmCheckbox/>
          <span className="search-form__text">Короткометражки</span>
        </fieldset>

      </form>
    </section>
  );
}

export default SearchForm;
