import React from 'react';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ onSignOut }) {
  console.log('обращение к компоненту Profile');
  const currentUser = React.useContext(CurrentUserContext);
  // const allContext = React.useContext(CurrentDataContext);
  // const currentUser = React.useContext(CurrentUserContext);
  console.log('Контекст текущего пользователя currentUser внутри Profile:');
  console.log(currentUser);
  // console.log('Весь контекст:');
  // console.log(allContext);

  return (
    <main className="content page_format_side-padding">
      <section className="profile">
        <h2 className="profile__title page_format_all-title">
          {`Привет, ${currentUser.name ? currentUser.name : 'незнакомец!'}`}
        </h2>
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
                defaultValue={currentUser.name ? currentUser.name : 'незнакомец'}
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
                defaultValue={currentUser.email ? currentUser.email : 'pochta@neznacomec.ru'}
              />
              <span className="profile__form-input-error"></span>
            </div>
          </fieldset>
          <div className="profile__form-buttons-container">
            <button
              className="profile__form-button profile__form-button_disabled"
              type="button">
                Редактировать
            </button>
            <button
              className="profile__form-button"
              type="button"
              onClick={onSignOut}>
                Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Profile;
