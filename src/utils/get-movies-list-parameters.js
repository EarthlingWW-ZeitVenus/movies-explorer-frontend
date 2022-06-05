// import React from 'react';
// ToDo: можно попробовать поизголяться с этой конструкцией -
// window.matchMedia("(min-width: 768px)").matches
// https://stackoverflow.com/questions/54491645/media-query-syntax-for-reactjs

function getMoviesListParameters(windowWidth, filteredMoviesNumber) {
  let cardsInRow = 2;
  let cardsInList = 8;
  let cardsLoadedByButton = 2;
  // let cardWidth = 360;
  let marginsField = '45px 0 110px';
  let gridTemplateColumnsField = 'repeat(3, minmax(360px, 1fr))';
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
      // cardsLoadedByButton = 2;
      break;
    case (windowWidth > 480) && (windowWidth < 768):
      // cardsInRow = 2;
      cardsInList = 6;
      // cardWidth = 342;
      marginsField = '75px 0 110px';
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      gridTemplateColumnsField = 'repeat(2, fit-content(342px))';
      // cardsLoadedByButton = 2;
      break;
    case (windowWidth >= 768) && (windowWidth < 1280):
      marginsField = '65px 0 125px';
      // cardWidth = 360;
      maxClicksOnButton = countMaxClicksOnButton(cardsInList, cardsInRow);
      // cardsInRow = 2;
      // cardsInList = 8;
      // cardsLoadedByButton = 2;
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
    cardsInRow,
    cardsInList,
    cardsLoadedByButton,
    // cardWidth,
    marginsField,
    gridTemplateColumnsField,
    maxClicksOnButton,
  };
}

export default getMoviesListParameters;
