import './App.css';
import {useState, useEffect} from "react";
import {Switch, Route, useHistory} from 'react-router-dom';
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

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {

    Promise.all([api.getProfile(), api.getSavedMovies()])
      .then((res) => {
        const [info, movies] = res;

        setCurrentUser({name: info.name, email: info.email});

        const serverMovies = movies.data.map((movie) => ({
          duration: movie.duration,
          description: movie.description,
          image: movie.image,
          trailer: movie.trailer,
          nameRU: movie.nameRU,
        }));

        setMovies(serverMovies);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [loggedIn]);

  console.log(movies);

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

  function handleGetAllMovies() {
    getMovies()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGetSavedMovies() {
    api.getSavedMovies()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSaveMovie = (country,
                           director,
                           duration,
                           year,
                           description,
                           image,
                           trailer,
                           nameRU,
                           nameEN,
                           thumbnail,
                           movieId) => {
    api.saveMovie(
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDeleteMovie = (id) => {
    api.deleteMovie(id)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      });
  }


  // deleteMovieTest("60e47310867605147a8b7be2");

  // getSavedMoviesTest();
  // getAllMovies();


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
              <Movies/>
            </Route>
            <Route path="/saved-movies">
              <SavedMovies movies={movies}/>
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
