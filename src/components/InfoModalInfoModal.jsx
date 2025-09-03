import React, { useState, useEffect, useRef } from 'react';

const InfoModal = ({ message, onDismiss }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const confettiPieces = [];

    // Set canvas size to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createConfetti() {
      const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
      const pieceCount = 200;
      for (let i = 0; i < pieceCount; i++) {
        confettiPieces.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height, // Start above the screen
          size: Math.random() * 8 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 3 + 1,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 5 - 2.5,
        });
      }
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.forEach(piece => {
        piece.y += piece.speed;
        piece.rotation += piece.rotationSpeed;

        if (piece.y > canvas.height) {
          piece.y = -20;
          piece.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(piece.x + piece.size / 2, piece.y + piece.size / 2);
        ctx.rotate(piece.rotation * Math.PI / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();
      });
      requestAnimationFrame(update);
    }
    
    createConfetti();
    const animFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Styles for the InfoModal
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };
  
  const canvasStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
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
    zIndex: 1001,
  };

  const messageStyle = {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '20px',
  };

  const dismissButtonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: 'white',
  };

  return (
    <div style={overlayStyle}>
      <canvas ref={canvasRef} style={canvasStyle}></canvas>
      <div style={contentStyle}>
        <p style={messageStyle}>{message}</p>
        <button style={dismissButtonStyle} onClick={onDismiss}>Aceptar</button>
      </div>
    </div>
  );
};

export default InfoModal;
