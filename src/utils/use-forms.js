/* eslint-disable react/display-name */
import React, { useCallback } from 'react';
import { isEqual } from 'lodash';

// хук управления всеми формами и их валидацией
function useForms(localSavedFormState) {
  // debugger;
  console.log('Обращение к кастомному хуку useForms');
  const [searchFormValues, setSearchFormValues] = React.useState(localSavedFormState);
  console.log('localSavedFormState in use-forms:');
  console.log(localSavedFormState);
  console.log('searchFormValues in use-forms:');
  console.log(searchFormValues);
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

  const isSearchFormStatesEqual = isEqual(localSavedFormState, searchFormValues);
  const isProfileValuesEqual = isEqual(initialProfileValues, profileValues);

  const handleSetProfileValues = (profName, profEmail) => {
    setProfileValues({ profileName: profName, profileEmail: profEmail });
  };

  const handleSetInitialProfileValues = (profName, profEmail) => {
    setInitialProfileValues({ profileName: profName, profileEmail: profEmail });
  };

  const handleRegisterFormChange = (event) => {
    const { target } = event;
    const { name } = target;
    const valueData = target.value;
    console.log('***Все нижеперечисленное происходит внутри handleRegisterFormChange хука useForms***');
    console.log('registerValues in hook useForms before any setValues');
    console.log(registerValues);
    setRegisterValues({ ...registerValues, [name]: valueData });
    console.log('registerValues in hook useForms after "setRegisterValues({ ...registerValues, [name]: valueData })"');
    console.log(registerValues);
    setFormErrors({ ...formErrors, [`${name}Error`]: target.validationMessage });
    console.log('formErrors in hook useForms after "setFormErrors({ ...errors, [name]: target.validationMessage })"');
    console.log(formErrors);
    setFormIsValid(target.closest('form').checkValidity());
    console.log('formIsValid in hook useForms after "setFormIsValid(target.closest("form").checkValidity())"');
    console.log(formIsValid);
  };

  const handleLoginFormChange = (event) => {
    const { target } = event;
    const { name } = target;
    const valueData = target.value;
    console.log('***Все нижеперечисленное происходит внутри handleLoginFormChange хука useForms***');
    console.log('loginValues in hook useForms before any setValues');
    console.log(loginValues);
    setLoginValues({ ...loginValues, [name]: valueData });
    console.log('loginValues in hook useForms after "setLoginValues({ ...loginValues, [name]: valueData })"');
    console.log(loginValues);
    setFormErrors({ ...formErrors, [`${name}Error`]: target.validationMessage });
    console.log('formErrors in hook useForms after "setFormErrors({ ...errors, [name]: target.validationMessage })"');
    console.log(formErrors);
    setFormIsValid(target.closest('form').checkValidity());
    console.log('formIsValid in hook useForms after "setFormIsValid(target.closest("form").checkValidity())"');
    console.log(formIsValid);
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

  const handleSearchFormChange = (event) => {
    const { target } = event;
    const { name } = target;
    const valueData = target.type === 'checkbox' ? target.checked : target.value;
    console.log('***Все нижеперечисленное происходит внутри handleFormChange хука useForms***');
    console.log('searchFormValues in hook useForms before any setValues');
    console.log(searchFormValues);
    setSearchFormValues({ ...searchFormValues, [name]: valueData });
    console.log('searchFormValues in hook useForms after "setFormValues({ ...values, [name]: valueData })"');
    console.log(searchFormValues);
    setFormErrors({ ...formErrors, [`${name}Error`]: target.validationMessage });
    console.log('formErrors in hook useForms after "setFormErrors({ ...errors, [name]: target.validationMessage })"');
    console.log(formErrors);
    setFormIsValid(target.closest('form').checkValidity());
    console.log('formIsValid in hook useForms after "setFormIsValid(target.closest("form").checkValidity())"');
    console.log(formIsValid);
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

  console.log('Ниже текущие состояние стейта searchFormValues внутри хука useForms:');
  console.log(searchFormValues);
  console.log('registerValues внутри хука useForms:');
  console.log(registerValues);
  console.log('loginValues внутри хука useForms:');
  console.log(loginValues);
  console.log('profileValues внутри хука useForms:');
  console.log(profileValues);

  return {
    searchFormValues,
    registerValues,
    loginValues,
    profileValues,
    formErrors,
    formIsValid,
    isSearchFormStatesEqual,
    isProfileValuesEqual,
    handleSetInitialProfileValues,
    handleSetProfileValues,
    handleRegisterFormChange,
    handleLoginFormChange,
    handleProfileFormChange,
    handleSearchFormChange,
    resetRegisterForm,
    resetLoginForm,
    resetProfileForm,
  };
}

export default useForms;
