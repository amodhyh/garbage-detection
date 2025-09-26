import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useLocation } from 'react-router-dom';
import '../../styles/results.css';

// Register chart.js components
Chart.register(BarElement, CategoryScale, LinearScale);

// Import logos properly
import recycleLogo from '../../assets/recycle.svg';
import nonRecycleLogo from '../../assets/nonrec.svg';

const ResultsPage = () => {
  const location = useLocation();
  const data = location.state?.data;

  // Update classification history only when a new result is available
  React.useEffect(() => {
    if (data?.predicted_class) {
      const history = JSON.parse(localStorage.getItem('classificationHistory') || '[]');
      history.push({ predicted_class: data.predicted_class });
      localStorage.setItem('classificationHistory', JSON.stringify(history));
    }
  }, [data?.predicted_class]);

  // Get classification history for chart
  const history = JSON.parse(localStorage.getItem('classificationHistory') || '[]');
  const classCounts = history.reduce((acc, item) => {
    acc[item.predicted_class] = (acc[item.predicted_class] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(classCounts),
    datasets: [
      {
        label: 'Previous Classifications',
        data: Object.values(classCounts),
        backgroundColor: '#5f30e1ff',
        
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Classification History' },
    },
    scales: {
      x: { title: { display: true, text: 'Class' } },
      y: { title: { display: true, text: 'Count' }, beginAtZero: true },
    },
  };

  // (Removed duplicate declaration)

  // Define recyclable classes
  const recyclableClasses = [
  "battery",
  "brown-glass",
  "cardboard",
  "clothes",
  "green-glass",
  "metal",
  "paper",
  "plastic",
  "shoes",
  "white-glass"
]
  const isRecyclable = recyclableClasses.includes(data?.predicted_class);

  return (
    <div className="results-page">
      {/* Main text and chart column */}
      <div className="main-col">
        <div className="main-text">
          <h1>
             Image belongs to the{' '}
            <span
              className={isRecyclable ? 'highlight recyclable' : 'highlight nonrecyclable'}
            >
              {data?.predicted_class || 'Unknown'}
            </span> Class
          </h1>
        </div>
        {/* Large Bar chart below main text, left-aligned */}
        <div className="chart-container">
          <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Previous Classifications</h2>
          <Bar data={chartData} options={chartOptions} height={350} width={500} />
        </div>
      </div>
      {/* Right side: Recyclability status */}
      <div className="recyclability-status">
        <img
          src={isRecyclable ? recycleLogo : nonRecycleLogo}
          alt={isRecyclable ? 'Recyclable Logo' : 'Not Recyclable Logo'}
          className="recycle-logo"
        />
        <h2 className="recycle-text">
          {isRecyclable ? 'Recyclable' : 'Not Recyclable'}
        </h2>
      </div>
    </div>
  );
};

export default ResultsPage;
