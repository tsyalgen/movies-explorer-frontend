import './Header.css';
import logo from '../../images/logo.svg';
import account from '../../images/account.svg';
import {Link, NavLink, Route} from "react-router-dom";

function Header() {
  const loggedIn = false;
  const authPage = false;
  return (
  <Route path="/">
    <header className={`header ${authPage && 'header__auth'}`}>
      <Link to="/" className="header__logo"><img src={logo} alt="логотип проекта" /></Link>
      { !authPage ? <>
      <div className="header__menu">
          {loggedIn ? <>
            <NavLink to="/movies" className="header__menu header__menu_type_film transparence" activeClassName="header__menu_current">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="header__menu header__menu_type_film transparence" activeClassName="header__menu_current">Сохраненные фильмы</NavLink>
            <NavLink to="/profile" className="header__menu header__menu_type_account transparence" activeClassName="header__menu_current">Аккаунт
              <img src={account} alt="иконка аккаунта" className="header__menu_type_icon transparence" /></NavLink>
          </> : <>
            <Link to="/signin" className="header__menu header__menu_type_login transparence">login</Link>
            <Link to="/signup" className="header__menu header__menu_type_registration transparence">registr</Link>
          </>}
      </div>
      </> : <>
        <h1>LALLALA</h1>
      </>}
    </header>
    </Route>


    // роут логин и рега - пропс передать из апп, остальные состояния роут из /, разделить

  );
}

export default Header;