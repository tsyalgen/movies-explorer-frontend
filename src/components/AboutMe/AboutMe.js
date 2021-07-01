import './AboutMe.css';
import SectionTitle from "../SectionTitle/SectionTitle";
import InfoBlock from "../InfoBlock/InfoBlock";
import me from "../../images/me.png";

const AboutMe = () => {
  return (
    <section className="about-me">
      <a name="student">
        <SectionTitle text="Студент" />
      </a>
      <div className="about-me__info">
        <div className="about-me__text">
          <h2 className="about-me__name">Виталий</h2>
          <InfoBlock title="Фронтенд-разработчик, 30 лет" text="Я родился и живу в Саратове,
       закончил факультет экономики СГУ. У меня есть жена
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
 начал заниматься фриланс-заказами и ушёл с постоянной работы." className="about-me__description" />
          <div className="about-me__links">
            <a className="about-me__link transparence" href="https://github.com/tsyalgen"
               rel="noreferrer noopener" target="_blank">Facebook</a>
            <a className="about-me__link transparence" href="https://github.com/tsyalgen"
               rel="noreferrer noopener" target="_blank">GitHub</a>
          </div>
        </div>
        <img className="about-me__photo" src={me} alt="фото разработчика" />
      </div>
    </section>
  );
}

export default AboutMe;