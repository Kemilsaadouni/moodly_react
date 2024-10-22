import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logout from '../assets/logout.svg';
import logoutHover from '../assets/logout_hover.svg';

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
        border: 'none',
        cursor: 'pointer',
        width: '50px',  // Taille fixe pour éviter que la div affecte la taille du bouton
        height: '50px',
        padding: '5px',  // Ajouter du padding si nécessaire
        backgroundColor: isHovered ? '#000' : 'transparent',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        borderRadius: '5px',
      }}
    >
      <img
        src={isHovered ? logoutHover : logout}
        alt="Déconnexion"
        style={{
          width: '100%',  // Taille de l'image fixée à 100% du bouton
          height: '100%',
        }}
      />
    </button>
  );
};

export default LogoutButton;
