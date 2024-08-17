import { NextApiRequest, NextApiResponse } from "next";
import foodData from "../../app/lib/datac.json";
import { Food, ApiResponse } from "../../app/lib/data";


// Function to find food by name
function findFoodByName(name: string): Food | undefined {
    const lowerCaseName = name.toLowerCase();
    return foodData.find((item) => item.name.toLowerCase() === lowerCaseName);
  }
  
  // API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Handle GET request
  if (req.method === "GET") {
    const { name } = req.query;
    if (typeof name !== "string") {
      return res.status(400).json({ food: undefined }); // Bad request if name is not provided or not a string
    }

    const food = findFoodByName(name);
    if (!food) {
      return res.status(404).json({ food: undefined }); // Not found if food not found
    }

    return res.status(200).json({ food });
  } else {
    // Handle other HTTP methods
    return res.status(405).json({ food: undefined });
  }
}