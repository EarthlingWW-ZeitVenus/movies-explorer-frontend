import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import getMoviesListParameters from '../../utils/get-movies-list-parameters';

function MoviesCardList({
  moviesArray,
  onOwnMovie,
  isSavedMoviesCase,
}) {
  console.log('Обращение к компоненту MoviesCardList');
  // eslint-disable-next-line no-undef
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [numberOfClicks, setNumberOfClicks] = React.useState(0);

  console.log('moviesArray in MoviesCardList:');
  console.log(moviesArray);

  const cardsInList = !isSavedMoviesCase
    && getMoviesListParameters(windowWidth, moviesArray.length).cardsInList;
  const cardsLoadedByButton = !isSavedMoviesCase
    && getMoviesListParameters(windowWidth, moviesArray.length).cardsLoadedByButton;
  const {
    marginsField,
    gridTemplateColumnsField,
  } = getMoviesListParameters(windowWidth, moviesArray.length);
  const maxClicksOnButton = !isSavedMoviesCase
    && getMoviesListParameters(windowWidth, moviesArray.length).maxClicksOnButton;
  // console.log(`Состояние стейта windowWidth - ${windowWidth}`);
  // console.log(`Состояние стейта numberOfClicks - ${numberOfClicks}`);
  // console.log(`cardsInRow - ${cardsInRow}`);
  // console.log(`cardsInList - ${cardsInList}`);
  // console.log(`cardsLoadedByButton - ${cardsLoadedByButton}`);
  // console.log(`marginsField - ${marginsField}`);
  // console.log(`gridTemplateColumnsField - ${gridTemplateColumnsField}`);
  // console.log(`maxClicksOnButton - ${maxClicksOnButton}`);

  const moviesCardsToDisplay = isSavedMoviesCase ? moviesArray : moviesArray
    .filter(
      (movieCard, index) => (index) < (cardsInList + numberOfClicks * cardsLoadedByButton),
    );

  // console.log('moviesArray:');
  // console.log(moviesArray);
  // console.log('moviesCardsToDisplay:');
  // console.log(moviesCardsToDisplay);

  const cssMoviesCardListRowsAndColumns = {
    listStyleType: 'none',
    padding: '0',
    margin: String(marginsField),
    display: 'grid',
    gridTemplateColumns: String(gridTemplateColumnsField),
    gap: '28px',
    justifyContent: 'space-evenly',
    alignContent: 'space-evenly',
  };

  const handleChangeWindowWidth = React.useCallback(
    () => {
      console.log('Сработал код внутри метода handleChangeWindowWidth');
      // eslint-disable-next-line no-undef
      setWindowWidth(window.innerWidth);
      setNumberOfClicks(0);
    },
    [setWindowWidth, setNumberOfClicks],
  );

  const handleMoreButtonClick = () => {
    debugger;
    setNumberOfClicks((state) => state + 1);
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

  React.useEffect(() => {
    console.log('Обращение к useEffect для события "resize", установка слушателей');
    // window.addEventListener('resize', () => setTimeout(() => {
    //   console.log('Сработал вызов колбека на событие resize по таймауту');
    //   handleChangeWindowWidth();
    // }, 100));
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', handleChangeWindowWidth);
    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener('resize', handleChangeWindowWidth);
    };
  }, [handleChangeWindowWidth]);

  return (
    <section className="movies-card-list">
      <ul style={cssMoviesCardListRowsAndColumns}>
        {moviesCardsToDisplay.map((movieCardItem) => <MoviesCard
            key={ movieCardItem.id || movieCardItem.movieId }
            movieInfoObject={movieCardItem}
            onOwnMovie={onOwnMovie}
            isSavedMoviesCase={isSavedMoviesCase}
          />)
        }
      </ul>
      {!isSavedMoviesCase && (numberOfClicks < maxClicksOnButton)
      && <button className="movies-card-list__button" onClick={handleMoreButtonClick}>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
