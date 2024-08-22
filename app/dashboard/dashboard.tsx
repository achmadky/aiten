"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const fetchCalories = async (userId: number): Promise<any[]> => {
  const response = await fetch(`/api/calories?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch calories data');
  }
  const data = await response.json();
  return data.calories;
};

const fetchUser = async (): Promise<{ id: number; email: string }> => {
  const response = await fetch('/api/user');
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return await response.json();
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.getDate().toString();
};

export default function CaloriesDashboard() {
  const [caloriesData, setCaloriesData] = useState<any[]>([]);

  useEffect(() => {
    const loadCaloriesData = async () => {
      try {
        const user = await fetchUser();
        const data = await fetchCalories(user.id);
        setCaloriesData(data);
      } catch (error) {
        console.error('Error loading calories data:', error);
      }
    };

    loadCaloriesData();
  }, []);

  const chartData = {
    labels: caloriesData.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: 'Calories Consumed',
        data: caloriesData.map((item) => item.calories),
        backgroundColor: 'rgba(75, 85, 99, 0.2)', // Tailwind 'gray-600'
        borderColor: 'rgba(75, 85, 99, 1)', // Tailwind 'gray-600'
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(75, 85, 99)', // Tailwind 'gray-600'
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Calories: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(75, 85, 99)', // Tailwind 'gray-600'
        },
      },
      y: {
        ticks: {
          color: 'rgba(75, 85, 99)', // Tailwind 'gray-600'
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg">
      <div className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Calories Dashboard</div>
      <div className="relative" style={{ height: '150px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
