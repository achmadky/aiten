export const fetchCalories = async (): Promise<number[]> => {
    const response = await fetch('/api/calories');
    if (!response.ok) {
      throw new Error('Failed to fetch calories data');
    }
    const data = await response.json();
    return data.calories; // Adjust according to your API response
  };
  