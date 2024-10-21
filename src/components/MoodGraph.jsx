import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler // Importer le plugin Filler
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
  Filler // Enregistrer le plugin Filler
);

const MoodGraph = ({ dailyAverages }) => {
  const data = {
    labels: dailyAverages.map(item => item.date),
    datasets: [
      {
        label: 'Moyenne du moral',
        data: dailyAverages.map(item => item.average),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true, // Activer le remplissage
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          // Réduire la taille des étiquettes sur petits écrans
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // 10px pour petits écrans, 12px pour grands
          },
          callback: function(value, index, values) {
            return new Date(value).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short'
            });
          }
        }
      },
      y: {
        beginAtZero: true,
        min: 2.0,
      }
    }
  };
  
  return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '20px' }}>
    <div style={{ width: '100%', maxWidth: '900px', height: window.innerWidth < 768 ? '300px' : '400px' }}>
      <h2 style={{ marginBottom: '20px' }}>Moyenne du moral des employés lors des 7 derniers jours</h2>
      <Line data={data} options={options} />
    </div>
  </div>
  );
};

export default MoodGraph;
