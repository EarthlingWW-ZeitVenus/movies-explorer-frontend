import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <section className="register page_format_side-padding">
      <img className="register__logo" src={logo} alt="Логотип" />
      <h2 className="register__title page_format_all-title">Добро пожаловать!</h2>
      <form className="register__form">
        <fieldset className="register__form-fieldset">
          <label className="register__form-label" htmlFor="register-name">Имя</label>
          <input
            className="register__form-input"
                name="register-name"
                placeholder="Ваше имя"
                autoComplete="off"
                type="text"
                required
              />
          <span className="register__form-input-error"></span>
          <label className="register__form-label" htmlFor="register-email">E-mail</label>
          <input
            className="register__form-input"
                name="register-email"
                placeholder="Ваша электронная почта"
                autoComplete="off"
                type="email"
                required
              />
          <span className="register__form-input-error"></span>
          <label className="register__form-label" htmlFor="register-password">Пароль</label>
          <input
            className="register__form-input"
                name="register-password"
                placeholder="Ваш пароль"
                autoComplete="off"
                type="password"
                required
              />
          <span className="register__form-input-error"></span>
        </fieldset>
        <button className="register__form-button" type="submit">Зарегистрироваться</button>
        <div className="register__form-login-container">
          <span className="register__form-span">Уже зарегистрированы?</span>
          <a className="register__form-link" href="/signin">Войти</a>
        </div>
      </form>
    </section>
  );
}

export default Register;
