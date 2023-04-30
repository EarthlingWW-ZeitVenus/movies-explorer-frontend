/* eslint-disable react/display-name */
import React, { useCallback } from 'react';
import { isEqual } from 'lodash';

// хук управления всеми формами и их валидацией
function useForms(localSavedFormState) {
  // debugger;
  console.log('Обращение к кастомному хуку useForms');
  const [
    searchFormValuesForMovies,
    setSearchFormValuesForMovies,
  ] = React.useState(localSavedFormState);
  const [
    searchFormValuesForSavedMovies,
    setSearchFormValuesForSavedMovies,
  ] = React.useState({});
  console.log('localSavedFormState in use-forms:');
  console.log(localSavedFormState);
  const [registerValues, setRegisterValues] = React.useState({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
  });
  const [loginValues, setLoginValues] = React.useState({ loginEmail: '', loginPassword: '' });
  const [initialProfileValues, setInitialProfileValues] = React.useState({ profileName: '', profileEmail: '' });
  const [profileValues, setProfileValues] = React.useState({ profileName: '', profileEmail: '' });
  const [formErrors, setFormErrors] = React.useState({});
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [initialMoviesValues, setInitialMoviesValues] = React.useState(localSavedFormState);
  const [initialSavedMoviesValues, setInitialSavedMoviesValues] = React.useState({});

  const isSearchFormStatesForMoviesEqual = isEqual(initialMoviesValues, searchFormValuesForMovies);
  // eslint-disable-next-line max-len
  const isSearchFormStatesForSavedMoviesEqual = isEqual(initialSavedMoviesValues, searchFormValuesForSavedMovies);
  const isProfileValuesEqual = isEqual(initialProfileValues, profileValues);

  const handleSetProfileValues = (profileName, profileEmail) => {
    setProfileValues({ profileName, profileEmail });
  };

  const handleSetInitialProfileValues = (profileName, profileEmail) => {
    setInitialProfileValues({ profileName, profileEmail });
  };

  const handleSetInitialMoviesValues = () => {
    setInitialMoviesValues(searchFormValuesForMovies);
  };

  const handleSetInitialSavedMoviesValues = () => {
    setInitialSavedMoviesValues(searchFormValuesForSavedMovies);
  };

  const handleRegisterFormChange = (event) => {
    const { target } = event;
    const { name } = target;
    const valueData = target.value;
    setRegisterValues({ ...registerValues, [name]: valueData });
    setFormErrors({ ...formErrors, [`${name}Error`]: target.validationMessage });
    setFormIsValid(target.closest('form').checkValidity());
  };

  const handleLoginFormChange = (event) => {
    const { target } = event;
    const { name } = target;
    const valueData = target.value;
    setLoginValues({ ...loginValues, [name]: valueData });
    setFormErrors({ ...formErrors, [`${name}Error`]: target.validationMessage });
    setFormIsValid(target.closest('form').checkValidity());
  };

  const handleProfileFormChange = (event) => {
    const { target } = event;
    const { name } = target;
    const valueData = target.value;
    console.log('***Все нижеперечисленное происходит внутри handleProfileFormChange хука useForms***');
    console.log('profileValues in hook useForms before any setValues');
    console.log(profileValues);
    setProfileValues({ ...profileValues, [name]: valueData });
    console.log('profileValues in hook useForms after "setProfileValues({ ...profileValues, [name]: valueData })"');
    console.log(profileValues);
    setFormErrors({ ...formErrors, [`${name}Error`]: target.validationMessage });
    console.log('formErrors in hook useForms after "setFormErrors({ ...errors, [name]: target.validationMessage })"');
    console.log(formErrors);
    setFormIsValid(target.closest('form').checkValidity());
    console.log('formIsValid in hook useForms after "setFormIsValid(target.closest("form").checkValidity())"');
    console.log(formIsValid);
  };

  const handleSearchFormChange = (event, isSavedMoviesCase) => {
    // debugger;
    const { target } = event;
    const { name } = target;
    const valueData = target.type === 'checkbox' ? target.checked : target.value;
    if (isSavedMoviesCase) {
      setSearchFormValuesForSavedMovies({ ...searchFormValuesForSavedMovies, [name]: valueData });
    } else {
      setSearchFormValuesForMovies({ ...searchFormValuesForMovies, [name]: valueData });
    }
    setFormErrors({ ...formErrors, [`${name}Error`]: target.validationMessage });
    setFormIsValid(target.closest('form').checkValidity());
  };

  const resetRegisterForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setRegisterValues(newValues);
      setFormErrors(newErrors);
      setFormIsValid(newIsValid);
    },
    [setRegisterValues, setFormErrors, setFormIsValid],
  );

  const resetLoginForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setLoginValues(newValues);
      setFormErrors(newErrors);
      setFormIsValid(newIsValid);
    },
    [setLoginValues, setFormErrors, setFormIsValid],
  );

  const resetProfileForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setProfileValues(newValues);
      setFormErrors(newErrors);
      setFormIsValid(newIsValid);
    },
    [setProfileValues, setFormErrors, setFormIsValid],
  );

  const resetSearchFormForMovies = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setSearchFormValuesForMovies(newValues);
      setFormErrors(newErrors);
      setFormIsValid(newIsValid);
    },
    [setSearchFormValuesForMovies, setFormErrors, setFormIsValid],
  );

  const resetSearchFormForSavedMovies = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setSearchFormValuesForSavedMovies(newValues);
      setFormErrors(newErrors);
      setFormIsValid(newIsValid);
    },
    [setSearchFormValuesForSavedMovies, setFormErrors, setFormIsValid],
  );

  const resetInitialMoviesValues = () => {
    setInitialMoviesValues({});
  };

  const resetInitialSavedMoviesValues = () => {
    setInitialSavedMoviesValues({});
  };

  const resetInitialProfileValues = () => {
    setInitialProfileValues({});
  };

  return {
    searchFormValuesForMovies,
    searchFormValuesForSavedMovies,
    registerValues,
    loginValues,
    profileValues,
    formErrors,
    formIsValid,
    isSearchFormStatesForMoviesEqual,
    isSearchFormStatesForSavedMoviesEqual,
    isProfileValuesEqual,
    handleSetInitialProfileValues,
    handleSetInitialMoviesValues,
    handleSetInitialSavedMoviesValues,
    handleSetProfileValues,
    handleRegisterFormChange,
    handleLoginFormChange,
    handleProfileFormChange,
    handleSearchFormChange,
    resetRegisterForm,
    resetLoginForm,
    resetProfileForm,
    resetSearchFormForMovies,
    resetSearchFormForSavedMovies,
    resetInitialMoviesValues,
    resetInitialSavedMoviesValues,
    resetInitialProfileValues,
  };
}

export default useForms;
