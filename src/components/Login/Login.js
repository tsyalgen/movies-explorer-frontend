import '../Register/Register.css';
import {Link} from "react-router-dom";

function Login() {

  const errorName = '';

  return (
    <div className="register">
      <form className="register__form">
        <div className="register__input-section">
          <p className="register__input-label">E-mail</p>
          <input className="register__input" type="email" placeholder="E-mail" name="register-email" required />
          <span className="register__input-error">{errorName}</span>
          <p className="register__input-label">Пароль</p>
          <input className="register__input" type="password" placeholder="Пароль" name="register-password" required />
          <span className="register__input-error">Место для будущих ошибок...</span>
        </div>
        <div className="register__submit-section">
          <button className="register__submit transparence" type="submit">Войти</button>
          <div className="register__redirect">
            <p className="register__redirect-question">Еще не зарегистрированы?</p>
            <Link to="/signup" className="register__link transparence">Регистрация</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;