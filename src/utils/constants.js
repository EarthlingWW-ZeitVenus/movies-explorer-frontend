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
  // eslint-disable-next-line no-useless-escape
  EMAIL_PATTERN: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$',
};

const textConstants = {
  SUCCESS_PROFILE_CHANGE: 'Профиль успешно изменён!',
  SUCCESS_LOGIN: 'Вы успешно вошли!',
  SUCCESS_REGISTER: 'Вы успешно зарегистрировались!',
};

const numberConstants = {
  SHORT_FILM_MAX_DURATION: 40,

  CARDS_IN_ROW_FOR_SMALL_DEVICES_1: 1,
  CARDS_IN_ROW_FOR_MEDIUM_DEVICES: 2,
  CARDS_IN_ROW_FOR_EXTRA_LARGE_DEVICES: 3,
  CARDS_IN_LIST_FOR_SMALL_DEVICES_1: 5,
  CARDS_IN_LIST_FOR_SMALL_DEVICES_2: 7,
  CARDS_IN_LIST_FOR_MEDIUM_DEVICES: 6,
  CARDS_IN_LIST_FOR_LARGE_DEVICES: 8,
  CARDS_IN_LIST_FOR_EXTRA_LARGE_DEVICES: 12,
  CARDS_LOADED_BY_BUTTON_FOR_SMALL_DEVICES_1: 2,
  CARDS_LOADED_BY_BUTTON_FOR_SMALL_DEVICES_2: 7,
  CARDS_LOADED_BY_BUTTON_FOR_EXTRA_LARGE_DEVICES: 3,
  MARGINS_FIELDS_FOR_SMALL_DEVICES_1: '45px 0 110px',
  MARGINS_FIELDS_FOR_MEDIUM_DEVICES: '75px 0 110px',
  MARGINS_FIELDS_FOR_LARGE_DEVICES: '65px 0 125px',
  GRID_TEMPLATE_COLUMNS_FOR_SMALL_DEVICES_1: '1fr',
  GRID_TEMPLATE_COLUMNS_FOR_MEDIUM_DEVICES: 'repeat(2, fit-content(342px))',
  GRID_TEMPLATE_COLUMNS_FOR_EXTRA_LARGE_DEVICES: 'repeat(3, fit-content(360px))',
  SCREEN_RESOLUTION_FOR_SMALL_DEVICES_1: 320,
  SCREEN_RESOLUTION_FOR_SMALL_DEVICES_2: 480,
  SCREEN_RESOLUTION_FOR_MEDIUM_DEVICES: 768,
  SCREEN_RESOLUTION_FOR_LARGE_DEVICES: 1280,
};

export {
  apiConstants, localSorageConstants, regExpConstants, textConstants, numberConstants,
};
