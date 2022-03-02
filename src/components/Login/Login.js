import './Login.css';
import logo from '../../images/logo.svg';

function Login() {
  return (
    <section className="login page_format_side-padding">
      <img className="login__logo" src={logo} alt="Логотип" />
      <h2 className="login__title page_format_all-title">Рады видеть!</h2>
      <form className="login__form">
        <fieldset className="login__form-fieldset">
          <label className="login__form-label" htmlFor="login-email">E-mail</label>
          <input
            className="login__form-input"
                name="login-email"
                placeholder="Ваша электронная почта"
                autoComplete="off"
                type="email"
                required
              />
          <span className="login__form-input-error"></span>
          <label className="login__form-label" htmlFor="login-password">Пароль</label>
          <input
            className="login__form-input"
                name="login-password"
                placeholder="Ваш пароль"
                autoComplete="off"
                type="password"
                required
              />
          <span className="login__form-input-error"></span>
        </fieldset>
        <button className="login__form-button" type="submit">Войти</button>
        <div className="login__form-login-container">
          <span className="login__form-span">Ещё не зарегистрированы?</span>
          <a className="login__form-link" href="/signup">Регистрация</a>
        </div>
      </form>
    </section>
  );
}

export default Login;
