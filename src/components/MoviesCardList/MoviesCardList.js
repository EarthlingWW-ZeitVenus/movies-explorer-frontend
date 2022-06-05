/* eslint-disable no-undef */
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
// import movieImage from '../../images/movie-image.jpg';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import getMoviesListParameters from '../../utils/get-movies-list-parameters';

function MoviesCardList() {
  console.log('Обращение к компоненту MoviesCardList');
  // debugger;
  // const { isUseSaveLocal } = statesData;
  const resultingMoviesCardsArray = React.useContext(CurrentDataContext);
  // const resultingMoviesCardsArray = isUseSaveLocal ? savedMoviesArray : filteredMoviesCards;
  console.log('resultingMoviesCardsArray in MoviesCardList:');
  console.log(resultingMoviesCardsArray);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [numberOfClicks, setNumberOfClicks] = React.useState(0);
  const {
    cardsInRow,
    cardsInList,
    cardsLoadedByButton,
    // cardWidth,
    marginsField,
    gridTemplateColumnsField,
    maxClicksOnButton,
  } = getMoviesListParameters(windowWidth, resultingMoviesCardsArray.length);
  // console.log(`filteredMoviesCards in MoviesCardList - ${filteredMoviesCards}`);
  // console.log(`savedMoviesArray in MoviesCardList - ${savedMoviesArray}`);
  // const { rowsInArray } = functions;
  console.log(`Состояние стейта windowWidth - ${windowWidth}`);
  console.log(`Состояние стейта numberOfClicks - ${numberOfClicks}`);
  console.log(`cardsInRow - ${cardsInRow}`);
  console.log(`cardsInList - ${cardsInList}`);
  console.log(`cardsLoadedByButton - ${cardsLoadedByButton}`);
  // console.log(`cardWidth - ${cardWidth}`);
  console.log(`marginsField - ${marginsField}`);
  console.log(`gridTemplateColumnsField - ${gridTemplateColumnsField}`);
  console.log(`maxClicksOnButton - ${maxClicksOnButton}`);

  // const numberOfFilteredCards = resultingMoviesCardsArray.length;
  // const maxClicksOnMoreButton = Math.ceil(
  //   (resultingMoviesCardsArray.length - cardsInList) / cardsInRow,
  // );

  // console.log(`maxClicksOnMoreButton - ${maxClicksOnMoreButton}`);

  const moviesCardsToDisplay = resultingMoviesCardsArray
    .filter(
      (movieCard, index) => (index) < (cardsInList + numberOfClicks * cardsLoadedByButton),
    );

  console.log('resultingMoviesCardsArray:');
  console.log(resultingMoviesCardsArray);
  console.log('moviesCardsToDisplay:');
  console.log(moviesCardsToDisplay);

  const cssMoviesCardListRowsAndColumns = {
    listStyleType: 'none',
    padding: '0',
    margin: String(marginsField),
    display: 'grid',
    // gridTemplateColumns: 'repeat(3, minmax(360px, 1fr))',
    gridTemplateColumns: String(gridTemplateColumnsField),
    gap: '28px',
  };

  // const moreButton = Styled.button`
  //   display: block;
  //   margin: 0 auto;
  //   background: #F9F9F9;
  //   cursor: pointer;
  //   width: 100%;
  //   border: none;
  //   font-style: normal;
  //   font-weight: 500;
  //   font-size: 15px;
  //   lines-height: 1.2;
  // `;

  const handleChangeWindowWidth = () => {
    // debugger;
    setWindowWidth(window.innerWidth);
    setNumberOfClicks(0);
  };

  const handleButtonClick = () => {
    debugger;
    setNumberOfClicks((state) => state + 1);
  };

  React.useEffect(() => {
    console.log('Сработал useEffect на событии "resize"');
    window.addEventListener('resize', handleChangeWindowWidth);
    return () => {
      window.removeEventListener('resize', handleChangeWindowWidth);
    };
  }, [handleChangeWindowWidth]);

  return (
    <section className="movies-card-list">
      <ul style={cssMoviesCardListRowsAndColumns}>
        {moviesCardsToDisplay.map((movieCardItem) => <MoviesCard
            key={movieCardItem.id}
            title={movieCardItem.nameRU}
            duration={movieCardItem.duration}
            image={movieCardItem.image.url}
            trailer={movieCardItem.trailerLink}
          />)
        }
      </ul>
      {(numberOfClicks < maxClicksOnButton)
      && <button className="movies-card-list__button" onClick={handleButtonClick}>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
