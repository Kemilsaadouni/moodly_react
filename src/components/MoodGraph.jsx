import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Enregistrer les composants dans Chart.js, y compris le plugin Filler
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MoodGraph = ({ dailyAverages }) => {
  const chartRef = useRef(null);

  // Fonction pour générer un dégradé de couleur
  const createGradient = (context, chartArea) => {
    const gradient = context.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    // Ajout des points de couleur pour le dégradé
    gradient.addColorStop(0, 'blue');  // Valeur basse
    gradient.addColorStop(0.5, 'yellow');  // Valeur intermédiaire
    gradient.addColorStop(1, 'red');  // Valeur haute
    return gradient;
  };

  // Configuration des données et du dégradé
  const data = {
    labels: dailyAverages.map(item => item.date),
    datasets: [
      {
        label: 'Moyenne du moral',
        data: dailyAverages.map(item => item.average),
        fill: true,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: (context) => {
          const chart = chartRef.current;
          if (!chart) return 'rgba(75, 192, 192, 1)';  // Couleur par défaut
          const { ctx, chartArea } = chart;
          return createGradient(ctx, chartArea);
        },  // Couleur du remplissage
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,  // Désactiver l'aspect ratio pour permettre au graphique de s'étendre
    scales: {
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 5.0,
      },
      marginBottom:'200px'
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '10px'}}>
      <div style={{ width: '90%', maxWidth: '900px', height: window.innerWidth < 768 ? '300px' : '450px', padding: '30px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
        <h4 style={{ marginBottom: '10px' }}>Moyenne du moral des employés lors des 7 derniers jours</h4>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default MoodGraph;
