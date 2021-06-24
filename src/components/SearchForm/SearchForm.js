import './SearchForm.css';
import icon from '../../images/icon.svg';
import iconWhite from '../../images/icon-white.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return(
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <img src={icon} alt="иконка поиска" className="search-form__icon" />
          <input className="search-form__input"
                 name="search-input"
                 type="text"
                 placeholder="Фильм"
                 minLength="1"
                 maxLength="250"
                 required/>
          <button className="search-form__button transparence"><img src={iconWhite}
                                                                    alt="иконка поиска" />
          </button>
          <span className="search-form__border" />
        </form>
        <FilterCheckbox />
        <p className="search-form__shortfilms">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;