import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {
  const [isBurgerMenuRollupOpen, setIsBurgerMenuRollupOpen] = React.useState(false);

  const handleBurgerMenuClick = () => {
    setIsBurgerMenuRollupOpen(true);
  };

  const closeAllOpened = () => {
    setIsBurgerMenuRollupOpen(false);
  };

  return (
    <div className="page page_format_all-font">
      <Switch>
        <Route exact path="/">
          <Header colorThemeDark={true} onBurgerMenu={handleBurgerMenuClick}/>
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header onBurgerMenu={handleBurgerMenuClick}/>
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header onBurgerMenu={handleBurgerMenuClick}/>
          <SavedMovies />
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

    </div>
  );
}

export default App;
