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

// Enregistrer les composants dans Chart.js
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
        borderColor: 'black',
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
            size: window.innerWidth < 768 ? 10 : 12, // Taille de police ajustée pour mobile
          },
        },
      },
      y: {
        beginAtZero: true,
        min: 1.0,
        max: 5.0,
      },
    },
    plugins: {
      legend: {
        display: false,  // Désactiver la légende
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.graphBox}>
        <h3 style={styles.title}>Moyenne du moral des employés lors des 7 derniers jours</h3>
        <Line ref={chartRef} data={data} options={options} />
        <div style={styles.legendContainer}>
          <div style={styles.gradientBar}></div>
          <div style={styles.legendLabels}>
            <h5>En colère</h5>
            <h5>Neutre</h5>
            <h5>Très heureux</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles intégrés pour la réactivité
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '10px',
  },
  graphBox: {
    width: '90%', // Utilisation de 90% pour une meilleure adaptation
    maxWidth: '900px',
    height: window.innerWidth < 768 ? '350px' : '450px',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '10px',
  },
  legendContainer: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: 20,
  },
  gradientBar: {
    display: 'inline-block',
    width: '100%',
    height: '10px',
    background: 'linear-gradient(to right, blue, yellow, red)',
    borderRadius: '15px',
  },
  legendLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px auto',
  },
};

export default MoodGraph;
