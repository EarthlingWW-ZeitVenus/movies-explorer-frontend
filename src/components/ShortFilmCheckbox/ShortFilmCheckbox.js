// import React from 'react';
import './ShortFilmCheckbox.css';
// import CurrentFunctionsContext from '../../contexts/CurrentFunctionsContext';
import useForms from '../../utils/use-forms';

function ShortFilmCheckbox() {
  console.log('обращение к компоненту ShortFilmCheckbox');
  const { values: { shortFilm }, handleChange } = useForms();
  // const [isChecked, setIsChecked] = React.useState(false);
  // const [values, setValues] = React.useState({});
  // const { handleSetAllFormsStates } = React.useContext(CurrentFunctionsContext);

  // const handleSetIsChecked = (e) => {
  // setIsChecked(!isChecked);
  // setValues()
  // console.log(`Внутри input состояние checked сейчас такое - ${e.target.checked}`);
  // };

  // console.log(`Внутри ShortFilmCheckbox состояние isChecked сейчас такое - ${isChecked}`);

  return (
    <label className="checkbox-switcher">
      <input
        name="shortFilm"
        className="checkbox-switcher__input"
        type="checkbox"
        // onChange={handleSetIsShortFilm}
        // checked={values}
        onChange={handleChange}
        checked={shortFilm}
      />
      <span className="checkbox-switcher__span"/>
    </label>
  );
}

export default ShortFilmCheckbox;
