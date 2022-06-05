/* eslint-disable react/display-name */
import React, { useCallback } from 'react';

// хук управления всеми формами и их валидацией
function useForms() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  // const [valueToForceUpdate, setValueToForceUpdate] = React.useState(0);

  // forceUpdate hook
  // function useForceUpdate() {
  // update the state to force render
  // return () => setValueToForceUpdate(() => valueToForceUpdate + 1);
  // }

  const handleChange = (event) => {
    const { target } = event;
    // console.log(target);
    const { name } = target;
    const valueData = target.type === 'checkbox' ? target.checked : target.value;
    // let stateObject = values;
    console.log('***Все нижеперечисленное происходит внутри handleChange хука useForms***');
    console.log('values in hook useForms before any setValues');
    console.log(values);
    // let counter = 0;
    // counter += 1;
    // let varObject = {};
    // varObject = { ...stateObject, [name]: valueData };
    // if (counter !== 1) {
    //   const stateObject = {};
    // } else {
    //   let stateObject = { ...varObject, [name]: valueData };
    // }
    // const emptyObject = {};
    // const valueObject = { ...emptyObject, [name]: valueData };
    // const finalObject = (Object.keys(valueObject).length !== 0) ? valueObject : emptyObject;
    // const stateObject = { ...finalObject, [name]: valueData };
    // stateObject = (Object.keys(tempObject).length !== 0) && tempObject;
    // const stateObject = { ...values, [name]: valueData };
    setValues({ ...values, [name]: valueData });
    console.log('values in hook useForms after "setValues({ ...values, [name]: valueData })"');
    console.log(values);
    setErrors({ ...errors, [`${name}Error`]: target.validationMessage });
    console.log('errors in hook useForms after "setErrors({ ...errors, [name]: target.validationMessage })"');
    console.log(errors);
    setIsValid(target.closest('form').checkValidity());
    console.log('isValid in hook useForms after "setIsValid(target.closest("form").checkValidity())"');
    console.log(isValid);
    // useForceUpdate();
    // console.log('values in hook useForms after "useForceUpdate()"');
    // console.log(values);
    // setValues({...values, [name]: valueData });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  // const { isBurgerMenu } = values;
  console.log('***Все нижеперечисленное происходит после какого-либо обращения к хуку useForms***');
  console.log('Ниже текущие состояние стейта values внутри хука useForms:');
  console.log(values);

  // console.log('Ниже текущие состояние поля isBurgerMenu внутри объекта-стейта values:');
  // console.log(isBurgerMenu);

  return {
    values, errors, isValid, handleChange, resetForm,
  };
}

export default useForms;
