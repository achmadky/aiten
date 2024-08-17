"use client";

import { useState } from "react";

export default function CalorieTracker() {
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
    <div className="p-4 max-w-md mx-auto bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-neutral-700 dark:text-neutral-300">Calorie Tracker</h1>

      {/* Results Section */}
      <div className="bg-neutral-200 dark:bg-neutral-700 p-4 rounded-lg mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">Total Eaten:</span>
          <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">{totalEaten} kcal</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">Remaining:</span>
          <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">{remaining} kcal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">Goal:</span>
          <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">{goal} kcal</span>
        </div>
      </div>

      {/* Input Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">Breakfast:</label>
          <input
            type="number"
            placeholder="Enter breakfast calories"
            onChange={handleInputChange(setBreakfast)}
            className="p-2 border rounded w-1/2 text-neutral-700 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-900"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">Lunch:</label>
          <input
            type="number"
            placeholder="Enter lunch calories"
            onChange={handleInputChange(setLunch)}
            className="p-2 border rounded w-1/2 text-neutral-700 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-900"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">Dinner:</label>
          <input
            type="number"
            placeholder="Enter dinner calories"
            onChange={handleInputChange(setDinner)}
            className="p-2 border rounded w-1/2 text-neutral-700 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-900"
          />
        </div>
      </div>
    </div>
  );
}
