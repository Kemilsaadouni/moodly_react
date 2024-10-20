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
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '20px' }}>
        <div style={{ width: '80%', maxWidth: '900px', height: '400px' }}>
          <h2>Moyenne du moral des employés lors des 10 derniers jours</h2>
          <Line data={data} />
        </div>
    </div>
  );
};

export default MoodGraph;
