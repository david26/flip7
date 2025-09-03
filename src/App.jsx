import { useLocalStorage } from './useLocalStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import React, { use, useState } from 'react';
import UserModal from './components/UserModal';
import PlayerList from './components/PlayerList';
import ConfirmationModal from './components/ConfirmationModal';
import InfoModal from './components/InfoModalInfoModal';

export default function App() {
  const [game, setGame] = useLocalStorage('games-v1', { users: [] })
  const [round, setRound] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to control the visibility of the modal
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  // State to store the dynamic message and callback function
  const [modalConfig, setModalConfig] = useState({
    message: '',
    onConfirm: null,
  });

  // State for the new info modal
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalConfig, setInfoModalConfig] = useState({
    message: '',
  });

  // New function to open the InfoModal
  const showInfoModal = (message) => {
    setInfoModalConfig({ message });
    setIsInfoModalOpen(true);
  };

  // New function to dismiss the InfoModal
  const dismissInfoModal = () => {
    setIsInfoModalOpen(false);
    setInfoModalConfig({ message: '' });
  };

  // A generic function to open the confirmation modal
  const showConfirmation = (message, onConfirmAction) => {
    setModalConfig({
      message,
      onConfirm: () => {
        onConfirmAction();
        closeModal();
      },
    });
    setIsConfirmationDialogOpen(true);
  };


  // Function to close the modal
  const closeModal = () => {
    setIsConfirmationDialogOpen(false);
    setModalConfig({ message: '', onConfirm: null });
  };

  const handleSaveUser = ({ name, alias }) => {
    const newUser = {
      id: crypto.randomUUID(),
      name,
      alias,
      scores: new Array(round).fill(0),
      sum: 0,
      type: 'zero'
    };

    const newUsers = [...game.users];
    newUsers.push(newUser);
    setGame({ users: newUsers });
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const nextR = () => {
    const newUsers = [...game.users];
    const maxScore = newUsers.length > 0 ? newUsers[0].sum : 0;
    const winners = newUsers.filter((u) => u.sum === maxScore);

    if (maxScore >= 200) {
      if (winners.length == 1) {
        showInfoModal("Tenemos un ganador: " + winners[0].name);
      } else if (winners.length === 2) {
        showInfoModal("Tenemos un empate: " + winners[0].name + " y " + winners[1].name);
      } else {
        let strWiners = '';
        for (let i = 0; i < winners.length - 2; i++) {
          strWiners += winners[i].name + ", ";
        }

        strWiners += winners[winners.length - 2].name + " y ";
        strWiners += winners[winners.length - 1].name;

        showInfoModal("Tenemos un empate múltiple: " + strWiners);
      }
    } else {
      setRound(prevround => prevround + 1);
      const newUsers = [...game.users];
      newUsers.forEach((u) => {
        u.scores.push(0);
      });
      setGame({ users: newUsers })
    }
  };

  const prevR = () => {
    if (round > 1) {
      setRound(prevround => prevround - 1);
    }
  };

  const updateScore = (id, score) => {
    const numericValue = Number(score);
    const users = [...game.users];

    const selectedUserArray = users.filter(n => n.id === id);
    const restOfUsers = users.filter(n => n.id !== id);

    if (selectedUserArray != undefined && selectedUserArray.length > 0) {
      const user = selectedUserArray[0];
      user.scores[round - 1] = numericValue;
      user.sum = user.scores.reduce((total, score) => total + score, 0);
      //console.log("...user")
      //console.log(user);
      restOfUsers.push(user);

      // Sort the newUsers array by the sum of scores in descending order
      restOfUsers.sort((a, b) => {

        return b.sum - a.sum;
      });

      // get the max score
      let max = restOfUsers[0].sum;

      restOfUsers.forEach((u) => {
        if (u.sum === max && max >0) {
          u.type = 'ice';
        } else if (u.sum < max && u.sum > 0) {
          u.type = 'one';
        } else if (u.sum === 0) {
          u.type = 'zero';
        }
      });

      let size = restOfUsers.length;
      restOfUsers[size-1].type='zero';


      setGame({ users: restOfUsers });
    }


  };


  const deleteUser = (id) => {
    const users = [...game.users];
    const otherUsers = users.filter(u => u.id !== id);
    setGame({ users: otherUsers });

  }

  const restartGame = () => {
    setRound(1);

    const newUsers = [...game.users];

    newUsers.forEach((u) => {
      u.scores = new Array(round).fill(0)
      u.sum = 0;
      u.type = 'zero';
    });

    setGame({ users: newUsers });
  }

  return (
    <div className="main">
      <div className="div-game-controls">
        <div className="div-game-general">
          <button className="btn"
            onClick={() => showConfirmation('¿Deseas iniciar un nuevo juego?', restartGame)}
          //onClick={restartGame}
          ><FontAwesomeIcon icon={faRotateRight} /></button>
          <button className="btn" onClick={handleOpenModal}><FontAwesomeIcon icon={faPlus} />
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>

        <div className="div-game-round">
          <button className="btn" onClick={prevR}><FontAwesomeIcon icon={faAngleLeft} /></button>
          <button className="btn-round-indicator" >{round}</button>
          <button className="btn" onClick={nextR}><FontAwesomeIcon icon={faAngleRight} /></button>
        </div>
      </div>
      {isModalOpen && (
        <UserModal
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      )}
      {isConfirmationDialogOpen && (
        <ConfirmationModal
          message={modalConfig.message}
          onConfirm={modalConfig.onConfirm}
          onCancel={closeModal}
        />
      )}
      {isInfoModalOpen && (
        <InfoModal
          message={infoModalConfig.message}
          onDismiss={dismissInfoModal}
        />
      )}
      <PlayerList users={game.users} round={round} updateScore={updateScore} deleteUser={deleteUser} showConfirmation={showConfirmation} />


    </div >
  )
}

