import {useEffect, useState} from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard /MoviesCard";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({isSavedCards, movies, onDelete, onSave, checkLike, isFound, isLoading}) => {

  const [currentCount, setCurrentCount] = useState(() => {
    const width = window.innerWidth;
    if (width > 320) {
      return 8;
    } else {
      return 5;
    }
  });

  const [addCount, setAddCount] = useState(() => {
    const width = window.innerWidth;
    if (width > 768) {
      return 3;
    } else {
      return 2;
    }
  });

  const [displayedMovies, setDisplayedMovies] = useState([]);

  function handleResize() {
    const width = window.innerWidth;
    if (width <= 320) {
      setCurrentCount(5);
      setAddCount(2);
    } else if (width < 768) {
      setCurrentCount(8);
      setAddCount(2);
    } else {
      setCurrentCount(8);
      setAddCount(3);
    }
  }

  function renderAddCount() {
    const count = Math.min(movies.length, currentCount + addCount);
    const moviesForAdd = movies.slice(currentCount, count);
    setDisplayedMovies([...displayedMovies, ...moviesForAdd]);
    setCurrentCount(count);
  }

  function handleAddMoreMovies() {
    renderAddCount();
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    !isSavedCards && movies !== null ? setDisplayedMovies(movies.slice(0, currentCount)) : setDisplayedMovies(movies);
  }, [movies])



  return (
    <section className="movies-card-list">
      {isLoading ? <Preloader/> : (
        !isFound ? <h2 className="movies-card-list__not-found">Ничего не найдено</h2>
          :
          (movies !== null ?

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
          )
      )}
      {!isSavedCards && !isLoading && (movies !== null && movies.length > currentCount) &&
      <button className="movies-card-list__more-button transparence"
              type="button"
              onClick={handleAddMoreMovies}>Еще
      </button>
      }
    </section>
  );
}

export default MoviesCardList;