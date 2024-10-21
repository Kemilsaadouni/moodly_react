import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MoodGraph from '../components/MoodGraph';  // Importer le composant graphique

const ManagerDashboard = () => {
  const [moods, setMoods] = useState([]); 
  const [dailyAverages, setDailyAverages] = useState([]);
  const [error, setError] = useState(null); 
  const API_URL = 'http://localhost:1337/api/moods';
  const token = localStorage.getItem('token');

  const fetchMoods = async () => {
    let allMoods = [];
    let page = 1;
    let pageSize = 100;
    let totalPages = 1;

    try {
      const response = await axios.get(`${API_URL}?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=Date:asc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data, meta } = response.data;
      allMoods = data;
      totalPages = meta.pagination.pageCount;

      for (let i = 2; i <= totalPages; i++) {
        const paginatedResponse = await axios.get(`${API_URL}?pagination[page]=${i}&pagination[pageSize]=${pageSize}&sort=Date:asc`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        allMoods = [...allMoods, ...paginatedResponse.data.data];
      }

      setMoods(allMoods);

      const humeurValues = {
        'Très heureux': 5,
        'Heureux': 4,
        'Neutre': 3,
        'Triste': 2,
        'En colère': 1,
      };

      const moodsByDate = allMoods.reduce((acc, mood) => {
        const moodDate = mood.Date ? mood.Date.split('T')[0] : 'Date inconnue';
        if (!acc[moodDate]) {
          acc[moodDate] = [];
        }
        acc[moodDate].push(mood);
        return acc;
      }, {});

      /* Return l'eensemble des dates de leur moyennes
      const calculateDailyAverages = (moodsByDate) => {
        return Object.keys(moodsByDate).map((date) => {
          const moodsForDate = moodsByDate[date];
          const total = moodsForDate.reduce((sum, mood) => {
            return sum + humeurValues[mood.Humeur];
          }, 0);
          const average = total / moodsForDate.length;
          return { date, average };
        });
      };*/
      const calculateDailyAverages = (moodsByDate) => {
        const sortedDates = Object.keys(moodsByDate).sort((a, b) => new Date(a) - new Date(b)); // Trier les dates par ordre croissant
      
        const lastNDays = sortedDates.slice(-7);  // Remplacer 10 par 7 pour afficher les 7 derniers jours
      
        return lastNDays.map((date) => {
          const moodsForDate = moodsByDate[date];
          const total = moodsForDate.reduce((sum, mood) => {
            return sum + humeurValues[mood.Humeur];
          }, 0);
          const average = total / moodsForDate.length;
          return { date, average };
        });
      };

      const dailyAverages = calculateDailyAverages(moodsByDate);
      setDailyAverages(dailyAverages);

    } catch (err) {
      setError('Erreur lors de la récupération des moods');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Mood</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MoodGraph dailyAverages={dailyAverages} /> {/* Graphique séparé */}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: "'Arial', sans-serif",
    backgroundColor: '#E7EDED',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default ManagerDashboard;
