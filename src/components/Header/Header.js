import './Header.css';
import logo from '../../images/logo.svg';
import account from '../../images/account.svg';
import {Link, NavLink, Route} from "react-router-dom";

function Header() {
  const loggedIn = true;
  return (
    <header className="header">
      <Route path="/signin">
        <div className="header__auth">
          <Link to="/" className="header__logo transparence"><img src={logo} alt="логотип проекта"/></Link>
          <h1>SIGNIN</h1>
        </div>
      </Route>
      <Route path="/signup">
        <div className="header__auth">
          <Link to="/" className="header__logo transparence"><img src={logo} alt="логотип проекта"/></Link>
          <h1>SIGNup</h1>
        </div>
      </Route>
      <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
        <Link to="/" className="header__logo transparence"><img src={logo} alt="логотип проекта"/></Link>
        <div className="header__menu">
          {loggedIn ? <>
            <NavLink to="/movies" className="header__menu header__menu_type_text transparence"
                     activeClassName="header__menu_current">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="header__menu header__menu_type_text transparence"
                     activeClassName="header__menu_current">Сохраненные фильмы</NavLink>
            <NavLink to="/profile" className="header__menu header__menu_type_account transparence"
                     activeClassName="header__menu_current">Аккаунт
              <img src={account} alt="иконка аккаунта" className="header__menu_type_icon transparence"/></NavLink>
          </> : <>
            <Link to="/signup"
                  className="header__menu header__menu_type_text transparence">Регистрация</Link>
            <Link to="/signin" className="header__menu header__menu_type_login transparence">
              <button className="header__menu_type_button transparence">Войти</button>
            </Link>
          </>}
        </div>
      </Route>
    </header>
  );
}

export default Header;