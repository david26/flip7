// src/components/ConfirmationModal.jsx

import React from 'react';

// Reusable ConfirmationModal component with inline styles
const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  // Styles for the modal overlay and content
  const overlayStyle = {
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
  };

  const contentStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif',
  };

  // Styles for the buttons
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '40px',
  };

  const baseButtonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };
  
  const confirmButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#28a745',
    color: 'white',
  };

  const cancelButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  const messageStyle = {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '20px',
  };

  return (
    <div style={overlayStyle}>
      <div style={contentStyle}>
        <p style={messageStyle}>{message}</p>
        <div style={buttonContainerStyle}>
          <button style={confirmButtonStyle} onClick={onConfirm}>Confirmar</button>
          <button style={cancelButtonStyle} onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

