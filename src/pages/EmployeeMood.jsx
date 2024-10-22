import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThankYou from '../components/ThankYou';
import tres_heureux from '../assets/tres_heureux.svg';
import heureux from '../assets/heureux.svg';
import neutre from '../assets/neutre.svg';
import triste from '../assets/triste.svg';
import en_colere from '../assets/en_colere.svg';
import LogoutButton from '../components/LogoutButton';

const EmployeeMood = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodSubmitted, setMoodSubmitted] = useState(false); // Nouvel état pour vérifier si le mood a été soumis
  const [loading, setLoading] = useState(true);  // Pour gérer le chargement
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);  // Nouvel état pour vérifier si l'utilisateur a déjà soumis
  const moods = [
    { value: 'Très heureux', image: tres_heureux },
    { value: 'Heureux', image: heureux },
    { value: 'Neutre', image: neutre },
    { value: 'Triste', image: triste },
    { value: 'En colère', image: en_colere },
  ];

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const todayISO = new Date().toISOString().slice(0, 10); // Format ISO pour comparer la date

  // Fonction pour vérifier si l'utilisateur a déjà soumis un mood aujourd'hui
  const checkIfMoodExists = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    try {
      const response = await axios.get(`http://localhost:1337/api/moods?filters[users_permissions_user][id][$eq]=${userId}&filters[Date][$eq]=${todayISO}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Si un mood existe déjà pour aujourd'hui
      if (response.data.data.length > 0) {
        setMoodSubmitted(true);
        setAlreadySubmitted(true);  // Mettre à jour l'état pour savoir que l'utilisateur a déjà soumis
      }
    } catch (err) {
      console.error('Erreur lors de la vérification du mood', err);
    } finally {
      setLoading(false); // Arrête le chargement après la vérification
    }
  };

  useEffect(() => {
    // Vérifier si un mood existe déjà pour aujourd'hui lors du chargement du composant
    checkIfMoodExists();
  }, []);

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      await axios.post('http://localhost:1337/api/moods', {
        data: {
          Humeur: selectedMood,
          Date: todayISO,
          users_permissions_user: userId,
        },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Afficher le message de succès et cacher le formulaire
      setMoodSubmitted(true);
    } catch (err) {
      console.error('Erreur lors de l\'envoi du mood', err);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;  // Afficher un message de chargement pendant la vérification
  }

  return (
    <div style={styles.container}>
      <div style={styles.logoutContainer}>
        <LogoutButton />
      </div>
      <h2 style={styles.date}>{today}</h2>
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
      </style>
      {!moodSubmitted ? (  // Si le mood n'est pas soumis, afficher le formulaire
        <>
          <div style={styles.box}>
            <p style={styles.question}>Comment s'est passée ta journée ?</p>
            <div style={styles.moodSelection}>
              {moods.map((mood) => (
                <img
                  key={mood.value}
                  src={mood.image}  // Utilise les images importées
                  alt={mood.value}
                  style={{
                    ...styles.moodImage,
                    border: selectedMood === mood.value ? '3px solid blue' : 'none',
                  }}
                  onClick={() => setSelectedMood(mood.value)}
                />
              ))}
            </div>
          </div>
          <button style={styles.submitButton} onClick={handleMoodSubmit} disabled={selectedMood === null}>
            Enregistrer
          </button>
        </>
      ) : (  // Sinon, afficher des messages différents en fonction de la situation
        <ThankYou 
          message={alreadySubmitted ? "Vous avez déjà partagé votre mood aujourd'hui !" : "Merci d'avoir partagé votre mood !"} 
          subMessage={alreadySubmitted ? "Revenez demain pour enregistrer un nouveau mood." : "Revenez demain pour enregistrer votre humeur."} 
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: "'Arial', sans-serif",
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  logoutContainer: {
    width: '10%',
    position: 'absolute', // Permet de positionner le bouton en haut à droite
    top: '20px',
    right: '20px', // Garde un peu d'espace depuis le bord droit
  },
  date: {
    fontSize: '18px',
    color: '#000',
    marginBottom: '20px',
  },
  box: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    opacity: 1,
    transition: 'opacity 0.3s ease-out',
  },
  question: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#333',
  },
  moodSelection: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  moodImage: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontSize: '14px',
  },
};

export default EmployeeMood;
