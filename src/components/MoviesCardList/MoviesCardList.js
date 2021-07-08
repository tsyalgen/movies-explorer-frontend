import './MoviesCardList.css';
import MoviesCard from "../MoviesCard /MoviesCard";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({isSavedCards, movies, onDelete, onSave, checkLike}) => {
  return (
    <section className="movies-card-list">
      {/*<Preloader/>*/}
      {/*<h2 className="movies-card-list__not-found">Ничего не найдено</h2>*/}


      {/*{ isSavedCards ?*/}
      {/*  movies.map((movie) => {*/}
      {/*    return(*/}
      {/*      <MoviesCard key={movie._id} movie={movie} isSavedCards={isSavedCards} isLiked={isLiked} onDelete={onDelete} />*/}
      {/*    )*/}
      {/*  })*/}
      {/*  :*/}
      {/*  <MoviesCard isLiked={true} isSavedCards={isSavedCards} />*/}
      {/*}*/}

      {
        movies.map((movie) => {
          return (
            <MoviesCard key={movie.movieId}
                        movie={movie}
                        isSavedCards={isSavedCards}
                        // isLiked={isLiked}
                        onDelete={onDelete}
                        onSave={onSave}
                        checkLike={checkLike}/>
          )
        })
      }


      {/*<MoviesCard isLiked={true} isSavedCard={isSavedCard} />*/}
    </section>
  );
}

export default MoviesCardList;