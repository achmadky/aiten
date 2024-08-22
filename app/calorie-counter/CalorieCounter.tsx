"use client";

import { useState, useEffect } from "react";

export default function CalorieCounter() {
  const [breakfast, setBreakfast] = useState<number>(0);
  const [lunch, setLunch] = useState<number>(0);
  const [dinner, setDinner] = useState<number>(0);
  const [goal, setGoal] = useState<number>(2000); // Example goal, you can adjust as needed
  const [message, setMessage] = useState<string | null>(null); // For success or error messages
  const [userId, setUserId] = useState<number | null>(null); // State to store user ID

  const totalEaten = breakfast + lunch + dinner;
  const remaining = Math.max(0, goal - totalEaten);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust token fetching if necessary
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserId(userData.id); // Set the user ID from the response
        } else {
          setMessage("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error occurred while fetching user data.");
      }
    };

    fetchUserId();
  }, []);

  function handleInputChange(setter: React.Dispatch<React.SetStateAction<number>>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(parseFloat(e.target.value) || 0);
    };
  }

  async function handleSubmit() {
    if (!userId) {
      setMessage("User ID is not available.");
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // Use the dynamically fetched userId
          date: new Date().toISOString().split("T")[0], // Date in YYYY-MM-DD format
          calories: totalEaten,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Success!");
      } else {
        const errorData = await response.json();
        setMessage(`Failed to submit calorie data: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting calorie data:", error);
      setMessage("Error occurred while submitting data.");
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mt-10 p-6">
      
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">

        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Track your daily calorie intake
        </p>
      </div>

      {/* Results Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Eaten</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalEaten} kcal</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Remaining</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{remaining} kcal</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Goal</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{goal} kcal</p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-5">
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Breakfast</label>
          <input
            type="number"
            placeholder="Enter breakfast calories"
            onChange={handleInputChange(setBreakfast)}
            className="mt-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Lunch</label>
          <input
            type="number"
            placeholder="Enter lunch calories"
            onChange={handleInputChange(setLunch)}
            className="mt-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dinner</label>
          <input
            type="number"
            placeholder="Enter dinner calories"
            onChange={handleInputChange(setDinner)}
            className="mt-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-6 p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>

      {/* Message Section */}
      {message && <p className="mt-4 text-center font-semibold text-red-500 dark:text-red-400">{message}</p>}
    </div>
  );
}
