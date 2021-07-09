import './Movies.css';
import Footer from "../Footer/Footer";
import SearchMovies from "../SearchMovies/SearchMovies";

function Movies({movies, onDelete, onSave, checkLike, onSearchSubmit}) {



  return (
    <>
      <main className="movies">
        <SearchMovies isSavedCards={false}
                      movies={movies}
                      onSave={onSave}
                      onDelete={onDelete}
                      checkLike={checkLike}
                      onSearchSubmit={onSearchSubmit}/>

        <button className="movies__more-button transparence">ИЩО</button>
      </main>
      <Footer/>
    </>
  );
}

export default Movies;