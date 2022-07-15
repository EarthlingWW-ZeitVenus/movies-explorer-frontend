import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CurrentDataContext from '../../contexts/CurrentDataContext';
// import CurrentUserContext from '../../contexts/CurrentUserContext';
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
import setAndGetFromLocalStorage from '../../utils/set-and-get-from-local-storage';
import useForms from '../../utils/use-forms';
// import { countRowsAndCards } from '../../utils/utils';
// import getMoviesCards from '../../utils/MoviesApi';

function App() {
  // window.localStorage.clear();
  // console.log(JSON.stringify(window.localStorage, null, 2));
  console.log('обращение к компоненту App');
  // debugger;
  const {
    localSavedArray,
    localSavedFormState,
    handleSaveArray,
    handleSaveFormState,
  } = setAndGetFromLocalStorage();
  const {
    searchFormValues,
    registerAuthFormValues,
    formErrors,
    formIsValid,
    isSearchFormStatesEqual,
    handleRegisterAuthFormChange,
    handleSearchFormChange,
    resetForm,
  } = useForms(localSavedFormState);

  // const { values, closeAllOpened } = useAllSimpleStates();
  // console.log('Внутрь App из хука передан такой объект values:');
  // console.log(values);
  const [isBurgerMenuRollupOpen, setIsBurgerMenuRollupOpen] = React.useState(false);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  // const [moviesCardsArray, setMoviesCardsArray] = React.useState([]);
  // const [isShortFilm, setIsShortFilm] = React.useState(false);
  // const [moviesString, setMoviesString] = React.useState('');
  // const [isUseLocal, setIsUseLocal] = React.useState(false);
  // const arrayToDisplay = isUseSaveLocal ? savedMoviesArray : filteredMoviesCards;
  // debugger;
  // console.log('arrayToDisplay in App:');
  // console.log(arrayToDisplay);
  console.log('localSavedArray in App:');
  console.log(localSavedArray);
  console.log('localSavedFormState in App:');
  console.log(localSavedFormState);
  console.log('currentUser in App:');
  console.log(currentUser);
  // console.log('moviesCardsArray in App:');
  // console.log(moviesCardsArray);
  // const {} = countRowsAndCards
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

  // console.log('Ниже текущие состояние стейта filteredMoviesCards внутри App:');
  // console.log(filteredMoviesCards);
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

  // const handleSetIsUseLocal = (isUseLocalStorage) => {
  //   setIsUseLocal(isUseLocalStorage);
  // };

  // const handleSetIsShortFilm = (isShort) => {
  //   setIsShortFilm(isShort);
  // };

  // const handleSetFilteredMoviesCards = (filteredMoviesCardsData) => {
  //   setFilteredMoviesCards(filteredMoviesCardsData);
  // };

  // const handleSetMoviesString = (moviesStringData) => {
  //   setMoviesString(moviesStringData);
  // };

  const handleSetIsNothingFound = (isNothing) => {
    setIsNothingFound(isNothing);
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

  // ToDo: Не забыть тут потом указать параметр эффекта - isLoggedIn

  return (
  <CurrentDataContext.Provider value={localSavedArray}>
    {/* <CurrentUserContext.Provider value={currentUser}> */}

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
              statesData={{
                isProcessing,
                isNothingFound,
                searchFormValues,
                formErrors,
                formIsValid,
                isSearchFormStatesEqual,
                // windowWidth,
                // numberOffMoreButtonClicks,
              }}
              handlers={{
                handleSetIsProcessing,
                handleSetIsNothingFound,
                handleSaveArray,
                handleSaveFormState,
                handleRegisterAuthFormChange,
                handleSearchFormChange,
                resetForm,
                // handleMoreButtonClick,
              }}
              // functions={}
            />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header onBurgerMenu={handleBurgerMenuClick}/>
            <SavedMovies
              statesData={{
                isProcessing,
                isNothingFound,
                searchFormValues,
                formErrors,
                formIsValid,
                isSearchFormStatesEqual,
                // windowWidth,
                // numberOffMoreButtonClicks,
              }}
              handlers={{
                handleSetIsProcessing,
                handleSetIsNothingFound,
                handleSaveArray,
                handleSaveFormState,
                handleRegisterAuthFormChange,
                handleSearchFormChange,
                resetForm,
                // handleMoreButtonClick,
              }}
              // functions={}
            />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header onBurgerMenu={handleBurgerMenuClick}/>
            <Profile currentUserProp={currentUser} />
          </Route>
          <Route path="/signup">
            <Register
              statesData={{
                registerAuthFormValues,
                formErrors,
                formIsValid,
              }}
              handlers={{
                handleRegisterAuthFormChange,
                resetForm,
                setCurrentUser,
              }}
            />
          </Route>
          <Route path="/signin">
            <Login
              statesData={{
                registerAuthFormValues,
                formErrors,
                formIsValid,
              }}
              handlers={{
                handleRegisterAuthFormChange,
                resetForm,
                setCurrentUser,
              }}
            />
          </Route>
          <Route path="*">
            <NotFound />
         </Route>
        </Switch>

        <BurgerMenuRollup isOpen={isBurgerMenuRollupOpen} onClose={closeAllOpened}/>
        {/* <BurgerMenuRollup onClose={closeAllOpened}/> */}

      </div>

    {/* </CurrentUserContext.Provider> */}
  </CurrentDataContext.Provider>

  );
}

export default App;
