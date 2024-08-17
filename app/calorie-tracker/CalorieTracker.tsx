"use client";

import { useState } from "react";

export default function CalorieTracker() {
  const [calories, setCalories] = useState<number>(0);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCalories(parseFloat(e.target.value) || 0);
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Calorie Tracker</h1>
      <input
        type="number"
        placeholder="Enter calories consumed"
        onChange={handleInputChange}
        className="p-2 border rounded w-full"
      />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Total Calories: {calories}</h2>
      </div>
    </div>
  );
}
