import './Profile.css';

function Profile() {
  const name = 'Будущее имя';
  const email = '123@@321.ru'
  return (
    <main className="profile">
      <h2 className="profile__hello">Привет, {name}</h2>
      <form className="profile__form">
        <div className="profile__item">
          <p className="profile__item_type_text">Имя</p>
          <input className="profile__item_type_input"
                 name="name"
                 type="text"
                 placeholder="Имя"
                 required
                 value={name} />
        </div>
        <div className="profile__item">
          <p className="profile__item_type_text">E-mail</p>
          <input className="profile__item_type_input"
                 name="name"
                 type="text"
                 placeholder="Email"
                 required
                 value={email}/>
        </div>
        <button className="profile__edit-button transparence">Редактировать</button>
      </form>
      <button className="profile__sign-out transparence">Выйти из аккаунта</button>
    </main>
  );
}

export default Profile;