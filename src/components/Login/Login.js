import './Login.css';
import logo from '../../images/logo.svg';

function Login({
  registerAuthForm,
  neededHandlers,
  serverErrorMessageText,
  onLogin,
}) {
  console.log('обращение к компоненту Login');
  const {
    registerAuthFormValues: {
      loginEmail,
      loginPassword,
    },
    formErrors: {
      loginEmailError,
      loginPasswordError,
    },
    formIsValid,
  } = registerAuthForm;
  const { handleRegisterAuthFormChange /* resetForm */ } = neededHandlers;

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
      <img className="login__logo" src={logo} alt="Логотип" />
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
                onChange={handleRegisterAuthFormChange}
                value={loginEmail}
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
                onChange={handleRegisterAuthFormChange}
                value={loginPassword}
                required
              />
          {errorTag(loginPasswordError)}
        </fieldset>
        {errorTag(serverErrorMessageText)}
        <button
          className={`login__form-button ${!formIsValid && 'login__form-button_disabled'}`}
          type="submit"
          disabled={!formIsValid}
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
