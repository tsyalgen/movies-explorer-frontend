import './MoviesCard.css';
import card from '../../images/image-card.png';

function MoviesCard({ isLiked, isSavedCard }) {

  const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ''} transparence`);

  return(
    <div className="card">
      <div className="card__text">
        <h3 className="card__title">33 слова о дизайне</h3>
        <p className="card__duration">1ч 42м</p>
        <button className={isSavedCard ? 'card__like_type_saved' : cardLikeButtonClassName} />
      </div>
      <a className="card__link transparence" href="/#">
        <img src={card} alt="IMYA BUDUSHEE" className="card__image"/>
      </a>
    </div>
  );
}

export default MoviesCard;