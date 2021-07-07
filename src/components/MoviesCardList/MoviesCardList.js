import './MoviesCardList.css';
import MoviesCard from "../MoviesCard /MoviesCard";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({ isSavedCard, movies }) => {
  return(
    <section className="movies-card-list">
      {/*<Preloader/>*/}
      {/*<h2 className="movies-card-list__not-found">Ничего не найдено</h2>*/}
      {movies.map((movie) => {
        return(
          <MoviesCard key={movie._id} movie={movie} />
        )
      })}
      {/*<MoviesCard isLiked={true} isSavedCard={isSavedCard} />*/}
      {/*<MoviesCard isLiked={false} isSavedCard={isSavedCard} />*/}
      {/*<MoviesCard isLiked={true} isSavedCard={isSavedCard} />*/}
      {/*<MoviesCard isLiked={false} isSavedCard={isSavedCard} />*/}
      {/*<MoviesCard isLiked={true} isSavedCard={isSavedCard} />*/}
      {/*<MoviesCard isLiked={true} isSavedCard={isSavedCard} />*/}
      {/*<MoviesCard isLiked={true} isSavedCard={isSavedCard} />*/}
    </section>
  );
}

export default MoviesCardList;