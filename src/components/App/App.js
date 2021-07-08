import './App.css';
import {useEffect, useState} from "react";
import {Route, Switch, useHistory} from 'react-router-dom';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import * as api from "../../utils/MainApi";
import {getMovies} from "../../utils/MoviesApi";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function App() {

  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  const [infoTooltip, setInfoTooltip] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [currentUser, setCurrentUser] = useState({});


  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {

    Promise.all([api.getProfile(), api.getSavedMovies()])
      .then((res) => {
        const [info, movies] = res;

        setCurrentUser({name: info.name, email: info.email});
        setSavedMovies(movies.data);
        getAllMovies();
      })
      .catch((err) => {
        console.log(err);
      });

  }, [loggedIn]);


  //utils

  function handleInfoTooltipOpen(value) {
    setIsInfoTooltipOpen(true);
    setIsSuccess(value);
  }

  function closePopup() {
    setIsInfoTooltipOpen(false);
  }

  const handleInfoTooltip = (text) => {
    setInfoTooltip(text);
  }

  function filterBeatResponse(movies) {
    return movies.map((movie) => ({
      country: movie.country,
      description: movie.description,
      director: movie.director,
      duration: movie.duration,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      movieId: movie.id,
      nameEN: movie.nameEN,
      nameRU: movie.nameRU,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      trailer: movie.trailerLink,
      year: movie.year,
    }));
  }

  //auth

  function handleRegister(email, password, name) {
    api.register(email, password, name)
      .then(() => {
        handleInfoTooltip('Вы успешно зарегистрировались!')
        handleInfoTooltipOpen(true)

        handleLogin(email, password);
      })
      .catch((err) => {
        handleInfoTooltip('Что-то пошло не так! Попробуйте еще раз.')
        handleInfoTooltipOpen(false);
        console.log(err)
      })
  }

  function handleLogin(email, password) {
    api.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        history.push('./')
      })
      .catch((err) => {
        handleInfoTooltip('Неверный email или пароль! Попробуйте еще раз.')
        handleInfoTooltipOpen(false);
        console.log(err);
      });
  }

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.checkJWTToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            if (history.location.pathname === '/signin' || history.location.pathname === '/signup') {
              history.push('./');
            }
          }
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }


  //profile

  const handleSignOut = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    history.push('/')
  }
  //
  // const getProfile = () => {
  //   api.getProfile()
  //     .then((res) => {
  //       setCurrentUser({name: res.name, email: res.email});
  //     });
  // }

  const updateProfile = (email, name) => {
    api.updateProfile(email, name)
      .then((res) => {
        setCurrentUser({name: res.data.name, email: res.data.email});
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //movies

  function getAllMovies() {
    getMovies()
      .then((res) => {
        const movies = filterBeatResponse(res);
        localStorage.setItem("movies", JSON.stringify(movies));
        setFilteredMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getSavedMovies() {
    api.getSavedMovies()
      .then((res) => {
        setSavedMovies(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const checkSaveState = (movie) => {
    return savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId);
  }

  const handleSaveMovie = (movie) => {
    console.log(movie);
    api.saveMovie(
      movie.country,
      movie.director,
      movie.duration,
      movie.year,
      movie.description,
      movie.image,
      movie.trailer,
      movie.nameRU,
      movie.nameEN,
      movie.thumbnail,
      movie.movieId)
      .then((res) => {
        // checkSaveState(movie);  СОХРАНЕНКИ БЕЗ ПЕРЕЗАГРУЗКИ НЕ ПОЯВЛЯЮТСЯ, исправить с setSavedMovies
        console.log(checkSaveState(movie));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDeleteMovie = (movie) => {
    console.log(savedMovies);
    const id = savedMovies.find(
      (item) => item.movieId === movie.movieId)._id;
    api.deleteMovie(id)
      .then((res) => {
        checkSaveState(movie);
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err)
      });
  }


  // handleSaveMovie(
  //   "country",
  //   "director",
  //   "123",
  //   "2000",
  //   "description",
  //   "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
  //   "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider",
  //   "nameRUTEST",
  //   "nameEN",
  //   "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
  //   "123"
  // )


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <div className="page">
          <Header loggedIn={loggedIn}/>
          <Switch>
            <Route path="/signup">
              <Register onRegister={handleRegister}/>
            </Route>
            <Route path="/signin">
              <Login onLogin={handleLogin}/>
            </Route>
            <Route path="/movies">
              <Movies movies={filteredMovies}
                      onDelete={handleDeleteMovie}
                      onSave={handleSaveMovie}
                      checkLike={checkSaveState}/>
            </Route>
            <Route path="/saved-movies">
              <SavedMovies movies={savedMovies}
                           onDelete={handleDeleteMovie}
                           checkLike={checkSaveState}/>
            </Route>
            <Route path="/profile">
              <Profile onUpdate={updateProfile} onSignOut={handleSignOut}/>
            </Route>
            <Route exact path="/">
              <Main/>
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
          <InfoTooltip isOpen={isInfoTooltipOpen} isSuccess={isSuccess} onClose={closePopup} infoText={infoTooltip}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
