import { numberConstants } from './constants';
// import React from 'react';
// ToDo: можно попробовать поизголяться с этой конструкцией -
// window.matchMedia("(min-width: 768px)").matches
// https://stackoverflow.com/questions/54491645/media-query-syntax-for-reactjs

function getMoviesListParameters(windowWidth, filteredMoviesNumber) {
  const {
    CARDS_IN_ROW_FOR_SMALL_DEVICES_1,
    CARDS_IN_ROW_FOR_MEDIUM_DEVICES,
    CARDS_IN_ROW_FOR_EXTRA_LARGE_DEVICES,
    CARDS_IN_LIST_FOR_SMALL_DEVICES_1,
    CARDS_IN_LIST_FOR_SMALL_DEVICES_2,
    CARDS_IN_LIST_FOR_MEDIUM_DEVICES,
    CARDS_IN_LIST_FOR_LARGE_DEVICES,
    CARDS_IN_LIST_FOR_EXTRA_LARGE_DEVICES,
    CARDS_LOADED_BY_BUTTON_FOR_SMALL_DEVICES_1,
    CARDS_LOADED_BY_BUTTON_FOR_SMALL_DEVICES_2,
    CARDS_LOADED_BY_BUTTON_FOR_EXTRA_LARGE_DEVICES,
    MARGINS_FIELDS_FOR_SMALL_DEVICES_1,
    MARGINS_FIELDS_FOR_MEDIUM_DEVICES,
    MARGINS_FIELDS_FOR_LARGE_DEVICES,
    GRID_TEMPLATE_COLUMNS_FOR_SMALL_DEVICES_1,
    GRID_TEMPLATE_COLUMNS_FOR_MEDIUM_DEVICES,
    GRID_TEMPLATE_COLUMNS_FOR_EXTRA_LARGE_DEVICES,
    SCREEN_RESOLUTION_FOR_SMALL_DEVICES_1,
    SCREEN_RESOLUTION_FOR_SMALL_DEVICES_2,
    SCREEN_RESOLUTION_FOR_MEDIUM_DEVICES,
    SCREEN_RESOLUTION_FOR_LARGE_DEVICES,
  } = numberConstants;

  let cardsInRow = CARDS_IN_ROW_FOR_MEDIUM_DEVICES;
  let cardsInList = CARDS_IN_LIST_FOR_LARGE_DEVICES;
  let cardsLoadedByButton = CARDS_LOADED_BY_BUTTON_FOR_SMALL_DEVICES_1;
  let marginsField = MARGINS_FIELDS_FOR_SMALL_DEVICES_1;
  let gridTemplateColumnsField = GRID_TEMPLATE_COLUMNS_FOR_EXTRA_LARGE_DEVICES;
  let maxClicksOnButton;

  const countMaxClicksOnButton = (cardsInListNumber, cardsInRowNumber) => (
    Math.ceil((filteredMoviesNumber - cardsInListNumber) / cardsInRowNumber)
  );

  switch (true) {
    case (windowWidth >= SCREEN_RESOLUTION_FOR_SMALL_DEVICES_1)
    && (windowWidth <= SCREEN_RESOLUTION_FOR_SMALL_DEVICES_2): // small 1
      cardsInRow = CARDS_IN_ROW_FOR_SMALL_DEVICES_1;
      cardsInList = CARDS_IN_LIST_FOR_SMALL_DEVICES_1;
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      gridTemplateColumnsField = GRID_TEMPLATE_COLUMNS_FOR_SMALL_DEVICES_1;
      break;
    case (windowWidth > SCREEN_RESOLUTION_FOR_SMALL_DEVICES_2)
    && (windowWidth < SCREEN_RESOLUTION_FOR_MEDIUM_DEVICES): // medium
      cardsInList = CARDS_IN_LIST_FOR_MEDIUM_DEVICES;
      marginsField = MARGINS_FIELDS_FOR_MEDIUM_DEVICES;
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      gridTemplateColumnsField = GRID_TEMPLATE_COLUMNS_FOR_MEDIUM_DEVICES;
      break;
    case (windowWidth >= SCREEN_RESOLUTION_FOR_MEDIUM_DEVICES)
    && (windowWidth < SCREEN_RESOLUTION_FOR_LARGE_DEVICES): // large
      marginsField = MARGINS_FIELDS_FOR_LARGE_DEVICES;
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      gridTemplateColumnsField = GRID_TEMPLATE_COLUMNS_FOR_MEDIUM_DEVICES;
      break;
    case (windowWidth >= SCREEN_RESOLUTION_FOR_LARGE_DEVICES): // extra large
      cardsInRow = CARDS_IN_ROW_FOR_EXTRA_LARGE_DEVICES;
      cardsInList = CARDS_IN_LIST_FOR_EXTRA_LARGE_DEVICES;
      cardsLoadedByButton = CARDS_LOADED_BY_BUTTON_FOR_EXTRA_LARGE_DEVICES;
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      break;
    default: // small 2
      cardsInRow = CARDS_IN_ROW_FOR_SMALL_DEVICES_1;
      cardsInList = CARDS_IN_LIST_FOR_SMALL_DEVICES_2;
      cardsLoadedByButton = CARDS_LOADED_BY_BUTTON_FOR_SMALL_DEVICES_2;
      marginsField = MARGINS_FIELDS_FOR_SMALL_DEVICES_1;
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      gridTemplateColumnsField = GRID_TEMPLATE_COLUMNS_FOR_SMALL_DEVICES_1;
  }

  return {
    cardsInList,
    cardsLoadedByButton,
    marginsField,
    gridTemplateColumnsField,
    maxClicksOnButton,
  };
}

export default getMoviesListParameters;
