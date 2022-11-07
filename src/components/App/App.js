import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import CurrentDataContext from '../../contexts/CurrentDataContext';
// import CurrentUserContext from '../../contexts/CurrentUserContext';
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
import ProtectedRoute from '../ProtectedRoute';
import {
  register,
  login,
  logout,
  addMovie,
  deleteMovie,
  editUser,
  getUser,
} from '../../utils/MainApi';
import { textConstants, numberConstants } from '../../utils/constants';
import { filterShortFilm } from '../../utils/utils';

function App() {
  console.log('обращение к компоненту App');
  const { SUCCESS_PROFILE_CHANGE, SUCCESS_LOGIN, SUCCESS_REGISTER } = textConstants;
  const { SHORT_FILM_MAX_DURATION } = numberConstants;
  // eslint-disable-next-line no-undef
  // console.log(JSON.stringify(window.localStorage, null, 2));
  // eslint-disable-next-line no-undef
  // window.localStorage.clear();
  // eslint-disable-next-line no-undef
  // console.log(JSON.stringify(window.localStorage, null, 2));
  const [isBurgerMenuRollupOpen, setIsBurgerMenuRollupOpen] = React.useState(false);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [infotooltipData, setInfotooltipData] = React.useState({ message: '', isError: false });
  const [isInfotooltipPopupOpen, setIsInfotooltipPopupOpen] = React.useState(false);
  const [embeddedMessageText, setEmbeddedMessageText] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isProfileChanged, setIsProfileChanged] = React.useState(false);

  const history = useHistory();

  const {
    moviesArray,
    ownedMoviesArray,
    formState,
    // filteredMoviesArray,
    // filteredOwnedMoviesArray,
    handleSaveArray,
    handleSaveForm,
    handleSaveOwnedMovies,
    // handleSaveFilteredMoviesArray,
    // handleSaveFilteredOwnedMoviesArray,
  } = useLocalStorage(isLoggedIn);
  const {
    searchFormValues,
    registerValues,
    loginValues,
    profileValues,
    formErrors,
    formIsValid,
    isSearchFormStatesEqual,
    isProfileValuesEqual,
    handleSetInitialProfileValues,
    handleSetProfileValues,
    handleRegisterFormChange,
    handleLoginFormChange,
    handleProfileFormChange,
    handleSearchFormChange,
    resetRegisterForm,
    resetLoginForm,
    resetProfileForm,
    // resetForm,
  } = useForms(formState);

  const shortFilm = searchFormValues.shortFilm || false;

  const [isShortFilmChecked, setIsShortFilmChecked] = React.useState(shortFilm);

  console.log('moviesArray in App:');
  console.log(moviesArray);
  // console.log('filteredMoviesArray in App:');
  // console.log(filteredMoviesArray);
  console.log('formState in App:');
  console.log(formState);
  console.log('currentUser in App:');
  console.log(currentUser);
  console.log('ownedMoviesArray in App:');
  console.log(ownedMoviesArray);
  // console.log('shortFilm in App:');
  // console.log(shortFilm);

  const moviesArrayToDisplay = isShortFilmChecked
    ? filterShortFilm(moviesArray, SHORT_FILM_MAX_DURATION) : moviesArray;
  const ownedMoviesArrayToDisplay = isShortFilmChecked
    ? filterShortFilm(ownedMoviesArray, SHORT_FILM_MAX_DURATION) : ownedMoviesArray;
  // const { shortFilm } = searchFormValues;

  // Хэндлеры
  const handleBurgerMenuClick = () => {
    setIsBurgerMenuRollupOpen(true);
  };
  const handleSetIsProcessing = (isDataProcessing) => {
    setIsProcessing(isDataProcessing);
  };
  const handleSetIsNothingFound = (isNothing) => {
    setIsNothingFound(isNothing);
  };
  const handleSetCurrentUser = (currentUserData) => {
    setCurrentUser(currentUserData);
  };
  const handleSetIsShortFilmChecked = (isChecked) => {
    setIsShortFilmChecked(isChecked);
  };
  // const handleSetIsLoggedIn = (isUserLoggedIn) => {
  //   setIsLoggedIn(isUserLoggedIn);
  // };

  // Функции
  // Обработка ошибок
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
  // Закрытие всех окон
  const closeAllOpened = () => {
    setIsBurgerMenuRollupOpen(false);
    setIsInfotooltipPopupOpen(false);
  };
  // Добавление/удаление фильма в/из сохраненные
  async function handleOwnMovie(movieInfoObject) {
    if ('owner' in movieInfoObject) {
      try {
        // debugger;
        console.log(movieInfoObject);
        const response = await deleteMovie(movieInfoObject._id);
        console.log(response);
        const { owner, ...movieInfoObjectWithoutOwner } = movieInfoObject;
        const newMoviesArray = moviesArray.map((mai) => (
          mai.id === movieInfoObject.id ? movieInfoObjectWithoutOwner : mai));
        handleSaveArray(newMoviesArray);
        const newOwnedMoviesArray = ownedMoviesArray.filter((omai) => (
          omai._id !== movieInfoObject._id));
        handleSaveOwnedMovies(newOwnedMoviesArray);
        setInfotooltipData({
          message: `Операция выполнена - ${response.message}`,
          isError: false,
        });
        setIsInfotooltipPopupOpen(true);
      } catch (error) {
        catchResponse(error);
      }
    } else {
      try {
        // debugger;
        console.log(movieInfoObject);
        const {
          country, director, duration, year, description, nameRU, nameEN, id,
        } = movieInfoObject;
        const thumbnail = movieInfoObject.image
          ? `https://api.nomoreparties.co${movieInfoObject.image.url}` : movieInfoObject.thumbnail;
        console.log(thumbnail);
        const trailer = movieInfoObject.trailerLink || movieInfoObject.trailer;
        const imageUrl = thumbnail;
        const response = await addMovie(
          country,
          director,
          duration,
          String(year),
          description,
          imageUrl,
          trailer,
          thumbnail,
          id,
          nameRU,
          nameEN,
        );
        console.log(response);
        console.log(response.data);
        const newMoviesArray = moviesArray.map((mai) => (
          mai.id === movieInfoObject.id ? response.data : mai));
        handleSaveArray(newMoviesArray);
        handleSaveOwnedMovies([...ownedMoviesArray, response.data]);
      } catch (error) {
        debugger;
        console.log(error);
        catchResponse(error);
      }
    }
  }
  // Регистрация пользователя
  function onRegister(registerName, registerEmail, registerPassword) {
    setEmbeddedMessageText('');
    register(registerName, registerEmail, registerPassword)
      .then((res) => {
        console.log(res.data);
        setCurrentUser(res.data);
        // handleSetProfileValues(res.data.name, res.data.email);
        // handleSetInitialProfileValues(res.data.name, res.data.email);
        setIsLoggedIn(true);
        history.push('/movies');
        debugger;
        setInfotooltipData({ message: String(SUCCESS_REGISTER), isError: false });
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
        setCurrentUser(res.data);
        // handleSetProfileValues(res.data.name, res.data.email);
        // handleSetInitialProfileValues(res.data.name, res.data.email);
        setIsLoggedIn(true);
        history.push('/movies');
        debugger;
        setInfotooltipData({ message: String(SUCCESS_LOGIN), isError: false });
        setIsInfotooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.body);
        // console.log(err.json());
        err.json().then((jsonErr) => {
          console.log(jsonErr);
          setEmbeddedMessageText(jsonErr.message);
        });
      });
  }
  // Выход пользователя
  function onSignOut() {
    logout()
      .then((res) => {
        debugger;
        console.log(res);
        setIsLoggedIn(false);
        history.push('/');
        setInfotooltipData({ message: String(res.message), isError: false });
        setIsInfotooltipPopupOpen(true);
      });
  }
  // Изменеие данных профиля пользователя
  function onProfileChange(email, name) {
    editUser(email, name)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        debugger;
        setCurrentUser(res.data);
        setIsProfileChanged(true);
        // handleSetInitialProfileValues(res.data.name, res.data.email);
        setInfotooltipData({ message: String(SUCCESS_PROFILE_CHANGE), isError: false });
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

  // Хук авто-авторизации пользователя
  React.useEffect(() => {
    console.log(getUser);
    // debugger;
    getUser()
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // debugger;
        setCurrentUser(res.data);
        setIsLoggedIn(true);
        history.push('/movies');
        // debugger;
      })
      .catch((err) => catchResponse(err));
  }, [history]);

  // Хук установки значений текущего пользователя для данных профиля
  React.useEffect(() => {
    // debugger;
    console.log('запрос внутри хука эффекта установки значений текущего пользователя');
    if (isLoggedIn || isProfileChanged) {
      // debugger;
      handleSetProfileValues(currentUser.name, currentUser.email);
      handleSetInitialProfileValues(currentUser.name, currentUser.email);
      // debugger;
    }
  }, [isLoggedIn, isProfileChanged]);

  // Хук фильтрации массива фильмов по переключателю "короткометражки" при изменении "сhecked"
  // React.useEffect(() => {
  //   console.log('запрос внутри хука эффекта фильтрации по переключателю');
  //   debugger;
  // let finalMoviesArray = isSavedMoviesCase ? ownedMoviesArray : moviesArray;
  //   let finalMoviesArray = ownedMoviesArray;
  //   if (isShortFilmChecked) {
  //     debugger;
  //     finalMoviesArray = filterShortFilm(ownedMoviesArray, SHORT_FILM_MAX_DURATION);
  //   }
  //   handleSetMoviesArrayToDisplay(finalMoviesArray);
  //   debugger;
  // }, [isShortFilmChecked]);

  return (
    <CurrentDataContext.Provider value={{
      isLoggedIn,
      moviesArrayToDisplay,
      ownedMoviesArrayToDisplay,
    }}>

      <div className="page page_format_all-font">

        <Switch>

          <Route exact path="/">
            <Header colorThemeDark={true} onBurgerMenu={handleBurgerMenuClick}/>
            <Main />
            <Footer />
          </Route>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            // shortFilm={shortFilm}
            catchResponse={catchResponse}
            // moviesArray={moviesArray}
            onBurgerMenu={handleBurgerMenuClick}
            colorThemeDark={false}
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
              handleOwnMovie,
              // handleSaveFilteredMoviesArray,
              handleSetIsShortFilmChecked,
            }}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            // shortFilm={shortFilm}
            catchResponse={catchResponse}
            // ownedMoviesArray={ownedMoviesArray}
            onBurgerMenu={handleBurgerMenuClick}
            colorThemeDark={false}
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
              handleOwnMovie,
              handleSaveOwnedMovies,
              // handleSaveFilteredOwnedMoviesArray,
              handleSetIsShortFilmChecked,
            }}
          />

          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            isProcessing={isProcessing}
            onBurgerMenu={handleBurgerMenuClick}
            onSignOut={onSignOut}
            onProfileChange={onProfileChange}
            neededHandlers={{
              handleProfileFormChange,
              handleSetCurrentUser,
              handleSetIsProcessing,
            }}
            profileForm={{
              profileValues,
              formErrors,
              formIsValid,
              isProfileValuesEqual,
              resetProfileForm,
            }}
          />

          <Route path="/signup">
            <Register
              // isLoggedIn={isLoggedIn}
              isProcessing={isProcessing}
              embeddedMessageText={embeddedMessageText}
              onRegister={onRegister}
              registerForm={{
                registerValues,
                formErrors,
                formIsValid,
                resetRegisterForm,
              }}
              neededHandlers={{
                handleRegisterFormChange,
                handleSetIsProcessing,
                // handleSetProfileValues,
              }}
            />
          </Route>

          <Route path="/signin">
            <Login
              serverErrorMessageText={embeddedMessageText}
              onLogin={onLogin}
              isProcessing={isProcessing}
              loginForm={{
                loginValues,
                formErrors,
                formIsValid,
                resetLoginForm,
              }}
              neededHandlers={{
                handleLoginFormChange,
                handleSetIsProcessing,
                // handleSetProfileValues,
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

    </CurrentDataContext.Provider>

  );
}

export default App;
