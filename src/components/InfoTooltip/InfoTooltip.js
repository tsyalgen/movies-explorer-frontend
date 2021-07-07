import './InfoTooltip.css';
import registrationSuccess from '../../images/registration-success.svg';
import registrationFailed from '../../images/registration-failed.svg';

function InfoTooltip({ isOpen, isSuccess, infoText, onClose }) {

  return (
    <div className={`popup popup__info-tooltip ${isOpen && 'popup_opened'}`}>
      <div className="popup__overlay"/>
      <div className="popup__form">
        <img src={isSuccess ? registrationSuccess : registrationFailed} alt="состояние регистрации"
             className="popup__registration-image"/>
        <p className="popup__registration-info">{infoText}</p>
        <button onClick={onClose} type="button" aria-label="закрытие попапа"
                className="popup__close-button transparence"/>
      </div>
    </div>
  )
}

export default InfoTooltip;

