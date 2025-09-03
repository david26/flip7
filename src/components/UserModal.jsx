// src/components/UserModal.jsx

import React, { useState } from 'react';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '90%',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    lineHeight: '1',
  },
  formGroup: {
    marginBottom: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    //display: 'block',
    marginBottom: '0px',
    fontWeight: 'bold',
  },
  input: {
    width: '50%',
    padding: '5px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  }
};

const UserModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, alias });
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <div style={modalStyles.header}>
          <h2>Nuevo jugador</h2>
          <button onClick={onClose} style={modalStyles.closeButton}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={modalStyles.formGroup}>
            <label htmlFor="name" style={modalStyles.label}>Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={modalStyles.input}
              required
            />
          </div>
          <div style={modalStyles.formGroup}>
            <label htmlFor="alias" style={modalStyles.label}>Apodo</label>
            <input
              id="alias"
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              style={modalStyles.input}
              required
            />
          </div>
          <div style={{ textAlign: 'right' }}>
            <button
              type="submit"
              style={{ ...modalStyles.button, backgroundColor: '#28A745' }}
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ ...modalStyles.button, marginLeft: '10px', backgroundColor: '#DC3545' }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;