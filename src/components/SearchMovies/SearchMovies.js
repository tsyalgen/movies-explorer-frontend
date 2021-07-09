import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import {useState} from "react";


function SearchMovies({isSavedCards, movies, onSave, onDelete, checkLike, onSearchSubmit}) {

  const [queryText, setQueryText] = useState('');

  const handleChange = (e) => {
    setQueryText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearchSubmit(queryText);

  }


  return (
    <>
      <SearchForm handleSubmit={handleSubmit}
                  handleChange={handleChange}/>
      <MoviesCardList isSavedCards={isSavedCards}
                      movies={movies}
                      onSave={onSave}
                      onDelete={onDelete}
                      checkLike={checkLike}
      />
    </>
  )
}

export default SearchMovies;