const apiConstants = {
  MAIN_URL: 'https://movie-explorer.api.nomoredomains.rocks',
  MOVIES_URL: 'https://api.nomoreparties.co/beatfilm-movies',
};

const localSorageConstants = {
  KEY_FOR_MOVIES_ARRAY: 'SAVED_MOVIES_ARRAY',
  KEY_FOR_FORM: 'SAVED_FORM_STATE',
  KEY_FOR_OWNED_MOVIES_ARRAY: 'SAVED_OWNED_MOVIES_ARRAY',
};

const regExpConstants = {
  // eslint-disable-next-line no-useless-escape
  NAME_PATTERN: '^[A-Za-zА-Яа-яЁё\\s\\-]+$',
};

const textConstants = {
  SUCCESS_PROFILE_CHANGE: 'Профиль успешно изменён!',
  SUCCESS_LOGIN: 'Вы успешно вошли!',
  SUCCESS_REGISTER: 'Вы успешно зарегистрировались!',
};

const numberConstants = {
  SHORT_FILM_MAX_DURATION: 40,
};

export {
  apiConstants, localSorageConstants, regExpConstants, textConstants, numberConstants,
};
