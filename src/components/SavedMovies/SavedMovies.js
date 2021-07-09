import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchMovies from "../SearchMovies/SearchMovies";

function SavedMovies({ movies, onDelete, checkLike, onSearchSubmit }) {
  return (
    <>
      <main className="movies">
        <SearchMovies isSavedCards={true}
                      movies={movies}
                      onDelete={onDelete}
                      checkLike={checkLike}
                      onSearchSubmit={onSearchSubmit}/>

        {/*<SearchForm />*/}
        {/*<MoviesCardList isSavedCards={true}*/}
        {/*                movies={movies}*/}
        {/*                onDelete={onDelete}*/}
        {/*                checkLike={checkLike}/>*/}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;