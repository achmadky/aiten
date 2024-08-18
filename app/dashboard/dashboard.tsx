"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Function to fetch calories data
const fetchCalories = async (): Promise<any[]> => {
  const response = await fetch('/api/calories');
  if (!response.ok) {
    throw new Error('Failed to fetch calories data');
  }
  const data = await response.json();
  return data.calories; // Adjust according to your API response
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.getDate().toString(); // Returns day of the month
};

export default function CaloriesDashboard() {
  const [caloriesData, setCaloriesData] = useState<any[]>([]);

  useEffect(() => {
    const loadCaloriesData = async () => {
      try {
        const data = await fetchCalories();
        setCaloriesData(data);
      } catch (error) {
        console.error('Error loading calories data:', error);
      }
    };

    loadCaloriesData();
  }, []);

  // Format dates to show only the day
  const chartData = {
    labels: caloriesData.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: 'Calories Consumed',
        data: caloriesData.map((item) => item.calories),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `Calories: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-md">
      <div className="relative" style={{ height: '200px' }}> {/* Adjusted height */}
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
