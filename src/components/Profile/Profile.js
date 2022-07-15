import React from 'react';
import { logout } from '../../utils/MainApi';
import './Profile.css';
// import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ currentUserProp }) {
  console.log('обращение к компоненту Profile');
  const [serverMessageText, setServerMessageText] = React.useState('');
  // const allContext = React.useContext(CurrentDataContext);
  // const currentUser = React.useContext(CurrentUserContext);
  console.log('Контекст текущего пользователя currentUserProp внутри Profile:');
  console.log(currentUserProp);
  // console.log('Весь контекст:');
  // console.log(allContext);

  function handleLogout() {
    logout()
      .then((res) => {
        console.log(res);
        setServerMessageText(res);
      });
  }

  return (
    <main className="content page_format_side-padding">
      <section className="profile">
        <h2 className="profile__title page_format_all-title">Привет, Виталий!</h2>
        <form className="profile__form">
          <fieldset className="profile__form-fieldset">
            <div className="profile__form-container profile__form-container_bottom-line">
              <label className="profile__form-label" htmlFor="profile-name">Имя</label>
              <input
                className="profile__form-input"
                name="profile-name"
                placeholder="Ваше имя"
                autoComplete="off"
                type="text"
              />
              <span className="profile__form-input-error"></span>
            </div>
            <div className="profile__form-container">
              <label className="profile__form-label" htmlFor="profile-email">E-mail</label>
              <input
                className="profile__form-input"
                name="profile-email"
                placeholder="Ваша электронная почта"
                autoComplete="off"
                type="email"
              />
              <span className="profile__form-input-error"></span>
            </div>
          </fieldset>
          <p>{serverMessageText}</p>
          <div className="profile__form-buttons-container">
            <button
              className="profile__form-button profile__form-button_disabled"
              type="button">
                Редактировать
            </button>
            <button
              className="profile__form-button"
              type="button"
              onClick={handleLogout}>
                Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Profile;
