import './Register.css';
import {useState} from "react";
import {Link} from "react-router-dom";

function Register({ onRegister }) {
  const errorName = '';

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(userData.email, userData.password, userData.name);
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <div className="register__input-section">
          <p className="register__input-label">Имя</p>
          <input onChange={handleChange} value={userData.name || ''} className="register__input" type="text" placeholder="Имя" name="name" required />
          <span className="register__input-error">{errorName}</span>
          <p className="register__input-label">E-mail</p>
          <input onChange={handleChange} value={userData.email || ''} className="register__input" type="email" placeholder="E-mail" name="email" required />
          <span className="register__input-error">{errorName}</span>
          <p className="register__input-label">Пароль</p>
          <input onChange={handleChange} value={userData.password || ''} className="register__input" type="password" placeholder="Пароль" name="password" required />
          <span className="register__input-error">Место для будущих ошибок...</span>
        </div>
        <div className="register__submit-section">
          <button className="register__submit transparence" type="submit">Зарегистрироваться</button>
          <div className="register__redirect">
            <p className="register__redirect-question">Уже зарегистрированы?</p>
            <Link to="/signin" className="register__link transparence">Войти</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;