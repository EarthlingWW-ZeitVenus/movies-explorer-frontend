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
  // getMovies,
} from '../../utils/MainApi';
import { textConstants, numberConstants } from '../../utils/constants';
import {
  filterShortFilm,
  // filterCurrentUserArray,
  // containsIdInObectsArrayAndReturnIndex,
  // synchronizeArrays,
} from '../../utils/utils';

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
  // const [isArrayJustLoaded, setIsArrayJustLoaded] = React.useState(false);
  // const [currentUserOwnedArray, setCurrentUserOwnedArray] = React.useState([]);
  // const [isMayHaveConflictKeys, setIsMayHaveConflictKeys] = React.useState(false);
  // const [isHaveConflictKeys, setIsHaveConflictKeys] = React.useState(false);
  // const [numberToConflictCard, setNumberToConflictCard] = React.useState(1);
  // const [conflictId, setConflictId] = React.useState(0);

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
  // const shortFilmForSavedMovies = searchFormValuesForSavedMovies.shortFilm || false;

  const [
    isShortFilmForMoviesChecked,
    setIsShortFilmForMoviesChecked,
  ] = React.useState(shortFilmForMovies);
  const [
    isShortFilmForSavedMoviesChecked,
    setIsShortFilmForSavedMoviesChecked,
  ] = React.useState(false);

  // console.log('isMayHaveConflictKeys in App:');
  // console.log(isMayHaveConflictKeys);
  // console.log('isHaveConflictKeys in App:');
  // console.log(isHaveConflictKeys);
  // eslint-disable-next-line prefer-const
  // const array1 = [
  //   { name: 'kitchen', id: 24 },
  //   { name: 'chair', id: 16 },
  //   { name: 'amchair', id: 12 },
  //   { name: 'sofa', id: 10 },
  //   { name: 'kitchen2', id: 33 },
  //   { name: 'chair2', id: 16 },
  //   { name: 'amchair2', id: 17 },
  //   { name: 'sofa2', id: 4 },
  // ];
  // eslint-disable-next-line prefer-const
  // const array2 = [
  //   { name: 'goose', id: 7 },
  //   { name: 'cat', id: 13 },
  //   { name: 'dog', id: 10 },
  //   { name: 'mouse', id: 9 },
  //   { name: 'goose2', id: 17 },
  //   { name: 'cat2', id: 11 },
  //   { name: 'dog2', id: 2 },
  //   { name: 'mouse2', id: 4 },
  //   { name: 'goose3', id: 14 },
  //   { name: 'cat3', id: 19 },
  //   { name: 'dog3', id: 12 },
  //   { name: 'mouse3', id: 8 },
  // ];
  console.log('array in App:');
  console.log(array);
  console.log('ownedArray in App:');
  console.log(ownedArray);
  // console.log('synchronizeArrays in App:');
  // console.log(synchronizeArrays(array1, array2));

  // console.log('formState in App:');
  // console.log(formState);
  console.log('currentUser in App:');
  console.log(currentUser);
  // console.log('ownedMoviesArray in App:');
  // console.log(ownedMoviesArray);
  // console.log('shortFilm in App:');
  // console.log(shortFilm);

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
  // const handleSetIsArrayJustLoaded = (isJustLoaded) => {
  //   setIsArrayJustLoaded(isJustLoaded);
  // };
  // const handleSetIsMayHaveConflictKeys = (isMayHave) => {
  //   setIsMayHaveConflictKeys(isMayHave);
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

        // Код в случае содержания конфликтных id (ключей)
        // let isContainConflict = false;
        // let indexOfConflictObject;
        // debugger;
        // if (isMayHaveConflictKeys && cachedOwnedMoviesArray.length !== 0) {
        //   const conflictResponse = containsIdInObectsArrayAndReturnIndex(
        //     cachedOwnedMoviesArray,
        //     movieInfoObject.id,
        //   );
        //   isContainConflict = conflictResponse.isContainConflictId;
        //   indexOfConflictObject = isContainConflict && conflictResponse.indexOfConflictObject;
        //   console.log(cachedOwnedMoviesArray[indexOfConflictObject]);
        //   console.log(cachedOwnedMoviesArray[indexOfConflictObject].owner);
        //   console.log(cachedOwnedMoviesArray[indexOfConflictObject].owner.email);
        //   debugger;
        //   if (isContainConflict) {
        //     setConflictId(movieInfoObject.id);
        // Случай, когда пользователь тот-же
        // if (currentUser.email === cachedOwnedMoviesArray[indexOfConflictObject].owner.email) {
        //   const newCachedMoviesArray = cachedMoviesArray.map((cmai) => (
        //     cmai.id === cachedOwnedMoviesArray[indexOfConflictObject].id
        //       ? cachedOwnedMoviesArray[indexOfConflictObject] : cmai
        //   ));
        //   handleSaveCachedArray(newCachedMoviesArray);
        //   const newMoviesArray = moviesArray.map((mai) => (
        //     mai.id === cachedOwnedMoviesArray[indexOfConflictObject].id
        //       ? cachedOwnedMoviesArray[indexOfConflictObject] : mai
        //   ));
        //   handleSaveArray(newMoviesArray);
        //   return;
        // }
        // Случай, когда пользователь другой
        // setIsHaveConflictKeys(true);
        // return;
        // setNumberToConflictCard(
        //   getNumberOfSameIdObjects(cachedOwnedMoviesArray, movieInfoObject.id) + 1,
        // );
        // return;
        // }
        // setIsHaveConflictKeys(false);
        // setIsMayHaveConflictKeys(false);
        // }

        const {
          country, director, duration, year, description, nameRU, nameEN, id,
        } = movieInfoObject;
        const thumbnail = movieInfoObject.image
          ? `https://api.nomoreparties.co${movieInfoObject.image.url}` : movieInfoObject.thumbnail;
        // console.log(thumbnail);
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
        // console.log(response);
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
        // setIsHaveConflictKeys(false);
        // setIsMayHaveConflictKeys(false);
      } catch (error) {
        // debugger;
        // console.log(error);
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
        // handleRemoveArray();
        // console.log('Всё содержимое хранилища localStorage после handleRemoveArray():');
        // eslint-disable-next-line no-undef
        // console.log(JSON.stringify(window.localStorage, null, 2));
        // debugger;
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
        // setIsProfileChanged(true);
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

  // function checkToken() {
  //   getUser()
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.data);
  //       // debugger;
  //       setCurrentUser(res.data);
  //       setIsLoggedIn(true);
  //       return true;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // debugger;
  //       return false;
  //     });
  // }

  // Хук авто-авторизации пользователя
  React.useEffect(() => {
    // setIsMayHaveConflictKeys(true);
    // console.log(getUser);
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
        // history.push('/movies');
        // debugger;
      })
      .catch((err) => {
        console.log(err);
        // debugger;
      });
  }, [history]);

  // React.useEffect(() => {
  //   debugger;
  //   if (isArrayJustLoaded) {
  //     getMovies()
  //       .then((res) => {
  //         if (res.data.length) {
  //           handleSetCachedOwnedArray(filterCurrentUserArray(currentUser.email, res.data));
  //           handleSetOwnedArray(filterCurrentUserArray(currentUser.email, res.data));
  //           handleSaveCachedArray(synchronizeArrays(cachedArray, res.data));
  //           handleSetArray(synchronizeArrays(array, res.data));
  //         }
  // handleSaveCachedOwnedMovies(res.data);
  // handleSaveOwnedMovies(res.data);
  //       })
  //       .catch((err) => catchResponse(err));
  //   }
  // }, [isArrayJustLoaded]);

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
            // checkToken={checkToken}
            // shortFilm={shortFilm}
            catchResponse={catchResponse}
            // forConflictCard={{
            //   isHaveConflictKeys,
            //   conflictId,
            //   // numberToConflictCard,
            // }}
            // moviesArray={moviesArray}
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
              // handleSaveFilteredMoviesArray,
              handleSetIsShortFilmChecked,
              handleSaveCachedArray,
              // handleSetIsArrayJustLoaded,
              handleSetInitialMoviesValues,
              handleSetInitialSavedMoviesValues,
              // handleSetIsMayHaveConflictKeys,
            }}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            // checkToken={checkToken}
            // shortFilm={shortFilm}
            catchResponse={catchResponse}
            // forConflictCard={{
            //   isHaveConflictKeys,
            //   // conflictId,
            //   // numberToConflictCard,
            // }}
            // ownedMoviesArray={ownedMoviesArray}
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
              // handleSetIsArrayJustLoaded,
            }}
          />

          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            // checkToken={checkToken}
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

      </CurrentUserContext.Provider>

    </CurrentDataContext.Provider>

  );
}

export default App;
