import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({ movies, onDelete, checkLike }) {
  const isSavedCards = true;
  // const isLiked = true;
  return (
    <>
      <main className="movies">
        <SearchForm />
        <MoviesCardList isSavedCards={isSavedCards}
                        movies={movies}
                        // isLiked={isLiked}
                        onDelete={onDelete}
                        checkLike={checkLike}/>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;