// import React from 'react';
// import useForms from '../../utils/use-forms';
import './Register.css';
import logo from '../../images/logo.svg';

function Register({
  registerAuthProfileForm,
  neededHandlers,
  embeddedMessageText,
  onRegister,
}) {
  // const [serverErrorMessageText, setServerErrorMessageText] = React.useState('');
  const {
    registerAuthProfileFormValues: {
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
  } = registerAuthProfileForm;
  const { handleRegisterAuthProfileFormChange } = neededHandlers;
  console.log('обращение к компоненту Register');
  console.log(`registerNameError in Register - ${registerNameError}`);
  console.log(`registerEmailError in Register - ${registerEmailError}`);
  console.log(`registerPasswordError in Register - ${registerPasswordError}`);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(registerName, registerEmail, registerPassword);
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
            onChange={handleRegisterAuthProfileFormChange}
            value={registerName}
            pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
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
            onChange={handleRegisterAuthProfileFormChange}
            value={registerEmail}
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
            onChange={handleRegisterAuthProfileFormChange}
            value={registerPassword}
            required
          />
          {errorTag(registerPasswordError)}
        </fieldset>
        {errorTag(embeddedMessageText)}
        <button
          className={`register__form-button ${!formIsValid && 'register__form-button_disabled'}`}
          type="submit"
          disabled={!formIsValid}
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
