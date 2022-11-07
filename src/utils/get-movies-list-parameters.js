// import React from 'react';
// ToDo: можно попробовать поизголяться с этой конструкцией -
// window.matchMedia("(min-width: 768px)").matches
// https://stackoverflow.com/questions/54491645/media-query-syntax-for-reactjs

function getMoviesListParameters(windowWidth, filteredMoviesNumber) {
  let cardsInRow = 2;
  let cardsInList = 8;
  let cardsLoadedByButton = 2;
  let marginsField = '45px 0 110px';
  let gridTemplateColumnsField = 'repeat(3, fit-content(360px))';
  let maxClicksOnButton;

  const countMaxClicksOnButton = (cardsInListNumber, cardsInRowNumber) => (
    Math.ceil((filteredMoviesNumber - cardsInListNumber) / cardsInRowNumber)
  );

  switch (true) {
    case (windowWidth >= 320) && (windowWidth <= 480):
      cardsInRow = 1;
      cardsInList = 5;
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      gridTemplateColumnsField = '1fr';
      break;
    case (windowWidth > 480) && (windowWidth < 768):
      cardsInList = 6;
      marginsField = '75px 0 110px';
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      gridTemplateColumnsField = 'repeat(2, fit-content(342px))';
      break;
    case (windowWidth >= 768) && (windowWidth < 1280):
      marginsField = '65px 0 125px';
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      gridTemplateColumnsField = 'repeat(2, fit-content(342px))';
      break;
    case (windowWidth >= 1280):
      cardsInRow = 3;
      cardsInList = 12;
      cardsLoadedByButton = 3;
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      break;
    default:
      cardsInRow = 1;
      cardsInList = 7;
      cardsLoadedByButton = 7;
      marginsField = '45px 0 110px';
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      gridTemplateColumnsField = '1fr';
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
