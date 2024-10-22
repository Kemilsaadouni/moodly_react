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

  const createGradient = (context, chartArea) => {
    const gradient = context.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'red');
    return gradient;
  };

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
          if (!chart) return 'rgba(75, 192, 192, 1)';
          const { ctx, chartArea } = chart;
          return createGradient(ctx, chartArea);
        },
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,  // Désactiver l'aspect ratio pour permettre au graphique de s'étendre
    layout: {
      padding: {
        bottom: 50,  // Ajouter du padding en bas du graphique
      },
    },
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
        min: 1.0,
        max: 5.0,
      },
      marginBottom:'200px'
    },
    plugins: {
      legend: {
        display: false,  // Désactiver la légende
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '10px'}}>
      <div style={{ width: '90%', maxWidth: '900px', height: window.innerWidth < 768 ? '350px' : '450px', padding: '30px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
        <h3 style={{ marginBottom: '10px' }}>Moyenne du moral des employés lors des 7 derniers jours</h3>
        <Line ref={chartRef} data={data} options={options} />
        <div style={{backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding:20}}>
          <div style={{ display: 'inline-block', width: '300px', height: '10px', background: 'linear-gradient(to right, blue, yellow, red)'}}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px auto' }}>
            <h5>En colère</h5>
            <h5>Neutre</h5>
            <h5>Très heureux</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodGraph;