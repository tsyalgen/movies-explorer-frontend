import {useEffect, useState} from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard /MoviesCard";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({isSavedCards, movies, onDelete, onSave, checkLike}) => {

  const [ displayedMovies, setDisplayedMovies ] = useState([]);

  const paginateMovies = () => {
    !isSavedCards ? setDisplayedMovies(movies.slice(0, 7)) : setDisplayedMovies(movies);
  }

  useEffect(() => {
    !isSavedCards ? setDisplayedMovies(movies.slice(0, 7)) : setDisplayedMovies(movies);
  }, [])
  console.log(displayedMovies);
  //нихуя не работает, надо подумать как ето сделать


  return (
    <section className="movies-card-list">
      {/*<Preloader/>*/}
      {/*<h2 className="movies-card-list__not-found">Ничего не найдено</h2>*/}

      { movies.length !== 0 ?

        displayedMovies.map((movie) => {
          return (
            <MoviesCard key={movie.movieId}
                        movie={movie}
                        isSavedCards={isSavedCards}
                        onDelete={onDelete}
                        onSave={onSave}
                        checkLike={checkLike}/>
          )
        })
        :
        <h2 className="movies-card-list__not-found">Введите запрос</h2>
      }
    </section>
  );
}

export default MoviesCardList;