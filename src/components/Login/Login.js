import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { regExpConstants } from '../../utils/constants';

const { EMAIL_PATTERN } = regExpConstants;

function Login({
  isProcessing,
  loginForm,
  neededHandlers,
  serverErrorMessageText,
  onLogin,
}) {
  console.log('обращение к компоненту Login');
  const {
    loginValues: {
      loginEmail,
      loginPassword,
    },
    formErrors: {
      loginEmailError,
      loginPasswordError,
    },
    formIsValid,
  } = loginForm;
  const { handleLoginFormChange /* resetForm */ } = neededHandlers;

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(loginEmail, loginPassword);
  }

  const errorTag = (errorText) => (
    <p className = "login__form-input-error">
      {errorText}
    </p>);

  return (
    <section className="login page_format_side-padding">
      <Link className="login__logo-link" to="/"><img className="login__logo" src={logo} alt="Логотип" /></Link>
      <h2 className="login__title page_format_all-title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="login__form-fieldset">
          <label className="login__form-label" htmlFor="loginEmail">E-mail</label>
          <input
            className="login__form-input"
                name="loginEmail"
                placeholder="Ваша электронная почта"
                autoComplete="off"
                type="email"
                onChange={handleLoginFormChange}
                value={loginEmail}
                pattern={EMAIL_PATTERN}
                disabled={isProcessing}
                required
              />
          {errorTag(loginEmailError)}
          <label className="login__form-label" htmlFor="loginPassword">Пароль</label>
          <input
            className="login__form-input"
                name="loginPassword"
                placeholder="Ваш пароль"
                autoComplete="off"
                type="password"
                minLength={4}
                onChange={handleLoginFormChange}
                value={loginPassword}
                disabled={isProcessing}
                required
              />
          {errorTag(loginPasswordError)}
        </fieldset>
        {errorTag(serverErrorMessageText)}
        <button
          className={`login__form-button ${(!formIsValid || isProcessing) && 'login__form-button_disabled'}`}
          type="submit"
          disabled={!formIsValid || isProcessing}
        >
          Войти
        </button>
        <div className="login__form-register-container">
          <span className="login__form-span">Ещё не зарегистрированы?</span>
          <a className="login__form-link" href="/signup">Регистрация</a>
        </div>
      </form>
    </section>
  );
}

export default Login;
