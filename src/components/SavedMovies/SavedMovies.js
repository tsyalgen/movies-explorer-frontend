import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({ movies }) {
  const isSavedCard = true;
  return (
    <>
      <main className="movies">
        <SearchForm />
        <MoviesCardList isSavedCard={isSavedCard} movies={movies} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;