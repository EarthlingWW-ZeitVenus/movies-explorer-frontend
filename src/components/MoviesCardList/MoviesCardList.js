import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
// import movieImage from '../../images/movie-image.jpg';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import getMoviesListParameters from '../../utils/get-movies-list-parameters';

function MoviesCardList() {
  console.log('Обращение к компоненту MoviesCardList');
  // eslint-disable-next-line no-undef
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [numberOfClicks, setNumberOfClicks] = React.useState(0);
  // debugger;
  // const { windowWidth, numberOfFindButtonClicks: numberOfClicks } = statesData;
  // const { handleMoreButtonClick } = handlers;
  const moviesCardsArray = React.useContext(CurrentDataContext);
  console.log('moviesCardsArray in MoviesCardList:');
  console.log(moviesCardsArray);
  const {
    cardsInRow,
    cardsInList,
    cardsLoadedByButton,
    marginsField,
    gridTemplateColumnsField,
    maxClicksOnButton,
  } = getMoviesListParameters(windowWidth, moviesCardsArray.length);
  console.log(`Состояние стейта windowWidth - ${windowWidth}`);
  console.log(`Состояние стейта numberOfClicks - ${numberOfClicks}`);
  console.log(`cardsInRow - ${cardsInRow}`);
  console.log(`cardsInList - ${cardsInList}`);
  console.log(`cardsLoadedByButton - ${cardsLoadedByButton}`);
  console.log(`marginsField - ${marginsField}`);
  console.log(`gridTemplateColumnsField - ${gridTemplateColumnsField}`);
  console.log(`maxClicksOnButton - ${maxClicksOnButton}`);

  // const numberOfFilteredCards = moviesCardsArray.length;
  // const maxClicksOnMoreButton = Math.ceil(
  //   (moviesCardsArray.length - cardsInList) / cardsInRow,
  // );

  // console.log(`maxClicksOnMoreButton - ${maxClicksOnMoreButton}`);

  const moviesCardsToDisplay = moviesCardsArray
    .filter(
      (movieCard, index) => (index) < (cardsInList + numberOfClicks * cardsLoadedByButton),
    );

  console.log('moviesCardsArray:');
  console.log(moviesCardsArray);
  console.log('moviesCardsToDisplay:');
  console.log(moviesCardsToDisplay);

  const cssMoviesCardListRowsAndColumns = {
    listStyleType: 'none',
    padding: '0',
    margin: String(marginsField),
    display: 'grid',
    gridTemplateColumns: String(gridTemplateColumnsField),
    gap: '28px',
  };

  const handleChangeWindowWidth = () => {
    debugger;
    console.log('Сработал код внутри метода handleChangeWindowWidth');
    // eslint-disable-next-line no-undef
    setWindowWidth(window.innerWidth);
    setNumberOfClicks(0);
  };

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
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', () => setTimeout(() => {
      console.log('Сработал вызов колбека на событие resize по таймауту');
      handleChangeWindowWidth();
    }, 3000));
    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener('resize', () => setTimeout(() => {
        console.log('Сработал вызов колбека на событие resize по таймауту');
        handleChangeWindowWidth();
      }, 3000));
    };
  }, []);

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
      && <button className="movies-card-list__button" onClick={handleMoreButtonClick}>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
