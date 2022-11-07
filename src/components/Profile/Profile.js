// import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { regExpConstants } from '../../utils/constants';
// import CurrentUserContext from '../../contexts/CurrentUserContext';
const { NAME_PATTERN } = regExpConstants;

function Profile({
  onSignOut, neededHandlers, profileForm, onProfileChange, onBurgerMenu, isProcessing,
}) {
  console.log('обращение к компоненту Profile');
  const {
    profileValues: {
      profileName,
      profileEmail,
    },
    formErrors: {
      profileNameError,
      profileEmailError,
    },
    formIsValid,
    isProfileValuesEqual,
  } = profileForm;
  const { handleProfileFormChange, handleSetIsProcessing /* resetForm */ } = neededHandlers;
  // const currentUser = React.useContext(CurrentUserContext);
  // const allContext = React.useContext(CurrentDataContext);
  console.log('Данные текущего пользователя currentUser внутри Profile:');
  // console.log(currentUser);
  console.log('profileForm:');
  console.log(profileForm);
  console.log(`profileName - ${profileName}`);
  console.log(`profileEmail - ${profileEmail}`);
  console.log(`isProfileValuesEqual - ${isProfileValuesEqual}`);
  // console.log('Весь контекст:');
  // console.log(allContext);

  function handleSubmit(evt) {
    handleSetIsProcessing(true);
    evt.preventDefault();
    onProfileChange(profileEmail, profileName);
    handleSetIsProcessing(false);
  }

  const errorTag = (errorText) => (
    <p className = "profile__form-input-error">
      {errorText}
    </p>);

  return (
    <>
      <Header onBurgerMenu={onBurgerMenu} />
      <main className="content page_format_side-padding">
        <section className="profile">
          <h2 className="profile__title page_format_all-title">
            {`Привет, ${profileName}!`}
          </h2>
          <form className="profile__form" onSubmit={handleSubmit} noValidate>
            <fieldset className="profile__form-fieldset">
              <div className="profile__form-container">
                <label className="profile__form-label" htmlFor="profile-name">Имя</label>
                <input
                  className="profile__form-input"
                  name="profileName"
                  placeholder="Ваше имя"
                  autoComplete="off"
                  type="text"
                  value={profileName}
                  // defaultValue={currentUser.name}
                  pattern={NAME_PATTERN}
                  onChange={handleProfileFormChange}
                  disabled={isProcessing}
                  required />
              </div>
              {errorTag(profileNameError)}
              <div className="profile__dividing-line" />
              <div className="profile__form-container">
                <label className="profile__form-label" htmlFor="profile-email">E-mail</label>
                <input
                  className="profile__form-input"
                  name="profileEmail"
                  placeholder="Ваша электронная почта"
                  autoComplete="off"
                  type="email"
                  value={profileEmail}
                  onChange={handleProfileFormChange}
                  disabled={isProcessing}
                  required />
              </div>
              {errorTag(profileEmailError)}
            </fieldset>
            <div className="profile__form-buttons-container">
              <button
                className={`profile__form-button
                  ${(!formIsValid || isProfileValuesEqual || isProcessing)
                    && 'profile__form-button_disabled'}`}
                type="submit"
                disabled={!formIsValid || isProfileValuesEqual || isProcessing}>
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
    </>
  );
}

export default Profile;
