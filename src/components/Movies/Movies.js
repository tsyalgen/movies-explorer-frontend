import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  const isSavedCard = false;
  return (
    <>
      <main className="movies">
        <SearchForm />
        <MoviesCardList isSavedCard={isSavedCard} />
        <button className="movies__more-button transparence">ИЩО</button>
      </main>
      <Footer />
    </>
  );
}

export default Movies;