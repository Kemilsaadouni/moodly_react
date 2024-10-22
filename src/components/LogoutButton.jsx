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
        width: '8%',
        padding: '1%',
        backgroundColor: isHovered ? '#000' : 'transparent',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        borderRadius: '5px',
      }}
    >
      <img
        src={isHovered ? logoutHover : logout}
        alt="Déconnexion"
        style={{
          width: '100%',
          transition: 'transform 0.3s ease',
        }}
      />
    </button>
  );
};

export default LogoutButton;
