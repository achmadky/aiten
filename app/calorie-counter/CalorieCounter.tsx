"use client";

import { useState } from "react";

export default function CalorieCounter() {
  const [breakfast, setBreakfast] = useState<number>(0);
  const [lunch, setLunch] = useState<number>(0);
  const [dinner, setDinner] = useState<number>(0);
  const [goal, setGoal] = useState<number>(2000); // Example goal, you can adjust as needed

  const totalEaten = breakfast + lunch + dinner;
  const remaining = Math.max(0, goal - totalEaten);

  function handleInputChange(setter: React.Dispatch<React.SetStateAction<number>>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(parseFloat(e.target.value) || 0);
    };
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Calorie Counter</h1>

      {/* Results Section */}
      <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg mb-6">
        <div className="flex justify-between mb-3">
          <span className="text-lg font-semibold">Total Eaten:</span>
          <span className="text-lg font-semibold">{totalEaten} kcal</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-lg font-semibold">Remaining:</span>
          <span className="text-lg font-semibold">{remaining} kcal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Goal:</span>
          <span className="text-lg font-semibold">{goal} kcal</span>
        </div>
      </div>

      {/* Input Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold">Breakfast:</label>
          <input
            type="number"
            placeholder="Enter breakfast calories"
            onChange={handleInputChange(setBreakfast)}
            className="p-2 border border-gray-400 rounded w-1/2 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold">Lunch:</label>
          <input
            type="number"
            placeholder="Enter lunch calories"
            onChange={handleInputChange(setLunch)}
            className="p-2 border border-gray-400 rounded w-1/2 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold">Dinner:</label>
          <input
            type="number"
            placeholder="Enter dinner calories"
            onChange={handleInputChange(setDinner)}
            className="p-2 border border-gray-400 rounded w-1/2 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
