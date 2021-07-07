import './MoviesCard.css';

function MoviesCard({ isLiked, isSavedCard, movie }) {

  const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ''} transparence`);

  return(
    <div className="card">
      <div className="card__info">
        <div className="card__text">
          <h3 className="card__title">{movie.nameRU}</h3>
          <p className="card__duration">{movie.duration}</p>
        </div>
        <button className={isSavedCard ? 'card__like_type_saved' : cardLikeButtonClassName} />
      </div>
      <a className="card__link transparence" href={movie.trailer}>
        <img src={movie.image} alt={movie.nameRU} className="card__image"/>
      </a>
    </div>
  );
}

export default MoviesCard;