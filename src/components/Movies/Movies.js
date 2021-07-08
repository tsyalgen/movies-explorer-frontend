import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({movies, onDelete, onSave, checkLike}) {
  const isSavedCards = false;
  // const isLiked = false;
  return (
    <>
      <main className="movies">
        <SearchForm/>
        <MoviesCardList isSavedCards={isSavedCards}
                        movies={movies}
                        // isLiked={isLiked}
                        onSave={onSave}
                        onDelete={onDelete}
                        checkLike={checkLike}/>
        <button className="movies__more-button transparence">ИЩО</button>
      </main>
      <Footer/>
    </>
  );
}

export default Movies;