/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

// URL de l'API Strapi (remplace avec l'URL correcte de ton API)
const API_URL = 'http://localhost:1337/api/moods';

const humeurValues = {
  'Très heureux': 5,
  'Heureux': 4,
  'Neutre': 3,
  'Triste': 2,
  'En colère': 1,
};

const ManagerDashboard = () => {
  const [dailyAverages, setDailyAverages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer le token et l'ID du manager depuis le localStorage
  const getManagerCredentials = () => {
    const token = localStorage.getItem('token');  // Récupère le token du localStorage
    const userId = localStorage.getItem('userId');  // Récupère l'ID de l'utilisateur (manager)

    if (!token || !userId) {
      console.error('Erreur : token ou userId non trouvé dans le localStorage');
      return null;
    }

    return { token, userId };
  };

  // Fonction pour récupérer tous les moods
  const fetchMoods = async (token) => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (err) {
      setError('Erreur lors de la récupération des moods');
      console.error(err);
      return [];
    }
  };

  // Fonction pour transformer les humeurs en valeurs numériques
  const transformMoods = (moods) => {
    return moods.map((mood) => ({
      date: mood.Date,
      value: humeurValues[mood.Humeur],
    }));
  };

  // Fonction pour regrouper les moods par date et calculer la moyenne quotidienne
  const calculateDailyAverages = (transformedMoods) => {
    const moodByDate = {};

    // Grouper les moods par date
    transformedMoods.forEach((mood) => {
      if (!moodByDate[mood.date]) {
        moodByDate[mood.date] = [];
      }
      moodByDate[mood.date].push(mood.value);
    });

    // Calculer la moyenne par date
    const dailyAverages = Object.keys(moodByDate).map((date) => {
      const moodValues = moodByDate[date];
      const total = moodValues.reduce((sum, value) => sum + value, 0);
      const average = total / moodValues.length;

      return {
        date,
        average,
      };
    });

    return dailyAverages;
  };

  // Fonction pour créer le graphique avec ChartJS
  const createMoodChart = (dailyAverages) => {
    const ctx = document.getElementById('moodChart').getContext('2d');

    const labels = dailyAverages.map((entry) => entry.date);
    const data = dailyAverages.map((entry) => entry.average);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Mood moyen des employés (30 derniers jours)',
            data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            min: 1,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  };

  // Fonction principale pour récupérer les données et créer le graphique
  const generateMoodChart = async () => {
    setLoading(true);
    const credentials = getManagerCredentials(); // Récupère les identifiants du manager

    if (!credentials) {
      setError('Aucune connexion valide trouvée');
      return;
    }

    const { token } = credentials;

    const moods = await fetchMoods(token); // Récupérer les moods avec le token du manager
    const transformedMoods = transformMoods(moods); // Transformer en valeurs numériques
    const averages = calculateDailyAverages(transformedMoods); // Calculer les moyennes quotidiennes

    setDailyAverages(averages);
    setLoading(false);
    createMoodChart(averages); // Créer le graphique avec ChartJS
  };

  useEffect(() => {
    generateMoodChart(); // Appeler la fonction lors du chargement du composant
  }, []);

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Dashboard Manager - Visualisation des Moods</h2>
      <canvas id="moodChart" width="400" height="200"></canvas>
    </div>
  );
};

export default ManagerDashboard;
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const ManagerDashboard = () => {
  const [moods, setMoods] = useState([]);  // État pour stocker les moods
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const API_URL = 'http://localhost:1337/api/moods';
  const token = localStorage.getItem('token');  // Récupère le token du localStorage

  // Fonction pour récupérer les moods avec pagination
  const fetchMoods = async () => {
    let allMoods = []; // Tableau pour stocker tous les moods
    let page = 1;      // Commence à la première page
    let pageSize = 100; // Taille de chaque page
    let totalPages = 1; // Nombre total de pages

    try {
      // Première requête pour récupérer la première page et les infos de pagination
      const response = await axios.get(`${API_URL}?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=Date:asc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const { data, meta } = response.data;

      allMoods = data; // Ajoute les moods récupérés à allMoods
      totalPages = meta.pagination.pageCount; // Récupère le nombre total de pages
      console.log(`Total de pages: ${totalPages}`);

      // Boucle pour récupérer toutes les pages suivantes s'il y en a
      for (let i = 2; i <= totalPages; i++) {
        const paginatedResponse = await axios.get(`${API_URL}?pagination[page]=${i}&pagination[pageSize]=${pageSize}&sort=Date:asc`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        allMoods = [...allMoods, ...paginatedResponse.data.data]; // Ajoute les moods à la liste
      }

      // Stocke tous les moods dans l'état
      setMoods(allMoods);
      console.log('Tous les moods récupérés:', allMoods);
    } catch (err) {
      setError('Erreur lors de la récupération des moods');
      console.error(err);
    }
  };

  // Utilisation de useEffect pour récupérer les moods au montage du composant
  useEffect(() => {
    fetchMoods();
  }, []);  // Le tableau vide signifie que useEffect sera exécuté une seule fois au montage

  return (
    <div>
      <h1>ManagerDashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affiche l'erreur s'il y en a */}
    </div>
  );
};

export default ManagerDashboard;