import './Profile.css';
import React, {useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile({ onUpdate, onSignOut }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [ userData, setUserData ] = useState({
    email: '',
    name: '',
  });

  React.useEffect(() => {
    setUserData({email: currentUser.email, name: currentUser.name,});
  }, [currentUser.name, currentUser.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(userData.email, userData.name);
  }


  return (
    <main className="profile">
      <h2 className="profile__hello">Привет, {currentUser.name}</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__item">
          <p className="profile__item_type_text">Имя</p>
          <input className="profile__item_type_input"
                 name="name"
                 type="text"
                 placeholder="Имя"
                 required
                 value={userData.name || ''}
                 onChange={handleChange} />
        </div>
        <div className="profile__item">
          <p className="profile__item_type_text">E-mail</p>
          <input className="profile__item_type_input"
                 name="email"
                 type="text"
                 placeholder="Email"
                 required
                 value={userData.email || ''}
                 onChange={handleChange}/>
        </div>
        <button className="profile__edit-button transparence" type="submit">Редактировать</button>
      </form>
      <button onClick={onSignOut} className="profile__sign-out transparence">Выйти из аккаунта</button>
    </main>
  );
}

export default Profile;