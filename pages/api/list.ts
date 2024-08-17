import type { NextApiRequest, NextApiResponse } from 'next';
import foodData from '../../app/lib/datac.json';
import { Food } from '../../app/lib/data';

// API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET'); // Allow GET method
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow Content-Type header

  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.status(200).end();
    return;
  }

  // Map through the food data to extract the names
  const foodNames = foodData.map((food: Food) => food.name);

  // Return the list of food names as a JSON response
  res.status(200).json(foodNames);
}
