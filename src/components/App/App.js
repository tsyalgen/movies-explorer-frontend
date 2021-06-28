import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  return (
    <div className="wrapper">
      <div className="page">
        <Header />
        <Switch>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip />
      </div>
    </div>
  );
}

export default App;
