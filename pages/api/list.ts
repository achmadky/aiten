import { NextApiRequest, NextApiResponse } from 'next';
import foodData from "../../app/lib/datac.json";
import { Food } from '../../app/lib/data';


// API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  // Map through the food data to extract the names
  const foodNames = foodData.map((food: Food) => food.name);

  // Return the list of food names as a JSON response
  res.status(200).json(foodNames);
}