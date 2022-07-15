/* eslint-disable react/display-name */
import React, { useCallback } from 'react';
import { isEqual } from 'lodash';

// хук управления всеми формами и их валидацией
function useForms(localSavedFormState = {}) {
  // debugger;
  console.log('Обращение к кастомному хуку useForms');
  const [searchFormValues, setSearchFormValues] = React.useState(localSavedFormState);
  const [
    registerAuthFormValues, setRegisterAuthFormValues,
  ] = React.useState({
    registerName: '', registerEmail: '', registerPassword: '', loginEmail: '', loginPassword: '',
  });
  const [
    formErrors, setFormErrors,
  ] = React.useState({
    registerNameError: '', registerEmailError: '', registerPasswordError: '',
  });
  const [formIsValid, setFormIsValid] = React.useState(false);
  // const [lastSubmitFormState, setLastSubmitFormState] = React.useState({});

  // debugger;
  const isSearchFormStatesEqual = isEqual(localSavedFormState, searchFormValues);

  const handleRegisterAuthFormChange = (event) => {
    const { target } = event;
    const { name } = target;
    const valueData = target.value;
    console.log('***Все нижеперечисленное происходит внутри handleRegisterAuthFormChange хука useForms***');
    console.log('registerAuthFormValues in hook useForms before any setValues');
    console.log(registerAuthFormValues);
    setRegisterAuthFormValues({ ...registerAuthFormValues, [name]: valueData });
    console.log('registerAuthFormValues in hook useForms after "setFormValues({ ...values, [name]: valueData })"');
    console.log(registerAuthFormValues);
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
      setRegisterAuthFormValues(newValues);
      setFormErrors(newErrors);
      setFormIsValid(newIsValid);
    },
    [setRegisterAuthFormValues, setFormErrors, setFormIsValid],
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
  console.log('Ниже текущие состояние стейта registerAuthFormValues внутри хука useForms:');
  console.log(registerAuthFormValues);

  return {
    searchFormValues,
    registerAuthFormValues,
    formErrors,
    formIsValid,
    isSearchFormStatesEqual,
    handleRegisterAuthFormChange,
    handleSearchFormChange,
    resetForm,
  };
}

export default useForms;
