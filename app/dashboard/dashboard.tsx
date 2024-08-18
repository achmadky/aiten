"use client";

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [caloriesData, setCaloriesData] = useState<number[]>([]);

  useEffect(() => {
    const fetchCaloriesData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const userId = 1; // Replace with dynamic user ID
        const response = await fetch(`/api/calories?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const labels = data.map((entry: any) => entry.date);
          const calories = data.map((entry: any) => entry.calories);

          setCaloriesData(calories);
          // Optionally update labels
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCaloriesData();
  }, []);

  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Total Calories Eaten',
        data: caloriesData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Calories Dashboard</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Bar data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Dashboard;
