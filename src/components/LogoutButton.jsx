import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logout from '../assets/logout.svg';

const LogoutButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: "none",
        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
        width: '50px',
        height: '50px',
        padding: '5px',
        cursor: 'pointer',
      }}
    >
      <img
        src={logout}
        alt="Déconnexion"
        style={{
          width: '100%',  // Ajustement à 100% du bouton
          height: '100%', // Ajustement à 100% du bouton
        }}
      />
    </button>
  );
};

export default LogoutButton;
