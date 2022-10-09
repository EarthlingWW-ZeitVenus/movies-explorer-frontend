/* eslint-disable react/display-name */
import React, { useCallback } from 'react';
import { isEqual } from 'lodash';

// хук управления всеми формами и их валидацией
function useForms(localSavedFormState, localSavedCurrentUser) {
  // debugger;
  console.log('Обращение к кастомному хуку useForms');
  console.log('localSavedCurrentUser in use-forms:');
  console.log(localSavedCurrentUser);
  console.log(`localSavedCurrentUser.name - ${localSavedCurrentUser.name}`);
  console.log(`localSavedCurrentUser.email - ${localSavedCurrentUser.email}`);
  const { name: profName, email: profEmail } = localSavedCurrentUser;
  console.log(profName);
  console.log(profEmail);
  const [searchFormValues, setSearchFormValues] = React.useState(localSavedFormState);
  // console.log('localSavedFormState in use-forms:');
  // console.log(localSavedFormState);
  // console.log('searchFormValues in use-forms:');
  // console.log(searchFormValues);
  const [
    registerAuthProfileFormValues, setRegisterAuthProfileFormValues,
  ] = React.useState({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    loginEmail: '',
    loginPassword: '',
    profileEmail: String(profName),
    profileName: String(profEmail),
  });
  const [formErrors, setFormErrors] = React.useState({});
  const [formIsValid, setFormIsValid] = React.useState(false);
  // const [lastSubmitFormState, setLastSubmitFormState] = React.useState({});

  console.log('registerAuthProfileFormValues in use-forms:');
  console.log(registerAuthProfileFormValues);

  // debugger;
  const isSearchFormStatesEqual = isEqual(localSavedFormState, searchFormValues);

  const handleRegisterAuthProfileFormChange = (event) => {
    const { target } = event;
    const { name } = target;
    const valueData = target.value;
    console.log('***Все нижеперечисленное происходит внутри handleRegisterAuthProfileFormChange хука useForms***');
    console.log('registerAuthFormValues in hook useForms before any setValues');
    console.log(registerAuthProfileFormValues);
    setRegisterAuthProfileFormValues({ ...registerAuthProfileFormValues, [name]: valueData });
    console.log('registerAuthFormValues in hook useForms after "setFormValues({ ...values, [name]: valueData })"');
    console.log(registerAuthProfileFormValues);
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

  // const handleLastSubmitFormState = (event) => {
  //   const { target } = event;
  //   const { name } = target;
  //   const valueData = target.type === 'checkbox' ? target.checked : target.value;
  //   setLastSubmitFormState({ ...lastSubmitFormState, [name]: valueData });
  // };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setRegisterAuthProfileFormValues(newValues);
      setFormErrors(newErrors);
      setFormIsValid(newIsValid);
    },
    [setRegisterAuthProfileFormValues, setFormErrors, setFormIsValid],
  );

  // React.useEffect(() => {
  // console.log('Произошел запрос внутри хука эффекта формы, для инициализации
  // начальными данными из локального хранилища');
  //   debugger;
  //   if (!isFormStatesEqual) {
  //     setFormValues(localSavedFormState);
  //   }
  // }, [isFormStatesEqual]);

  console.log('Ниже текущие состояние стейта searchFormValues внутри хука useForms:');
  console.log(searchFormValues);
  console.log('Ниже текущие состояние стейта registerAuthProfileFormValues внутри хука useForms:');
  console.log(registerAuthProfileFormValues);

  return {
    searchFormValues,
    registerAuthProfileFormValues,
    formErrors,
    formIsValid,
    isSearchFormStatesEqual,
    handleRegisterAuthProfileFormChange,
    handleSearchFormChange,
    resetForm,
  };
}

export default useForms;
