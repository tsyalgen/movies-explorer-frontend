import './App.css';
import {useEffect, useState} from "react";
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
  const location = useLocation().pathname;
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
      description: movie.description || '',
      director: movie.director,
      duration: movie.duration,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      movieId: movie.id,
      nameEN: movie.nameEN || '',
      nameRU: movie.nameRU || '',
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
            history.push(location);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const filterMovies = (movies, text) => {
    return movies.filter(movie =>
      movie.nameRU.toLowerCase().includes(text.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(text.toLowerCase()) ||
      movie.description.toLowerCase().includes(text.toLowerCase())
    )
  }

  const getSubmitResult = (text) => {
    if (location === '/movies') {
      const movies = JSON.parse(localStorage.getItem("movies"));
      console.log(movies);
      localStorage.setItem("filteredMovies", JSON.stringify(filterMovies(movies, text)));
      setFilteredMovies(filterMovies(movies, text));
    }
    if (location === '/saved-movies') {
      return api.getSavedMovies()
        .then((res) => {
          setSavedMovies(filterMovies(res.data, text))});
    }
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
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDeleteMovie = (movie) => {
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
            <ProtectedRoute path="/movies"
                            loggedIn={loggedIn}
                            component={Movies}
                            movies={filteredMovies}
                            onDelete={handleDeleteMovie}
                            onSave={handleSaveMovie}
                            onSearchSubmit={getSubmitResult}
                            checkLike={checkSaveState}/>

            <ProtectedRoute path="/saved-movies"
                            loggedIn={loggedIn}
                            component={SavedMovies}
                            movies={savedMovies}
                            onDelete={handleDeleteMovie}
                            checkLike={checkSaveState}
                            onSearchSubmit={getSubmitResult}/>
            <ProtectedRoute path="/profile"
                            loggedIn={loggedIn}
                            component={Profile}
                            onUpdate={updateProfile}
                            onSignOut={handleSignOut}/>
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
