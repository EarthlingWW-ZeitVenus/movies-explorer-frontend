// import React from 'react';
// import useForms from '../../utils/use-forms';
import './Register.css';
import logo from '../../images/logo.svg';
import { regExpConstants } from '../../utils/constants';

const { NAME_PATTERN } = regExpConstants;

function Register({
  registerForm,
  neededHandlers,
  embeddedMessageText,
  onRegister,
  isProcessing,
}) {
  // const [serverErrorMessageText, setServerErrorMessageText] = React.useState('');
  const {
    registerValues: {
      registerName,
      registerEmail,
      registerPassword,
    },
    formErrors: {
      registerNameError,
      registerEmailError,
      registerPasswordError,
    },
    formIsValid,
  } = registerForm;
  const { handleRegisterFormChange, handleSetIsProcessing } = neededHandlers;
  console.log('обращение к компоненту Register');
  console.log(`registerNameError in Register - ${registerNameError}`);
  console.log(`registerEmailError in Register - ${registerEmailError}`);
  console.log(`registerPasswordError in Register - ${registerPasswordError}`);

  function handleSubmit(evt) {
    handleSetIsProcessing(true);
    evt.preventDefault();
    onRegister(registerName, registerEmail, registerPassword);
    handleSetIsProcessing(false);
  }

  const errorTag = (errorText) => (
    <p className = "register__form-input-error">
      {errorText}
    </p>);

  return (
    <section className="register page_format_side-padding">
      <img className="register__logo" src={logo} alt="Логотип" />
      <h2 className="register__title page_format_all-title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="register__form-fieldset">
          <label className="register__form-label" htmlFor="registerName">Имя</label>
          <input
            className="register__form-input"
            name="registerName"
            placeholder="Ваше имя"
            autoComplete="off"
            type="text"
            onChange={handleRegisterFormChange}
            value={registerName}
            pattern={String(NAME_PATTERN)}
            disabled={isProcessing}
            required
          />
          {errorTag(registerNameError)}
          <label className="register__form-label" htmlFor="registerEmail">E-mail</label>
          <input
            className="register__form-input"
            name="registerEmail"
            placeholder="Ваша электронная почта"
            autoComplete="off"
            type="email"
            onChange={handleRegisterFormChange}
            value={registerEmail}
            disabled={isProcessing}
            required
          />
          {errorTag(registerEmailError)}
          <label className="register__form-label" htmlFor="registerPassword">Пароль</label>
          <input
            className="register__form-input"
            name="registerPassword"
            placeholder="Ваш пароль"
            autoComplete="off"
            type="password"
            minLength={4}
            onChange={handleRegisterFormChange}
            value={registerPassword}
            disabled={isProcessing}
            required
          />
          {errorTag(registerPasswordError)}
        </fieldset>
        {errorTag(embeddedMessageText)}
        <button
          className={`register__form-button ${(!formIsValid || isProcessing) && 'register__form-button_disabled'}`}
          type="submit"
          disabled={!formIsValid || isProcessing}
        >
          Зарегистрироваться
        </button>
        <div className="register__form-login-container">
          <span className="register__form-span">Уже зарегистрированы?</span>
          <a className="register__form-link" href="/signin">Войти</a>
        </div>
      </form>
    </section>
  );
}

export default Register;
