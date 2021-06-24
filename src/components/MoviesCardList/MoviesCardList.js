import './MoviesCardList.css';
import MoviesCard from "../MoviesCard /MoviesCard";

const MoviesCardList = ({ isSavedCard }) => {
  return(
    <section className="movies-card-list">
      <MoviesCard isLiked={true} isSavedCard={isSavedCard} />
      <MoviesCard isLiked={false} isSavedCard={isSavedCard} />
      <MoviesCard isLiked={true} isSavedCard={isSavedCard} />
      <MoviesCard isLiked={false} isSavedCard={isSavedCard} />
      <MoviesCard isLiked={true} isSavedCard={isSavedCard} />
      <MoviesCard isLiked={true} isSavedCard={isSavedCard} />
      <MoviesCard isLiked={true} isSavedCard={isSavedCard} />
    </section>
  );
}

export default MoviesCardList;