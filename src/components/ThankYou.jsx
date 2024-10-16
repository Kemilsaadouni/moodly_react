import React from 'react'

const ThankYou = () => {
  return (
    <div className="fade-in" style={styles.thankYouBox}>
        <h2 style={styles.thankYouMessage}>Merci d'avoir partagé votre mood !</h2>
        <p style={styles.thankYouText}>Revenez demain pour enregistrer votre humeur.</p>
    </div>
  )
}

const styles = {
    // Styles pour le message de remerciement
    thankYouBox: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      opacity: 1,  // Cette opacité changera grâce à l'animation
    },
    thankYouMessage: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    thankYouText: {
      fontSize: '16px',
      color: '#333',
    },
  };

export default ThankYou