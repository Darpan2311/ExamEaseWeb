import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axiosInstance from "../axiosConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartActivity = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/api/exams/submissions/my/activity")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading activity chart...</p>;
  if (data.length === 0) return <p>No activity data available.</p>;

  const chartData = {
    labels: data.map(d => format(new Date(d.date), 'MMM d')), // e.g., Jan 3
    datasets: [
      {
        label: 'Activity Count',
        data: data.map(d => d.count),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Activity Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChartActivity;
