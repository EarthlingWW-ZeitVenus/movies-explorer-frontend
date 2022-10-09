// import React from 'react';
import './Profile.css';
// import CurrentUserContext from '../../contexts/CurrentUserContext';

// В контекст засунуть registerAuthProfileForm
function Profile({
  onSignOut, neededHandlers, registerAuthProfileForm, onProfileChange,
}) {
  console.log('обращение к компоненту Profile');
  const {
    registerAuthProfileFormValues: {
      profileName,
      profileEmail,
    },
    formErrors: {
      profileNameError,
      profileEmailError,
    },
    formIsValid,
  } = registerAuthProfileForm;
  const { handleRegisterAuthProfileFormChange /* resetForm */ } = neededHandlers;
  // const currentUser = React.useContext(CurrentUserContext);
  // const allContext = React.useContext(CurrentDataContext);
  // const currentUser = React.useContext(CurrentUserContext);
  console.log('Данные текущего пользователя currentUser внутри Profile:');
  console.log('registerAuthProfileForm:');
  console.log(registerAuthProfileForm);
  console.log(`profileName - ${profileName}`);
  console.log(`profileEmail - ${profileEmail}`);
  // console.log('Весь контекст:');
  // console.log(allContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onProfileChange(profileEmail, profileName);
  }

  const errorTag = (errorText) => (
    <p className = "profile__form-input-error">
      {errorText}
    </p>);

  return (
    <main className="content page_format_side-padding">
      <section className="profile">
        <h2 className="profile__title page_format_all-title">
          {`Привет, ${profileName || 'незнакомец!'}`}
        </h2>
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <fieldset className="profile__form-fieldset">
            <div className="profile__form-container profile__form-container_bottom-line">
              <label className="profile__form-label" htmlFor="profile-name">Имя</label>
              <input
                className="profile__form-input"
                name="profileName"
                placeholder="Ваше имя"
                autoComplete="off"
                type="text"
                value={profileName || 'незнакомец'}
                pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
                onChange={handleRegisterAuthProfileFormChange}
                required
              />
              {errorTag(profileNameError)}
            </div>
            <div className="profile__form-container">
              <label className="profile__form-label" htmlFor="profile-email">E-mail</label>
              <input
                className="profile__form-input"
                name="profileEmail"
                placeholder="Ваша электронная почта"
                autoComplete="off"
                type="email"
                value={profileEmail || 'pochta@neznacomec.ru'}
                onChange={handleRegisterAuthProfileFormChange}
                required
              />
              {errorTag(profileEmailError)}
            </div>
          </fieldset>
          <div className="profile__form-buttons-container">
            <button
              className={`profile__form-button ${!formIsValid && 'profile__form-button_disabled'}`}
              type="submit"
              disabled={!formIsValid}>
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
