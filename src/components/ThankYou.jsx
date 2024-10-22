import React from 'react';

const ThankYou = ({ message, subMessage }) => {
    return (
      <div style={styles.thankYouBox}>
        <h2 style={styles.thankYouMessage}>{message}</h2>
        <p style={styles.thankYouText}>{subMessage}</p>
      </div>
    );
};

// Styles adaptés à la réactivité
const styles = {
    thankYouBox: {
      backgroundColor: '#fff',
      padding: '10px', // Réduit le padding pour les écrans plus petits
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '90%', // Utilise 90% de la largeur de l'écran
      maxWidth: '400px',
      opacity: 1,
      transition: 'opacity 0.3s ease',
      animation: 'fadeIn 0.5s ease-in', // Animation d'apparition
    },
    thankYouMessage: {
      fontSize: '18px', // Taille de police réduite
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    thankYouText: {
      fontSize: '14px', // Taille de police réduite
      color: '#333',
    },
};

// Export du composant
export default ThankYou;
