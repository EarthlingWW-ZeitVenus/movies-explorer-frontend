import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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
import useLocalStorage from '../../utils/use-local-storage';
import useForms from '../../utils/use-forms';
import Infotooltip from '../Infotooltip/Infotooltip';
import PopupRollup from '../PopupRollup/PopupRollup';
import {
  register,
  login,
  logout,
  addMovie,
  deleteMovie,
  editUser,
} from '../../utils/MainApi';
// import { countRowsAndCards } from '../../utils/utils';
// import getMoviesCards from '../../utils/MoviesApi';

function App() {
  // eslint-disable-next-line no-undef
  // console.log(JSON.stringify(window.localStorage, null, 2));
  // eslint-disable-next-line no-undef
  // window.localStorage.clear();
  // eslint-disable-next-line no-undef
  console.log(JSON.stringify(window.localStorage, null, 2));
  console.log('обращение к компоненту App');
  // debugger;
  const history = useHistory();
  const {
    moviesArray,
    ownedMoviesArray,
    formState,
    currentUser,
    // isLoggedIn,
    handleSaveArray,
    handleSaveForm,
    handleSetCurrentUser,
    handleSetIsLoggedIn,
    handleSaveOwnedMovies,
  } = useLocalStorage();
  const {
    searchFormValues,
    registerAuthProfileFormValues,
    formErrors,
    formIsValid,
    isSearchFormStatesEqual,
    handleRegisterAuthProfileFormChange,
    handleSearchFormChange,
    resetForm,
  } = useForms(formState, currentUser);

  const [isBurgerMenuRollupOpen, setIsBurgerMenuRollupOpen] = React.useState(false);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [infotooltipData, setInfotooltipData] = React.useState({ message: '', isError: false });
  // const [infotooltipMessage, setInfotooltipMessage] = React.useState('');
  const [isInfotooltipPopupOpen, setIsInfotooltipPopupOpen] = React.useState(false);
  const [embeddedMessageText, setEmbeddedMessageText] = React.useState('');

  console.log('moviesArray in App:');
  console.log(moviesArray);
  console.log('formState in App:');
  console.log(formState);
  console.log('currentUser in App:');
  console.log(currentUser);
  console.log('ownedMoviesArray in App:');
  console.log(ownedMoviesArray);

  // Минифункции (использую для компоновки более сложных функций)
  function catchResponse(error) {
    if (error.status) {
      setInfotooltipData({
        message: `Сервер ответил ошибкой со статусом - ${error.status} - ${error.statusText}`,
        isError: true,
      });
    } else {
      setInfotooltipData({
        message: `Ваш запрос не ушел на сервер или сервер не ответил, ошибка - ${error}`,
        isError: true,
      });
    }
    setIsInfotooltipPopupOpen(true);
  }

  // Handlers
  const handleBurgerMenuClick = () => {
    setIsBurgerMenuRollupOpen(true);
  };
  const handleSetIsProcessing = (isDataProcessing) => {
    setIsProcessing(isDataProcessing);
  };
  const handleSetIsNothingFound = (isNothing) => {
    setIsNothingFound(isNothing);
  };

  // Функции
  // Закрытие всех окон
  const closeAllOpened = () => {
    setIsBurgerMenuRollupOpen(false);
    setIsInfotooltipPopupOpen(false);
  };
  // Добавление нового фильма в сохраненные
  function handleChangeSaveMovie(movieInfoObject) {
    if ('owner' in movieInfoObject) {
      debugger;
      deleteMovie(movieInfoObject._id)
        .then((res) => {
          debugger;
          console.log(res);
          setInfotooltipData({
            message: `Операция выполнена - ${res.message}`,
            isError: false,
          });
          setIsInfotooltipPopupOpen(true);
          const { owner, ...movieInfoObjectWithoutOwner } = movieInfoObject;
          const newMoviesArray = moviesArray.map((mai) => (
            mai.movieId === movieInfoObject.movieId ? movieInfoObjectWithoutOwner : mai));
          handleSaveArray(newMoviesArray);
          const newOwnedMoviesArray = ownedMoviesArray.filter((omai) => (
            omai._id !== movieInfoObject._id));
          handleSaveOwnedMovies(newOwnedMoviesArray);
        })
        .catch((err) => catchResponse(err));
      // delete movieInfoObject.owner;
    } else {
      debugger;
      console.log(movieInfoObject);
      const {
        country,
        director,
        duration,
        year,
        description,
        trailerLink: trailer,
        nameRU,
        nameEN,
        image: { url },
        id: movieId,
      } = movieInfoObject;
      const thumbnail = `https://api.nomoreparties.co${url}`;
      console.log(url);
      console.log(thumbnail);
      debugger;
      const imageUrl = thumbnail;
      addMovie(
        country,
        director,
        duration,
        year,
        description,
        imageUrl,
        trailer,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      )
        .then((res) => {
          debugger;
          console.log(res);
          console.log(res.data);
          // console.log('***Проверка функциональности метода map***');
          // console.log(moviesArray);
          // let moviesArray2 = [];
          // console.log(moviesArray2);
          const newMoviesArray = moviesArray.map((mai) => (
            mai.id === movieInfoObject.id ? res.data : mai));
          // console.log(moviesArray2);
          // debugger;
          // handleSetArray(newMoviesArray);
          handleSaveArray(newMoviesArray);
          handleSaveOwnedMovies([...ownedMoviesArray, res.data]);
        })
        .catch((err) => {
          debugger;
          console.log(err);
          catchResponse(err);
        });
    }
  }
  // Регистрация пользователя
  function onRegister(registerName, registerEmail, registerPassword) {
    setEmbeddedMessageText('');
    register(registerName, registerEmail, registerPassword)
      .then((res) => {
        console.log(res.data);
        handleSetCurrentUser(res.data);
        handleSetIsLoggedIn(true);
        history.push('/movies');
        debugger;
        setInfotooltipData({ message: 'Вы успешно зарегистрировались!', isError: false });
        setIsInfotooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.body);
        if (!err.ok) {
          err.json().then((jsonErr) => {
            setEmbeddedMessageText(jsonErr.message);
          });
        }
      });
  }
  // Вход пользователя
  function onLogin(loginEmail, loginPassword) {
    setEmbeddedMessageText('');
    login(loginEmail, loginPassword)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        handleSetCurrentUser(res.data);
        handleSetIsLoggedIn(true);
        history.push('/movies');
        debugger;
        setInfotooltipData({ message: 'Вы успешно вошли!', isError: false });
        setIsInfotooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.json()) {
          err.json().then((jsonErr) => {
            setEmbeddedMessageText(jsonErr.message);
          });
        }
      });
  }
  // Выход пользователя
  function onSignOut() {
    logout()
      .then((res) => {
        debugger;
        console.log(res);
        handleSetIsLoggedIn(false);
        history.push('/');
        setInfotooltipData({ message: String(res.message), isError: false });
        setIsInfotooltipPopupOpen(true);
      });
  }

  function onProfileChange(email, name) {
    editUser(email, name)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        handleSetCurrentUser(res.data);
        setInfotooltipData({ message: 'Профиль успешно изменён!', isError: false });
        setIsInfotooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setInfotooltipData(
          { message: `При изменении профиля произошла ошибка - ${err}`, isError: true },
        );
        setIsInfotooltipPopupOpen(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

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
              moviesArray={moviesArray}
              commonProcessStates={{
                isProcessing,
                isNothingFound,
              }}
              searchForm={{
                searchFormValues,
                isSearchFormStatesEqual,
              }}
              neededHandlers={{
                handleSetIsProcessing,
                handleSetIsNothingFound,
                handleSaveArray,
                handleSaveForm,
                handleSearchFormChange,
                handleChangeSaveMovie,
              }}
            />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header onBurgerMenu={handleBurgerMenuClick}/>
            <SavedMovies
              catchResponse={catchResponse}
              ownedMoviesArray={ownedMoviesArray}
              commonProcessStates={{
                isProcessing,
                isNothingFound,
                // isLoggedIn,
              }}
              searchForm={{
                searchFormValues,
                isSearchFormStatesEqual,
              }}
              neededHandlers={{
                handleSetIsProcessing,
                handleSetIsNothingFound,
                handleSaveArray,
                handleSaveForm,
                handleSearchFormChange,
                handleChangeSaveMovie,
                handleSaveOwnedMovies,
              }}
              // functions={}
            />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header onBurgerMenu={handleBurgerMenuClick}/>
            <Profile
              onSignOut={onSignOut}
              onProfileChange={onProfileChange}
              neededHandlers={{
                handleRegisterAuthProfileFormChange,
                handleSetCurrentUser,
              }}
              registerAuthProfileForm={{
                registerAuthProfileFormValues,
                formErrors,
                formIsValid,
                resetForm,
              }}
            />
          </Route>
          <Route path="/signup">
            <Register
              // isLoggedIn={isLoggedIn}
              embeddedMessageText={embeddedMessageText}
              onRegister={onRegister}
              registerAuthProfileForm={{
                registerAuthProfileFormValues,
                formErrors,
                formIsValid,
                resetForm,
              }}
              neededHandlers={{
                handleRegisterAuthProfileFormChange,
                // handleSetCurrentUser,
                // handleSetIsLoggedIn,
                // handleSetInfotooltipMessage,
                // handleSetIsInfotooltipPopupOpen,
              }}
            />
          </Route>
          <Route path="/signin">
            <Login
              // isLoggedIn={isLoggedIn}
              embeddedMessageText={embeddedMessageText}
              onLogin={onLogin}
              registerAuthProfileForm={{
                registerAuthProfileFormValues,
                formErrors,
                formIsValid,
                resetForm,
              }}
              neededHandlers={{
                handleRegisterAuthProfileFormChange,
                // handleSetCurrentUser,
                // handleSetIsLoggedIn,
                // handleSetInfotooltipMessage,
                // handleSetIsInfotooltipPopupOpen,
              }}
            />
          </Route>
          <Route path="*">
            <NotFound />
         </Route>
        </Switch>

        <PopupRollup
          component={BurgerMenuRollup}
          isOpen={isBurgerMenuRollupOpen}
          onClose={closeAllOpened}
        />

        <PopupRollup
          component={Infotooltip}
          // isOpen={isInfotooltipPopupOpen}
          isOpen={isInfotooltipPopupOpen}
          onClose={closeAllOpened}
          infotooltipData={infotooltipData}
        />

      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;
