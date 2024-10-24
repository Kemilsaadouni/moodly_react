import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MoodGraph from '../components/MoodGraph';
import LogoutButton from '../components/LogoutButton';

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

      const calculateDailyAverages = (moodsByDate) => {
        const sortedDates = Object.keys(moodsByDate).sort((a, b) => new Date(a) - new Date(b)); // Trier les dates par ordre croissant

        const lastNDays = sortedDates.slice(-7);

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
      <div style={styles.header}>
        <h1 style={styles.title}>Manager</h1>
        <LogoutButton />
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <MoodGraph dailyAverages={dailyAverages} />
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
    justifyContent: 'flex-start', // Ajusté pour ne pas centrer verticalement
    alignItems: 'center',
    backgroundColor: '#E7EDED',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px', // Ajusté pour le mobile
  },
  title: {
    fontSize: '1.5rem', // Taille de police réactive
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default ManagerDashboard;
