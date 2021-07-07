import '../Register/Register.css';
import {useState} from "react";
import {Link} from "react-router-dom";

function Login({ onLogin }) {

  const errorName = '';

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onLogin(userData.email, userData.password);
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <div className="register__input-section">
          <p className="register__input-label">E-mail</p>
          <input onChange={handleChange} className="register__input" type="email" placeholder="E-mail" name="email" required />
          <span className="register__input-error">{errorName}</span>
          <p className="register__input-label">Пароль</p>
          <input onChange={handleChange} className="register__input" type="password" placeholder="Пароль" name="password" required />
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