import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CurrentDataContext from '../../contexts/CurrentDataContext';
// import CurrentFunctionsContext from '../../contexts/CurrentFunctionsContext';
// import useAllSimpleStates from '../../utils/use-simple-states';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import BurgerMenuRollup from '../BurgerMenuRollup/BurgerMenuRollup';
// import getMoviesCards from '../../utils/MoviesApi';

function App() {
  console.log('обращение к компоненту App');

  // const { values, closeAllOpened } = useAllSimpleStates();
  // console.log('Внутрь App из хука передан такой объект values:');
  // console.log(values);
  const [isBurgerMenuRollupOpen, setIsBurgerMenuRollupOpen] = React.useState(false);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  // const [isShortFilm, setIsShortFilm] = React.useState(false);
  // const [moviesString, setMoviesString] = React.useState('');
  const [filteredMoviesCards, setFilteredMoviesCards] = React.useState([]);
  // const [allFormsStates, setAllFormsStates] = React.useState({});
  // const [allSimpleStates, setAllSimpleStates] = React.useState({});

  // const [allData, setAllData] = React.useState(null);

  // const handleSetAllFormsStates = (event) => {
  //   const { target } = event;
  //   const { name } = target;
  //   const valueData = target.type === 'checkbox' ? target.checked : target.value;
  //   setAllFormsStates({ [name]: valueData });
  // };

  // const handleSetAllSimpleStates = (someData, keyString) => {
  //   setAllSimpleStates({ ...allSimpleStates, [keyString]: someData });
  //   console.log('allSimpleStates изнутри handleSetAllSimpleStates (App):');
  //   console.log(allSimpleStates);
  // };

  console.log('Ниже текущие состояние стейта filteredMoviesCards внутри App:');
  console.log(filteredMoviesCards);
  // console.log('Ниже текущие состояние стейта allFormStates внутри App:');
  // console.log(allFormsStates);
  // console.log('Ниже текущие состояние стейта allSimpleStates внутри App:');
  // console.log(allSimpleStates);

  const handleBurgerMenuClick = () => {
    setIsBurgerMenuRollupOpen(true);
  };

  const handleSetIsProcessing = (isDataProcessing) => {
    setIsProcessing(isDataProcessing);
  };

  // const handleSetIsShortFilm = (isShort) => {
  //   setIsShortFilm(isShort);
  // };

  const handleSetFilteredMoviesCards = (filteredMoviesCardsData) => {
    setFilteredMoviesCards(filteredMoviesCardsData);
  };

  // const handleSetMoviesString = (moviesStringData) => {
  //   setMoviesString(moviesStringData);
  // };

  const handleSetIsNothingFound = (isMoviesFound) => {
    setIsNothingFound(isMoviesFound);
  };
  // const onUpdateMoviesString = (newMoviesString) => {
  //   setMoviesString(newMoviesString);
  //   console.log(`После обновления строки поиска фильмов,
  //   новая строка выглядит так - ${moviesString}`);
  // };

  const closeAllOpened = () => {
    setIsBurgerMenuRollupOpen(false);
    // setAllSimpleStates({});
  };

  // Хук осуществляющий предварительный запрос всех необходимых данных с сервера,
  // для их дальнейшей обработки.
  // Имеет смысл так делать (запрашивать все данные сразу), когда нужна большая
  // отзывчивость и более быстрая скорость работы приложения, наоборот лучше
  // делать тогда, когда нужно сэкономить больше места на компьютере (ОЗУ и ПЗУ)
  // (при этом запросы к серверу за данными для обработки будут происходить более часто)
  // React.useEffect(() => {
  //   console.log(`момент, когда происходит запрос к хуку эффекта, для запроса данных с сервера,
  //   внутри компонента App`);
  //   getMoviesCards()
  //     .then((moviesCardsData) => {
  //       setMoviesCards(moviesCardsData);
  //     })
  //     .catch((err) => catchResponse(err));
  // Код внутри return в основном используется для удаления-зачистки оставшихся ненужных
  // "функций-слушателей"
  // return () => {
  // }
  // После запятой в массиве указывается список зависимостей, зависимости указывают хуку,
  // что только при их изменении он должен запускаться.
  // Если массив зависимостей пустой, то код внутри хука исполнится один раз
  // после рендеринга компонента, внутри которого находится хук.
  // }, []);

  return (
    <CurrentDataContext.Provider
      value={{ filteredMoviesCards }}
      // value={{
      //   filteredMoviesCards,
      //   moviesString,
      //   isNothingFound,
      //   isProcessing,
      //   allFormsStates,
      //   allSimpleStates,
      // }}
    >
      {/* <CurrentFunctionsContext.Provider
        value={{ handleSetAllSimpleStates, handleSetFilteredMoviesCards }}
        value={{
          handleSetFilteredMoviesCards,
          handleSetMoviesString,
          handleSetIsNothingFound,
          handleSetIsProcessing,
          handleSetAllFormsStates,
          handleSetAllSimpleStates,
        }}
      > */}

      <div className="page page_format_all-font">

        <Switch>
          <Route exact path="/">
            <Header colorThemeDark={true}/>
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header onBurgerMenu={handleBurgerMenuClick}/>
            <Movies
              statesData={{ isProcessing, isNothingFound }}
              handlers={{
                handleSetIsProcessing, handleSetIsNothingFound, handleSetFilteredMoviesCards,
              }}
            />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header onBurgerMenu={handleBurgerMenuClick}/>
            <SavedMovies
              statesData={{ isProcessing, isNothingFound }}
              handlers={{
                handleSetIsProcessing, handleSetIsNothingFound, handleSetFilteredMoviesCards,
              }}
            />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header onBurgerMenu={handleBurgerMenuClick}/>
            <Profile />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
         </Route>
        </Switch>

        <BurgerMenuRollup isOpen={isBurgerMenuRollupOpen} onClose={closeAllOpened}/>
        {/* <BurgerMenuRollup onClose={closeAllOpened}/> */}

      </div>

      {/* </CurrentFunctionsContext.Provider> */}
    </CurrentDataContext.Provider>

  );
}

export default App;
