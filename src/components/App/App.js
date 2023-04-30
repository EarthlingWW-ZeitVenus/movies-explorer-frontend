import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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
  // console.log('window.location.pathname in App');

  // Выводит путь запроса от корневого места сайта
  // eslint-disable-next-line no-undef
  // console.log(window.location.pathname);

  // Выводит содержимое локального хранилища
  // eslint-disable-next-line no-undef
  // console.log(JSON.stringify(window.localStorage, null, 2));

  // Зачищает локальное хранилище
  // eslint-disable-next-line no-undef
  // window.localStorage.clear();

  const { SUCCESS_PROFILE_CHANGE, SUCCESS_LOGIN, SUCCESS_REGISTER } = textConstants;
  const { SHORT_FILM_MAX_DURATION } = numberConstants;
  // eslint-disable-next-line no-undef, no-unused-vars
  const [requestedPathname, setRequestedPathname] = React.useState(window.location.pathname);
  const [isBurgerMenuRollupOpen, setIsBurgerMenuRollupOpen] = React.useState(false);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [infotooltipData, setInfotooltipData] = React.useState({ message: '', isError: false });
  const [isInfotooltipPopupOpen, setIsInfotooltipPopupOpen] = React.useState(false);
  const [embeddedMessageText, setEmbeddedMessageText] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const history = useHistory();

  const {
    array,
    cachedArray,
    ownedArray,
    cachedOwnedArray,
    formState,
    handleSetArray,
    handleSaveCachedArray,
    handleSaveForm,
    handleSetOwnedArray,
    handleSetCachedOwnedArray,
    handleResetArray,
    handleRemoveForm,
    handleRemoveCachedArray,
    handleResetCachedOwnedArray,
  } = useLocalStorage();
  const {
    searchFormValuesForMovies,
    searchFormValuesForSavedMovies,
    registerValues,
    loginValues,
    profileValues,
    formErrors,
    formIsValid,
    isSearchFormStatesForMoviesEqual,
    isSearchFormStatesForSavedMoviesEqual,
    isProfileValuesEqual,
    handleSetInitialProfileValues,
    handleSetInitialMoviesValues,
    handleSetInitialSavedMoviesValues,
    handleSetProfileValues,
    handleRegisterFormChange,
    handleLoginFormChange,
    handleProfileFormChange,
    handleSearchFormChange,
    resetRegisterForm,
    resetLoginForm,
    resetProfileForm,
    resetSearchFormForMovies,
    resetSearchFormForSavedMovies,
    resetInitialMoviesValues,
    resetInitialSavedMoviesValues,
    resetInitialProfileValues,
  } = useForms(formState);

  const shortFilmForMovies = searchFormValuesForMovies.shortFilm || false;

  const [
    isShortFilmForMoviesChecked,
    setIsShortFilmForMoviesChecked,
  ] = React.useState(shortFilmForMovies);
  const [
    isShortFilmForSavedMoviesChecked,
    setIsShortFilmForSavedMoviesChecked,
  ] = React.useState(false);

  console.log('array in App:');
  console.log(array);
  console.log('ownedArray in App:');
  console.log(ownedArray);
  console.log('currentUser in App:');
  console.log(currentUser);

  // Логика подготовки массивов для отображения, в зависимости от переключателя "короткометражки"
  const arrayToDisplay = isShortFilmForMoviesChecked
    ? filterShortFilm(array, SHORT_FILM_MAX_DURATION) : array;
  const ownedArrayToDisplay = isShortFilmForSavedMoviesChecked
    ? filterShortFilm(ownedArray, SHORT_FILM_MAX_DURATION) : ownedArray;
  const cachedOwnedArrayToDisplay = isShortFilmForSavedMoviesChecked
    ? filterShortFilm(cachedOwnedArray, SHORT_FILM_MAX_DURATION) : cachedOwnedArray;

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
  const handleSetIsShortFilmChecked = (isChecked, isSavedMoviesCase) => {
    if (isSavedMoviesCase) {
      setIsShortFilmForSavedMoviesChecked(isChecked);
    } else {
      setIsShortFilmForMoviesChecked(isChecked);
    }
  };

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
    debugger;
    /* **************************** */
    // Логика удаление фильма/лайка
    if ('owner' in movieInfoObject) {
      try {
        debugger;
        // console.log(movieInfoObject);
        const response = await deleteMovie(movieInfoObject._id);
        // console.log(response);
        const { owner, ...movieInfoObjectWithoutOwner } = movieInfoObject;
        const newArray = array.map((mai) => (
          mai.id === movieInfoObject.id ? movieInfoObjectWithoutOwner : mai));
        handleSetArray(newArray);
        const newCachedArray = cachedArray.map((cmai) => (
          cmai.id === movieInfoObject.id ? movieInfoObjectWithoutOwner : cmai));
        handleSaveCachedArray(newCachedArray);
        const newOwnedArray = ownedArray.filter((omai) => (
          omai._id !== movieInfoObject._id));
        handleSetOwnedArray(newOwnedArray);
        const newCachedOwnedArray = cachedOwnedArray.filter((comai) => (
          comai._id !== movieInfoObject._id));
        handleSetCachedOwnedArray(newCachedOwnedArray);
        setInfotooltipData({
          message: `Операция выполнена - ${response.message}`,
          isError: false,
        });
        setIsInfotooltipPopupOpen(true);
      } catch (error) {
        catchResponse(error);
      }
    /* **************************** */
    // Логика добавления фильма/лайка
    } else {
      try {
        debugger;
        console.log(movieInfoObject);
        const {
          country, director, duration, year, description, nameRU, nameEN, id,
        } = movieInfoObject;
        const thumbnail = movieInfoObject.image
          ? `https://api.nomoreparties.co${movieInfoObject.image.url}` : movieInfoObject.thumbnail;
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
        console.log('response.data');
        console.log(response.data);
        const newCachedArray = cachedArray.map((cmai) => (
          cmai.id === movieInfoObject.id ? response.data : cmai));
        console.log('cachedArray');
        console.log(cachedArray);
        console.log('newCachedArray');
        console.log(newCachedArray);
        handleSaveCachedArray(newCachedArray);
        const newArray = array.map((mai) => (
          mai.id === movieInfoObject.id ? response.data : mai));
        console.log('array');
        console.log(array);
        console.log('newArray');
        console.log(newArray);
        handleSetArray(newArray);
        handleSetOwnedArray([...ownedArray, response.data]);
        console.log('ownedArray');
        console.log(ownedArray);
        console.log('cachedOwnedArray');
        console.log(cachedOwnedArray);
        handleSetCachedOwnedArray([...cachedOwnedArray, response.data]);
      } catch (error) {
        console.log(error);
        catchResponse(error);
      }
    }
  }
  // Регистрация пользователя
  function onRegister(registerName, registerEmail, registerPassword) {
    setEmbeddedMessageText('');
    handleSetIsProcessing(true);
    register(registerName, registerEmail, registerPassword)
      .then((res) => {
        // console.log(res.data);
        setCurrentUser(res.data);
        setIsLoggedIn(true);
        handleSetProfileValues(res.data.name, res.data.email);
        handleSetInitialProfileValues(res.data.name, res.data.email);
        history.push('/movies');
        // debugger;
        setInfotooltipData({ message: String(SUCCESS_REGISTER), isError: false });
        setIsInfotooltipPopupOpen(true);
      })
      .catch((err) => {
        // !!! Это условие ниже, при определенных условиях
        // не распарсивается как надо, как решить - пока не знаю !!!
        // console.log(err);
        // console.log(err.body);
        if (!err.ok) {
          err.json().then((jsonErr) => {
            setEmbeddedMessageText(jsonErr.message);
          });
        }
      })
      .finally(() => handleSetIsProcessing(false));
  }
  // Вход пользователя
  function onLogin(loginEmail, loginPassword) {
    setEmbeddedMessageText('');
    handleSetIsProcessing(true);
    login(loginEmail, loginPassword)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        setCurrentUser(res.data);
        handleSetProfileValues(res.data.name, res.data.email);
        handleSetInitialProfileValues(res.data.name, res.data.email);
        setIsLoggedIn(true);
        history.push('/movies');
        // debugger;
        setInfotooltipData({ message: String(SUCCESS_LOGIN), isError: false });
        setIsInfotooltipPopupOpen(true);
      })
      .catch((err) => {
        // !!! Это условие ниже, при определенных условиях
        // не распарсивается как надо, как решить - пока не знаю !!!
        // console.log(err);
        // console.log(err.body);
        // console.log(err.json());
        err.json().then((jsonErr) => {
          console.log(jsonErr);
          setEmbeddedMessageText(jsonErr.message);
        });
      })
      .finally(() => handleSetIsProcessing(false));
  }
  // Выход пользователя
  function onLogout() {
    handleSetIsProcessing(true);
    logout()
      .then((res) => {
        // debugger;
        // console.log(res);
        setIsLoggedIn(false);
        handleRemoveForm();
        handleResetArray();
        handleRemoveCachedArray();
        handleResetCachedOwnedArray();
        resetSearchFormForMovies();
        resetSearchFormForSavedMovies();
        resetRegisterForm();
        resetLoginForm();
        resetProfileForm();
        resetInitialMoviesValues();
        resetInitialSavedMoviesValues();
        resetInitialProfileValues();
        setCurrentUser({});
        // console.log('Всё содержимое хранилища localStorage после handleRemoveForm():');
        // eslint-disable-next-line no-undef
        // console.log(JSON.stringify(window.localStorage, null, 2));
        // debugger;
        history.push('/');
        // debugger;
        setInfotooltipData({ message: String(res.message), isError: false });
        setIsInfotooltipPopupOpen(true);
      })
      .catch((err) => {
        // console.log(err);
        setInfotooltipData(
          { message: `При выходе из профиля произошла ошибка - ${err}`, isError: true },
        );
        setIsInfotooltipPopupOpen(true);
      })
      .finally(() => handleSetIsProcessing(false));
  }
  // Изменеие данных профиля пользователя
  function onProfileChange(email, name) {
    handleSetIsProcessing(true);
    editUser(email, name)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // debugger;
        setCurrentUser(res.data);
        handleSetProfileValues(res.data.name, res.data.email);
        handleSetInitialProfileValues(res.data.name, res.data.email);
        setInfotooltipData({ message: String(SUCCESS_PROFILE_CHANGE), isError: false });
        setIsInfotooltipPopupOpen(true);
      })
      .catch((err) => {
        // console.log(err);
        setInfotooltipData(
          { message: `При изменении профиля произошла ошибка - ${err}`, isError: true },
        );
        setIsInfotooltipPopupOpen(true);
      })
      .finally(() => handleSetIsProcessing(false));
  }

  // Хук авто-авторизации пользователя
  React.useEffect(() => {
    // console.log('Запрос внутри хука авто-авторизации пользователя');
    // eslint-disable-next-line no-undef
    // console.log(window.location.pathname);
    debugger;
    getUser()
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // debugger;
        setCurrentUser(res.data);
        handleSetProfileValues(res.data.name, res.data.email);
        handleSetInitialProfileValues(res.data.name, res.data.email);
        setIsLoggedIn(true);
        history.push(requestedPathname);
        // debugger;
      })
      .catch((err) => {
        console.log(err);
        // debugger;
      });
  }, [history]);

  return (
    <CurrentDataContext.Provider value={{
      isLoggedIn,
      arrayToDisplay,
      ownedArray,
      ownedArrayToDisplay,
      cachedArray,
      cachedOwnedArray,
      cachedOwnedArrayToDisplay,
    }}>

      <CurrentUserContext.Provider value={currentUser}>

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
            catchResponse={catchResponse}
            onBurgerMenu={handleBurgerMenuClick}
            colorThemeDark={false}
            commonProcessStates={{
              isProcessing,
              isNothingFound,
            }}
            searchForm={{
              searchFormValuesForMovies,
              isSearchFormStatesForMoviesEqual,
            }}
            neededHandlers={{
              handleSetIsProcessing,
              handleSetIsNothingFound,
              handleSetArray,
              handleSaveForm,
              handleSearchFormChange,
              handleOwnMovie,
              handleSetIsShortFilmChecked,
              handleSaveCachedArray,
              handleSetInitialMoviesValues,
              handleSetInitialSavedMoviesValues,
            }}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            catchResponse={catchResponse}
            onBurgerMenu={handleBurgerMenuClick}
            colorThemeDark={false}
            commonProcessStates={{
              isProcessing,
              isNothingFound,
            }}
            searchForm={{
              searchFormValuesForSavedMovies,
              isSearchFormStatesForSavedMoviesEqual,
              resetSearchFormForSavedMovies,
            }}
            neededHandlers={{
              handleSetIsProcessing,
              handleSetIsNothingFound,
              handleSetArray,
              handleSaveForm,
              handleSearchFormChange,
              handleOwnMovie,
              handleSetOwnedArray,
              handleSetCachedOwnedArray,
              handleSetIsShortFilmChecked,
              handleSetInitialMoviesValues,
              handleSetInitialSavedMoviesValues,
            }}
          />

          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            isProcessing={isProcessing}
            onBurgerMenu={handleBurgerMenuClick}
            onLogout={onLogout}
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
          isOpen={isInfotooltipPopupOpen}
          onClose={closeAllOpened}
          infotooltipData={infotooltipData}
        />

      </div>

      </CurrentUserContext.Provider>

    </CurrentDataContext.Provider>

  );
}

export default App;
