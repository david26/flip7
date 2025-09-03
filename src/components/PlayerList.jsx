import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import zero from '../assets/0.png';
import one from '../assets/1.png';
import ice from '../assets/congelar.png';
import { faRemove } from '@fortawesome/free-solid-svg-icons';


const PlayerList = ({ users, round, updateScore, deleteUser, showConfirmation }) => {

  const handleChangeEvent = (e, id) => {
    const rawValue = e.target.value;
    if (/^\d*$/.test(rawValue)) {
      updateScore(id, rawValue);
    }
  };

  const handleBlurEvent = (e, id) => {
    const rawValue = e.target.value;
    const formattedNumber = parseInt(rawValue, 10);
    if (!isNaN(formattedNumber)) {
      updateScore(id, String(formattedNumber));
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  if (users.length === 0) {
    return <div className="empty"><span className="score roboto-900">Agrega un jugador para iniciar</span></div>;
  }

  return (
    <>
      {users.map((n, index) => (
        <div key={n.id} className={index === 0 ? "gamer frozen" : "gamer"}>
          <div className="div-name">
            <span className="name roboto-900">{n.name}</span>
            <span className="alias roboto-100"> ({n.alias}) </span>
          </div>
          <div className="div-score">
            <span className="score roboto-900">{n.sum}</span>
          </div>
          <div className="div-img">
            {n.type === 'zero' && <img src={zero} alt="Zero" />}
            {n.type === 'one' && <img src={one} alt="one" />}
            {n.type === 'ice' && <img src={ice} alt="frozen" />}
          </div>
          <div className="div-input-ronda">
            <input
              className='input-score'
              type="text"
              value={n.scores[round - 1]}
              onChange={(e) => handleChangeEvent(e, n.id)}
              onBlur={(e) => handleBlurEvent(e, n.id)}
              onFocus={handleFocus}
              placeholder="e.g., 23"
            />
          </div>

          <div className="div-controls">
            <button
              onClick={() => showConfirmation('Deseas quitar al jugador ' + n.name, () => deleteUser(n.id))}
              className="btn-remove"><FontAwesomeIcon icon={faRemove} /></button>
          </div>
        </div>
      ))}
    </>
  );
};

export default PlayerList;