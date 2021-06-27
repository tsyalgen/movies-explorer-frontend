import './Header.css';
import logo from '../../images/logo.svg';
import account from '../../images/account.svg';
import {Link, NavLink, Route} from "react-router-dom";

function Header() {
  const loggedIn = false;
  return (
    <header className="header">
      <Route path="/signin">
        <div className="header__auth">
          <Link to="/" className="header__logo_type_auth transparence"><img src={logo} alt="логотип проекта"/></Link>
          <h2 className="header__title_type_auth">Рады видеть!</h2>
        </div>
      </Route>
      <Route path="/signup">
        <div className="header__auth">
          <Link to="/" className="header__logo_type_auth transparence"><img src={logo} alt="логотип проекта"/></Link>
          <h2 className="header__title_type_auth">Добро пожаловать!</h2>
        </div>
      </Route>
      <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
        <Link to="/" className="header__logo transparence"><img src={logo} alt="логотип проекта"/></Link>
        <div className="header__menu">
          {loggedIn ? <>
            <NavLink to="/movies" className="header__menu header__menu_desktop header__menu_type_text transparence"
                     activeClassName="header__menu_current">Фильмы</NavLink>
            <NavLink to="/saved-movies"
                     className="header__menu header__menu_desktop header__menu_type_text transparence"
                     activeClassName="header__menu_current">Сохраненные фильмы</NavLink>
            <NavLink to="/profile" className="header__menu header__menu_desktop header__menu_type_account transparence"
                     activeClassName="header__menu_current">Аккаунт
              <img src={account} alt="иконка аккаунта" className="header__menu_type_icon transparence"/></NavLink>
            <div className="header__menu_mobile header__menu-burger">
              <input className="header__menu-toggle" id="menu-toggle" type="checkbox"/>
              <label className="header__menu-btn" htmlFor="menu-toggle">
                <span className="header__menu-span"/>
              </label>
              <ul className="header__menu-box">
                <li className="header__menu-item">
                  <NavLink exact to="/" className="header__menu-link"
                           activeClassName="header__menu-item_active">Главная</NavLink>
                </li>
                <li className="header__menu-item">
                  <NavLink to="/movies" className="header__menu-link"
                           activeClassName="header__menu-item_active">Фильмы</NavLink>
                </li>
                <li className="header__menu-item">
                  <NavLink to="/saved-movies" className="header__menu-link"
                           activeClassName="header__menu-item_active">Сохраненные фильмы</NavLink>
                </li>
                <li className="header__menu-item">
                  <NavLink to="/profile" className="header__menu-link"
                           activeClassName="header__menu-item_active">Аккаунт</NavLink>
                  <img src={account} alt="иконка аккаунта" className="header__menu_type_icon"/>
                </li>
              </ul>
              <div className="header__menu_type_background"/>
            </div>
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